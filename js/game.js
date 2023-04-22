class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.gameTime = document.getElementById("time");
        this.gameHealth = document.getElementById("health");
        this.statsContainer = document.getElementById("stats-container");
        this.bodyElement= document.querySelector('body');
        this.mainElement = document.querySelector('main');
        this.player = new Player(
            this.gameScreen, 
            50, //left; horizontal starting absolute position
            80, //top; vertical starting absolute position 
            100, //width; initial width of spaceship img
            150, //height; initial height of spaceship img
            "../images/spaceship.png" //imgSrc
        );
        this.height = 100;
        this.width = 100;
        // this.redAsteroids = [];
        this.redAsteroid = new redAsteroid(this.gameScreen);
        this.time = 0;
        this.health = 100;
        this.gameIsOver = false;
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
        this.mainElement.style.display = 'flex';

        //starts the gameLoop method
        this.gameLoop();
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
        this.redAsteroid.move();

        // for (let i = 0; i < this.redAsteroids.length; i++) {
        //     const redAsteroid = this.redAsteroids[i];
        //     redAsteroid.move();


        //     // If the player's spaceship collides with a redAsteroid
        //     if (this.player.didCollideRed(redAsteroid)) {
                
        //         // Reduce health by 25%
        //         this.health -= 25;

        //     } // If the obstacle is off the screen (at the bottom)
        //     else if (redAsteroid.top > this.height) {
         
        //         // Remove the obstacle from the DOM
        //         redAsteroid.element.remove();
        //         // Remove obstacle object from the array
        //         this.redAsteroid.splice(i, 1);

        //     }
        // }

        //     // If the lives are 0, end the game
        //     if (this.health === 0) {
        //         this.endGame();
        //     }
                
            // Create a new obstacle based on a random probability
            // when there is no other obstacles on the screen
            // if (Math.random() > 0.98 && this.redAsteroids.length < 1){
            //     this.redAsteroids.push(new RedAsteroid(this.gameScreen))
            // }

            
        
        
    }

    // endGame() {
    //     this.player.element.remove();
    //     this.redAsteroids.forEach(function (redAsteroid) {
    //         redAsteroid.element.remove();
    //     });

    //     this.gameIsOver = true;

    //     // Show end game screen
    //     this.gameEndScreen.style.display = "block"; 
    // }
}