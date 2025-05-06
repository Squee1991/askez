<template>
	<div class="back-header">
		<div v-if="props.icon" @click="goBack" class="back__arrow-icon">
			<svg id="Layer_1" enable-background="new 0 0 512 512" height="42" viewBox="0 0 512 512" width="42" xmlns="http://www.w3.org/2000/svg"><path d="m496.987 479.867c-7.263 0-13.569-5.252-14.783-12.535-10.824-63.203-72.026-173.512-227.271-179.958v81.093c0 5.619-3.14 10.767-8.136 13.338-4.997 2.57-11.011 2.133-15.583-1.132l-224.933-160.667c-3.942-2.816-6.281-7.363-6.281-12.207 0-4.845 2.339-9.391 6.281-12.206l224.934-160.666c4.571-3.266 10.586-3.703 15.582-1.132s8.136 7.719 8.136 13.338v82.315c95.963 9.572 257.067 78.84 257.067 335.418 0 7.805-5.985 14.306-13.763 14.949-.419.034-.836.052-1.25.052z" fill="#23b0ff"/><path d="m6.281 220.006 224.933 160.667c4.572 3.265 10.585 3.702 15.583 1.132 4.996-2.571 8.136-7.719 8.136-13.338v-81.093c155.245 6.446 216.447 116.755 227.271 179.958 1.214 7.283 7.52 12.535 14.783 12.535.414 0 .831-.018 1.25-.052 7.778-.644 13.763-7.145 13.763-14.949 0-125.565-38.586-206.264-89.236-257.066h-422.764c0 4.843 2.339 9.39 6.281 12.206z" fill="#4588ff"/></svg>
		</div>
		<div class="header-title">{{ props.title }}</div>
	</div>
</template>
<script setup>
	import {useRouter} from 'vue-router';
	import {defineProps} from 'vue';
    const paths = ['/archive' , '/menu' , '/chat' , '/archive' , '/achievment']
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
		if (paths.includes(router.currentRoute.value.path)) {
			router.push('/welcomePage');
		} else {
			router.push('/menu');
		}
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
		width: 40px;
		display: flex;
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
		font-family: "Nunito", serif;
	}
</style>
