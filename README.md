# Merve Hanım'ın Yufka Şenliği 🎪🥟

7. sınıf matematik dersi için geliştirilmiş, dairenin alanı ($A = \pi \cdot r^2$, $\pi = 3$) konusunu pekiştiren eğlenceli ve etkileşimli bir atölye oyunudur.

---

## 🎮 Oyunun Konusu ve Mekaniği

Köy şenliğinde masalara belirli alanlara ($A$) sahip yufkalar isteniyor. Oyuncu, Merve Hanım'ın unlu tezgâhında:
1. İstenen alana uygun yarıçapı ($r$) belirler: $r^2 = A \div 3 \rightarrow r = \sqrt{r^2}$
2. Yufkayı tezgâhta sürükleyerek veya oklavayla istenen yarıçap cetveline getirir.
3. Hazırlanan yufkayı şenlik sepetine taşır ve masaları ziyafet sofrasına dönüştürür!

---

## 🚀 Bilgisayarınızda Yerel Olarak Çalıştırma

Projeyi bilgisayarınıza indirdikten sonra terminalde sırasıyla şu komutları çalıştırın:

```bash
# 1. Gerekli paketleri kurun
npm install

# 2. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` (veya terminalde belirtilen port) adresini açarak oyunu hemen oynayabilirsiniz.

---

## 📦 Projeyi GitHub'a Yükleme Adımları

Projeyi GitHub'a yüklemek için en kolay iki yol:

### Yöntem 1: GitHub Web Arayüzünden (Kod Yazmadan / Kolay Yol)
1. [GitHub.com](https://github.com) adresine gidin ve hesabınıza giriş yapın.
2. Sağ üstteki **`+`** butonuna tıklayıp **"New repository"** seçeneğini seçin.
3. Deponuza bir isim verin (Örn: `merve-hanim-yufka-senligi`) ve **"Create repository"** butonuna basın.
4. Açılan sayfadaki **"uploading an existing file"** bağlantısına tıklayın.
5. Projedeki tüm dosyaları (`src`, `index.html`, `package.json` vb. — `node_modules` hariç) sürükleyip bırakın.
6. Sayfanın altındaki yeşil **"Commit changes"** butonuna basın.

### Yöntem 2: Git Terminal Komutları ile
Bilgisayarınızda projenin bulunduğu klasörde şu komutları çalıştırın:

```bash
git init
git add .
git commit -m "İlk sürüm: Merve Hanım'ın Yufka Şenliği oyunu"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/merve-hanim-yufka-senligi.git
git push -u origin main
```

---

## 🌐 Ücretsiz Canlı Yayına Alma (Vercel / Netlify / GitHub Pages)

GitHub'a yükledikten sonra oyunu herkese açık kalıcı bir web sitesi yapmak için:
1. [Vercel.com](https://vercel.com) adresine gidin ve GitHub hesabınızla giriş yapın.
2. **"Add New Project"** butonuna basıp deponuzu seçin.
3. Hiçbir ayarı değiştirmeden **"Deploy"** butonuna basın.
4. Yaklaşık 30 saniye içinde `projeniz.vercel.app` şeklinde kalıcı ve yönlendirmesiz bir canlı bağlantınız hazır olacaktır!
