class endSound extends startSound {
    constructor(src, gameEndScreen){
        super(src);
        this.gameEndScreen = gameEndScreen;
        this.gameEndScreen.appendChild(this.sound);
    }
}