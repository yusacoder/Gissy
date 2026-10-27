# GISSY – Eternal Production Web Sitesi

Gissy için özelleştirilmiş, Türkçe ve İngilizce dil destekli, dinamik ve modern tek sayfa web sitesi, kullanıcı şikâyet sistemi ve JSON tabanlı arka plan yönetim sistemi.

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

4. **JSON Üzerinden Arka Plan Yönetimi:**
   - Kod değiştirmeden `data.json` dosyası üzerinden arka plan görseli, bulanıklık (blur) ve koyuluk opaklığı (overlay) yönetimi.

---

## 🎨 Arka Plan Yönetimi

Projedeki arka plan ayarlarının tamamı **`data.json`** dosyasından yönetilmektedir.

### Arka plan değiştirme

1. Projenin kök dizininde bulunan `data.json` dosyasını açın.
2. `background.imageUrl` alanına doğrudan görsel URL'sini yazın.
3. `background.blur` değerini `1–100` arasında ayarlayın.
4. İstersen `overlayOpacity` değerini `0–100` arasında değiştirin.
5. Değişiklikleri kaydedin ve uygulamanın güncel ayarları yüklediğini doğrulayın.

Örnek yapı:

```json
{
  "background": {
    "imageUrl": "https://example.com/my-background.webp",
    "blur": 45,
    "overlayOpacity": 30,
    "enabled": true,
    "position": "center",
    "size": "cover",
    "repeat": "no-repeat"
  }
}
```

### Detaylı Kullanım Açıklamaları

- **`data.json` Dosyasının Tam Konumu:**
  Projenin kök dizinindedir (`/data.json`).
- **Arka Plan URL'sinin Değiştirilmesi:**
  Bilgisayardan dosya yükleme gereksinimi yoktur. Doğrudan `imageUrl` alanına halka açık resim bağlantısı (JPG, PNG, WebP vb.) yazılır. URL güncellendiğinde sayfa yeni görseli yükler.
- **Blur (Bulanıklık) Ayarı (%1–%100):**
  `blur` değeri 1 ile 100 arasında bir sayı alır (%1 çok hafif, %100 maksimum bulanıklık). Bu değer CSS `filter: blur()` ile doğrusal olarak 0px–30px aralığına dönüştürülür. Blur efekti yalnızca arka plan görseline uygulanır; yazılar, butonlar, navbarlar, kartlar ve formlar kesinlikle bulanıklaşmaz.
- **Opaklık (Overlay) Ayarı (%0–%100):**
  `overlayOpacity` görselin üzerine eklenen siyah katmanın opaklık oranını (0-100) belirler.
- **Varsayılan Arka Plana Dönme:**
  Arka planı tamamen kapatıp varsayılan temaya dönmek için `enabled` alanını `false` yapabilir veya `imageUrl` alanını boş (`""`) bırakabilirsiniz. Ayrıca yazılan görsel URL'si geçersiz veya erişilemez olduğunda site bozulmaz, otomatik olarak varsayılan temaya dönülür.
- **Yerel Geliştirme ve Üretim Ortamında Uygulama:**
  Yerel geliştirmede `data.json` kaydedildiği an tarayıcı yenilendiğinde (veya sunucer dev modundaysa) yeni ayarlar yüklenir. Üretim ortamında `data.json` dosyasının güncellenmesi sitenin yeniden derlenmesine gerek kalmadan doğrudan canlıya yansır.

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
