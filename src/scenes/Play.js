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
            backgroundColor: '#ADD2E8',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let getEm = this.add.bitmapText(this.width/2, this.height/2 - borderPadding/2, 'fonty', 'Collect All The Gumballs!', 74, 1).setOrigin(0.5,0.5).setAlpha(1);
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

        //placeholder bg color
        this.cameras.main.setBackgroundColor('#87CEEB')

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
            console.log(this.score);
            //increment score
            //bubble.anims.play('bubblePop');
            //bubble.bubIsFather = true
            gumball.destroy();
        })

        //camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        //this.UICamera = this.cameras.add(0, 0, game.config.width, game.config.height).setZoom(1);
        //this.UICamera.ignore([this.player])
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
            this.player.once('animationcomplete', () => {
                this.gameOver = true;
            })
            //this.gameOver = true;
            console.log(this.gameOver);
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

        //messing around with enemies
        let graphics = this.add.graphics()
        graphics.lineStyle(2, 0xFFFFF, 0.75)
        this.enemyPath = this.add.path(900, 334)
        this.enemyPath.lineTo(1200, 334)
        this.enemyPath.lineTo(900, 334)
        this.enemyPath.draw(graphics)
        let e = this.enemyPath.getStartPoint()

        this.enemy = this.add.follower(this.enemyPath, e.x, e.y, 'car').setScale(0.5)
        this.enemy.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            ease: 'Power0',
            hold: 0,
            repeat: -1,
            yoyo: false,
            rotateToPath: false
        })


    }

    update(){
        this.FSM.step();

        if(this.player.attacking){
            //play audio
            //play visual effect animation
            const attack = new Attack(this, this.player.x, this.player.y, 'gummies', 0, this.player, this.player.direction, this.enemy);
            this.player.attacking = false;
        }

        if(this.score >= 7){
            this.scene.start('youWinScene');
        }
        if(this.gameOver == true){
            //this.score = 0;
            this.scene.start('gameOverScene');
        }
        
        
    }
}