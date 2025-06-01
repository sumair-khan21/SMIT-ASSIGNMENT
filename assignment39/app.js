
let bulbOn = document.getElementById('bulbOn')
let bulbOff = document.getElementById('bulbOff')
let btnOn = document.getElementById('turnOn')
let btnOff = document.getElementById('turnOff')

btnOn.addEventListener('click', function(){
    if(bulbOn.hidden){
        bulbOn.hidden = false;
        bulbOff.hidden = true;

        btnOn.hidden = true;
        btnOff.hidden = false;
    }
})



btnOff.addEventListener('click', function(){
    if(bulbOff.hidden){
        bulbOn.hidden = true;
        bulbOff.hidden = false;

        btnOn.hidden = false;
        btnOff.hidden = true;
    }
})

