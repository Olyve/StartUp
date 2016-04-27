// Global Variables
var currentGroup;
var groups = [];
var options;

// Short hand function to save the current data to storage
var saveData = function () {
  // Save default options, currrentGroup, and groups
  chrome.storage.sync.set({'currentGroup': currentGroup, 'groups': groups}, function() {
    if (chrome.runtime.lastError) {
      console.error("Could not save because: " + chrome.runtime.lastError);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // On start query for saved data to make sure data is current
  chrome.storage.sync.get(function(items) {
    console.log(items);
    // Check if there are groups
    if (items['groups']) { // Set the groups
      groups = items['groups'];
    } else { // Create default group and add to list of groups
      currentGroup = new Group('default', []);
      groups.push(currentGroup);
      saveData();
    }

    // Check for current group, if none set to first available group
    if (items['currentGroup']) {
      currentGroup = items['currentGroup'];
    } else {
      currentGroup = groups[0];
      saveData();
    }

    if (items['options']) {
      options = items['options'];
    }

    // After data has been fetched bring up the tabs
    chrome.tabs.query({'currentWindow': true}, function(tabs) {
      for (var i = 0; i < currentGroup.urls.length; i++) {
        if (options.overridePages === true) {
          if (tabs[i].url.length > 0) {
            chrome.tabs.update(tabs[0].id, {'url': currentGroup.urls[i]});
          } else {
            chrome.tabs.create({'url': currentGroup.urls[i]});
          }
        } else { // Don't override homepages or open tabs
          chrome.tabs.create({'url': currentGroup.urls[i]});
        }
      }
    }); // End tabs.query

  }); // End storage.sync.get

  // Add message listener
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    // addUrl
    if (request.message === 'addUrl') {
      console.log('Recieved message: ' + request.message);
      // Check if the group contains the url already
      if (Group.prototype.containsUrl.call(currentGroup, request.url) === false) {
        Group.prototype.addUrl.call(currentGroup, request.url);
        saveData();
        sendResponse({'message': 'Saved ' + request.url});
      }
    }

    // removeUrl
    if (request.message === 'removeUrl') {
      // Check if the group contains the url
      if (Group.prototype.containsUrl.call(currentGroup, request.url)) {
        Group.prototype.removeUrl.call(currentGroup, request.url);
        saveData();
        sendResponse({'message': 'Removed ' + request.url})
      }
    }

    // clearAll
    if (request.message === 'clearAll') {
      Group.prototype.clearUrls.call(currentGroup);
      saveData();
      sendResponse({'message': 'Urls have been cleared.'});
    }

    // getCurrentGroupName
    if (request.message === 'getCurrentGroup') {
      sendResponse({'group': currentGroup});
    }

    // changeName
    if (request.message === 'changeName') {
      if (request.newName) {
        currentGroup.name = request.newName;
        sendResponse({'message': 'Updated currentGroup.name'});
      } else {
        console.error('No new name was found in the requested message.');
        sendResponse({'message': 'Could not update currentGroup.name. Please check background.js for more information.'});
      }
    }

  }); // End of runtime.onMessage
}); // End document.addEventListener
