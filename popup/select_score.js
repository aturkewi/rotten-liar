const logError = (error) => {
  console.error("An error occurred", error);
}

function listenForSubmit() {
  const submit = document.getElementById("js--submit")

  submit.addEventListener("click", () => {
    const criticScoreElem = document.getElementById("js--critic_score")
    const audienceScoreElem = document.getElementById("js--audience_score")

    const sendMessage = (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "set_score",
        criticScore: criticScoreElem.value,
        audienceScore: audienceScoreElem.value
      });
    }

    browser.tabs.query({active: true, currentWindow: true})
      .then(sendMessage)
  })
}

browser.tabs.executeScript({file: "/content_scripts/set_score.js"})
.then(listenForSubmit)
.catch(logError)
