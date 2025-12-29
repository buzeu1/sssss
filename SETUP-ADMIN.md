# 🎯 Configurare Admin Panel - Ghid Complet

Acest ghid te ajută să configurezi Admin Panel-ul pentru a uploada și gestiona poze.

---

## 📋 Ce trebuie să faci (3 pași simpli):

1. **Creează bucket-ul în Supabase Storage**
2. **Configurează permisiunile**
3. **Testează upload-ul**

---

## Pas 1: Creează Bucket-ul în Supabase

### 1.1. Mergi la Storage
- Deschide dashboard-ul Supabase: https://supabase.com
- Selectează proiectul tău
- Click pe **Storage** din meniul lateral stâng

### 1.2. Creează Bucket Nou
1. Click pe **New bucket** (butonul verde)
2. Completează:
   - **Name:** `images` (EXACT așa, fără spații)
   - **Public bucket:** ✅ **BIFEAZĂ** (important!)
3. Click **Create bucket**

✅ Ar trebui să vezi bucket-ul `images` în listă!

---

## Pas 2: Configurează Permisiunile

Ai **2 opțiuni** - alege una:

### Opțiunea A: Simplu și Rapid (pentru testare) ⚡

1. Click pe bucket-ul **`images`**
2. Click pe tab-ul **Policies**
3. Click pe butonul **Disable RLS** (Row Level Security)
4. Confirmă

✅ Gata! Acum oricine poate uploada/șterge poze (doar pentru testare!)

### Opțiunea B: Cu Politici Detaliate (recomandat) 🔒

1. În dashboard Supabase → **SQL Editor**
2. Click pe **New query**
3. Copiază conținutul din fișierul `storage-setup.sql`
4. Click **RUN** (sau F5)

Politicile create:
- ✅ Oricine poate **vedea** pozele (public read)
- ✅ Oricine poate **uploada** poze
- ✅ Oricine poate **șterge** poze

> **Notă:** Pentru producție, ar trebui să adaugi autentificare!

---

## Pas 3: Testează Admin Panel-ul

### 3.1. Accesează Admin Panel
```
http://localhost:3000/admin
```
Sau pe Vercel:
```
https://your-site.vercel.app/admin
```

### 3.2. Upload o Poză de Test

1. Click pe **Selectează Imaginea**
2. Alege o poză de pe calculator
3. (Opțional) Adaugă titlu și descriere
4. Click **Upload Imagine**

✅ Dacă totul e bine, vei vedea:
- Mesaj de succes verde
- Poza apare în lista de mai jos
- Poza apare și în galerie (`/`)

### 3.3. Test Ștergere

1. Scroll în jos la lista de poze
2. Click pe butonul **🗑️ Șterge** de pe o poză
3. Confirmă ștergerea

✅ Poza ar trebui să dispară!

---

## ⚠️ Probleme Comune și Soluții

### Problema 1: "Error uploading image"
**Cauze posibile:**
- Bucket-ul nu e public → Verifică că ai bifat "Public bucket"
- Politicile nu sunt configurate → Încearcă Opțiunea A (Disable RLS)
- Bucket-ul nu se numește exact "images" → Verifică numele

**Soluție:**
1. Mergi la Storage → images bucket
2. Click dreapta pe bucket → Settings
3. Verifică că "Public" e activat

### Problema 2: Poza se uploadează dar nu se vede
**Cauze posibile:**
- URL-ul nu e corect generat
- Imaginea e prea mare (>5MB)

**Soluție:**
1. Verifică în console (F12) dacă sunt erori
2. Verifică în Supabase Storage dacă imaginea chiar e uploadată
3. Testează cu o imagine mai mică (<1MB)

### Problema 3: "Bucket not found"
**Cauză:** Bucket-ul nu există sau e scris greșit

**Soluție:**
1. Verifică în Storage că există bucket-ul `images`
2. Numele trebuie să fie EXACT "images" (plural, lowercase)

---

## 🔒 Securitate (Important pentru Producție!)

Admin Panel-ul acum permite **oricui** să uploadeze/șteargă poze!

### Pentru producție, ar trebui să:

1. **Adaugi autentificare:**
   - Folosește Supabase Auth
   - Protejează ruta `/admin`
   - Verifică userul înainte de upload

2. **Restricționezi politicile:**
```sql
-- Doar useri autentificați pot uploada
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' AND
  auth.role() = 'authenticated'
);
```

3. **Adaugi validare:**
   - Limită dimensiunea fișierelor
   - Verifică tipul fișierului (doar imagini)
   - Rate limiting pentru upload

---

## 📊 Verificare Finală

Iată ce ar trebui să funcționeze:

- ✅ Poți accesa `/admin`
- ✅ Poți selecta o imagine
- ✅ Butonul "Upload Imagine" e activ
- ✅ După upload vezi mesaj de succes
- ✅ Poza apare în lista de poze
- ✅ Poza apare în galerie (`/`)
- ✅ Poți șterge pozele

---

## 💡 Tips Utile

1. **Preview înainte de upload** - Vei vedea poza înainte să o uploadezi
2. **Titlul e opțional** - Poți uploada fără titlu
3. **Ștergere permanentă** - Odată ștearsă, poza se pierde permanent
4. **Formatele suportate** - JPG, PNG, GIF, WEBP
5. **Mărime recomandată** - Poze până în 5MB

---

## 🆘 Ajutor

Dacă ai probleme:

1. **Verifică console-ul** (F12 în browser) pentru erori
2. **Verifică Network tab** să vezi request-urile către Supabase
3. **Verifică în Supabase Logs** dacă apar erori
4. **Re-creează bucket-ul** dacă nimic nu merge

---

**Succes! 🚀**

Pentru întrebări, verifică README.md principal.
