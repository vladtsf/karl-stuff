(function ($) {

	var renderItem = function  (childs, parent, firstLevel) {
		var $wrap = $('<ul />').appendTo(parent);

		if(!firstLevel) {
			$wrap
				.css('display', 'none')
				.addClass('child');
		}

		$.each(childs, function (idx, item) {
			var
				$li = $('<li />').appendTo($wrap);
				$a = $('<a />', {
					href: '#' + item.id,
					id: item.id
				});

				$a
					.text(item.title)
					.appendTo($li);

				if($.isArray(item.sub)) {
					$a.addClass('parent');
					renderItem(item.sub, $li)
				}
		})

		return parent;
	}

	$.fn.menu = function(url) {
		$
			.getJSON(url)
			.then(function (items, status) {
				$(this).each(function (index, menu) {
					var $context = $(menu);
					renderItem(items, $context, true);

					$context
						.on('mouseenter', 'li:has(> .parent)', function (e) {
							var
								$li = $(e.currentTarget),
								$ul = $li.find(' > .child');

							$ul
								.css('position', 'absolute')
								.show();

							if($li.closest('ul').hasClass('child')) {
								$ul
									.css('margin-left', $li.width() - 15)
									.addClass('eject');
							}
						})
						.on('mouseleave', 'li:has(> .parent)', function (e) {
							var
								$li = $(e.currentTarget),
								$ul = $li.find('> .child');

							$ul
								.css('position', '')
								.removeClass('eject')
								.hide();
						})

				});
			}.bind(this));

		return this;
	};

})(jQuery);