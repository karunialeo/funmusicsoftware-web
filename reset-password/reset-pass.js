document
  .getElementById("resetForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const messageElement = document.getElementById("message");

    if (newPassword !== confirmPassword) {
      messageElement.textContent = "Passwords do not match!";
      messageElement.style.color = "red";
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    let params = { token, newPassword };
    console.log(params);

    // return;

    try {
      const response = await fetch(
        "https://funmusicsoftware.com/fun-violin/api/reset_password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      if (response.status === 200) {
        let data = response.json();
        console.log("data :", data);

        if ((data.status = "OK")) {
          messageElement.textContent =
            "Password reset successfully. Please close this page.";
          messageElement.style.color = "green";
        } else {
          messageElement.textContent =
            "Error resetting password. Please try again.";
          messageElement.style.color = "red";
        }
      }
    } catch (error) {
      console.error(error);
      messageElement.textContent =
        "Error resetting password. Please try again.";
      messageElement.style.color = "red";
    }
  });
