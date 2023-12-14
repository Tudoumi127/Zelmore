class Bubble extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.physics.add.existing(this, false); 
        scene.add.existing(this);
        this.setImmovable(true);
        
    }
}