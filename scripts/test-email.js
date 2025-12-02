#!/usr/bin/env node

/**
 * Script de test pour l'envoi d'email via OVH
 * Usage: node scripts/test-email.js
 */

require('dotenv').config({ path: '.env' });
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log('🔧 Configuration SMTP:');
    console.log(`   Host: ${process.env.SMTP_HOST || 'ssl0.ovh.net'}`);
    console.log(`   Port: ${process.env.SMTP_PORT || '465'}`);
    console.log(`   User: ${process.env.SMTP_USER || 'contact@be2web.fr'}`);
    console.log(`   Secure: ${process.env.SMTP_SECURE || 'true'}`);
    console.log('');

    // Configuration du transporteur SMTP OVH
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'ssl0.ovh.net',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER || 'contact@be2web.fr',
            pass: process.env.SMTP_PASSWORD
        },
        debug: true, // Active les logs détaillés
        logger: true // Active le logger
    });

    try {
        console.log('📧 Test de connexion SMTP...');
        await transporter.verify();
        console.log('✅ Connexion SMTP réussie!\n');

        console.log('📨 Envoi de l\'email de test...');
        const info = await transporter.sendMail({
            from: `"IA Recrutement Pro - Test" <${process.env.SMTP_USER || 'contact@be2web.fr'}>`,
            to: 'marcfonseca95150@gmail.com',
            subject: '✅ Test SMTP OVH - IA Recrutement Pro',
            html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Test Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="background: linear-gradient(135deg, #0891b2 0%, #1e40af 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px;">✅ Test SMTP Réussi</h1>
                    <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px;">Configuration OVH Opérationnelle</p>
                </div>
                
                <div style="padding: 40px 30px;">
                    <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">Configuration Testée</h2>
                    
                    <div style="background: #f1f5f9; border-left: 4px solid #0891b2; padding: 20px; margin: 20px 0; border-radius: 4px;">
                        <p style="margin: 0; color: #334155;"><strong>Serveur SMTP:</strong> ${process.env.SMTP_HOST || 'ssl0.ovh.net'}</p>
                        <p style="margin: 10px 0 0 0; color: #334155;"><strong>Port:</strong> ${process.env.SMTP_PORT || '465'} (SSL)</p>
                        <p style="margin: 10px 0 0 0; color: #334155;"><strong>Utilisateur:</strong> ${process.env.SMTP_USER || 'contact@be2web.fr'}</p>
                    </div>

                    <p style="color: #64748b; margin: 20px 0; font-size: 16px;">
                        Cet email de test confirme que la configuration SMTP est correcte et que les emails peuvent être envoyés depuis l'application <strong>IA Recrutement Pro</strong>.
                    </p>

                    <div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 20px; margin: 30px 0;">
                        <p style="margin: 0; color: #166534; font-size: 14px;">
                            ✅ <strong>Statut:</strong> Tous les systèmes sont opérationnels
                        </p>
                    </div>

                    <p style="color: #94a3b8; font-size: 14px; margin: 30px 0 0 0; text-align: center;">
                        Date du test: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
                    </p>
                </div>
                
                <div style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #64748b; margin: 0; font-size: 14px;">
                        Cet email a été envoyé automatiquement par <strong>IA Recrutement Pro</strong>
                    </p>
                    <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px;">
                        © 2024 Be2Web - Tous droits réservés
                    </p>
                </div>
            </div>
        </body>
        </html>
      `,
            text: `
TEST SMTP OVH - IA Recrutement Pro
==================================

✅ Configuration testée avec succès !

Serveur SMTP: ${process.env.SMTP_HOST || 'ssl0.ovh.net'}
Port: ${process.env.SMTP_PORT || '465'} (SSL)
Utilisateur: ${process.env.SMTP_USER || 'contact@be2web.fr'}

Cet email de test confirme que la configuration SMTP est correcte et que les emails 
peuvent être envoyés depuis l'application IA Recrutement Pro.

Date du test: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
      `
        });

        console.log('✅ Email envoyé avec succès!');
        console.log(`   Message ID: ${info.messageId}`);
        console.log(`   Réponse: ${info.response}`);
        console.log('');
        console.log('📬 Vérifiez la boîte de réception de: marcfonseca95150@gmail.com');
        console.log('   (Pensez à vérifier les spams si vous ne le voyez pas)');

    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        console.error('');

        if (error.code === 'EAUTH') {
            console.error('🔐 Problème d\'authentification:');
            console.error('   - Vérifiez que SMTP_USER et SMTP_PASSWORD sont corrects');
            console.error('   - Vérifiez qu\'il n\'y a pas de faute de frappe dans .env');
        } else if (error.code === 'ECONNECTION') {
            console.error('🌐 Problème de connexion:');
            console.error('   - Vérifiez que SMTP_HOST est correct');
            console.error('   - Vérifiez votre connexion internet');
        } else if (error.code === 'ESOCKET') {
            console.error('🔌 Problème de socket:');
            console.error('   - Vérifiez que SMTP_PORT est correct (465 pour SSL)');
        }

        process.exit(1);
    }
}

// Vérifier que SMTP_PASSWORD est défini
if (!process.env.SMTP_PASSWORD) {
    console.error('❌ Erreur: SMTP_PASSWORD n\'est pas défini dans le fichier .env');
    process.exit(1);
}

console.log('🚀 Démarrage du test d\'email...\n');
testEmail();
