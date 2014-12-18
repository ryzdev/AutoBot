            var Q = Quintus()
                .include("Sprites, Scenes, Input, 2D, Touch, UI")
                .setup({
                    width: 960,
                    height: 640
                }).controls().touch();
 
//Q.gravityY = 9.8;
 
var objectFiles = [
  './src/sprites/player'
];
 
require(objectFiles, function () {
    //creating scene on stage
    Q.scene("firstStreet",function(stage) {
    var background = new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex: 0, sheet: 'tiles', tileW: 70, tileH: 70, type: Q.SPRITE_NONE });  //Q.SPRITE_NONE nocoll
    stage.insert(background);
    stage.collisionLayer(new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex:1,  sheet: 'tiles', tileW: 70, tileH: 70 }));
    // add player onto scene
    var player = stage.insert(new Q.Player());
    stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h});
    });

    Q.scene("endGame",function(stage) {
        alert("game over");
        window.location = "";
    });

    Q.load("tiles_map.png, player.png, firstStreet.tmx", function() { //creating stage (layer)
        Q.sheet("tiles","tiles_map.png", { tilew: 70, tileh: 70});
        Q.stageScene("firstStreet");
    });
});