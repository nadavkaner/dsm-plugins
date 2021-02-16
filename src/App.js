import { useEffect, useCallback, useState } from "react";
import tinycolor from 'tinycolor2';
import "./App.css";

const PLUGIN_MESSAGE_API = {
  initialized: "initialized",
};

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
                <div style={{ width: 80, color: '#6E7077', marginBottom: 8 }}>HEX</div>
                <div>{colorObj.toHexString().toUpperCase()}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 80, color: '#6E7077', marginBottom: 8 }}>RGBA</div>
                <div>{colorObj.toRgbString()}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 80, color: '#6E7077', marginBottom: 8 }}>HSL</div>
                <div>{colorObj.toHslString()}</div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ width: 80, color: '#6E7077', marginBottom: 8 }}>HSV</div>
                <div>{colorObj.toHsvString()}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
