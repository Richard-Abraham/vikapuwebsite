import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ programs: data });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 