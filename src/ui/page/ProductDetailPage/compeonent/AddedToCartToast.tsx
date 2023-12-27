import {Toast, ToastContainer} from "react-bootstrap";
import {ProductDetailDto} from "../../../../data/ProductListDto.ts";

type Props = {
    showToast: boolean;
    setShowToast: (showToast: boolean) => void;
    quantity: number;
    productDetail: ProductDetailDto |　undefined;
}
export default function AddedToCartToast({showToast, setShowToast, quantity, productDetail}: Props) {
    const toggleShowToast = () => setShowToast(!showToast);

    return (
        <>
            <ToastContainer
                className="p-3"
                position={"bottom-end"}
                style={{zIndex: 1}}
            >
                <Toast show={showToast} onClose={toggleShowToast} delay={3000} autohide>
                    <Toast.Body style={{display: "flex", justifyContent: "center"}}>Added {quantity} {productDetail&&productDetail.name} to cart</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}