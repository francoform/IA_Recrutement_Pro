-- Migration pour créer les tables users et rate_limits
-- Créé le: 2024-01-21

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  verification_code VARCHAR(6),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour le rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  analysis_count INTEGER DEFAULT 0,
  daily_count INTEGER DEFAULT 0,
  last_analysis TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_reset DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_verification_code ON users(verification_code);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_id ON rate_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_rate_limits_last_reset ON rate_limits(last_reset);

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rate_limits_updated_at BEFORE UPDATE ON rate_limits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Activer Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour la table users
-- Permettre la lecture et l'écriture pour les utilisateurs authentifiés
CREATE POLICY "Users can read their own data" ON users
    FOR SELECT USING (true); -- Lecture publique pour l'authentification

CREATE POLICY "Users can insert their own data" ON users
    FOR INSERT WITH CHECK (true); -- Insertion publique pour l'enregistrement

CREATE POLICY "Users can update their own data" ON users
    FOR UPDATE USING (true); -- Mise à jour publique pour la vérification

-- Politiques RLS pour la table rate_limits
CREATE POLICY "Users can read their own rate limits" ON rate_limits
    FOR SELECT USING (true); -- Lecture publique pour vérifier les limites

CREATE POLICY "Users can insert their own rate limits" ON rate_limits
    FOR INSERT WITH CHECK (true); -- Insertion publique pour créer les limites

CREATE POLICY "Users can update their own rate limits" ON rate_limits
    FOR UPDATE USING (true); -- Mise à jour publique pour incrémenter

-- Accorder les permissions aux rôles anon et authenticated
GRANT ALL PRIVILEGES ON users TO anon;
GRANT ALL PRIVILEGES ON users TO authenticated;
GRANT ALL PRIVILEGES ON rate_limits TO anon;
GRANT ALL PRIVILEGES ON rate_limits TO authenticated;

-- Accorder les permissions sur les séquences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;