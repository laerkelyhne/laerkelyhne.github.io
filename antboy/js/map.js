$( document ).ready(function() {
    
    $('.map-red-btn').click(function(){
        
        red = $('.map-red');
        
        redBtn = $('#red-btn');
        
        redBtn.slideToggleMap();
        
        if(red.hasClass('displayNone')){
            red.removeClass('displayNone');
            setTimeout(function() {
                redBtn.css('background', '#be9494');
            }, 500);
            
            
        } else{
            red.addClass('displayNone');
            setTimeout(function() {
                redBtn.css('background', '#9d9d9d');
            }, 600);
        }
    });
    
    $('.map-green-btn').click(function(){
        
        green = $('.map-green');
        greenBtn = $('#green-btn');
        
        greenBtn.slideToggleMap();
        
        if(green.hasClass('displayNone')){
            green.removeClass('displayNone');
            setTimeout(function() {
                greenBtn.css('background', '#e1c07f');
            }, 500);  
        } else{
            green.addClass('displayNone');
            setTimeout(function() {
                greenBtn.css('background', '#9d9d9d');
            }, 600);
        }
    });
    
    
    
    
    $('.map-purple-btn').click(function(){
        
        purple = $('.map-purple');
        purpleBtn = $('#purple-btn');
        
        purpleBtn.slideToggleMap();
        
        if(purple.hasClass('displayNone')){
            purple.removeClass('displayNone');
            setTimeout(function() {
                purpleBtn.css('background', '#6c5388');
            }, 500);
        } else{
            purple.addClass('displayNone');
            setTimeout(function() {
                purpleBtn.css('background', '#9d9d9d');
            }, 600);
        }
    });
    
    $('.map-black-btn').click(function(){
        
        black = $('.map-black');
        blackBtn = $('#black-btn');
        
        blackBtn.slideToggleMap();
        
        if(black.hasClass('displayNone')){
            black.removeClass('displayNone');
            setTimeout(function() {
                blackBtn.css('background', '#222222');
            }, 500);
        } else{
            black.addClass('displayNone');
            setTimeout(function() {
                blackBtn.css('background', '#9d9d9d');
            }, 600);
        }
    });
   
    
    
    
    //slide panel ind fra højre til venstre   
    jQuery.fn.extend({
      slideRightMap: function() {
        return this.each(function() {
          jQuery(this).animate({
              left: '+=40'
          }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slideLeftMap: function() {
        return this.each(function() {
          jQuery(this).animate({
            left: '-=40'
            }, 458, 'swing', function() {

            // Animation complete. CALLBACK?

        });
        });
      },
      slideToggleMap: function() {
        return this.each(function() {
          var el = jQuery(this);
          if (el.hasClass('hidden-btn')) {
            el.removeClass('hidden-btn')
            el.slideRightMap();

          } else {
            el.addClass('hidden-btn')
            el.slideLeftMap();

          }
        });
      }
    });
    
});