document.addEventListener('DOMContentLoaded', function() {
  // Grab references to the buttons
  var addUrlButton = document.getElementById('addUrl');
  var deleteUrlButton = document.getElementById('deleteUrl');
  var optionsButton = document.getElementById('options');
  var clearAllButton = document.getElementById('clearAll');

  // Set the event listener for the addUrlButton
  addUrlButton.addEventListener('click', function() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
      var activeTabUrl = tabs[0].url;

      // If the current group does not contain the url
      if (currentGroup.contains(activeTabUrl) == false) {
        currentGroup.urls.append(activeTabUrl);
      }

      // Save updated group
      chrome.storage.sync.set({'currrentGroup': currrentGroup, 'groups': groups}, function() {
        console.error("Could not save because: " + chrome.runtime.lastError);
      });
    }); // End tabs.query
  }); // end addUrlButton event listener

  // Set the event listener for the deleteUrlButton
  deleteUrlButton.addEventListener('click', function () {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
      var activeTabUrl = tabs[0].url;
      // Check if the url is stored, if so delete it
      if (currrentGroup.contains(activeTabUrl)) {
        currentGroup.removeUrl(activeTabUrl);
      }

      // Save updated group
      chrome.storage.sync.set({'currrentGroup': currrentGroup, 'groups': groups}, function() {
        console.error("Could not save because: " + chrome.runtime.lastError);
      }); // End storage.sync.set
    }); // End tabs.query
  }); // End deleteUrlButton event listener

  // Set the event listener for the options button
  optionsButton.addEventListener('click', function() {
    chrome.tabs.create({'url':'/options.html'});
  }); // End optionsButton event listener

}); // End document event listener
