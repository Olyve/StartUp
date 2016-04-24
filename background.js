// Global Variables
var currentGroup;
var groups = [];
var options = [];

var saveData = function () {
  // Save default options, currrentGroup, and groups
  chrome.storage.sync.set({'options': options, 'currentGroup': currentGroup, 'groups': groups}, function() {
    if (chrome.runtime.lastError) {
      console.error("Could not save because: " + chrome.runtime.lastError);
    }
  });
}

// On start query for saved data to make sure data is current
chrome.storage.sync.get(function(items) {
  // Check if there are groups
  if (items['groups']) { // Set the groups
    groups = items['groups'];
  } else { // Create default group and add to list of groups
    currentGroup = new Group('default', []);
    groups = [currentGroup];
  }

  // Check for current group, if none set to first available group
  if (items['currentGroup']) {
    currentGroup = items['currentGroup'];
  } else {
    currentGroup = groups[0];
  }

  // Check for the options
  if (items['options']) {
    options = items['options'];
  } else {
    // No options, set the default options and save them
    options['overrideHomepages'] = true;
  }

  saveData();

  // After data has been fetched bring up the tabs
  chrome.tabs.query({'currentWindow': true}, function(tabs) {
    for (var i = 0; i < currentGroup.urls.length; i++) {
      if (options['overrideHomepages']) {
        if (tabs[i].url.length > 0) {
          chrome.tabs.update(tabs[0].id, {'url': currentGroup.urls[i]});
        } else {
          chrome.tabs.create({'url': currentGroup.urls[i]});
        }
      } else { // Don't override homepages or open tabs
        chrome.tabs.create({'url': currentGroup.urls[i]});
      }
      currentGroup.urls[i]
    }
  }); // End tabs.query

}); // End storage.sync.get

// Add message listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  // If add url was sent
  if (request.message === 'addUrl') {
    console.log('Recieved message: ' + request.message);
    // Check if the group contains the url already
    if (currentGroup.containsUrl(sender.url) === false) {
      currentGroup.addUrl(sender.url);
      saveData();
      sendResponse({'message': 'Saved ' + sender.url});
    }
  }

  // If remove url was sent
  if (request.message === 'removeUrl') {
    // Check if the group contains the url
    if (currentGroup.containsUrl(sender.url)) {
      currentGroup.removeUrl(sender.url);
      saveData();
      sendResponse({'message': 'Removed ' + sender.url})
    }
  }
});
