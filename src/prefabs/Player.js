class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);

        //physics
        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(400);

        //variables
        this.direction = direction;
        this.playerVelocity = 300;
        this.playerJumpVelocity = 500;
        this.touchedBounds = false;
        this.attacking = false;
        this.hurt = false;

        //statemachine
        scene.FSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            attack: new AttackState(),
            hurt: new HurtState(),
        }, [scene, this])
    }
}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0);
        player.anims.play(`idle-${player.direction}`)
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, space, shift } = scene.keys

        // transition to jump if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to attack if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('attack')
            return
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
            this.stateMachine.transition('move')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, space, shift} = scene.keys
        const HKey = scene.keys.HKey

        // transition to jump if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to attack if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('attack')
            return
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(left.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
        } else if(right.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
        }
        // normalize movement vector, update player position, and play proper animation
        moveDirection.normalize()
        player.setVelocityX(player.playerVelocity * moveDirection.x)
        player.anims.play(`walk-${player.direction}`, true)
    }
}

class JumpState extends State {
    enter(scene, player) {
        //console.log(player.playerVelocity);
        //player.setVelocityY(player.playerVelocity)
        player.anims.play(`jump-${player.direction}`)
        scene.onFloor = false
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
    execute(scene, player){
        const { left, right, space, shift} = scene.keys
        player.setVelocityY(-(player.playerJumpVelocity))

        if(player.hurt) {
            this.stateMachine.transition('hurt')
            return
        }

        let colliding = player.body.touching
        if(colliding.down || scene.onFloor){
            this.stateMachine.transition('idle');
            return;
        }

        if((left.isDown || right.isDown)){
            this.stateMachine.transition('move');
            return;
        }

    }
}

class AttackState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.attacking = true;
        //player.anims.play(`swing-${player.direction}`)
        player.anims.play('jump-right');
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, player){
        if(player.hurt){
            this.stateMachine.transition('hurt')
            return
        }
    }
}


class HurtState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        //player.anims.play(`walk-${player.direction}`)
        //player.anims.stop()
        player.attacking = false;
        player.setTint(0xFF0000)     // turn red
        // create knockback by sending body in direction opposite facing direction
        switch(player.direction) {
            case 'left':
                player.setVelocityX(player.playerVelocity*2)
                break
            case 'right':
                player.setVelocityX(-player.playerVelocity*2)
                break
        }

        // set recovery timer
        scene.time.delayedCall(player.hurtTimer, () => {
            player.clearTint()
            this.stateMachine.transition('idle')
        })
    }
}
