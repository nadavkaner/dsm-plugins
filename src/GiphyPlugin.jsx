import React, { useState, useEffect, useCallback } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import { usePluginData } from "./hooks/usePluginData";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GiphyPlugin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gif, setGif] = useState(null);
  const { pluginData, saveMetadata } = usePluginData();
  const { metadata: selectedGif } = pluginData.block || {};

  const { search, shuffle } = useGiphySearch(setGif);

  if (selectedGif) {
    return <Gif gif={selectedGif} width={400} />;
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <input onChange={event => setSearchTerm(event.target.value)} />
        <div>
          <button onClick={() => search(searchTerm)}>Search</button>
          {gif && <button onClick={() => shuffle()}>Shuffle</button>}
          <button onClick={() => saveMetadata(gif)}>Save</button>
        </div>
      </div>
      {gif && <Gif gif={gif} width={400} />}
    </div>
  );
}

function useGiphySearch(setGif) {
  const [gifs, setGifs] = useState(null);
  const search = async searchTerm => {
    const { data } = await giphyFetch.search(searchTerm, { limit: 25 });
    setGifs(data);
  };

  const shuffle = useCallback(() => {
    if (!gifs) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * gifs.length);
    setGif(gifs[randomIndex]);
  }, [gifs, setGif]);

  useEffect(() => shuffle(), [shuffle]);

  return { search, shuffle };
}

export default GiphyPlugin;
