const form = document.getElementById("form");
const ratingState = document.getElementById("rating-state");
const thankYouState = document.getElementById("thank-you-state");
const ratingDisplay = document.getElementById("rating-display");
const ratings = document.querySelectorAll("#rating");
let currRating = 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    displayRating()
})

// Take the clicked btn rate and store it in a var
ratings.forEach((rating) => {
    rating.addEventListener("click", () => {
        resetSelection()
        currRating = rating.textContent;
        rating.classList.add("selected")
    })
})

const resetSelection = () => {
    ratings.forEach((rating) => {
        rating.classList.remove("selected")
    })
}

const displayRating = () => {
    // 1. In id="rating" put the innertext to be the selected rate
    ratingDisplay.innerHTML = currRating;

    // 2. hide the form display, show the thank-you display
    ratingState.classList.add("hidden")
    thankYouState.classList.remove("hidden")
} 
