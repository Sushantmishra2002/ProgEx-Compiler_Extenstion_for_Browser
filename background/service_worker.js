
/* Service worker / background: handles fetching runtimes and executing code via Piston public API (emkc.org) */
const DEFAULT_BASE = 'https://emkc.org/api/v2/piston';

let runtimesCache = null;
let lastFetched = 0;

async function fetchRuntimes(){
  const now = Date.now();
  if(runtimesCache && (now - lastFetched) < 60_000) return runtimesCache;
  try{
    const res = await fetch(DEFAULT_BASE + '/runtimes');
    const json = await res.json();
    runtimesCache = json;
    lastFetched = Date.now();
    return json;
  }catch(e){
    return [];
  }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
  if(msg?.type==='getRuntimes'){
    fetchRuntimes().then(r=>sendResponse(r)).catch(()=>sendResponse([]));
    return true;
  }
  if(msg?.type==='runCode'){
    (async ()=>{
      try{
        const language = (msg.language || 'python');
        let version = msg.version || '';
        const files = [{content: msg.code}];
        // if version not provided, pick the first matching runtime version
        const runtimes = await fetchRuntimes();
        if(!version){
          const found = runtimes.find(r=> r.language.toLowerCase()===language.toLowerCase() || (r.aliases||[]).map(a=>a.toLowerCase()).includes(language.toLowerCase()));
          version = found?.version || '';
        }
        const payload = {language, version, files, stdin: msg.stdin || ''};
        const res = await fetch(DEFAULT_BASE + '/execute', {
          method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)
        });
        if(!res.ok){
          const txt = await res.text();
          sendResponse({error: 'Execution API error: '+res.status + ' ' + txt});
          return;
        }
        const json = await res.json();
        sendResponse(json);
      }catch(err){
        sendResponse({error: err.message});
      }
    })();
    return true;
  }
});
