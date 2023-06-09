window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  startScreenSound = new startSound('./sounds/02 Start Music.mp3');

  startScreenSound.play();

  startButton.addEventListener("click", function () {
    startGame();
  });

  // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }

  function startGame() {
    game = new Game(); // invokes new instance of Game class

    game.start();

    startScreenSound.stop();
  }

    // Function that handles keydown event
    function handleKeydown(event) {
      const key = event.key;
  
      //possible Key Stroke are the value of event.key for arrow controls
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown"
      ];
  
      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();
  
        // Update player's directionX and directionY based on the key pressed

        
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -.50;
            break;
          case "ArrowUp":
            game.player.directionY = -.50;
            break;
          case "ArrowRight":
            game.player.directionX = .50;
            break;
          case "ArrowDown":
            game.player.directionY = .50;
            break;
        }
      }
    }
  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);
};