jQuery(function() {
	getClass = function(el) {
		cls = el.attr('class');

		return (cls != undefined) ? cls : '';
	}

	jQuery('select').each(function(){
		$this = jQuery(this);

		width = $this.outerWidth() + 1;
		height = $this.outerHeight() - 1;
		cls = getClass($this);
		selected = $this.find('option:selected').text();
		first = $this.find('option:first').text();

		if(!selected) {
			selected = first;
		}

		html =  '<div class="pp-select '+cls+'" style="min-width:'+width+'px">'+
							'<div class="selected">'+selected+'</div>'+
							'<ul style="display:none;top:'+height+'px">';

		$this.find('option').each(function(){
			$opt = jQuery(this);
			val = $opt.val();
			txt = $opt.text();
			cls = getClass($opt);

			if(txt == selected) {
				cls += ' active';
			}

			html += '<li class="'+cls+'" data-val="'+val+'">'+txt+'</li>';
	  });

		html += '</ul></div>';

		$this.hide();
		$this.after(html);
	});

	jQuery('.pp-select').hover(function() {
		jQuery(this).find('ul').show();
	});

	jQuery('.pp-select').mouseleave(function() {
		jQuery(this).find('ul').hide();
	});

	jQuery('.pp-select ul li').click(function() {
		$this = jQuery(this);
		prnt = $this.closest('.pp-select');

		prnt.find('.selected').text($this.text());
		prnt.find('ul li.active').removeClass('active');
		$this.addClass('active');
		prnt.find('ul').hide();
		prnt.prev().val($this.data('val'));
	});
});