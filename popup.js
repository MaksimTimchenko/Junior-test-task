let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});


changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });


  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        let newColor = document.querySelector('.pops').style.backgroundColor = color;
        chrome.storage.sync.set({'BgColor':newColor});
      
    });
  }