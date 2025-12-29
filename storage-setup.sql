-- ========================================
-- CONFIGURARE SUPABASE STORAGE
-- ========================================
-- Acest script trebuie rulat DUPĂ ce ai creat bucket-ul în UI

-- 1. Mai întâi mergi în Supabase Dashboard → Storage
-- 2. Click pe "Create a new bucket"
-- 3. Nume: "images"
-- 4. Bifează "Public bucket"
-- 5. Click "Create bucket"

-- Apoi rulează acest script în SQL Editor:

-- Politică pentru citire publică (ca oricine să vadă pozele)
CREATE POLICY "Public Access for Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Politică pentru upload (oricine poate uploada - DOAR pentru testare!)
-- COMENTEAZĂ linia de jos dacă vrei să restricționezi upload-ul
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );

-- Politică pentru ștergere (oricine poate șterge - DOAR pentru testare!)
-- COMENTEAZĂ linia de jos dacă vrei să restricționezi ștergerea
CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'images' );

-- ========================================
-- NOTĂ IMPORTANTĂ DESPRE SECURITATE:
-- ========================================
-- Politicile de mai sus permit ORICUI să uploadeze/șteargă!
-- Pentru producție, ar trebui să adaugi autentificare și să 
-- verifici dacă userul e admin.
--
-- Exemplu politică sigură (cu autentificare):
-- CREATE POLICY "Only authenticated users can upload"
-- ON storage.objects FOR INSERT
-- WITH CHECK (
--   bucket_id = 'images' AND
--   auth.role() = 'authenticated'
-- );
