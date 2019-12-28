var objekter = {

    getLefi:function(){

        //lefi bliver lavet ud fra et spritesheet
        var lefiSpriteSheet = new createjs.SpriteSheet(preloader.queue.getResult("lefi"));

        //lefi skal pr default løbe hele tiden
        var t = new createjs.Sprite(lefiSpriteSheet, "run");

        // animation bliver den hvor han løber
        t.gotoAndPlay("run");

        //lefi står stille på canvas og får derfor defineret x og y værdi
        t.y=413;
        t.x=50;

        //lefi får width og height så vi kan hitTeste på ham senere
        t.width=70;
        t.height=128;

        //den måde lefi kan bevæge sig på
        t.move=function(){

            //hvis mellemrumstasten er trykket ned og lefi ikke allerede hopper
            if(controls.spacebarDown && !projekt.jumping) {
                //så hopper lefi
                projekt.jumping = true;
                //så højt lefi kan hoppe
                projekt.jumpPower = 25;
                //lefi får animation når han hopper, så det ligner han hopper
                this.gotoAndPlay("jump");
            }

            if(projekt.jumping) {

                //hvis lefi hopper sættes hans y værdi til at være ligmed hans højde minus hvor højt han kan hoppe, men han tynges af gravity som trækker hans hop ned ad samtidig, dette giver et smooth hop
                this.y = this.y - projekt.jumpPower + projekt.gravity;
                //der trækkes 1 fra lefis jumpPower for at få ham til at bevæge sig på y-aksen
                projekt.jumpPower--;
            }

            //hvis lefis y værdi overstiger eller bliver 400
            if(this.y>=400) {

                //så skal han ikke længere hoppe - han er nu tilbage på jorden
                projekt.jumping = false;
                //hans yværdi stilles tilbage til udgangspunktet
                this.y = 413;

                //sætter lefi animation til at løbe, hvis den er alt andet end at løbe
                if (this.currentAnimation != 'run') {
                    this.gotoAndPlay("run");
                }
            }

        };

        return t;
    }
};

