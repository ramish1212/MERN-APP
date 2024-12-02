import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import DownloadCard from "./DownloadCard";

function MainSection({ title }) {
  const [url, setUrl] = useState("");
  const [mediaType, setMediaType] = useState("video");
  const [audioFormat, setAudioFormat] = useState("mp3");
  const [selectedVideoOption, setSelectedVideoOption] = useState("MP4 - 1080p");
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const backendurl = import.meta.env.VITE_API_BACKEND_URL;

  const getYouTubeVideoId = (url) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.+\?v=)|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
  const handleSearch = async () => {
    if (!url) return alert("Please enter a video URL");
    setLoading(true);

    try {
      const VideoID = getYouTubeVideoId(url);
      const response = await axios.get(`${backendurl}getVideoInfo/${VideoID}`);
      setVideoData(response.data);
    } catch (error) {
      console.error("Error fetching video data:", error);
      alert("Error fetching video data");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!url) return alert("Please enter a video URL");
    setLoading(true);

    try {
      const VideoID = getYouTubeVideoId(url);

      if (mediaType === "video") {
        const [format, resolution] = selectedVideoOption.split(" - ");
        const endpoint = `${backendurl}download/${VideoID}/${format.toLowerCase()}/${resolution}`;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const urllink = window.URL.createObjectURL(response.data);
        setDownloadLink(urllink);
      } else {
        const endpoint = `${backendurl}downloadAudio/${VideoID}/${audioFormat}`;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const urllink = window.URL.createObjectURL(response.data);
        setDownloadLink(urllink);
      }
    } catch (error) {
      console.error("Error downloading data:", error);
      alert("Error downloading data");
    } finally {
      setLoading(false);
    }
  };

  const videoOptions = [
    "MP4 - 4K",
    "MP4 - 1440p",
    "MP4 - 1080p",
    "MP4 - 720p",
    "MP4 - 480p",
    "MP4 - 360p",
    "WEBM - 4K",
    "WEBM - 1440p",
    "WEBM - 1080p",
    "WEBM - 720p",
    "WEBM - 480p",
    "WEBM - 360p",
  ];

  const audioFormats = ["mp3", "m4a", "aac", "flac", "opus", "ogg", "wav"];

  return (
    <div className="slideshow">
        <div className="search_div">
          <h1 className="main_title">{title}</h1>
          <SearchBar
            url={url}
            setUrl={setUrl}
            handleSearch={handleSearch}
            loading={loading}
            mediaType={mediaType}
            setMediaType={setMediaType}
            videoOptions={videoOptions}
            selectedVideoOption={selectedVideoOption}
            setSelectedVideoOption={setSelectedVideoOption}
            audioFormats={audioFormats}
            selectedAudioFormat={audioFormat}
            setSelectedAudioFormat={setAudioFormat}
          />
          {videoData && (
            <DownloadCard
              videoData={videoData.videoDetails}
              downloadLink={downloadLink}
              handleDownload={handleDownload}
              loading={loading}
              mediaType={mediaType}
            />
          )}
        </div>
        </div>
  );
}

export default MainSection;
