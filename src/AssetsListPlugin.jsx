import React, { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_SNAPSHOTS } from "./graphQL/queries";
import tinycolor from "tinycolor2";
import copy from "copy-to-clipboard";
import { usePluginData } from "./hooks/usePluginData";
import { Button, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { usePluginHeight } from "./hooks/usePluginHeight";
import useHovered from "./hooks/useHover";

export default function AssetsListPlugin() {
  const { pluginData, openAssetPicker } = usePluginData();
  usePluginHeight();
  const [getSnapshots, { called, loading, data, error }] = useLazyQuery(
    GET_SNAPSHOTS
  );

  useEffect(() => {
    if (pluginData?.styleguide && !called) {
      const styleguide = pluginData.styleguide;
      getSnapshots({
        variables: {
          organizationName: styleguide.organization,
          styleguideName: styleguide.kebabName,
        },
      });
    }
  }, [pluginData?.styleguide, getSnapshots, called]);

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
                <ColorValueRow
                  name="HEX"
                  colorValue={colorObj.toHexString().toUpperCase()}
                />
                <ColorValueRow
                  name="RGBA"
                  colorValue={colorObj.toRgbString()}
                />
                <ColorValueRow name="HSL" colorValue={colorObj.toHslString()} />
                <ColorValueRow name="HSV" colorValue={colorObj.toHsvString()} />
              </div>

              <ColorHistory
                color={color}
                snapshots={data?.styleguide?.snapshots}
                loading={loading}
                error={error}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ColorHistory({ color, snapshots, loading, error }) {
  if (error) {
    return null;
  }

  if (loading || !snapshots) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 12,
        }}
      >
        <div style={{ marginBottom: 20, fontSize: 16, fontWeight: 500 }}>
          History
        </div>
        <CircularProgress />
      </div>
    );
  }

  const colorHistory = snapshots
    .map((snapshot) => {
      const snapshotColors = snapshot.styleguide.colors;
      const sameColorInSnapshot = (snapshotColors || []).find(
        (snapshotColor) =>
          snapshotColor.assetId === color.assetId &&
          snapshotColor.externalLibraryId === color.externalLibraryId
      );

      return sameColorInSnapshot
        ? { snapshot, snapshotColor: sameColorInSnapshot }
        : null;
    })
    .filter((colorInSnapshot) => !!colorInSnapshot);

  // Didn't find this color in snapshots
  if (!colorHistory.length) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 12,
      }}
    >
      <div style={{ marginBottom: 20, fontSize: 16, fontWeight: 500 }}>
        History
      </div>
      {colorHistory.map(({ snapshot, snapshotColor }, index) => {
        const colorObj = tinycolor(snapshotColor.value);
        return (
          <div
            style={{ display: "flex", marginBottom: 8, alignItems: "center" }}
            key={index}
          >
            <div
              style={{
                backgroundColor: snapshotColor.value,
                width: 20,
                height: 20,
                marginRight: 12,
              }}
            ></div>
            <div style={{ marginRight: 12, fontWeight: 500 }}>
              {snapshot.name}
            </div>
            <div>{colorObj.toHexString().toUpperCase()}</div>
          </div>
        );
      })}
    </div>
  );
}

function ColorValueRow({ name, colorValue }) {
  const { isHovered, onMouseEnter, onMouseLeave } = useHovered();
  const [copySucceeded, setCopySucceeded] = useState(null);

  const onCopy = useCallback(
    (text) => {
      if (copySucceeded) {
        clearTimeout(copySucceeded);
      }

      copy(text);
      const timeoutId = setTimeout(() => setCopySucceeded(false), 1000);
      setCopySucceeded(timeoutId);
    },
    [setCopySucceeded, copySucceeded]
  );

  return (
    <div style={{ display: "flex" }}>
      <div className="c-color-row__color-representation-text">{name}</div>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ fontWeight: 500, userSelect: "none" }}
      >
        {copySucceeded ? (
          <div
            onClick={() => onCopy(colorValue)}
            style={{ color: "#1f53d5", cursor: "pointer" }}
          >
            Copied!
          </div>
        ) : isHovered ? (
          <div
            onClick={() => onCopy(colorValue)}
            style={{ color: "#1f53d5", cursor: "pointer" }}
          >
            Copy value
          </div>
        ) : (
          colorValue
        )}
      </div>
    </div>
  );
}
