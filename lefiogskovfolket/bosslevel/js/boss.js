
var stage, preLoadText, currentBossLevel=-1;
var lefi, lefiSpriteSheet;
var disableHitDetection=false;
var bossEnemy;
var cloudsArray=[], json;
var moveRight=false, moveLeft=false, jumpUp=false, jumpPower=0, gravity=6, jumping=false, movingLefi=false;
var infoScreen, welcomeScreen;
var gameRunning=false;
var onCloud = false;
var rDiamond = null;
var bossLife=null, lefiLife=null, lefiLife2=null, lefiLife3=null;
var bgMusic=null, musicPlaying="notMute";
var bossHits=0;

function init(){

    stage = new createjs.Stage("bossCanvas");

    var bg = new createjs.Bitmap("img/bg_04.png");

    stage.addChild(bg);

    preload();
};

function preload(){
    preLoadText = new createjs.Text("Loading", "30px Verdana", "#FFF");
    preLoadText.textBaseline="middle";
    preLoadText.textAlign="center";
    preLoadText.x=stage.canvas.width/2;
    preLoadText.y=stage.canvas.height/2;
    stage.addChild(preLoadText);

    queue = new createjs.LoadQueue(true);
    queue.installPlugin(createjs.Sound);
    queue.on("progress", progress, this);
    queue.on("complete", gameLoaded, this);

    queue.loadManifest(
        [
            "img/bg_04.png","img/bossEnemy.png",
            "img/boss_splash.png","img/splashScreen.png",
            {id:"lefiSS", src:"spritesheets/lefi.json"},
            {id:"bossJSON", src:"spritesheets/bossLevel.json"},
            {id:"cloudsplatform", src:"spritesheets/skyer.json"},
            {id:"levelSplashButtons", src:"spritesheets/level_splash.json"},
            "musik/likantropika_-_in_the_woods.mp3","sound/pling1.wav",
            "sound/pling2.wav","sound/pling3.wav","sound/pling4.wav",
            "sound/pling5.wav", "sound/growl.wav", "sound/growl2.wav", "sound/growl3.wav", "sound/growl4.wav","sound/when_you_die.wav",
            "video/outr_lefi.mp4"
        ]
    );
};

function progress(e){
    //tilføjer en loader visuelt
    var percent = Math.round(e.progress*100);
    preLoadText.text="Loading... "+percent+"%";
    stage.update();
};

function gameLoaded(){
    //fjerner loaderen
    stage.removeChild(preLoadText);

    showInfoScreen();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", tock);

};

function tock(e){
    if(gameRunning){
        lefi.moveLefi();
        checkOnPlatform();
        checkHitBoss();
        moveBossEnemy();
        checkCollectDiamond();
    }
    stage.update(e);
};

function showInfoScreen(){
    infoScreen = new createjs.Container();

    bgMusic = createjs.Sound.play("musik/likantropika_-_in_the_woods.mp3");

    welcomeScreen = new createjs.Bitmap("img/boss_splash.png");
    welcomeScreen.x=150;

    var startScreenButtons = new createjs.SpriteSheet(queue.getResult("levelSplashButtons"));

    var playBtn = new createjs.Sprite(startScreenButtons, "play");
    playBtn.x = 630;
    playBtn.y = 260;

    var musicBtn = new createjs.Sprite(startScreenButtons, "musicOn");
    musicBtn.x=580;
    musicBtn.y=325;

    infoScreen.addChild(welcomeScreen, playBtn, musicBtn);

    stage.addChild(infoScreen);

    playBtn.on("click", function(){
        bgMusic.stop();
        startLevel();
    });

    musicBtn.on("click", function(){
        switch(musicPlaying){
            case "notMute":
                musicBtn.gotoAndStop("musicOff");
                musicPlaying="mute";
                bgMusic.stop();
                break;
            case "mute":
                musicBtn.gotoAndStop("musicOn");
                musicPlaying="notMute";
                bgMusic.play();
                break;
        }
    });

};

function startLevel(){
    stage.removeAllChildren();
    bossHits=0;
    if(musicPlaying==="notMute"){
        bgMusic = createjs.Sound.play("musik/likantropika_-_in_the_woods.mp3");
    } else {
        bgMusic = createjs.Sound.play("musik/likantropika_-_in_the_woods.mp3");
        bgMusic.stop();
    }

    currentBossLevel++;

    var bg = new createjs.Bitmap("img/bg_04.png");

    stage.addChild(bg);

    getLefi();
    window.onkeydown=lefi.move;
    window.onkeyup=lefi.noMove;

    getClouds();

    getBoss();

    addRandomDiamond();

    bossLife = new createjs.Text("Draven: "+bossEnemy.life, "26px Verdana", "#FFF");
    bossLife.textAlign="right";
    bossLife.x = stage.canvas.width - 15;

    lefiLife = new createjs.Bitmap("img/diamondRed.png");
    lefiLife.x = 15;
    lefiLife2 = new createjs.Bitmap("img/diamondRed.png");
    lefiLife2.x = 50;
    lefiLife3 = new createjs.Bitmap("img/diamondRed.png");
    lefiLife3.x = 85;

    stage.addChild(bossLife, lefiLife, lefiLife2, lefiLife3);

    gameRunning=true;




};

