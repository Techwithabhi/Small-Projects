// frontend/script.js
document.getElementById("whatsappForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const numbersInput = document.getElementById("numbers").value.trim();
  const message = document.getElementById("message").value.trim();
  const hour = parseInt(document.getElementById("hour").value);
  const minute = parseInt(document.getElementById("minute").value);
  const output = document.getElementById("output");

  const numberList = numbersInput
    .split(",")
    .map(num => num.trim())
    .filter(num => /^\d{10}$/.test(num));
    

  if (numberList.length === 0) {
    output.innerText = "Please enter at least one valid 10-digit number.";
    return;
  }

  if (!message) {
    output.innerText = "Message cannot be empty.";
    return;
  }

  if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    output.innerText = "Please enter a valid time (hour: 0–23, minute: 0–59).";
    return;
  }

  const payload = {
    numbers: numberList,
    message: message,
    hour: hour,
    minute: minute
  };

  fetch("http://127.0.0.1:5000/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    output.innerText = data.message;
  })
  .catch(err => {
    output.innerText = "Error scheduling messages.";
    console.error(err);
  });
});
