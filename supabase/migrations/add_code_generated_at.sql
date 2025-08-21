-- Ajouter le champ code_generated_at à la table users
ALTER TABLE users ADD COLUMN IF NOT EXISTS code_generated_at TIMESTAMPTZ;

-- Mettre à jour les enregistrements existants pour utiliser created_at comme valeur par défaut
UPDATE users SET code_generated_at = created_at WHERE code_generated_at IS NULL;