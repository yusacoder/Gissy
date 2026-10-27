# GISSY – Eternal Production Web Sitesi

Gissy için özelleştirilmiş, Türkçe ve İngilizce dil destekli, dinamik ve modern tek sayfa web sitesi ve kullanıcı şikâyet sistemi.

---

## 🚀 Özellikler

1. **Üst Navbar & Marka Logos:**
   - Japon estetiğinden ilham alan **GISSY** logosu ve neon/parlama efekti.
   - Sol üstte `TR | EN` hızlı dil değiştirme seçeneği.

2. **Gelişmiş Alt Navbar (iOS Tarzı Frosted Glass):**
   - Lucide `House` ve `Flag` ikonlarıyla tasarlanmış saydam buzlu cam ve yumuşak animasyonlu navigasyon.
   - Türkçe rotalar: `/` (Ana Menü) ve `/sikayet` (Şikâyet)
   - İngilizce rotalar: `/en` (Home) ve `/en/report` (Report)

3. **Ayrı Sayfa Şikâyet Sistemi (FormSubmit AJAX Entegrasyonu):**
   - Zorunlu Alanlar: Ad Soyad, Ülke Kodu (Varsayılan `+90`), Telefon Numarası, Şikâyet Edilen Kullanıcı, Şikâyet Nedeni, Şikâyet Açıklaması ve Doğruluk Onay Kutusu.
   - Asılsız Şikâyet Uyarı Metni.
   - AJAX ile sayfa yenilenmeden gönderim (`https://formsubmit.co/ajax/destek@eternalproduction.net`).
   - Gönderim esnasında butonun devre dışı bırakılması ve yükleniyor ikonu.

---

## 📧 FormSubmit E-Posta Aktivasyon Adımları

Şikâyet formunun ilk gönderiminde FormSubmit servisinin aktivasyonu gerekebilir:

1. Formülden veya web arayüzünden ilk test şikâyetini gönderin.
2. **`destek@eternalproduction.net`** e-posta adresine FormSubmit tarafından gelen **"Activate FormSubmit"** başlıklı doğrulama e-postasını açın.
3. E-postadaki **"Activate Form"** butonuna bir defa tıklayarak e-posta adresini doğrulayın.
4. Doğrulama tamamlandıktan sonra yapılan tüm şikâyet bildirimleri doğrudan `destek@eternalproduction.net` adresine e-posta olarak düşecektir.

---

## 🛠️ Yerel Çalıştırma

Sayfayı ve rotaları yerel sunucuda test etmek için:

```bash
# Python ile yerel sunucu başlatma
python3 -m http.server 8000
```

Tarayıcınızda `http://localhost:8000` adresine giderek siteyi görüntüleyebilirsiniz.
