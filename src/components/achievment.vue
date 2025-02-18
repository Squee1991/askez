<template>
	<div c>
		<div class="achiv__text">
			<div class="achiv-text-item">Выполненные достижения</div>
		</div>
		<div class="achiv__list">
			<img class="badge" src="../../assets/images/pandaa.png" alt="">
			<img class="badge" src="../../assets/images/panda4.png" alt="">
			<img class="badge" src="../../assets/images/panda3.png" alt="">
			<img class="badge" src="../../assets/images/panda2.png" alt="">
			<img class="badge" src="../../assets/images/panda1.png" alt="">
			<img class="badge" src="../../assets/images/kimano.png" alt="">
		</div>
		<div class="achive__done-inner">
			<div class="achive__done">У вас 6 из 6 достижений</div>
		</div>
	</div>
</template>

<script setup>

</script>

<style scoped>

	.achive__done-inner {
		padding: 20px;
	}
	.achive__done {
		background: var(--menu--btn-bg);
		text-align: center;
	    padding: 20px 0;
		border-radius: 20px;
		font-size: 20px;
		color: var(--text-color);
		font-family: "Nunito", serif;
	}
	.achiv__list {
		padding: 0 20px;
		border-radius: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.badge {
		width: 120px;
		height: 120px;
		padding: 10px;
	}

	.achiv__text{
		font-size: 20px;
		color: var(--text-color);
		font-weight: 600;
		padding: 10px ;
		text-align: center;
		font-family: "Nunito", serif;
	}
</style>