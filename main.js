$(document).ready(function(){ 

	function searching(){

		$('#myForm').on('submit', function(e){
			e.preventDefault();

            var hashtag = $('#hashtag').val(),

			// TUMBLR
			api_key = 'fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4',
            tumInnerHtml = "",
    		tlink   = 'https://api.tumblr.com/v2/tagged?tag='+hashtag+'&type=photo&api_key='+api_key,

    		// INSTAGRAM
    		access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587",
            igInnerHtml = "",
    		instagramUrl = 'https://api.instagram.com/v1/tags/'+hashtag+'/media/recent?access_token=' + access_token;


            $.ajax({
                type: "GET",
                url: tlink,
                dataType: 'jsonp',
                success: getTumHash
            })

            function getTumHash(res){
                console.log(res);

                $.each(res.response,function(i,response){
                    style=response.photos[0].alt_sizes[1].url;
                    tumInnerHtml += 
                    '<div class="ind"><div class="image">' +
                    '<h2>' + response.blog_name + '</h2>' +
                    '<a target="_blank" href="'+response.post_url+'"><img src="'+style+'"></a>' + 
                    '</div></div>'
                })

                target = $("#target");
                target.prepend(tumInnerHtml);
            }

            
            $.ajax({
                type: "GET",
                url: instagramUrl,
                dataType: 'jsonp',
                success: getIgHash
            })

            function getIgHash(results){
                console.log(results);

                $.each(results.data,function(i,data){
                    style=data.images.low_resolution.url;
                    igInnerHtml += 
                    '<div class="ind"><div class="image">' +
                    '<h2>' + data.user.username + '</h2>' +
                    '<a target="_blank" href="'+data.link+'"><img src="'+style+'"></a>' + 
                    '</div></div>'
                })

                target = $("#target");
                target.prepend(igInnerHtml);
            };


            });
        
    };


searching();



});

