(function($, global){

  var navIcon = $('.nav-trigger'),
      navMenu = $('.mobile-nav'),
      head = $('header'),
      top = 100,
      tabsContainerList = document.getElementsByClassName('tabs'),
      item = $('.item'),
      body = $('html, body'),
      modalClose = $('.modal-close'),
      modal = $('.modal-wrapper'),
      leftPanel = modal.children('.modal-slide-left'),
      navLinks = $('.navigation-links li > a'),
      mobileNav = $('.mobile-nav ul li > a'),
      rightPanel = modal.children('.modal-slide-right'),
      prev = 0,
      $window = $(window),
      nav = $('.scrollhide-nav');


  function updateTabs(e, navigation, content){
    var queryVal = 'li' + e.target.hash;
    e.preventDefault();
    if(!e.target.classList.contains('selected')){
      navigation.querySelector('a.selected').classList.remove('selected');
      e.target.classList.add('selected');
      content.querySelector('li.selected').classList.remove('selected');
      content.querySelector(queryVal).classList.add('selected');
    }
  }

  for( var i=0 ; i<tabsContainerList.length ; i++ ){
    (function(i){
      var tabsContainer = tabsContainerList[i],
          tabsNavigation = tabsContainer.querySelector('.tabs-navigation'),
          tabsContent = tabsContainer.querySelector('.tabs-content');

      tabsNavigation.addEventListener('click', function(event){
        if(event.target.tagName.toLowerCase() === 'a'){
          updateTabs(event, tabsNavigation, tabsContent);
        }
      });
    }(i));
  }

  $(global).scroll(function(){
    if($(this).scrollTop() > top){
      head.addClass('is-scrolling');
    }else{
      head.removeClass('is-scrolling');
    }
    var scrollTop = $window.scrollTop();
    nav.toggleClass('hidden', scrollTop > prev);
    prev = scrollTop;
  });

  navLinks.on('click', function(e){
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
  		var target = $(this.hash);
  		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  		if (target.length) {
  			$('html,body').animate({
  				scrollTop: target.offset().top
  			}, 1000);
  			return false;
  		}
  	}
  });

  navIcon.on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('nav-trigger-open');
    if($(this).hasClass('nav-trigger-open')){
      navMenu.addClass('show-menu').one('transitionend', function(){
        body.addClass('fixed');
      });
    }
    else{
      navMenu.removeClass('show-menu');
      $('body').removeClass('fixed');
    }
  });

  mobileNav.on('click', function(e){
    e.preventDefault();
    if(navIcon.hasClass('nav-trigger-open')){
      navMenu.removeClass('show-menu');
      navIcon.removeClass('nav-trigger-open');
      body.removeClass('fixed');
    }
  });

  item.on('click', function(){
    var modalID = $(this).data("item");
    leftPanel.css({
      'background-image': 'url(img/'+modalID+'.jpg)',
      'background-position': 'center',
      'background-size': 'cover'
    });
    rightPanel.load(modalID+'.html', function(){
      modal.addClass('is-visible').one('transitionend', function(){
        body.addClass('fixed');
      });
    });
  })

  modalClose.on('click','a', function(e){
    e.preventDefault();
    modal.removeClass('is-visible').one('transitionend', function(){
      body.removeClass('fixed');
      rightPanel.children('.modal-content').remove();
    });
  });

  $('.my-slider').unslider({
    arrows: {
      prev: '<a class="unslider-arrow prev"><img src="img/left-arrow.png"></a>',
      next: '<a class="unslider-arrow next"><img src="img/right-arrow.png"></a>'
    }
  });

  global.sr = ScrollReveal({
    distance: '20px',
    duration: 800,
    scale: 1
  });
  sr.reveal('.text-animate');
  sr.reveal('.logo-supplier', 50);

}(jQuery, window))
