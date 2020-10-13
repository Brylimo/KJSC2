const bar = document.querySelector('.search1');
const inputdata = document.querySelector('#inputdata');
const youtube = document.querySelector('.youtube');
const video_detail = document.querySelector('.video_detail');
const API_KEY = "AIzaSyBC1AK08Wu30lBpv_mTXKjCpUnV9sZZTWQ";
let cnt = 1;
let videos = [];

function over() {
    setTimeout(function(){alert("비디오를 로드할 수 없습니다❗\n하루 비디오 제한량을 체크하세요.");}, 500);
    youtube.innerHTML ='';
    video_detail.innerHTML = '';
}

const eventgame = (e) => {
    for (let i = 1; i <= 5; i++)
    {
        const game = 'wow'+ i;
        if (e.currentTarget.classList.contains(game))
        {
            getDetail(videos[i-1]);
            break;
        }
    }
}

function pluss() {
    const kim = 'wow'+cnt;
    const wow = document.querySelector(`.${kim}`);
    wow.addEventListener("click", eventgame);
    ++cnt;
}

function getDetail(video) {
    if (!video) {
        video_detail.innerHTML = '<div>Loading...</div>';
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    const iframe = document.querySelector('.player');
    const header = document.querySelector('.header22');
    const ptag = document.getElementById('prime');
    iframe.src = videoSrc;
    header.innerText = `${video.snippet.title}`;
    ptag.innerText = `${video.snippet.description}`;
}

function getItem(video) {
    const son = 'header1' + cnt;
    const lim = 'image' + cnt;
    const image = document.querySelector(`.${lim}`);
    const header = document.querySelector(`.${son}`);    image.src = video.snippet.thumbnails.medium.url;
    image.alt= video.snippet.title;
    header.innerHTML = video.snippet.title;
    ++cnt;
}

function getVideo(data) {
    const part = "snippet";
    const max = "5";
    const type ="video";
    const query = data;
    fetch(
        `https://www.googleapis.com/youtube/v3/search?part=${part}&maxResults=${max}&key=${API_KEY}&q=${query}&type=${type}`
        ).then(function(response) {
            return response.json();
        }).then(function(json) {
            videos = json.items;
            videos.map(video => { getItem(video); });
            return videos[0];
        }).then(function(video) {
            getDetail(video);
            cnt = 1;
        }).catch(function() {
            over();
        });
}

bar.addEventListener("submit", function(event){
    event.preventDefault();

    const data = inputdata.value;
    getVideo(data);
}, false);

function initDetail(video) {
    if (!video) {
        video_detail.innerHTML = '<div>Loading...</div>';
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

    const iframe = document.querySelector('.player');
    const header = document.querySelector('.header22');
    const ptag = document.getElementById('prime');
    iframe.src = videoSrc;
    header.innerText = `${video.snippet.title}`;
    ptag.innerText = `${video.snippet.description}`;
}

function initItem(video) {
    const son = 'header1' + cnt;
    const lim = 'image' + cnt;
    const image = document.querySelector(`.${lim}`);
    const header = document.querySelector(`.${son}`);
    image.src = video.snippet.thumbnails.medium.url;
    image.alt= video.snippet.title;
    header.innerHTML = video.snippet.title;
    ++cnt;
}

function init() {
    const part = "snippet";
    const max = "5";
    const type ="video";
    const query = "buildings";

    fetch(
        `https://www.googleapis.com/youtube/v3/search?part=${part}&maxResults=${max}&key=${API_KEY}&q=${query}&type=${type}`
        ).then(function(response) {
            return response.json();
        }).then(function(json) {
            videos = json.items;
            videos.map(video => { initItem(video); });
            return videos[0];
        }).then(function(video) {
            initDetail(video);
            cnt = 1;
            for (let i = 0; i < 5; i++) {pluss();}
            cnt = 1;
        }).catch(function() {
            over();
        });
}

init();