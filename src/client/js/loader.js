// Assign variables to HTML elements
const loader = document.querySelector(".header__loader");
const submitBtn = document.querySelector("#generate");

// Add/remove hidden class to/from element
const showLoader = () => {
  loader.classList.remove("hidden");
};

const hideLoader = () => {
  loader.classList.add("hidden");
};

// Show loader on form submit
submitBtn.addEventListener("click", showLoader);

export { showLoader, hideLoader };
