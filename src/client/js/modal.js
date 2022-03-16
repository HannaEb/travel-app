// Declare variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn--open-modal");
const closeModalBtn = document.querySelector(".btn--close-modal");
const submitBtn = document.querySelector("#generate");
const destination = document.querySelector("#destination--1");

// Add / remove hidden class to / from elements
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Scroll to and show content on submit
const scroll = () => {
  destination.scrollIntoView({ behavior: "smooth" });
};

const showDestination = () => {
  destination.classList.remove("hidden");
};

// Event listeners for actions to be performed
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
submitBtn.addEventListener("click", () => {
  closeModal();
  showDestination();
  scroll();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

export { openModal, closeModal };
