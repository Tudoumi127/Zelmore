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

        //placeholder bg color
        this.cameras.main.setBackgroundColor('#87CEEB')
        //tilemap
        const map = this.make.tilemap({key: 'tilemap'});
        const tileset = map.addTilesetImage('zelmore', 'tiles');
        //const bgLayer = map.createLayer('Background', tileset, 0, 0);
        const mountainLayer1 = map.createLayer('Mountains', tileset);
        const mountainLayer2 = map.createLayer('MoreMountains', tileset);
        const groundLayer = map.createLayer('GroundLayer', tileset);
    


        //add player
        const playerSpawn = map.findObject('Spawns', obj => obj.name === 'PlayerSpawn');
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, 'player', 0, 'right');

        //add gumballs
        const gumSpawn1 = map.findObject('Spawns', obj => obj.name === 'GumSpawn1');
        this.testGum1 = this.add.image(this, gumSpawn1.x, gumSpawn1.y, '');

        //tilemap colliders
        groundLayer.setCollisionByProperty({
            collision: true
        })

        this.physics.add.collider(this.player, groundLayer);


        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keys.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keys.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    }

    update(){
        this.FSM.step();
    }
}