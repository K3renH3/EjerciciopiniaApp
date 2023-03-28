import clientsApi from '@/api/clients-api';
import type { Client } from '@/clients/interface/client';
import {useQuery} from '@tanstack/vue-query';
import { useClientsStore } from '@/store/clients';
import {storeToRefs} from 'pinia';
import { watch } from 'vue';

const getClients=async(page: number): Promise<Client[]>=>{
    // await new Promise(resolve=>{
    //     setTimeout(()=>resolve(true), 1500)
    // });
    const {data}=await clientsApi.get<Client[]>(`/clients?_page=${page}`);
    return data;
}

const useClients=()=>{

    const store=useClientsStore();

    const {currentPage, clients, totalPage}=storeToRefs(store);

    const {isLoading, data}=useQuery(
        ['clients?page=', currentPage],
        ()=>getClients(currentPage.value)
    );

    watch(data, clients=>{
        if(clients)
            store.setClients(clients);
    });

    return {
        isLoading,
        clients,
        currentPage,
        totalPage,
        // clients: store.clients,
        getPage(page: number) {
            store.setPage(page)
        },
        // getPage: store.setPage
        // [1, 2, 3, 4, 5]
    }
}

export default useClients;