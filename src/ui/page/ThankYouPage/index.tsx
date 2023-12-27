import TopNavBar from "../../component/TopNavBar.tsx";
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ThankYouPage() {
    const navigate = useNavigate();

    const [countDown,setContDown] = useState<number>(5);

    useEffect(() => {
            setTimeout(() => {
            setContDown((countDown) => countDown - 1);
            if (countDown === 0){
                navigate("/");
            }
        }, 1000);
    }, [countDown]);

    return (
        <>
            <TopNavBar/>
            <Container>
                <h1>Thank You!</h1>
                <h1>back to home in {countDown} ...</h1>
            </Container>
        </>
    )
}