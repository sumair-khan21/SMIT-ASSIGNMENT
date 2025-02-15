
const words = {
    'A': ['Apple', 'Ant', 'Air', 'Arm', 'Arrow', 'Axe'],
    'B': ['Bag', 'Ball', 'Brush', 'Bell', 'Bottle', 'Bench'],
    'C': ['Cup', 'Car', 'Clock', 'Candle', 'Corn', 'Chalk'],
    'D': ['Duck', 'Door', 'Drum', 'Doll', 'Desk', 'Dish'],
    'E': ['Egg', 'Ear', 'Engine', 'Elbow', 'Exit', 'Envelope'],
    'F': ['Fan', 'Fish', 'Fork', 'Fruit', 'Fence', 'Feather'],
    'G': ['Glass', 'Goat', 'Grapes', 'Gift', 'Gate', 'Glue'],
    'H': ['Hat', 'Hand', 'Horse', 'House', 'Honey', 'Hammer'],
    'I': ['Ice', 'Ink', 'Idea', 'Island', 'Iron', 'Internet'],
    'J': ['Jam', 'Jug', 'Jacket', 'Jar', 'Jump', 'Jeep'],
    'K': ['Key', 'Kite', 'Kitchen', 'Kettle', 'Koala', 'Kid'],
    'L': ['Lamp', 'Leaf', 'Lemon', 'Lock', 'Ladder', 'Lake'],
    'M': ['Map', 'Mug', 'Milk', 'Moon', 'Market', 'Mirror'],
    'N': ['Nest', 'Net', 'Notebook', 'Nail', 'Nose', 'Noodles'],
    'O': ['Orange', 'Oven', 'Oil', 'Owl', 'Onion', 'Octopus'],
    'P': ['Pen', 'Pan', 'Pot', 'Pillow', 'Pizza', 'Pencil'],
    'Q': ['Queen', 'Quilt', 'Quick', 'Quail', 'Queue', 'Quiet'],
    'R': ['Rat', 'Ring', 'Road', 'Rain', 'Roof', 'Rocket'],
    'S': ['Sun', 'Star', 'Sock', 'Soap', 'School', 'Stone'],
    'T': ['Tree', 'Table', 'Tiger', 'Towel', 'Tomato', 'Toy'],
    'U': ['Umbrella', 'Uncle', 'Uniform', 'Uranus', 'Up', 'Urge'],
    'V': ['Van', 'Vase', 'Vegetable', 'Violin', 'Village', 'Voice'],
    'W': ['Water', 'Wall', 'Watch', 'Window', 'Wheel', 'Wood'],
    'X': ['X-ray', 'Xylophone', 'Xmas', 'Xerox', 'Xenon', 'Xylo'],
    'Y': ['Yarn', 'Yogurt', 'Yellow', 'Yawn', 'Year', 'Yard'],
    'Z': ['Zebra', 'Zoo', 'Zero', 'Zip', 'Zinc', 'Zigzag']
};


const displayWord = document.getElementById('displayWord');
const keyboard = document.getElementById('keyboard');
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US'; 
    speechSynthesis.speak(utterance);
}
function randomWord(letter){
    return words[letter][Math.floor(Math.random() * words[letter].length)];
}

for (let letter in words) {
    let button = document.createElement('button');
    button.textContent = letter;
    button.onclick = () => {
        const word = randomWord(letter);
        displayWord.textContent = word;
        speakWord(word)
    };
    keyboard.appendChild(button);
}









