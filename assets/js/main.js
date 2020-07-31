/*====================================================
  TABLE OF CONTENT
  1. function declearetion
  2. Initialization
====================================================*/

/*===========================
 1. function declearetion
 ==========================*/
var themeApp = {

	setNavbar: function() {
		if(typeof fixed_navbar != "undefined" && fixed_navbar == true) {
			$('#main-navbar').addClass('navbar-fixed-top');
			$('body').addClass('has-fixed-navbar');
		}
	},

	latestSlider: function() {
		var latest = $("#title-slider");
		var latestPost;
		if(latest.length && typeof Latest_slider_post_count !== 'undefined') {
			var string = '';
			$.get(latestPosts).done(function (data){
				latestPost = data.posts;
				if (latestPost.length > 0) {
					for(i = 0; i< latestPost.length ; i++) {
						var title = latestPost[i].title;
						var link = latestPost[i].url;						
						var tags = latestPost[i].tags;
						var tag_link = '';
						for(j = 0; j< tags.length ; j++) {
							var tag_name = tags[j].name;
							var tag_slug = tags[j].slug;
							tag_link += '<a class="tagged-in" href="/tag/'+tag_slug+'/">'+tag_name+'</a>';
						}
						string +='<div class="item">\
								'+tag_link+'\
								<a href="'+link+'" class="heading" title="'+title+'">'+title+'</a>\
							</div>';
					}
					latest.append(string);
					latest.owlCarousel({
						singleItem : true,
						autoPlay : 4000,
						pagination : false,
						slideSpeed : 100,
						paginationSpeed : 100,
						transitionStyle : "goDown",
					});
				}
			}).fail(function (err){
				console.log(err);
			});
			$(".latest-prev").click(function(e){
				e.preventDefault();
				latest.trigger('owl.prev');
			});
			$(".latest-next").click(function(e){
				e.preventDefault();
				latest.trigger('owl.next');
			});
		}
	},

	specialPostsSetOne: function(data){
		if($('#category-container-1').length && typeof special_tag_one !== 'undefined' && typeof tag_one_post_count !== 'undefined') {
			var filteredPosts;
			$.get(featuredSetOne).done(function (data){
				filteredPosts = data.posts;
				var string = '';
				if (filteredPosts.length > 0) {
					string = '<div class="category-wrap" id="category-type-one">\
						<h2 class="h4 category-name"><span>'+special_tag_one.replace(/-/g, ' ')+'</span></h2>\
						<div class="row default-layout">';
					for(i = 0; i< filteredPosts.length ; i++) {
						if( i < tag_one_post_count) {
							var title = filteredPosts[i].title;
							var link = filteredPosts[i].url;
							var image_link = filteredPosts[i].feature_image;
                            var tags = filteredPosts[i].tags;
							var published_at = themeApp.formatDate(filteredPosts[i].published_at);
							var content = $(filteredPosts[i].html).text().replace("<code>", "&lt;code&gt;").replace("<", "&lt;").replace(">", "&gt;");
							var content = content.split(/\s+/).slice(0,50).join(" ");
							var featured_media = '';
							var tag_link = '';
							for(j = 0; j< tags.length ; j++) {
								var tag_name = tags[j].name;
								var tag_slug = tags[j].slug;
								tag_link += '<a href="/tag/'+tag_slug+'/">'+tag_name+'</a>';
							}
							if (image_link !== null) {
								featured_media = '<div class="featured-media">\
										<a href="'+link+'" title="'+title+'">\
											<div class="image-container" style="background-image: url('+image_link+');">\
											</div>\
										</a>\
										<div class="tag-list">'+tag_link+'</div>\
									</div>';
							} else {
								featured_media = '<div class="featured-media">\
										<div class="tag-list">'+tag_link+'</div>\
									</div>';
							}
							string += '<!-- start post -->\
								<article class="col-sm-6 post-wrap">\
								'+featured_media+'\
									<h2 class="title h3"><a href="'+link+'">'+title+'</a></h2>\
									<div class="post-meta">\
			                            <span class="date">\
			                                <i class="fa fa-calendar-o"></i>&nbsp;' + published_at + '\
			                            </span>\
			                            <span class="comment">\
			                                <i class="fa fa-comment-o"></i>\
			                                <a href="'+link+'#disqus_thread">0 Comments</a>\
			                            </span>\
									</div>\
									<div class="post-entry">'+content+'</div>\
									<a class="permalink" href="'+link+'">Read More...</a>\
								</article>\
                                <!-- end post -->';
                            if(0 == (i+1) % 2) {
                                string += '<div class="clearfix"></div>'
                            }
						}
					}
					string += '</div></div>';
					$("#category-container-1").append(string);
					themeApp.commentCount();
				}
			}).fail(function (err){
				console.log(err);
			});
		}
	},

	specialPostsSetTwo: function(data) {
		if($('#category-container-2').length && typeof special_tag_two !== 'undefined' && typeof tag_two_post_count !== 'undefined') {
			var filteredPosts;
			$.get(featuredSetTwo).done(function (data){
				filteredPosts = data.posts;
				var string = '';
				if (filteredPosts.length > 0) {
					string = '<div class="category-wrap">\
						<h2 class="h4 category-name"><span>'+special_tag_two.replace(/-/g, ' ')+'</span></h2>\
						<div class="row default-layout">'
					for(i = 0; i< filteredPosts.length ; i++) {
						if( i < tag_two_post_count) {
							var title = filteredPosts[i].title;
							var link = filteredPosts[i].url;
							var image_link = filteredPosts[i].feature_image;
							var tags = filteredPosts[i].tags;
							var published_at = themeApp.formatDate(filteredPosts[i].published_at);
							var content = $(filteredPosts[i].content).text().replace("<code>", "&lt;code&gt;").replace("<", "&lt;").replace(">", "&gt;");
							var content = content.split(/\s+/).slice(0,50).join(" ");
							var featured_media = '';
							var featured_media_small = '';
							var post_class = '';
							var category_link = '';
							var tag_link = '';
							for(j = 0; j< tags.length ; j++) {
								var tag_name = tags[j].name;
								var tag_slug = tags[j].slug;
								tag_link += '<a href="/tag/'+tag_slug+'/">'+tag_name+'</a>';
							}
							if ( image_link !== null) {
								featured_media = '<div class="featured-media">\
										<a href="'+link+'">\
											<div class="image-container" style="background-image: url('+image_link+');">\
											</div>\
										</a>\
										<div class="tag-list">'+tag_link+'</div>\
									</div>';
								featured_media_small = '<div class="featured-media">\
										<a href="'+link+'">\
											<div class="image-container" style="background-image: url('+image_link+');">\
											</div>\
										</a>\
									</div>';
							} else {
								post_class = 'no-image';
							}
							if(i == 0) {
								string += '<!-- start post -->\
									<article class="col-sm-6 post-wrap">\
									'+featured_media+'\
										<h2 class="title h3"><a href="'+link+'">'+title+'</a></h2>\
										<div class="post-meta">\
				                            <span class="date">\
				                                <i class="fa fa-calendar-o"></i>&nbsp;'+published_at+'\
				                            </span>\
				                            <span class="comment">\
				                                <i class="fa fa-comment-o"></i>\
				                                <a href="'+link+'#disqus_thread">0 Comments</a>\
				                            </span>\
										</div>\
										<div class="post-entry">'+content+'</div>\
										<a class="permalink" href="'+link+'">Read More...</a>\
									</article>\
									<!-- end post -->';
							} else {
								string +='<!-- start post -->\
							<article class="col-sm-6 post-wrap small-entry '+post_class+' clearfix">\
								'+featured_media_small+'\
								<div class="post-details">\
								<div class="tag-list">'+tag_link+'</div>\
									<h2 class="title h5"><a href="'+link+'">'+title+'</a></h2>\
									<div class="post-meta">\
			                            <span class="date">\
			                                <i class="fa fa-calendar-o"></i>&nbsp;'+published_at+'\
			                            </span>\
			                            <span class="comment">\
			                               <i class="fa fa-comment-o"></i>\
				                                <a href="'+link+'#disqus_thread">0 Comments</a>\
			                            </span>\
									</div>\
								</div>\
							</article>\
							<!-- end post -->';
							}
						}
					}
					string += '</div></div>';
					$('#category-container-2').append(string);
					themeApp.commentCount();
				}
			}).fail(function (err){
				console.log(err);
			});
		}
	},
	formatDate: function(dt) {
		var d = new Date(dt);
		var month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var month = month_name[d.getMonth()];
		var date = d.getDate();
		var year = d.getFullYear();
		var formatted_dt = month+' '+date+','+' '+year;
		return formatted_dt;
	},

	responsiveIframe: function() {
		$('.full-post').fitVids();
	},

	commentCount: function () {
	    var s = document.createElement('script'); s.async = true;
	    s.type = 'text/javascript';
	    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
	    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
	},

	highlighter: function() {
		$('pre code').each(function(i, block) {
		    hljs.highlightBlock(block);
		});
	},

	facebook:function() {
		if ($('.fb').length && typeof facebook_page_url !== 'undefined' && facebook_page_url !== '') {
			var facebook_sdk_script = '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4";fjs.parentNode.insertBefore(js, fjs);}(document, \'script\', \'facebook-jssdk\'));</script>'
			var fb_page = '<div class="fb-page" data-href="'+facebook_page_url+'" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore">Facebook</div></div>';
			$('body').append(facebook_sdk_script);
			$('.fb').append(fb_page);
			$(".fb").fitVids();
		}
	},

	SearchProcess: function() {
        var list = [];
        $('#search-open').on('click', function(e) {
            e.preventDefault();
            // if (list.length == 0 && typeof searchApi !== undefined) {
            //     $.get(searchApi)
            //     .done(function(data){
            //         list = data.posts;
            //         search();
            //     })
            //     .fail(function (err){
            //         console.log(err);
            //     });
            // }
            $('.search-popup').addClass('visible');
            $('#search-input').css('visibility', 'visible').focus();
        });
        $('.close-button').on('click', function(e) {
            e.preventDefault();
            $('.search-popup').removeClass('visible');
            $('#search-input').val("");
            $("#search-results").empty();
        });
        function search() {
            if(list.length > 0) {
                var options = {
                    shouldSort: true,
                    tokenize: true,
                    matchAllTokens: true,
                    threshold: 0,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [{
                        name: 'title'
                    }, {
                        name: 'plaintext'
                    }]
                }
                fuse = new Fuse(list, options);
                $('#search-input').on("keyup", function(){
                    keyWord = this.value;
                    var result = fuse.search(keyWord);
                    var output = '';
                    var language = $('html').attr('lang');
                    $.each(result, function(key, val) {
                        var pubDate = new Date(val.published_at).toLocaleDateString(language, {
                            day:'numeric',
                            month: 'long',
                            year: 'numeric'
                        })
                        output += '<div id="'+ val.id +'" class="result-item">';
                        output += '<a href="'+ val.url +'"><div class="title">'+ val.title +'</div>';
                        output += '<div class="date">' + pubDate + '</div></a>';
                        output += '</div>';
                    });
                    $("#search-results").html(output);
                });
            }
        }
    },
	gallery: function() {
		var images = document.querySelectorAll('.kg-gallery-image img');
		images.forEach(function (image) {
			var container = image.closest('.kg-gallery-image');
			var width = image.attributes.width.value;
			var height = image.attributes.height.value;
			var ratio = width / height;
			container.style.flex = ratio + ' 1 0%';
		});
		mediumZoom('.kg-gallery-image img', {
			margin: 30
		});
	},
	backToTop: function() {
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
	},
	notifications: function() {
		// Parse the URL parameter
		function getParameterByName(name, url) {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, '\\$&');
			var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, ' '));
		}

		// Give the parameter a variable name
		var action = getParameterByName('action');
		var stripe = getParameterByName('stripe');

		if (action == 'subscribe') {
			$('body').addClass("subscribe-success");
		}
		if (action == 'signup') {
			window.location = '/signup/?action=checkout';
		}
		if (action == 'checkout') {
			$('body').addClass("signup-success");
		}
		if (action == 'signin') {
			$('body').addClass("signin-success");
		}
		if (stripe == 'success') {
			$('body').addClass("checkout-success");
		}
		$('.notification-close').click(function () {
			$(this).parent().addClass('closed');
			var uri = window.location.toString();
			if (uri.indexOf("?") > 0) {
				var clean_uri = uri.substring(0, uri.indexOf("?"));
				window.history.replaceState({}, document.title, clean_uri);
			}
		});
	},
	init:function(){
		themeApp.setNavbar();
		themeApp.latestSlider();
		themeApp.specialPostsSetOne();
		themeApp.specialPostsSetTwo();
		themeApp.facebook();
		themeApp.responsiveIframe();
		themeApp.highlighter();
		themeApp.SearchProcess();
		themeApp.gallery();
		themeApp.backToTop();
		themeApp.notifications();
	}
}

/*===========================
2. Initialization
==========================*/
$(document).ready(function(){
	themeApp.init();
});