"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('players')
          .select('count')
          .limit(1)
          .single();

        if (error) throw error;
        setStatus('Connection successful!');
        console.log('Supabase connection verified:', data);
      } catch (error) {
        setStatus(`Connection failed: ${error.message}`);
        console.error('Supabase connection error:', error);
      }
    };

    testConnection();
  }, []);

  return <div className="text-sm text-gray-500">{status}</div>;
} 