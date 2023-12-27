import {Table} from "react-bootstrap";
import CartItemTableItem from "./cartItemTableItem.tsx";
import {CartItemDto} from "../../../../data/CartItemDto.ts";

type Props = {
    cartItemList: CartItemDto[],
    setCartItemList: (cartItemList: CartItemDto[]) => void,
    calTotalPrice: (cartDataList: CartItemDto[]) => void
}

export default function CartItemTable({cartItemList, setCartItemList, calTotalPrice}:Props) {
    return (
        <>
            <Table className="align-middle">
                <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    cartItemList.map((item) => (
                        <CartItemTableItem
                            item={item}
                            cartItemList={cartItemList}
                            setCartItemList={setCartItemList}
                            calTotalPrice={calTotalPrice}
                            key={item.pid}/>
                    ))
                }
                </tbody>
            </Table>
        </>
    )
}