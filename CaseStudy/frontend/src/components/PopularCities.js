import React from "react";
import { Container, Header, Grid, Card, Image, Button, Icon } from "semantic-ui-react";

import bangloreImage from "../assets/banglore.jpg";
import mumbaiImage from "../assets/mumbai.jpg";
import delhiImage from "../assets/delhi.jpg";
import chennaiImage from "../assets/chennai.jpg";
import puneImage from "../assets/pune.jpg";
import goaImage from "../assets/goa.jpg";

const cities = [
  {
    name: "Mumbai",
    image: mumbaiImage,
    description: "The financial capital",
  },
  {
    name: "Delhi",
    image: delhiImage,
    description: "The heart of India",
  },
  {
    name: "Bangalore",
    image: bangloreImage,
    description: "The Silicon Valley",
  },
  {
    name: "Goa",
    image: goaImage,
    description: "Beach paradise",
  },
  {
    name: "Chennai",
    image: chennaiImage,
    description: "Cultural hub",
  },
  {
    name: "Pune",
    image: puneImage,
    description: "Educational center",
  },
];

const PopularCities = () => {
  return (
    <div style={{ padding: "4rem 0", backgroundColor: "#f4f4f4" }}>
      <Container>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Header as="h2" style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            Top Cities We Serve
          </Header>
          <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: 650, margin: "0 auto" }}>
            Discover amazing destinations across India with our premium car rental service
          </p>
        </div>

        <Grid stackable columns={3} doubling>
          {cities.map((city) => (
            <Grid.Column key={city.name}>
              <Card fluid raised style={{ borderRadius: '10px', overflow: 'hidden' }}> 
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src={city.image}
                    alt={city.name}
                    wrapped
                    ui={false}
                    style={{ height: "250px", objectFit: "cover", transition: "transform 0.3s ease" }} 
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 16,
                      color: "#ffffff",
                    }}
                  >
                    <Header as="h3" inverted style={{ marginBottom: 4 }}>
                      {city.name}
                    </Header>
                    <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>{city.description}</p>
                  </div>
                </div>

                <Card.Content>
                  <Button
                    fluid
                    animated="fade"
                    style={{ backgroundColor: "#1240faff", color: "#ffffff", borderRadius: '5px' }} 
                  >
                    <Button.Content visible>Explore {city.name}</Button.Content>
                    <Button.Content hidden>
                      <Icon name="arrow right" />
                    </Button.Content>
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default PopularCities;