function addRandomDiamond(){

    //tjekker om der allerede er en diamant på canvas
    var index = stage.getChildIndex(rDiamond);

    //hvis index er ligmed -1 betyder det at der ikke er nogen diamant i arrayet/på canvas. Derfor kan vi roligt tilføje en ny
    if(index==-1){

    var diamondArray = ['diamondBlue.png', 'diamondRed.png'];

    //vi laver en random variabel til at vælge en random diamant/billede fra arrayet
    var r = Math.floor(Math.random()*2);

    //vi laver også en random variabel til at vælge en random position for diamanterne i arrayet - vi bruger r2 i switch senere
    var r2 = Math.floor(Math.random()*2);

    rDiamond = new createjs.Bitmap("img/"+diamondArray[r]);
    rDiamond.width=30;
    rDiamond.height=30;

    //den random variabel bruger vi til at vælge en random position for diamanterne. De kan variere mellem 2 positioner (på skyerne).
    switch (r2){
        case 0:
            rDiamond.x=600;
            rDiamond.y=160;
            break;
        case 1:
            rDiamond.x=320;
            rDiamond.y=300;
            break;
    }
        stage.addChild(rDiamond)
    }

};

function getLefi(){
    lefiSpriteSheet = new createjs.SpriteSheet(queue.getResult("lefiSS"));
    lefi = new createjs.Sprite(lefiSpriteSheet, "stand");

    lefi.x=50;
    lefi.y=420;

    lefi.width=79;
    lefi.height=128;

    lefi.life=3;

    lefi.move = function(e){
        if(e.keyCode==37){
            moveLeft=true;
        }
        if(e.keyCode==38){
            jumpUp=true;
        }
        if(e.keyCode==39){
            moveRight=true;
        }
    };

    lefi.noMove = function(e){
        if(e.keyCode==37){
            moveLeft=false;
        }
        if(e.keyCode==38){
            jumpUp=false;
        }
        if(e.keyCode==39){
            moveRight=false;
        }
    };

    lefi.moveLefi = function(){
        if(moveRight==true){
            if(lefi.x>=stage.canvas.width-lefi.width-5){
                lefi.x=stage.canvas.width-lefi.width-5;
                lefi.gotoAndStop("stand");
            } else {

                if(lefi.currentAnimation!="run"){
                    //lefi vil nogen gange falde gennem skyen, når han kommer højt oppe fra, fordi hans y-værdi (grundet hans jump power) ikke nødvendigvis vil ramme nøjagtigt den y værdi der tjekkes for ved hittest af platform og lefi
                    lefi.gotoAndPlay("run");
                }

                lefi.x+=7;
            }
        }
        if(moveLeft==true){
            if(lefi.x<=5){
                lefi.x=5;
                lefi.gotoAndStop("stand");
            } else {
                if(lefi.currentAnimation!="runLeft"){
                    lefi.gotoAndPlay("runLeft");
                }

                lefi.x-=7;

            }
        }
        if(jumpUp && !jumping){
            jumping = true;
            jumpPower = 25;
        }
        if(jumping) {
            lefi.gotoAndPlay("jump");
            this.y = this.y - jumpPower + gravity;
            jumpPower--;
        }

        if(this.y>=420) {
            jumping = false;
            this.y = 420;
        }

        if(!jumping && !moveRight && !moveLeft){
            lefi.gotoAndPlay("stand");
        }
    };

    stage.addChild(lefi);

};

function getBoss(){
    bossEnemy = new createjs.Bitmap("img/bossEnemy.png");
    bossEnemy.x=750;
    bossEnemy.y=260;



    bossEnemy.width=125;
    bossEnemy.height=300;

    bossEnemy.regX=50;
    //bossEnemy.regY = bossEnemy.height/2;

    bossEnemy.life=100;
    bossEnemy.moving=false;

    //boss skal først bevæge sig efter x-antal sekunder
    setInterval(startBossEnemy, 5000);

    stage.addChild(bossEnemy);
};

