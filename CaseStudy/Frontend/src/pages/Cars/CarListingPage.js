import React, { useState, useEffect } from 'react';
import {
  Container,
  Header as SUIHeader,
  Segment,
  Button,
  Icon,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import heroRoad from '../../assets/hero-back1.jpg'; 
import PopularCities from '../../components/PopularCities';
import WhyChooseUs from '../../components/WhyChooseUs';

const CarListingPage = () => {
  const navigate = useNavigate();

  const handleFindCarsClick = () => {
    navigate('/browse-cars');
  };

  return (
    <div>
      <Segment
        inverted 
        vertical
        style={{
          padding: '6em 0em',
          borderRadius: '0', 
          marginBottom: '2em',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '690px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${heroRoad})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#214EFF', 
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 19, 37, 0.75)', 
            }}
          ></div>
        </div>

        <Container text textAlign="center" style={{ position: 'relative', zIndex: 0, color: '#ffffff' }}>
          <SUIHeader
            as="h1"
            inverted 
            style={{
              fontSize: '4.5em', 
              fontWeight: 'bold', 
              color: '#ffffff', 
            }}
          >
            Drive Your Journey
          </SUIHeader>
          <SUIHeader
            as="h2"
            inverted 
            style={{
              fontSize: '2em', 
              fontWeight: 'normal',
              color: '#ffffff', 
            }}
          >
            Rent Cars Across India with Ease. Experience premium vehicles, unmatched service, and unforgettable journeys.
          </SUIHeader>

           <Button
            fluid 
            animated="fade"
            style={{
              marginTop: '2em', 
              backgroundColor: "#1240faff",
              color: "white",
              borderRadius: '8px',
              maxWidth: '250px', 
              padding: '1.5em 1.5em',
              fontSize: '1em', 
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', 
              margin: '2em auto 0 auto'
            }}
            onClick={handleFindCarsClick}
          >
            <Button.Content visible>
              <Icon name="search" /> Find Cars
            </Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" /> Browse Now
            </Button.Content>
          </Button>
        </Container>
      </Segment>

      <PopularCities />

      <WhyChooseUs />
    </div>
  );
};

export default CarListingPage;
