// main.js

const redirectIfShortsUrl = () => {
  const currentUrl = window.location.href;

  // Check if the URL contains "/shorts/"
  if (currentUrl.includes("/shorts/")) {
    // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
    const newUrl = currentUrl.replace("/shorts/", "/watch/");
    window.location.href = newUrl;
  }
};

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(redirectIfShortsUrl);

// Define the configuration for the observer
const observerConfig = {
  childList: true, // Watch for changes in the child elements of the target
  subtree: true, // Watch for changes in the entire subtree
};

// Start observing the target node (the <body> element)
observer.observe(document.body, observerConfig);

// Execute the redirection function on page load
redirectIfShortsUrl();
