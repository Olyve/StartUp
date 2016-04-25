document.addEventListener('DOMContentLoaded', function() {
  var options = {};

  // Check for options array containing options
  chrome.storage.sync.get(function(items) {
    options = items['options'];
    console.log(options);

    document.getElementById('overrideHomepages').checked = options.overrideHomepages;
  });

  // Current Group
  chrome.runtime.sendMessage({'message': 'getCurrentGroupName'}, function(response) {
    document.getElementById('currentGroup').innerText = response.name;
  });


  // Add listener to clearUrls
  document.getElementById('clearAll').addEventListener('click', function() {
    chrome.runtime.sendMessage({'message': 'clearAll'}, function(response) {
      console.log(response.message);
    });
  });

  // Add listener to saveChanges
  document.getElementById('saveChanges').addEventListener('click', function() {
    options.overrideHomepages = document.getElementById('overrideHomepages').checked;

    console.log(options);
    chrome.storage.sync.set({'options': options}, function() {
      if (chrome.runtime.lastError) {
        console.error('Could not save options: ' + chrome.runtime.lastError);
      }
    });
  });
});
