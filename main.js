// main.js

// Function to redirect if the URL contains "/shorts/"
const redirectIfShortsUrl = (details) => {
  const url = new URL(details.url);

  // Check if the URL contains "/shorts/"
  if (url.pathname.includes("/shorts/")) {
    // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
    const newUrl = url.href.replace("/shorts/", "/watch/");
    chrome.tabs.update(details.tabId, { url: newUrl });
  }
};

// Function to handle DOM changes and activate/deactivate redirection
const handleDomChanges = () => {
  chrome.storage.sync.get({ isActive: true }, ({ isActive }) => {
    if (isActive) {
      // If extension is active, add listener for navigation events
      chrome.webNavigation.onBeforeNavigate.addListener(redirectIfShortsUrl);
    } else {
      // If extension is inactive, remove listener for navigation events
      chrome.webNavigation.onBeforeNavigate.removeListener(redirectIfShortsUrl);
    }
  });
};

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(handleDomChanges);

// Configuration for the observer
const observerConfig = {
  childList: true, // Watch for changes in the child elements of the target
  subtree: true, // Watch for changes in the entire subtree
};

// Start observing the target node (the <body> element)
observer.observe(document.body, observerConfig);

// Execute the redirection function on page load
handleDomChanges();
