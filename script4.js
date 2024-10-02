let songIndex = 0;
let audioElement = new Audio('song/0.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('mastersongName');
let currentPlayingIndex = -1; // Track the currently playing song

let songs = [
    { songName: "Dost Banke  by Gurnazar", filePath: "song/0.mp3", coverPath: "covers/1.jpg" },
    { songName: "Ishq (From Lost;Found)", filePath: "song/1.mp3", coverPath: "covers/2.jpg" },
    { songName: "Samjhawan Humpty Sharma", filePath: "song/2.mp3", coverPath: "covers/3.jpg" },
    { songName: "tujhe bhula diya - mohit", filePath: "song/3.mp3", coverPath: "covers/4.jpg" },
    { songName: "Aasa Kooda from Think", filePath: "song/4.mp3", coverPath: "covers/5.jpg" },
    { songName: "Soulmate - arijit singh", filePath: "song/5.mp3", coverPath: "covers/6.jpg" },
];

// Populate song items
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause event
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
});

// Listen to audio events and update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek functionality
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};

// Handle individual song play/pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        if (currentPlayingIndex === index) {  // Song is already playing
            if (!audioElement.paused) {
                audioElement.pause();  // Pause the song
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-play');
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-play');
                gif.style.opacity = 0;
            } else {
                audioElement.play();  // Resume playing
                e.target.classList.remove('fa-play');
                e.target.classList.add('fa-pause');
                masterPlay.classList.remove('fa-play');
                masterPlay.classList.add('fa-pause');
                gif.style.opacity = 1;
            }
        } else {
            makeAllPlays();  // Reset all other buttons
            songIndex = index;
            currentPlayingIndex = index;  // Update the current playing song index
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
    });
});

// Handle next button
document.getElementById('next').addEventListener('click', () => {
    nextSong();
});

// Handle previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    currentPlayingIndex = songIndex;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    makeAllPlays();  // Reset all play buttons
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

// Auto-play next song when the current one ends
audioElement.addEventListener('ended', () => {
    nextSong();  // Trigger next song auto-play when current song ends
});

// Function to play the next song
function nextSong() {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    currentPlayingIndex = songIndex;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    makeAllPlays();  // Reset all play buttons
    document.getElementById(songIndex).classList.remove('fa-play');
    document.getElementById(songIndex).classList.add('fa-pause');
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
}
