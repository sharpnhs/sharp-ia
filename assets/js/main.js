$(function () {
    // Disable caching of AJAX responses
	$.ajaxSetup ({ cache: false });

	// Link directly to google slides (make sure link to presentation is open to everyone) using the following format:
	// https:\/\/docs.google.com/presentation/d/<PRESENTATION_ID>/export/<FORMAT>?pageid=<PAGE_ID>
	$('#svgholder').svg({loadURL: 'https://docs.google.com/presentation/d/1ofY1HkJv8ytUCaq8K_CCsKXIcBZQNbol34FviIeIilM/export/svg?pageid=p', onLoad: loadDone });	

	$(window).on('resize', function() {
		$('#svgholder svg').attr('height', $('#svgholder').css('height'));
		$('#svgholder svg').attr('width', $('#svgholder').css('width'));
		
		// keep video ratio at 16:9
		var iframeWidth = $('.modal iframe').css('width');
		var iframeHeight = 0;
		if (iframeWidth) iframeHeight = Math.floor(parseInt(iframeWidth) * 0.5625) + 'px';
		$('.modal iframe').css('height', iframeHeight);
	});
	
	$(window).resize();
}); 
 
function loadDone(svg, error) { 
	$('svg a path').on('mouseover', function() { $(this).attr('fill', '#000000').attr('fill-opacity', '0.1'); });
	$('svg a path').on('mouseout', 	function() { $(this).attr('fill', '#000000').attr('fill-opacity', '0'); });

	// open modal and load content from html
	$('svg a').on('click', function(e) {
		e.preventDefault();
		$('body').css('overflow', 'hidden'); // stop scrolling of main content when in modal mode
		$('.modal-background').css('display', 'block');
		$('.modal').css('display', 'block'); 

		// note - xlink:href works for links from google slides
		$('.modal-content').load( $(this).attr('xlink:href').slice(1) + '.html', function() {
			// on load complete
			$(window).resize(); // call resize to resize video iframes
			$('.modal-background').css('-webkit-overflow-scrolling', 'touch'); // need to call this dynamically otherwise doesn't work properly on iPhone
		} ); 
	});

	// close modal
	$('.modal .close-modal, .modal-background').on('click', function(e) {
		$('.modal-background').css('-webkit-overflow-scrolling', 'auto');
		$('body').css('overflow', 'inherit'); 
		$('.modal-background, .modal').css('display', 'none');
		$('.modal-content').html('');
	});
}
