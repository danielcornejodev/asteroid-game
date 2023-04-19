class Game {
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-screen");
        this.gameEndScreen = document.getElementById("game-end");
        this.gameScore = document.getElementById("score");
        this.gameLives = document.getElementById("lives");
        this.player = new Player(
            this.gameScreen, 
            200, //left; horizontal starting absolute position
            500, //top; vertical starting absolute position 
            100, //width; initial width of vehicle img
            150, //height; initial height of vehicle img
            "" //imgSrc
        );
        this.height = 600;
        this.width = 500;
        this.obstacles = [];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
    }

    start() {
        //sets initial width and heigh of the game-screen when start method is called.
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;

        // hide start screen
        this.startScreen.style.display = "none";
        // show game screen
        this.gameScreen.style.display = "block";
        
        //starts the gameLoop method
        this.gameLoop();
    }

    gameLoop() {

        console.log("in the game loop");

        // if gameIsOver is true, interrupts the function to stop the loop.
        if (this.gameIsOver){
            return;
        }

        this.update();

        //recursive loop to invoke itself repeatedly. Ensures a consistest frame rate 
        window.requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        //invoke move method. Move method updates the players position of x and y 
        this.player.move();

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();


            // If the player's car collides with an obstacle
            if (this.player.didCollide(obstacle)) {
                // Remove the obstacle element from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Reduce player's lives by 1
                this.lives--;
                // Update the counter variable to account for the removed obstacle
                i--;
            } // If the obstacle is off the screen (at the bottom)
            else if (obstacle.top > this.height) {
                // Increase the score by 1
                this.score++;
                // Remove the obstacle from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Update the counter variable to account for the removed obstacle
                i--;
            }
        }

            // If the lives are 0, end the game
            if (this.lives === 0) {
                this.endGame();
            }
                
            // Create a new obstacle based on a random probability
            // when there is no other obstacles on the screen
            if (Math.random() > 0.98 && this.obstacles.length < 1){
                this.obstacles.push(new Obstacle(this.gameScreen))
            }
        
        
    }

    endGame() {
        this.player.element.remove();
        this.obstacles.forEach(function (obstacle) {
            obstacle.element.remove();
        });

        this.gameIsOver = true;
        // Hide game screen
        this.gameScreen.style.display = "none";
        // Show end game screen
        this.gameEndScreen.style.display = "block"; 
    }
}