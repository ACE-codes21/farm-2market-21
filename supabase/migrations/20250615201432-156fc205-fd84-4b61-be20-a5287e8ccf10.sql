
-- Drop the existing, more restrictive policy on the profiles table
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.profiles;

-- Create a new, more permissive policy to allow public read access to profiles
CREATE POLICY "Public can view all profiles"
ON public.profiles FOR SELECT
USING (true);
