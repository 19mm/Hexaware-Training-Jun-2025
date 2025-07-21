import React from "react";
import { Grid, Segment, Header, Icon, List, Input, Button, Divider } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment vertical inverted style={{ padding: "6em 4em 4em 4em", backgroundColor: "#001325ff", color: "#fff", borderRadius: '0' }}> 
      <Grid stackable divided inverted columns={3}>
        <Grid.Column>
          <Header as="h2" inverted style={{ marginBottom: '1em', display: 'flex', alignItems: 'center', color: '#fff' }}> 
            <Icon name="car" color="blue" size="large" style={{ marginRight: '0.5em' }} /> 
            RoadReady
          </Header>
          <p style={{ opacity: 0.9, lineHeight: '1.8rem', fontSize: '1.1rem' }}>
            Your trusted partner for premium car rentals across India. Experience comfort, reliability, and excellence in every journey.
          </p>
          <div style={{ marginTop: "2em", display: "flex", gap: "0.8em" }}> 
            <Button icon="facebook f" circular inverted style={{ backgroundColor: 'rgba(255,255,255,0)', border: '1px solid rgba(255,255,255,0.2)' }} /> 
            <Button icon="twitter" circular inverted style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border: '1px solid rgba(255,255,255,0.2)' }} />
            <Button icon="instagram" circular inverted style={{ backgroundColor: 'rgba(255,255,255,0)', border: '1px solid rgba(255,255,255,0.2)' }} />
            <Button icon="linkedin" circular inverted style={{ backgroundColor: 'rgba(255,255,255,0)', border: '1px solid rgba(255,255,255,0.2)' }} />
          </div>
        </Grid.Column>

        <Grid.Column>
          <Header as="h4" content="Quick Links" inverted style={{ marginBottom: '1.5em', color: '#fff', fontSize: '1.3em' }} />
          <List link inverted style={{ fontSize: '1.1rem' }}> 
            <List.Item as="a" href="#" style={{ marginBottom: '0.8em' }}>About Us</List.Item>
            <List.Item as="a" href="#" style={{ marginBottom: '0.8em' }}>Browse Cars</List.Item>
            <List.Item as="a" href="#" style={{ marginBottom: '0.8em' }}>Pricing</List.Item>
            <List.Item as="a" href="#" style={{ marginBottom: '0.8em' }}>Locations</List.Item>
            <List.Item as="a" href="#" style={{ marginBottom: '0.8em' }}>Contact</List.Item>
          </List>
        </Grid.Column>

        <Grid.Column>
          <Header as="h4" content="Get in Touch" inverted style={{ marginBottom: '1.5em', color: '#fff', fontSize: '1.3em' }} /> 
          <List inverted style={{ fontSize: '1.1rem' }}> 
            <List.Item style={{ marginBottom: '0.8em' }}>
              <Icon name="phone" color="blue" style={{ marginRight: '0.5em' }} /> +91 98765 43210
            </List.Item>
            <List.Item style={{ marginBottom: '0.8em' }}>
              <Icon name="mail" color="blue" style={{ marginRight: '0.5em' }} /> reachout@roadready.in
            </List.Item>
            <List.Item style={{ marginBottom: '0.8em' }}>
              <Icon name="map marker alternate" color="blue" style={{ marginRight: '0.5em' }} /> Ahilyanagar, Maharastra, India 414001
            </List.Item>
          </List>

          <Header as="h5" content="Subscribe to our newsletter" inverted style={{ marginTop: "2em", marginBottom: '1em', color: '#fff', fontSize: '1.2em' }} /> 
          <Input
            placeholder="Enter your email"
            action={{
              color: "blue",
              content: "Subscribe",
              style: { backgroundColor: '#214EFF', color: 'white', borderRadius: '0 5px 5px 0' } 
            }}
            fluid
            style={{ borderRadius: '5px' }} 
            input={{ style: { borderRadius: '5px 0 0 5px' } }} 
          />
        </Grid.Column>
      </Grid>

      <Divider inverted section style={{ margin: '4em 0 2em 0' }} /> 
      <div style={{ textAlign: "center", color: "#aaa", fontSize: '1rem' }}> 
        &copy; 2025 <strong>RoadReady</strong>. All rights reserved. Built by <strong>Mayuresh Firodiya</strong>.
      </div>
    </Segment>
  );
};

export default Footer;
