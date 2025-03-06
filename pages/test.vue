<template>
    <div> {{ $t('menu.title') }}</div>
</template>

<script setup>
import {useI18n} from 'vue-i18n';
const {locale, messages} = useI18n();
</script>

<style >

</style>