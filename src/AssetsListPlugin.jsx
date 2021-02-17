import React from "react";
import tinycolor from "tinycolor2";
import { ReactComponent as AddIcon } from "./fab-add.svg";
import { usePluginData } from "./hooks/usePluginData";
import useHovered from "./useHover";

export default function AssetsListPlugin() {
  const { pluginData, openAssetPicker } = usePluginData();
  const { isHovered, onMouseEnter, onMouseLeave } = useHovered();

  return (
    <div
      className="c-assets-list"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovered && (
        <button
          className="c-open-assets-picker__button"
          onClick={openAssetPicker}
        >
          <AddIcon className="c-add-icon" style={{ color: "white" }} /> Add
          colors
        </button>
      )}
      <div className="c-assets-list">
        {(pluginData.block?.items || []).map(color => {
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
                  <div style={{ fontWeight: 500 }}>
                    {colorObj.toRgbString()}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="c-color-row__color-representation-text">
                    HSL
                  </div>
                  <div style={{ fontWeight: 500 }}>
                    {colorObj.toHslString()}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div className="c-color-row__color-representation-text">
                    HSV
                  </div>
                  <div style={{ fontWeight: 500 }}>
                    {colorObj.toHsvString()}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
