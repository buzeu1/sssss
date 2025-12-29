# Galerie Foto cu Next.js și Supabase

Site simplu în Next.js care afișează o galerie de poze conectată la Supabase.

## 📁 Structura Proiectului

```
nextjs-gallery-supabase/
├── pages/              # Pagini (Pages Router)
│   ├── _app.js        # App wrapper
│   ├── _document.js   # Document wrapper
│   └── index.js       # Pagina principală
├── components/         # Componente React
│   └── ImageGallery.js
├── lib/               # Utilități și configurări
│   └── supabase.js    # Client Supabase
├── public/            # Fișiere statice (favicon, imagini, etc.)
├── styles/            # Fișiere CSS
│   └── globals.css
└── database.sql       # Schema bazei de date
```

## 📋 Structura Bazei de Date Supabase

### Tabelul `images`

Creează în Supabase un tabel numit **`images`** cu următoarele coloane:

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| `id` | uuid | Primary key (default: `uuid_generate_v4()`) |
| `url` | text | URL-ul complet al imaginii |
| `title` | text | Titlul imaginii (opțional) |
| `description` | text | Descrierea imaginii (opțional) |
| `created_at` | timestamp | Data creării (default: `now()`) |

### SQL pentru creare tabel:

Rulează fișierul `database.sql` în SQL Editor din Supabase sau copiază-l manual:

```sql
CREATE TABLE images (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  url text NOT NULL,
  title text,
  description text,
  created_at timestamp DEFAULT now()
);
```

### Configurare Storage (opțional)

Dacă vrei să uploadezi pozele direct în Supabase Storage:

1. Mergi la **Storage** în dashboard-ul Supabase
2. Creează un bucket nou numit **`images`**
3. Setează politicile de acces:
   - Pentru citire publică: `Enable public access`
   - Sau creează politici personalizate

Apoi URL-urile vor fi de forma:
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/images/[filename]
```

---

## 🎯 Configurare Supabase Storage (Pentru Admin Panel)

Pentru ca **Admin Panel** (`/admin`) să funcționeze și să poți uploada poze, trebuie să configurezi Storage:

### Pas 1: Creează Bucket-ul

1. În dashboard Supabase → **Storage**
2. Click pe **New bucket**
3. **Name:** `images`
4. **Public bucket:** ✅ Bifează (ca pozele să fie publice)
5. Click **Create bucket**

### Pas 2: Configurează Politicile (Permissions)

**Opțiunea A - Simplu (pentru testare):**

Click pe bucket-ul `images` → **Policies** → Dezactivează RLS temporar:
- Click pe "Disable RLS" (doar pentru testare!)

**Opțiunea B - Sigur (recomandat):**

Rulează fișierul `storage-setup.sql` în SQL Editor pentru politici detaliate.

### Pas 3: Testează

1. Accesează `/admin`
2. Selectează o poză
3. Adaugă titlu (opțional)
4. Click "Upload Imagine"
5. Poza ar trebui să apară în galerie!

---

## 🚀 Instalare și Configurare

### ⚡ Quick Start

```bash
# 1. Instalează dependențele
npm install

# 2. Configurează Supabase
cp .env.local.example .env.local
# Editează .env.local cu credențialele tale

# 3. Pornește serverul
npm run dev
```

**📍 Pagini importante:**
- **Galerie:** `http://localhost:3000/`
- **Admin Panel:** `http://localhost:3000/admin`

---

### 1. Instalează dependențele:

```bash
npm install
```

### 2. Configurare Supabase:

Copiază `.env.local.example` în `.env.local`:

```bash
cp .env.local.example .env.local
```

Editează `.env.local` și adaugă credențialele tale Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Unde găsești aceste valori:**
1. Mergi pe [supabase.com](https://supabase.com)
2. Intră în proiectul tău
3. Settings → API
4. Copiază **Project URL** și **anon public key**

### 3. Configurează baza de date:

1. Deschide SQL Editor în Supabase
2. Rulează conținutul din `database.sql`
3. Verifică că tabelul `images` a fost creat

### 4. Pornește serverul de dezvoltare:

```bash
npm run dev
```

Accesează [http://localhost:3000](http://localhost:3000)

## 📝 Cum Adaugi Poze

### ⭐ Opțiunea 1: Admin Panel (RECOMANDAT!)

Ai pagină de admin unde poți uploada poze direct din browser!

**Accesează:** `http://localhost:3000/admin` (sau `your-site.vercel.app/admin`)

**Caracteristici:**
- ✅ Upload poze direct din browser
- ✅ Preview înainte de upload
- ✅ Adaugă titlu și descriere
- ✅ Șterge poze existente
- ✅ Salvare automată în Supabase Storage

**IMPORTANT:** Pentru ca Admin Panel să funcționeze, trebuie să configurezi Supabase Storage (vezi mai jos)!

### Opțiunea 2: Direct în Supabase (Table Editor)

1. Mergi în dashboard-ul Supabase
2. Table Editor → `images`
3. Click pe **Insert row**
4. Adaugă:
   - `url`: URL-ul complet al imaginii
   - `title`: Titlul pozei
   - `description`: Descriere (opțional)

### Opțiunea 3: SQL Insert

```sql
INSERT INTO images (url, title, description) VALUES
  ('https://example.com/image1.jpg', 'Titlu 1', 'Descriere 1'),
  ('https://example.com/image2.jpg', 'Titlu 2', 'Descriere 2');
```

## 🎨 Caracteristici

- ✅ Design responsive (mobil, tablet, desktop)
- ✅ Grid cu 1-3 coloane (depinde de dimensiunea ecranului)
- ✅ Hover effects pe imagini
- ✅ Loading state
- ✅ Error handling
- ✅ Optimizare imagini cu Next.js Image
- ✅ Titluri și descrieri opționale
- ✅ Structura clasică cu `pages/` directory
- ✅ **Admin Panel** - Upload și gestionare poze
- ✅ **Supabase Storage** - Salvare automată imagini
- ✅ **Delete functionality** - Șterge poze din admin

## 📦 Deploy

### Vercel (recomandat):

1. Fă push pe GitHub
2. Conectează repo-ul în Vercel
3. Adaugă variabilele de mediu:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy automat!

Sau folosește CLI:

```bash
npm run build
vercel
```

### Deploy Manual:

```bash
npm run build
npm start
```

## 🛠️ Tehnologii Folosite

- **Next.js 14** (Pages Router) - Framework React
- **Supabase** - Backend și bază de date
- **Tailwind CSS** - Styling
- **Next/Image** - Optimizare imagini

## 📁 Foldere Importante

- **`pages/`** - Rutele aplicației (Pages Router)
- **`components/`** - Componente React reutilizabile
- **`lib/`** - Logică business și configurări
- **`public/`** - Fișiere statice accesibile public
- **`styles/`** - Fișiere CSS globale

## 📞 Suport

Dacă întâmpini probleme:
1. Verifică că ai creat tabelul `images` în Supabase
2. Verifică că variabilele `.env.local` sunt corecte
3. Verifică console-ul pentru erori (`F12` în browser)
4. Asigură-te că ai adăugat poze în tabel

## 💡 Tips

- Poți pune favicon-ul în folderul `public/`
- Adaugă alte imagini statice în `public/`
- Modifică stilurile în `styles/globals.css`
- Componentele din `components/` pot fi reutilizate

---

**Made with ❤️ by Cosmin**
