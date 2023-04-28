class whiteAsteroid {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 100); //left; horizontal absolute position
        this.top = 0;  //vertical starting absolute position
        this.width = 40; //width; initial width of vehicle img
        this.height = 40; //height; initial height of vehicle img
        
        this.element = document.createElement("img"); //the image element representing the car. 
        this.element.src = "./images/white-asteroid.avif"; //red car img 
    
        this.element.style.position = "absolute";
    
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.element.style.left = `${this.left}%`;
        this.element.style.top = `${this.top}%`;
    
        this.gameScreen.appendChild(this.element); 
    }

    //Updates the position of the obstacle element on the screen based on its current left and top properties. Re-draw it on the DOM
    updatePosition() {
        this.element.style.left = `${this.left}%`;
        this.element.style.top = `${this.top}%`;
    }
    
    move() {
        
        // Move the obstacle down by .10%
        this.top += .70;
        
        // Update the obstacle's position on the screen; Re-draw it on the DOM
        this.updatePosition();

    }

}