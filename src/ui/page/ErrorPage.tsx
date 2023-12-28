import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <Container className="d-flex justify-content-center">
                <Link to="/">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/004/435/751/non_2x/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg"/>
                </Link>
            </Container>

        </>
    )
}