// When the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the button and status elements by their IDs
  const activationToggle = document.getElementById("activationToggle");
  const statusMessage = document.getElementById("statusMessage");

  // Initialize the extension status by getting it from storage
  // If the status is not set in storage, default to true (activated)
  chrome.storage.sync.get({ isActive: true }, ({ isActive }) => {
    // Update the status display based on the current status
    updateStatus(isActive);
  });

  // Add an event listener for the button click
  activationToggle.addEventListener("click", () => {
    // Get the current activation status from storage
    chrome.storage.sync.get({ isActive: true }, ({ isActive }) => {
      // Toggle the activation status
      const newStatus = !isActive;
      // Save the new status to storage
      chrome.storage.sync.set({ isActive: newStatus }, () => {
        // Update the status display based on the new status
        updateStatus(newStatus);
      });
    });
  });

  // Function to update the status display and color
  const updateStatus = (isActive) => {
    // Set the text content and color class based on the activation status
    statusMessage.textContent = isActive ? "Activated" : "Deactivated";
    statusMessage.className = isActive ? "green" : "red";
  };
});
