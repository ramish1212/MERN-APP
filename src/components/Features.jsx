import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Features = () => {
  const featuresData = [
    {
      id: 1,
      icon: "1",
      title: "No Download Limit",
      description: "You can download all the content you want without limits.",
    },
    {
      id: 2,
      icon: "2",
      title: "Downloads At No Cost",
      description:
        "You can convert Video and Audio content and download it for free here.",
    },
    {
      id: 3,
      icon: "3",
      title: "The Best Speeds",
      description: "Our platform converts Audio and Video in seconds.",
    },
    {
      id: 4,
      icon: "4",
      title: "Easy to Use",
      description:
        "You can convert and download content using our tool with a few clicks.",
    },
    {
      id: 5,
      icon: "5",
      title: "No Need For Apps",
      description:
        "Since our tool is online, you can use it without having to install anything on your device.",
    },
    {
      id: 6,
      icon: "6",
      title: "Well Secured",
      description:
        "Our website is very well secured. We have developed this website with user security in mind.",
    },
  ];

  return (
    <Container className="features-section">
      <h2>What Makes Us Special</h2>
      <Row className="features-grid">
        {featuresData.map((feature) => (
          <Col key={feature.id} md={4} className="mb-4">
            <div className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
