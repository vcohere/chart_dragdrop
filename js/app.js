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

		this.on('dragstart', function(e) {
			dragged = $(this);
		});
		this.on('dragover', function(e) {
			e.preventDefault();
		}).on('drop', function(e) {
			var elementClass = e.target.getAttribute('class'),
				parentId = e.target.parentNode.getAttribute('id');

			e.preventDefault();
			if (parentId === config.defaultZoneId)
				dragged.html(config.beforeHTML);
			else if (parentId === config.graphZoneId)
				dragged.html(config.afterHTML);
			else
				dragged.html(config.afterHTML);
			$(this).append(dragged)
		});
	}
})(jQuery);

$(document).ready(function() {
	$('#bar_chart').highcharts({
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
	});
	$('.block').drag();
});
