$(document).on("ready", function(){
	$(".js-album-heading").hide();

	$(".js-submit").on("submit", function(event){
		event.preventDefault();

		var theArtist = $("#artist-name").val();
		console.log(theArtist);

		$.ajax({
			url: "https://api.spotify.com/v1/search?type=artist&query=" + theArtist,
			success: function(theData){
				console.log("It worked!");
				console.log(theData);
				displayInfo(theData.artists.items)
			},
			error: function(theError){
				console.log("It failed.");
				console.log(theError.responseJSON);
			}
		})

	});
});

function displayInfo(the_array){
	the_array.forEach(function(the_item){
		if (the_item.images.length > 0){
			var html = `
				<li>
					<p>Name: ${the_item.name}</p>
					<img src="${the_item.images[0].url}" width="350px">
					<button class="btn btn-primary js-album-btn" data-artist-id="${the_item.id}">Search Albums</button>
				</li>`;
		} else { 
			var html = `
				<li>
					<p>Name: ${the_item.name}</p>
					<button class="btn btn-primary js-album-btn" data-artist-id="${the_item.id}">Search Albums</button>
				</li>`
		}
		$(".js-info").append(html);
	});

	$(".js-info").on("click", ".js-album-btn", function(event){
			var btn = event.currentTarget;
			var id = $(btn).data("artist-id");

				$.ajax({
				url: `https://api.spotify.com/v1/artists/${id}/albums`,
				data: id,
				success: function(Data){
					console.log("It worked!");
					console.log(Data.items[0].name);
					displayAlbums(Data.items)
				},
				error: function(theError){
					console.log("It failed.");
					console.log(theError.responseJSON);
				}
			});
	});
};

function displayAlbums(the_array){
	the_array.forEach(function(the_item){
		var htmlAlbum = `
			<li>
				<p>Albums: ${the_item.name}</p>
			</li>`
	$(".js-album-heading").show();
	$(".js-album").append(htmlAlbum);
	})
}