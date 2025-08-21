-- Migration pour réinitialiser les compteurs de rate limiting
-- Cela permet de tester proprement le système de limitation

-- Réinitialiser tous les compteurs existants
UPDATE rate_limits 
SET 
  daily_count = 0,
  hourly_count = 0,
  last_reset = CURRENT_DATE,
  last_hour_reset = NOW(),
  updated_at = NOW()
WHERE daily_count > 0 OR hourly_count > 0;

-- Afficher le résultat pour confirmation
SELECT 
  user_id,
  daily_count,
  hourly_count,
  last_reset,
  last_hour_reset
FROM rate_limits;