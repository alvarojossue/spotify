$(document).on("ready", function(){

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
		var html = `
			<li>
				<p>Name: ${the_item.name}</p>
			</li>`;
		$(".js-info").append(html);
	});
}