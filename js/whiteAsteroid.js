class whiteAsteroid extends redAsteroid {
    constructor(gameScreen) {
        super(gameScreen);
        
        this.left = Math.floor(Math.random() * 100); //left; horizontal absolute position
        this.top = 0;  //vertical starting absolute position
        this.width = 40; //width; initial width of ast img
        this.height = 40; //height; initial height of ast img
        
        // this.element = document.createElement("img"); //the image element representing the car. 
        this.element.src = "./images/white-asteroid.avif"; //white ast img 
    }
    
    move() {
        super.move(); // call parent class method
        
        // super() method is called in the constructor to initialize properties from the parent class, and the move() method is overridden to add additional functionality to move the asteroid down by .70%.
        this.top += .70;
        
        // Update the obstacle's position on the screen; Re-draw it on the DOM
        this.updatePosition();
    }

}