-- Migration pour ajouter les champs de limitation horaire
-- Ajouter les colonnes pour la gestion des limites horaires
ALTER TABLE rate_limits 
ADD COLUMN hourly_count INTEGER DEFAULT 0,
ADD COLUMN last_hour_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Mettre à jour les enregistrements existants
UPDATE rate_limits 
SET hourly_count = 0, 
    last_hour_reset = NOW() 
WHERE hourly_count IS NULL;

-- Ajouter des contraintes
ALTER TABLE rate_limits 
ALTER COLUMN hourly_count SET NOT NULL,
ALTER COLUMN last_hour_reset SET NOT NULL;

-- Ajouter un commentaire pour documenter les nouveaux champs
COMMENT ON COLUMN rate_limits.hourly_count IS 'Nombre d''analyses effectuées dans l''heure courante';
COMMENT ON COLUMN rate_limits.last_hour_reset IS 'Timestamp de la dernière réinitialisation du compteur horaire';