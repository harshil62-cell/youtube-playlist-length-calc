const fetch = require("node-fetch");
const API_KEY = process.env.API_KEY;
const calculatePlaylistLength = async (req, res) => {
  try {
    const playlistId = req.query.id;
    if (!playlistId) {
      return res.status(400).json({
        error: "Playlist id is required",
      });
    }

    const playlistItemsURL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;
    const response1 = await fetch(playlistItemsURL);
    const data1 = await response1.json();
    if (!response1.ok) {
      throw new Error(data1.error.message);
    }
    const videoIds = data1.items.map((item) => item.snippet.resourceId.videoId);
    if (videoIds.length === 0) {
      return res.json({ totalDuration: "0:00", videoCount: 0 });
    }

    //fetch video durations
    const idsString = videoIds.join(",");
    const videosURL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${idsString}&key=${API_KEY}`;

    const response2 = await fetch(videosURL);
    const data2 = await response2.json();

    if (!response2.ok) {
      throw new Error(data2.error.message);
    }

    const durationStrings = data2.items.map(
      (item) => item.contentDetails.duration
    );

    //calculate total time
    let totalSeconds = 0;
    durationStrings.forEach((duration) => {
      totalSeconds += parseISO8601Duration(duration);
    });

    // 5. Send the Final Result Back
    const formattedDuration = formatSeconds(totalSeconds);
    res.json({
      totalDuration: formattedDuration,
      videoCount: videoIds.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        error:error.message
    });
  }
};

function parseISO8601Duration(durationString) {
  const regex = /P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/;
  const matches = durationString.match(regex);
  if (!matches) return 0;
  const [, years, months, weeks, days, hours, minutes, seconds] = matches;
  let totalSeconds = 0;
  totalSeconds += hours ? parseInt(hours) * 3600 : 0;
  totalSeconds += minutes ? parseInt(minutes) * 60 : 0;
  totalSeconds += seconds ? parseFloat(seconds) : 0;
  return totalSeconds;
}

function formatSeconds(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const hDisplay = h > 0 ? h + ':' : '';
  const mDisplay = (h > 0 && m < 10) ? '0' + m + ':' : m + ':';
  const sDisplay = s < 10 ? '0' + s : s;

  if (h === 0 && m === 0 && s === 0) return '0:00';
  if (h > 0 && m < 10) return `${hDisplay}0${m}:${sDisplay}`;
  
  return hDisplay + mDisplay + sDisplay;
}

module.exports = { calculatePlaylistLength };
