document.addEventListener('DOMContentLoaded', function() {
  var options = [];
  var groups = [];
  var currentGroup;

  // Check for options array containing options
  chrome.storage.sync.get(function(items) {
    if (items['options']) {
      // Update options on page to reflect saved options
      if (items['options']['overrideHomepages']) {
        $('#overrideHomepages').prop("checked", overrideHomepages);
      }
    }
  });

});
