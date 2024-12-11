import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FB_PIXEL } from './FacebookPixel';

// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #1F2937;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const MainHeadline = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1F2937;
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const SubHeadline = styled.p`
  font-size: 1.25rem;
  color: #4B5563;
  margin-bottom: 2rem;
`;

const OpeningHook = styled.p`
  font-size: 1.125rem;
  color: #4B5563;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ImageWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  font-size: 1.125rem;
  color: #4B5563;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 1.125rem;
`;

const Highlight = styled.span`
  color: #DC2626;
  font-weight: 600;
`;

const SocialProof = styled.div`
  background: #F3F4F6;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  margin: 2rem 0;
`;

const GuaranteeBox = styled.div`
  background: #E0F2FE;
  border: 2px solid #3B82F6;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: center;
`;

const UrgencyBox = styled.div`
  background: #FEF2F2;
  border: 2px solid #EF4444;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: center;
`;

const Form = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  background: #F9FAFB;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #D1D5DB;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2563EB;
  }

  &:disabled {
    background: #F3F4F6;
  }
`;

const SubmitButton = styled.button`
  background: #2563EB;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1D4ED8;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.75rem;
  max-width: 90%;
  width: 500px;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const PopupTitle = styled.h2`
  color: #1F2937;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const PopupText = styled.p`
  color: #4B5563;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  background: #2563EB;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1D4ED8;
  }
`;

// Main Component
const DirectTV = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    clinicName: '',
  });
  const [metadata, setMetadata] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  useEffect(() => {
    FB_PIXEL.pageView();

    // Track booking page view
    FB_PIXEL.track('ViewContent', {
      content_name: 'Landing Page',
      content_category: 'Lead Form'
    });
    collectMetadata();
  }, []);

  const collectMetadata = async () => {
    try {
      const metadata = {
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
        referrer: document.referrer || 'direct',
      };

      setMetadata(metadata);
    } catch (error) {
      console.error('Error collecting metadata:', error);
    }
  };

  const getISTTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const { error } = await supabase
        .from('clinic_leads')
        .insert([{
          name: formData.name,
          phone: formData.phone,
          clinic_name: formData.clinicName,
          created_at: getISTTime(),
          ...metadata
        }]);

      if (error) throw error;

      // Track successful form submission
      FB_PIXEL.track('Lead', {
        content_name: 'Landing Page Submission',
        content_category: 'Lead Generation',
        clinic_name: formData.clinicName,
        status: 'success'
      });

      setStatus({ loading: false, error: null, success: true });
      setShowPopup(true);
    } catch (error) {
      // Track form submission error
      FB_PIXEL.track('Lead', {
        content_name: 'Landing Page Submission Error',
        content_category: 'Lead Generation',
        status: 'error'
      });

      setStatus({ loading: false, error: error.message, success: false });
      alert('Error submitting form. Please try again.');
    }
  };

  const handleClosePopup = () => {
    // Track when user completes the registration flow
    FB_PIXEL.track('CompleteRegistration', {
      content_name: 'Landing Page Registration Complete',
      status: 'success'
    });

    setShowPopup(false);
    setFormData({ name: '', phone: '', email: '', clinicName: '' });
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <MainHeadline>
          Imagine Never Losing Another 5-Star Review Over Wait Times…
        </MainHeadline>
        <SubHeadline>
          Clinics with average wait times over 20 minutes see 37% fewer 5-star reviews. But you don’t have to be part of that statistic.
        </SubHeadline>
      </Header>

      <OpeningHook>
        By now, you’ve probably noticed how long wait times can turn even your happiest patients into frustrated, dissatisfied ones. What if in less than 10 minutes , you could transform their experience—and your clinic’s reputation—for good?
      </OpeningHook>

      <ImageWrapper>
        {/* Replace the src with the path to your desired image */}
        <img src="/boverphoto.jpeg" alt="Serene Clinic Environment" />
      </ImageWrapper>



      <Section>
        <SectionTitle>Using Our Proven System:</SectionTitle>
        <List>
          <ListItem>
            <CheckCircle color="#10B981" />
            You’ll cut perceived wait times in half without adding staff.
          </ListItem>
          <ListItem>
            <CheckCircle color="#10B981" />
            Patients will feel prioritized and cared for.
          </ListItem>
          <ListItem>
            <CheckCircle color="#10B981" />
            Your clinic will be recognized as a leader in patient satisfaction.
          </ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Success Visualization</SectionTitle>
        <SectionText>
          Picture a future where every patient leaves a glowing review, your clinic stands out as the top choice in the community, and you feel the pride of knowing you’ve mastered patient care.
        </SectionText>
      </Section>

      <SocialProof>
        <SectionTitle>Clinics using NeoFlow Digital, report:</SectionTitle>
        <List>
          <ListItem>
            <CheckCircle color="#10B981" />
            A 50% boost in positive reviews within 30 days.
          </ListItem>
          <ListItem>
            <CheckCircle color="#10B981" />
            A dramatic improvement in patient retention and referrals.
          </ListItem>
        </List>
      </SocialProof>

      <GuaranteeBox>
        <SectionTitle>Our Guarantee</SectionTitle>
        <SectionText>
          We guarantee measurable results within 30 days—or you pay nothing. You have nothing to lose and everything to gain.
        </SectionText>
      </GuaranteeBox>

      <UrgencyBox>
        <Clock size={24} style={{ marginBottom: '1rem' }} />
        <SectionTitle>Limited Availability</SectionTitle>
        <SectionText>
          Only 10 clinics in your area will be eligible for this solution at our discounted rate of 41/day. Don’t wait—your competition won’t.
        </SectionText>
      </UrgencyBox>

      <Section>
        <SectionTitle>Take Action Now</SectionTitle>
        <SectionText>
          Take the first step toward transforming your clinic’s reputation. Fill out the form below, and let’s make long wait times a thing of the past.
        </SectionText>
      </Section>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Your Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status.loading}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={status.loading}
          />
        </FormGroup>
 
        <FormGroup>
          <Label htmlFor="clinicName">Clinic Name</Label>
          <Input
            type="text"
            id="clinicName"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleChange}
            required
            disabled={status.loading}
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={status.loading}>
          {status.loading ? 'Submitting...' : 'Transform My Clinic Now!'}
          <ArrowRight style={{ marginLeft: '0.5rem' }} />
        </SubmitButton>
      </Form>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>Thank You for Your Interest!</PopupTitle>
            <PopupText>
              We appreciate you taking the time to reach out. Our team will contact you within the next 24 hours at {formData.phone} or {formData.email} to schedule your personalized consultation.
              <br /><br />
              We look forward to helping you transform your clinic’s reputation.
            </PopupText>
            <CloseButton onClick={handleClosePopup}>
              Close
            </CloseButton>
          </PopupContent>
        </PopupOverlay>
      )}
    </Container>
  );
};

export default DirectTV;