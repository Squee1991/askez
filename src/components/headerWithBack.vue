<template>
	<div class="back-header">
		<img v-if="props.icon" @click="goBack" class="back__arrow-icon" :src="props.icon" alt="Back"/>
		<div class="header-title">{{ props.title }}</div>
	</div>
</template>
<script setup>
	import {useRouter} from 'vue-router';
	import {defineProps} from 'vue';

	const router = useRouter();
	const props = defineProps({
		icon: {
			type: String,
		},
		title: {
			type: String,
			required: false,
		}
	});

	const goBack = () => {
		router.push('/menu');
	};
</script>
<style>
	.back-header {
		display: flex;
		align-items: center;
	}

	.back__arrow-icon {
		width: 33px;
		height: 33px;
		margin-right: 10px;
		padding: 5px;
		background: #b7b8d0;
		border-radius: 50%;
	}

	.header-title {
		font-size: 30px;
		padding: 15px 0;
		font-weight: bold;
		color: var(--text-color);
	}
</style>
