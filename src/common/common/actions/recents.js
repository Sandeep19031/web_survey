import { Recents as RecentsService } from '../services';
import { recents as RecentsStore } from '../stores';

export async function loadRecents(store=RecentsStore, service=RecentsService) {
    store.isLoading(true);
    const recents = await service.loadRecentAddresses();
    store.loadAddresses(recents);
    store.isLoading(false);
}

export async function saveAddressToRecents(address, store=RecentsStore, service=RecentsService) {
    store.isLoading(true);
    store.addAddress(address);
    await service.saveRecentAddresses(store.list);
    store.isLoading(false);
}