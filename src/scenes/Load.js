class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload(){
        this.load.path = './assets/'
        /*this.load.spritesheet('player', 'hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })*/

        this.load.spritesheet('player', 'GumPlayer.png', {
            frameWidth: 48,
            frameHeight: 48,
        })

        //tilemap
    }

    create(){
        this.anims.create({
            key: 'idle-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'idle-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 7, end: 6 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [ 0, 2, 1, 3]
             }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [7, 8, 6, 9]
            }),
        })
        //use this as placeholder for jump
        this.anims.create({
            key: 'jump-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [1, 2, 2, 2]
             }),
        })
        this.anims.create({
            key: 'jump-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [6, 8, 8, 8]
             }),
        })
        this.anims.create({
            key: 'hurt',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [4, 4, 4]
             }),
        })

        // proceed once loading completes
        this.scene.start('playScene')
    }
}