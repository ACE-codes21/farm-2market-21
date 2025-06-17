
-- Force refresh the schema cache and ensure address fields exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS location_updated_at TIMESTAMP WITH TIME ZONE;

-- Add index for location queries if it doesn't exist
CREATE INDEX IF NOT EXISTS profiles_location_idx ON public.profiles (latitude, longitude);

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';
