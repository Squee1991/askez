<template>
	<div class="acc">
		<div v-if="isOverlayVisible">
			<PremiumWindow
				:text="$t('premiumWindow.leveling')"
				:subtext="$t('premiumWindow.subtext')"
				@close="isOverlayVisible = false"
			/>
		</div>
		<button class="circle"
		        :class="{'clicked': clicked}"
		        v-if="isButtonVisible">
			<svg fill="CurrentColor" width="60px" height="60px" viewBox="0 0 32 32" version="1.1"
			     xmlns="http://www.w3.org/2000/svg">
				<path
					d="M16 2.984c-7.201 0-13.015 5.815-13.015 13.016 0 7.199 5.814 13.016 13.015 13.016 7.2 0 13.016-5.816 13.016-13.016s-5.817-13.016-13.016-13.016zM15.954 8.189c0.931 0 1.687 0.755 1.687 1.688s-0.756 1.688-1.687 1.688c-0.933 0-1.688-0.756-1.688-1.688s0.755-1.688 1.688-1.688zM16.182 28.141c-3.541 0-6.26-2.644-6.26-6.065 0-3.305 2.502-6.067 5.857-6.064 0 0 6.298-0.31 6.298-6.083 0-3.47-2.1-5.567-6.085-6.083 7.173 0.398 12.148 5.373 12.148 12.147 0.001 6.61-5.439 12.148-11.958 12.148zM16.015 20.314c-0.932 0-1.688 0.755-1.688 1.688 0 0.932 0.756 1.688 1.688 1.688s1.688-0.756 1.688-1.688c0-0.933-0.756-1.688-1.688-1.688z"></path>
			</svg>
		</button>
		<div class="hero">
			<div class="progressbar-container">
				<div class="level-display">Level : {{ store.pandaLevel }}</div>
				<div class="progressbar">
					<div class="fill" :style="{ width: store.pandaProgressGlobal + '%' }"></div>
					<span class="progres__percent">{{ store.pandaProgressGlobal }}%</span>
				</div>
			</div>
			<div class="rank__wrapper">
				<span class="rank-label">{{ $t('rank.rank')}}: </span>
				<span class="rank__value">{{ currentRank }}</span>
			</div>
			<div class="hero__icon-wrapper">
				<div
					:class="{'max-carpet' : isPandaActive}"
					class="glow-base">
					<div class="glow-base-circle">
						<div class="glow-base-inner-circle"></div>
					</div>
				</div>
				<img :class="{ 'shadow-max': isPandaActive }" class="hero__icon-shadow" :src="pandaImg" alt="shadow"/>
				<img class="hero__icon" :src="pandaImg" alt="panda"/>
			</div>
		</div>
		<div class="left" :class="{ open: isOpen }">
			<div class="dragon__left-top dragon">
				<svg width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
					<g id="dragon">
						<circle cx="58" cy="16" r="1" style="stroke:currentColor"/>
						<circle cx="36" cy="5" r="1" style="stroke:currentColor"/>
						<line x1="15.919" y1="10.586" x2="12.223" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="12.223" y1="10.586" x2="15.919" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M20,44V40.109a7.423,7.423,0,0,1,5.5,4.56"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="52.024" y1="29" x2="63" y2="29"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="63" y1="51" x2="51.265" y2="51"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M2.261,34.248A7.487,7.487,0,0,0,7.491,40l-.146-3.336"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M6.417,34.678a7.581,7.581,0,0,0,5.074,5.074l-.228-5.223"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M15,44.719v-4.61A7.453,7.453,0,0,1,20.632,45"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2,31.515v2.594H26.545a5.446,5.446,0,0,1,0,10.891H2a9.27,9.27,0,0,0,3.844,8.98A6.624,6.624,0,0,1,6.89,50.843c.523,9.412,9.935,8.366,9.935,8.366-3.137-3.137-3.137-8.889-3.137-8.889a10.811,10.811,0,0,0,10.981,8.889,9.928,9.928,0,0,1-3.137-8.889c1.046,10.458,9.935,8.889,9.935,8.889a10.606,10.606,0,0,1-2.091-8.366,11.051,11.051,0,0,0,13.073,6.8c9.935-2.092,10.458-13.6,10.458-13.6-3.137,5.229-13.6,3.137-13.6,3.137,14.119-1.046,13.6-13.6,13.6-13.6A10.252,10.252,0,0,1,49.136,36.2"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M35.651,21.82a7.583,7.583,0,0,0-15.165,0c0,.061.008.12.009.18h-9"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M52.024,29a12.724,12.724,0,0,0,.883-6.4L48.2,26l-5.568-2.183"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.119,25.742s3.138.683,3.138,6.831,10.981,4.1,10.981,4.1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.5,24.732c.754.073,2.621.667,5.5,4.268,4,5,12,1,12,1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M40.161,25.742,51,15.284V8.5A2.5,2.5,0,0,0,48.5,6h0A2.5,2.5,0,0,0,46,8.5v4.692l-4,4.183V13a3,3,0,0,0-3-3h0a3,3,0,0,0-3,3v8.559l-1.261.908"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2.759,21H11a0,0,0,0,1,0,0v0A10,10,0,0,1,1,31H1a0,0,0,0,1,0,0V22.759A1.759,1.759,0,0,1,2.759,21Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M23.973,24.3l6.119-.507a.53.53,0,0,0,.4-.824l-1.409-2.1a.529.529,0,0,0-.767-.12L23.934,24.2A.056.056,0,0,0,23.973,24.3Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="2" y1="24" x2="3" y2="24"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
					</g>
				</svg>
			</div>
			<div class="dragon__left-bottom dragon">
				<svg width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
					<g id="dragon">
						<circle cx="58" cy="16" r="1" style="stroke:currentColor"/>
						<circle cx="36" cy="5" r="1" style="stroke:currentColor"/>
						<line x1="15.919" y1="10.586" x2="12.223" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="12.223" y1="10.586" x2="15.919" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M20,44V40.109a7.423,7.423,0,0,1,5.5,4.56"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="52.024" y1="29" x2="63" y2="29"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="63" y1="51" x2="51.265" y2="51"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M2.261,34.248A7.487,7.487,0,0,0,7.491,40l-.146-3.336"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M6.417,34.678a7.581,7.581,0,0,0,5.074,5.074l-.228-5.223"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M15,44.719v-4.61A7.453,7.453,0,0,1,20.632,45"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2,31.515v2.594H26.545a5.446,5.446,0,0,1,0,10.891H2a9.27,9.27,0,0,0,3.844,8.98A6.624,6.624,0,0,1,6.89,50.843c.523,9.412,9.935,8.366,9.935,8.366-3.137-3.137-3.137-8.889-3.137-8.889a10.811,10.811,0,0,0,10.981,8.889,9.928,9.928,0,0,1-3.137-8.889c1.046,10.458,9.935,8.889,9.935,8.889a10.606,10.606,0,0,1-2.091-8.366,11.051,11.051,0,0,0,13.073,6.8c9.935-2.092,10.458-13.6,10.458-13.6-3.137,5.229-13.6,3.137-13.6,3.137,14.119-1.046,13.6-13.6,13.6-13.6A10.252,10.252,0,0,1,49.136,36.2"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M35.651,21.82a7.583,7.583,0,0,0-15.165,0c0,.061.008.12.009.18h-9"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M52.024,29a12.724,12.724,0,0,0,.883-6.4L48.2,26l-5.568-2.183"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.119,25.742s3.138.683,3.138,6.831,10.981,4.1,10.981,4.1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.5,24.732c.754.073,2.621.667,5.5,4.268,4,5,12,1,12,1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M40.161,25.742,51,15.284V8.5A2.5,2.5,0,0,0,48.5,6h0A2.5,2.5,0,0,0,46,8.5v4.692l-4,4.183V13a3,3,0,0,0-3-3h0a3,3,0,0,0-3,3v8.559l-1.261.908"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2.759,21H11a0,0,0,0,1,0,0v0A10,10,0,0,1,1,31H1a0,0,0,0,1,0,0V22.759A1.759,1.759,0,0,1,2.759,21Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M23.973,24.3l6.119-.507a.53.53,0,0,0,.4-.824l-1.409-2.1a.529.529,0,0,0-.767-.12L23.934,24.2A.056.056,0,0,0,23.973,24.3Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="2" y1="24" x2="3" y2="24"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
					</g>
				</svg>
			</div>
		</div>
		<div class="right" :class="{ open: isOpen }">
			<div class="dragon__right-top dragon">
				<svg width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
					<g id="dragon">
						<circle cx="58" cy="16" r="1" style="stroke:currentColor"/>
						<circle cx="36" cy="5" r="1" style="stroke:currentColor"/>
						<line x1="15.919" y1="10.586" x2="12.223" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="12.223" y1="10.586" x2="15.919" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M20,44V40.109a7.423,7.423,0,0,1,5.5,4.56"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="52.024" y1="29" x2="63" y2="29"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="63" y1="51" x2="51.265" y2="51"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M2.261,34.248A7.487,7.487,0,0,0,7.491,40l-.146-3.336"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M6.417,34.678a7.581,7.581,0,0,0,5.074,5.074l-.228-5.223"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M15,44.719v-4.61A7.453,7.453,0,0,1,20.632,45"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2,31.515v2.594H26.545a5.446,5.446,0,0,1,0,10.891H2a9.27,9.27,0,0,0,3.844,8.98A6.624,6.624,0,0,1,6.89,50.843c.523,9.412,9.935,8.366,9.935,8.366-3.137-3.137-3.137-8.889-3.137-8.889a10.811,10.811,0,0,0,10.981,8.889,9.928,9.928,0,0,1-3.137-8.889c1.046,10.458,9.935,8.889,9.935,8.889a10.606,10.606,0,0,1-2.091-8.366,11.051,11.051,0,0,0,13.073,6.8c9.935-2.092,10.458-13.6,10.458-13.6-3.137,5.229-13.6,3.137-13.6,3.137,14.119-1.046,13.6-13.6,13.6-13.6A10.252,10.252,0,0,1,49.136,36.2"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M35.651,21.82a7.583,7.583,0,0,0-15.165,0c0,.061.008.12.009.18h-9"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M52.024,29a12.724,12.724,0,0,0,.883-6.4L48.2,26l-5.568-2.183"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.119,25.742s3.138.683,3.138,6.831,10.981,4.1,10.981,4.1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.5,24.732c.754.073,2.621.667,5.5,4.268,4,5,12,1,12,1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M40.161,25.742,51,15.284V8.5A2.5,2.5,0,0,0,48.5,6h0A2.5,2.5,0,0,0,46,8.5v4.692l-4,4.183V13a3,3,0,0,0-3-3h0a3,3,0,0,0-3,3v8.559l-1.261.908"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2.759,21H11a0,0,0,0,1,0,0v0A10,10,0,0,1,1,31H1a0,0,0,0,1,0,0V22.759A1.759,1.759,0,0,1,2.759,21Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M23.973,24.3l6.119-.507a.53.53,0,0,0,.4-.824l-1.409-2.1a.529.529,0,0,0-.767-.12L23.934,24.2A.056.056,0,0,0,23.973,24.3Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="2" y1="24" x2="3" y2="24"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
					</g>
				</svg>
			</div>
			<div class="dragon__right-bottom dragon">
				<svg width="100px" height="100px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
					<g id="dragon">
						<circle cx="58" cy="16" r="1" style="stroke:currentColor"/>
						<circle cx="36" cy="5" r="1" style="stroke:currentColor"/>
						<line x1="15.919" y1="10.586" x2="12.223" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="12.223" y1="10.586" x2="15.919" y2="14.281"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M20,44V40.109a7.423,7.423,0,0,1,5.5,4.56"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="52.024" y1="29" x2="63" y2="29"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="63" y1="51" x2="51.265" y2="51"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M2.261,34.248A7.487,7.487,0,0,0,7.491,40l-.146-3.336"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M6.417,34.678a7.581,7.581,0,0,0,5.074,5.074l-.228-5.223"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M15,44.719v-4.61A7.453,7.453,0,0,1,20.632,45"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2,31.515v2.594H26.545a5.446,5.446,0,0,1,0,10.891H2a9.27,9.27,0,0,0,3.844,8.98A6.624,6.624,0,0,1,6.89,50.843c.523,9.412,9.935,8.366,9.935,8.366-3.137-3.137-3.137-8.889-3.137-8.889a10.811,10.811,0,0,0,10.981,8.889,9.928,9.928,0,0,1-3.137-8.889c1.046,10.458,9.935,8.889,9.935,8.889a10.606,10.606,0,0,1-2.091-8.366,11.051,11.051,0,0,0,13.073,6.8c9.935-2.092,10.458-13.6,10.458-13.6-3.137,5.229-13.6,3.137-13.6,3.137,14.119-1.046,13.6-13.6,13.6-13.6A10.252,10.252,0,0,1,49.136,36.2"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M35.651,21.82a7.583,7.583,0,0,0-15.165,0c0,.061.008.12.009.18h-9"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M52.024,29a12.724,12.724,0,0,0,.883-6.4L48.2,26l-5.568-2.183"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.119,25.742s3.138.683,3.138,6.831,10.981,4.1,10.981,4.1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path d="M10.5,24.732c.754.073,2.621.667,5.5,4.268,4,5,12,1,12,1"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M40.161,25.742,51,15.284V8.5A2.5,2.5,0,0,0,48.5,6h0A2.5,2.5,0,0,0,46,8.5v4.692l-4,4.183V13a3,3,0,0,0-3-3h0a3,3,0,0,0-3,3v8.559l-1.261.908"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M2.759,21H11a0,0,0,0,1,0,0v0A10,10,0,0,1,1,31H1a0,0,0,0,1,0,0V22.759A1.759,1.759,0,0,1,2.759,21Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<path
							d="M23.973,24.3l6.119-.507a.53.53,0,0,0,.4-.824l-1.409-2.1a.529.529,0,0,0-.767-.12L23.934,24.2A.056.056,0,0,0,23.973,24.3Z"
							style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
						<line x1="2" y1="24" x2="3" y2="24"
						      style="fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px"/>
					</g>
				</svg>
			</div>
		</div>
	</div>
