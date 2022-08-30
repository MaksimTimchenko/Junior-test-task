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