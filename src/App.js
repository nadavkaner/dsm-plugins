import { useEffect, useCallback, useState } from "react";
import "./App.css";

const PLUGIN_MESSAGE_API = {
  initialized: "initialized"
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
        return (
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: 50,
                height: 50,
                backgroundColor: color.value,
                marginRight: 16,
                borderRadius: 4,
                marginBottom: 8,
                boxShadow: 'inset 0 0 0 1px rgb(29 29 31 / 5%)'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>{color.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
