import React from "react";

function SearchBar({
  url,
  setUrl,
  handleSearch,
  loading,
  mediaType,
  setMediaType,
  videoOptions,
  selectedVideoOption,
  setSelectedVideoOption,
  audioFormats,
  selectedAudioFormat,
  setSelectedAudioFormat,
}) {
  return (
    <div className="mainSearch">
      {/* Search Bar */}
      <div className="inputdiv">
        <input
          type="text"
          placeholder="Paste Your URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="formatdiv">
        {/* Media Type Selector */}
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="video">Video</option>
          <option value="audio" selected>Audio</option>
        </select>

        {/* Format and Resolution Selector for Video */}
        {mediaType === "video" && (
          <select
            value={selectedVideoOption}
            onChange={(e) => setSelectedVideoOption(e.target.value)}
          >
            {videoOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {/* Audio Format Selector */}
        {mediaType === "audio" && (
          <select
            value={selectedAudioFormat}
            onChange={(e) => setSelectedAudioFormat(e.target.value)}
          >
            {audioFormats.map((format) => (
              <option key={format} value={format}>
                {format.toUpperCase()}
              </option>
            ))}
          </select>
        )}

        <button className="btn-simple" onClick={handleSearch} disabled={loading}>
          {loading ? "Downloading..." : "Download Now"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;