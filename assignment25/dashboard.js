
function checkLogin() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.getElementById("logoutContainer").style.display = "block";
    } else {
        document.getElementById("logoutContainer").style.display = "none";
    }
}


document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "index.html"; 
});

checkLogin();








// 0   1    2              0      3     6        0  4  8
// 3   4    5              1      4     7        2  4  6
// 6   7    8              2      5     8  
let currentPlayer = 'X';
let arr = Array(9).fill(null);

function checkWinner(){
    if(
        (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2]) || 
        (arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5]) || 
        (arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8]) ||
        (arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6]) ||
        (arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7]) ||
        (arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8]) ||  
        (arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8]) || 
        (arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6])   
    ){
        document.write(`Winner is ${currentPlayer}`)
        return;
    }
    //  some((e) => e === null) check karta hai kya array me koi null bacha hai?
    if(!arr.some((e) => e === null)){
        document.write(`Draw!`);
        return;
    }
}

function handleClick(ele){
    const id =  Number(ele.id);
    if(arr[id] !== null) return;
    arr[id] = currentPlayer;
    ele.innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log(currentPlayer); 
}







// ------------------------------------------------------------

