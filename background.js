// Boolean to hold the state of whether or not StartUp has loaded the pages
var hasLoaded = false;

if (!hasLoaded) {
  // Change the state to true
  hasLoaded = true;

  // When chrome starts, bring up the custom home pages
  chrome.windows.onCreated.addListener(function() {
    chrome.tabs.query({'currentWindow': true}, function(tabs) {
      chrome.storage.sync.get(function(items) {
        for (var i = 0; i < items['urls'].length; i++) {
          if (i === 0) {
            chrome.tabs.update(tabs[0].id, {'url': items['urls'][i]});
          } else {
            chrome.tabs.create({'url': items['urls'][i]});
          }
        }
      }); // End storage.sync.get
    }); // End tabs.query
  }); // End windows.onCreated

}
