const API_KEY = 'AIzaSyCpHjzknwlO01e2Hwi-TBMHzkUzODwRwD4'; 

const form = document.getElementById('form');
const urlInput = document.getElementById('yt');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault(); 
  resultDiv.textContent = 'Calculating...';

  try {
    const playlistURL = urlInput.value;
    let playlistId;
    try {
      const urlObj = new URL(playlistURL);
      playlistId = urlObj.searchParams.get('list');
    } catch (error) {
      resultDiv.textContent = 'Error: Invalid YouTube playlist URL.';
      return;
    }

    const response = await fetch(`http://localhost:5000/api/playlistInfo?id=${playlistId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error); // Show error from server
    }

    resultDiv.textContent = `Total length (${data.videoCount} videos): ${data.totalDuration}`;

  } catch (error) {
    console.error(error);
    resultDiv.textContent = `Error: ${error.message}`;
  }
}