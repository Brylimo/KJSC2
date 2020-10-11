const bar = document.querySelector('.search1');
const inputdata = document.querySelector('#inputdata');

const getVideo = (input) => {

}

bar.addEventListener("submit", function(event){
    event.preventDefault();

    const data = inputdata.value;
    alert(data);
}, false)