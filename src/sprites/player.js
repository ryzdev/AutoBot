require([], function () {
    Q.Sprite.extend("Player",{
        init: function(p) {
          this._super(p, { asset: "autobot.png", x: 140, y: 3220, jumpSpeed: -540});
          this.add('2d, platformerControls');
        },
        step: function(dt) {
            if(Q.inputs['left'] && this.p.direction == 'right') {
                this.p.flip = 'x';
            }
            if(Q.inputs['right']  && this.p.direction == 'left') {
                this.p.flip = false;
            }
        }
    });
});