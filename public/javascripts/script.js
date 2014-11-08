$(window)
	.konami({
		cheat: function() {
			doKonami();
		}
	});
$(document)
	.ready(function() {
		$(".scroll-link")
			.on("click", function(e) {
				e.preventDefault();
				scrollToID($(this));
			});
		$(window).on('scroll', function(e) {
			if ($("body").offset().top < 0) {
				$("body").find(".navbar").addClass("scrolled");
			} else {
				$("body").find(".navbar").removeClass("scrolled");
			}
		});
		$(".choice").on("click", function() {
			var dataChoice = $(this).data("choice");
			$.each($("#comoComprar .explanations .explanation"), function(k, v) {
				if ($(this).data("choice") == dataChoice) {
					$(this).addClass("fadeInUp").removeClass("fadeOutDown").removeClass("hidden");
				} else {
					$(this).addClass("fadeOutDown").removeClass("fadeInUp").addClass("hidden");
				}
			});

		});
		$("#comoComprar i.animated").addClass("dontshow").viewportChecker({
			classToAdd: 'show zoomIn',
			offset: 100,
			repeat: false,
			callbackFunction: function(elem, action) {
				console.log("VISIBLE");
			} // Callback to do after a class was added to an element. Action will return "add" or "remove", depending if the class was added or removed

		});
		$("a.snLink").on("click",function(e){
			e.preventDefault();
			var redirect = function (location) {
			    var iframe = document.createElement('iframe');
			    iframe.setAttribute('src', location);
			    iframe.setAttribute('width', '1px');
			    iframe.setAttribute('height', '1px');
			    iframe.setAttribute('position', 'absolute');
			    iframe.setAttribute('top', '0');
			    iframe.setAttribute('left', '0');
			    document.documentElement.appendChild(iframe);
			    iframe.parentNode.removeChild(iframe);
			    iframe = null;
			};
			var App = $(this).data("sn_app");
			var Adress = $(this).data("sn_address");
			setTimeout(function () { redirect(Adress); }, 25);
			redirect(App);
		});
	});

function doKonami() {
	console.log("CHEATCODE!");
	$("body")
		.append("<img id='nyan' src='images/nyan.gif' style='display:none;z-index:1000;'>");
	$.getScript("/javascripts/howler.min.js", function(e) {
		var sound = new Howl({
			urls: ['/audio/konami/o_nyan.mp3'],
			loop: true,
			autoplay: true,
			onplay: function() {
				$("#nyan")
					.show();
				$(document)
					.mousemove(function(e) {
						$('#nyan')
							.offset({
								left: e.pageX + 1,
								top: e.pageY + 1
							});
					});
			}
		});
	});
}

function scrollToID(id, speed) {
	var navOffSet = $("#main-nav .navbar-header")
		.height();
	var aBuscar = id.attr("href");
	var targetOffset = 0;
	if (aBuscar != "#home") {
		targetOffset = $(aBuscar)
			.offset()
			.top - navOffSet;
	}
	var mainNav = $('#main-nav');
	if (!speed) {
		speed = 800;
	}
	$('html,body')
		.animate({
			scrollTop: targetOffset
		}, speed);
	if (mainNav.find(".navbar-collapse").hasClass("in")) {
		mainNav.find(".navbar-collapse").collapse("hide");
	}
}