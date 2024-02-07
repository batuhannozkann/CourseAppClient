interface OrderDto{
    id?:number,
    address:AddressDto,
    orderItems:OrderItemDto[],
    totalPrice?:number
    createdDate?:string
}
interface AddressDto{
    province:string,
    district:string,
    street:string,
    line:string,
    zipcode:string

}
interface OrderItemDto{
    productId:string,
    productName:string,
    pictureUrl:string,
    price:string
}