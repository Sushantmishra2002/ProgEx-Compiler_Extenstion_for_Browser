
const languageSelect = document.getElementById('language');
const codeArea = document.getElementById('code');
const runBtn = document.getElementById('run');
const outputPre = document.getElementById('output');
const stdinInput = document.getElementById('stdin');
const optionsLink = document.getElementById('options');

optionsLink.addEventListener('click', (e)=>{e.preventDefault();chrome.runtime.openOptionsPage();});

async function loadLanguages(){
  // load saved languages list or fetch runtimes from background
  let runtimes = await chrome.runtime.sendMessage({type:'getRuntimes'});
  if(!runtimes || !runtimes.length){
    languageSelect.innerHTML = '<option value="python">python</option>';
    return;
  }
  // reduce to unique languages with aliases
  const unique = {};
  runtimes.forEach(r => {
    if(!unique[r.language]) unique[r.language] = r;
  });
  languageSelect.innerHTML = Object.values(unique).map(r=>`<option data-version="${r.version}" value="${r.language}">${r.language} — ${r.version}</option>`).join('');
}

runBtn.addEventListener('click', async ()=>{
  const language = languageSelect.value;
  const version = languageSelect.selectedOptions[0]?.dataset.version || '';
  const code = codeArea.value;
  const stdin = stdinInput.value || '';
  if(!code.trim()){ outputPre.textContent = 'No code provided.'; return; }
  outputPre.textContent = 'Running...';
  try{
    const res = await chrome.runtime.sendMessage({type:'runCode', language, version, code, stdin});
    if(res?.error){
      outputPre.textContent = 'Error: ' + res.error;
      return;
    }
    const run = res.run || {};
    outputPre.textContent = (run.output || run.stdout || '') + (run.stderr? ('\n---stderr---\n'+run.stderr): '');
  }catch(err){
    outputPre.textContent = 'Request failed: '+err.message;
  }
});

// get selected text from active tab and prefill
document.addEventListener('DOMContentLoaded', async ()=>{
  loadLanguages();
  const [tab] = await chrome.tabs.query({active:true,lastFocusedWindow:true});
  try{
    const result = await chrome.scripting.executeScript({
      target:{tabId:tab.id},
      func: ()=>{
        const sel = window.getSelection().toString();
        return sel || null;
      }
    });
    const text = result?.[0]?.result;
    if(text) codeArea.value = text;
  }catch(e){ /* ignore cross-origin frames */ }
});
