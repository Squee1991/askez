<template>
    <div class="box">
        <Vuecal
               />
    </div>

</template>

<script setup>
import Vuecal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import {computed} from "vue";
import * as events from "events";

</script>

<style scoped>
.box {
    max-height: 500px;
}
</style>