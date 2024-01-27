// main.js

const redirectIfShortsUrl = (details) => {
  const url = new URL(details.url);

  // Check if the URL contains "/shorts/"
  if (url.pathname.includes("/shorts/")) {
    // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
    const newUrl = url.href.replace("/shorts/", "/watch/");

    // Cancel the navigation and redirect
    chrome.webNavigation.onBeforeNavigate.removeListener(redirectIfShortsUrl);
    chrome.tabs.update(details.tabId, { url: newUrl });
  }
};

const handleDomChanges = () => {
  // Check if the extension is active
  chrome.storage.sync.get({ isActive: true }, ({ isActive }) => {
    if (isActive) {
      redirectIfShortsUrl();
    }
  });
};

// Add event listener for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(redirectIfShortsUrl);

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(handleDomChanges);

// Define the configuration for the observer
const observerConfig = {
  childList: true, // Watch for changes in the child elements of the target
  subtree: true, // Watch for changes in the entire subtree
};

// Start observing the target node (the <body> element)
observer.observe(document.body, observerConfig);

// Execute the redirection function on page load
handleDomChanges();
