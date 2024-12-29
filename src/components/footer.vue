<template>
	<footer class="footer">
		<div class="footer-container">
			<div class="footer-logo">
				<img class="footer__logo" :src="Logo" alt="Askese Logo"/>
			</div>
			<nav class="footer-links">
				<ul class="footer__list">
					<li class="list__item"><a class="footer__item-link" href="#">Home</a></li>
					<li class="list__item"><a class="footer__item-link" href="#">Description</a></li>
					<li class="list__item"><a class="footer__item-link" href="#">Profile</a></li>
				</ul>
			</nav>
			<div class="footer-contact">
				<div class="footer__contanct-row">
					<h4>Contact Us</h4>
					<p>Email: @askese.com</p>
				</div>
				<div class="footer__contanct-row">
					<p>Follow us:</p>
					<a href="#"><img src="" alt="instagram"/></a>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p>&copy; 2024 Askese</p>
		</div>
	</footer>
</template>

<script setup>
	import Logo from '/assets/images/logo-type.png'
</script>

<style>
	.footer {
		padding: 2rem 1rem;
		border-top: 1px solid #ddd;
		background: #DDDCE6;
	}

	.footer-container {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer__logo {
		width: 100px;
	}

	.footer-bottom {
		text-align: center;
		margin-top: 2rem;
		color: grey;
		font-size: 14px;
	}

	.footer__list {
		text-align: center;
		font-size: 20px;
	}

	.footer__item-link {
		color: black;
		padding: 5px;
	}

	.footer__contanct-row {
		padding-bottom: 20px;
	}
</style>
