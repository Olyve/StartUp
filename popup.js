document.addEventListener('DOMContentLoaded', function() {
  // Grab references to the buttons
  var addUrlButton = document.getElementById('addUrl');
  var deleteUrlButton = document.getElementById('deleteUrl');
  var clearAllButton = document.getElementById('clearAll');

  // Variable to store the array of urls
  var savedUrls = [];

  // Set the event listener for the addUrlButton
  addUrlButton.addEventListener('click', function() {
    console.log('Add Url Clicked');
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
      var activeTabUrl = tabs[0].url;


      // Check if there are saved URL's in storage
      chrome.storage.sync.get(function(items) {
        if (items['urls']) { // Found URL's so add them to savedUrls
          savedUrls = items['urls'];
          // Next add the current URL on to savedUrls
          savedUrls.push(activeTabUrl);
          chrome.storage.sync.set({'urls': savedUrls}, function() {
            if (chrome.runtime.lastError) {
              console.error('StartUp Error: Could not save Urls ' + chrome.runtime.lastError);
            }
          })
        } else { // No data found in storage
          // Add the current URL
          savedUrls.push(activeTabUrl);
          chrome.storage.sync.set({'urls': savedUrls}, function () {
            if (chrome.runtime.lastError) {
              console.error('StartUp Error: Could not save Urls ' + chrome.runtime.lastError);
            }
          })
        }

        // FIXME - Only for testing purposes.
        for (var i = 0; i < savedUrls.length; i++) {
          console.log(savedUrls[i]);
        }
      }); // End storage.sync.get
    });// End tabs.query
  }); // end addUrlButton event listener

}); // End document event listener
