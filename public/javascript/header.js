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
    } else if (ldata === 'naver' || ldata === '네이버' || ldata === '뉴스') {
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
    } else if (ldata === '화정' || ldata === '화정중학교' || ldata === '중학교' || ldata === '화정중' || ldata === '학교') {
        window.open("http://hwajung.ms.kr/");
    } else if (ldata === 'ebs' || ldata === '공부' || ldata === '수학' || ldata === '영어' || ldata === '국어' || ldata === 'study') {
        window.open("https://www.ebs.co.kr/main");
    } else if (ldata === '인스타그램' || ldata === 'instagram') {
        window.open("https://www.instagram.com/?hl=ko");
    } else if (ldata === '넷플릭스' || ldata === 'netflix') {
        window.open("https://www.netflix.com/kr-en/");
    } else {
        alert(`${data}에 알맞은 검색 결과가 없습니다.`);
    }
})