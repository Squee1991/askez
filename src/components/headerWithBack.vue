<template>
	<div class="back-header">
		<div v-if="props.icon" @click="goBack" class="back__arrow-icon">
			<svg viewBox="0 0 25 25">
				<g
					id="Left-2"
					stroke-width="2"
					stroke-linecap="round"
					data-name="Left">
					<polygon :points="'24 12.001 2.914 12.001 8.208 ' +
					 '6.706 7.501 5.999 1 12.501 7.5 19.001 8.207 ' +
					  '18.294 2.914 13.001 24 13.001 24 12.001'"
					         style="fill:currentColor"
					         stroke="currentColor"
					/>
				</g>
			</svg>
		</div>
		<div class="header-title">{{ props.title }}</div>
	</div>
</template>
<script setup>
	import {useRouter} from 'vue-router';
	import {defineProps} from 'vue';

	const router = useRouter();
	const props = defineProps({
		icon: {
			type: [Object, null, String],
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
		color: var(--text-color);
	}

	svg {
		color: currentColor;
		width: 100%;
	}

	.back__arrow-icon {
		width: 33px;
		height: 33px;
		margin-right: 10px;
		padding: 5px;

		border-radius: 50%;
		color: var(--text-color);
	}

	.header-title {
		font-size: 30px;
		padding: 15px 0;
		font-weight: bold;
		color: var(--text-color);
		font-family: "Merienda", serif;
	}
</style>
