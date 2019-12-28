var projekt = {
    currentLevel:-1,
    stage: new createjs.Stage("projektCanvas"),
    diamondArray:[],
    enemyArray:[],
    cloudsArray:[],
    flyingEnemyArray:[],
    bg:[],
    fg:[],
    dist:null,
    points:0,
    jumping:false,
    jumpPower: 0,
    gravity: 6,
    onCloud: false,
    gameRunning:false,
    distance:null,
    diamondAmount:null,
    diamondCounter:null,
    bgMusic:null,
    quakeSound:null,
    musicPlaying:"notMute",
    lastLevel:null,
    dir:"up", //variabel til at lave jordskælv til level 4

    init: function(){
        preloader.load();
    },

    setupGame: function(){
        this.startScreen();
        ticker.start();
    },


    startScreen:function(){
        this.stage.removeAllChildren();
        var startBox = new createjs.Container();
        var startBg = new createjs.Bitmap("img/startScreen.png");

        var startScreenButtons = new createjs.SpriteSheet(preloader.queue.getResult("levelSplashButtons"));
        console.log(startScreenButtons);

        //baggrundsmusik + lydstyrke
        projekt.bgMusic = createjs.Sound.play("musik/likantropika_-_in_the_woods.mp3");
        projekt.bgMusic.volume=0.4;

        //play knap
        var playBtn = new createjs.Sprite(startScreenButtons, "play");
        playBtn.x = 830;
        playBtn.y = 410;

        //how to play knap
        var helpBtn = new createjs.Sprite(startScreenButtons, "help");
        helpBtn.x = 620;
        helpBtn.y = 480;

        //mute knap
        var musicBtn = new createjs.Sprite(startScreenButtons, "musicOn");
        musicBtn.x=220;
        musicBtn.y=95;

        // how to play knap - info boks
        var infoBox = new createjs.Bitmap("img/infobox.png");
        infoBox.x=380;
        infoBox.y=320;
        infoBox.visible=false;

        //alle knapperne tilføjes til en container for at holde styr på dem
        startBox.addChild(startBg, playBtn, infoBox ,helpBtn, musicBtn);

        //container tilføjes til stage
        this.stage.addChild(startBox);

        //når der klikkes på play knap, stoppes baggrundsmusikken og funktionen showCutScene viser introvideo til første level
        playBtn.on("click", function(){
            projekt.bgMusic.stop();
            projekt.showCutScene("Video/intro_lefi.mp4");
        });

        //når der klikkes på muteknap, skiftes der mellem to sprites, som viser om lyden er muted eller ej
        musicBtn.on("click", function(){
            switch(projekt.musicPlaying){
                case "notMute":
                    musicBtn.gotoAndStop("musicOff");
                    projekt.musicPlaying="mute";
                    projekt.bgMusic.stop();
                    break;
                case "mute":
                    musicBtn.gotoAndStop("musicOn");
                    projekt.musicPlaying="notMute";
                    projekt.bgMusic.play();
                    break;
            }
        });

        //når der klikkes på how to play knappen, dukker infoboksen frem på canvas. Klikkes der igen forsvinder den. Infoboksen er fra start af sat til ikke at være synlig
        helpBtn.on("click", function(){
            if(infoBox.visible){
                infoBox.visible = false;
            } else{
                infoBox.visible = true;
            }
        });

    },

    //funktion der afspiller introvideoer til de forskellige levels
    showCutScene:function(path){
        this.bgMusic=null;
        //sætter rotation af stage til 0 for at være sikker på stage ikke har en uheldig drejning/grad (kunne ske efter level 4, som udnytter rotation af stage)
        this.stage.rotation=0;
        var introVideo = document.createElement("video");
        introVideo.src = path;
        introVideo.autoplay = true;

        var video = new createjs.Bitmap(introVideo);

        this.stage.addChild(video);

        //der tilføjes en tekst ovenpå videoen som forklarer hvordan man skipper videoen
        var skipButton = new createjs.Text("Click anywhere to skip",  "26px Verdana", " #FFF");
        this.stage.addChild(skipButton);

        //når der klikkes på videoen, stopper videoen med at afspille og næste level sættes igang
        video.on("click", function(){
            introVideo.pause();
            projekt.nextLevel();
        });

        //hvis ikke der klikkes på video for at skippe, så kaldes næste level så snart videon er slut
        introVideo.onended = function(){
            projekt.nextLevel();
        };

    },

    //kalder næste level - nulstiller alle variabler, så man starter på ny med point, baggrund, fjender og alt
    nextLevel:function(){
        this.dist=null;
        this.points=0;
        this.gameRunning=false;
        this.stage.removeAllChildren();
        this.diamondArray=[];
        this.cloudsArray=[];
        this.enemyArray=[];
        this.bg=[];
        this.fg=[];
        this.bgMusic=null;
        


        //der tilføjes baggrundsmusik til level, hvis muteknappen ikke er klikket på ved startScreen
        if(projekt.musicPlaying=="notMute"){
            projekt.bgMusic = createjs.Sound.play("musik/likantropika_-_in_the_woods.mp3");
            projekt.bgMusic.volume=0.4;
        } else {
            projekt.bgMusic.volume=0; //volumen sættes til 0 = mute
        }

        //tager det forrige level og tæller en op for at komme til næste level i levels.json
        this.currentLevel++;

        //vi laver en variabel som kan hente egenskaber/objekter fra json filen over levels
        var json = preloader.queue.getResult("lvlJSON");

        this.lastLevel = json.levels[projekt.currentLevel].levelNumber;

        //hvis det er level 4
        if(this.lastLevel === 4) {

            this.quakeSound = createjs.Sound.play('earthquake');
            this.quakeSound.volume=0.4;

        };


        //den distance man skal "løbe" før levelet er slut
        this.distance=json.levels[this.currentLevel].distanceRequired;

        //levels baggrund
        var backIMG = json.levels[this.currentLevel].backgroundIMG;

        //det nye baggrundsbillede puttes ind i arrayet/loopet af baggrundene
        var backgroundBitmap = new createjs.Bitmap(backIMG);
        //baggrund 1 sættes helt til venstre kant af canvas
        backgroundBitmap.x=0;
        this.bg.push(backgroundBitmap)

        var backgroundBitmap = new createjs.Bitmap(backIMG);
        this.bg.push(backgroundBitmap);

        //baggrund 2 sættes i forlængelse af baggrund 1
        backgroundBitmap.x=4000

        this.stage.addChild(this.bg[0], this.bg[1]);

        //objektet lefi hentes ind og puttes i en variabel
        this.lefi = objekter.getLefi();

        //lefi tilføjes til stage
        this.stage.addChild(this.lefi);

        //controls aktiveres
        controls.initialize();

        //diamantarrayet fra levels.json hentes ind og gemmes i en variabel
        var diamonds=json.levels[this.currentLevel].diamonds;

        //der hentes både store og små diamanter ind som spritesheets
        var bigSS = new createjs.SpriteSheet(preloader.queue.getResult("largeSS"));
        var smallSS = new createjs.SpriteSheet(preloader.queue.getResult("smallSS"));

        //der laves et for-loop for at kører diamantarrayet igennem og tjekke for små og store diamanter, således at de kan få den rigtige sprite
        for(var i=0; i<diamonds.length; i++){
            var d;

            //i levels.json har diamanterne fået en egenskab kaldet type. Der laves et sprite tilsvarende typen
            // vi sætter højde og bredde på diamanterne for senere at kunne lave hitTest på dem
            if(diamonds[i].type=='small'){
                d=new createjs.Sprite(smallSS, diamonds[i].sprite);
                d.width=33;
                d.height=33;
                d.value=1;
            } else {
                d=new createjs.Sprite(bigSS, diamonds[i].sprite);
                d.width=130;
                d.height=100;
                d.value=3;
            }

            //diamanternes x og y værdi sættes tilsvarende deres x og y værdi i levels.json
            d.x=diamonds[i].x;
            d.y=diamonds[i].y;

            //Diamanterne tilføjes til et array
            this.diamondArray.push(d);

            //diamanterne tilføes til stage
            this.stage.addChild(d);
        };


        // clouds-arrayet fra levels.json hentes ind og gemmes i en variabel
        var clouds=json.levels[this.currentLevel].clouds;
        var cloudSS = new createjs.SpriteSheet(preloader.queue.getResult("cloudsplatform"));

        //arrayet tjekkes igennem for at finde ud af hvilken sprite de er sat til
        for(var m=0; m<clouds.length; m++){
            var c;

            // der laves en switch statement som tildeler en sprite til de forskellige elementer i arrayet alt efter hvilken sprite de er sat til at skulle have
            // skyerne for en width og en height for at kunne lave HitTest på dem senere
            switch(clouds[m].sprite){
                case 'cloud1':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=207;
                    c.height=59;
                    break;
                case 'cloud2':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=173;
                    c.height=51;
                    break;
                case 'cloud3':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=281;
                    c.height=78;
                    break;
                case 'cloud4':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=281;
                    c.height=79;
                    break;
                case 'darkCloud1':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=206;
                    c.height=58;
                    break;
                case 'darkCloud2':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=173;
                    c.height=51;
                    break;
                case 'darkCloud3':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=281;
                    c.height=78;
                    break;
                case 'darkCloud4':
                    c=new createjs.Sprite(cloudSS, clouds[m].sprite);
                    c.width=281;
                    c.height=79;
                    break;
            }

            //skyernes x og y værdi fra levels.json gemmes i en variabel, så de kan tilføjes arrayet
            c.x=clouds[m].x;
            c.y=clouds[m].y;

            this.cloudsArray.push(c);
            this.stage.addChild(c);
        };

        // enemy-arrayet fra levels.json hentes ind og gemmes i en variabel
        var enemies=json.levels[this.currentLevel].enemies;
        var enemySS = new createjs.SpriteSheet(preloader.queue.getResult("enemy"));

        //via et for-loop tjekkes hvert element i arrayet igennem for hvilken sprite de er tildelt
        for(var j=0; j<enemies.length; j++){
            var e;

            //via switch tildeles en sprite/billede til de rigtige sprite-egenskaber de har fået i levels.json
            //alle enemies tildeles en width og heigth så der kan laves hitTest
            switch(enemies[j].sprite){
                case 'normal':
                    e=new createjs.Sprite(enemySS, enemies[j].sprite);
                    e.width=64;
                    e.height=151;
                    //hver type enemy (forskellige sprites) tildeles endnu en egenskab "damage", som senere bruges til hvor mange diamanter de forskellige fjender skal tage fra lefi
                    e.damage=5;
                    break;
                case 'big':
                    e=new createjs.Sprite(enemySS, enemies[j].sprite);
                    e.width=76;
                    e.height=179;
                    e.damage=7;
                    break;
                case 'smallFat':
                    e=new createjs.Sprite(enemySS, enemies[j].sprite);
                    e.width=65;
                    e.height=82;
                    e.damage=4;
                    break;
                case 'small':
                    e=new createjs.Sprite(enemySS, enemies[j].sprite);
                    e.width=50;
                    e.height=82;
                    e.damage=4;
                    break;
                case 'bigThin':
                    e=new createjs.Sprite(enemySS, enemies[j].sprite);
                    e.width=46;
                    e.height=178;
                    e.damage=7;
                    break;
                case 'tiny':
                    e=new createjs.Sprite(enemySS, enemies[j].sprite);
                    e.width=50;
                    e.height=41;
                    e.damage=3;
                    break;

            }

            e.x=enemies[j].x;
            e.y=enemies[j].y;

            //pr. default har en fjende ikke taget nogen diamanter, derfor sættes denne egenskab til false
            e.hasDiamond=false;

            this.enemyArray.push(e);
            this.stage.addChild(e);
        }

        //der laves på samme måde et array o
            var flyingEnemies=json.levels[this.currentLevel].flyingEnemies;
            var flyingEnemySS = new createjs.SpriteSheet(preloader.queue.getResult("flyingEnemiesSheet"));

            for(var r=0; r<flyingEnemies.length; r++){
                var f;

                //der laves endnu en switch til fremtidige flyvende fjender. Således bliver det lettere at tilføje nye flyvende fjender i senere levels
                switch(flyingEnemies[r].sprite){
                    case 'flying':
                        f=new createjs.Sprite(flyingEnemySS, flyingEnemies[r].sprite);
                        f.width=172;
                        f.height=82;
                        f.damage=3;
                        break;
                }

                f.x=flyingEnemies[r].x;
                f.y=flyingEnemies[r].y;

                //pr. default har de flyvende fjender heller ingen diamanter. Egenskaben sættes derfor til false
                f.hasDiamond=false;

                this.flyingEnemyArray.push(f);
                this.stage.addChild(f);
            }

        //der laves en variabel som henter forgrund fra levels.json.
        var foreIMG = json.levels[this.currentLevel].foregroundIMG;

        //billede 1 tilføjes først til kant
        var foregroundBitmap = new createjs.Bitmap(foreIMG);
        foregroundBitmap.x=0;
        this.fg.push(foregroundBitmap);

        //billede 2 tilføjes i forlængelse af billede 1
        var foregroundBitmap = new createjs.Bitmap(foreIMG);

        //billederne puttes i et array for senere at kunne tilgå dem nemt
        this.fg.push(foregroundBitmap);
        foregroundBitmap.x=4000;
        this.stage.addChild(this.fg[0], this.fg[1]);

        //der laves et display objekt til at vise ens score i øverste venstre hjørne
        //der tilføjes en diamant til teksten
        var displayScore = new createjs.Bitmap("img/diamondForCounter.png");
        displayScore.x=12;
        displayScore.y=18;

        //der tilføjes score i tekst
        this.diamondCounter = new createjs.Text(projekt.points,"50px Courier", "#FFF");
        this.diamondCounter.x=50;
        this.diamondCounter.y=0;

        this.stage.addChild(displayScore, this.diamondCounter);



        //variablen gameRunning sættes til true, for at indikere at spillet er igang. Når spillet skal stoppes, sættes variablen til false
        this.gameRunning=true;
    },

    //der laves en funktion til at bevæge baggrundsbillederne
    moveBackgrounds:function(){
        this.bg[0].x-=5;
        this.bg[1].x-=5;

        //når billede 1 når tilpas langt ud, sættes dens x værdi til at være billede 2's x værdi plus 4000 således at den er i forlængelse af billede 2
        if(this.bg[0].x<=-4000){
            this.bg[0].x=this.bg[1].x+4000
        }

        //det samme gør vi med billede 2, således opnår vi en sammenhængende baggrund i loop
        if(this.bg[1].x<=-4000){
            this.bg[1].x=this.bg[0].x+4000
        }
    },

    //diamant arrayet loopes igennem og der sættes en hastighed som er forskellig fra baggrund og forgrunds hastighed
    moveDiamonds:function(){

        for(var i = 0; i<this.diamondArray.length; i++){
            this.diamondArray[i].x-=6;
        }

    },

    //skyernes hastighed er identitisk med diamanternes hastighed. Skaber rum i spillet
    moveClouds:function(){

        for(var i = 0; i<this.cloudsArray.length; i++){
            this.cloudsArray[i].x-=6;
        }

    },

    //forgrundenes hastighed sæætes forskellige fra baggrund, skyer og diamanter
    moveForegrounds:function(){
        this.fg[0].x-=7;
        this.fg[1].x-=7;

        //forgrundene placeres efter i hinanden for at skabe illusion om et uendeligt landskab. Samme princip som baggrundene
        if(this.fg[0].x<=-4000){
            this.fg[0].x=this.fg[1].x+4000
        }
        if(this.fg[1].x<=-4000){
            this.fg[1].x=this.fg[0].x+4000
        }
    },

    // fjendernes hastighed
    moveEnemies: function(){
        for(var i = 0; i<this.enemyArray.length; i++){
            this.enemyArray[i].x-=8;
        }
    },

    //flyvende fjenders hastighed
    moveFlyingEnemies: function(){
        for(var i = 0; i<this.flyingEnemyArray.length; i++){
            this.flyingEnemyArray[i].x-=8;
        }
    },

    //funktion der kaster diamanter fra lefi når han rammer en fjende / illusion om at de stjæler diamanter fra ham
    throwDiamonds: function(){

        // indsætter diamanter
        diamond1 = new createjs.Bitmap("img/diamondForCounter.png");
        diamond1.width=30;
        diamond1.height=30;
        diamond1.x=150;
        diamond1.y=400;

        diamond2 = new createjs.Bitmap("img/diamondForCounter.png");
        diamond2.width=30;
        diamond2.height=30;
        diamond2.x=200;
        diamond2.y=300;

        this.stage.addChild(diamond1, diamond2);


        //der laves to forskellige tweens på diamanterne så det ligner de bliver kastet væk fra lefi

        createjs.Tween.get(diamond1).to({
                x: projekt.lefi.x + 300,
                y: projekt.lefi.y - 400,
                rotation: 145, alpha: 0
            },
            1000,
            createjs.Ease.cubicOut);

        createjs.Tween.get(diamond2).to({
                x: projekt.lefi.x + 300,
                y: projekt.lefi.y - 300,
                rotation: 145, alpha: 0
            },
            1000,
            createjs.Ease.cubicOut);

    },

    // når et level slutter, skal lefi løbe ud af skærmen
    moveLefiOut: function(){
        //det skal stadig være muligt at styre lefi
        this.lefi.move();

        //lefis hastighed
        this.lefi.x+=10;

        //når lefi når bestemt punkt på x aksen og spillet stadig er kørende, så kaldes funktionen levelComplete og gameRunning variablen sættes til false for at stoppe spillet
        if(this.lefi.x > 1000 && this.gameRunning){
            this.levelComplete();
            this.gameRunning = false;
        }

    },

    //når et level er gennemført, vises en splash screen
    levelComplete: function(){

        //vi laver en variabel som kan hente egenskaber/objekter fra json filen over levels
        var json = preloader.queue.getResult("lvlJSON");
        this.lastLevel = json.levels[projekt.currentLevel].levelNumber;

        //hvis det er level 4
        if(this.lastLevel === 4) {
            this.quakeSound.volume=0;
        };

        //musikken pauses
        this.bgMusic.pause();

        if(projekt.musicPlaying=="notMute"){
            var completeSound = createjs.Sound.play('levelComplete');
            completeSound.volume=0.2;
        }

        //alle grafiske elementer samles i en container for at holde styr på dem
        var levelCompleteBox = new createjs.Container();
        var levelCompleteBg = new createjs.Bitmap("img/level_complete_bg.png");

        //container placeres i midten af canvas
        levelCompleteBox.x = 1000/2-664/2;



        //der laves en variabel som holder styr på det totale antal af diamanter i det gælende level
        this.diamondAmount = json.levels[this.currentLevel].totalDiamonds;

        //der laves en varibel som hodler styr på hvilket level vi er kommet til
        var lvlNum = json.levels[this.currentLevel].levelNumber;

        //der laves en tekst som skriver ens point score ud og sammenligner den med det totale antal af diamanter man kunne have fået
        var pointText = new createjs.Text(this.points + "/" + this.diamondAmount, "30px Comic Sans MS", "#575756");
        pointText.textBaseline="middle";
        pointText.align="center";
        pointText.x=270;
        pointText.y=360;

        //level nr udskrives
        var levelText = new createjs.Text(lvlNum, "35px Comic Sans MS", "#575756");
        levelText.x=283;
        levelText.y=174;

        // der indsættes diamanter på canvas som skal bruges til at vise hvor godt man har klaret det enkelte level
        var lvlButtonsSheet = new createjs.SpriteSheet(preloader.queue.getResult("levelSplashButtons"));
        var diamond1 = new createjs.Sprite(lvlButtonsSheet, "1_diamond");
        diamond1.x=210;
        diamond1.y=240;
        var diamond2 = new createjs.Sprite(lvlButtonsSheet, "2_diamond");
        diamond2.x=290;
        diamond2.y=235;
        var diamond3 = new createjs.Sprite(lvlButtonsSheet, "3_diamond");
        diamond3.x=370;
        diamond3.y=240;
        var miss1 = new createjs.Sprite(lvlButtonsSheet, "1_miss");
        miss1.x=210;
        miss1.y=240;
        var miss2 = new createjs.Sprite(lvlButtonsSheet, "2_miss");
        miss2.x=290;
        miss2.y=235;
        var miss3 = new createjs.Sprite(lvlButtonsSheet, "3_miss");
        miss3.x=370;
        miss3.y=240;

        //næste level knap
        var nextLvlBtn = new createjs.Sprite(lvlButtonsSheet, "next_level");
        nextLvlBtn.x=440;
        nextLvlBtn.y=330;

        var retryBtn = new createjs.Sprite(lvlButtonsSheet, "retry");
        retryBtn.x = 480;
        retryBtn.y = 275;

        levelCompleteBox.addChild(levelCompleteBg, pointText, levelText, nextLvlBtn, retryBtn);

        // der laves en if sætning der holder styr på hvor mange diamanter man har gjort sig fortjent til at få - 1, 2 eller 3.
        // har man samle en tredjedel af de totale får man 1 diamant, 2/3 så får man 2 diamanter, over 2/3 så får man 3 diamanter. 0 så får man 0 diamanter.
        if(this.points < (this.diamondAmount * 0.33) && this.points >= 1){

            levelCompleteBox.addChild(diamond1, miss2, miss3);

        } else if (this.points >= (this.diamondAmount * 0.33) && this.points < (this.diamondAmount * 0.66)){
            levelCompleteBox.addChild(diamond1,diamond2, miss3);

        } else if (this.points >= (this.diamondAmount * 0.66)){
            levelCompleteBox.addChild(diamond1,diamond2, diamond3);
        } else{
            levelCompleteBox.addChild(miss1, miss2, miss3);
        }

        this.stage.addChild(levelCompleteBox);

        retryBtn.on("click", function(){
            projekt.currentLevel--;
            projekt.nextLevel();
        });

        // der tilføjes click event på nxtLvlBtn
        nextLvlBtn.on("click", function(){

        var json = preloader.queue.getResult("lvlJSON");
        this.lastLevel = json.levels[projekt.currentLevel].levelNumber;

        if(this.lastLevel != 4){
            // her hentes resultater fra levels.json
            var json = preloader.queue.getResult("lvlJSON");

            // her hentes videolocation fra levels.json og gemmes i en lokal variabel
            var videoPath = json.levels[projekt.currentLevel].videoLocation;

            //her kaldes showCutScene funktionen, hvori der medsendes et parameter som er stien til levelets video
            projekt.showCutScene(videoPath);
        } else{
            window.location = "bosslevel/index.html";
        }

        });
    },

    // level 4 skal ryste
    quakeLvl4: function(){

        //laver variabel som henter resultater fra levels.json
        var json = preloader.queue.getResult("lvlJSON");

        //laver variabel som indeholder alle levels numre
        this.lastLevel = json.levels[projekt.currentLevel].levelNumber;

        //hvis lastLevel indeholder tallet 4, altså er det level 4
        if(this.lastLevel === 4){



            //Variablen dir holder styr på om canvas er roteret ned eller op.
            //hvis dir/retningen er op
            if(projekt.dir=="up"){
                //så roter stage op 0,1 grad hvert tick
                projekt.stage.rotation+=0.1;

                //når stage når til 1 grad, så skift variablen til down (hvilket vil tricke næste step i funktionen
                if(projekt.stage.rotation>1){
                    projekt.dir="down"
                }
            } else {
                //hvis ikke dir er up, må den være ned. Ergo skal stage roterer 0,1 grad den anden retning
                projekt.stage.rotation-=0.1;
                //lige indtil den rammer -1 grad, så bliver variablen igen up, og sådan fortsætter det til level 4 er gennemført
                if(projekt.stage.rotation<-1){
                    projekt.dir="up"
                }
            }
        }
    },

    // funktion til når man dør i spillet
    gameOver: function (){

        //vi laver en variabel som kan hente egenskaber/objekter fra json filen over levels
        var json = preloader.queue.getResult("lvlJSON");
        this.lastLevel = json.levels[projekt.currentLevel].levelNumber;

        //hvis det er level 4
        if(this.lastLevel === 4) {
            this.quakeSound.volume=0;
        };

        //spillet skal stoppe
        this.gameRunning = false;

        if(projekt.musicPlaying=="notMute"){
            var gameOverSound = createjs.Sound.play('gameOver');
            gameOverSound.volume=0.4;
        }



        //lefis animation stopper
        this.lefi.gotoAndStop();

        //der laves en container til splash screen elementerne
        var gameOverBox = new createjs.Container();
        var gameOverBg = new createjs.Bitmap("img/splashScreen.png");

        //container placeres i midten af canvas
        gameOverBox.x = 1000/2-664/2;

        //der tilføjes knapper
        var gameOverButtons = new createjs.SpriteSheet(preloader.queue.getResult("levelSplashButtons"));

        var retryBtn = new createjs.Sprite(gameOverButtons, "retryBig");
        retryBtn.x = 450;
        retryBtn.y = 275;

        var xBtn = new createjs.Sprite(gameOverButtons, "exit");
        xBtn.x = 400;
        xBtn.y = 350;

        gameOverBox.addChild(gameOverBg, retryBtn, xBtn);

        this.stage.addChild(gameOverBox);

        //når der klikkes på retry knappen, tæller vi en ned i vores variabel som holder styr på hvilket level vi er kommet til og kalder næste level funktionen
        retryBtn.on("click", function(){
            projekt.currentLevel--;
            projekt.nextLevel();
        });

        //når der klikkes på afslut knappen, reloades siden og man sendes derved til startScreen
        xBtn.on("click", function(){
            location.reload();
        });

    }
};




