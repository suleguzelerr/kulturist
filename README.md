# Kültürist

[GitHub Proje Linki](https://github.com/suleguzelerr/kulturist)

## Proje Tanımı
Kültürist, kültürel etkinliklerin ve toplulukların yönetimi için geliştirilmiş bir web uygulamasıdır. Kullanıcılar etkinlikleri görüntüleyebilir, kayıt olabilir, yorum yapabilir, mesajlaşabilir ve yöneticiler tarafından yönetilen bir panel ile içerikler kontrol edilebilir. Proje, kültürel etkinliklerin daha geniş kitlelere ulaşmasını ve toplulukların etkileşimini artırmayı amaçlar.

## Kullanılan Teknolojiler
- **Next.js** (React tabanlı modern web framework)
- **Prisma ORM** (Veritabanı işlemleri için)
- **SQLite** (Geliştirme ortamı için hızlı ve kolay veritabanı)
- **TailwindCSS** (Modern ve esnek CSS kütüphanesi)
- **NextAuth.js** (Kimlik doğrulama ve oturum yönetimi)
- Ek kütüphaneler: bcrypt, dotenv, vs.

## Kurulum Talimatları
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Depoyu klonlayın:**
   ```bash
   git clone https://github.com/suleguzelerr/kulturist.git
   cd kulturist
   ```
2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```
3. **Veritabanı migrasyonlarını çalıştırın:**
   ```bash
   npx prisma migrate deploy
   # veya geliştirme ortamı için:
   npx prisma migrate dev
   ```
4. **Ortam değişkenlerini ayarlayın:**
   Proje kök dizininde `.env` dosyası oluşturup aşağıdaki örneğe göre doldurun:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   NEXTAUTH_SECRET="rastgele-bir-gizli-anahtar"
   NEXTAUTH_URL="http://localhost:3000"
   ```
5. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
   Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Admin Giriş Bilgileri
Aşağıdaki örnek admin hesabı ile yönetici paneline erişebilirsiniz (sadece test amaçlıdır):

- **E-posta:** sulderler@gmail.com
- **Şifre:** sulderler001

## Kullanıcı Giriş Bilgileri (Test için)
- **E-posta:** nebiyesuleguzeler@gmail.com
- **Şifre:** Ns06052005

> Not: İlk kurulumda bu kullanıcılar otomatik olarak oluşmazsa, veritabanına manuel olarak ekleyebilirsiniz veya kayıt formunu kullanarak yeni kullanıcı oluşturabilirsiniz.

## Proje Ekran Görüntüleri
Aşağıda örnek ekran görüntüleri ekleyebilirsiniz:

![Ana Sayfa](docs/screenshot-home.png)
![Admin Paneli](docs/screenshot-admin.png)

> Görselleri `docs/` klasörüne ekleyip, yukarıdaki gibi bağlantı verebilirsiniz.

## Katkı Sağlama
Pull request'ler ve öneriler için lütfen bir issue açın veya doğrudan katkıda bulunun.

## Lisans
Bu proje MIT lisansı ile lisanslanmıştır. 