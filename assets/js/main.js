/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var modal = $("#modal");
	var modalContent = $("#modal-content");
	var thumbnails = $(".thumbnail");
	var video_thumbnails = $(".video-thumbnail");
	var header = $("#header");
	var tabs = $(".tabs li");
	var arrows = $(".arrow");
	var backArrow = arrows[0];
	var nextArrow = arrows[1];
	var xout = $("#modal").children()[0];
	var currentPic;
	var currentImg;

	$($("#resume > section")[0]).show();
	tabs[0].style.color = "red";
	$(xout).click(close);
	$(window).scroll(showHeader)

	function setCurrentPic(pic){
		currentPic = $(pic);
		currentImg = pic.className == "video-thumbnail" ? currentPic.children().first()[0].src : currentPic.children().first().css("backgroundImage");
	}

	function goToNext(){
		var idx = thumbnails.index(currentPic);
		nextPic = thumbnails[idx + 1];
		nextPic ? setCurrentPic(nextPic) : setCurrentPic(thumbnails[0]);
		expand(currentImg);
	}

	nextArrow.addEventListener("click", goToNext);

	function goToPrevious(){
		var idx = thumbnails.index(currentPic);
		prevPic = thumbnails[idx - 1];
		prevPic ? setCurrentPic(prevPic) : setCurrentPic(thumbnails[thumbnails.length - 1]);
		expand(currentImg);
	}

	backArrow.addEventListener("click", goToPrevious);

	for (var i = 0; i < thumbnails.length; i++){
		thumbnails[i].addEventListener("click", function(e){
			setCurrentPic(e.currentTarget);
			expand(e);
		});
	}
	for (var i = 0; i < video_thumbnails.length; i++){
		video_thumbnails[i].addEventListener("click", function(e){
			playVideo(e);
		});
	}

	for (var i = 0; i < tabs.length; i++){
		tabs[i].addEventListener("click", goToTab);
	}

	function playVideo(e) {

		var src = e.currentTarget.children[0].src;
		video = $("#player").children().first().children()[0]

		// debugger
		video.src = src;

	}


	function expand(e) {
		if (typeof e == "undefined"){return;}
		modal[0].style.display = "flex";
		modalContent[0].style.backgroundImage = currentImg;
	}

	function close(e){
		modal.hide();
	}

	setInterval(checkScroll, 1);
	function checkScroll(){
		header[0].style.display	= $(window).scrollTop() === 0 ? "none" : "flex";
		$("#center-name").children()[0].className = $(window).scrollTop() === 0 ? "" : "fade";
		$("#main")[0].style.background = $(window).scrollTop() === 0 ? "black" : "black";

	}
	function showHeader(){
		header[0].style.display	= $(window).scrollTop() === 0 ? "none" : "flex";
		$("#center-name").children()[0].className = $(window).scrollTop() === 0 ? "" : "fade";
		$("#main")[0].style.background = $(window).scrollTop() === 0 ? "black" : "white";
	}

	function goToTab(e){
		e.currentTarget.style.color = "red";
		for (var i = 0; i < $(".tabs li").length; i++){
			if ($(".tabs li")[i] !== e.currentTarget){
				$(".tabs li")[i].style.color = "white";
			}
		}
		var idx = $(".tabs li").index(e.currentTarget);
		var tabPage = $("#resume > section")[idx];
		$(tabPage).show();
		for (var i = 0; i < $("#resume > section").length; i++){
			if ($("#resume > section")[i] !== tabPage){
				$($("#resume > section")[i]).hide();
			}
		}

	}


	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Touch?
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Forms.
			var $form = $('form');

			// Auto-resizing textareas.
				$form.find('textarea').each(function() {

					var $this = $(this),
						$wrapper = $('<div class="textarea-wrapper"></div>'),
						$submits = $this.find('input[type="submit"]');

					$this
						.wrap($wrapper)
						.attr('rows', 1)
						.css('overflow', 'hidden')
						.css('resize', 'none')
						.on('keydown', function(event) {

							if (event.keyCode == 13
							&&	event.ctrlKey) {

								event.preventDefault();
								event.stopPropagation();

								$(this).blur();

							}

						})
						.on('blur focus', function() {
							$this.val($.trim($this.val()));
						})
						.on('input blur focus --init', function() {

							$wrapper
								.css('height', $this.height());

							$this
								.css('height', 'auto')
								.css('height', $this.prop('scrollHeight') + 'px');

						})
						.on('keyup', function(event) {

							if (event.keyCode == 9)
								$this
									.select();

						})
						.triggerHandler('--init');

					// Fix.
						if (skel.vars.browser == 'ie'
						||	skel.vars.mobile)
							$this
								.css('max-height', '10em')
								.css('overflow-y', 'auto');

				});

			// Fix: Placeholder polyfill.
				$form.placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Menu.
			var $menu = $('#menu');

			$menu.wrapInner('<div class="inner"></div>');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menu
				.appendTo($body)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						if (href == '#menu')
							return;

						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				})
				.append('<a class="close" href="#menu">Close</a>');

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('click', function(event) {

					// Hide.
						$menu._hide();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

				});

	});

})(jQuery);
