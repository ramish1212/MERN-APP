import React from "react";

function DownloadButton({ handleDownload, loading, mediaType }) {
  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      style={{ width: "100%", padding: "10px" }}
    >
      {loading
        ? "Downloading..."
        : `Download ${mediaType === "video" ? "Video" : "Audio"}`}
    </button>
  );
}

export default DownloadButton;
