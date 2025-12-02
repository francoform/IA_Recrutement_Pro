import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { to, from, cc, subject, message, candidateName } = await request.json();

    // Configuration du transporteur SMTP OVH
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'ssl0.ovh.net',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true', // SSL
      auth: {
        user: process.env.SMTP_USER || 'contact@be2web.fr',
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Options de l'email
    const mailOptions = {
      from: `"${from}" <${process.env.SMTP_USER || 'contact@be2web.fr'}>`,
      to: to,
      cc: cc || undefined,
      replyTo: from,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px;">
          <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Bonjour ${candidateName},</h2>
            <div style="color: #555; line-height: 1.6; white-space: pre-line;">
              ${message}
            </div>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 12px; margin: 0;">
              Cet email a été envoyé depuis le système de recrutement IA Recrutement Pro.<br>
              Pour répondre, utilisez directement l'adresse : ${from}
            </p>
          </div>
        </div>
      `
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}