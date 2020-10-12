const form = document.querySelector('.header_form');
const input = document.querySelector('.header_input');

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let data = input.value;
    let ldata = data.toLowerCase();
    if (ldata === 'home' || ldata === '홈' || ldata === 'kjsc' || ldata === '감자' || ldata === 'kimjiseungcrazy')
    {
        window.location.href = "/";
    } else if (ldata === 'comments' || ldata === 'comment') {
        window.location.href = "/comment";
    } else if (ldata === 'videos' || ldata === 'video' || ldata === '비디오') {
        window.location.href = "/video";
    } else if (ldata === 'naver' || ldata === '네이버') {
        window.open("https://www.naver.com");
    } else if (ldata === 'daum' || ldata === '다음') {
        window.open("https://www.daum.net");
    } else if (ldata === 'google' || ldata === '구글') {
        window.open("https://www.google.com");
    } else if (ldata === 'youtube' || ldata === '유튜브' || ldata === '너튜브' || ldata === 'utube') {
        window.open("https://www.youtube.com");
    } else if (ldata === 'facebook' || ldata === '페이스북' || ldata === '페북') {
        window.open("https://www.facebook.com");
    } else if (ldata === 'admin' || ldata === '김지승' || ldata === '지승' || ldata === '관리자' || ldata === 'kimjiseung') {
        window.location.href = '/';
    } else {
        alert(`${data}에 알맞은 검색 결과가 없습니다.`);
    }
})