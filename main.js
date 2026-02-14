const form = document.getElementById("form");
const ratingState = document.getElementById("rating-state");
const thankYouState = document.getElementById("thank-you-state");
const ratingDisplay = document.getElementById("rating-display");
const ratingButtons = document.querySelectorAll(".rating");
const submitBtn = document.getElementById("submit-btn");

// Tiny observable store with localStorage persistence
const store = (() => {
  const KEY = "fm_rating";
  const listeners = new Set();
  let rating = (() => {
    const raw = localStorage.getItem(KEY);
    return raw ? Number(raw) : null;
  })();

  function notify() {
    listeners.forEach((fn) => fn(rating));
  }

  return {
    get() { return rating; },
    set(value) {
      rating = value === null ? null : Number(value);
      if (rating === null) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, String(rating));
      notify();
    },
    subscribe(fn) { listeners.add(fn); fn(rating); return () => listeners.delete(fn); }
  };
})();

// Update UI whenever store changes
const updateUI = (selectedRating) => {
  ratingButtons.forEach((btn) => {
    const val = Number(btn.dataset.value);
    const isSelected = selectedRating === val;
    btn.classList.toggle("selected", isSelected);
    btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
  submitBtn.disabled = selectedRating == null;
};

store.subscribe(updateUI);

// Button interactions write to the store
ratingButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = Number(btn.dataset.value);
    store.set(value);
  });

  // support keyboard activation (Enter / Space)
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const value = Number(btn.dataset.value);
      store.set(value);
    }
  });
});

// Submit reads from the store and shows thank-you state
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const rating = store.get();
  if (rating == null) {
    alert("Please select a rating before submitting.");
    return;
  }

  ratingDisplay.textContent = rating;
  ratingState.classList.add("hidden");
  thankYouState.classList.remove("hidden");
});

