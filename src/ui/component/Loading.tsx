import {Container} from "react-bootstrap";

export default function Loading() {
    return (
        <>
            <Container>
                <div className="d-flex justify-content-center align-items-center" style={{
                    width:"100%",
                    height: "180px",
                    backgroundImage: "url(https://cdn.dribbble.com/users/2479507/screenshots/8678351/media/d336cea07ca3557d6bf17376eb7b68af.gif)",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain"
                }}>
                </div>
            </Container>
        </>
    )
}