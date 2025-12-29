-- Creează tabelul pentru imagini
CREATE TABLE images (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  url text NOT NULL,
  title text,
  description text,
  created_at timestamp DEFAULT now()
);

-- Exemplu de inserare date
INSERT INTO images (url, title, description) VALUES
  ('https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'Peisaj montan', 'Munte cu zăpadă și pădure'),
  ('https://images.unsplash.com/photo-1472214103451-9374bd1c798e', 'Apus de soare', 'Apus frumos pe lac'),
  ('https://images.unsplash.com/photo-1501594907352-04cda38ebc29', 'Plajă tropicală', 'Plajă cu palmieri și apă albastră');

-- Enable Row Level Security (opțional, pentru siguranță)
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Politică pentru citire publică
CREATE POLICY "Oricine poate citi imaginile"
  ON images FOR SELECT
  USING (true);

-- Comentează sau șterge următoarea linie dacă vrei și inserare publică
-- CREATE POLICY "Oricine poate insera imagini"
--   ON images FOR INSERT
--   WITH CHECK (true);
