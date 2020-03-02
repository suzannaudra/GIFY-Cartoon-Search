
document.write()

var topics = ["Family Guy", "Rocket Power", "Looney Tunes", "Ren & Stimpy", "Animaniacs", "Rugrats", "The Simpsons", "Doug", "Powerpuff Girls"];
console.log(topics)
function createButtons() {
  $('#buttons').html('')
for (let i = 0; i < topics.length; i++) {
  let button = document.createElement("button");
  button.innerHTML = topics[i];
  button.classList.add("topicbutton")
  $('#buttons').prepend(button);
};
}
createButtons()


  $(document).on("click",".topicbutton", function() {
    var name= $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    console.log(name)

     
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      .then(function(response) {
        var results = response.data;
        $("#gifs-appear-here").html('');
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var topicsImage = $("<img>");
          topicsImage.attr("src", results[i].images.fixed_height_still.url);
          topicsImage.attr("data-animate", results[i].images.fixed_height.url);
          topicsImage.attr("data-state","still");
          topicsImage.attr("data-still", results[i].images.fixed_height_still.url);
          
          topicsImage.addClass("cartoon");

          gifDiv.prepend(p);
          gifDiv.prepend(topicsImage);
          
          
          $("#gifs-appear-here").append(gifDiv);
        }
      })});

        
        //STILL ANIMATE.ON CLICK TO GIFS
        $(document).on('click',".cartoon",function(){
          var state = $(this).attr("data-state");
          if(state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
         } });
        
         
         ///ADD SEARCH BOX TO ADD BUTTONS 
         $("#submit").on("click", function() {
           var value = $("#searchbox").val()
           console.log ("submit")
    topics.push(value);
    createButtons() 
  })
    