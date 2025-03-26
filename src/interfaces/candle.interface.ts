export interface CandleInput {
    id_container: string;
    id_fragance: string;
    image_url?: string;
    text?: string;
}

export interface CartItemInput {
    id_candle: string;
    quantity: number;
}

export interface ShopCartInput {
    id_user: string;
    items: CartItemInput[];
}