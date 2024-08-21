import { Button, Col, Container, Modal, Row } from "react-bootstrap";
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

  const [paySubscriptionModal, setPaySubscriptionModal] = useState(false);

  const handleClosePaySubscriptionModal = () => setPaySubscriptionModal(false);
  const handleShowPaySubscriptionModal = () => setPaySubscriptionModal(true);

  function getCardsDetails() {
    fetch('./staticData/cardsData.json')
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

  const billingData = [
    { label: 'Active since', value: new Date("2023-06-15") },
    { label: 'Billing Cycle', value: new Date("2024-07-15") },
  ];

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
            <div className="text-center">
              <Button variant="primary" className=" mt-4" onClick={handleShowPaySubscriptionModal}>Pay subscription</Button>
            </div>
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
      <Modal show={paySubscriptionModal} onHide={handleClosePaySubscriptionModal} centered className="congratulationModal">
        <Modal.Body className="text-center congratulationModal_body">
          <img src="/images/brb-logo.svg" alt="brb" />
          <h3>Congratulations</h3>
          <p>Your payment and subscription have been successfully processed. You are now part of the BRB community. We have sent your login credentials to your email.</p>
          <div className="billingInfo">
            {billingData.map((item, index) => (
              <p key={index}>
                {item.label} <span>{formatDate(item.value)}</span>
              </p>
            ))}
          </div>
          <Button variant="primary" className="w-100" onClick={handleClosePaySubscriptionModal}>
            Go to dashboard
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
