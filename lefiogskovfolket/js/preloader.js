var preloader = {

    //sørger for at loade alle ting inden spillet går igang
    queue: new createjs.LoadQueue(true),

    //tekst på canvas som viser hvor langt spillet er fra at være loadet
    loadText: new createjs.Text("", "50px Courier New", "#000"),

    //sørger for at loade alle ting inden spillet går igang
    load: function(){
        projekt.stage.addChild(this.loadText);
        //sørger for at lyd kan afspilles
        this.queue.installPlugin(createjs.Sound);
        //loading parameter, der kalder funktion som fortæller hvor langt vi er fra at spillet er loadet
        this.queue.on("progress", this.progress, this);

        //når preloader er færdig, kaldes funktionen setupGame, som starter spillet
        this.queue.on("complete", projekt.setupGame, projekt);

        //kø der indeholder alle de elementer som skal preloades
        this.queue.loadManifest([
            "js/ticker.js", "js/controls.js", "js/objekter.js","js/hitTest.js",
            {id:"lvlJSON", src:"spritesheets/levels.json"},
            {id:"largeSS", src:"spritesheets/largeDiamonds.json"},
            {id:"smallSS", src:"spritesheets/smallDiamonds.json"},
            {id:"lefi", src:"spritesheets/lefi.json"},
            {id:"enemy", src:"spritesheets/enemies.json"},
            {id:"cloudsplatform", src:"spritesheets/skyer.json"},
            {id:"levelSplashButtons", src:"spritesheets/level_splash.json"},
            {id:"flyingEnemiesSheet", src:"spritesheets/enemiesFlying.json"},
            "spritesheets/enemiesFlying_02.png",
            "spritesheets/enemies_01.png",
            "spritesheets/big_diamonds.png",
            "spritesheets/character_spritesheet.png",
            "img/diamondForCounter.png",
            "spritesheets/small_diamonds.png","spritesheets/skyer.png",
            "img/background_long.png", "img/foreground_long.png","img/background_long_02.png",
            "img/foreground_long_02.png","img/startScreen.png", "img/level_complete_bg.png", "img/splashScreen.png",
            "img/infobox.png",
            "img/bg_01.png","img/bg_02.png","img/bg_03.png","img/bg_04.png",
            "img/fg_01.png","img/fg_02.png","img/fg_03.png","img/fg_04.png",
            "Video/intro.mp4", "Video/scene_02.mp4",
            "Video/intro_lefi.mp4","Video/intro_lvl_2.mp4","Video/intro_lvl_3.mp4","Video/intro_lvl_4.mp4","Video/outr_lefi.mp4",
            "musik/likantropika_-_in_the_woods.mp3", {id:"pling", src:"sound/pling4.wav"}, {id:"earthquake", src:"musik/earthquake.wav"},
            {id:"gameOver", src:"sound/when_you_die.wav"}, {id:"levelComplete", src:"sound/levelComplete.wav"}
        ])
    },

    //progress funktion der indeholder matematikken bag loading bar. Den skal gå fra 0 til 100.
    progress: function(e){
        this.loadText.text = Math.round(e.progress*100)+"%";

        //ticker funktion er ikke kaldt endnu, derfor er vi nødt til manuelt at opdatere stage for at kunne se nogle ændringer
        projekt.stage.update();
    }

}