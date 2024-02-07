import { BasketItemDto } from "./basketitem";

export interface BasketDto {
    userId?: string;
    discountCode?: string;
    basketItems: BasketItemDto[];
    totalPrice: number;
}