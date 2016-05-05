jQuery.fn.setAllToMaxHeight = function(){
   return this.height( Math.max.apply(this, jQuery.map( this , function(e){ return jQuery(e).height() }) ) );
}

if (true) {
  slideDuration = 10000;
} else {
    slideDuration = 0;
}

// preload images
$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = this;
    });
}

var showSidebar = function() {
   $('body').toggleClass("active-nav");
   $('.menu-button').removeClass("active-button");             
}

var doResize = function(){
  $('ul.collection-th a.prod-th').removeAttr("style").setAllToMaxHeight();
  $('ul.collection-list a.prod-th').removeAttr("style").setAllToMaxHeight();
}

//ipad refresh on rotate
if (window.addEventListener) {
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    }, false);
}

// add/remove classes everytime the window resize event fires
jQuery(window).resize(function(){
   var off_canvas_nav_display = $('.off-canvas-navigation').css('display');
   var menu_button_display = $('.menu-button').css('display');
   if (off_canvas_nav_display === 'block') {       
      $("body").removeClass("two-column").addClass("small-screen");           
   } 
   if (off_canvas_nav_display === 'none') {
      $("body").removeClass("active-sidebar active-nav small-screen")
         .addClass("two-column");         
   }  
    doResize();
});   








jQuery(document).ready(function($) {
  
    $('ul.collection-th a,ul.collection-list a').imagesLoaded( function() {
        doResize();
    }); 
  
   $("#main").fitVids();   

   // Toggle for nav menu
   $('.menu-button').click(function(e) {
      e.preventDefault();
      showSidebar();                   
   });   
  
  
     // get current path and see if it matches the link href. If it does,
     // open that section of the menu
     var CurrentUrl = window.location.pathname;

     if(CurrentUrl !="/"){
       $item = $('#side-menu li.level-1 a').filter(function(){
         if ($(this).prop('href').indexOf(location.pathname) != -1){
           $(this).parentsUntil("#side-menu", ".has-sub").addClass("active");
         }
       });

       $('#side-menu li.active').each(function() {
         var tis = $(this);
         tis.find('ul').eq(0).slideDown();
       });
     }
    
  
  
   $('#side-menu').find('li.has-sub > a').each(function() {
     var tis = $(this);
     var state = false;

     var subMenu = tis.next('ul');
     tis.on('click', function(e) {
         e.preventDefault();
         state = tis.closest('li').hasClass('active');
         state = !state;
         subMenu.slideToggle(state);
         tis.closest('li').toggleClass('active',state);
     });
   });   
  
   $(window).scroll(function(){
      if ($(this).scrollTop() > 200) {
         $('#scroll-top').fadeIn();
      } else {
         $('#scroll-top').fadeOut();
      }
   });    
  
   $(".coll-tags").removeClass('show-tags');
   $(".coll-tags .button").on('click',function(e){
     e.preventDefault();
     $(".tags").slideToggle(300);
   });
  
   // Animate the scroll to top
   $('#scroll-top').on('click', function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, 300);
   });       

  var $slides = $('#slides');
  var slideCount = $slides.find(".slide").length;
 
  if (slideCount > 1) {
    $slides.owlCarousel({
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        transitionStyle : "fadeUp",
        autoPlay: slideDuration,
        pagination: false,
        navigationText : ["<span class='arrow-left'></span>","<span class='arrow-right'></span>"]          
    });
  } else if(slideCount == 1){
    $slides.removeClass("owl-carousel");
  }
  
   $('select#blog-cats').on('change', function() {
      window.location = $(this).val();
   });  

   // Gallery for product with single image
   $('#product-images.single-image #product-shot').magnificPopup({
      type: 'image'
   });

   // Gallery for product with multiple images
   var prdImages = [];
   var $prdImg = $('#more-images a');
   $prdImg.each(function(){
      prdImages.push({
      src: $(this).prop('href'),
      title: $(this).find('img').prop('alt')
      });  
   });


   $('#product-shot').on('click', function(e) {
        e.preventDefault(); 
        var imageId = $(this).data('image-id');
        $('.smallimg[data-image-id="' + imageId + '"]').trigger("click");
   });   
  
   
   // preload gallery images  
   var galleryImg = [];
   $("#more-images a").each(function(){
      imgUrl = $(this).prop("href");
      galleryImg.push(imgUrl);
   });
   // Pass the array to our preload function
   $(galleryImg).preload();  
  
   $('#more-images').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
         enabled: true
      },
      mainClass: 'mfp-fade'
   });  
  
  
   
      // to avoid difficult scrolling - don't enable zoom on mobiles
      if ($(window).width() > 760) {  
         $('a#product-shot').zoom({url: $(this).prop("href")});
      }
     
  
   
   var owl = $("#more-images");
   owl.owlCarousel({
      itemsCustom : [
      [0, 1],
      [320, 2],   
      [640, 3]
      ],  
      items : 3,
      rewindSpeed : 400,   
      navigation:true,
      navigationText : ["<span class='arrow-left'></span>","<span class='arrow-right'></span>"]   
   });

    
   $('.gt-accordion h4').each(function() {
      var tis = $(this), state = false, answer = tis.next('div').slideUp();
      tis.click(function() {
         state = !state;
         answer.slideToggle(state);
         tis.toggleClass('active',state);
      });
   });     
    
   
      $('input[name="checkout"], input[name="goto_pp"], input[name="goto_gc"]').on('click',function(e) {
         if($('#agree').is(':checked')){
            $(this).submit();
         }
         else{
            alert("You must agree with the terms and conditions of sale to check out");
            $('#agree-terms').addClass('highlight').focus();
            e.preventDefault();
         }
      });    
      
   
   var $brands = $('#brand-scroller');
   $brands.owlCarousel({
      lazyLoad: true,
      itemsCustom: [ [0, 1], [320, 2], [480, 3], [960, 4] ],
      responsiveRefreshRate: 50,
      slideSpeed: 200,
      paginationSpeed: 500,
      autoPlay: 5000,
      stopOnHover: true,
      rewindNav: true,
      rewindSpeed: 500,
      pagination: false,
      navigation: true,
      navigationText : ["<span class='arrow-left'></span>","<span class='arrow-right'></span>"]        
   });
   
   
   $('a.go-back').on('click', function(e) {
      e.preventDefault();
      window.location.href = document.referrer;
   });  
    
     
   // product variant callback  
   var currencyFormat = $('body').data('curr-format');  
   selectCallback = function(variant, selector) {
      var $product = $('#prod-' + selector.product.id);
      $('.var-msg', $product).html('').hide();
      $('.sku-info', $product).html('').hide();
      if (variant) {
         if (variant.available) {
            // Selected a valid variant that is available
            
           
            // enable buy button
            $('.purchase', $product).removeClass('disabled').removeAttr('disabled');
            
            
               // If item is backordered yet can still be ordered, we'll show special message
               if (variant.inventory_management && variant.inventory_quantity <= 0) {
                 $('.var-msg', $product).html("Available for pre-order").fadeIn(200);
               }            
            
         } else {
            // Variant is sold out
            $('.var-msg', $product).html("Sorry, this item is out of stock").fadeIn(200);
            $('.purchase', $product).addClass('disabled').attr('disabled', 'disabled');
         }
         
         // Whether the variant is in stock or not, we can update the prices
         $('.product-price', $product).html(Shopify.formatMoney(variant.price, currencyFormat));          
         if ( variant.compare_at_price > variant.price ) {
            $('.product-compare-price', $product).html(Shopify.formatMoney(variant.compare_at_price, currencyFormat));
         }else{
            $('.product-compare-price', $product).html('');
         }          
             
         if (variant.featured_image) {
            var original_image = $("#product-shot img"), new_image = variant.featured_image;
            Shopify.Image.switchImage(new_image, original_image[0], function (new_image_src, original_image,element) {
               $(element).parents('a').attr('href', new_image_src);
               $(element).attr('src', new_image_src);
               $('#product-shot').find('img').prop('src',new_image_src);
               $('#product-shot').data('image-id',new_image.id);
               $("#more-images a").removeClass('active-img');
               $('.smallimg[data-image-id="' + new_image.id + '"]').addClass('active-img');
            });
         }             
             
      } else {
         // variant doesn't exist.
         $('.var-msg', $product).html("Unavailable").fadeIn(200);
         $('.purchase', $product).addClass('disabled').attr('disabled', 'disabled');         
      }      
      
      
         Currency.convertAll($('body').data('shop-currency'), $('#currencies').val()); 
            
    
   };         
   

});
