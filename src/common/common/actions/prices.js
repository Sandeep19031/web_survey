import { Api as ApiService } from '../services';
import { prices as PricesStore } from '../stores';

export async function getPrice() {
    PricesStore.isLoading(true);
    const { data } = await ApiService.getPrice();
    PricesStore.setUSDRate(data.USD);
    PricesStore.setEURRate(data.EUR);
    PricesStore.setBRLRate(data.BRL);
    PricesStore.isLoading(false);
}