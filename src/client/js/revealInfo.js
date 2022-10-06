//  Assing variable to HTML element
const destinationSection = document.querySelector("#destination--1");

// Scroll to and show content on submit
const revealInfo = () => {
  showDestination();
  scroll();
};

const scroll = () => {
  destinationSection.scrollIntoView({ behavior: "smooth" });
};

const showDestination = () => {
  destinationSection.classList.remove("hidden");
};

export { revealInfo };
