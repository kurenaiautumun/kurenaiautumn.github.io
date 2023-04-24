const template = `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Welcome to Kurenai</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			background-color: #f0e6f7;
			margin: 0;
			padding: 0;
		}

		h1 {
			font-size: 36px;
			color: #4a148c;
			margin-top: 30px;
			margin-bottom: 20px;
			text-align: center;
		}

		p {
			font-size: 18px;
			line-height: 1.5;
			color: #444;
			margin-bottom: 20px;
			text-align: justify;
			padding: 0 30px;
		}

		a {
			color: #6200ee;
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		.button {
			display: inline-block;
			padding: 10px 20px;
			background-color: #6200ee;
			color: #fff;
			font-size: 18px;
			text-align: center;
			border-radius: 5px;
			border: none;
			cursor: pointer;
		}

		.button:hover {
			background-color: #4d00c2;
		}

		.container {
			max-width: 600px;
			margin: 0 auto;
			background-color: #fff;
			padding: 30px;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		}

		.footer {
			font-size: 14px;
			color: #666;
			text-align: center;
			margin-top: 20px;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Welcome to Kurenai!</h1>
		<p>Thank you for signing up for our blog post app. We're excited to have you on board and look forward to seeing all the great content you'll be creating!</p>
		<p>Here are a few tips to get started:</p>
		<ul>
			<li>Create a new post by clicking on the "New Post" button in the dashboard.</li>
			<li>Use the formatting tools to make your post look great.</li>
			<li>Include images and videos to make your post more engaging.</li>
			<li>Don't forget to share your post on social media!</li>
		</ul>
		<p>If you have any questions or need help with anything, don't hesitate to reach out to our support team.</p>
		<p>Thanks again for signing up and happy blogging!</p>
		<p>Best regards,</p>
		<p>The Kurenai Team</p>
		<hr>
		<p class="footer">If you didn't sign up for Kurenai, please ignore this email.</p>
	</div>
</body>
</html>
`;

module.exports = template;
