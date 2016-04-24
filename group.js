// Create the Group class
var Group = function (name, urls) {
  this.name = name;
  this.urls = urls;
};

// Clears all urls from the group
Group.prototype.clearUrls = function () {
  this.urls = [];
};

// Adds the specified url to the group
Group.prototype.addUrl = function (url) {
  this.urls.append(url);
};

// Removes the specified url from the group
Group.prototype.removeUrl = function (url) {
  this.urls = this.urls.filter(function(_url){
    return url !== _url;
  });
};

// Renames the group
Group.prototype.rename = function (name) {
  this.name = name;
};

// Checks whether or not the group contains the specified url
// Returns either true or false
Group.prototype.containsUrl = function (url) {
  var contains = false;
  for (var i = 0; i < this.urls.length; i++) {
    if (this.urls[i] === url) {
      contains = true;
      break;
    }
  }
  return contains;
};
