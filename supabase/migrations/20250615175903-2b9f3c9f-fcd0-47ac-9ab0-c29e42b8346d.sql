
-- Create a dedicated, public storage bucket for product images.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-images', 'product-images', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to view images.
CREATE POLICY "Allow public read access to product images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Allow authenticated users to upload images to a folder corresponding to their user ID.
CREATE POLICY "Allow authenticated users to upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1] );

-- Allow authenticated users to update their own images.
CREATE POLICY "Allow authenticated users to update their product images"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1] );

-- Allow authenticated users to delete their own images.
CREATE POLICY "Allow authenticated users to delete their product images"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'product-images' AND auth.uid()::text = (storage.foldername(name))[1] );
