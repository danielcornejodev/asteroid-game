class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen; //the game screen element passed as an argument to the constructor.
        this.left = left; //the horizontal position of the asteroid passed as an argument to the constructor.
        this.top = top; //the vertical position of the asteroid passed as an argument to the constructor.
        this.width = width; //the width of the asteroid element passed as an argument to the constructor.
        this.height = height; //the height of the asteroid element passed as an argument to the constructor.
        this.directionX = 0; // 0 not moving horizontally, 1 right,-1 left
        this.directionY = 0;// 0 not moving vertically, 1 right,-1 left
    
        this.element = document.createElement("img"); //the image element representing the car. 
        this.element.src = imgSrc; //(image url) passed as an argument to the constructor.
    
        this.element.style.position = "absolute";
    
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}%`;
        this.element.style.top = `${this.top}%`;
    
        this.gameScreen.appendChild(this.element); 
    }

    move() {
        this.left += this.directionX;
 
        this.top += this.directionY;
       
        // sets boundary to left hand side.
        if(this.left < 0){
            this.left = 100;
        } else if(this.left > 100){
            this.left = 0;
        }

        // sets boundary to top. 
        if(this.top < 0){
            this.top = 100;
        } else if (this.top > 100){
            this.top = 0;
        }



        this.updatePosition();;

    }

    updatePosition() {
        this.element.style.left = `${this.left}%`;
        this.element.style.top = `${this.top}%`;

    }

    didCollideRed(redAsteroid) {
        const playerRect = this.element.getBoundingClientRect(); //method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
        const redAsteroidRect = redAsteroid.element.getBoundingClientRect();
    
        if (
          playerRect.left < redAsteroidRect.right &&
          playerRect.right > redAsteroidRect.left &&
          playerRect.top < redAsteroidRect.bottom &&
          playerRect.bottom > redAsteroidRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
  }

