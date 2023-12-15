class Gumball extends Phaser.Physics.Arcade.Sprite{
    //prefab for collectible gumball
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this, false); 
        scene.add.existing(this);
        this.setImmovable(true);
    }
}