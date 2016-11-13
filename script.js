function main(options) {
  return setInterval(() => {
    console.log(options);
    createNotification(options.title, options.message)
  }, options.interval * 60000);
}

function createNotification(title, message) {
  chrome.notifications.create('c' + ++i, {
    type:    "basic",
    title:   title,
    message: message,
    iconUrl: "icons/sloth-128.png"
  }, (id) => console.log(id));
}

function cancelNotification() {
  if (existingInterval) clearInterval(existingInterval);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == "saveOptions") {
    // One-time test notification
    createNotification(request.options.title, "Testing: Following will be the message content in " + request.options.interval + " minutes: " + request.options.message);
    cancelNotification();
    existingInterval = main(request.options);
  } else if (request.message == "stop") {
    cancelNotification();
  }
  sendResponse({ message: "Message received." });
});

var i = 0;
var existingInterval;

// Initial notification settings
existingInterval = main({ title: 'Hey!', message: 'Are you working?', interval: 15 });
