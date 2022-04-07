// Declare variables
const destinationSection = document.querySelector("#destination--1");

const revealInfo = () => {
  showDestination();
  scroll();
};

// Scroll to and show content on submit
const scroll = () => {
  destinationSection.scrollIntoView({ behavior: "smooth" });
};

const showDestination = () => {
  destinationSection.classList.remove("hidden");
};

export { revealInfo };
