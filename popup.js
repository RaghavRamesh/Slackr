document.addEventListener('DOMContentLoaded', () => {
  var displayTimeout;
  var saveButton = document.getElementById('saveBtn');
  saveButton.addEventListener('click', () => {
    if (document.getElementById("intervalField").value < 0) {
      document.getElementById("displayLabel").innerHTML = "Invalid interval value.";
      document.getElementById("intervalField").value = 15;
      displayTimeout = setTimeout(() => {
        document.getElementById("displayLabel").innerHTML = "";
      }, 3000);

      return;
    }

    var options = {
      title: document.getElementById("titleField").value || 'Hey!',
      message: document.getElementById("messageField").value || 'Are you working?',
      interval: document.getElementById("intervalField").value || 15,
    }
    console.log(options);
    document.getElementById("titleField").value = "";
    document.getElementById("intervalField").value = "";
    document.getElementById("messageField").value = "";
    document.getElementById("displayLabel").innerHTML = "Settings saved! You can exit the popup now.";
    if (displayTimeout) clearTimeout(displayTimeout);
    displayTimeout = setTimeout(() => {
      document.getElementById("displayLabel").innerHTML = "";
    }, 3000);
    chrome.runtime.sendMessage({
      message: "saveOptions",
      options: options
    }, (response) => {
      console.log(console.log("Response from script:", response.message));
    });
  });

  var stopButton = document.getElementById('stopBtn');
  stopButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: "stop"}, (response) => {
      console.log(console.log("Response from script:", response.message));
    });
    document.getElementById("displayLabel").innerHTML = "No more notifications will be sent.";
    if (displayTimeout) clearTimeout(displayTimeout);
    displayTimeout = setTimeout(() => {
      document.getElementById("displayLabel").innerHTML = "";
    }, 3000);
  });
});
