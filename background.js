// When chrome starts, bring up the custom home pages
chrome.tabs.query({'currentWindow': true}, function(tabs) {
  chrome.storage.sync.get(function(items) {
    for (var i = 0; i < items['urls'].length; i++) {
      if (i === 0) {
        // Check if the tab already has a url
        if (tabs[0].url === '') {
          chrome.tabs.update(tabs[0].id, {'url': items['urls'][i]});
        } else {
          chrome.tabs.create({'url': items['urls'][i]});
        }
      } else {
        chrome.tabs.create({'url': items['urls'][i]});
      }
    }
  }); // End storage.sync.get
}); // End tabs.query
