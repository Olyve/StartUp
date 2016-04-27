// Do this after page content has loaded
document.addEventListener('DOMContentLoaded', function() {
  var options = {};
  loadOptions();

  // Get the current group and fill in details
  chrome.runtime.sendMessage({'message': 'getCurrentGroup'}, function(response) {
    var group = response.group;
    document.getElementById('currentGroup').innerText = group.name;
    displayUrls(group.urls);
  });

  /* Button Listeners */

  // Add listener to clearUrls
  document.getElementById('clearAll').addEventListener('click', function() {
    chrome.runtime.sendMessage({'message': 'clearAll'}, function(response) {
      console.log(response.message);
      chrome.tabs.reload();
    });
  });

  // Add listener to saveChanges
  document.getElementById('saveChanges').addEventListener('click', function() {
    saveOptions();
  });

  document.getElementById('changeName').addEventListener('click', function() {
    var newName = document.getElementById('newName');
    var name;

    // Validate new name
    if (newName.value.length > 0 && newName.value.length < 13) {
      name = newName.value.trim();
    }

    // Tell background.js to update the name
    chrome.runtime.sendMessage({'message': 'changeName', 'newName': name}, function(response) {
      console.log(response.message);
      chrome.tabs.reload();
    });
  });

}); // End of document.addEventListener

/* Methods */

// Load options method
function loadOptions() {
  // Check for options object containing options
  chrome.storage.sync.get(function(items) {
    // Check for the options object
    if (items['options']) {
      options = items['options'];

      /* Set options on page. */
      document.getElementById('overridePages').checked = options.overridePages;
    }

  });
}

// Save options method
function saveOptions() {
  options.overridePages = document.getElementById('overridePages').checked;
  chrome.storage.sync.set({'options': options}, function() {
    if (chrome.runtime.lastError) {
      console.error('Could not save options: ' + chrome.runtime.lastError);
    } else {
      chrome.tabs.reload();
    }
  });
}

// Display group urls
function displayUrls(list) {
  var div = document.getElementById('urls');
  for (var i = 0; i < list.length; i++) {
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(list[i]));
    div.appendChild(p);
  }
}
