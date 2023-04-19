class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen; //the game screen element passed as an argument to the constructor.
        this.left = left; //the horizontal position of the car passed as an argument to the constructor.
        this.top = top; //the vertical position of the car passed as an argument to the constructor.
        this.width = width; //the width of the car element passed as an argument to the constructor.
        this.height = height; //the height of the car element passed as an argument to the constructor.
        this.directionX = 0; // 0 not moving horizontally, 1 right,-1 left
        this.directionY = 0;// 0 not moving vertically, 1 right,-1 left
    
        this.element = document.createElement("img"); //the image element representing the car. 
        this.element.src = imgSrc; //(image url) passed as an argument to the constructor.
    
        this.element.style.position = "absolute";
    
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    
        this.gameScreen.appendChild(this.element); 
    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;
       
        // sets boundary to left hand side. Restricting position to left 30.
        if(this.left < 30){
            this.left = 30;
        }

        // sets boundary to top. Restricting position to left 10.
        if(this.left < 10){
            this.left = 10;
        }

        // sets boundary to right hand side
        if(this.left + this.width > this.gameScreen.offsetWidth - 30){
            this.left = this.gameScreen.offsetWidth - this.width - 30;
        }

        // sets boundary to down side
        if(this.top + this.height > this.gameScreen.offsetHeight - 10){
            this.top = this.gameScreen.offsetHeight - this.height - 10;
        }   

        this.updatePosition();;

    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect(); //method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
  }

