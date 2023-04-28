class purpleAsteroid extends redAsteroid {
    constructor(gameScreen) {
        super(gameScreen);

        this.left = Math.floor(Math.random() * 100); //left; horizontal absolute position
        this.top = 0;  //vertical starting absolute position
        this.width = 60; //width; initial width of ast img
        this.height = 60; //height; initial height of ast img
        
        this.element.src = "./images/purple-asteroid.png"; //red car img 
    }
    
    move() {
        super.move(); // call parent class method
        
        // Move the obstacle down by .10%
        this.top += .50;
        
        // Update the obstacle's position on the screen; Re-draw it on the DOM
        this.updatePosition();

    }

}