function startBossEnemy(){
    //bossens hastighed på x og y aksen, boss er i bevægelse
    if(bossEnemy.moving==false){
        if(musicPlaying==="notMute"){
        var growlArray = ['growl.wav', 'growl2.wav','growl3.wav','growl4.wav'];//Array med growlLyde i
        var r = Math.floor(Math.random()*4);//laver et random tal mellem 0 og 3
        createjs.Sound.play("sound/"+growlArray[r]); //afspiller en random lyd fra growlArrayet-indekset
        }
    bossEnemy.xModifier=-5;
    bossEnemy.yModifier=0;
    bossEnemy.pattern=Math.floor(Math.random()*4);
        bossEnemy.moving=true;

    }
};

function moveBossEnemy(){

    //hvis bossen er i bevægelse, så skal han bevæge sig med x hastighed på y og x aksen (han bevæger sig fordi vi kalder denne funktion i tickeren)
    if(bossEnemy.moving){

        //vi sætter bossens x og y værdier lig med variablerne for x og y, som vi ændrer på for at bevæge ham
        bossEnemy.x+=bossEnemy.xModifier;
        bossEnemy.y+=bossEnemy.yModifier;

        switch (bossEnemy.pattern){
            case 0:

                if(bossEnemy.x<100){
                    //moving up, right - når bossen når bestemt punkt på x-aksen
                    bossEnemy.xModifier=4;
                    bossEnemy.yModifier=-4;
                }
                if(bossEnemy.y<1){
                    //moving down, right - når bossen når et bestemt punkt på y-aksen
                    bossEnemy.xModifier=4;
                    bossEnemy.yModifier=4;
                }
                if(bossEnemy.y>260 && bossEnemy.xModifier>0 && bossEnemy.yModifier>0){
                    //back at starting position, stop him
                    bossEnemy.moving=false;

                    //der tilføjes en ny diamant, hver gang bossen er tilbage til startposition
                    addRandomDiamond();

                }
                break;

            case 1:

                if(bossEnemy.x<300){
                    //moving up, right - når bossen når bestemt punkt på x-aksen
                    bossEnemy.xModifier=4;
                    bossEnemy.yModifier=-4;
                }
                if(bossEnemy.y<50){
                    //moving down, right - når bossen når et bestemt punkt på y-aksen
                    bossEnemy.xModifier=4;
                    bossEnemy.yModifier=4;
                }
                if(bossEnemy.y>260 && bossEnemy.xModifier>0 && bossEnemy.yModifier>0){
                    //back at starting position, stop him
                    bossEnemy.moving=false;

                    //der tilføjes en ny diamant, hver gang bossen er tilbage til startposition
                    addRandomDiamond();

                }
                break;

            case 2:

                if(bossEnemy.x<400){
                    //moving up, right - når bossen når bestemt punkt på x-aksen
                    bossEnemy.xModifier=0;
                    bossEnemy.yModifier=-4;
                }
                if(bossEnemy.y<1){
                    //moving down, right - når bossen når et bestemt punkt på y-aksen
                    bossEnemy.xModifier=4;
                    bossEnemy.yModifier=4;
                }
                if(bossEnemy.y>260 && bossEnemy.xModifier>0 && bossEnemy.yModifier>0){
                    //back at starting position, stop him
                    bossEnemy.moving=false;

                    //der tilføjes en ny diamant, hver gang bossen er tilbage til startposition
                    addRandomDiamond();

                }

                break;

            case 3:

                //hvis boss kommer næsten helt til venstre af canvas
                if(bossEnemy.x<50){

                    // så ryk bos 4 op og 2 til højre, skråt op
                    bossEnemy.xModifier=2;
                    bossEnemy.yModifier=-4;
                }

                //når boss har hoppet færdig, skal han ned igen
                if(bossEnemy.yModifier==-4 && bossEnemy.y<5) {

                    //sætter y til positiv for at boss kommer ned igen
                    bossEnemy.xModifier = 4;
                    bossEnemy.yModifier = 4;
                }

                //hvis if sætning ovenover ikke er sand, så er boss igang med nr. 2 hop - samme princip
                if(bossEnemy.yModifier==4 && bossEnemy.y>255){
                    bossEnemy.xModifier=1;
                    bossEnemy.yModifier=-3;
                }
                if(bossEnemy.yModifier==-3 && bossEnemy.y<5){
                    bossEnemy.xModifier = 3;
                    bossEnemy.yModifier = 3;
                }

                //når bos er tilbage til startposition, skal han stoppe med at bevæge sig
                if(bossEnemy.y>260 && bossEnemy.xModifier>0 && bossEnemy.yModifier>0){
                    //back at starting position, stop him
                    bossEnemy.moving=false;

                    //der tilføjes en ny diamant, hver gang bossen er tilbage til startposition
                    addRandomDiamond();

                }

                break;
        }







    }
};

