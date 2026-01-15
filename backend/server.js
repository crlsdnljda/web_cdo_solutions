const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['POST', 'GET'],
}));
app.use(express.json());

// SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Faltan campos requeridos: name, email, message',
      });
    }

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Nuevo contacto desde cdo.solutions: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00D46A; border-bottom: 2px solid #00D46A; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 120px;">Nombre:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Empresa:</td>
              <td style="padding: 10px;">${company}</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 20px; padding: 20px; background: #f9f9f9; border-left: 4px solid #00D46A;">
            <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
            <p style="white-space: pre-wrap; color: #555;">${message}</p>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Este mensaje fue enviado desde el formulario de contacto de cdo.solutions
          </p>
        </div>
      `,
      text: `
Nuevo contacto desde cdo.solutions

Nombre: ${name}
Email: ${email}
${company ? `Empresa: ${company}` : ''}

Mensaje:
${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log(`Email enviado: ${name} <${email}>`);

    res.json({
      success: true,
      message: 'Mensaje enviado correctamente',
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({
      success: false,
      error: 'Error al enviar el mensaje. Inténtalo de nuevo más tarde.',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`SMTP configured for: ${process.env.SMTP_HOST}`);
});
