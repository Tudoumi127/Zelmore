class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create(){
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.add.image(0, 0, 'deadZelmore').setOrigin(0,0);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start('playScene')
        }
    }
}