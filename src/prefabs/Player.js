class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, direction){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this, false);

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true);
        this.body.setGravity(200);

        this.direction = direction;
        this.playerVelocity = 10;
        this.touchedBounds = false;


        scene.FSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            jump: new JumpState(),
            attack: new AttackState(),
            hurt: new HurtState(),
        }, [scene, this])
    }

    update(){
        if(scene.onFloor){
            this.touchedBounds = true;
        }
    }
}

class IdleState extends State {
    enter(scene, player) {
        player.setVelocityX(0)
        //player.anims.play(`idle-${player.direction}`)
        player.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, space, shift } = scene.keys
        const HKey = scene.keys.HKey

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to attack if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('attack')
            return
        }

        // hurt if H key input (just for demo purposes)
        /*if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
            return
        }*/

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

        // transition to swing if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('jump')
            return
        }

        // transition to attack if pressing shift
        if(Phaser.Input.Keyboard.JustDown(shift)) {
            this.stateMachine.transition('attack')
            return
        }

        // hurt if H key input (just for demo purposes)
        if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
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
        player.setVelocity(player.playerVelocity * moveDirection.x, player.playerVelocity * moveDirection.y)
        //player.anims.play(`walk-${player.direction}`, true)
    }
}

class JumpState extends State {
    enter(scene, player) {
        player.setVelocityY(player.velocity)
        //player.anims.play(`jump-${player.direction}`)
        /*player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })*/
    }
    execute(scene, player){
        const {space} = scene.keys;

        if(scene.hurt) {
            this.stateMachine.transition('hurt')
            return
        }

        let colliding = player.body.touching
        if(colliding.down){
            this.stateMachine.transition('idle');
        }
    }
}

class AttackState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        //player.anims.play(`swing-${player.direction}`)
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}


class HurtState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        //player.anims.play(`walk-${player.direction}`)
        player.anims.stop()
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
