const axios = require('axios');

document.addEventListener('DOMContentLoaded', () => {
  const appointmentsList = document.getElementById('appointments-list');

  // Function to handle the delete operation
  const handleDeleteAppointment = (appointmentId) => {
    // Perform the DELETE request to remove the appointment from the cloud
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${appointmentId}`)
      .then(response => {
        console.log('Appointment deleted successfully:', response.data);

        // Remove the user detail from the website
        const deletedAppointment = document.getElementById(appointmentId);
        if (deletedAppointment) {
          deletedAppointment.remove();
        }
      })
      .catch(error => {
        console.error('Error deleting appointment:', error);
      });
  };

  // Make a GET request to retrieve the saved appointments
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      const appointments = response.data;

      // Display the appointments on the web page
      appointments.forEach(appointment => {
        const li = document.createElement('li');
        li.id = appointment.id; // Use the appointment ID as the element ID
        li.textContent = `Date: ${appointment.date}, Time: ${appointment.time}, Title: ${appointment.title}, Location: ${appointment.location}`;

        // Create the delete icon and add a click event listener
        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('delete-icon');
        deleteIcon.textContent = 'X';
        deleteIcon.addEventListener('click', () => {
          handleDeleteAppointment(appointment.id); // Pass the appointment ID to delete
        });

        li.appendChild(deleteIcon);
        appointmentsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error fetching appointments:', error);
    });
});
