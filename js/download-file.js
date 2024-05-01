document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    var username = formData.get("username");
    var password = formData.get("password");
    var buttonId = formData.get("buttonId");

    if (!username || !password) {
      document.getElementById("myModal").dispatchEvent(new Event("click"));

      $("#modal-error").modal("show");
      // Select the <p> element with id "error-message"
      const errorMessageElement = document.getElementById("error-message");
      // Modify the message content
      errorMessageElement.textContent = "Username and password must be filled";

      throw new Error("Username and password must be filled");
    }

    console.log("button id :", buttonId);

    let book = "";
    let instrument = "fv";
    let package = 0;
    switch (buttonId) {
      case "download-fd-book-1":
        book = "fun-drums/media/pdf/fundrums-book-1.pdf";
        instrument = "fd";
        package = 1;
        break;
      case "download-fd-book-2":
        book = "fun-drums/media/pdf/fundrums-book-2.pdf";
        instrument = "fd";
        package = 2;
        break;
      case "download-fv-alpha-1":
        book = "fun-violin/media/pdf/funviolin-alpha-1.pdf";
        instrument = "fv";
        package = 1;
        break;
      case "download-fv-alpha-2":
        book = "fun-violin/media/pdf/funviolin-alpha-2.pdf";
        instrument = "fv";
        package = 1;
        break;
      case "download-fv-beta-1":
        book = "fun-violin/media/pdf/funviolin-beta-1.pdf";
        instrument = "fv";
        package = 2;
        break;
      case "download-fv-beta-2":
        book = "fun-violin/media/pdf/funviolin-beta-2.pdf";
        instrument = "fv";
        package = 2;
        break;
      default:
        book = "";
        break;
    }

    console.log("book :", book);

    let params = {
      username: username,
      password: password,
    };

    console.log(params);
    fetch("http://funmusicsoftware.com/fun-violin/api/user_login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        console.log("response", response);
        return response.json();
      })
      .then((data) => {
        // Handle the API response data
        console.log("data", data);

        document.getElementById("myModal").dispatchEvent(new Event("click"));

        if (data.status === "NO") {
          $("#modal-error").modal("show");
          // Select the <p> element with id "error-message"
          const errorMessageElement = document.getElementById("error-message");

          // Modify the message content
          errorMessageElement.textContent = data.message;
        } else {
          const user = data.records[0];

          let userPackage = 0;
          if (instrument === "fd") {
            userPackage = user.fd_n_package;
          } else if (instrument === "fv") {
            userPackage = user.n_package;
          }

          if (userPackage !== package && userPackage !== 3) {
            $("#modal-error").modal("show");
            // Select the <p> element with id "error-message"
            const errorMessageElement =
              document.getElementById("error-message");

            // Modify the message content
            errorMessageElement.textContent =
              "You are not authorized to access this media";
          } else {
            $("#modal-success").modal("show");

            if (book !== "") {
              setTimeout(() => {
                console.log(`download ${book} start`);
                document
                  .getElementById("modal-success")
                  .dispatchEvent(new Event("click"));

                // Creating a temporary anchor element
                var anchorElement = document.createElement("a");
                anchorElement.setAttribute("target", "_blank");

                // Setting the href attribute to the file URL
                anchorElement.href = "http://funmusicsoftware.com/" + book;

                // Setting the download attribute to force download

                // Clicking the anchor element programmatically
                anchorElement.click();
              }, 3000);
            }
          }
        }

        // Close the modal after successful submission
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
        // Clear the form fields
        document.getElementById("loginForm").reset();
      });
  });
