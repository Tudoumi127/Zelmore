class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        this.load.spritesheet('player', 'hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })

        //tilemap
    }

    create(){
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        })
        //use this as placeholder for jump
        this.anims.create({
            key: 'jump',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { start: 28, end: 31 }),
        })

        // proceed once loading completes
        this.scene.start('playScene')
    }
}