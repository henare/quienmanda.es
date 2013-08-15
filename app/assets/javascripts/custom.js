
/* TODO: This is only part of the original template JS */

/* -------------------- Check Browser --------------------- */

function browser() {
  
  //var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
  //var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
      // At least Safari 3+: "[object HTMLElementConstructor]"
  var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
  //var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

  function testCSS(prop) {
      return prop in document.documentElement.style;
  }
  
  if (isSafari || isChrome) {
    
    return true;
    
  } else {
    
    return false;
    
  }
  
}

/* -------------------- Search --------------------- */

jQuery(document).ready(function($){
  
  $('.search > :input').on('keyup',function(){
    
    $(this).attr('class', 'activeSearch');

    var count;
    var timeToEnd = 1000;

    $(':input').keydown(function(){

      clearTimeout(count);

      count = setTimeout(endCount, timeToEnd);

    });

  });

  function endCount(){

    $('.search > :input').attr('class','search-form');

  }

});

/* -------------------- Buttons 3D Style --------------------- */

jQuery(document).ready(function($){

  $(':button').each(function(){

    if($(this).hasClass('btn-tabula')) {

      $(this).wrap('<div class="btn-overlay" />');

      var inner = $(this).html();
      
      if(browser()) {

        $(this).html('<span>' + inner + '</span>');
        
      } 

    }

  });
  
    
  $('a').each(function(){

    if($(this).hasClass('btnOverlay')) {
      
      $(this).wrap('<div class="btn-overlay" />');

      var inner = $(this).html();
      
      if(browser()) {

        $(this).html('<span>' + inner + '</span>');
        
      } 

    }

  });

});

/* ------------------ Back To Top ------------------- */
jQuery(document).ready(function($){

  jQuery('#under-footer-back-to-top a').click(function(){
    jQuery('html, body').animate({scrollTop:0}, 300); 
    return false; 
  });

}); 

/* ------------------ Tooltips ----------------- */

jQuery(document).ready(function($) {

    $('.tooltips').tooltip({
      selector: "a[rel=tooltip]"
    })

});

/* -------------------- Isotope --------------------- */

jQuery(document).ready(function () {
  
  $('#wall').imagesLoaded(function() {
    
    var $container = $('#wall');
      $select = $('#filters select');

    // initialize Isotope
    $container.isotope({
    // options...
    resizable: false, // disable normal resizing
    // set columnWidth to a percentage of container width
      masonry: { columnWidth: $container.width() / 12 }
    });

    // update columnWidth on window resize
    $(window).smartresize(function(){
    
      $container.isotope({
      // update columnWidth to a percentage of container width
        masonry: { columnWidth: $container.width() / 12 }
      });
    });


    $container.isotope({
      itemSelector : '.item'
    });

    $select.change(function() {
      
      var filters = $(this).val();

        $container.isotope({
          filter: filters
        });
      
      });

      var $optionSets = $('#filters .option-set'),
        $optionLinks = $optionSets.find('a');

        $optionLinks.click(function(){
      
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
            return false;
        }
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
        key = $optionSet.attr('data-option-key'),
        value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // otherwise, apply new options
        $container.isotope( options );
      }

      return false;
      
      });
    
  });
  
});

/* ------------------ Tabs ----------------- */

function AutomaticTabsWidhtReset() {
  
  $('.nav-tabs').find('li').each(function(){

    $(this).find('a').css('width', 'auto');

  });
    
}

function AutomaticTabsWidht() {
    
  var containerWidth = $('.tab-content').width();
  
  var tabsNavWidth = 0;
  
  $('.nav-tabs').find('li').each(function(){
  
    var liWidth = $(this).outerWidth();
    
    tabsNavWidth = tabsNavWidth + liWidth;
    
  });
    
    
  if(tabsNavWidth > containerWidth) {
    
    var elements = $(".nav-tabs li").size();
    
    var newWidth = containerWidth / elements - 15;
    
    $('.nav-tabs').find('li').each(function(){

      $(this).find('a').css('width', newWidth);

    }); 
    
  }
  
}


jQuery(document).ready(function($) {
  
  $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })
  
});

/* -------------------- Width Functions --------------------- */

jQuery(document).ready(function($){
  
  widthFunctions();

});


$(window).bind("resize", widthFunctions);

function widthFunctions(e) {
  
  AutomaticTabsWidhtReset();
  AutomaticTabsWidht();
  
  var winHeight = $(window).height();
  var winWidth = $(window).width();

  if (winWidth < 980 && winWidth > 767) {
    
    if($("#wall").width()) {
      
      if($(".item").hasClass("span3")) {

        $(".item").removeClass("span3");
        $(".item").addClass("span4");

      }
      
    }
    
    if($(".lr-page").hasClass("span4 offset4")) {

      
      $(".lr-page").removeClass("span4 offset4");
      $(".lr-page").addClass("span6 offset3");
      
      $("#page-title").removeClass("span4 offset4");
      $("#page-title").addClass("span6 offset3");
    }
            
  } else {
    
    if($("#wall").width()) {
      
      if($(".item").hasClass("span4")) {

        $(".item").removeClass("span4");
        $(".item").addClass("span3");

      }
      
    }
    
    if($(".lr-page").hasClass("span6 offset3")) {
      
      $(".lr-page").removeClass("span6 offset3");
      $(".lr-page").addClass("span4 offset4");
      
      $("#page-title").removeClass("span6 offset3");
      $("#page-title").addClass("span4 offset4");
    }
      
  }
  
}