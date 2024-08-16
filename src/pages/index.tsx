import { Col, Container, Row } from "react-bootstrap";
import Cards from "./components/Cards/Cards";
import { useEffect, useState } from "react";

// Define the type for each card item
interface CardData {
  id: number;
  title: string;
  description: string;
  image: string;
  // Add other fields as necessary based on your JSON structure
}

export default function Home() {
  // Type the state to be an array of CardData
  const [cardData, setCardData] = useState<CardData[]>([]);

  function getCardsDetails() {
    fetch("./staticData/cardsData.json")
      .then((response) => response.json())
      .then((responseJson: CardData[]) => {
        setCardData(responseJson);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }

  useEffect(() => {
    getCardsDetails();
  }, []);

  return (
    <>
      <section className="cardSection py-60">
        <Container>
          <div className="cardSection_heading">
            <h1>
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT, SED DO
              EIUSMOD TEMPOR INCIDIDUNT
            </h1>
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              con Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatu
            </p>
          </div>
          <Row className="g-2 g-md-3">
            {cardData.map((card, key) => (
              <Col sm="6" lg="4" key={key}>
                <Cards {...card} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
