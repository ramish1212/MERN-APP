import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const blogsList = [

  {
    id: 1,
    title: "How to Convert YouTube Videos to MP3 A Step-by-Step Guide",
    date: "November 22, 2024",
    author: "Haris",
    description:
      "With millions of videos being uploaded to YouTube every day, it’s no surprise that many users wish to enjoy their favorite content offline. Whether it’s a music video,",
    image: "https://via.placeholder.com/300x200", // Replace with the actual image URL
    link: "#",
  },
  {
    id: 2,
    title: "How to Convert YouTube Videos to MP3 A Step-by-Step Guide",
    date: "November 22, 2024",
    author: "Haris",
    description:
      "With millions of videos being uploaded to YouTube every day, it’s no surprise that many users wish to enjoy their favorite content offline. Whether it’s a music video,",
    image: "https://via.placeholder.com/300x200", // Replace with the actual image URL
    link: "#",
  },
  {
    id: 3,
    title: "How to Convert YouTube Videos to MP3 A Step-by-Step Guide",
    date: "November 22, 2024",
    author: "Haris",
    description:
      "With millions of videos being uploaded to YouTube every day, it’s no surprise that many users wish to enjoy their favorite content offline. Whether it’s a music video,",
    image: "https://via.placeholder.com/300x200", // Replace with the actual image URL
    link: "#",
  },
  {
    id: 3,
    title: "How to Convert YouTube Videos to MP3 A Step-by-Step Guide",
    date: "November 22, 2024",
    author: "Haris",
    description:
      "With millions of videos being uploaded to YouTube every day, it’s no surprise that many users wish to enjoy their favorite content offline. Whether it’s a music video,",
    image: "https://via.placeholder.com/300x200", // Replace with the actual image URL
    link: "#",
  },
  {
    id: 3,
    title: "How to Convert YouTube Videos to MP3 A Step-by-Step Guide",
    date: "November 22, 2024",
    author: "Haris",
    description:
      "With millions of videos being uploaded to YouTube every day, it’s no surprise that many users wish to enjoy their favorite content offline. Whether it’s a music video,",
    image: "https://via.placeholder.com/300x200", // Replace with the actual image URL
    link: "#",
  },
  {
    id: 3,
    title: "How to Convert YouTube Videos to MP3 A Step-by-Step Guide",
    date: "November 22, 2024",
    author: "Haris",
    description:
      "With millions of videos being uploaded to YouTube every day, it’s no surprise that many users wish to enjoy their favorite content offline. Whether it’s a music video,",
    image: "https://via.placeholder.com/300x200", // Replace with the actual image URL
    link: "#",
  },
  {
    id: 3,
    title: "How to Convert YouTube Videos to MP3 A Step-by-Step Guide",
    date: "November 22, 2024",
    author: "Haris",
    description:
      "With millions of videos being uploaded to YouTube every day, it’s no surprise that many users wish to enjoy their favorite content offline. Whether it’s a music video,",
    image: "https://via.placeholder.com/300x200", // Replace with the actual image URL
    link: "#",
  },
];

const Blogs = () => {
  return (
    <div className="blog-section">
      <Container className="blog-container">
        <Row className="g-4"> {/* Adds spacing between columns */}
          {blogsList.map((blog) => (
            <Col key={blog.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <Card className="blog-card">
                <Card.Img variant="top" src={blog.image} alt={blog.title} className="blog-image" />
                <Card.Body className="blog-content">
                  <Card.Title className="blog-title">{blog.title}</Card.Title>
                  <Card.Text className="blog-date-author">
                    By {blog.author} • {blog.date}
                  </Card.Text>
                  <Card.Text className="blog-description">
                    {blog.description}
                  </Card.Text>
                  <Button variant="link" href={blog.link} className="blog-link">
                    Read More →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Blogs;
