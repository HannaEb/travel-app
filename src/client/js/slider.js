// Assign variables to HTML elements
const slides = document.querySelectorAll(".slider__slide");
const leftBtn = document.querySelector(".slider__btn--left");
const rightBtn = document.querySelector(".slider__btn--right");

// Declare variables
let currentSlide = 0;
let numOfSlides = slides.length;

// Arrange slides and display slide 0
const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

// Move to next slide
const nextSlide = () => {
  currentSlide++;

  if (currentSlide === numOfSlides - 1) {
    rightBtn.classList.add("hidden");
  }

  goToSlide(currentSlide);
  leftBtn.classList.remove("hidden");
};

// Move to previous slide
const previousSlide = () => {
  if (currentSlide === numOfSlides - 1) {
    rightBtn.classList.remove("hidden");
  } else if (currentSlide === 1) {
    leftBtn.classList.add("hidden");
  }

  currentSlide--;
  goToSlide(currentSlide);
};

// Add event listeners to move between slides
leftBtn.addEventListener("click", previousSlide);
rightBtn.addEventListener("click", nextSlide);

export { nextSlide, previousSlide };
