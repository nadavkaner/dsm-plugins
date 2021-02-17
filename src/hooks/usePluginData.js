import { useState, useCallback, useEffect } from "react";
import { PLUGIN_MESSAGE_API } from "../plugin-message-api";

function usePluginData() {
  const [pluginData, setPluginData] = useState({});

  useEffect(() => {
    window.parent.postMessage(
      { eventName: PLUGIN_MESSAGE_API.initialized },
      "*"
    );
  }, []);

  const handleMessage = useCallback(event => {
    console.log("Inside iframe message!: ", event);
    const { eventName, block } = event.data;
    switch (eventName) {
      case PLUGIN_MESSAGE_API.getDsmData: {
        setPluginData({
          ...(event?.data || {}),
          block: {
            ...block,
            metadata: block?.metadata ? JSON.parse(block?.metadata) : undefined
          }
        });
        break;
      }
      default: {
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  const openAssetPicker = useCallback(() => {
    window.parent.postMessage(
      { eventName: PLUGIN_MESSAGE_API.openAssetPicker },
      "*"
    );
  }, []);

  const saveMetadata = useCallback(metadata => {
    window.parent.postMessage(
      {
        eventName: PLUGIN_MESSAGE_API.saveMetadata,
        metadata: JSON.stringify(metadata)
      },
      "*"
    );
  }, []);

  return { pluginData, openAssetPicker, saveMetadata };
}

export { usePluginData };
