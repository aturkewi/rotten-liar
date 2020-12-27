console.log("I have run on the tab");

(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "set_score") {
      console.log("LOGGING MESSSGE:");
      console.log(message);
    }
  });

})();
