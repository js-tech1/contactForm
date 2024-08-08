(function ($) {

	"use strict";

	// Form
	var contactForm = function () {
		if ($('#contactForm').length > 0) {
			$("#contactForm").validate({
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					subject: "Please enter your subject",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				submitHandler: function (form) {
					var $submit = $('.submitting'),
						waitText = 'Submitting...';


					var formData = $(form).serializeArray();
					const name = String(formData.find(field => field.name === 'name').value);
					const email = String(formData.find(field => field.name === 'email').value);
					const msg = String(formData.find(field => field.name === 'message').value);
					const subject = String(formData.find(field => field.name === 'subject').value);
					const message = String(`<b>Email</b>: ${email}<br><b>Name:</b> ${name}<br><b>Message:</b> ${msg}`);

					var data = {
						gmail: "YOUR_GMAIL",
						password: "YOUR_GMAIL_APP_PASSWORD",
						to: "SENDER_MAIL", //where you want to send mail
						text: name,
						subject: subject,
						message: message
					};

					// console.log(data); // Debugging line to check the data being sent

					$.ajax({
						type: "POST",
						url: "https://email-api11.p.rapidapi.com/api/user/publicmail",
						headers: {
							'Content-Type': 'application/json',
							'x-rapidapi-host': 'email-api11.p.rapidapi.com',
							'x-rapidapi-key': 'YOUR_API_KEY'
						},
						data: JSON.stringify(data),
						beforeSend: function () {
							$submit.css('display', 'block').text(waitText);
						},
						success: function (response) {
							// console.log(response); // Debugging line to check the response
							if (response.success) {
								$('#form-message-warning').hide();
								setTimeout(function () {
									$('#contactForm').fadeIn();
								}, 1000);
								setTimeout(function () {
									$('#form-message-success').fadeIn();
								}, 1400);
								setTimeout(function () {
									$('#form-message-success').fadeOut();
								}, 8000);
								setTimeout(function () {
									$submit.css('display', 'none').text(waitText);
								}, 1400);
								setTimeout(function () {
									$('#contactForm').each(function () {
										this.reset();
									});
								}, 1400);
							} else {
								$('#form-message-warning').html("Email sending failed. Please try again.");
								$('#form-message-warning').fadeIn();
								$submit.css('display', 'none');
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							// console.log(jqXHR.responseText); // Debugging line to check the error response
							$('#form-message-warning').html("Something went wrong. Please try again.");
							$('#form-message-warning').fadeIn();
							$submit.css('display', 'none');
						}
					});
				} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);
