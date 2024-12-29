<template>
	<div class="layout">
		<div class="container">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
	import {ref} from 'vue'
	import Header from '/src/components/header.vue'
	import Footer from '/src/components/footer.vue'

	// export default {
	// 	components: {
	// 		Header , Footer
	// 	},
	// };

</script>
<style>

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
	}

	li {
		list-style-type: none;
	}

	.container {
		width: 100%;
		margin: 0 auto;

	}
</style>