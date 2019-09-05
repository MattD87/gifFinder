//get input value from user
//make an api call and make sure it works before anything else!!

//make it all in a variable 'app'
const app = {};
app.key = "VQkQF8TMVb5lMQlzskU1xVSWJxpICeEq";

//spit data back out on page
app.displayGifs = gifs => {
  console.log("in display gifs: ", gifs);
  //loop over an array
  gifs.forEach(function(gif) {
    // console.log("Gif title: ", gif.title);
    // console.log("Gif image: ", gif.images.original_still.url)

    const gifHtml = `
                    <div class="gif-box">
                            <div class="img-box">
                                <img src="${gif.images.original_still.url}" alt="">
                            </div>
                            <p class="gif-title">${gif.title}</p>
                        </div>
                    `;
    $(".results").append(gifHtml);
  });
};

//make an API call
app.getGifs = query => {
  console.log(`Getting Gifs...`);
  console.log("Query in getGifs: ", query);
  $.ajax({
    url: "https://api.giphy.com/v1/gifs/search",
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.key,
      q: query
    }
  }).then(res => {
    // console.log ("Result of getGifs", res.data);

    const gifArray = res.data;
    //once we have gifs, display gifs to page
    app.displayGifs(gifArray);
  });
};

app.init = () => {
  console.log(`App initialized...`);
  //get input value from user
  $("form").on("submit", function(e) {
    e.preventDefault();
    //empty out results container with each search
    $(`.results`).empty();
    console.log("form submitted...");
    //get input from user
    const userInput = $('input[type="text"]').val();
    //send user input into app.getGifs for api call.
    app.getGifs(userInput);
  });
};

//document ready
$(() => {
  console.log(`Document Ready...`);
  //initialize app
  app.init();
});
