class Play extends Phaser.Scene{

    constructor(){
        super("playScene");
    }

    preload(){
        this.load.path = "./assets/"

        //tilemap
        this.load.image('tiles', 'scuffmap.png');
        this.load.tilemapTiledJSON('tilemap', 'scuffmap.json');
        this.load.image('car', 'car.png')
    }

    create(){

        const {width, height} = this.scale;

        //game state trackers
        this.gameOver = false;
        this.score = 0;

        //text configs
        let scoreConfig = {
            fontFamily: 'Palatino',
            fontSize: '20px',
            backgroundColor: '#FF4433',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //tween that only shows up when game is played through canvas
        //but my build is on WebGL so rip
        let getEm = this.add.bitmapText(this.width/2, this.height/2 - borderPadding/2, 'fonty', 'Collect All The Gumballs!', 55, 1).setOrigin(-0.1,-7).setAlpha(1);
        getEm.setDepth(12);
        this.tweens.add({
            targets: getEm,
            duration: 500,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            delay: 400,
            alpha: { from: 1, to: 0},
        });


        //tilemap
        const map = this.make.tilemap({key: 'tilemap'});
        const tileset = map.addTilesetImage('zelmore', 'tiles');
        const skyLayer = map.createLayer('Sky', tileset);
        const cloudLayer = map.createLayer('Clouds', tileset);
        const mountainLayer1 = map.createLayer('Mountains', tileset);
        const mountainLayer2 = map.createLayer('MoreMountains', tileset);
        const spikeLayer = map.createLayer('Spikes', tileset);
        const groundLayer = map.createLayer('GroundLayer', tileset);
    


        //add player
        const playerSpawn = map.findObject('Spawns', obj => obj.name === 'PlayerSpawn');
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 0, 'right');
        this.player.body.setSize(40,).setOffset(2, 0);

        //add gumballs
        const gumSpawn1 = map.findObject('Spawns', obj => obj.name === 'GumSpawn1');
        const testGum1 = new Gumball(this, gumSpawn1.x, gumSpawn1.y, 'gummies', 0);
        const gumSpawn2 = map.findObject('Spawns', obj => obj.name === 'GumSpawn2');
        const testGum2 = new Gumball(this, gumSpawn2.x, gumSpawn2.y, 'gummies', 0);
        const gumSpawn3 = map.findObject('Spawns', obj => obj.name === 'GumSpawn3');
        const testGum3 = new Gumball(this, gumSpawn3.x, gumSpawn3.y, 'gummies', 0);
        const gumSpawn4 = map.findObject('Spawns', obj => obj.name === 'GumSpawn4');
        const testGum4 = new Gumball(this, gumSpawn4.x, gumSpawn4.y, 'gummies', 0);
        const gumSpawn5 = map.findObject('Spawns', obj => obj.name === 'GumSpawn5');
        const testGum6 = new Gumball(this, gumSpawn5.x, gumSpawn5.y, 'gummies', 0);
        const gumSpawn6 = map.findObject('Spawns', obj => obj.name === 'GumSpawn6');
        const testGum7 = new Gumball(this, gumSpawn6.x, gumSpawn6.y, 'gummies', 0);

        const testGumSpawn = map.findObject('MessingAround', obj => obj.name === 'TestGum');
        const testGum5 = new Gumball(this, testGumSpawn.x, testGumSpawn.y, 'gummies', 0);

        testGum1.anims.play('gumjump');
        testGum2.anims.play('gumjump');
        testGum3.anims.play('gumjump');
        testGum4.anims.play('gumjump');
        testGum5.anims.play('gumjump');
        testGum6.anims.play('gumjump');
        testGum7.anims.play('gumjump');

        //gumball colliders
        this.gumballs = this.physics.add.group(config = {
            immovable: true,
        })
        this.gumballs.add(testGum1);
        this.gumballs.add(testGum2);
        this.gumballs.add(testGum3);
        this.gumballs.add(testGum4);
        this.gumballs.add(testGum5);
        this.gumballs.add(testGum6);
        this.gumballs.add(testGum7);
        this.physics.add.collider(this.player, this.gumballs, (player, gumball) => {
            this.score += 1
            this.sound.play('pickup')
            gumball.destroy();
        })

        //camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.cameras.main.setName("PlayerCam");

        this.UICamera = this.cameras.add(0, 0, this.scale.width, this.scale.height).setScroll(0, 0);
        this.UICamera.setZoom(1);
        this.UICamera.ignore([this.player, this.gumballs, skyLayer, cloudLayer, mountainLayer1, mountainLayer2, spikeLayer, groundLayer]);
        this.UICamera.setName("UICam");

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        //tilemap colliders
        groundLayer.setCollisionByProperty({
            collision: true
        })

        this.physics.add.collider(this.player, groundLayer);

        spikeLayer.setCollisionByProperty({
            collision: true
        })

        this.physics.add.collider(this.player, spikeLayer, () =>{
            this.player.anims.play('hurt', true)
            this.sound.play('spiked')
            //this.gameOver = true;
            this.player.once('animationcomplete', () => {
                this.gameOver = true;
            })
            this.sound.play('spiked')
            //this.gameOver = true;
            //console.log(this.gameOver);
        });

        //keys
        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keys.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keys.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        //display score
        this.scoreShow = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.score, scoreConfig);
        this.scoreTracker = this.time.addEvent({
            delay: 50,
            callback: () => {
                this.scoreShow.text = this.score;
            },
            callbackScope: this,
            loop: true
        })

    }

    update(){
        this.FSM.step();

        if(this.score >= 7){
            this.scene.start('youWinScene');
        }
        if(this.gameOver == true){
            this.scene.start('gameOverScene');
        }
        
        
    }
}