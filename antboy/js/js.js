$( document ).ready(function() {


    //laver variabel som kan styre om funktioner skal sættes igang eller ej
    var enabled = true; 

    //load sound
    var bgMusic = document.createElement('audio');
    bgMusic.setAttribute('src', 'audio/antboy_sound.mp3');
    
    //sørg for kun at afspille musik automatisk når der er logget ind 
    var path = document.location.pathname;
    
    //vinduet skal være større end 768px før end lyd og video må afspilles automatisk
    if (window.innerWidth >= 768) {
        if(path == "/antboy/index.php" ) {

            //sæt cookie således at videoen kun afspilles automatisk første gang man besøger sitet
            if (document.cookie.indexOf("visited") >= 0) {
              // They've been here before.
                bgMusic.play();
            }
            else {
              // sæt ny cookie
              document.cookie = "visited=yes; expires=Thu, 6 Dec 2030 17:00:00 UTC";
                //de har ikke været her før, afspil video automatisk efter 3 sekunder
                setTimeout(function() {
                    $(".play-button").click();
                }, 3000);

            }
        } 
    }
    
        //skift billede på mute button når der klikkes.   
    $('.mute-btn').click(function(){

        var url = document.getElementById("change-sound-img").getAttribute("src")
        var url2 = document.getElementById("change-sound-img-2").getAttribute("src")

        //hvis der klikkes for at slukke for lyden, skift til rød mute btn
        if (url == 'img/sound_on.svg' || url2 == 'img/sound_on.svg'){
            bgMusic.pause();
            document.getElementById('change-sound-img').src = 'img/sound_off.svg';
            document.getElementById('change-sound-img-2').src = 'img/sound_off.svg';
        } 
        
        //hvis der klikkes for at tænde for lyden, skift til grøn mute btn
        if (url == 'img/sound_off.svg' || url2 == 'img/sound_off.svg'){
            bgMusic.play();
            document.getElementById('change-sound-img').src = 'img/sound_on.svg';
            document.getElementById('change-sound-img-2').src = 'img/sound_on.svg';

        }
    }); 

    //navbar skal sætte sig fast under #landing-section    
    $('#topnavbar').affix({
        offset: {
            top: $('#landing').height()
        }   
    });

    //tjekker om det er en touch device - mobil, ipad
    function isTouchDevice(){
        return typeof window.ontouchstart !== 'undefined';
    }
    //gemmer boolean i variabel
    var touch = isTouchDevice();

    //hvis det er en touch screen, er variablen lig med true
    if(touch == true){
        $("#topnavbar").addClass("displayNone");
        $("#mobile-topnavbar").removeClass("displayNone");
        $("#landing").css("margin-top", "50px");
        $(".anchor").addClass("anchor-touch");
    } 

    //hvis det ikke er en touch screen, er variablen lig med false  
    if(touch == false){
        $("#topnavbar").removeClass("displayNone");
        $("#mobile-topnavbar").addClass("displayNone");
        $(".nav-wrapper").addClass("nav-wrapper-fix");
        $(".anchor").addClass("anchor-no-touch");

    } 

    
    //mindre end iPadstørrelse
    if (window.innerWidth <= 1070) {
            $("#topnavbar").addClass("displayNone");
            $("#mobile-topnavbar").removeClass("displayNone");
            $("#landing").css("margin-top", "50px");
            $(".anchor").addClass("anchor-touch");
        } else{
            $("#topnavbar").removeClass("displayNone");
            $("#mobile-topnavbar").addClass("displayNone");
            $(".nav-wrapper").addClass("nav-wrapper-fix");
            $(".anchor").addClass("anchor-no-touch");
        }
    //tjek om der resizes i browseren 
    $(window).resize(function(){
        if(window.innerWidth <= 1070){
            $("#topnavbar").addClass("displayNone");
            $("#mobile-topnavbar").removeClass("displayNone");
            $("#landing").css("margin-top", "50px");
            $(".anchor").addClass("anchor-touch");
        } else{
            $("#topnavbar").removeClass("displayNone");
            $("#mobile-topnavbar").addClass("displayNone");
            $(".nav-wrapper").addClass("nav-wrapper-fix");
            $(".anchor").addClass("anchor-no-touch");
        }
    });
    
    
    
    
    
    
    
    function animateTitle(){
        //Animér titel 1 ind efter halvt sekund 
        setTimeout(function(){
            $('#title').tween({
                   top:{
                      start: -400,
                      stop: 0,
                      time: 0,
                      duration: 1,
                      units: 'px',
                      effect: 'easeInOut',
                   }
                });

                $.play();
          }, 200);

        //Animér titel 2 ind efter halvandet sekund 
        setTimeout(function(){
            $('#animated').attr("style", "display: block;");
                $('#animated').tween({
                   left:{
                      start: -1000,
                      stop: 0,
                      time: 0,
                      duration: 1.5,
                      units: 'px',
                      effect: 'easeInOut',
                   }
                });
            
                

                $.play();
          }, 1200);    
    }
    
    function animateTitleIpad(){
        //Animér titel 1 ind efter halvt sekund 
        setTimeout(function(){
            $('#title').tween({
                   top:{
                      start: -400,
                      stop: 60,
                      time: 0,
                      duration: 1,
                      units: 'px',
                      effect: 'easeInOut',
                   }
                });

                $.play();
          }, 200);

        //Animér titel 2 ind efter halvandet sekund 
        setTimeout(function(){
            $('#animated').attr("style", "display: block;");
                $('#animated').tween({
                   left:{
                      start: -1000,
                      stop: 0,
                      time: 0,
                      duration: 1.5,
                      units: 'px',
                      effect: 'easeInOut',
                   },
                    
                    top:{
                      start: -400,
                      stop: 60,
                      time: 0,
                      duration: 1,
                      units: 'px',
                      effect: 'easeInOut',
                   }
                });

                $.play();
          }, 1200);    
    }
    
   animateTitleIpad(); 

    


    //mindre end eller lig med iPadstørrelse
    if (window.innerWidth <= 768) {
//            $(".sound-btns").addClass("displayNone");
        } else{
//            $(".sound-btns").removeClass("displayNone");
        }

    //tjek om der resizes i browseren 
    $(window).resize(function(){
        if(window.innerWidth <= 768){
//            $(".sound-btns").addClass("displayNone");
        } else{
//            $(".sound-btns").removeClass("displayNone");
        }
    });

    //få baggrund til at køre til siden når der scrolles    
    var parallax = document.getElementById("sec02");
    var speed = -3;

    window.onscroll = function() {
      var yOffset = window.pageYOffset - 278;
      parallax.style.backgroundPosition =  (yOffset / speed) + "px";
    }


//animér figurer ind når der scrolles  
        $(window).scroll(function() {
            $('.open').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+450) {
                    $(this).addClass("expandOpen");
                }
            });
        });

        $(window).scroll(function() {
            $('.animExpandUp').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+600) {
                    $(this).addClass("slideExpandUp");
                }
            });
        });
    
    
        $(window).scroll(function() {
            $('.animRight').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+600) {
                    $(this).addClass("slideRight");
                }
            });
        });

        $(window).scroll(function() {
            $('.animLeft').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+600) {
                    $(this).addClass("slideLeft");
                }
            });
        });
    
        $(window).scroll(function() {
            $('.animDown').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+600) {
                    $(this).addClass("slideDown");
                }
            });
        });
    
        $(window).scroll(function() {
            $('.animDown').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow+600) {
                    $(this).addClass("slideDown");
                }
            });
        });
});
       