import {Button, Offcanvas, OffcanvasBody, Spinner} from "react-bootstrap";
import ShoppingCartOffcanvasBody from "./ShoppingCartOffcanvasBody.tsx";
import * as cartItemApi from "../../api/CartItemApi.ts"
import {useState} from "react";
import {CartItemDto} from "../../data/CartItemDto.ts";
import {Link, useNavigate} from "react-router-dom";
import Loading from "./Loading.tsx";

type Props = {
    show: boolean,
    handleClose: () => void;
}

export default function ShoppingCartOffcanvas({show, handleClose}: Props) {
    const navigate = useNavigate();

    const [cartDataList, setCartData] = useState<CartItemDto[] | undefined | null>(undefined);

    const getShoppingCartDataList = async () => {
        try {
            const data = await cartItemApi.getCartItemList();
            setCartData(data);
        } catch (error) {
            navigate("/error")
        }
    }

    const calTotalPrice = (cartDataList: CartItemDto[]) => {
        if (!cartDataList || cartDataList.length === 0) {
            return 0;
        }
        return cartDataList?.map((item): number => (
            item.price * item.cart_quantity
        )).reduce((total: number, item: number) => (
            total + item
        ))
    }

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                onEnter={getShoppingCartDataList}
                onExited={() => setCartData(undefined)}
                placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className="d-flex justify-content-between align-items-center ms-3">
                            <div>
                                <h3 className="mb-3">Shopping Cart</h3>
                                Total:$
                                {
                                    cartDataList ?
                                        calTotalPrice(cartDataList).toLocaleString() :
                                        <Spinner animation="border" variant="dark" />
                                }
                            </div>

                            <div className="ms-5">
                                <Link to="/shoppingcart"><Button variant="outline-success" size="lg">Edit</Button></Link>
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <OffcanvasBody>
                    {
                        cartDataList ? (
                            cartDataList.map((item) => (
                                <ShoppingCartOffcanvasBody cartItemDto={item} key={item.pid}/>
                            ))
                        ) : <Loading/>

                    }

                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