</template>
<script setup>
	import {ref, computed, onMounted} from 'vue'
	import {useHabitStore} from '../stores/habitStore.js'
	import {useAuthStore} from '../stores/authStore.js'
	import PremiumWindow from '../src/components/premiumWindow.vue'

	const store = useHabitStore()
	const authStore = useAuthStore()
	const isOpen = ref(false);
	const isReady = computed(() => store.isLoaded && !isButtonVisible.value)
	const clicked = ref(false)
	const isButtonVisible = ref(true)
	import {useI18n} from 'vue-i18n'
	const isOverlayVisible = ref(false)
	const {t} = useI18n()
	const rankKeys = ['rank.newbie', 'rank.pupil', 'rank.master', 'rank.legenda', 'rank.immortal']
	const isPandaActive = computed(() => store.pandaProgressGlobal >= 66)
	const currentRank = computed(() => {
		const level = store.pandaLevel
		const index = Math.min(rankKeys.length - 1, Math.max(0, level - 1))
		return t(rankKeys[index])
	})

	const pandaImg = computed(() => {
		const progress = store.pandaProgressGlobal
		if (progress === 100) return '/images/100.png'
		if (progress >= 66) return '/images/100.png'
		if (progress >= 33) return '/images/66.png'
		return '/images/33.png'
	})

	onMounted(() => {
		store.updateAllProgress()
		if (!authStore.isPremium) {
			isOverlayVisible.value = true
			return
		}
		setTimeout(() => {
			clicked.value = true
		}, 100)
		setTimeout(() => {
			isButtonVisible.value = false
			setTimeout(() => {
				isOpen.value = true
			}, 100)
		}, 2000)
	})

	definePageMeta({
		layout: 'footerlayout'
	})
