<template>
	 <div class="preloader__container">
		 <div class="loader"></div>
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

	.loader {
		width: 40px;
		aspect-ratio: 1;
		border-radius: 50%;
		margin-top: -30px;
		display: flex;
		justify-content: center;
		overflow: hidden;
		transform-origin: 50% 116.5%;
		animation: l17 2s infinite linear;
	}
	.loader:before {
		content:"";
		min-width: 233%;
		height: 233%;
		background:
			radial-gradient(farthest-side,#00DA3C 90%,#0000) top,
			radial-gradient(farthest-side,#00CBE7 90%,#0000) left,
			radial-gradient(farthest-side,#FD8603 90%,#0000) bottom,
			radial-gradient(farthest-side,#F4F328 90%,#0000) right;
		background-size: 43% 43%;
		background-repeat: no-repeat;
		animation: inherit;
		animation-direction: reverse;
	}
	@keyframes l17 {
		100% {transform: rotate(360deg)}
	}
</style>