<template>
	<VueCal
		xsmall
		:time="false"
		hide-view-selector
		active-view="month"
		@cell-focus="selectedDate = $event"
		class="vuecal--blue-theme vuecal--rounded-theme"
		style="max-width: 270px;height: 290px"
	/>


</template>

<script setup>
	import VueCal from 'vue-cal'
	import 'vue-cal/dist/vuecal.css'
	import {ref} from "vue";

	let selectedDate = ref(null)

</script>

<style>

	/* .vuecal--rounded-theme  ( this class for week days and Months )

	 */


</style>