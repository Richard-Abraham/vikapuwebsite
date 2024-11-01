"use client";

import React from 'react';
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
    color: '#f2800d'
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    backgroundColor: '#f5f5f5',
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
    color: '#666',
  },
  value: { 
    fontSize: 12,
    width: '60%',
    color: '#000',
  }
});

export const RegistrationDocument = ({ data }) => {
  if (!data) return null;

  const sections = [
    {
      title: 'Personal Information',
      fields: ['firstName', 'lastName', 'dateOfBirth', 'age', 'gender']
    },
    {
      title: 'Contact Information',
      fields: ['parentEmail', 'parentPhone', 'address', 'playerEmail', 'alternatePhone']
    },
    {
      title: 'School Information',
      fields: ['school', 'residenceYear', 'guardianName']
    },
    {
      title: 'Medical Information',
      fields: ['medicalConditions', 'medicalInsurance', 'medicalInstructions']
    },
    {
      title: 'Sports Experience',
      fields: ['sportExperience']
    }
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Vikapu Elite Basketball</Text>
          <Text style={styles.date}>Registration Date: {data.registrationDate}</Text>
        </View>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.fields.map(field => {
              if (!data[field]) return null;
              return (
                <View key={field} style={styles.field}>
                  <Text style={styles.label}>{field}:</Text>
                  <Text style={styles.value}>{data[field]}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </Page>
    </Document>
  );
};