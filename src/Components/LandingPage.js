import React from 'react';
import styled from 'styled-components';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NavBar = styled.nav`
  background-color: #2563eb;
  padding: 1.5rem;

  z-index: 100;
`;

const LogoContainer = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;  /* Centers horizontally */
  align-items: center;     /* Centers vertically */
`;

const Logo = styled.img`
  height: 240px;  /* Increased from 50px to 80px */
  width: auto;
  
  @media (max-width: 640px) {
    height: 150px;  /* Increased mobile size from 40px to 60px */
  }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: white;
`;

const Section = styled.section`
  padding: 4rem 1rem;
  ${props => props.hero && `
    background: linear-gradient(to bottom right, #EFF6FF, #FFFFFF);
  `}
  ${props => props.gray && `
    background: #F9FAFB;
  `}
  ${props => props.cta && `
    background: #2563EB;
    color: white;
  `}
`;

const MaxWidthWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  text-align: ${props => props.center ? 'center' : 'left'};
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 1.5rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.primary && `
    background: #2563EB;
    color: white;
    &:hover {
      background: #1D4ED8;
    }
  `}

  ${props => props.secondary && `
    background: white;
    color: #2563EB;
    &:hover {
      background: #F3F4F6;
    }
  `}
`;

const Heading1 = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const Heading2 = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${props => props.light ? 'white' : '#111827'};
  margin-bottom: 2rem;
  text-align: center;
`;

const Subheading = styled.span`
  display: block;
  font-size: 1.5rem;
  color: #4B5563;
  margin-top: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Metric = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  color: #2563EB;
  margin: 0;
`;

const MetricLabel = styled.p`
  color: #4B5563;
  margin: 0.5rem 0 0;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 1.125rem;
`;

const LandingPage = () => {
    const navigate = useNavigate();

  const handleBookDemo = () => {
    navigate('/book-demo');
  };

  return (
    <Container>
                    <NavBar>
                <LogoContainer>
                    <Logo src="/nobglogo.png" alt="Company Logo" />
                </LogoContainer>
            </NavBar>
      {/* Hero Section */}
      <Section hero>
        <MaxWidthWrapper center>
          <Heading1>
            We Turn Your Clinic's Wait Time Into A Sales Machine
            <Subheading>
              While Making Patients Happier About Waiting
            </Subheading>
          </Heading1>
          <Button primary onClick={handleBookDemo}>
            BOOK YOUR DEMO <ArrowRight style={{ marginLeft: '0.5rem' }} />
          </Button>
        </MaxWidthWrapper>
      </Section>

      {/* Social Proof */}
      <Section gray>
        <MaxWidthWrapper>
          <Grid>
            <Card>
              <Metric>₹50,000+</Metric>
              <MetricLabel>Additional Monthly Revenue</MetricLabel>
            </Card>
            <Card>
              <Metric>47%</Metric>
              <MetricLabel>Revenue Growth in 6 Months</MetricLabel>
            </Card>
            <Card>
              <Metric>32%</Metric>
              <MetricLabel>Increase in Premium Bookings</MetricLabel>
            </Card>
          </Grid>
        </MaxWidthWrapper>
      </Section>

      {/* Qualification Section */}
      <Section>
        <MaxWidthWrapper>
          <Heading2>This Is For You If:</Heading2>
          <Grid>
            {[
              'You see 20+ patients daily',
              'Have a TV in your waiting area',
              'Want to grow aggressively',
              'Located in Hyderabad'
            ].map((item, index) => (
              <Card key={index}>
                <ListItem>
                  <CheckCircle color="#10B981" />
                  {item}
                </ListItem>
              </Card>
            ))}
          </Grid>
        </MaxWidthWrapper>
      </Section>

      {/* Problem Section */}
      <Section gray>
        <MaxWidthWrapper>
          <Heading2>Right Now In Your Clinic:</Heading2>
          <List>
            {[
              'Patients hate uncertainty while waiting',
              'Premium procedures go unnoticed',
              'Marketing spend wastes money on wrong channels',
              "You don't know which locations bring best patients"
            ].map((problem, index) => (
              <Card key={index} style={{ marginBottom: '1rem' }}>
                <ListItem>
                  <ChevronRight color="#EF4444" />
                  {problem}
                </ListItem>
              </Card>
            ))}
          </List>
        </MaxWidthWrapper>
      </Section>

      {/* Solution Section */}
      <Section>
        <MaxWidthWrapper>
          <Heading2>Our System Delivers:</Heading2>
          <Grid>
            <Card>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                Queue Management That Sells
              </h3>
              <List>
                {[
                  'Display live queue updates',
                  'Showcase your expertise',
                  'Plant seeds for premium procedures'
                ].map((item, index) => (
                  <ListItem key={index}>
                    <CheckCircle color="#10B981" />
                    {item}
                  </ListItem>
                ))}
              </List>
            </Card>
            <Card>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                Spider Sense Analytics
              </h3>
              <List>
                {[
                  'See exactly where best patients come from',
                  'Know which marketing actually works',
                  'Uncover hidden revenue opportunities'
                ].map((item, index) => (
                  <ListItem key={index}>
                    <CheckCircle color="#10B981" />
                    {item}
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </MaxWidthWrapper>
      </Section>

      {/* Final CTA */}
      <Section cta>
        <MaxWidthWrapper center>
          <Heading2 light>Limited To 5 New Clinics This Month</Heading2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            Book Your 15-Min Demo Now
          </p>
          <Button secondary onClick={handleBookDemo}>
            BOOK YOUR DEMO <ArrowRight style={{ marginLeft: '0.5rem' }} />
          </Button>
        </MaxWidthWrapper>
      </Section>
    </Container>
  );
};

export default LandingPage;