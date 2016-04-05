(function($) {
	$.fn.drag = function(options) {
		var config = $.extend({}, {
			dragItems: '.elem',
			dropItems: '.block',
			defaultZoneId: 'menu',
			graphZoneId: 'body',
			beforeHTML: $('<img src="img/graph.gif" class="elem" draggable="true" />')[0],
			afterHTML: $('<img src="img/graph_done.png" class="elem" draggable="true" />')[0]
		}, options);
		var dragged = null;

		var cursorIn = function(e) {
			var res;

			$('.block').each(function() {
				var offset = $(this).offset();
				offset.right = offset.left + $(this).width();
				offset.bottom = offset.top + $(this).height();

				if (e.pageX < offset.right && e.pageX > offset.left &&
					e.pageY > offset.top && e.pageY < offset.bottom) {
					res = $(this);

					$('.elem.dragging').closest('.block').attr('style', '');
					$(this).append($('.elem.dragging'));
					$('.elem.dragging').attr('style', '').removeClass('dragging');
					window.dispatchEvent(new Event('resize'));
					return false;
				}
			});
			$('.elem.dragging').attr('style', '').removeClass('dragging');
		};

		this.mousedown(function() {
			dragged = $(this);
			dragged.closest('.elem').addClass('dragging').after('<div class="elem temp"></div>');

			$(document).mousemove(function(e) {
				if (e.buttons !== 1) {
					$(document).off('mousemove');
					return false;
				}
				window.getSelection().removeAllRanges();
				dragged.closest('.elem').css({top: e.pageY - (dragged.height() / 2), left: e.pageX - (dragged.width() / 2), position: 'fixed'});
			});
		});

		$(document).mouseup(function(e) {
			if ($('.elem').hasClass('dragging')) {
				$('.elem.temp').remove();
				cursorIn(e);
				$('#chart_div').unbind();
				$('.elem.dragging').removeClass('dragging');
			}
		});

		$('.elem .handles .resize_horizon').click(function() {
			var block = $(this).closest('.block'),
				elem = $(this).closest('.elem');

			if (block.parent().is('#chart_menu'))
				return false;
			if (elem.attr('horizon') == '1') {
				block.width(block.width() * 2 + parseInt(block.css('margin-left')) * 2);
				elem.attr('horizon', '2');
			}
			else if (elem.attr('horizon') == '2') {
				block.width(block.width() * 1.5 + parseInt(block.css('margin-left')) * 2);
				elem.attr('horizon', '3');
			}
			else {
				block.width('');
				elem.attr('horizon', '1');
			}
			window.dispatchEvent(new Event('resize'));
		});

		$('.elem .handles .resize_vertical').click(function() {
			var block = $(this).closest('.block'),
				elem = $(this).closest('.elem');

			if (block.parent().is('#chart_menu'))
				return false;
			if (elem.attr('vertical') == '1') {
				block.height(block.height() * 2 + parseInt(block.css('margin-top')) * 2);
				elem.attr('vertical', '2');
			}
			else if (elem.attr('vertical') == '2') {
				block.height(block.height() * 1.5 + parseInt(block.css('margin-top')) * 2);
				elem.attr('vertical', '3');
			}
			else {
				block.height('');
				elem.attr('vertical', '1');
			}
			window.dispatchEvent(new Event('resize'));
		});
	}
})(jQuery);

$(document).ready(function() {
	var options = {
		chart: {
			type: 'bar'
		},
		title: {
			text: 'Chart Test'
		},
		series: [{
			name: 'Salut',
			data: [1, 0, 4]
		}, {
			name: 'Plop',
			data: [2, 6, 3]
		}]
	};

	var options2 = {
		chart: {
			type: 'bar'
		},
		title: {
			text: 'Chart Test'
		},
		series: [{
			name: 'OKAY',
			data: [1, 0, 4]
		}, {
			name: 'SALUT',
			data: [2, 6, 3]
		}]
	};

	$('#bar_chart').highcharts(options);
	$('#bar_chart2').highcharts(options2);
	$('#bar_chart3').highcharts(options);
	$('#bar_chart4').highcharts(options);
	$('#bar_chart5').highcharts(options);
	$('#bar_chart6').highcharts(options);

	$('.elem .drag').drag();

	$('#body').masonry({
		itemSelector: '.block'
	});

	$('#icons .hide').click(function() {
		$('.elem .handles').toggleClass('hidden');
		if ($('.elem .handles:first').hasClass('hidden'))
			$(this).removeClass('fa-eye').addClass('fa-eye-slash');
		else
			$(this).removeClass('fa-eye-slash').addClass('fa-eye');
	});

	$('#icons .refresh').click(function() {
		window.dispatchEvent(new Event('resize'));
	});
});
