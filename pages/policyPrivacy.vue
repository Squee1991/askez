<template>
	<div class="privacy">
		<div class="privacy-policy">
			<HeaderWithBack :icon="Icon" title="Privacy Policy"/>
			<div>
				<h2>1. Information Collection and Use</h2>
				<p>
					We do not collect personal data such as names, phone numbers, or location.
					Registration requires an email and a name, but both can be fictitious. If a fake email is used, password recovery will not be possible, as it relies on a real email address.
				</p>

				<h2>2. Task Data</h2>
				<p>
					Tasks you create are stored either locally on your device (offline mode) or in your personal Firebase account (if online).
					Only the developer can access task documents, but these tasks are not tied to your name — only your email is stored, and even that is not verified.
				</p>

				<h2>3. Icons and Images</h2>
				<p>
					Icons are sourced from svgrepo.com. Panda illustrations and background images are generated using AI (GPT).
				</p>

				<h2>4. Third-party Services</h2>
				<p>
					This app uses Firebase Authentication for optional user sign-up and data sync. No analytics or advertising services are integrated.
				</p>

				<h2>5. Data Security</h2>
				<p>
					Your data is stored locally using secure browser storage (IndexedDB). If you choose to register, your tasks will sync with your personal Firebase account, accessible only to you.
				</p>

				<h2>6. Changes to This Policy</h2>
				<p>
					We may update our Privacy Policy from time to time. Any changes will be shown inside the app.
				</p>

				<h2>7. Contact</h2>
				<p>
					For questions or concerns about this Privacy Policy, feel free to contact us at:
					<a href="mailto:asketic-email@gmail.com?subject=Question about Privacy Policy">
						asketic-email@gmail.com
					</a>
				</p>
				<p><strong>Last updated:</strong> April 10, 2025</p>
			</div>
		</div>
	</div>
</template>

<script setup>
    import Icon from '../assets/images/arrowBack.svg'
	import HeaderWithBack from '../src/components/headerWithBack.vue'
</script>

<style scoped>

	.privacy{
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

	.privacy-policy h1 {
		font-size: 28px;
		margin-bottom: 20px;
		color: white;
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
