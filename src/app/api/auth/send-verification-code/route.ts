import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'
import { isDisposableEmail } from '@/lib/disposable-email-detector'
import { supabase } from '@/lib/supabase'

// Fonction pour générer un code de vérification à 6 chiffres
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Configuration SMTP OVH
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'ssl0.ovh.net',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'contact@be2web.fr',
    pass: process.env.SMTP_PASSWORD
  }
})

// Template HTML pour l'email de vérification
const getEmailTemplate = (code: string) => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code de vérification - IA Recrutement Pro</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #0891b2 0%, #1e40af 100%);
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            color: #e0f2fe;
            margin: 10px 0 0 0;
            font-size: 16px;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .content h2 {
            color: #1e293b;
            margin: 0 0 20px 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content p {
            color: #64748b;
            margin: 0 0 30px 0;
            font-size: 16px;
        }
        .code-container {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border: 2px solid #0891b2;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            display: inline-block;
        }
        .verification-code {
            font-size: 36px;
            font-weight: 700;
            color: #0891b2;
            letter-spacing: 8px;
            margin: 0;
            font-family: 'Courier New', monospace;
        }
        .code-label {
            color: #475569;
            font-size: 14px;
            margin: 10px 0 0 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .warning {
            background-color: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        .warning p {
            color: #92400e;
            margin: 0;
            font-size: 14px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        .footer p {
            color: #64748b;
            margin: 0;
            font-size: 14px;
        }
        .footer a {
            color: #0891b2;
            text-decoration: none;
        }
        .security-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px auto;
            background: linear-gradient(135deg, #0891b2 0%, #1e40af 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛡️ IA Recrutement Pro</h1>
            <p>Votre solution de recrutement intelligente</p>
        </div>
        
        <div class="content">
            <div class="security-icon">
                <span style="color: white; font-size: 24px;">🔐</span>
            </div>
            
            <h2>Code de vérification</h2>
            <p>Voici votre code de vérification pour accéder à notre service :</p>
            
            <div class="code-container">
                <div class="verification-code">${code}</div>
                <div class="code-label">Code de vérification</div>
            </div>
            
            <p>Ce code est valide pendant <strong>10 minutes</strong>.</p>
            
            <div class="warning">
                <p><strong>⚠️ Important :</strong> Si vous n'avez pas demandé ce code, ignorez cet email. Ne partagez jamais ce code avec qui que ce soit.</p>
            </div>
        </div>
        
        <div class="footer">
            <p>Cet email a été envoyé automatiquement par <a href="https://ia-recrutement-pro.francoform.com">IA Recrutement Pro</a></p>
            <p>© 2024 IA Recrutement Pro - Tous droits réservés</p>
        </div>
    </div>
</body>
</html>
`

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validation de l'email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Vérifier si l'email est temporaire/jetable
    if (await isDisposableEmail(email)) {
      return NextResponse.json(
        { error: 'Les adresses email temporaires ne sont pas autorisées. Veuillez utiliser une adresse email permanente.' },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    // Générer un code de vérification à 6 chiffres
    const code = generateVerificationCode()

    // Créer ou mettre à jour l'utilisateur avec le code de vérification
    if (existingUser) {
      await supabase
        .from('users')
        .update({
          verification_code: code,
          code_generated_at: new Date().toISOString(),
          verified: false,
          updated_at: new Date().toISOString()
        })
        .eq('email', email)
    } else {
      await supabase
        .from('users')
        .insert({
          email,
          verification_code: code,
          code_generated_at: new Date().toISOString(),
          verified: false
        })
    }

    // Envoyer l'email
    await transporter.sendMail({
      from: `"IA Recrutement Pro" <${process.env.SMTP_USER || 'contact@be2web.fr'}>`,
      to: email,
      subject: '🔐 Votre code de vérification - IA Recrutement Pro',
      html: getEmailTemplate(code),
      text: `Votre code de vérification pour IA Recrutement Pro est : ${code}\\n\\nCe code est valide pendant 10 minutes.\\n\\nSi vous n'avez pas demandé ce code, ignorez cet email.`
    })

    return NextResponse.json(
      { message: 'Code envoyé avec succès' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur lors de l\'envoi du code:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du code' },
      { status: 500 }
    )
  }
}