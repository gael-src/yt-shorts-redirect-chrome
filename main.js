// Function to redirect if the URL contains "/shorts/"
const redirectIfShortsUrl = (details) => {
  const url = new URL(details.url);

  // Check if the extension is active
  chrome.storage.sync.get({ isActive: true }, ({ isActive }) => {
    console.log("Extension is active:", isActive);

    if (isActive && url.pathname.includes("/shorts/")) {
      console.log("Redirecting from:", url.href);

      // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
      const newUrl = url.href.replace("/shorts/", "/watch/");

      console.log("Redirecting to:", newUrl);

      // Cancel the navigation and redirect
      chrome.webNavigation.onBeforeNavigate.removeListener(redirectIfShortsUrl);
      chrome.tabs.update(details.tabId, { url: newUrl });
    }
  });
};

// Add event listener for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(redirectIfShortsUrl);
