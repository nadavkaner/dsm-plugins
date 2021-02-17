import { useEffect, useCallback, useState } from "react";
import tinycolor from 'tinycolor2';
import "./App.css";

const PLUGIN_MESSAGE_API = {
  initialized: "initialized",
};

// const dsmStyleguide = {
//   colors: [
//     {
//       assetId: "2DCDCD86-ED92-4723-A369-00AB9B09BEC8",
//       externalLibraryId: "f3e94ffa-997c-498e-951c-a113e5d0780b",
//       folderId: "602b9a6561e8150012429965",
//       initialStyleguideValue: false,
//       name: "Components/Card/01 Card 1",
//       tags: [],
//       type: "colors",
//       value: "rgb(255, 255, 255)",
//       _id: "60127a37bdbcc600266d2a12",
//     },
//     {
//       assetId: "2DCDCD86-ED92-4723-A369-00AB9B09BEC8",
//       externalLibraryId: "f3e94ffa-997c-498e-951c-a113e5d0780b",
//       folderId: "602b9a6561e8150012429965",
//       initialStyleguideValue: false,
//       name: "Primary Color",
//       tags: [],
//       type: "colors",
//       value: "rgb(0, 255, 255)",
//       _id: "60127a37bdbcc600266d2a12",
//     },
//     {
//       assetId: "2DCDCD86-ED92-4723-A369-00AB9B09BEC8",
//       externalLibraryId: "f3e94ffa-997c-498e-951c-a113e5d0780b",
//       folderId: "602b9a6561e8150012429965",
//       initialStyleguideValue: false,
//       name: "Components/Card/01 Card 2",
//       tags: [],
//       type: "colors",
//       value: "rgb(255, 0, 100)",
//       _id: "60127a37bdbcc600266d2a12",
//     },
//   ],
// };

function App() {
  const [styleguide, setStyleguide] = useState({});

  useEffect(() => {
    window.parent.postMessage(
      { eventName: PLUGIN_MESSAGE_API.initialized },
      "*"
    );
  }, []);

  const handleMessage = useCallback((event) => {
    console.log("Inside iframe message!: ", event);
    setStyleguide(event.data.styleguide || {});
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <div>
      {(styleguide?.colors || []).map((color) => {
        const colorObj = tinycolor(color.value);
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid #EBECEE",
              marginBottom: 16,
              padding: 16,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 212,
                backgroundColor: color.value,
                marginRight: 16,
                borderRadius: 4,
                marginBottom: 24,
                boxShadow: "inset 0 0 0 1px rgb(29 29 31 / 5%)",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "Eina 03",
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 24
              }}
            >
              {color.name}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 80, color: '#6E7077', marginBottom: 12 }}>HEX</div>
                <div style={{ fontWeight: 500 }}>{colorObj.toHexString().toUpperCase()}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 80, color: '#6E7077', marginBottom: 12 }}>RGBA</div>
                <div style={{ fontWeight: 500 }}>{colorObj.toRgbString()}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 80, color: '#6E7077', marginBottom: 12 }}>HSL</div>
                <div style={{ fontWeight: 500 }}>{colorObj.toHslString()}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 80, color: '#6E7077', marginBottom: 12 }}>HSV</div>
                <div style={{ fontWeight: 500 }}>{colorObj.toHsvString()}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
