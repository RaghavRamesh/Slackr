document.addEventListener('DOMContentLoaded', () => {
  var displayTimeout;
  var displayTimeoutValue = 5000;

  // Save button handler
  var saveButton = document.getElementById('saveBtn');
  saveButton.addEventListener('click', () => {
    if (document.getElementById("frequencyField").value < 1) {
      document.getElementById("displayLabel").innerHTML = "Invalid frequence value.";
      document.getElementById("frequencyField").value = 15;
      displayTimeout = setTimeout(() => {
        document.getElementById("displayLabel").innerHTML = "";
      }, displayTimeoutValue);

      return;
    }

    var options = {
      title: document.getElementById("titleField").value || 'Hey!',
      message: document.getElementById("messageField").value || 'Are you working?',
      interval: document.getElementById("frequencyField").value || 15,
    }

    // Clear input
    document.getElementById("titleField").value = "";
    document.getElementById("frequencyField").value = "";
    document.getElementById("messageField").value = "";
    document.getElementById("displayLabel").innerHTML = "Settings saved. You will be notified every " + options.interval + " minutes.";

    if (displayTimeout) clearTimeout(displayTimeout);
    displayTimeout = setTimeout(() => {
      document.getElementById("displayLabel").innerHTML = "";
    }, displayTimeoutValue);

    chrome.runtime.sendMessage({
      message: "save",
      options: options
    }, (response) => {
      console.log(console.log("Response from script:", response.message));
    });
  });

  // Preview button handler
  var previewButton = document.getElementById('previewBtn');
  previewButton.addEventListener('click', () => {
    var options = {
      title: document.getElementById("titleField").value || 'Hey!',
      message: document.getElementById("messageField").value || 'Are you working?',
      interval: document.getElementById("frequencyField").value || 15,
    }

    chrome.runtime.sendMessage({
      message: "preview",
      options: options
    }, (response) => {
      console.log(console.log("Response from script:", response.message));
    });
  });

  // Stop button handler
  var stopButton = document.getElementById('stopBtn');
  stopButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: "stop"}, (response) => {
      console.log(console.log("Response from script:", response.message));
    });
    document.getElementById("displayLabel").innerHTML = "No more notifications will be sent.";
    if (displayTimeout) clearTimeout(displayTimeout);
    displayTimeout = setTimeout(() => {
      document.getElementById("displayLabel").innerHTML = "";
    }, displayTimeoutValue);
  });

  // Close button handler
  var closeButton = document.getElementById('closeBtn');
  closeButton.addEventListener('click', () => {
    window.close();
  });
});
