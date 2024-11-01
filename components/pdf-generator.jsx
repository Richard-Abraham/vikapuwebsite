'use client';

import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export function PDFDownloadButton({ formData }) {
  const [isLoading, setIsLoading] = useState(false);

  const generatePDF = async () => {
    setIsLoading(true);
    try {
      // Fetch the most recent registration
      const { data: registrationData, error } = await supabase
        .from('players')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      console.log('Fetched registration data:', registrationData);

      const doc = new jsPDF();
      
      // Set initial styles
      doc.setFont('helvetica');
      
      // Title and Header
      doc.setFontSize(20);
      doc.text('Vikapu Elite Basketball Registration', 105, 20, { align: 'center' });
      
      let y = 50;

      // Personal Information Section
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Personal Information', 20, y);
      y += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      
      // Use the database field names
      doc.text(`Full Name: ${registrationData.first_name} ${registrationData.last_name}`, 20, y); y += 8;
      doc.text(`Date of Birth: ${registrationData.date_of_birth}`, 20, y); y += 8;
      doc.text(`Age: ${registrationData.age}`, 20, y); y += 8;
      doc.text(`Gender: ${registrationData.gender || 'Not specified'}`, 20, y); y += 15;

      // Contact Information Section
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Contact Information', 20, y);
      y += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Parent Email: ${registrationData.parent_email}`, 20, y); y += 8;
      doc.text(`Parent Phone: ${registrationData.parent_phone}`, 20, y); y += 8;
      doc.text(`Address: ${registrationData.address}`, 20, y); y += 8;
      doc.text(`Player Email: ${registrationData.player_email || 'Not provided'}`, 20, y); y += 8;
      doc.text(`Alternate Phone: ${registrationData.alternate_phone || 'Not provided'}`, 20, y); y += 15;

      // School Information Section
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('School Information', 20, y);
      y += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`School: ${registrationData.school}`, 20, y); y += 8;
      doc.text(`Year of Residence: ${registrationData.residence_year}`, 20, y); y += 8;
      doc.text(`Guardian Name: ${registrationData.guardian_name}`, 20, y); y += 15;

      // Medical Information Section
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Medical Information', 20, y);
      y += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Medical Conditions: ${registrationData.medical_conditions || 'None'}`, 20, y); y += 8;
      doc.text(`Medical Insurance: ${registrationData.medical_insurance || 'None'}`, 20, y); y += 8;
      doc.text(`Medical Instructions: ${registrationData.medical_instructions || 'None'}`, 20, y); y += 15;

      // Sports Experience Section
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Sports Experience', 20, y);
      y += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Years of Experience: ${registrationData.sport_experience || 'Not specified'}`, 20, y);

      // Add footer with registration date
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      const registrationDate = new Date(registrationData.created_at).toLocaleDateString();
      doc.text(`Registration Date: ${registrationDate}`, 105, 285, { align: 'center' });

      // Save the PDF
      doc.save(`${registrationData.first_name}-${registrationData.last_name}-registration.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={generatePDF}
      disabled={isLoading}
      className="w-full bg-[#f2800d] hover:bg-[#f2800d]/90 text-white disabled:opacity-50"
    >
      {isLoading ? 'Generating PDF...' : 'Download Registration Form (PDF)'}
    </Button>
  );
} 