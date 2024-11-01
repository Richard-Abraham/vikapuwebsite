import { createTransport } from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    const { parentEmail, playerName } = await request.json();

    await transporter.sendMail({
      from: '"Vikapu Elite Basketball" <info@vikapuelitebasketball.com>',
      to: parentEmail,
      subject: 'Welcome to Vikapu Elite Basketball!',
      html: `
        <h1>Welcome to Vikapu Elite Basketball!</h1>
        <p>Dear Parent/Guardian,</p>
        <p>Thank you for registering ${playerName} with Vikapu Elite Basketball Academy. 
        We're excited to have you join our basketball family!</p>
        <p>Your registration has been received and processed successfully.</p>
        <p>Next Steps:</p>
        <ul>
          <li>Attend orientation session</li>
          <li>Complete medical clearance</li>
          <li>Bring required equipment</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact us.</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 