// Detection of history API, 'borrowed' from Modernizr
module.exports = function() {
  var ua = navigator.userAgent;

  // We only want Android 2, stock browser, and not Chrome which identifies
  // itself as 'Mobile Safari' as well
  if (ua.indexOf('Android 2') !== -1 &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1) {
    return false;
  }

  // Return the regular check
  if (window.history && 'pushState' in history) {
    return true;
  }
}
