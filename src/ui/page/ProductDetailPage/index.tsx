import {useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TopNavBar from "../../component/TopNavBar.tsx";
import QuantitySelector from "../../component/QuantitySelector.tsx";
import {useContext, useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/ProductListDto.ts";
import Loading from "../../component/Loading.tsx";
import * as ProductApi from "../../../api/ProductListApi.ts"
import * as CartItemApi from "../../../api/CartItemApi.ts";
import {CartItemLengthContext, LoginUserContext} from "../../../App.tsx";
import AddedToCartToast from "./compeonent/AddedToCartToast.tsx";


type Params = {
    productId: string
}

export default function ProductDetailPage() {
    const {productId} = useParams<Params>();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState<number>(1);
    const [productDetail, setProductDetail] = useState<ProductDetailDto | undefined>(undefined);
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);

    const loginUser = useContext(LoginUserContext)
    const cartItemContextValue = useContext(CartItemLengthContext);


    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity((quantity) => quantity - 1);
        }
    }

    const handlePlus = () => {
        if (quantity < productDetail!.stock) {
            setQuantity((quantity) => quantity + 1);
        }
    }

    const getProductDetail = async (productId: string) => {
        try {
            const response = await ProductApi.getProductDetail(productId);
            setProductDetail(response);
            document.title = response.name;
        } catch (e) {
            navigate("/error")
        }
    }

    const handleAddToCart = async () => {
        if (loginUser) {
            setIsAddingCart(true);
            await CartItemApi.putCartItem(productDetail!.product_id, quantity);
            setIsAddingCart(false);
            setShowToast(true);
            const data = await CartItemApi.getCartItemList();
            cartItemContextValue?.updateMyValue(data.length);
        } else if (loginUser === null) {
            navigate("/login")
        }
    }

    const renderAddToCartButton = () => {
        if (isAddingCart) {
            return (
                <>
                    <div>
                        <button className="ms-5 btn btn-success" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div>
                        <button className="ms-5 btn btn-success" onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </>
            )
        }
    }

    const renderSelectorAndButton = (productDetail: ProductDetailDto) => {
        if (productDetail.stock > 0) {
            return (
                <>
                    <div className="d-flex justify-content-center">
                        <div>
                            <QuantitySelector quantity={quantity} handleMinus={handleMinus}
                                              handlePlus={handlePlus}/>
                            <h5 className="d-flex justify-content-center mt-2">Stock: {productDetail.stock}</h5>
                        </div>
                        <div>
                            {renderAddToCartButton()}
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <button className="ms-5 btn btn-danger" disabled>Out of stock</button>
                </div>
            )
        }
    }

    useEffect(() => {
        if (productId) {
            getProductDetail(productId);
        } else {
            navigate("/error")
        }
    }, []);

    return (
        <>
            <TopNavBar/>
            {
                productDetail ?
                    <Container>
                        <Row className="justify-content-center align-items-center" style={{height: "80vh"}}>
                            <Col md={6}>
                                <div
                                    style={{
                                        backgroundImage: `url('${productDetail.image_url}')`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: "no-repeat",
                                        height: '400px', // Adjust the height as needed
                                    }}
                                />
                            </Col>

                            <Col md={6}>
                                <div className="shadow p-5 mb-5 rounded bg-black text-white bg-opacity-50">
                                    <h1>{productDetail.name}</h1>

                                    <h3>Price: </h3>

                                    <h3>${productDetail.price}</h3>

                                    <h3>Description</h3>

                                    <h3>{productDetail.description}</h3>
                                </div>

                                {renderSelectorAndButton(productDetail)}

                            </Col>
                        </Row>
                    </Container> :
                    <Loading/>
            }
            <AddedToCartToast showToast={showToast} setShowToast={setShowToast} quantity={quantity} productDetail={productDetail}/>
        </>
    )
}

