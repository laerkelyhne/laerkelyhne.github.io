$( document ).ready(function() {
    //klik knap for at slide text-panel frem fra venstre til højre   

    // ----------- THE STORY -----------//
    
    jQuery('#sec02').click(function () {
       
        //når der klikkes et panel ud skal sektionen falde i hak
        lastElementTop = $("#sec02").position().top;
        //trækker menubars højde fra
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });
    
    
    jQuery('.story-row').click(function () {
    
        var panel02 = $(".check-panel-02");
        
        if(panel02.hasClass('only-close')){
            
            panel02.removeClass('only-close');
            $("#panel-close-01").click();
        }

    });

    
    jQuery('#panel-close-01').click(function () {
        jQuery('#my-panel-01').slideToggleFromRight();
    });
    
    
    //slide første panel ud automatisk første gang siden besøges
    if (document.cookie.indexOf("beenhere") >= 0) {
          // They've been here before.
           
        }
        else {
  
            //slide panel ud automatisk 
            $(window).scroll(function(e) {
                //gem scroll position på y-aksen fra top i variabel
                var scrollAmount = $('body').scrollTop();   

                //hvis scroll position er mellem 702px og 802 px fra top
                if(scrollAmount >="702" && scrollAmount <= "802") {

                    //gem panel i variabel 
                    var panel = $(".my-panel");

                    //hvis panel har auto-panel som class
                    if(panel.hasClass("auto-panel")){

                        //fjern auto-panel for kun at eksekvere automatisk slide én gang
                        panel.removeClass("auto-panel");

                        //sæt timer på funktion
                        setTimeout(function() {
                            //udløs click method på panelet, "som om npgen klikker på åben-knappen"
                            $("#panel-close-01").click();

                            //eksekver funktion efter 2 sekunder
                        }, 2000);
                        
                        //de har ikke været her før, sæt cookie der indikerer de har været her før næste gang de besøger siden
                        document.cookie = "beenhere=yes; expires=Thu, 6 Dec 2030 17:00:00 UTC";

                    }
                }

            });

        }
    


    
    // ----------- PRODUCERS NOTE -----------//

    jQuery('#sec03').click(function () {
        
        lastElementTop = $("#sec03").position().top;
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });
    
    
    
    jQuery('.note-row').click(function () {
    
        var panel03 = $(".check-panel-03");
        
        if(panel03.hasClass('only-close')){
            
            panel03.removeClass('only-close');
            $("#panel-close-02").click();
        }

    });

    
    jQuery('#panel-close-02').click(function () {
        jQuery('#my-panel-02').slideToggleFromRight();
    });
    
    
    
    // ----------- THE SHOW -----------//
    

    jQuery('#sec04').click(function () {
        
        lastElementTop = $("#sec04").position().top;
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });
    
    
    jQuery('.show-row').click(function () {
    
        var panel03 = $(".check-panel-04");
        
        if(panel03.hasClass('only-close')){
            
            panel03.removeClass('only-close');
            $("#panel-close-show").click();
        }

    });

    
    jQuery('#panel-close-show').click(function () {
        jQuery('#my-panel-show').slideToggleFromRight();
        
        //skub videomenuen ud af bileldet, når panelet slides frem på en ipad.
        if (window.innerWidth <= 992) {
            jQuery('.video-panel').slideToggleContent();
        } 

        
    });
    
    
    
    
    // ----------- CHARACTERS -----------//
    
    
    jQuery('#sec05').click(function () {
        
        lastElementTop = $("#sec05").position().top;
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });
    
    
    // ----------- CROSSMEDIA -----------//
    
    
    jQuery('#sec07').click(function () {
    
        lastElementTop = $("#sec07").position().top;
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });
    
    jQuery('.cross-row').click(function () {
    
        var panel07 = $(".check-panel-07");
        
        if(panel07.hasClass('only-close')){
            
            panel07.removeClass('only-close');
            $("#panel-close-cross").click();
        }

    });

    
    jQuery('#panel-close-cross').click(function () {
        jQuery('#my-panel-cross').slideToggleFromRight();
        
        //får indholdet til at slide med
        jQuery('.cross-row').slideToggleFromRight();
        
    });
    
    

    // ----------- FACTS -----------//

    jQuery('#sec08').click(function () {
        
        lastElementTop = $("#sec08").position().top;
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });
    
    jQuery('.facts-row').click(function () {
    
        var panel08 = $(".check-panel-08");
        
        if(panel08.hasClass('only-close')){
            
            panel08.removeClass('only-close');
            $("#panel-close-facts").click();
        }

    });

    
    jQuery('#panel-close-facts').click(function () {
        jQuery('#my-panel-facts').slideToggleFromRight();
    });
    
    
    
    // ----------- IP -----------//

    jQuery('#sec09').click(function () {
        
        
        lastElementTop = $("#sec09").position().top;
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });
    
    
    jQuery('.ip-row').click(function () {
    
        var panel09 = $(".check-panel-09");
        
        if(panel09.hasClass('only-close')){
            
            panel09.removeClass('only-close');
            $("#panel-close-ip").click();
        }

    });

    
    jQuery('#panel-close-ip').click(function () {
        jQuery('#my-panel-ip').slideToggleFromRight();
        //får indholdet til at slide med
        jQuery('.ip-row').slideToggleContent();
        
    });
    
    // ----------- RIGHTS -----------//
    
    jQuery('#sec10').click(function () {
        
        lastElementTop = $("#sec10").position().top;
        scrollAmount = lastElementTop - 79;    

        $('html,body').animate({
            scrollTop: scrollAmount},
            'slow');
    });

    
    //klik knap for at slide text-panel frem fra højre til venstre 
    jQuery('.char-antboy-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#antboy-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#antboy-panel').slideToggleFromLeft();
        }

    });

    jQuery('.char-dufort-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#dufort-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#dufort-panel').slideToggleFromLeft();
        }
        
    });

    jQuery('.char-fury-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#fury-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#fury-panel').slideToggleFromLeft();
        }
        
    });

    jQuery('.char-ida-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#ida-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#ida-panel').slideToggleFromLeft();
        }
        
    });

    jQuery('.char-loppen-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#loppen-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#loppen-panel').slideToggleFromLeft();
        }
        
    });

    jQuery('.char-sidekick-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#sidekick-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#sidekick-panel').slideToggleFromLeft();
        }

    });

    jQuery('.char-trasher-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#trasher-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#trasher-panel').slideToggleFromLeft();
        }

    });

    jQuery('.char-twins-bg').click(function () {
        
        if (window.innerWidth <= 1240) {
            jQuery('#twins-panel').slideToggleFromLeftIpad();
        } else{
            jQuery('#twins-panel').slideToggleFromLeft();
        }

    });




    
    

    //slide panel ind fra højre til venstre   
    jQuery.fn.extend({
      slideRight: function() {
        return this.each(function() {
          jQuery(this).animate({
              left: '+=400'
          }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slideLeft: function() {
        return this.each(function() {
          jQuery(this).animate({
            left: '-=400'
            }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slideToggleFromRight: function() {
        return this.each(function() {
          var el = jQuery(this);
          if (el.hasClass('hidden-panel')) {
            el.addClass("only-close");
            el.removeClass('hidden-panel')
            el.slideRight();
            

          } else {
            el.addClass('hidden-panel')
            el.slideLeft();
            el.removeClass("only-close");

          }
        });
      }
    });

    //slide panel ind fra venstre til højre /bred
    jQuery.fn.extend({
      slidefromRight: function() {
        return this.each(function() {
          jQuery(this).animate({
              right: '-=700'
          }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slidefromLeft: function() {
        return this.each(function() {
          jQuery(this).animate({
            right: '+=700'
            }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slideToggleFromLeft: function() {
        return this.each(function() {
          var el = jQuery(this);
          if (el.hasClass('hidden-panel')) {
            el.addClass("only-close");
            el.removeClass('hidden-panel')
            el.slidefromLeft();
            

          } else {
            el.addClass('hidden-panel')
            el.slidefromRight();
            el.removeClass("only-close");

          }
        });
      }
    });
    
    //skub sektion ud når panel slides
    jQuery.fn.extend({
      slidecontentRight: function() {
        return this.each(function() {
          jQuery(this).animate({
              right: '-=400'
          }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slidecontentLeft: function() {
        return this.each(function() {
          jQuery(this).animate({
            right: '+=400'
            }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slideToggleContent: function() {
        return this.each(function() {
          var el = jQuery(this);
          if (el.hasClass('hidden-panel')) {
            el.addClass("only-close");
            el.removeClass('hidden-panel')
            el.slidecontentLeft();
            

          } else {
            el.addClass('hidden-panel')
            el.slidecontentRight();
            el.removeClass("only-close");

          }
        });
      }
    });
    
    //slide panel ind fra venstre til højre på en ipad
    jQuery.fn.extend({
      slidefromRightIpad: function() {
        return this.each(function() {
          jQuery(this).animate({
              right: '-=360'
          }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slidefromLeftIpad: function() {
        return this.each(function() {
          jQuery(this).animate({
            right: '+=360'
            }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slideToggleFromLeftIpad: function() {
        return this.each(function() {
          var el = jQuery(this);
          if (el.hasClass('hidden-panel')) {
            el.addClass("only-close");
            el.removeClass('hidden-panel')
            el.slidefromLeftIpad();
            

          } else {
            el.addClass('hidden-panel')
            el.slidefromRightIpad();
            el.removeClass("only-close");

          }
        });
      }
    });
    
});