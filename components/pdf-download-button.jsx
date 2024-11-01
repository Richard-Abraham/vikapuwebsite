'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 40,
    backgroundColor: 'white' 
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  title: { 
    fontSize: 24, 
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    marginBottom: 20
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    padding: 5,
  },
  field: {
    marginBottom: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  label: { 
    fontSize: 12,
    width: '40%',
  },
  value: { 
    fontSize: 12,
    width: '60%',
  }
});

const RegistrationDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Vikapu Elite Basketball</Text>
        <Text style={styles.date}>Registration Date: {new Date().toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{data.firstName} {data.lastName}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{data.dateOfBirth}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{data.age}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{data.gender}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Parent Email:</Text>
          <Text style={styles.value}>{data.parentEmail}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Parent Phone:</Text>
          <Text style={styles.value}>{data.parentPhone}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{data.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>School Information</Text>
        <View style={styles.field}>
          <Text style={styles.label}>School:</Text>
          <Text style={styles.value}>{data.school}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Year of Residence:</Text>
          <Text style={styles.value}>{data.residenceYear}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Information</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Medical Conditions:</Text>
          <Text style={styles.value}>{data.medicalConditions}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Medical Insurance:</Text>
          <Text style={styles.value}>{data.medicalInsurance}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export function PDFDownloadButton({ formData }) {
  if (typeof window === 'undefined') return null;

  return (
    <PDFDownloadLink
      document={<RegistrationDocument data={formData} />}
      fileName={`${formData.firstName}-${formData.lastName}-registration.pdf`}
    >
      {({ loading }) => (
        <Button 
          disabled={loading}
          className="w-full bg-[#f2800d] hover:bg-[#f2800d]/90 text-white"
        >
          {loading ? 'Generating PDF...' : 'Download Registration Form (PDF)'}
        </Button>
      )}
    </PDFDownloadLink>
  );
} 