var ticker = {

    //der sættes en ticker som tæller 60 frames pr sekund
    //ved hvert tick skal tock funktionen kaldes
    start: function(){
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.tock);
    },

    tock: function(e){

        //hvis spillet er igang
        if(projekt.gameRunning){

            //kald all de funktioner som får ting til at bevæge sig (det bruger vi nemlig tickeren til)
            projekt.lefi.move();

            projekt.moveBackgrounds();
            projekt.moveDiamonds();
            projekt.moveForegrounds();
            projekt.moveEnemies();
            projekt.moveFlyingEnemies();
            projekt.moveClouds();
            collision.checkCollect();
            projekt.dist++; //vi har selv lavet en variabel som holder styr på hvor langt vi er kommet i levelet
            projekt.quakeLvl4();

        }

        //når levelets dist bliver større end det pågældende levels distance egenskab og så længe levelets dist er mindre end det pågældende levels distance + 1700
        //altså når level stopper
        if(projekt.dist > projekt.distance && projekt.dist < projekt.distance + 1700){
            //så skal lefi løbe ud af skærmen, som det eneste der bevæger sig på canvas
            //vi plusser med 1700 for at være sikker på lefi er kommet helt udenfor canvas inden han stopper
            projekt.moveLefiOut();
        }

        //ved hvert tick opdateres stage
        projekt.stage.update(e);
    }
};