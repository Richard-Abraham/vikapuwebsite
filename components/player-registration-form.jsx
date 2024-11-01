"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

// Dynamic import of PDFDownloadButton
const PDFDownloadButton = dynamic(
  () => import('./pdf-generator').then(mod => mod.PDFDownloadButton),
  { 
    ssr: false,
    loading: () => (
      <Button disabled className="w-full bg-[#f2800d] hover:bg-[#f2800d]/90 text-white opacity-50">
        Loading PDF Generator...
      </Button>
    )
  }
);

// Initialize all form fields with empty strings
const initialFormData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  age: '',
  gender: '',
  parentEmail: '',
  parentPhone: '',
  address: '',
  playerEmail: '',
  alternatePhone: '',
  school: '',
  residenceYear: '',
  guardianName: '',
  medicalConditions: '',
  medicalInsurance: '',
  medicalInstructions: '',
  sportExperience: '',
  termsAccepted: false
};

// Add this function at the top of your component file, before the component definition
const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export default function PlayerRegistrationForm() {
  // Use the initialFormData object
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  // Add state for active section
  const [activeSection, setActiveSection] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const sections = [
    {
      title: 'Player Information',
      fields: [
        { 
          name: 'firstName', 
          label: 'First Name', 
          type: 'text',
          autoComplete: 'given-name',
          required: true 
        },
        { 
          name: 'lastName', 
          label: 'Last Name', 
          type: 'text',
          autoComplete: 'family-name',
          required: true 
        },
        { 
          name: 'dateOfBirth', 
          label: 'Date of Birth', 
          type: 'date',
          autoComplete: 'bday',
          required: true 
        },
        { 
          name: 'age', 
          label: 'Age', 
          type: 'number',
          autoComplete: 'off',
          readOnly: true 
        },
        { 
          name: 'gender', 
          label: 'Gender', 
          type: 'select',
          autoComplete: 'sex',
          required: true,
          options: [
            { value: '', label: 'Select Gender' },
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]
        }
      ]
    },
    {
      title: 'Contact Information',
      fields: [
        { 
          name: 'parentEmail', 
          label: 'Parent Email', 
          type: 'email',
          autoComplete: 'email',
          required: true 
        },
        { 
          name: 'parentPhone', 
          label: 'Parent Phone', 
          type: 'tel',
          autoComplete: 'tel',
          required: true 
        },
        { 
          name: 'address', 
          label: 'Address', 
          type: 'text',
          autoComplete: 'street-address',
          required: true 
        },
        { 
          name: 'playerEmail', 
          label: 'Player Email (Optional)', 
          type: 'email',
          autoComplete: 'email' 
        },
        { 
          name: 'alternatePhone', 
          label: 'Alternate Phone (Optional)', 
          type: 'tel',
          autoComplete: 'tel' 
        }
      ]
    },
    {
      title: 'School Information',
      fields: [
        { 
          name: 'school', 
          label: 'School Name', 
          type: 'text',
          autoComplete: 'organization',
          required: true 
        },
        { 
          name: 'residenceYear', 
          label: 'Year of Residence', 
          type: 'select',
          autoComplete: 'off',
          required: true,
          options: [
            { value: '', label: 'Select Year' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8', label: '8' },
            { value: '9', label: '9' },
            { value: '10', label: '10' }
          ]
        },
        { 
          name: 'guardianName', 
          label: 'Guardian Name', 
          type: 'text',
          autoComplete: 'name',
          required: true 
        }
      ]
    },
    {
      title: 'Medical Information',
      fields: [
        { 
          name: 'medicalConditions', 
          label: 'Medical Conditions', 
          type: 'textarea',
          autoComplete: 'off',
          required: true 
        },
        { 
          name: 'medicalInsurance', 
          label: 'Medical Insurance', 
          type: 'text',
          autoComplete: 'off',
          required: true 
        },
        { 
          name: 'medicalInstructions', 
          label: 'Special Medical Instructions', 
          type: 'textarea',
          autoComplete: 'off',
          required: true 
        }
      ]
    },
    {
      title: 'Additional Information',
      fields: [
        { 
          name: 'sportExperience', 
          label: 'Years of Sports Experience', 
          type: 'select',
          options: [
            { value: '', label: 'Select Years' },
            { value: '0', label: '0' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8', label: '8' },
            { value: '9', label: '9' },
            { value: '10', label: '10' }
          ]
        },
        { name: 'termsAccepted', label: 'I accept the terms and conditions', type: 'checkbox' }
      ]
    }
  ];

  // Add function to handle section navigation
  const handleNextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(prev => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(prev => prev - 1);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let firstErrorField = null;

    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Parent email is required';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.school.trim()) newErrors.school = 'School is required';
    if (!formData.residenceYear) newErrors.residenceYear = 'Year of residence is required';
    if (!formData.guardianName.trim()) newErrors.guardianName = 'Guardian name is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms and conditions';

    // Email validation with more strict regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Invalid email format';
    }
    if (formData.playerEmail && !emailRegex.test(formData.playerEmail)) {
      newErrors.playerEmail = 'Invalid email format';
    }

    // Medical information validation
    const medicalRegex = /^[a-zA-Z\s]+$|^N\/A$/;
    if (!medicalRegex.test(formData.medicalConditions)) {
      newErrors.medicalConditions = 'Only letters or N/A allowed';
    }
    if (!medicalRegex.test(formData.medicalInstructions)) {
      newErrors.medicalInstructions = 'Only letters or N/A allowed';
    }

    // Phone number validation (Kenya)
    const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
    if (!phoneRegex.test(formData.parentPhone.replace(/\s/g, ''))) {
      newErrors.parentPhone = 'Invalid phone number format';
    }
    if (formData.alternatePhone && !phoneRegex.test(formData.alternatePhone.replace(/\s/g, ''))) {
      newErrors.alternatePhone = 'Invalid phone number format';
    }

    setFormErrors(newErrors);
    
    // If there are errors, find which section contains the first error
    if (Object.keys(newErrors).length > 0) {
      // Get the first error field name
      firstErrorField = Object.keys(newErrors)[0];
      
      // Find which section contains this field
      const errorSection = sections.findIndex(section =>
        section.fields.some(field => field.name === firstErrorField)
      );
      
      // Set the active section to the one containing the error
      setActiveSection(errorSection);
      
      // Show error toast
      setSuccessMessage(`Please check the ${sections[errorSection].title} section for errors`);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is modified
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calculate age if dateOfBirth changes
    if (name === 'dateOfBirth' && value) {
      const age = calculateAge(value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        age: age.toString()
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setIsSubmitting(true);
    
    if (validateForm()) {
      console.log('Form validated');
      try {
        console.log('Submitting to Supabase:', formData);
        const { data, error } = await supabase
          .from('players')
          .insert([
            {
              first_name: formData.firstName,
              last_name: formData.lastName,
              date_of_birth: formData.dateOfBirth,
              age: parseInt(formData.age),
              gender: formData.gender,
              parent_email: formData.parentEmail,
              parent_phone: formData.parentPhone,
              address: formData.address,
              player_email: formData.playerEmail || null,
              alternate_phone: formData.alternatePhone || null,
              school: formData.school,
              residence_year: formData.residenceYear,
              guardian_name: formData.guardianName,
              medical_conditions: formData.medicalConditions,
              medical_insurance: formData.medicalInsurance,
              medical_instructions: formData.medicalInstructions,
              sport_experience: formData.sportExperience
            }
          ])
          .select();

        console.log('Supabase response:', { data, error });

        if (error) throw error;

        setSuccessMessage("Registration Successful! Thank you for registering with Vikapu Elite Basketball.");
        setFormData(initialFormData);
        setActiveSection(0);
        
        setShowSuccess(true);

      } catch (error) {
        console.error('Registration error:', error);
        setSuccessMessage(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form validation failed', formErrors);
      setIsSubmitting(false);
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

          {/* Add this after the section progress indicator (around line 519): */}
          {Object.keys(formErrors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-md p-4 mb-6"
            >
              <p className="text-red-400 text-sm">
                Please correct the following errors:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {Object.entries(formErrors).map(([field, error]) => (
                  <li key={field} className="text-red-400 text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

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
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className={`
                        w-full rounded-md px-3 py-2
                        bg-[#1f1915] border-[#54473b] text-white
                        focus:border-[#f2800d] focus:ring-[#f2800d]
                        ${formErrors[field.name] ? 'border-red-500' : 'border-gray-300'}
                      `}
                      required={field.required}
                    >
                      {field.options.map(option => (
                        <option 
                          key={option.value} 
                          value={option.value}
                          className="bg-[#1f1915] text-white"
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
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
                  ) : (
                    <Input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      readOnly={field.readOnly}
                      className={`
                        bg-[#1f1915] border-[#54473b] text-white
                        focus:border-[#f2800d] focus:ring-[#f2800d]
                        ${formErrors[field.name] ? 'border-red-500' : 'border-gray-300'}
                        ${field.readOnly ? 'opacity-50' : ''}
                      `}
                    />
                  )}
                  {formErrors[field.name] && (
                    <p className="text-red-500 text-sm">{formErrors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {activeSection > 0 && (
                <Button 
                  type="button" 
                  onClick={handlePrevSection}
                  variant="outline"
                  className="border-[#54473b] text-white hover:bg-[#1f1915]"
                >
                  Previous
                </Button>
              )}
              
              {activeSection < sections.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleNextSection}
                  className="ml-auto bg-[#f2800d] hover:bg-[#f2800d]/90 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="ml-auto bg-[#f2800d] hover:bg-[#f2800d]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
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
              <div className="bg-green-500/10 border border-green-500/20 rounded-md p-6">
                <p className="text-green-400 mb-4">{successMessage}</p>
                
                <div className="space-y-4">
                  {console.log('Form data being passed:', formData)}
                  <PDFDownloadButton formData={formData} />

                  <Button 
                    onClick={() => {
                      setShowSuccess(false);
                      setFormData(initialFormData);
                      setActiveSection(0);
                    }} 
                    variant="outline"
                    className="w-full border-[#54473b] text-white hover:bg-[#1f1915]"
                  >
                    Register Another Player
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {successMessage && (
            <div className={`text-center p-4 rounded-md ${
              successMessage.includes('Error') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {successMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
} 
