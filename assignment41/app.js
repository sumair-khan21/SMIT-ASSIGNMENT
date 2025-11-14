let fulltext = '';
let startingText = 0;
let textLimit = 150;
let expandText = false;


document.getElementById('showText').addEventListener('click', function(){
    fulltext = document.getElementById('userInput').value.trim();
    startingText = 0;
    document.getElementById('output').innerHTML = "";
    expandText = false;
    textToggle()
})

document.getElementById('toggleBtn').addEventListener('click', textToggle);
function textToggle(){
    if(!expandText){
        startingText += textLimit;
    }else{
        startingText -= textLimit;
    }

    document.getElementById('output').innerHTML = fulltext.substring(0, startingText);
    if(startingText >= fulltext.length){
        expandText = true;
        document.getElementById('toggleBtn').innerText = 'See Less';
    }else{
        expandText = false;
        document.getElementById('toggleBtn').innerText = 'See More';
    }
    document.getElementById('toggleBtn').style.display = fulltext.length > textLimit ? 'inline-block' : 'none';
}
