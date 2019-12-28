$( document ).ready(function() {
    
    (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false; 
    
        $('#antboy-btn').click(function () {

            var url = document.getElementById("antboy-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/antboy_btn_01.png'){
                document.getElementById('antboy-btn-toggle').src = 'img/buttons/antboy_btn_02.png';
            } else{
                document.getElementById('antboy-btn-toggle').src = 'img/buttons/antboy_btn_01.png';
            }
            //vis antboy karakterbaggrund
            $('.char-antboy-bg').removeClass("displayNone");
            //skjul alle andre karakterbaggrunde
            $('.char-dufort-bg, .char-fury-bg, .char-ida-bg, .char-loppen-bg, .char-sidekick-bg, .char-trasher-bg, .char-twins-bg').addClass("displayNone");

            
            //brug variablen til at få slideren til automatisk at slide ud én gang!
            if (clickCounter == false){
            //slide about panel ud automatisk efter x antal sekunder
                setTimeout(function() {
                    $("#close-antboy").click();
                }, 1000);
                 clickCounter = true;
            }

        });
         
    })();
    
   
    (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false;
        
        $('#dufort-btn').click(function () {

            var url = document.getElementById("dufort-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/dufort_btn_01.png'){
                document.getElementById('dufort-btn-toggle').src = 'img/buttons/dufort_btn_02.png';
            } else{
                document.getElementById('dufort-btn-toggle').src = 'img/buttons/dufort_btn_01.png';
            }

            $('.char-dufort-bg').removeClass("displayNone");
            $('.char-antboy-bg').addClass("displayNone");
            $('.char-fury-bg').addClass("displayNone");
            $('.char-ida-bg').addClass("displayNone");
            $('.char-loppen-bg').addClass("displayNone");
            $('.char-sidekick-bg').addClass("displayNone");
            $('.char-trasher-bg').addClass("displayNone");
            $('.char-twins-bg').addClass("displayNone");

            if (clickCounter == false){
                setTimeout(function() {
                    $("#close-dufort").click();
                }, 1000);
                
                clickCounter = true;
            }

        });
        
     })();
    
    (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false;

        $('#fury-btn').click(function () {

            var url = document.getElementById("fury-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/fury_btn_01.png'){
                document.getElementById('fury-btn-toggle').src = 'img/buttons/fury_btn_02.png';
            } else{
                document.getElementById('fury-btn-toggle').src = 'img/buttons/fury_btn_01.png';
            }

            $('.char-fury-bg').removeClass("displayNone");
            $('.char-antboy-bg').addClass("displayNone");
            $('.char-dufort-bg').addClass("displayNone");
            $('.char-ida-bg').addClass("displayNone");
            $('.char-loppen-bg').addClass("displayNone");
            $('.char-sidekick-bg').addClass("displayNone");
            $('.char-trasher-bg').addClass("displayNone");
            $('.char-twins-bg').addClass("displayNone");

            if (clickCounter == false){
                setTimeout(function() {
                    $("#close-fury").click();
                }, 1000);
                clickCounter = true;
            }
        });
        
     })();
    
    (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false;
        
        $('#ida-btn').click(function () {

            var url = document.getElementById("ida-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/ida_btn_01.png'){
                document.getElementById('ida-btn-toggle').src = 'img/buttons/ida_btn_02.png';
            } else{
                document.getElementById('ida-btn-toggle').src = 'img/buttons/ida_btn_01.png';
            }

            $('.char-ida-bg').removeClass("displayNone");
            $('.char-antboy-bg').addClass("displayNone");
            $('.char-fury-bg').addClass("displayNone");
            $('.char-dufort-bg').addClass("displayNone");
            $('.char-loppen-bg').addClass("displayNone");
            $('.char-sidekick-bg').addClass("displayNone");
            $('.char-trasher-bg').addClass("displayNone");
            $('.char-twins-bg').addClass("displayNone");

            if (clickCounter == false){
                setTimeout(function() {
                    $("#close-ida").click();
                }, 1000);
                clickCounter = true;
            }

        });
        
     })();

    (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false;
        
        $('#loppen-btn').click(function () {

            var url = document.getElementById("loppen-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/loppen_btn_01.png'){
                document.getElementById('loppen-btn-toggle').src = 'img/buttons/loppen_btn_02.png';
            } else{
                document.getElementById('loppen-btn-toggle').src = 'img/buttons/loppen_btn_01.png';
            }

            $('.char-loppen-bg').removeClass("displayNone");
            $('.char-antboy-bg').addClass("displayNone");
            $('.char-fury-bg').addClass("displayNone");
            $('.char-dufort-bg').addClass("displayNone");
            $('.char-ida-bg').addClass("displayNone");
            $('.char-sidekick-bg').addClass("displayNone");
            $('.char-trasher-bg').addClass("displayNone");
            $('.char-twins-bg').addClass("displayNone");
            
            if (clickCounter == false){
                
                setTimeout(function() {
                    $("#close-loppen").click();
                }, 1000);       
                clickCounter = true;
            }

        });
        
     })();

    (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false;
        
        $('#sidekick-btn').click(function () {

            var url = document.getElementById("sidekick-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/sidekick_btn_01.png'){
                document.getElementById('sidekick-btn-toggle').src = 'img/buttons/sidekick_btn_02.png';
            } else{
                document.getElementById('sidekick-btn-toggle').src = 'img/buttons/sidekick_btn_01.png';
            }

            $('.char-sidekick-bg').removeClass("displayNone");
            $('.char-antboy-bg').addClass("displayNone");
            $('.char-fury-bg').addClass("displayNone");
            $('.char-dufort-bg').addClass("displayNone");
            $('.char-ida-bg').addClass("displayNone");
            $('.char-loppen-bg').addClass("displayNone");
            $('.char-trasher-bg').addClass("displayNone");
            $('.char-twins-bg').addClass("displayNone");

            if (clickCounter == false){
                setTimeout(function() {
                    $("#close-sidekick").click();
                }, 1000);
                clickCounter = true;
            }

        });
        
     })();
    
        (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false;

        $('#trasher-btn').click(function () {

            var url = document.getElementById("trasher-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/trasher_btn_01.png'){
                document.getElementById('trasher-btn-toggle').src = 'img/buttons/trasher_btn_02.png';
            } else{
                document.getElementById('trasher-btn-toggle').src = 'img/buttons/trasher_btn_01.png';
            }

            $('.char-trasher-bg').removeClass("displayNone");
            $('.char-antboy-bg').addClass("displayNone");
            $('.char-fury-bg').addClass("displayNone");
            $('.char-dufort-bg').addClass("displayNone");
            $('.char-ida-bg').addClass("displayNone");
            $('.char-loppen-bg').addClass("displayNone");
            $('.char-sidekick-bg').addClass("displayNone");
            $('.char-twins-bg').addClass("displayNone");

            if (clickCounter == false){
                setTimeout(function() {
                    $("#close-trasher").click();
                }, 1000);      
                clickCounter = true;
            }

        });
        
     })();
    
    (function () {
        
        //sæt variabel for om der er klikket.
        var clickCounter = false;

        $('#twins-btn').click(function () {

            var url = document.getElementById("twins-btn-toggle").getAttribute("src");

            if (url == 'img/buttons/twins_btn_01.png'){
                document.getElementById('twins-btn-toggle').src = 'img/buttons/twins_btn_02.png';
            } else{
                document.getElementById('twins-btn-toggle').src = 'img/buttons/twins_btn_01.png';
            }

            $('.char-twins-bg').removeClass("displayNone");
            $('.char-trasher-bg').removeClass("displayNone");
            $('.char-antboy-bg').addClass("displayNone");
            $('.char-fury-bg').addClass("displayNone");
            $('.char-dufort-bg').addClass("displayNone");
            $('.char-ida-bg').addClass("displayNone");
            $('.char-loppen-bg').addClass("displayNone");
            $('.char-sidekick-bg').addClass("displayNone");
            $('.char-trasher-bg').addClass("displayNone");

            if (clickCounter == false){
                setTimeout(function() {
                    $("#close-twins").click();
                }, 1000);
                clickCounter = true;
            }

        });
        
     })();


});
