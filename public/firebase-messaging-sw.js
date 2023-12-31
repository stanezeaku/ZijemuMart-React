importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBHOom_awU8iC_dChiW9Zg8oW3pIJdMsxg",
  authDomain: "zijemu.firebaseapp.com",
  projectId: "zijemu",
  storageBucket: "zijemu.appspot.com",
  messagingSenderId: "626104557544",
  appId: "1:626104557544:web:06f98151f2c5ea760cce5d",
  measurementId: "G-18WY1S3QQ8",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
