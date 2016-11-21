/**
 * Schedules a notification at regular intervals.
 * @param {Object} options
 * @param {number} options.interval (in minutes)
 * @param {string} options.title
 * @param {string} options.message body
 * @returns {number} timeout reference
 */
function main(options) {
  return setInterval(() => {
    console.log(options);
    createNotification(options.title, options.message)
  }, options.interval * 60000); // interval times 60 seconds
}

/**
 * Creates a Chrome notification.
 * @param {string} title
 * @param {string} message body
 */
function createNotification(title, message) {
  chrome.notifications.create('c' + ++i, {
    type:    "basic",
    title:   title,
    message: message,
    iconUrl: "icons/sloth-128.png"
  }, (id) => console.log(id));
}

/**
 * Cancels the notification scheduler if it exists.
 */
function cancelNotification() {
  if (existingInterval) clearInterval(existingInterval);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message == "save") {
    // Cancel an existing notification scheduler if any
    cancelNotification();

    existingInterval = main(request.options);
  } else if (request.message == "preview") {
    createNotification(request.options.title, request.options.message);
  }else if (request.message == "stop") {
    cancelNotification();
  }
  sendResponse({ message: "Message received." });
});

var i = 0;
var existingInterval;

// App init
existingInterval = main({ title: 'Hey!', message: 'Are you working?', interval: 15 });
