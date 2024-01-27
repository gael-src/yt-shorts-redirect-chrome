// background.js

// Variable to store the activation status
let isActive = true;

// Function to update the activation status based on storage
const updateActivationStatus = () => {
  chrome.storage.sync.get(
    { isActive: true },
    ({ isActive: storedIsActive }) => {
      // Check if there is a change in activation status
      if (isActive !== storedIsActive) {
        // Update the activation status
        isActive = storedIsActive;
      }
    }
  );
};

// Initial setup to get the activation status
updateActivationStatus();

// Listen for changes in activation status
chrome.storage.onChanged.addListener(updateActivationStatus);

// Listen for navigation events and perform redirection if active
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (isActive) {
    const url = new URL(details.url);

    // Check if the URL contains "/shorts/"
    if (url.pathname.includes("/shorts/")) {
      // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
      const newUrl = url.href.replace("/shorts/", "/watch/");
      chrome.tabs.update(details.tabId, { url: newUrl });
    }
  }
});
