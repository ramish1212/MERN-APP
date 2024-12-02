import React from "react";

function DownloadLink({ downloadLink }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <a href={downloadLink} download="file" style={{ display: "block", textAlign: "center", color: "blue" }}>
        Click here to download your file
      </a>
    </div>
  );
}

export default DownloadLink;
