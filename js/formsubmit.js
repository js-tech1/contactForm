function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve values from form fields
    const name = String(document.getElementById('name').value);
    const email = String(document.getElementById('email').value);
    const subject = String(document.getElementById('subject').value);
    const msg = String(document.getElementById('message').value);
    const message = String(`
    <p><b>Email:</b> ${email}<br />
    <p><b>Name:</b> ${name}<br />
    <p><b>Message:</b> ${msg}<br />
    `);

    // Prepare the data to be sent in the POST request
    const body = {
        gmail: "YOUR_GMAIL",
        password: "YOUR_GMAIL_APP_PASSWORD",
        to: "SENDER_MAIL", //where you want to send mail
        text: name,
        subject: subject,
        message: message
    };


    var submitButton = document.querySelector('.submitting');
    var waitText = 'Submitting...';
    submitButton.style.display = 'block';
    submitButton.textContent = waitText;

    // Send the POST request using fetch
    fetch('https://email-api11.p.rapidapi.com/api/user/publicmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'email-api11.p.rapidapi.com',
            'x-rapidapi-key': 'YOUR_API_KEY'
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('form-message-warning').style.display = 'none';

                setTimeout(function () {
                    document.getElementById('contactForm').style.display = 'block';
                }, 1000);

                setTimeout(function () {
                    document.getElementById('form-message-success').style.display = 'block';
                }, 1400);

                setTimeout(function () {
                    document.getElementById('form-message-success').style.display = 'none';
                }, 8000);

                setTimeout(function () {
                    document.querySelector('.submitting').style.display = 'none';
                    document.querySelector('.submitting').textContent = 'Submitting...';
                }, 1400);

                setTimeout(function () {
                    document.getElementById('contactForm').reset();
                }, 1400);
            } else {
                var warningMessage = document.getElementById('form-message-warning');
                warningMessage.innerHTML = "Email sending failed. Please try again.";
                warningMessage.style.display = 'block';
                document.querySelector('.submitting').style.display = 'none';
            }
        })
        .catch((error) => {
            // Print the error
            // console.error('Error:', error);

            // Actions for when there is an error in the request
            var warningMessage = document.getElementById('form-message-warning');
            warningMessage.innerHTML = "Something went wrong. Please try again.";
            warningMessage.style.display = 'block';
            document.querySelector('.submitting').style.display = 'none';
        });
}

window.onload = function () {
    document.getElementById('contactForm').addEventListener('submit', handleSubmit);
}
