// VIDEO FEATURED
// -----------------------------------------------
// Toggles placing video poster overlays over
// YouTube Video Player iframes on homepage.
// Stops/Starts videos.


// Loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {

	$('.video-featured__video .embed-responsive-item').each(function(){
		player = new YT.Player($(this).attr('id'), {
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});

		// Prevent tabindex when not playing
		$(this).attr('tabindex', '-1');
	});

}


function onPlayerReady(event) {
	var $iframe = $(event.target.getIframe());
	var $article = $iframe.closest('.video-featured');
	var $videoFeature_poster 	= $article.find('.video-featured__video__poster');

	$videoFeature_poster.click(function(e){
		event.target.playVideo();
	});

}

function onPlayerStateChange(event) {
	var $iframe = $(event.target.getIframe());
	var $article = $iframe.closest('.video-featured');
	var $videoFeature_poster 	= $article.find('.video-featured__video__poster');

	switch (event.data) {
    case YT.PlayerState.UNSTARTED:
    case YT.PlayerState.BUFFERING:
    case YT.PlayerState.PLAYING:

			$iframe.attr('tabindex', 0).focus(); // apply focus when video is playing
			$article.addClass('video-featured__video--playing');
			break;

    case YT.PlayerState.PAUSED:
		case YT.PlayerState.ENDED:

			$iframe.attr('tabindex', '-1');
      $article.removeClass('video-featured__video--playing');

			setTimeout(function(){
				$videoFeature_poster.focus(); // apply focus back to poster when video is paused/ended
			}, 100);
			break;
	}

}

// Video animate in

var $videoAnimate = $('.js-animate--in');

$(function(){

	setTimeout(function(){
		$.each($videoAnimate, function(){
			$(this).removeClass('js-animate--in');
		});
	}, 1000);

});
