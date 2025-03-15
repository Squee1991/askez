<template>
	 <div class="preloader__container">
		 <div class="colorful"></div>
	 </div>
</template>

<script>

</script>

<style scoped>
	.preloader__container {
		width: 100%;
		height: 100vh;
		background: var(--background-color);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.colorful {
		width: 44.8px;
		height: 44.8px;
		border-radius: 50%;
		margin-top: -33.6px;
		display: flex;
		justify-content: center;
		overflow: hidden;
		transform-origin: 50% 116.5%;
		animation: colorful-253w2v 2s infinite linear;
	}

	.colorful:before {
		content: "";
		min-width: 233%;
		height: 233%;
		background: radial-gradient(farthest-side,#474bff 90%,#0000 ) top,
		radial-gradient(farthest-side,#ff6761 90%,#0000 ) left,
		radial-gradient(farthest-side,#ffd82e 90%,#0000 ) bottom,
		radial-gradient(farthest-side,#3bff81 90%,#0000 ) right;
		background-size: 43% 43%;
		background-repeat: no-repeat;
		animation: inherit;
		animation-direction: reverse;
	}

	@keyframes colorful-253w2v {
		100% {
			transform: rotate(360deg);
		}
	}
</style>