(function(Q){
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
        }
    });

    Q.Sprite.extend("KillEnemy", {
        init: function(p) {
            this._super(p, {vx: -100, defaultDirection: "left"});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    this.kill_player(collision);
                }
            });
        },
        step: function(dt) {
            //TODO
        }
    });

    Q.Sprite.extend("AvoidEnemy", {
        init: function(p) {
            this._super(p, {vx: -100, defaultDirection: "left"});
            this.add("2d, aiBounce, BaseEnemy");
            this.on("bump.top",function(collision) {
                if(collision.obj.isA("Player")) {
                    this.kill_player(collision);
                }
            });
        },
        step: function(dt) {
            //TODO
        }
    });

}(Q));