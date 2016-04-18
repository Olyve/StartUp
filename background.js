// background.js

// When a new window is created, bring up the custom home pages
chrome.windows.onCreated.addListener(function() {
  chrome.tabs.create({"url": "http://www.samgalizia.com"});
});
