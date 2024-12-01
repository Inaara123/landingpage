import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FB_PIXEL } from './FacebookPixel';


const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
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

const Button = styled.button`
  background: #2563EB;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  transition: background 0.2s;

  &:hover {
    background: #1D4ED8;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SocialProof = styled.div`
  background: #F3F4F6;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  margin: 2rem 0;
`;

const QualificationBox = styled.div`
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 2rem 0;
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

const Form = styled.form`
  max-width: 400px;
  margin: 2rem auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563EB;
  }
`;

const UrgencyBox = styled.div`
  background: #FEF2F2;
  border: 2px solid #EF4444;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: center;
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
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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

const DemoBookingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
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
        content_name: 'Demo Booking Page',
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
            .from('demo_bookings')
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
            content_name: 'Demo Booking Success',
            content_category: 'Lead Generation',
            clinic_name: formData.clinicName,
            status: 'success'
        });

        setStatus({ loading: false, error: null, success: true });
        setShowPopup(true);
    } catch (error) {
        // Track form submission error
        FB_PIXEL.track('Lead', {
            content_name: 'Demo Booking Error',
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
        content_name: 'Demo Booking Complete',
        status: 'success'
    });

    setShowPopup(false);
    setFormData({ name: '', phone: '', clinicName: '' });
    navigate('/');
};


  return (
    <Container>
      <Header>
        <MainHeadline>
          ATTENTION HYDERABAD DOCTORS:<br />
          Stop Losing ₹50,000+ Monthly Revenue In Your Waiting Room
        </MainHeadline>
        <SubHeadline>
          We Turn Dead Wait Time Into A Silent Sales Machine For Your Premium Procedures
          (While Making Patients Happier About Waiting)
        </SubHeadline>
      </Header>

      <SocialProof>
        <h3>Currently Used By Leading Clinics In Hyderabad:</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563EB' }}>
          47% Revenue Growth In 6 Months
        </p>
      </SocialProof>

      <QualificationBox>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          This Is For You If:
        </h2>
        <List>
          {[
            'You see 20+ patients daily',
            'Have a TV in your waiting area',
            'Want to grow aggressively in 2024',
            'Located in Hyderabad'
          ].map((item, index) => (
            <ListItem key={index}>
              <CheckCircle color="#10B981" />
              {item}
            </ListItem>
          ))}
        </List>
      </QualificationBox>

      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          What You'll Learn On The Demo:
        </h2>
        <List>
          {[
            'How to turn every minute patients wait into potential revenue oppurtunity',
            'Which locations bring your highest-value patients',
            'What marketing channels actually work for your clinic',
            'Hidden revenue opportunities in your patient data'
          ].map((item, index) => (
            <ListItem key={index}>
              <ArrowRight color="#2563EB" />
              {item}
            </ListItem>
          ))}
        </List>
      </div>

      <UrgencyBox>
        <Clock size={24} style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Only Accepting 5 New Clinics This Month
        </h3>
        <p>
          First 3 Get Analytics Suite Free For 3 Months<br />
          <strong>(₹15,000 Value)</strong>
        </p>
      </UrgencyBox>

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
        <Button type="submit" disabled={status.loading}>
          {status.loading ? 'Submitting...' : 'BOOK YOUR 15-MIN DEMO'} 
          <ArrowRight style={{ marginLeft: '0.5rem' }} />
        </Button>
      </Form>

      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <PopupTitle>Thank You for Your Interest!</PopupTitle>
            <PopupText>
              We appreciate you taking the time to reach out. Our team will contact you within the next 24 hours at {formData.phone} to schedule your personalized demo session.
              <br /><br />
              We look forward to showing you how we can help grow your clinic's revenue.
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

export default DemoBookingPage;