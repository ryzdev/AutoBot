/**
 * Created by stephen.murby on 12/18/2014.
 */
require([], function () {
    Q.load({"OST": '../audio/main-theme-overworld.mp3'},function() {
        Q.audio.play('OST');
    });
});