
var collision = {

    //der laves en hitTest som modtager to parametre, som er de to objekter som skal tjekkes om rammer hinanden
    hitTest:function(rect1,rect2){
        if ( rect1.x >= rect2.x + rect2.width
            || rect1.x + rect1.width <= rect2.x
            || rect1.y >= rect2.y + rect2.height
            || rect1.y + rect1.height <= rect2.y )
        {
            return false;
        }
        return true;
    },

    //der laves en modificeret udgave af hitTest, som tester for om lefis fødder rammer en platform/skys overflade
    onPlatform:function(rect1,rect2){
        if ( rect1.x+rect1.width < rect2.x || rect2.x+rect2.width < rect1.x ||
                 Math.abs(rect1.y+rect1.height - rect2.y) > 10
            )
        {
            // rammer objekterne ikke hinanden på den givne overflade, så befinder lefi sig ikke på en sky
            if(projekt.onCloud){
                projekt.onCloud = false;
                projekt.jumping = true;
            }
            return false;
        }

        //hvis lefi rammer skyens overflade så befinder han sig på en sky
        projekt.jumping = false;
        projekt.onCloud = true;
        return true;
    },

    //der tjekkes om lefi rammer en diamant
    checkCollect: function(){

        //hvert tick loopes der igennem diamant arrayet for at finde ud af om lefi rammer én af dem
        for (var i=0; i<projekt.diamondArray.length; i++){

            //rammer lefi den aktuelle diamant i arrayet?
            if(this.hitTest(projekt.lefi, projekt.diamondArray[i])){

                //hvis han rammer, så fjern diamanten fra stage
                projekt.stage.removeChild(projekt.diamondArray[i]);

                //og læg værdien af den pågældende diamant til ens score
                projekt.points+=projekt.diamondArray[i].value;


                //indsæt lyd hver gang lefi rammer diamant
                if(projekt.musicPlaying=="notMute"){
                    createjs.Sound.play('pling');
                }
                //fjern diamant fra array - rydder op
                projekt.diamondArray.splice(i, 1);

                //opdater teksten der tæller hvor point du har
                projekt.diamondCounter.text=projekt.points;

            }
        }

        //hver tick tjekkes der for om lefi rammer en fjende
        for (var j=0; j<projekt.enemyArray.length; j++){

            //hvis den pågældende fjende ikke allerede har taget en diamant og lefi rammer ham
            //alle fjender har fået egenskaben hasDiamond, for at undgå at de kunne tage diamanter fra lefi flere gange, da lefi passerer dem og derfor rammer dem mange gange da der tjekkes hvert tick
            if(projekt.enemyArray[j].hasDiamond==false && this.hitTest(projekt.lefi, projekt.enemyArray[j])){

                //fjenden har taget diamanter fra lefi én gang nu og kan derfor ikke tage flere
                projekt.enemyArray[j].hasDiamond=true;

                //alle fjender har fået egenskaben damage som fortæller hvor mange diamanter de stjæler fra lefi. Dette tal trækkes fra ens score
                projekt.points-=projekt.enemyArray[j].damage;

                //funktion der laver en animation af at diamanterne falder væk fra lefi
                projekt.throwDiamonds();

                //opdater teksten der tæller hvor point du har
                projekt.diamondCounter.text=projekt.points;

                //hvis ens score bliver lig med 0 eller mindre, så er spillet slut
                if(projekt.points <= 0){
                    projekt.gameOver();
                }
            }
        }

        //der loopes igennem de flyvende fjender på samme måde som de normale fjender
        for (var f=0; f<projekt.flyingEnemyArray.length; f++){
            if(projekt.flyingEnemyArray[f].hasDiamond==false && this.hitTest(projekt.lefi, projekt.flyingEnemyArray[f])){
                projekt.flyingEnemyArray[f].hasDiamond=true;

                projekt.points-=projekt.flyingEnemyArray[f].damage;

                projekt.throwDiamonds();

                projekt.diamondCounter.text=projekt.points;
                if(projekt.points <= 0){
                    projekt.gameOver();
                }
            }
        }

        //der tjekkes om lefi er på skyerne
        for (var m=0; m<projekt.cloudsArray.length; m++){
            if(this.onPlatform(projekt.lefi, projekt.cloudsArray[m])){

                //hvis lefi er på platform, så skal hans y værdi være ligmed skyens y værdi minus hans egen højde - således vil han stå på skyen
                projekt.lefi.y=projekt.cloudsArray[m].y - projekt.lefi.height;

                //hvis ikke lefi animation er løb, så skal den være løb
                if(projekt.lefi.currentAnimation!='run'){
                    projekt.lefi.gotoAndPlay("run");
                }
                break;
            }
        }

    }
};
