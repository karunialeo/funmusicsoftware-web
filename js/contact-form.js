document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const fullname = `${fname} ${lname}`;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (!fname || !email || !subject || !message) {
      $("#modal-error").modal("show");
      // Select the <p> element with id "error-message"
      const errorMessageElement = document.getElementById("error-message");

      // Modify the message content
      errorMessageElement.textContent = "Please fill required fields";
      return;
    }

    // Log form values to console
    const formData = {
      fullname: fullname,
      senderEmail: email,
      subject: subject,
      message: message,
    };
    console.log("form data", formData);

    // Get reference to the button
    const submitButton = document.getElementById("submit-contact-form");
    // Change button text to "Loading..."
    submitButton.textContent = "Loading...";
    // Disable the button
    submitButton.disabled = true;

    // Send form data to the server using fetch
    fetch(
      "https://funmusicsoftware.com/funmusicsoftware-api/email_contact_me.php",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }

        console.log("response", response);
        return response.json();
      })
      .then((data) => {
        if (data.status !== "OK") {
          $("#modal-error").modal("show");
          // Select the <p> element with id "error-message"
          const errorMessageElement = document.getElementById("error-message");

          // Modify the message content
          errorMessageElement.textContent = data.message;
        } else {
          console.log("data response :", data);

          $("#modal-success").modal("show");
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        document.getElementById("myModal").dispatchEvent(new Event("click"));

        $("#modal-error").modal("show");
        // Select the <p> element with id "error-message"
        const errorMessageElement = document.getElementById("error-message");
        // Modify the message content
        errorMessageElement.textContent = error;
      })
      .finally(() => {
        // Change button text back to "Send Message"
        submitButton.textContent = "Send Message";
        // Enable the button
        submitButton.disabled = false;
      });
  });
