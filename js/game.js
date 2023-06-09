class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.gameTime = document.getElementById("time");
        this.gameHealth = document.getElementById("health");
        this.statsContainer = document.getElementById("stats-container");
        this.statsInnerCnt = document.getElementById("stats-inner-cnt");
        this.bestTime = document.getElementById('best-time');
        this.statsUl = document.getElementById('stats-ul');
        this.bodyElement= document.querySelector('body');
        this.mainElement = document.querySelector('main');
        this.minDec = document.getElementById('minDec');
        this.minUni = document.getElementById('minUni');
        this.secDec = document.getElementById('secDec');
        this.secUni = document.getElementById('secUni');
        this.healthText = document.getElementById('health-text');
        this.player = new Player(
            this.gameScreen, 
            50, //left; horizontal starting absolute position
            80, //top; vertical starting absolute position 
            60, //width; initial width of spaceship img
            120, //height; initial height of spaceship img
            "./images/spaceship.png" //imgSrc
        );
        this.height = 100;
        this.width = 100;
        this.redAsteroids = [];
        this.purpleAsteroids = [];
        this.whiteAsteroids = [];
        this.time = 0;
        this.health = 100;
        this.gameIsOver = false;
        this.chronometer = new Chronometer();
        this.finalTimesArr = JSON.parse(sessionStorage.getItem('finalTimesArr')) || [];
        this.unformTimesArr = JSON.parse(sessionStorage.getItem('unformTimesArr')) || [];

        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('finalTimesArr', JSON.stringify(this.finalTimesArr));
            sessionStorage.setItem('unformTimesArr', JSON.stringify(this.unformTimesArr));
        });;
        this.gameSoundPlay = new gameSound(
            './sounds/Interstellar Odyssey.ogg',
            this.gameScreen
        )
        this.gameEndMusic = new endSound(
            './sounds/game-over-arcade-6435.mp3',
            this.gameEndScreen
        )
    }

    start() {
        //sets initial width and heigh of the game-screen when start method is called.
        this.gameScreen.style.height = `${this.height}vh`;
        this.gameScreen.style.width = `${this.width}vw`;

        // hide start screen
        this.startScreen.style.display = "none";
        // show game screen
        this.gameScreen.style.display = "block";
        this.statsContainer.style.display = 'flex';
        this.bodyElement.style.backgroundImage = 'none';
        this.bodyElement.style.display = 'block';
        this.mainElement.style.display = 'flex';
        this.gameHealth.innerText = `${this.health}%`;
        this.chronometer.start(this.printTime);
        this.gameSoundPlay.play();

        //starts the gameLoop method
        this.gameLoop();
    }

    printTime = () => {
        this.printMinutes();
        this.printSeconds();
    }
    
    printMinutes = () => {
        this.minUni.innerHTML = this.chronometer.computeTwoDigitNumber(this.chronometer.getMinutes())[1];
        this.minDec.innerHTML = this.chronometer.computeTwoDigitNumber(this.chronometer.getMinutes())[0];
    }
    
    printSeconds = () => {
        this.secUni.innerHTML = this.chronometer.computeTwoDigitNumber(this.chronometer.getSeconds())[1];
        this.secDec.innerHTML = this.chronometer.computeTwoDigitNumber(this.chronometer.getSeconds())[0];
    }

    gameLoop() {

        // if gameIsOver is true, interrupts the function to stop the loop.
        if (this.gameIsOver){
            return;
        }



        this.update();

        //recursive loop to invoke itself repeatedly. Ensures a consistest frame rate 
        window.requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // //invoke move method. Move method updates the players position of x and y 
        this.player.move();
       
     

        // Create a new obstacle based on a random probability when there is no other obstacles on the screen
        // if (Math.random() > 0.99 && this.redAsteroids.length < 1){
        //RED ASTEROIDS
        if (Math.random() > 0.98 && this.redAsteroids.length < 6){
            this.redAsteroids.push(new redAsteroid(this.gameScreen))
        }


        for (let i = 0; i < this.redAsteroids.length; i++) {
            const redAsteroid = this.redAsteroids[i];
            redAsteroid.move();


            // If the player's spaceship collides with a redAsteroid
            if (this.player.didCollideRed(redAsteroid)) {
                // Remove the redAsteroid element from the DOM
                redAsteroid.element.remove();
                
                // Reduce health by 25%
                this.health -= 25;
                this.gameHealth.innerText = `${this.health}%`;

            } // If the obstacle is off the screen (at the bottom)
            else if (redAsteroid.top > this.height) {
         
                // Remove the obstacle from the DOM
                redAsteroid.element.remove();
                // Remove obstacle object from the array
                this.redAsteroids.splice(i, 1);

            }
        }

        //PURPLE ASTEROIDS
        if (Math.random() > 0.98 && this.purpleAsteroids.length < 2){
            this.purpleAsteroids.push(new purpleAsteroid(this.gameScreen))
        }


        for (let i = 0; i < this.purpleAsteroids.length; i++) {
            const purpleAsteroid = this.purpleAsteroids[i];
            purpleAsteroid.move();


            // If the player's spaceship collides with a redAsteroid
            if (this.player.didCollideRed(purpleAsteroid)) {
                // Remove the redAsteroid element from the DOM
                purpleAsteroid.element.remove();
                
                // Reduce health by 35%
                this.health -= 35;
                this.gameHealth.innerText = `${this.health}%`;

            } // If the obstacle is off the screen (at the bottom)
            else if (purpleAsteroid.top > this.height) {
            
                // Remove the obstacle from the DOM
                purpleAsteroid.element.remove();
                // Remove obstacle object from the array
                this.purpleAsteroids.splice(i, 1);

            }
        }

        //WHITE ASTEROIDS
        if (Math.random() > 0.98 && this.whiteAsteroids.length < 1){
            this.whiteAsteroids.push(new whiteAsteroid(this.gameScreen))
        }


        for (let i = 0; i < this.whiteAsteroids.length; i++) {
            const whiteAsteroid = this.whiteAsteroids[i];
            whiteAsteroid.move();


            // If the player's spaceship collides with a redAsteroid
            if (this.player.didCollideRed(whiteAsteroid)) {
                // Remove the redAsteroid element from the DOM
                whiteAsteroid.element.remove();
                
                // Reduce health by 35%
                this.health -= 50;
                this.gameHealth.innerText = `${this.health}%`;

            } // If the obstacle is off the screen (at the bottom)
            else if (whiteAsteroid.top > this.height) {
            
                // Remove the obstacle from the DOM
                whiteAsteroid.element.remove();
                // Remove obstacle object from the array
                this.whiteAsteroids.splice(i, 1);

            }
        }

        // If health is 0, end the game
        if (this.health <= 0) {
            this.endGame();
        }
                
    }

    formatTime(num) {
        if (num < 10 && num >= 0) {
            return `00:0${num}`
        } else if (num < 60) {
            return `00:${num}`;
        } else  {
            let mins = Math.floor(num / 60);
            let secs = num % 60;
            return `0${mins}:${secs < 10 ? '0' + secs : secs}`;
        }
    }


    endGame() {
        this.gameSoundPlay.stop();
        this.gameEndMusic.play();
        this.player.element.remove();
        this.redAsteroids.forEach(function (redAsteroid) {
            redAsteroid.element.remove();
        });

        this.purpleAsteroids.forEach(function (purpleAsteroid) {
            purpleAsteroid.element.remove();
        });

        this.whiteAsteroids.forEach(function (whiteAsteroid) {
            whiteAsteroid.element.remove();
        });

        this.chronometer.stop();

        let currentTime = this.chronometer.currentTime;

        sessionStorage.setItem('unformFinalTime', currentTime);

        sessionStorage.setItem('finalTime', this.formatTime(currentTime));

        let finalTime = sessionStorage.getItem('finalTime');
        let unformFinalTime = sessionStorage.getItem('unformFinalTime');

        this.unformTimesArr.push(unformFinalTime);
        this.finalTimesArr.push(finalTime);


        this.finalTimesArr.forEach(e => {
            this.liElement = document.createElement('li');
            this.liElement.innerText = e;
            this.statsUl.appendChild(this.liElement);
        })

        const highestTime = Math.max(...this.unformTimesArr);

        this.bestTime.innerText = `Best Time: ${this.formatTime(highestTime)}`;

        this.healthText.style.display = 'none';

        this.gameIsOver = true;

        // Show end game screen
        this.gameEndScreen.style.display = "flex"; 
 
        this.bodyElement.style.backgroundImage = 'url(./images/space-bg.jpg)';

        this.gameScreen.style.display = "none";
        
    }
}