const slides = document.querySelectorAll(".slide");
const leftBtn = document.querySelector(".slider__btn--left");
const rightBtn = document.querySelector(".slider__btn--right");

let currentSlide = 0;
let numOfSlides = slides.length;

const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

const nextSlide = () => {
  currentSlide++;

  if (currentSlide === numOfSlides - 1) {
    rightBtn.classList.add("hidden");
  }

  goToSlide(currentSlide);
  leftBtn.classList.remove("hidden");
};

const previousSlide = () => {
  if (currentSlide === numOfSlides - 1) {
    rightBtn.classList.remove("hidden");
  } else if (currentSlide === 1) {
    leftBtn.classList.add("hidden");
  }

  currentSlide--;
  goToSlide(currentSlide);
};

leftBtn.addEventListener("click", previousSlide);
rightBtn.addEventListener("click", nextSlide);

export { nextSlide, previousSlide };
