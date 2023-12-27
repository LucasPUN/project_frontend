import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {CartItemDto} from "../../../../data/CartItemDto.ts";
import {useState} from "react";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import QuantitySelectorLoading from "../../../component/QuantitySelectorLoading.tsx";

type Props = {
    item: CartItemDto,
    cartItemList: CartItemDto[],
    setCartItemList: (cartItemList: CartItemDto[]) => void,
    calTotalPrice: (cartDataList: CartItemDto[]) => void
}

export default function CartItemTableItem({item, cartItemList, setCartItemList, calTotalPrice}: Props) {
    const [quantity, setQuantity] = useState<number>(item.cart_quantity);
    const [isPatchingQuantity, setIsPatchingQuantity] = useState<boolean>(false);
    const [isDeleting, setDeleting] = useState<boolean>(false);



    const handleMinus = async () => {
        if (quantity > 1) {
            setIsPatchingQuantity(true);
            const data = await CartItemApi.patchCartItem(item.pid, quantity - 1);
            setQuantity(data.cart_quantity);
            setIsPatchingQuantity(false);
            for (const cartItem of cartItemList){
                if(cartItem.pid === item.pid){
                    cartItem.cart_quantity = data.cart_quantity;
                    calTotalPrice(cartItemList);
                }
            }
        }
    }

    const handlePlus = async () => {
        if (quantity < item.stock) {
            setIsPatchingQuantity(true);
            const data = await CartItemApi.patchCartItem(item.pid, quantity + 1);
            setQuantity(data.cart_quantity);
            setIsPatchingQuantity(false);
            for (const cartItem of cartItemList){
                if(cartItem.pid === item.pid){
                    cartItem.cart_quantity = data.cart_quantity;
                    calTotalPrice(cartItemList);
                }
            }
        }
    }

    const handleDelete = async () => {
        setDeleting(true);
        await CartItemApi.deleteCartItem(item.pid);
        const updatedList = cartItemList.filter((cartItem) => (
            cartItem.pid !== item.pid
        ));
        setCartItemList(updatedList);
        calTotalPrice(updatedList)
        setDeleting(false);
    }



    const renderQuantitySelector = () => {
        if (isPatchingQuantity) {
            return (
                <>
                    <QuantitySelectorLoading/>
                </>
            )
        } else {
            return (
                <>
                    <QuantitySelector
                        quantity={quantity}
                        handleMinus={handleMinus}
                        handlePlus={handlePlus}/>
                </>
            )
        }
    }

    return (
        <>
            <tr>
                <td><img src={item.image_url} height="120px"/></td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                    {renderQuantitySelector()}
                </td>
                <td>${(item.price * item.cart_quantity).toLocaleString()}</td>
                <td>
                    {
                        isDeleting?
                            <FontAwesomeIcon icon={faSpinner} spin/>:
                            <FontAwesomeIcon icon={faTrash} onClick={handleDelete}/>
                    }
                </td>
            </tr>
        </>
    )
}