class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(200);

        this.direction = direction;
        this.enemyVelocity = 200;
        this.moveTime = 0;


        scene.FSM = new StateMachine('idle', {
            idle: new EnemyIdleState(),
            left: new LeftState(),
            right: new RightState(),
        }, [scene, this])
    }

}

class EnemyIdleState extends State {
    enter(scene, enemy) {
        player.setVelocity(0);
        //player.anims.play(`idle-${player.direction}`)
        player.anims.stop()
    }

    execute(scene, enemy) {
        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }

        const randnum = Phaser.Math.Between(1, 100)
        if (r <= 50){
            this.stateMachine.setState('left')
        }
        else{
            this.stateMachine.setState('right')
        }
    }
}

class LeftState extends State {
    enter(scene, enemy) {
        //console.log(player.playerVelocity);
        enemy.setVelocityX(-(enemy.enemyVelocity))
    }
    execute(scene, player){
        //if certain amount of seconds have passed, transition back to move right

    }
}

class RightState extends State {
    enter(scene, enemy) {
        //console.log(player.playerVelocity);
        enemy.setVelocityX(enemy.enemyVelocity)
    }
    execute(scene, player){
        //if certain amount of seconds have passed, transition back to move left

    }
}