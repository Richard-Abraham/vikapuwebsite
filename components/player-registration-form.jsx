"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create PDF styles
const pdfStyles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 10 },
  label: { fontSize: 12, color: '#666' },
  value: { fontSize: 14, marginBottom: 5 }
});

// PDF Document Component
const RegistrationPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Registration Form - Vikapu Elite Basketball</Text>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={pdfStyles.section}>
          <Text style={pdfStyles.label}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
          <Text style={pdfStyles.value}>{value?.toString() || ''}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default function PlayerRegistrationForm() {
  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    age: '',
    parentEmail: '',
    address: '',
    parentPhone: '',
    playerEmail: '',
    alternatePhone: '',
    school: '',
    residenceYear: '',
    guardianName: '',
    medicalConditions: '',
    medicalInsurance: '',
    medicalInstructions: '',
    sportExperience: '',
    termsAccepted: false,
    registrationDate: getCurrentDate()
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const sections = [
    {
      title: 'Player Information',
      fields: [
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
        { name: 'age', label: 'Age', type: 'text', readOnly: true }
      ]
    },
    {
      title: 'Contact Details',
      fields: [
        { name: 'parentEmail', label: 'Parent Email', type: 'email' },
        { name: 'parentPhone', label: 'Parent Phone', type: 'tel' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'playerEmail', label: 'Player Email', type: 'email' },
        { name: 'alternatePhone', label: 'Alternative Phone', type: 'tel' },
        { name: 'school', label: 'School', type: 'text' },
        { name: 'residenceYear', label: 'Year in School', type: 'text' }
      ]
    },
    {
      title: 'Medical & Guardian Information',
      fields: [
        { name: 'guardianName', label: 'Guardian Name', type: 'text' },
        { name: 'medicalConditions', label: 'Medical Conditions', type: 'text' },
        { name: 'medicalInsurance', label: 'Medical Insurance Institution', type: 'text' },
        { name: 'medicalInstructions', label: 'Special Medical Instructions', type: 'textarea' }
      ]
    },
    {
      title: 'Additional Information',
      fields: [
        { name: 'sportExperience', label: 'Sports Experience', type: 'textarea' },
        { name: 'termsAccepted', label: 'I accept the terms and conditions', type: 'checkbox' }
      ]
    }
  ];

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(prev => prev - 1);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Parent email is required';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.school.trim()) newErrors.school = 'School is required';
    if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms and conditions';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.parentEmail && !emailRegex.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Invalid email format';
    }
    if (formData.playerEmail && !emailRegex.test(formData.playerEmail)) {
      newErrors.playerEmail = 'Invalid email format';
    }

    // Phone number validation (simple regex for Kenya phone numbers)
    const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
    if (formData.parentPhone && !phoneRegex.test(formData.parentPhone.replace(/\s/g, ''))) {
      newErrors.parentPhone = 'Invalid phone number format';
    }
    if (formData.alternatePhone && !phoneRegex.test(formData.alternatePhone.replace(/\s/g, ''))) {
      newErrors.alternatePhone = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Calculate age when date of birth changes
    if (name === 'dateOfBirth') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prevState => ({
        ...prevState,
        age: age.toString()
      }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Send welcome email via API route
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            parentEmail: formData.parentEmail,
            playerName: `${formData.firstName} ${formData.lastName}`
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send welcome email');
        }

        // Show success message and PDF download button
        setShowSuccess(true);
        
      } catch (error) {
        console.error('Registration error:', error);
        alert('There was an error submitting the form');
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen py-12 px-4 relative overflow-hidden"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 bg-[#181411]">
        <motion.div
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#f2800d]/20 blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          initial={{ opacity: 0.2 }}
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#f2800d]/10 blur-[120px] transform translate-x-1/2 translate-y-1/2"
        />
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full bg-[#27211b]/30 blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Card with backdrop blur */}
      <Card className="relative w-full max-w-2xl mx-auto shadow-xl bg-[#27211b]/80 backdrop-blur-xl border-[#54473b] text-white">
        <CardHeader className="bg-[#1f1915]/90 p-6 rounded-t-lg border-b border-[#54473b]">
          <CardTitle className="text-2xl font-bold text-center">
            Player Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Section Progress Indicator */}
          <div className="flex justify-center space-x-2 mb-6">
            {sections.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-2 rounded-full transition-all duration-300 
                  ${activeSection === index ? 'bg-[#f2800d] w-8' : 'bg-gray-700'}`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Animated Section Title */}
            <h2 className="text-xl font-semibold text-center text-[#f2800d] mb-4">
              {sections[activeSection].title}
            </h2>

            {/* Dynamic Section Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              {sections[activeSection].fields.map(field => (
                <div key={field.name} className="space-y-2">
                  <Label 
                    htmlFor={field.name} 
                    className="text-gray-300"
                  >
                    {field.label}
                  </Label>
                  {field.type !== 'checkbox' ? (
                    <Input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      readOnly={field.readOnly}
                      className={`
                        bg-[#1f1915] border-[#54473b] text-white
                        focus:border-[#f2800d] focus:ring-[#f2800d]
                        ${errors[field.name] ? 'border-red-500' : ''}
                        ${field.readOnly ? 'opacity-50' : ''}
                      `}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        checked={formData[field.name]}
                        onCheckedChange={(checked) => {
                          setFormData(prevState => ({
                            ...prevState,
                            [field.name]: checked
                          }));
                        }}
                        className="border-[#54473b] data-[state=checked]:bg-[#f2800d]"
                      />
                      <Label htmlFor={field.name} className="text-gray-300">
                        I accept the terms and conditions
                      </Label>
                    </div>
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {activeSection > 0 && (
                <Button 
                  type="button" 
                  onClick={prevSection}
                  variant="outline"
                  className="border-[#54473b] text-white hover:bg-[#1f1915]"
                >
                  Previous
                </Button>
              )}
              
              {activeSection < sections.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={nextSection}
                  className="ml-auto bg-[#f2800d] hover:bg-[#f2800d]/90 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="ml-auto bg-[#f2800d] hover:bg-[#f2800d]/90 text-white"
                >
                  Submit Registration
                </Button>
              )}
            </div>

            {/* Registration Date */}
            <div className="text-center text-gray-500 text-sm">
              Registration Date: {formData.registrationDate}
            </div>
          </form>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center space-y-4"
            >
              <p className="text-green-500">Registration successful! Welcome email sent.</p>
              <PDFDownloadLink
                document={<RegistrationPDF data={formData} />}
                fileName={`registration-${formData.firstName}-${formData.lastName}.pdf`}
              >
                {({ loading }) => (
                  <Button 
                    className="bg-[#f2800d] hover:bg-[#f2800d]/90 text-white"
                    disabled={loading}
                  >
                    {loading ? 'Generating PDF...' : 'Download Registration Form (PDF)'}
                  </Button>
                )}
              </PDFDownloadLink>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
} 