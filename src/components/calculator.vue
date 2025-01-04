<template>
	<div class="calculator">
		<input
			type="text"
			v-model="displayValue"
			class="display"
			disabled
		/>
		<div class="buttons-wrapper">
			<button
				v-for="btn in buttons"
				:key="btn.value"
				class="button"
				:class="`button button__${btn.type}`"
				@click="updateValue(btn.value)"
			>
				{{ btn.value }}
			</button>
		</div>
	</div>
	<div class="select__wrapper">
		<div class="select__group">
			<div class="period__select">
				<label for="Period">Period</label>
				<select class="select__period select" v-model="selectedPeriod" id="Period">
					<option class="option__period option" v-for="option in options.period"
					        :key="option.value"> {{
						option.label}}
					</option>
				</select>
			</div>
			<div class="habbit__select">
				<label for="HabitType">Habbits</label>
				<select class="select__habbit select" v-model="selectedHabitType" id="HabitType">
					<option class="option__habbit option" v-for="option in options.habitType"
					        :key="option.value"> {{ option.label }}
					</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';

	const displayValue = ref('');

	const buttons = [
		{ value: 'AC', type: 'clear' },
		{ value: 'DEL', type: 'delete' },
		{ value: '.', type: 'operator' },
		{ value: '/', type: 'operator' },

		{ value: '7' },
		{ value: '8' },
		{ value: '9' },
		{ value: '*', type: 'operator' },

		{ value: '4' },
		{ value: '5' },
		{ value: '6' },
		{ value: '-', type: 'operator' },

		{ value: '1' },
		{ value: '2' },
		{ value: '3' },
		{ value: '+', type: 'operator' },


		{ value: '000' },
		{ value: '00' },
		{ value: '0' },
		{ value: '=', type: 'equals' },
	];

	const updateValue = (value) => {
		if (value === 'AC') {
			displayValue.value = '';
			return;
		}
		if (value === 'DEL') {
			displayValue.value = displayValue.value.slice(0, -1);
			return;
		}
		if (value === '=') {
			displayValue.value = eval(displayValue.value);
			return;
		}

		displayValue.value = displayValue.value + value;
	};
</script>

<style scoped>

	.calculator {
		width: 300px;
		margin: 50px auto;
		background: #256384;
		border-radius: 10px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
		padding: 20px;
		box-sizing: border-box;
	}

	.display {
		width: 100%;
		height: 60px;
		background: #0c2633;
		color: #fff;
		font-size: 24px;
		text-align: right;
		border: none;
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 10px;
		box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3);
		box-sizing: border-box;
	}

	.buttons-wrapper {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
	}

	.button {
		background: #b1a9a9;
		color: #fff;
		border: none;
		font-size: 22px;
		border-radius: 5px;
		height: 50px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.button:active {
		transform: scale(0.95);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	}


	.button__clear {
		background: red;
	}

</style>
