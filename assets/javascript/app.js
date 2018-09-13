// Initial array of animals
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

function displayAnimalGif() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=5JJXFVXCfQvjyxbwic5Gd2VCDPUquv1z&limit=10";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

    $("#gifs-view").empty();

    for (var i = 0; i < response.data.length; i++) {

      // Creating a div to hold the animal
      var animalDiv = $("<div class='animal'>");

      // Storing the rating data
      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      animalDiv.append(pOne);

      // Retrieving the URL for the image
      var imgURL = response.data[i].images.fixed_height_still.url;

      // Creating an element to hold the image
      var image = $("<img>").attr({"src":imgURL, "data-still":imgURL, "data-animate":response.data[i].images.fixed_height.url, "data-state":"still", "class":"animateImg"});

      // Appending the image
      animalDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#gifs-view").prepend(animalDiv);

    }

    // Function handling when a Gif is clicked
    $(".animateImg").on("click", function() {

      var state = $(this).attr("data-state");

      // Logic that updates the state of the Gif that is clicked
      if (state === "still") {

        $(this).attr({"src":$(this).attr("data-animate"), "data-state":"animate"});
      }
      else {

        $(this).attr({"src":$(this).attr("data-still"), "data-state":"still"});
      }
    });

  });

}

// Function for displaying animal data
function renderButtons() {

    // Deleting the animal buttons prior to adding new animal buttons
    $("#animals-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("animal-btn");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-name", animals[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(animals[i]);
      // Adding the button to the HTML
      $("#animals-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function(event) {

  // event.preventDefault() prevents the form from trying to submit itself.
  event.preventDefault();

  // This line will grab the text from the input box
  var animal = $("#animal-input").val().trim();
  // The animal from the textbox is then added to our array
  animals.push(animal);

  // calling renderButtons which handles the processing of our animals array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayAnimalGif);

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();