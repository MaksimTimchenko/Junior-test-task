let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.background = color;
});


  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        let newColor = document.querySelector('.pops').style.backgroundColor = color;
        chrome.storage.sync.set({'BgColor':newColor});
      
    });
  }



  changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: setPageBackgroundColor,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.querySelector('.pops').style.backgroundColor = color;
    });
  }