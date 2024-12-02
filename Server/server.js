const ytdl = require("@distube/ytdl-core");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const app = express();
const PORT = 3000;

app.use(cors());
const random = Math.floor(Math.random() * 100);


app.get('/getVideoInfo/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    const info = await ytdl.getInfo(videoId);
    res.send(info);
  } catch (error) {
    console.error("Error fetching video info:", error);
    res.status(500).send("Error fetching video info.");
  }
});

app.get('/download/:videoId/:format/:resolution', async (req, res) => {
  const { videoId, format, resolution } = req.params;
  console.log(req.params);

  try {
    const info = await ytdl.getInfo(videoId);

    // Filter formats to match the requested format and resolution
    let videoFormat = info.formats.find(
      (f) => f.container === format && f.qualityLabel === resolution
    );

    // If requested resolution is not available, select the highest available
    if (!videoFormat) {
      videoFormat = info.formats
        .filter((f) => f.container === format)
        .reduce((highest, current) => {
          const currentHeight = parseInt(current.qualityLabel?.match(/\d+/) || 0);
          const highestHeight = parseInt(highest?.qualityLabel?.match(/\d+/) || 0);
          return currentHeight > highestHeight ? current : highest;
        }, null);
    }

    if (!videoFormat) {
      return res.status(404).send("Requested format or resolution not available.");
    }

    // Select the highest quality audio format
    const audioFormat = ytdl.chooseFormat(info.formats, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    if (!audioFormat) {
      return res.status(404).send("Audio format not available for this video.");
    }

    const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });
    const videoStream = ytdl.downloadFromInfo(info, { format: videoFormat });

    const random = Math.random().toString(36).substring(7);
    const audioFile = path.join(__dirname, `audio${random}.mp3`);
    const videoFile = path.join(__dirname, `video${random}.mp4`);

    const audioWriteStream = fs.createWriteStream(audioFile);
    const videoWriteStream = fs.createWriteStream(videoFile);

    audioStream.pipe(audioWriteStream);
    videoStream.pipe(videoWriteStream);

    audioWriteStream.on('finish', () => {
      videoWriteStream.on('finish', () => {
        const mergedFile = path.join(__dirname, `final${random}.mp4`);

        // Use FFmpeg to merge audio and video
        exec(`ffmpeg -i ${videoFile} -i ${audioFile} -c:v copy -c:a aac ${mergedFile}`, (error, stdout, stderr) => {
          if (error) {
            console.error("FFmpeg error:", error);
            return res.status(500).send("Error merging audio and video.");
          }

          res.download(mergedFile, (err) => {
            if (err) console.error("Download error:", err);

            // Clean up temporary files
            fs.unlinkSync(audioFile);
            fs.unlinkSync(videoFile);
            fs.unlinkSync(mergedFile);
          });
        });
      });
    });

    audioStream.on('error', (error) => {
      console.error("Audio stream error:", error);
      res.status(500).send("Error downloading audio stream.");
    });

    videoStream.on('error', (error) => {
      console.error("Video stream error:", error);
      res.status(500).send("Error downloading video stream.");
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Error occurred while processing the video.");
  }
});


// New route to download audio in multiple formats
app.get('/downloadAudio/:videoId/:format', async (req, res) => {
  const { videoId, format } = req.params;
  const allowedFormats = ['mp3', 'm4a', 'webm', 'aac', 'flac', 'opus', 'ogg', 'wav'];

  if (!allowedFormats.includes(format.toLowerCase())) {
    return res.status(400).send("Invalid audio format requested.");
  }

  try {
    const info = await ytdl.getInfo(videoId);

    // Choose the best audio format
    const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });

    if (!audioFormat) {
      return res.status(404).send("Audio format not available for this video.");
    }

    const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });

    const audioFile = path.join(__dirname, `audio${random}.${format}`);
    const audioWriteStream = fs.createWriteStream(audioFile);

    audioStream.pipe(audioWriteStream);

    audioWriteStream.on('finish', () => {
      // Convert the downloaded MP4 audio to the requested format using ffmpeg
      const convertedFile = path.join(__dirname, `converted_audio.${format}`);
      exec(`ffmpeg -i ${audioFile} ${convertedFile}`, (error, stdout, stderr) => {
        if (error) {
          console.error("FFmpeg error:", error);
          return res.status(500).send("Error converting audio format.");
        }
        // Send the converted audio as a download
        res.download(convertedFile, (err) => {
          if (err) console.error("Download error:", err);

          // Clean up temporary files
          fs.unlinkSync(audioFile);
          fs.unlinkSync(convertedFile);
        });
      });
    });

    audioStream.on('error', (error) => {
      console.error("Audio stream error:", error);
      res.status(500).send("Error downloading audio stream.");
    });
  } catch (error) {
    console.error("Error fetching video or downloading audio:", error);
    res.status(500).send("Error occurred while processing the audio.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
