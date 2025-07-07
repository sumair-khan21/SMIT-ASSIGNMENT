// let randomImage = document.getElementById("img");

//         function DiceRoll() {
//             const random = Math.floor(Math.random() * 6) + 1;
//             let imagePath = `./images/dice${random}.png`;

//             // animation effect
//             randomImage.classList.add("spin");

//             // Remove animation after rolling
//             setTimeout(() => {
//                 randomImage.src = imagePath;
//                 randomImage.classList.remove("spin");
//             }, 500);
//         }

// =========================================================================





// Global variables
        let diceCount = 1;
        let diceSides = 6;
        let isRolling = false;
        let stats = {
            totalRolls: 0,
            allRolls: [],
            highestRoll: null,
            lowestRoll: null
        };

        // Initialize event listeners
        function initializeEventListeners() {
            // Dice count buttons
            const diceCountButtons = document.querySelectorAll('.dice-count-btn');
            for (let i = 0; i < diceCountButtons.length; i++) {
                diceCountButtons[i].addEventListener('click', function(e) {
                    if (isRolling) return;
                    
                    const allCountButtons = document.querySelectorAll('.dice-count-btn');
                    for (let j = 0; j < allCountButtons.length; j++) {
                        allCountButtons[j].classList.remove('active');
                    }
                    
                    e.target.classList.add('active');
                    diceCount = parseInt(e.target.dataset.count);
                    createDice();
                });
            }

            // Dice type buttons
            const diceTypeButtons = document.querySelectorAll('.dice-type-btn');
            for (let i = 0; i < diceTypeButtons.length; i++) {
                diceTypeButtons[i].addEventListener('click', function(e) {
                    if (isRolling) return;
                    
                    const allTypeButtons = document.querySelectorAll('.dice-type-btn');
                    for (let j = 0; j < allTypeButtons.length; j++) {
                        allTypeButtons[j].classList.remove('active');
                    }
                    
                    e.target.classList.add('active');
                    diceSides = parseInt(e.target.dataset.sides);
                    createDice();
                });
            }

            // Roll button
            document.getElementById('rollBtn').addEventListener('click', function() {
                rollDice();
            });

            // Reset button
            document.getElementById('resetBtn').addEventListener('click', function() {
                resetStats();
            });
        }

        // Create dice elements
        function createDice() {
            const diceArea = document.getElementById('diceArea');
            diceArea.innerHTML = '';
            
            for (let i = 0; i < diceCount; i++) {
                const dice = document.createElement('div');
                dice.className = 'dice';
                dice.id = 'dice-' + i;
                dice.textContent = '?';
                diceArea.appendChild(dice);
            }
        }

        // Roll dice function
        function rollDice() {
            if (isRolling) return;
            
            isRolling = true;
            document.getElementById('rollBtn').disabled = true;
            
            const diceElements = document.querySelectorAll('.dice');
            const results = [];
            
            // Add rolling animation
            for (let i = 0; i < diceElements.length; i++) {
                diceElements[i].classList.add('rolling');
                diceElements[i].textContent = '🎲';
            }

            // Generate random results
            for (let i = 0; i < diceCount; i++) {
                results.push(Math.floor(Math.random() * diceSides) + 1);
            }

            // Show results after animation
            setTimeout(function() {
                for (let i = 0; i < diceElements.length; i++) {
                    diceElements[i].classList.remove('rolling');
                    diceElements[i].textContent = results[i];
                }
                
                updateResults(results);
                updateStats(results);
                isRolling = false;
                document.getElementById('rollBtn').disabled = false;
            }, 600);
        }

        // Update results display
        function updateResults(results) {
            const resultsDiv = document.getElementById('results');
            const individualRolls = document.getElementById('individualRolls');
            const totalSum = document.getElementById('totalSum');
            const average = document.getElementById('average');
            
            let sum = 0;
            for (let i = 0; i < results.length; i++) {
                sum += results[i];
            }
            
            const avg = (sum / results.length).toFixed(1);
            
            individualRolls.textContent = results.join(', ');
            totalSum.textContent = sum;
            average.textContent = avg;
            
            resultsDiv.style.display = 'block';
        }

        // Update statistics
        function updateStats(results) {
            let sum = 0;
            for (let i = 0; i < results.length; i++) {
                sum += results[i];
            }
            
            stats.totalRolls++;
            stats.allRolls.push(sum);
            
            if (stats.highestRoll === null || sum > stats.highestRoll) {
                stats.highestRoll = sum;
            }
            
            if (stats.lowestRoll === null || sum < stats.lowestRoll) {
                stats.lowestRoll = sum;
            }
            
            updateDisplay();
        }

        // Update statistics display
        function updateDisplay() {
            document.getElementById('totalRolls').textContent = stats.totalRolls;
            document.getElementById('highestRoll').textContent = stats.highestRoll || '-';
            document.getElementById('lowestRoll').textContent = stats.lowestRoll || '-';
            
            if (stats.allRolls.length > 0) {
                let totalSum = 0;
                for (let i = 0; i < stats.allRolls.length; i++) {
                    totalSum += stats.allRolls[i];
                }
                const avgRoll = (totalSum / stats.allRolls.length).toFixed(1);
                document.getElementById('avgRoll').textContent = avgRoll;
            } else {
                document.getElementById('avgRoll').textContent = '-';
            }
        }

        // Reset statistics
        function resetStats() {
            stats = {
                totalRolls: 0,
                allRolls: [],
                highestRoll: null,
                lowestRoll: null
            };
            updateDisplay();
            document.getElementById('results').style.display = 'none';
            createDice();
        }

        // Initialize the game when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeEventListeners();
            createDice();
            updateDisplay();
        });