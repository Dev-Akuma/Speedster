(function () {
    let fadeTimeout = null;
    let speedDisplay = null;
    let currentVideo = null;
  
    function showSpeed(rate) {
      const text = `⏩ ${rate.toFixed(1)}x`;
  
      if (!speedDisplay) {
        speedDisplay = document.createElement("div");
        speedDisplay.style.position = "fixed";
        speedDisplay.style.top = "10%";
        speedDisplay.style.left = "50%";
        speedDisplay.style.transform = "translateX(-50%)";
        speedDisplay.style.background = "rgba(0, 0, 0, 0.75)";
        speedDisplay.style.color = "#00ffcc";
        speedDisplay.style.fontSize = "2rem";
        speedDisplay.style.padding = "10px 20px";
        speedDisplay.style.borderRadius = "10px";
        speedDisplay.style.zIndex = "99999";
        speedDisplay.style.fontFamily = "monospace";
        speedDisplay.style.opacity = "1";
        speedDisplay.style.transition = "opacity 0.5s ease";
        document.body.appendChild(speedDisplay);
      }
  
      speedDisplay.textContent = text;
      speedDisplay.style.opacity = "1";
  
      clearTimeout(fadeTimeout);
      fadeTimeout = setTimeout(() => {
        speedDisplay.style.opacity = "0";
      }, 1500);
    }
  
    function bindSpeedControls(videoObj, isWistia = false) {
      currentVideo = videoObj;
  
      window.addEventListener("keydown", function (e) {
        if (!currentVideo) return;
  
        let rate = isWistia ? currentVideo.playbackRate() : currentVideo.playbackRate;
  
        if (e.key === "d") {
          rate = Math.min(rate + 0.1, 16);
        } else if (e.key === "s") {
          rate = Math.max(rate - 0.1, 0.1);
        } else if (e.key === "r") {
          rate = 1.0;
        } else {
          return;
        }
  
        if (isWistia) {
          currentVideo.playbackRate(rate);
        } else {
          currentVideo.playbackRate = rate;
        }
  
        showSpeed(rate);
      });
    }
  
    // First try: Detect regular HTML5 video
    const normalVideo = document.querySelector("video");
    if (normalVideo) {
      console.log("🎥 Detected HTML5 video");
      bindSpeedControls(normalVideo, false);
    }
  
    // Second try: Wistia detection
    window._wq = window._wq || [];
    window._wq.push({
      id: "_all",
      onReady: function (video) {
        console.log("🎥 Detected Wistia video");
        bindSpeedControls(video, true);
      }
    });
  })();
  