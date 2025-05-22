// ek arr hoga is arr diff naam honge jese hi koi ek random naam ajyega har bar reload per naam change aye or naam k letter alg alag ho jese cat ho toh tca

// let arr = ["cat", "dog", "elephant", "camel", "zebra", "apple", "banana", "orange", "mango", "pineapple"]
// let randomName = arr[Math.floor(Math.random() * arr.length)]
// console.log("randomName:", randomName);
// let words = randomName.split("")
// console.log("words:", words);
// let randomLetters = words[Math.floor(Math.random() * words.length)]
// console.log("randomLetters:", randomLetters);

// for(let i = words.length - 1; i >= 0; i--){
//     console.log(words[i]);
//     let randomIndex = Math.floor(Math.random() * (i + 1))
//     console.log("randomIndex:", randomIndex);
//     let temp = words[1]
//     words[1] = words[randomIndex]
//     words[randomIndex] = temp
    
// }
// console.log("words:", words);

// let join = words.join("")
// console.log("join:", join);



let arr = ["cat", "dog", "elephant", "camel", "zebra", "apple", "banana", "orange", "mango", "pineapple", "grape", "papaya", "cherry", "pear", "peach", "plum", "pomegranate", "pineapple", "grape", "papaya"]

document.getElementById('generate').addEventListener('click', function(){
    let randomName = arr[Math.floor(Math.random() * arr.length)];
    let words = randomName.split("");

    // Shuffle letters
    for (let i = words.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = words[i];
      words[i] = words[randomIndex];
      words[randomIndex] = temp;
    }

    let shuffled = words.join("");
    document.getElementById('result').innerText = `Original Name: ${randomName}\nShuffled Name: ${shuffled}`;
})







