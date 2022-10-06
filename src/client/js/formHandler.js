// Assign variables to HTML elements
const submitBtn = document.querySelector("#generate");
const destination = document.getElementById("destination");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

// Handle form submit
const handleSubmit = (event) => {
  event.preventDefault();

  const duration = Client.calcNights(startDate.value, endDate.value);
  const data = {
    destination: destination.value,
    duration: duration,
  };

  postData(data);

  destination.value = "";
  startDate.value = "";
  endDate.value = "";
};

// Event listener to handle form submit
document.addEventListener("DOMContentLoaded", () => {
  submitBtn.addEventListener("click", handleSubmit);
});

// POST request
const postData = async (data) => {
  const res = await fetch("/all", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();

    Client.updateUI(newData);
    Client.hideLoader();
    Client.revealInfo();

    return newData;
  } catch (error) {
    console.log(error);
  }
};

export { handleSubmit };
