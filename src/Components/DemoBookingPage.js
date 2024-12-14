import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FB_PIXEL } from './FacebookPixel';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const Section = styled.section`
  margin: 2rem 0;
`;

const Hero = styled(Section)`
  text-align: center;
  background: #3865ad;
  color: white;
  padding: 2rem 1rem;
  border-radius: 10px;
`;

const HeroHeadline = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const HeroSubheadline = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
`;



const CredibilitySection = styled(Section)`
  text-align: center;
`;

const CredibilityHeadline = styled.h2`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const CredibilityText = styled.p`
  font-size: 1.25rem;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const BoldCallout = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #1d4ed8;
  margin-top: 1.5rem;
`;

const CTASection = styled(Section)`
  text-align: center;
  background: #f9fafb;
  padding: 2rem 1rem;
  border-radius: 10px;
`;

const CTAHeadline = styled.h2`
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const SubmitButton = styled.button`
  background: #3865ad;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const DemoBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    clinicName: '',
  });
  const [metadata, setMetadata] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false,
  });

  useEffect(() => {
    FB_PIXEL.pageView();

    FB_PIXEL.track('ViewContent', {
      content_name: 'Landing Page',
      content_category: 'Lead Form',
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
      const { error } = await supabase.from('demo_bookings').insert([
        {
          name: formData.name,
          phone: formData.phone,
          clinic_name: formData.clinicName,
          created_at: new Date().toISOString(),
          ...metadata,
        },
      ]);
  
      if (error) throw error;
  
      FB_PIXEL.track('Lead', {
        content_name: 'Demo Booking Success',
        content_category: 'Lead Generation',
        clinic_name: formData.clinicName,
        status: 'success',
      });
  
      setStatus({ loading: false, error: null, success: true });
  
      // Show popup with the user's details
      const userConfirmed = window.confirm(
        `Thank you, ${formData.name}! Our team will reach out to you at ${formData.phone}.`
      );
  
      if (userConfirmed) {
        navigate('/');
      }
    } catch (error) {
      FB_PIXEL.track('Lead', {
        content_name: 'Demo Booking Error',
        content_category: 'Lead Generation',
        status: 'error',
      });
  
      setStatus({ loading: false, error: error.message, success: false });
      alert('Error submitting form. Please try again.');
    }
  };
  

  return (
    <Container>
      <Hero>
        <HeroHeadline>We Turn Complex Data into Simple, Actionable Insights</HeroHeadline>
        <HeroImage src={`${process.env.PUBLIC_URL}/landing.png`} alt="NeoFlow Dashboard" />
        <HeroSubheadline>
          Stop Burning Money on Marketing. Use Data to Hit the Right Buttons and Unlock Crazy Growth.
        </HeroSubheadline>
      </Hero>

      <CredibilitySection>
        <CredibilityHeadline>Our Partners See an Average of 3X Revenue Growth in 9 Months</CredibilityHeadline>
        <CredibilityText>
          In the age of AI, your data is your superpower. NeoFlow Analytica eliminates guesswork, empowering you
          with the confidence to make data-driven decisions that fuel real growth.
        </CredibilityText>
        <BoldCallout>Fill out the form below only if you’re serious about transforming your clinic's marketing ROI.</BoldCallout>
      </CredibilitySection>

      <CTASection>
        <CTAHeadline>Ready to See the Data That Drives Growth?</CTAHeadline>
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
            {status.loading ? 'Submitting...' : 'Get My Free Demo Now'}
          </SubmitButton>
        </Form>
      </CTASection>
    </Container>
  );
};

export default DemoBooking;
