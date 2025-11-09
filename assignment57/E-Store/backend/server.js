// Simple Express server for sending emails
// Run: node backend/server.js

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY); // Get from https://resend.com

app.use(cors());
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const { type, to, subject, html } = req.body;

    const { data, error } = await resend.emails.send({
      from: 'Your Store <onboarding@resend.dev>', // Change to your verified domain
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ success: false, error: error.message });
    }

    console.log('✅ Email sent:', data);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`📧 Email server running on port ${PORT}`);
});