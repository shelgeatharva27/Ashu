const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/tainu khabar nahi.mp3',
        displayName: 'Tainu Khabar Nahi',
        cover: 'assets/image13.jpeg',
        artist: 'Amitabh Bhattacharya',
    },
    {
        path: 'assets/Ed Sheeran - Perfect.mp3',
        displayName: 'Perfect',
        cover: 'assets/image15.jpeg',
        artist: 'Ed Sheeran',
    },
    {
        path: 'assets/Christina Perri - A Thousand Years.mp3',
        displayName: 'A Thousand Years',
        cover: 'assets/image55.jpeg',
        artist: 'Christina Perri',
    },
    {
        path: 'assets/Apocalypse - Cigarettes After Sex.mp3',
        displayName: 'Apocalypse',
        cover: 'assets/image7.jpeg',
        artist: 'Cigaretts After Sex',
    },
    {
        path: 'assets/The Local Train - Aalas Ka Pedh - Dil Mere (Official Audio).mp3',
        displayName: 'Dil Mere',
        cover: 'assets/image17.jpeg',
        artist: 'The Local Train',
    },
    {
        path: 'assets/Ninnila Full Video Song  Tholi Prema Video Songs  Varun Tej, Raashi Khanna  SS Thaman.mp3',
        displayName: 'Ninnila',
        cover: 'assets/image21.jpeg',
        artist: 'SS Thaman',
    },
    {
        path: 'assets/Alphaville - Forever Young ( Video Lyrics ).mp3',
        displayName: 'Forever Young',
        cover: 'assets/image10.jpeg',
        artist: 'Alpphaville',
    },
    {
        path: 'assets/Sajni (Song)_ Arijit Singh, Ram Sampath  Laapataa Ladies   Aamir Khan Productions.mp3',
        displayName: 'Sajni Re',
        cover: 'assets/image20.jpeg',
        artist: 'Arijit Singh',
    },
    {
        path: 'assets/Djo - End of Beginning (Official Lyric Video).mp3',
        displayName: 'End of Beginning',
        cover: 'assets/image19.jpeg',
        artist: 'Djo',
    },
    {
        path: 'assets/Lord Huron - The Night We Met.mp3',
        displayName: 'The Night We Met',
        cover: 'assets/couple-1375125_1280.jpg',
        artist: 'Lord Huron',
    },
    {
        path: 'assets/BM.mp3',
        displayName: 'Bawara Mann',
        cover: 'assets/image111.jpeg',
        artist: 'Jubin Nautiyal',
    },
    {
        path: 'assets/tum se.mp3',
        displayName: 'Tum Se',
        cover: 'assets/image1.jpeg',
        artist: 'Varun Jain',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
