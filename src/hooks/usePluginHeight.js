import { PLUGIN_MESSAGE_API } from "../plugin-message-api";

function usePluginHeight() {
  setInterval(() => {
    const appElement = document.getElementById("root");
    if (appElement?.offsetHeight) {
      window.parent.postMessage(
        {
          eventName: PLUGIN_MESSAGE_API.setHeight,
          height: appElement.offsetHeight
        },
        "*"
      );
    }
  }, 250);
}

export { usePluginHeight };
