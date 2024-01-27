// Function to redirect if the URL contains "/shorts/"
const redirectIfShortsUrl = (details) => {
  const url = new URL(details.url);

  // Check if the extension is active
  chrome.storage.sync.get({ isActive: true }, ({ isActive }) => {
    if (isActive && url.pathname.includes("/shorts/")) {
      // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
      const newUrl = url.href.replace("/shorts/", "/watch/");
      // Cancel the navigation and redirect
      chrome.webNavigation.onBeforeNavigate.removeListener(redirectIfShortsUrl);
      chrome.tabs.update(details.tabId, { url: newUrl });
    }
  });
};

// Add event listener for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(redirectIfShortsUrl);
