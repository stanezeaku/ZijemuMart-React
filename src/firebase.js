import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {

  apiKey: "AIzaSyBHOom_awU8iC_dChiW9Zg8oW3pIJdMsxg",
  authDomain: "zijemu.firebaseapp.com",
  projectId: "zijemu",
  storageBucket: "zijemu.appspot.com",
  messagingSenderId: "626104557544",
  appId: "1:626104557544:web:06f98151f2c5ea760cce5d",
  measurementId: "G-18WY1S3QQ8",
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "FD2moWd0d4Io4StgufC2HhyMl_Jb4Kg_k3AoMQYzaGE",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
