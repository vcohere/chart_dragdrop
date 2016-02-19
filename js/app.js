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
			dragged.closest('.elem').addClass('dragging');

			$('#chart_div').mousemove(function(e) {
				if (e.buttons !== 1) {
					$('#chart_div').unbind();
					return false;
				}
				window.getSelection().removeAllRanges();
				dragged.closest('.elem').css({top: e.pageY - (dragged.height() / 2), left: e.pageX - (dragged.width() / 2), position: 'fixed'});
			});
		});

		$(document).mouseup(function(e) {
			if ($('.elem.dragging').length > 0) {
				cursorIn(e);
				$('#chart_div').unbind();
				$('.elem.dragging').removeClass('dragging');
			}
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

	$('#bar_chart').highcharts(options);
	$('#bar_chart2').highcharts(options);
	$('#bar_chart3').highcharts(options);

	$('.elem .drag_handle').drag();
});
