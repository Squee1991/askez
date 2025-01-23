<template>
	<div class="back-header">
		<img @click="goBack" class="back__arrow-icon" :src="Arrowicon" alt="Back"/>
		<div class="header-title">{{ props.title }}</div>
	</div>
</template>
<script setup>
	import {useRouter} from 'vue-router';
	import {defineProps} from 'vue';
	import Arrowicon from '../../assets/images/arrowSvg.svg'

	const router = useRouter();
	const props = defineProps({
		icon: {
			type: String,
		},
		title: {
			type: [String],

		},
	});

	const goBack = () => {
		router.push('/menu');
	};
</script>
<style scoped>
	.back-header {
		display: flex;
		align-items: center;
	}

	.back__arrow-icon {
		width: 30px;
		margin-right: 10px;

	}

	.header-title {
		font-size: 30px;
		padding: 15px 0;
		font-weight: bold
	}
</style>
