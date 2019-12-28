
//opsætter controls - her mellemrums tasten
var controls = {

    //der laves en variabel for mellemrumstasten som indeholder om der trykkes på den eller ej
    spacebarDown: false,


    initialize: function () {

        //når en tast slippes, kaldes funktionen keyUp
        window.onkeyup = this.keyUp;

        //når en tast holdes nede, kaldes funktionen keyDown
        window.onkeydown = this.keyDown;
    },

    //når mellemrumstasten slippes er variablen false, altså trykkes der ikke længere på tasten
    keyUp: function (e) {
        switch(e.keyCode){
            case 32:
                controls.spacebarDown=false;
                break;
        }
    },

    //når mellemrumstasten holdes nede er variablen true, altså trykkes der på tasten
    keyDown: function (e) {
        switch(e.keyCode){
            case 32:
                controls.spacebarDown=true;
                break;
        }
    }

}






