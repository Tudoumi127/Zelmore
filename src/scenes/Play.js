class Play extends Phaser.Scene{

    constructor(){
        super("playScene");
    }

    preload(){
        this.load.path = "./assets/"

        //tilemap
        this.load.image('tiles', 'scuffmap.png');
        this.load.tilemapTiledJSON('tilemap', 'scuffmap.json');
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

        //placeholder bg color
        this.cameras.main.setBackgroundColor('#87CEEB')

        //tilemap
        const map = this.make.tilemap({key: 'tilemap'});
        const tileset = map.addTilesetImage('zelmore', 'tiles');
        const mountainLayer1 = map.createLayer('Mountains', tileset);
        const mountainLayer2 = map.createLayer('MoreMountains', tileset);
        const spikeLayer = map.createLayer('Spikes', tileset);
        const groundLayer = map.createLayer('GroundLayer', tileset);
    


        //add player
        const playerSpawn = map.findObject('Spawns', obj => obj.name === 'PlayerSpawn');
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 0, 'right');
        this.player.body.setSize(40,48).setOffset(2, 0);

        //add gumballs
        const gumSpawn1 = map.findObject('Spawns', obj => obj.name === 'GumSpawn1');
        const testGum1 = new Gumball(this, gumSpawn1.x, gumSpawn1.y, 'player', 0);
        const gumSpawn2 = map.findObject('Spawns', obj => obj.name === 'GumSpawn2');
        const testGum2 = new Gumball(this, gumSpawn2.x, gumSpawn2.y, 'player', 0);
        const gumSpawn3 = map.findObject('Spawns', obj => obj.name === 'GumSpawn3');
        const testGum3 = new Gumball(this, gumSpawn3.x, gumSpawn3.y, 'player', 0);
        const gumSpawn4 = map.findObject('Spawns', obj => obj.name === 'GumSpawn4');
        const testGum4 = new Gumball(this, gumSpawn4.x, gumSpawn4.y, 'player', 0);

        const testGumSpawn = map.findObject('MessingAround', obj => obj.name === 'TestGum');
        const testGum5 = new Gumball(this, testGumSpawn.x, testGumSpawn.y, 'player', 0);

        //gumball colliders
        this.gumballs = this.physics.add.group(config = {
            immovable: true,
        })
        this.gumballs.add(testGum1);
        this.gumballs.add(testGum2);
        this.gumballs.add(testGum3);
        this.gumballs.add(testGum4);
        this.gumballs.add(testGum5);
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


    }

    update(){
        this.FSM.step();

        
        if(this.player.body.onFloor()){
            this.player.touchedBounds = true;
        }

        if(this.gameOver == true){
            //this.score = 0;
            this.scene.start('gameOverScene');
        }
        
        
    }
}