<template>
	<div class="random-suggestions">
		<h2 class="suggestion__title">Choose from the list</h2>
		<div class="suggestions-list">
			<div v-for="(suggestion, index) in displayedSuggestions" :key="index" class="suggestion-item">
				<div class="icon">🌟</div>
				<p @click=" choosed(index)">{{ suggestion.text }}</p>
			</div>
		</div>
		<button class="refresh-button" @click="getRandomSuggestions">Show More</button>
		<div >
			<div>Выбранные</div>
			<div class="suggestions-list" v-for="item in choosedItems ">
				<div class="suggestion-item">{{ item.text}}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {ref} from "vue";

	const suggestions = ref([
		{text: "Start running in the mornings"},
		{text: "Drink 2 liters of water daily"},
		{text: "Do 20 pull-ups every day"},
		{text: "Read at least one book a month"},
		{text: "Do a short morning exercise routine"},
		{text: "Meditate for 10 minutes in silence"},
		{text: "Plan your week ahead"},
		{text: "Eat a healthy breakfast every day"},
		{text: "Spend 30 minutes outdoors"},
		{text: "Smile at your reflection in the mirror"},
		{text: "Turn off your phone 2 hours before bed"},
		{text: "Give up coffee for at least a week"},
		{text: "Spend a week without social media"},
		{text: "Do back-strengthening exercises"},
		{text: "Include walking in your daily routine"},
		{text: "Set a positive intention for the day"},
		{text: "Avoid fast food for at least a month"},
		{text: "Start cooking meals instead of ordering"},
		{text: "Add stretching to your morning routine"},
		{text: "Replace sweets with fruits"},
		{text: "Go to bed earlier, by 10 PM"},
	]);

	const displayedSuggestions = ref([]);
	const choosedItems = ref([])


	const choosed = (index) => {
		const item = displayedSuggestions.value[index]
		if (!choosedItems.value.some(chossedItem => chossedItem.text === item.text))
		choosedItems.value.push(item);
	}

	const getRandomSuggestions = () => {
		const shuffled = suggestions.value
		.sort(() => 0.5 - Math.random())
		.slice(0, 5);
		displayedSuggestions.value = shuffled;
	};

	getRandomSuggestions();
</script>

<style scoped>

	.random-suggestions {
		text-align: center;
		padding: 20px;
		border-radius: 15px;
		background: linear-gradient(to bottom, #f7f8fc, #dfe6f3);
		max-width: 600px;
		margin: 30px auto;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.suggestion__title {
		font-size: 20px;
		font-weight: bold;
		color: #34495e;
		margin-bottom: 20px;
	}

	.suggestions-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.suggestion-item {
		margin: 10px;
		display: flex;
		align-items: center;
		cursor: pointer;
		padding: 15px;
		border-radius: 10px;
		background: #ffffff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		font-size: 16px;
		color: #34495e;
	}

	.suggestion-item .icon {
		font-size: 20px;
		margin-right: 10px;
	}

	.refresh-button {
		width: 100%;
		margin-top: 20px;
		background: #4caf50;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: background 0.3s ease;
	}

	.refresh-button:hover {
		background: #45a049;
	}
</style>
