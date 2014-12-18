require([], function () {
    Q.component("BaseEnemy", {
        added: function() {
            var entity = this.entity;
            entity.on("bump.left,bump.right,bump.bottom",function(collision) {
                if(collision.obj.isA("Player")) {
                    this.killPlayer(collision);
                }
            });
        },
        killPlayer: function(collision){
            Q.stageScene("endGame",1, { label: "Game Over" });
            collision.obj.destroy();
        },
        step: function(dt) {
            var dirX = this.p.vx/Math.abs(this.p.vx);
            var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
            var nextTile = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);

            //if we are on ground and there is a cliff
            if(!nextTile && ground) {
                if(this.p.vx > 0) {
                    if(this.p.defaultDirection == "right") {
                        this.p.flip = "x";
                    }
                    else {
                        this.p.flip = false;
                    }
                }
                else {
                    if(this.p.defaultDirection == "left") {
                        this.p.flip = "x";
                    }
                    else {
                        this.p.flip = false;
                    }
                }
                this.p.vx = -this.p.vx;
            }
        }
    });

    Q.Sprite.extend("EnemyToKill", {
        init: function(p) {
            this._super(p, {vx: -100, defaultDirection: "left"});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    //make the player jump
                    collision.obj.p.vy = -100;

                    //kill enemy
                    this.destroy();
                }
            });
        }
    });

    Q.Sprite.extend("EnemyToAvoid", {
        init: function(p) {
            this._super(p, {vx: -100, defaultDirection: "left"});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    this.kill_player(collision);
                }
            });
        }
    });




    Q.Sprite.extend("SecurityGuard", {
        init: function(p) {
            this._super(p, {vx: -100, defaultDirection: "left"});
            this.add("EnemyToAvoid");
        }
    });
});


(function(Q){


}(Q));