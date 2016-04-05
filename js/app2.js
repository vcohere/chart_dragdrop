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

	var charts = {
		bar1: [
			'#bar_chart',
			options,
			"<div style='width: 100%; height: 100%' class='chart' draggable='true'></div>"
		]
	};

	var $grid = $('#body').masonry({
		itemSelector: '.block'
	});

	$('.elem').draggable({
		revert: function(e) {
			var revertDuration = 500;

			if (e && e.hasClass('block') && !e.hasClass('active')) {
				revertDuration = 0;
				appendGraph($(this), e);
				e.addClass('active');
			}

			$('.elem').draggable('option', 'revertDuration', revertDuration);
			return true;
		}
	});

	$('.block').droppable({
		accept: '.elem'
	});

	$('.block').on('click', '.fa-times', function() {
		var $block = $(this).closest('.block.active');

		$block.removeClass('active').find('.chart').remove();
		$block.width($block.attr('basewidth'));
		$grid.masonry('layout');
	});

	$('.block').on('click', '.fa-arrows-h', function() {
		var $block = $(this).closest('.block.active');

		if ($block.attr('horizon') == '1')
			$block.attr('horizon', '2').width(parseInt($block.outerWidth(true)) + parseInt($block.outerWidth()));
		else if ($block.attr('horizon') == '2')
			$block.attr('horizon', '3').width(parseInt($block.outerWidth(true)) + parseInt($block.attr('basewidth')));
		else
			$block.attr('horizon', '1').width($block.attr('basewidth'));
		$grid.masonry('layout');
		window.dispatchEvent(new Event('resize'));
	});

	var appendGraph = function(dragged, dropped) {
		var graph = dragged.attr('graph');

		for (var i in charts) {
			if (i == graph) {
				dropped.append(charts[i][2]);
				dropped.find('.chart').highcharts(charts[i][1]);
			}
		}
	};
});
