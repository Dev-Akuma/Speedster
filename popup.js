// popup.js
document.addEventListener('DOMContentLoaded', function () {
    // Get the current speed from the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getCurrentSpeed
        }, (result) => {
            // Display the current speed
            const speedDisplay = document.getElementById('speedDisplay');
            speedDisplay.textContent = result[0].result.toFixed(1) + 'x';
        });
    });
});

// Function to retrieve the current speed from the content script
function getCurrentSpeed() {
    const video = document.querySelector('video');
    return video ? video.playbackRate : 1.0;
}
