
<script setup lang="ts">
import LoadingModal from '@/shared/components/LoadingModal.vue';
import { useRoute, useRouter } from 'vue-router';
import useClient from '../composables/useClient';
import { watch } from 'vue';

// REFACTORIZACIÓN 
// - Que el ClientPage quede lo más limpio y sencillo posible. 
// - El route y el router si los dejaré aquí
// - La función updateClient para actualizar el cliente, la mutación del clientMutation, el watch del clientMutation eberían salir de aquí
// - Delegaremos lo que se pueda al composable useClient
// - Y aquí, en este componente, traeremos por desestructuración todo lo que necesitemos usar.

const route=useRoute();

const router=useRouter();

const {
    client, 
    isLoading, 
    isError, 
    clientMutation,
    updateClient,
    isUpdating,
    isUpdatingSuccess
}=useClient(+route.params.id)

watch(clientMutation.isSuccess, ()=>{
    setTimeout(()=>{
        clientMutation.reset();
    }, 2000)
});

watch(isError, ()=>{
    if (isError.value)
    router.replace('/clients')
})

</script>

<template>

    <h3 v-if="isUpdating">Guardando...</h3>
    <h3 v-if="isUpdatingSuccess">Guardado</h3>

    <LoadingModal v-if="isLoading"/>

    <div v-if="client">
        <h1>{{ client.name }}</h1>

        <form @submit.prevent="updateClient(client!)">
            <input
              type="text"
              placeholder="Nombre"
              v-model="client.name">
            <br>
            <input
              type="text"
              placeholder="Dirección"
              v-model="client.address">
            <br>
            <button type="submit" :disable="isUpdating">Guardar</button>
        </form>
    </div>

    <code>
        {{client}}
    </code>

</template>

<style scoped>

</style>