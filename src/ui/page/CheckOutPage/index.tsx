import CheckOutTable from "./component/CheckOutTable.tsx";
import {Button, Container} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/TransactionDto.ts";
import Loading from "../../component/Loading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts"
import {LoginUserContext} from "../../../App.tsx";

type Params = {
    transactionId: string
}

export default function CheckOutPage() {
    const params = useParams<Params>();
    const navigate = useNavigate();

    const loginUser = useContext(LoginUserContext);

    const [transactionData, setTransactionData] = useState<TransactionDto | undefined>(undefined);
    const [isCheckout,setIsCheckout] = useState<boolean>(false);

    const getTransactionData = async () => {
        try {
            if (params.transactionId) {
                const data = await TransactionApi.getTransactionById(params.transactionId)
                setTransactionData(data);
            } else {
                navigate("/error");
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }

    }

    useEffect(() => {
        if (loginUser) {
            getTransactionData()
        } else if (loginUser === null) {
            navigate("/login")
        }
    }, [loginUser]);

    const handleCheckout = async () => {
        try {
            if(params.transactionId) {
                setIsCheckout(true);
                await TransactionApi.payTransactionById(params.transactionId);
                await TransactionApi.finishTransactionById(params.transactionId);
                navigate("/thankyou")
            }
        } catch (error) {
            navigate("/error");
        }
    }

    return (
        <Container>
            <h1>Checkout Page</h1>
            {
                transactionData ?
                    (
                        <>
                            <CheckOutTable itemList={transactionData?.Item}/>
                            <div className="d-flex justify-content-end">
                                <h3>Total : {transactionData.total}</h3>
                            </div>
                            <div className="d-flex justify-content-end">
                                {
                                    isCheckout?
                                        <Button variant="success" style={{width: "130px"}} disabled>PAY</Button>:
                                        <Button variant="success" style={{width: "130px"}} onClick={handleCheckout}>Pay</Button>

                                }
                            </div>
                        </>
                    ) :
                    <Loading/>
            }
        </Container>
    )
}