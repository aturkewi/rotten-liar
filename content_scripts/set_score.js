(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const allImageClasses = [
    "certified_fresh", "fresh", "rotten", "upright", "spilled"
  ]

  const getCriticImageClass = (score) => {
    if(score >= 75){
      return "certified_fresh"
    }
    if(score >= 60){
      return "fresh"
    }
    return "rotten"
  }

  const getAudienceImageClass = (score) => {
    if(score >= 50){
      return 'upright'
    }
    return 'spilled'
  }

  const setScore = (container, score) => {
    const percentage = container.getElementsByClassName("mop-ratings-wrap__percentage")[0]
    percentage.textContent = `${score}%`
  }

  const cleanClass = (iconSpan) => {
    const classArray = iconSpan.className.split(" ")
    return classArray.reduce((acc, current) => {
      if (allImageClasses.indexOf(current) == -1) {
        return [...acc, current]
      } else {
        return acc
      }
    }, [])
  }

  const setCriticImage = (container, score) => {
    const iconSpan = container.getElementsByClassName("mop-ratings-wrap__icon")[0]
    const cleanClassList = cleanClass(iconSpan)
    const imageClass = getCriticImageClass(score)
    iconSpan.className = [...cleanClassList, imageClass].join(" ")
  }

  const setAudienceImage = (container, score) => {
    const iconSpan = container.getElementsByClassName("mop-ratings-wrap__icon")[0]
    const cleanClassList = cleanClass(iconSpan)
    const imageClass = getAudienceImageClass(score)
    iconSpan.className = [...cleanClassList, imageClass].join(" ")
  }

  const updateCriticScore = (criticScoreContainer, score) => {
    setScore(criticScoreContainer, score)
    setCriticImage(criticScoreContainer, score)
  }

  const updateAudientScore = (audientScoreContainer, score) => {
    setScore(audientScoreContainer, score)
    setAudienceImage(audientScoreContainer, score)
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "set_score") {
      const scoreboard = document.getElementsByClassName("js-scoreboard-container")[0]
      const ciritcScoreContainer = scoreboard.children[0]
      const audientScoreContainer = scoreboard.children[1]

      updateCriticScore(ciritcScoreContainer, message.criticScore)
      updateAudientScore(audientScoreContainer, message.audienceScore)
    }
  });

})();
