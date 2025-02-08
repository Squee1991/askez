<template>
    <div class="edit__menu">
	    <img class="edit__menu-icon" :src="props.icon" alt="">
    </div>
</template>

<script setup>
	import { defineProps} from 'vue'

	const props = defineProps({
		icon: {
			type: String,
			required: true
		}
	})
</script>

<style scoped>
    .edit__menu {
	    display: flex;
	    align-items: center;
    }

	.edit__menu-icon {
		width: 25px;
	}
</style>