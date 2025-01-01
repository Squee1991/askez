<template>
	<div class="success-modal">
		<div class="wrapper">
			<div class="success__title">has been added!</div>
			<button class="success__btn" @click="$emit('close')">OK</button>
		</div>
	</div>
</template>

<script setup></script>

<style scoped>
	.success-modal {
		position: relative;
		width: 100vw;
		height: 100vh;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}


	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 20px ;
		width: 100%;
		color: #333;
		text-align: center;
	}

	.success__btn {
		margin-top: 10px;
		padding: 10px 20px;
		background: rebeccapurple;
		color: black;
		font-size: 30px ;
		width: 100%;
		border: none;
		border-radius: 15px;
		cursor: pointer;
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	.success__title {
		font-size: 40px;
		font-weight: bold;
	}

</style>
