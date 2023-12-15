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

        //audio
        this.load.audio('jump', 'jump.mp3');
        this.load.audio('pickup', 'pickup.mp3')
        this.load.audio('spiked', 'spiked.mp3');
        this.load.audio('loopmusic', 'loopmusic.mp3')

        //images
        this.load.image('menuZelmore', 'ZelmoreMenu.png');
        this.load.image('deadZelmore', 'ZelmoreDied.png');
        this.load.image('winZelmore', 'ZelmoreWin.png');

        //player
        this.load.spritesheet('player', 'GumPlayer.png', {
            frameWidth: 48,
            frameHeight: 48,
        })

        //gumballs
        this.load.spritesheet('gummies', 'Gummyballs.png', {
            frameWidth: 32,
            frameHeight: 32,
        })

        //font
        this.load.bitmapFont('fonty', 'gem.png', 'gem.xml')
    }

    create(){
        //player anims
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
        this.anims.create({
            key: 'jump-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [1, 2, 2]
             }),
        })
        this.anims.create({
            key: 'jump-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [6, 8, 8]
             }),
        })
        this.anims.create({
            key: 'hurt',
            frameRate: 60,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [4]
             }),
        })
        this.anims.create({
            key: 'fall',
            frameRate: 4,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('player', { 
                frames: [5, 5]
             }),
        })

        //gumball anims
        this.anims.create({
            key: 'gumjump',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('gummies', { 
                start: 0, end: 2
             }),
        })

        // proceed once loading completes
        this.scene.start('menuScene')
    }
}