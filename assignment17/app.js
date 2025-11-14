let bird = document.getElementById('bird');
let index = 1;
let maxImage = 6;
let minImage = 1;

function next(){
    if(index< maxImage){
        index++;
    }else{
        index = minImage;
    }
    bird.src = `images/bird${index}.jpg`;
}

function prev(){
    if(index > minImage){
        index--;
    }else{
        index = maxImage;
    }
    bird.src = `images/bird${index}.jpg`;
}

function autoslide(){
    next();
    setTimeout(autoslide, 2000);
}

setTimeout(autoslide, 2000);
// slider End

// top button
var goToBtn = document.getElementById('goTopBtn');
window.onscroll = function(){
    if(document.documentElement.scrollTop > 100){
        goToBtn.style.display = 'block'
    }else{
        goToBtn.style.display = 'none';
    }
}
function scrollOnTop(){
    window.scrollTo({top: 0, behavior:"smooth"})
}
















