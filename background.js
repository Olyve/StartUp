// Global Variables
var currentGroup;
var groups = [];
var options = [];

// On start query for saved data to make sure data is current
chrome.storage.sync.get(function(items) {
  // Check if there are groups
  if (items['groups']) { // Set the groups
    groups = items['groups'];
  } else { // First time starting extension, create default group and add to list of groups
    currentGroup = new Group('default', []);
    groups.append(currentGroup);
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

    // Save default options, currrentGroup, and groups
    chrome.storage.sync.set({'options': options, 'currrentGroup': currrentGroup, 'groups': groups}, function() {
      console.error("Could not save because: " + chrome.runtime.lastError);
    });
  }

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
