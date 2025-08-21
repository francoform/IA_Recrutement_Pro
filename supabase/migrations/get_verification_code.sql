-- Récupérer le code de vérification pour test@example.com
SELECT email, verification_code, verified, created_at, updated_at 
FROM users 
WHERE email = 'test@example.com'
ORDER BY updated_at DESC
LIMIT 1;