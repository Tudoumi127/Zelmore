class Attack extends Phaser.Physics.Arcade.Sprite{

    //unused prefab class for attack projectiles- left here for the future if I wish to revisit
    constructor(scene, x, y, texture, frame, player, direction, enemy){
        super(scene, x, y, texture, frame, player, direction, enemy);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        this.setBounce(0.1)

        //destroy on impact with enemy
        this.collider = scene.physics.add.collider(enemy, this, () => {
            enemy.destroy();
            this.destroy();
        }, null, scene);

        //follow player direction
        if(direction == 'right'){
            this.direction = 1;
        }
        else{
            this.direction = -1;
        }

        this.setVelocity(270 * this.direction);
    }

    update(){
        //destroy if off screen
        if(this.x > scene.width + borderPadding || this.x < -borderPadding) {
            this.destroy();
        }
    }
}