// Declare variables
const submitBtn = document.querySelector("#generate");

// Callback function
const handleSubmit = (event) => {
  event.preventDefault();

  const destination = document.getElementById("destination");
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const duration = Client.calcDays(startDate.value, endDate.value) - 1;

  const data = {
    destination: destination.value,
    duration: duration,
  };

  postData(data);

  destination.value = "";
  startDate.value = "";
  endDate.value = "";
};

// Event listener for action to be performed
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
