
/* Content script: shows a small floating "Run" button when user selects text */
let bubble = null;
document.addEventListener('selectionchange', ()=>{
  const selection = window.getSelection();
  const text = selection.toString();
  if(text && text.trim().length>2){
    showBubble(selection);
  } else {
    removeBubble();
  }
});

function showBubble(selection){
  removeBubble();
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  bubble = document.createElement('div');
  bubble.id = 'progex-bubble';
  bubble.innerText = 'Run code ▶';
  bubble.onclick = async (e)=>{
    e.stopPropagation();
    // open extension popup programmatically by sending the selected text to the extension and opening the action popup
    const code = selection.toString();
    // fallback: open popup.html in new window
    const url = chrome.runtime.getURL('ui/popup.html');
    window.open(url + '?prefill=1', '_blank', 'width=520,height=700');
    // store the code in chrome.storage to be picked by popup
    chrome.storage.local.set({progex_prefill:code});
  };
  Object.assign(bubble.style, {
    position:'absolute',top: (window.scrollY + rect.top - 36)+'px',
    left:(window.scrollX + rect.left)+'px',
    background:'#111827',color:'#fff',padding:'6px 10px',borderRadius:'8px',cursor:'pointer',zIndex:9999999,boxShadow:'0 6px 18px rgba(2,6,23,0.4)'
  });
  document.body.appendChild(bubble);
}

function removeBubble(){
  if(bubble && bubble.parentNode) bubble.parentNode.removeChild(bubble);
  bubble = null;
}

// remove bubble when clicking elsewhere
document.addEventListener('mousedown', ()=>{ removeBubble(); });
