document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookForm");
  const ageInput = document.getElementById("age");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const bookingList = document.getElementById("bookingList");

  function renderbookings() {
    // Clear the booking list before rendering
    bookingList.innerHTML = "";

    // Replace with your actual API endpoint
    const apiUrl =
      "https://crudcrud.com/api/354757e353ce4a75bca0b8791aeba740/bookingList";

    axios
      .get(apiUrl)
      .then((response) => {
        const bookings = response.data;
        bookings.forEach((booking) => {
          renderbooking(booking);
        });
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }

  function renderbooking(bookingdata) {
    const item = document.createElement("div");
    item.innerHTML = `
            <p>Age: ${bookingdata.age}</p>
            <p>Name: ${bookingdata.name}</p>
            <p>Phone: ${bookingdata.phone}</p>
            <button class="delete-button" data-id="${bookingdata._id}">Delete</button>
        `;
    bookingList.appendChild(item);

    const deleteButton = item.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      deleteBooking(bookingdata._id, item); // Pass the item to be removed
    });
  }
  function addBookingToServer(bookingdata) {
    // Replace with your actual API endpoint
    const apiUrl =
      "https://crudcrud.com/api/354757e353ce4a75bca0b8791aeba740/bookingList";

    axios
      .post(apiUrl, bookingdata)
      .then((response) => {
        renderbooking(response.data); // Display the added booking on the screen
      })
      .catch((error) => {
        console.error("Error adding bookings:", error);
      });
  }

  function deleteBooking(bookingId, element) {
    // Pass the element to be removed
    const apiUrl = `https://crudcrud.com/api/354757e353ce4a75bca0b8791aeba740/bookingList/${bookingId}`;

    axios
      .delete(apiUrl)
      .then(() => {
        console.log("Booking deleted successfully");
        // Remove the deleted user detail from the display
        if (element) {
          bookingList.removeChild(element);
        }
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  }

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const age = ageInput.value;
    const name = nameInput.value;
    const phone = phoneInput.value;
    const bookingdata = { age, name, phone };
    if (age === "" || name === "" || phone === "") {
      alert("Please fill in all required fields.");
      return; // Stop form submission
    }

    addBookingToServer(bookingdata); // Add booking to the server
    ageInput.value = "";
    nameInput.value = "";
    phoneInput.value = ""; // Clear phone input as well
  });

  renderbookings(); // Render initial bookings when the page loads
});

