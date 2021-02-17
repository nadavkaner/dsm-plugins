import React from "react";
import tinycolor from "tinycolor2";
import { usePluginData } from "./hooks/usePluginData";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { usePluginHeight } from "./hooks/usePluginHeight";

export default function AssetsListPlugin() {
  const { pluginData, openAssetPicker } = usePluginData();
  usePluginHeight();

  return (
    <div className="c-assets-list">
      {!pluginData.readOnly && (
        <div className="c-open-assets-picker__button">
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            color="primary"
            onClick={openAssetPicker}
          >
            <AddIcon className="c-add-icon" style={{ color: "white" }} /> Add
            colors
          </Button>
        </div>
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
