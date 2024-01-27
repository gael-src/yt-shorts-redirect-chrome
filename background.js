// background.js

let isActive = true;

const updateActivationStatus = () => {
  chrome.storage.sync.get(
    { isActive: true },
    ({ isActive: storedIsActive }) => {
      const newStatus = storedIsActive;

      if (isActive !== newStatus) {
        // Do something with the updated activation status
        isActive = newStatus;
      }
    }
  );
};

// Initial setup
updateActivationStatus();

// Listen for changes in activation status
chrome.storage.onChanged.addListener(updateActivationStatus);

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (isActive) {
    const url = new URL(details.url);

    // Check if the URL contains "/shorts/"
    if (url.pathname.includes("/shorts/")) {
      // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
      const newUrl = url.href.replace("/shorts/", "/watch/");

      // Cancel the navigation and redirect
      chrome.webNavigation.onBeforeNavigate.removeListener();
      chrome.tabs.update(details.tabId, { url: newUrl });
    }
  }
});
