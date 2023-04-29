class gameSound extends startSound {
    constructor(src, gameScreen){
        super(src);
        this.gameScreen = gameScreen;
        this.gameScreen.appendChild(this.sound);
    }
}