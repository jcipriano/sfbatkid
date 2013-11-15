$(function() {

	var batkid = {};

	batkid.search = function () {
		if(!batkid.searching) {
			batkid.searching = true;
		  $.ajax({
		    type: 'GET',                                
		    url: '/search/sfbatkid-filter:retweets' + (batkid.max_id ? '/' + batkid.max_id : ''),                        
		    data: {            
		    },
		    success: function(resp){
		      batkid.searchSuccess(resp);
		    }
		  });
		}
	};

	batkid.searchSuccess = function (data) {
		batkid.max_id = data.search_metadata.max_id;
		var photos = batkid.parsePhotos(data);
		batkid.render(photos);
	};

	batkid.parsePhotos = function (data) {

		var photos = [],
		tweet,
		min_id;

		$.each(data.statuses, function() {
			if(this.entities.media) {
				tweet = this;
				if(!batkid.min_id || this.id < batkid.max_id){
					batkid.max_id = this.id;
				}

				$.each(this.entities.media, function() {
					if(this.type = 'photo') {
						var r = 250 / this.sizes.large.w,
						height = r * this.sizes.large.h;
						photos.push({
							url: this.media_url,
							text: tweet.text,
							height: height
						});
					}
				});
			}
		});

		return photos;
	};

	batkid.render = function (photos) {

		var $newItems = $( Mustache.render( $('#photo-tmp').html(), { photos: photos }) );
		
		if(!batkid.rendered) {
			$('#photo-holder').append($newItems);
			$('#photo-holder').isotope({
			  itemSelector : '.photo-item',
			  layoutMode : 'masonry'
			});

			batkid.rendered = true;
		} else {
			$('#photo-holder').isotope('insert', $newItems);
		}

		batkid.searching = false;
	};

	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			batkid.search();
		}
 	});

	batkid.search();
	
});


