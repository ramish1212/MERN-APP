import React from "react";

function VideoDetails({ videoData }) {

  return (
    <div>
      <p>{videoData.videoDetails.title}</p>
    </div>
  );
}

export default VideoDetails;
