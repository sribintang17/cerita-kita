function requestPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(result => {
      if (result === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission denied.");
      }
    });
  }
}

export default requestPermission;
