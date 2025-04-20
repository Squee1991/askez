<template>
	<div class="privacy">
		<div class="privacy-policy">
			<HeaderWithBack :icon="Icon" title="Privacy Policy"/>
			<div>
				<h2>1. Information Collection and Use</h2>
				<p>
					To use this app, registration via Firebase Authentication is required. Users are asked to provide an email, a name, and a password. All of these can be fictitious. However, please note that password recovery is only possible if a real, valid email address is used. If a fake email is provided, recovery will not work.
				</p>

				<h2>2. Task Data</h2>
				<p>
					Tasks and other related data are stored in your personal Firebase account. This data is accessible only through the app itself. The developer may access general task documents for support and maintenance, but they are not linked to any personal identity — only an email (which may not be verified) is stored.
				</p>

				<h2>3. Icons and Images</h2>
				<p>
					Icons are sourced from FlatIcon under a paid subscription. Some images and illustrations are generated using AI tools.
				</p>

				<h2>4. Fonts</h2>
				<p>
					This app uses fonts from Google Fonts, which are loaded via CDN and not stored locally.
				</p>

				<h2>5. Third-party Services</h2>
				<p>
					This app uses Firebase Authentication for user sign-up and cloud data synchronization. No advertising, analytics, or user tracking services are integrated into the app.
				</p>

				<h2>6. Data Security</h2>
				<p>
					User data is stored securely in Firebase's cloud infrastructure. Only authenticated users can access their own data through the app. This data is never shared with third parties.
				</p>

				<h2>7. Changes to This Policy</h2>
				<p>
					This Privacy Policy may be updated periodically. All updates will be reflected and accessible directly within the app.
				</p>

				<h2>8. Contact</h2>
				<p>
					For any questions or concerns about this Privacy Policy, please contact us at:
					<a href="mailto:asketic-email@gmail.com?subject=Question about Privacy Policy">
						asketic-email@gmail.com
					</a>
				</p>
				<p><strong>Last updated:</strong> April 20, 2025</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import Icon from '../assets/images/arrowBack.svg'
	import HeaderWithBack from '../src/components/headerWithBack.vue'
</script>

<style scoped>
	.privacy {
		width: 100%;
		height: 100vh;
	}

	.privacy-policy {
		width: 100%;
		padding: 0 30px;
		font-family: sans-serif;
		font-size: 16px;
		line-height: 1.6;
	}

	.privacy-policy h2 {
		font-size: 20px;
		margin-top: 30px;
		margin-bottom: 10px;
		color: var(--text-color);
	}

	.privacy-policy p {
		margin-bottom: 15px;
		color: #bfbaba;
		font-size: 12px;
	}

	.privacy-policy a {
		color: #5091d0;
		text-decoration: underline;
	}
</style>
