// content.js

const redirectIfShortsUrl = () => {
  const currentUrl = window.location.href;

  // Check if the URL contains "/shorts/"
  if (currentUrl.includes("/shorts/")) {
    // Redirect to "/watch/" by replacing "/shorts/" with "/watch/"
    const newUrl = currentUrl.replace("/shorts/", "/watch/");
    window.location.href = newUrl;
  }
};

// Execute the redirection function on page load
redirectIfShortsUrl();

// Listen for changes in the URL (e.g., when navigating within the site)
window.addEventListener("hashchange", redirectIfShortsUrl);
