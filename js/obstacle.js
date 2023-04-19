class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 250); //left; horizontal absolute position
        this.top = 60;  //vertical starting absolute position
        this.width = 100; //width; initial width of vehicle img
        this.height = 150; //height; initial height of vehicle img
        
        this.element = document.createElement("img"); //the image element representing the car. 
        this.element.src = "images/redCar.png"; //red car img 
    
        this.element.style.position = "absolute";
    
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    
        this.gameScreen.appendChild(this.element); 
    }

    //Updates the position of the obstacle element on the screen based on its current left and top properties. Re-draw it on the DOM
    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
    
    move() {
        
        // Move the obstacle down by 3px
        this.top += 3;

        // Update the obstacle's position on the screen; Re-draw it on the DOM
        this.updatePosition();

    }

}