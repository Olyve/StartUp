document.addEventListener('DOMContentLoaded', function() {
  // Grab references to the buttons
  var addUrlButton = document.getElementById('addUrl');
  var deleteUrlButton = document.getElementById('deleteUrl');
  var optionsButton = document.getElementById('options');

  // Set the event listener for the addUrlButton
  addUrlButton.addEventListener('click', function() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
      chrome.runtime.sendMessage({'message':'addUrl', 'url': tabs[0].url}, function(response) {
        console.log(response.message);
      }) // End runtime.sendMessage
    }); // End tabs.query
  }); // End addUrlButton event listener

  // Set the event listener for the deleteUrlButton
  deleteUrlButton.addEventListener('click', function () {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs) {
      chrome.runtime.sendMessage({'message': 'removeUrl', 'url':tabs[0].url}, function(response) {
        console.log(response.message);
      }); // End runtime.sendMessage
    }); // End tabs.query
  }); // End deleteUrlButton event listener

  // Set the event listener for the options button
  optionsButton.addEventListener('click', function() {
    chrome.tabs.create({'url':'/options.html'});
  }); // End optionsButton event listener

}); // End document event listener
