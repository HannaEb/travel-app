// Assign variables to HTML elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn--open-modal");
const closeModalBtn = document.querySelector(".btn--close-modal");
const submitBtn = document.querySelector("#generate");

// Add/remove hidden class to/from elements
const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Add event listeners to open/close modal
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
submitBtn.addEventListener("click", closeModal);

// Close modal when pressing esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

export { openModal, closeModal };
