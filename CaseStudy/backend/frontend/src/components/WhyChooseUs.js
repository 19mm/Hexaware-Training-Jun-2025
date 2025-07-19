import React from "react";
import { Container, Header, Grid, Card, Icon } from "semantic-ui-react";

const features = [
  {
    icon: "map marker alternate",
    title: "Wide City Coverage",
    description: "Available in 50+ cities across India with seamless booking experience",
    color: "blue",
  },
  {
    icon: "money bill alternate",
    title: "Affordable Pricing",
    description: "Competitive rates with transparent pricing and no hidden charges",
    color: "green",
  },
  {
    icon: "shield alternate",
    title: "Safe & Reliable",
    description: "Well-maintained vehicles with comprehensive insurance coverage",
    color: "purple",
  },
  {
    icon: "clock outline",
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs",
    color: "orange",
  },
  {
    icon: "users",
    title: "Trusted by Thousands",
    description: "Over 100,000+ satisfied customers and growing every day",
    color: "red",
  },
  {
    icon: "trophy",
    title: "Premium Quality",
    description: "Handpicked vehicles ensuring comfort and luxury in every ride",
    color: "teal",
  },
];

const WhyChooseUs = () => {
  return (
    <div style={{ padding: "5rem 0", backgroundColor: "#f4f4f4" }}> 
      <Container>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <Header as="h2" style={{ fontSize: "3rem", marginBottom: "0.75rem", color: '#333' }}> 
            Why Choose RoadReady
          </Header>
          <p style={{ fontSize: "1.3rem", color: "#555", maxWidth: 700, margin: "0 auto" }}> 
            Experience the difference with our commitment to excellence and customer satisfaction
          </p>
        </div>

        <Grid stackable columns={3} doubling>
          {features.map((feature, index) => (
            <Grid.Column key={index}>
              <Card
                fluid
                raised
                textAlign="center"
                style={{
                  borderRadius: '15px', 
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)', 
                  transition: 'transform 0.3s ease-in-out', 
                  border: 'none', 
                  padding: '1.5rem',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div
                  style={{
                    marginTop: "1rem", 
                    marginBottom: "1.5rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: `rgba(33, 78, 255, 0.1)`, 
                      padding: "1.8rem", 
                      borderRadius: "50%",
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)', 
                    }}
                  >
                    <Icon name={feature.icon} size="huge" color={feature.color} />
                  </div>
                </div>
                <Card.Content style={{ padding: '0 0 1.5rem 0' }}>
                  <Header as="h3" style={{ marginTop:"1.5rem", marginBottom: "0.75rem", fontSize: "1.6rem", color: '#333' }}> 
                    <center>{feature.title}</center>
                  </Header>
                  <p style={{ color: "#666", fontSize: "1.0rem", lineHeight: "1.6" }}> 
                    {feature.description}
                  </p>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default WhyChooseUs;
