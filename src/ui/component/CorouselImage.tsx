import {Carousel, Container, Image} from "react-bootstrap";

export default function NoTransitionExample() {
    return (
        <Container>
            <Carousel slide={false}>
                <Carousel.Item>
                    <Image src="https://www.freewebheaders.com/wp-content/gallery/cats/cats-header-20736-800x200.jpg"
                           style={{width:"55vw",height:"30vh"}}
                           className="d-block mx-auto"/>
                    <Carousel.Caption>
                        {/*<h3>First slide label</h3>*/}
                        {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Image src="https://www.freewebheaders.com/wp-content/gallery/cats/cats-header-20727-800x200.jpg"
                           style={{width:"55vw",height:"30vh"}}
                           className="d-block mx-auto"/>
                    <Carousel.Caption>
                        {/*<h3>Second slide label</h3>*/}
                        {/*<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <Image src="https://www.freewebheaders.com/wp-content/gallery/cats/cute-sleepy-kitten-website-header.jpg"
                           style={{width:"55vw",height:"30vh"}}
                           className="d-block mx-auto"/>
                    <Carousel.Caption>
                        {/*<h3>Third slide label</h3>*/}
                        {/*<p>*/}
                        {/*    Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
                        {/*</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}