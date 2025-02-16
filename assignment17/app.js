let bird = document.getElementById('bird');
let index = 1;
let maxImage = 4;
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