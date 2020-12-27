console.log("I have run on the tab");

(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const allImageClasses = [
    "certified_fresh"
  ]

  const getImageClass = (score) => {
    if(score >= 100){
      return "fresh"
    }
    if(score > 90){
      return "certified_fresh"
    }
    return "rotten"
  }

  const setScore = (container, score) => {
    const percentage = container.getElementsByClassName("mop-ratings-wrap__percentage")[0]
    percentage.innerHTML = `${score}%`
  }

  const setImage = (container, score) => {
    const iconSpan = container.getElementsByClassName("mop-ratings-wrap__icon")[0]
    const classArray = iconSpan.className.split(" ")
    const cleanClassList = classArray.reduce((acc, current) => {
      if (allImageClasses.indexOf(current) == -1) {
        return [...acc, current]
      } else {
        return acc
      }
    }, [])

    const imageClass = getImageClass(score)
    iconSpan.className = [...cleanClassList, imageClass].join(" ")
  }

  const updateCriticScore = (score) => {
    const criticScoreContainer = document.getElementsByClassName("critic-score")[0]
    setScore(criticScoreContainer, score)
    setImage(criticScoreContainer, score)
  }
  //
  // const updateAudientScore = (score) => {
  //
  // }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "set_score") {
      updateCriticScore(message.criticScore)
      // updateAudientScore(message.audienceScore)
      console.log("LOGGING MESSSGE:");
      console.log(message);
    }
  });

})();
