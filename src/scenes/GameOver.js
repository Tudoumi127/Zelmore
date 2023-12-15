class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(){
        //bind keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //gameover screen image
        this.add.image(0, 0, 'deadZelmore').setOrigin(0,0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start('playScene')
        }
    }
}