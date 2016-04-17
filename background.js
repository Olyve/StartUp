// background.js

// When a new window is created, bring up the custom home pages
chrome.windows.onCreated.addListener(function() {
  chrome.tabs.create({"url": "http://www.samgalizia.com"});
});

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener(function(tab) {

  // Send a message to the active tab
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {

    var activeTabUrl = tabs[0].url;
    var savedUrls = [];

    // Check if there are saved URL's in storage
    chrome.storage.sync.get(function(items) {

      if (items['urls']) { // Found URL's so add them to savedUrls
        savedUrls = items['urls'];
        // Next add the current URL on to savedUrls
        savedUrls.push(activeTabUrl);
        chrome.storage.sync.set({'urls': savedUrls}, function() {
          console.log('saved url');
        })
      } else { // No data found in storage
        // Add the current URL
        savedUrls.push(activeTabUrl);
        chrome.storage.sync.set({'urls': savedUrls}, function() {
          cosnole.log('saved url');
        })
      }

      for (var i = 0; i < savedUrls.length; i++) {
        console.log(savedUrls[i]);
      }
    }); // End storage.sync.get

  });// End tabs.query

}); // End browserAction.Onclicked.addListener
