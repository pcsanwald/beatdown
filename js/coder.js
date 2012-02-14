$(document).ready(function() {
	focusOnInput = function() {
		$('#coderInput').focus();
	};
	
	focusOnInput();
	var clip = new ZeroClipboard.Client();
	clip.glue( 'd_clip_button', 'd_clip_container' );
	
	$('#decode').click(function(e) {
		$('#doSpaces').attr('disabled', 'disabled');
		$('#spaces').addClass('disabled');
		$('#inLabel').html("Encoded Text:");
		$('#outLabel').html("Unencoded Text:");
		focusOnInput();
		recalculate();
	});
	
	$('#encode').click(function(e) {
		$('#doSpaces').removeAttr('disabled');
		$('#spaces').removeClass('disabled');
		$('#inLabel').html("Unencoded Text:");
		$('#outLabel').html("Encoded Text:");
		focusOnInput();
		recalculate();
	});
	
	$('#doSpaces').click(function(e) {
		recalculate();
	});
	
	$('#coderInput').keyup(function(e){
		recalculate();
	});
	
	recalculate = function() {
		try {
			var val = '';
			$('#coderInput').each(function() {
				val = $(this).val();
				if ($(this).val().length == 0) {
					val = '';
				}
			});
			var action = $("input[@name=encode]:checked").attr('id');
			var result = '';
			if (action == 'encode') {
				result = escape(val);
				if (!$('#doSpaces').is(':checked')) {
					while (result.indexOf('%20') >= 0) {
						result = result.replace('%20', ' ');
					}
				}
			} else {
				result = unescape(val);
			}
			$('#result').removeClass('error');
			$('#result').html(result);
			clip.setText(result);
		} catch (err) {
			$('#result').addClass('error');
			$('#result').html(err);
			clip.setText(err);
		}
	};
});