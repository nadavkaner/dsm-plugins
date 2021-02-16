import { useEffect, useCallback, useState } from "react";
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
        return (
          <div style={{ display: "flex" }}>
            <div
              style={{ width: 40, height: 40, backgroundColor: color.value, marginRight: 16 }}
            />
            <div>{color.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
