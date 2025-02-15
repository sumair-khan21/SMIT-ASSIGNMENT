let randomImage = document.getElementById("img");

        function DiceRoll() {
            const random = Math.floor(Math.random() * 6) + 1;
            let imagePath = `./images/dice${random}.png`;

            // animation effect
            randomImage.classList.add("spin");

            // Remove animation after rolling
            setTimeout(() => {
                randomImage.src = imagePath;
                randomImage.classList.remove("spin");
            }, 500);
        }