function getClouds(){

    json = queue.getResult("bossJSON");

    var clouds=json.bossLevel[currentBossLevel].clouds;
    var cloudSS = new createjs.SpriteSheet(queue.getResult("cloudsplatform"));
    for(var m=0; m<clouds.length; m++){
        var c;

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

        }
        c.x=clouds[m].x;
        c.y=clouds[m].y;
        cloudsArray.push(c);
        stage.addChild(c);
    };
};

function onPlatform(rect1,rect2){
    if ( rect1.x+rect1.width < rect2.x || rect2.x+rect2.width < rect1.x ||
        Math.abs(rect1.y+rect1.height - rect2.y) > 10
    )
    {
        if(onCloud){
            onCloud = false;
            jumping = true;
        }
        return false;
    }
    jumping = false;
    onCloud = true;
    return true;
};

function hit(rect1, rect2){
    if ( rect1.x >= rect2.x + rect2.width
        || rect1.x + rect1.width <= rect2.x
        || rect1.y >= rect2.y + rect2.height
        || rect1.y + rect1.height <= rect2.y )
    {
        return false;
    }
    return true;
};

function checkCollectDiamond(){

    if(bossEnemy.life<=0){
        gameRunning=false;
        showWinnerVideo();
    } else {
    //vi tjekker om diamanten findes, før end vi kan køre hitTest på den og lefi, ellers kan den ikke finde ud af det
    if(rDiamond!=null && hit(lefi,rDiamond)){

        createjs.Tween.get(rDiamond).to({x: bossEnemy.x + 30, y:bossEnemy.y + 20, rotation: 360, alpha:0}, 300).call(
            function(){
                // tween callback function fyrede af mange gange, hvilket gjorde at bossen mistede rigtigt meget liv ved et hit. Selvom det virker unødvendigt at tjekke om diamanten findes igen, løste dette dog problemet.
                if(rDiamond!=null){
                    if(musicPlaying==="notMute"){
                        createjs.Sound.play("sound/pling4.wav");
                    };
                    stage.removeChild(rDiamond)
                    rDiamond=null
                    bossEnemy.life-=10
                    bossLife.text = "Draven: "+bossEnemy.life;
                }
            }
        );






    }
    }
};

function showWinnerVideo(){

    stage.removeAllChildren();
    bgMusic.stop();

    var introVideo = document.createElement("video");
    introVideo.src = "video/outr_lefi.mp4";
    introVideo.autoplay = true;

    var video = new createjs.Bitmap(introVideo);

    stage.addChild(video);

};

function checkOnPlatform() {
    for (var m=0; m<cloudsArray.length; m++){
        if(onPlatform(lefi, cloudsArray[m])){
            lefi.y=cloudsArray[m].y - lefi.height;
            break;
        }
    }
};

function checkHitBoss(){
    if(lefi.life==0){
        gameRunning=false;
        lefi.gotoAndStop("stand");
        gameOver();
    }
    if(disableHitDetection==false){ //Hvis disableHitDetection er false skal der tjekkes for hit
        if(hit(lefi, bossEnemy)){

                disableHitDetection=true;
                lefi.life--;
                lefiLife.text="Lefi: "+lefi.life;
                lefi.x=50;
                lefi.y=420;
                bossHits++;
                if(bossHits==1){
                    stage.removeChild(lefiLife3);
                } else if(bossHits==2){
                    stage.removeChild(lefiLife2);
                } else if(bossHits==3) {
                    stage.removeChild(lefiLife);
                }
                setTimeout(function(){disableHitDetection=false;},3000)

        };
    }
};

function gameOver(){

    var gameOverBox = new createjs.Container();
    var gameOverBg = new createjs.Bitmap("img/splashScreen.png");

    gameOverBox.x = 1000/2-664/2;

    var gameOverButtons = new createjs.SpriteSheet(queue.getResult("levelSplashButtons"));

    var retryBtn = new createjs.Sprite(gameOverButtons, "retryBig");
    retryBtn.x = 450;
    retryBtn.y = 275;

    var xBtn = new createjs.Sprite(gameOverButtons, "exit");
    xBtn.x = 400;
    xBtn.y = 350;

    gameOverBox.addChild(gameOverBg, retryBtn, xBtn);

    stage.addChild(gameOverBox);

    retryBtn.on("click", function(){
        currentBossLevel--;
        bgMusic.stop();
        startLevel();
    });

    xBtn.on("click", function(){
        location.reload();
    });


    if(musicPlaying=="notMute"){
        createjs.Sound.play("sound/when_you_die.wav");
    };
};