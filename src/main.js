var Q = Quintus({ audioSupported: [ 'mp3' ] })
    .include("Sprites, Scenes, Input, 2D, Touch, UI, Audio")
    .setup({
        width: 960,
        height: 640
    })
    .controls()
    .touch()
    .enableSound();
 
//Q.gravityY = 9.8;
 
var objectFiles = [
    './src/sprites/player',
    './src/sprites/enemies',
    './src/sprites/badge',
    './src/audio'
];
 
require(objectFiles, function () {
    //creating scene on stage

    var enemyAssets = [
//        ["EnemyToAvoid", {x: 400, y: 3220, asset: "enemies/security-guard.png"}],
        ["EnemyToAvoid", {x: 1000, y: 2050, asset: "enemies/security-guard.png"}],
        ["EnemyToAvoid", {x: 500, y: 2050, asset: "enemies/security-guard.png"}],
        ["VerticalEnemyToAvoid", {x: 700, y: 1950, asset: "enemies/security-guard.png"}],
        ["EnemyToKill", {x: 280, y: 910, asset: "enemies/wheel.png"}],
        ["Badge", {x: 450, y: 1800, asset: "badge.png"}],

        ["BadgeGuard", {x: 350, y: 1800, asset: "enemies/security-guard.png"}]
    ];

    Q.scene("firstStreet",function(stage) {
        var background = new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex: 0, sheet: 'tiles', tileW: 70, tileH: 70, type: Q.SPRITE_NONE });  //Q.SPRITE_NONE nocoll
        stage.insert(background);
        stage.collisionLayer(new Q.TileLayer({ dataAsset: 'firstStreet.tmx', layerIndex:1,  sheet: 'tiles', tileW: 70, tileH: 70 }));
        // add player onto scene
        var player = stage.insert(new Q.Player());
        stage.add("viewport").follow(player,{x: true, y: true},{minX: 0, maxX: background.p.w, minY: 0, maxY: background.p.h});

        stage.loadAssets(enemyAssets);
    });

    Q.scene("endGame",function(stage) {
        var container = stage.insert(new Q.UI.Container({
            fill: "white",
            border: 5,
            shadow: 10,
            shadowColor: "rgba(0,0,0,0.5)",
            y: Q.height/2,
            x: Q.width/2
        }));

        stage.insert(new Q.UI.Button({
            label: "You're fired! Click to play again",
            color: 'white',
            y: 0,
            x: 0
        }, function() {
            window.location = '';
        }), container);

        container.fit(40,40);
    });

    Q.scene("winGame",function(stage) {
        var container = stage.insert(new Q.UI.Container({
            fill: "white",
            border: 5,
            shadow: 10,
            shadowColor: "rgba(0,0,0,0.5)",
            y: Q.height/2,
            x: Q.width/2
        }));

        stage.insert(new Q.UI.Button({
            label: "Congratulations! You're hired!!!!!!",
            color: 'yellow',
            y: 0,
            x: 0
        }, function() {
            window.location = '';
        }), container);

        container.fit(60,60);
    });

    Q.scene("gameStats", function(stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
            fill: "gray",
            x: Q.width/2,
            y: 10,
            border: 1,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 960,
            h: 40
            })
        );

        var score = stage.insert(new Q.UI.Text({
                label: "Score: 0",
                color: "white",
                x: 270,
                y: 0
            }),statsContainer);

        var time = stage.insert(new Q.UI.Text({
                label: "Time: 0",
                color: "white",
                x: 150,
                y: 0
            }),statsContainer);

        var lives = stage.insert(new Q.UI.Text({
                label: "Lives: 3",
                color: "white",
                x: -50,
                y: 0
            }),statsContainer);

        var recs = stage.insert(new Q.UI.Text({
                label: "Recommendations: 0",
                color: "white",
                x: -300,
                y: 0
            }),statsContainer);
    });




    Q.load("tiles_map.png, autobot.png, firstStreet.tmx, enemies/security-guard.png, enemies/wheel.png, badge.png", function() { //creating stage (layer)
        Q.sheet("tiles","tiles_map.png", { tilew: 70, tileh: 70});
        Q.stageScene("firstStreet");
        Q.stageScene("gameStats",1);
    });

    Q.state.set('score', 0);
    Q.state.on("change.score",function() {

        var livesLabel = Q("UI.Text",1).first();
        livesLabel.p.label = "Score: "+ Q.state.score;
    });

});