import React, { useState, useEffect, useCallback } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Gif } from "@giphy/react-components";
import { usePluginData } from "./hooks/usePluginData";
import { Button, TextField } from "@material-ui/core";
import { usePluginHeight } from "./hooks/usePluginHeight";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GiphyPlugin() {
  const [isSearched, setIsSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [gif, setGif] = useState(null);
  const { pluginData, saveMetadata } = usePluginData();
  const { metadata: selectedGif } = pluginData.block || {};
  const showShuffle = gif && isSearched;

  usePluginHeight();

  const { search, shuffle } = useGiphySearch(setGif);

  if (selectedGif) {
    return <Gif gif={selectedGif} />;
  }

  const handleSearch = () => {
    search(searchTerm);
    setIsSearched(true);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <TextField
          id="search-term"
          label="Search term"
          value={searchTerm}
          onChange={event => {
            setSearchTerm(event.target.value);
            setIsSearched(false);
            setGif(null);
          }}
        />
        <div style={{ marginLeft: 16 }}>
          <Button
            variant="outlined"
            onClick={() => (showShuffle ? shuffle() : handleSearch())}
            style={{ marginRight: 16, textTransform: "none" }}
          >
            {showShuffle ? "Shuffle" : "Search"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => saveMetadata(gif)}
            style={{ marginRight: 16, textTransform: "none" }}
          >
            Save
          </Button>
        </div>
      </div>
      {gif && <Gif gif={gif} />}
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
