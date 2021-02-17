import React, { useEffect, useCallback, useState } from "react";
import tinycolor from "tinycolor2";
import { ReactComponent as AddIcon } from "./fab-add.svg";

const PLUGIN_MESSAGE_API = {
  initialized: "dsm_initialized",
  openAssetPicker: "dsm_openAssetPicker",
  getDsmData: "dsm_getDsmData",
  saveMetadata: "dsm-saveMetadata",
};

export default function AssetsListPlugin() {
  const [pluginData, setPluginData] = useState({});

  useEffect(() => {
    window.parent.postMessage(
      { eventName: PLUGIN_MESSAGE_API.initialized },
      "*"
    );
  }, []);

  const handleMessage = useCallback((event) => {
    console.log("Inside iframe message!: ", event);
    switch (event.data.eventName) {
      case PLUGIN_MESSAGE_API.getDsmData: {
        setPluginData(event.data || {});
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

  return (
    <div>
      <button
        className="c-open-assets-picker__button"
        onClick={openAssetPicker}
      >
        <AddIcon className="c-add-icon" style={{ color: "white" }} /> Add colors
      </button>
      <div>{pluginData.block?.metadata}</div>
      {(pluginData.block?.items || []).map((color) => {
        const colorObj = tinycolor(color.value);
        return (
          <div className="c-color-row">
            <div
              className="c-color-row__color-rect"
              style={{ backgroundColor: color.value }}
            />
            <div className="c-color-row__color-name">{color.name}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                <div className="c-color-row__color-representation-text">
                  HEX
                </div>
                <div style={{ fontWeight: 500 }}>
                  {colorObj.toHexString().toUpperCase()}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="c-color-row__color-representation-text">
                  RGBA
                </div>
                <div style={{ fontWeight: 500 }}>{colorObj.toRgbString()}</div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="c-color-row__color-representation-text">
                  HSL
                </div>
                <div style={{ fontWeight: 500 }}>{colorObj.toHslString()}</div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="c-color-row__color-representation-text">
                  HSV
                </div>
                <div style={{ fontWeight: 500 }}>{colorObj.toHsvString()}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