</script>

<style scoped>
	.glow-base {
		position: absolute;
		bottom: -10px;
		width: 250px;
		height: 90px;
		border-radius: 50%;
		background: #f9d3e3;
		z-index: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.glow-base-circle {
		width: 200px;
		height: 60px;
		border-radius: 50%;
		background: #b5d6c3;
		opacity: 0.6;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.glow-base-inner-circle {
		width: 150px;
		height: 30px;
		border-radius: 50%;
		background: #f2c572;
	}


	.dragon__left-top {
		top: 20%;
		position: absolute;
		transform: scaleX(-1) translateX(50%);
		left: 50%;
	}

	.dragon {
		color: #facc15;
	}

	svg {
		color: currentColor;
	}

	.dragon__left-bottom {
		position: absolute;
		transform: scaleX(-1) translateX(50%);
		bottom: 20%;
		left: 50%;
	}

	.dragon__right-top {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 20%;
	}

	.dragon__right-bottom {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 20%;
	}

	.rank__wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 30px;
	}

	.rank__value {
		padding: 0 10px;
		color: #FF5722;
		font-size: 1.3rem;
		font-weight: bold;
		font-family: "Acme", serif;
	}

	.rank-label {
		font-size: 18px;
		text-align: center;
		font-family: "Acme", serif;
		color: var(--text-color);
	}

	.hero__icon-wrapper {
		margin-top: 20px;
		width: 65%;
		position: relative;
		display: flex;
		justify-content: center;
	}

	.hero__icon-shadow {
		position: absolute;
		bottom: -90px;
		left: 32px;
		width: 100%;
		transform: skewX(-30deg) scaleY(0.4) translate(12px, 15px);
		opacity: 0.3;
		filter: brightness(0) blur(2.5px);
		z-index: 0;
		pointer-events: none;
	}


	.hero__icon {
		width: 100%;
		position: relative;
		z-index: 1;
	}

	.level-display {
		margin: 5px 0;
		font-size: 22px;
		font-weight: bold;
		color: var(--text-color);
		font-family: "Acme", serif;
		text-align: center;
	}

	.progressbar-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.progressbar {
		position: relative;
		width: 200px;
		height: 40px;
		background: #e0e0e0;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		margin-bottom: 30px;
	}

	.fill {
		height: 100%;
		background: #4ade80;
		transition: width 0.3s ease;
	}

	.progres__percent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-weight: bold;
		color: #333;
		font-size: 20px;
		font-family: "Nunito", serif;
	}

	.fill {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: #4ade80;
		transition: width 0.3s ease;
	}

	.acc {
		padding: 10px 20px;
		flex-direction: column;
		position: relative;
		width: 100%;
		height: 100vh;
		display: flex;
		overflow: hidden;
		justify-content: center;
		/*background: radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%),*/
		/*linear-gradient(160deg, #1e1e2f, #2c2c3f);*/
		background: var(--background-color);
	}

	.circle {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		width: 80px;
		height: 80px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(0deg);
		background: radial-gradient(circle at center, #fde68a 0%, #b45309 100%);
		border-radius: 50%;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.4),
		inset 0 0 10px #facc15;
		transition: transform 1.8s ease-in-out,
		background 1s ease-in-out 1.2s,
		opacity 1s ease 2.5s;
		z-index: 11;
		cursor: pointer;
	}

	.circle svg {
		transition: transform 1.8s ease-in-out;
	}

	.circle.clicked {
		transform: translate(-50%, -50%) rotate(180deg);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5),
		inset 0 0 12px #fa961b;
		opacity: 0;
	}

	.circle.clicked svg {
		transform: rotate(180deg);
	}

	.hero {
		flex-direction: column;
		display: flex;
		align-items: center;
		height: 100vh;
	}

	.left,
	.right {
		width: 50%;
		height: 100vh;
		position: absolute;
		top: 0;
		background: #6b1e1e;
		border: 2px solid #000;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
		transition: transform 2s ease;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 30px 20px;
		z-index: 5;
	}

	.left::before,
	.left::after,
	.right::before,
	.right::after {
		content: '';
		display: block;
		height: 8px;
		background: #a79571;
		border-radius: 4px;
		margin: 20px 0;
	}

	.left {
		left: 0;
		transform: translateX(0%);
		border-right: none;
	}

	.right {
		right: 0;
		transform: translateX(0%);
		border-left: none;
	}

	.left.open {
		transform: translateX(-100%);
	}

	.right.open {
		transform: translateX(100%);
	}

	.shadow-max {
		position: absolute;
		bottom: -70px;
		left: 32px;
		width: 100%;
		transform: skewX(-30deg) scaleY(0.4) translate(5px, 15px);
		opacity: 0.3;
		filter: brightness(0) blur(2.5px);
		z-index: 0;
		pointer-events: none
	}

	.max-carpet {
		position: absolute;
		bottom: -15px;
		width: 250px;
		height: 90px;
		border-radius: 50%;
		background: #f9d3e3;
		z-index: 0;
		display: flex;
		justify-content: center;
		align-items: center;

	}
</style>
