document.addEventListener('DOMContentLoaded', function() {
  // Grab references to the buttons
  var addUrlButton = document.getElementById('addUrl');
  var deleteUrlButton = document.getElementById('deleteUrl');
  var clearAllButton = document.getElementById('clearAll');

  // Variable to store the array of urls
  var savedUrls = [];

  // Set the event listener for the addUrlButton
  addUrlButton.addEventListener('click', function() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
      var activeTabUrl = tabs[0].url;

      // Check if there are saved URL's in storage
      chrome.storage.sync.get(function(items) {
        if (items['urls']) { // Found URL's so add them to savedUrls
          savedUrls = items['urls'];
          // Check if the url is already saved
          for (var i = 0; i < savedUrls.length; i++) {
            if (activeTabUrl === savedUrls[i]) {
              console.error('StartUp Error: The link has already been saved.');
              return; // Exit the current function without adding to the urls
            }
          }
          // If the link is not already saved, add the current URL on to savedUrls
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
              console.warn('StartUp Error: Could not save Urls ' + chrome.runtime.lastError);
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

  // Set the event listener for the deleteUrlButton
  deleteUrlButton.addEventListener('click', function () {
    // Grab the active tab
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
      // Store the active tab url
      var activeTabUrl = tabs[0].url;
      // Check if the url is stored, if so delete it
      chrome.storage.sync.get(function(items) {
        if (items['urls']) {
          savedUrls = items['urls'];
          savedUrls = savedUrls.filter(function(url){
            return url !== activeTabUrl;
          });
          chrome.storage.sync.set({'urls': savedUrls}, function() {
            if (chrome.runtime.lastError) {
              console.error('StartUp Error: Could not save Urls ' + chrome.runtime.lastError);
            }
            // FIXME - Only for testing purposes.
            for (var i = 0; i < savedUrls.length; i++) {
              console.log(savedUrls[i]);
            }
          });
        }
      });
    });
  });

  // Set the event listener for the clearAllButton
  clearAllButton.addEventListener('click', function() {
    savedUrls = [];
    chrome.storage.sync.set({'urls': savedUrls}, function() {
      if (chrome.runtime.lastError) {
        console.error('StartUp Error: Could not clear Urls ' + chrome.runtime.lastError);
      }
    }); // End of storage.local.set
  }); // End of clearAllButton event listener

}); // End document event listener
