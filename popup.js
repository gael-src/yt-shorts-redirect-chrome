document.addEventListener("DOMContentLoaded", function () {
  // Get the toggle element
  const activationToggle = document.getElementById("activationToggle");

  // Save the default state to chrome.storage
  chrome.storage.sync.set({ isActive: true });

  // Add event listener for toggle changes
  activationToggle.addEventListener("change", function () {
    // Save the state to chrome.storage
    chrome.storage.sync.set({ isActive: activationToggle.checked });
  });
});
