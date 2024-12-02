const ytdl = require("@distube/ytdl-core");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const app = express();
const PORT = 3000;

app.use(cors());


app.get("/getVideoInfo/:videoId", async (req, res) => {
  const { videoId } = req.params;

  try {
    const info = await ytdl.getInfo(videoId);

    // Separate available video and audio formats
    const videoFormats = info.formats.filter(format => format.hasVideo);
    const audioFormats = info.formats.filter(format => format.hasAudio);

    res.json({
      title: info.videoDetails.title,
      videoFormats: videoFormats.map(f => ({
        qualityLabel: f.qualityLabel,
        format: f.container,
        mimeType: f.mimeType,
        url: f.url,
      })),
      audioFormats: audioFormats.map(f => ({
        bitrate: f.audioBitrate,
        format: f.container,
        mimeType: f.mimeType,
        url: f.url,
      })),
    });
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).send("Error fetching video info");
  }
});

// app.get("/getVideoInfo/:videoId", async (req, res) => {
//   const { videoId } = req.params;
  
//   try {
//     const info = await ytdl.getInfo(videoId);

//     // Separate available video and audio formats
//     const videoFormats = info.formats.filter(format => format.hasVideo && format.hasAudio);
//     const audioFormats = info.formats.filter(format => format.hasAudio && !format.hasVideo);

//     res.json({
//       title: info.videoDetails.title,
//       videoFormats: videoFormats.map(f => ({
//         qualityLabel: f.qualityLabel,
//         format: f.container,
//         mimeType: f.mimeType,
//         url: f.url,
//       })),
//       audioFormats: audioFormats.map(f => ({
//         bitrate: f.audioBitrate,
//         format: f.container,
//         mimeType: f.mimeType,
//         url: f.url,
//       })),
//     });
//   } catch (error) {
//     console.error("Error fetching video info:", error);
//     res.status(500).send("Error fetching video info");
//   }
// });



// Download endpoint
app.get("/downloadvideo/:videoId/:formatType/:quality", async (req, res) => {
  const { videoId, formatType, quality } = req.params;

  try {
    const info = await ytdl.getInfo(videoId);
    const format = info.formats.find(
      f => f.container === formatType && (f.qualityLabel === quality || f.audioBitrate == quality)
    );

    if (!format) {
      return res.status(404).send("Requested format not available.");
    }

    // Stream the selected format directly to the response
    const stream = ytdl.downloadFromInfo(info, { format });
    res.setHeader("Content-Disposition", `attachment; filename="${info.videoDetails.title}.${formatType}"`);
    stream.pipe(res);
    
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Error occurred while downloading.");
  }
});


app.get("/downloadaudio/:videoId/:format", async (req, res) => {
  const { videoId, format } = req.params;

  try {
    const info = await ytdl.getInfo(videoId);

    // Get the best audio format available
    const bestAudioFormat = ytdl.chooseFormat(info.formats, { filter: "audioonly" });
    if (!bestAudioFormat) {
      return res.status(404).send("No audio format available for this video.");
    }

    const audioStream = ytdl.downloadFromInfo(info, { format: bestAudioFormat });

    // Temporary file paths
    const tempAudioFile = path.join(__dirname, "temp_audio");
    const outputFile = path.join(__dirname, `audio.${format}`);

    // Save the best audio to a temporary file
    const tempWriteStream = fs.createWriteStream(tempAudioFile);
    audioStream.pipe(tempWriteStream);

    tempWriteStream.on("finish", () => {
      // Convert the audio to the requested format
      ffmpeg(tempAudioFile)
        .toFormat(format)
        .on("end", () => {
          console.log(`Audio successfully converted to ${outputFile}`);
          // Notify that the file is ready
          res.status(200).send({ message: `Audio downloaded and converted to ${format}`, path: outputFile });
        })
        .on("error", (err) => {
          console.error("FFmpeg error:", err);
          res.status(500).send("Error converting audio.");
        })
        .save(outputFile); // Save the converted file
    });

    audioStream.on("error", (error) => {
      console.error("Audio stream error:", error);
      res.status(500).send("Error downloading audio stream.");
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Error processing the video.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
