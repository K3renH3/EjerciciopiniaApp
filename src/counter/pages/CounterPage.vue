
<script setup lang="ts">
import { useCounterStore } from '@/store/counter';
import { storeToRefs } from 'pinia';
import CounterValue from '../components/CounterValue.vue';

const counterStore=useCounterStore();

const {count, squareCount}=storeToRefs(counterStore);

const {increment, incrementBy, reset}=counterStore;

</script>

<template>
    <div>
        <h1>Contador</h1>
        <h4>Counter: {{ count }}</h4>
        <h4>Square: {{ squareCount }}</h4>
        <button @click="counterStore.increment()">+1</button>
        <button @click="counterStore.incrementBy(2)">+2</button>
        <button @click="counterStore.incrementBy(5)">+5</button>
        <button @click="counterStore.reset()">Reset</button>
    </div>

    <CounterValue />

</template>


<style scoped>

</style>