import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import TestimonialModal from "../components/TestimonialModal";

export default function HomePage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [categories] = useState(["Konser", "Tiyatro", "Festival", "Sergi", "Workshop"]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchApprovedEvents = async () => {
      const res = await fetch("/api/events/approved");
      const data = await res.json();
      setEvents(data);
    };
    fetchApprovedEvents();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  // SVG pattern background as data URI
  const svgBg =
    "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')";

  const handleTestimonialSuccess = () => {
    // Yorumlar listesini yenile
    const fetchTestimonials = async () => {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
    };
    fetchTestimonials();
  };

  // Varsayılan yorumlar (eğer hiç yorum yoksa)
  const defaultTestimonials = [
    {
      id: 1,
      content: "Kültürist sayesinde şehrimdeki gizli kültürel etkinlikleri keşfettim. Harika bir deneyim!",
      author: "Ayşe K.",
      role: "Kültür Tutkunu",
      rating: 5,
      createdAt: new Date()
    },
    {
      id: 2,
      content: "Etkinliklerimi paylaşmak ve toplulukla bağlantı kurmak çok kolay. Mükemmel platform!",
      author: "Mehmet Y.",
      role: "Etkinlik Organizatörü",
      rating: 5,
      createdAt: new Date()
    },
    {
      id: 3,
      content: "Farklı kültürel etkinlikleri tek yerden takip edebiliyorum. Çok pratik ve kullanışlı!",
      author: "Zeynep A.",
      role: "Sanat Sever",
      rating: 5,
      createdAt: new Date()
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-slate-600/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: svgBg }}
        ></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-4xl">🎭</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-4 leading-tight">
              Kültürist
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 italic mb-6">
              "Kültürü birlikte yaşa!"
            </p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Kültürel etkinlikleri keşfet, paylaş ve yaşa. Sanatın gücünü toplumla buluşturuyoruz.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/events">
              <button className="group relative px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="relative z-10">🎫 Etkinlikleri Keşfet</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            <Link href="/events/new">
              <button className="group relative px-8 py-4 bg-white/20 backdrop-blur-sm text-gray-800 font-semibold rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-105 border-2 border-white/30">
                <span className="relative z-10">➕ Etkinlik Ekle</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Etkinlik</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-600 mb-2">1000+</div>
              <p className="text-gray-600">Katılımcı</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Organizatör</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-600 mb-2">25+</div>
              <p className="text-gray-600">Şehir</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Neden Kültürist?</h2>
            <p className="text-xl text-gray-600">Kültürel deneyiminizi zenginleştiren özellikler</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Keşfet</h3>
              <p className="text-gray-600">Yeni kültürel etkinlikleri keşfedin ve ilgi alanlarınızı genişletin</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-200 transition-colors duration-300">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Paylaş</h3>
              <p className="text-gray-600">Kendi etkinliklerinizi paylaşın ve toplulukla bağlantı kurun</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Etkileşim</h3>
              <p className="text-gray-600">Diğer kültür tutkunlarıyla etkileşime geçin ve deneyimlerinizi paylaşın</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600">3 basit adımda kültürel deneyiminizi başlatın</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center relative">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Hesap Oluşturun</h3>
              <p className="text-gray-600">Hızlıca kayıt olun ve kültürel topluluğa katılın</p>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Etkinlikleri Keşfedin</h3>
              <p className="text-gray-600">İlgi alanlarınıza göre etkinlikleri filtreleyin ve katılın</p>
            </div>
            <div className="text-center relative">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Deneyimlerinizi Paylaşın</h3>
              <p className="text-gray-600">Kendi etkinliklerinizi oluşturun ve toplulukla paylaşın</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Etkinlik Kategorileri</h2>
            <p className="text-xl text-gray-600">İlgi alanınıza göre etkinlikleri filtreleyin</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(cat === selectedCategory ? null : cat)
                }
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  cat === selectedCategory 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Yaklaşan Etkinlikler</h2>
            <p className="text-xl text-gray-600">En güncel kültürel etkinlikleri keşfedin</p>
          </div>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">📅</div>
              <p className="text-2xl text-gray-500 mb-4">Bu kategoriye ait etkinlik bulunamadı</p>
              <p className="text-gray-400">Yakında yeni etkinlikler eklenecek!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`} passHref>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                    {event.image && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt="Etkinlik görseli"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <span className="mr-2">📅</span>
                          {new Date(event.date).toLocaleString("tr-TR")}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">📍</span>
                          {event.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                          Detayları Gör →
                        </span>
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <span className="text-blue-600">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Kullanıcı Deneyimleri</h2>
            <p className="text-xl text-gray-600">Topluluğumuzun görüşleri</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              ✨ Yorum Ekle
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= testimonial.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Kültürel Yolculuğunuza Başlayın</h2>
          <p className="text-xl text-blue-100 mb-8">Binlerce etkinlik arasından size uygun olanı bulun ve kültürel deneyiminizi zenginleştirin</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Hemen Başla
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-4 bg-transparent text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 border-2 border-white">
                Daha Fazla Bilgi
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <span className="text-3xl mr-3">🎭</span>
                <span className="text-2xl font-bold">Kültürist</span>
              </div>
              <p className="text-gray-300">Kültürel yaşamı desteklemek için tasarlandı</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/events" className="hover:text-white transition-colors">Etkinlikler</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Giriş Yap</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition-colors">Kayıt Ol</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kategoriler</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Konser</li>
                <li>Tiyatro</li>
                <li>Festival</li>
                <li>Sergi</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2 text-gray-300">
                <li>📧 info@kulturist.com</li>
                <li>📱 +90 555 123 4567</li>
                <li>📍 İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Kültürist. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Testimonial Modal */}
      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleTestimonialSuccess}
      />

      <div className="bg-gray-50 rounded-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Şifreyi Değiştir (isteğe bağlı)
        </label>
        <input
          type="password"
          placeholder="Yeni şifre (en az 6 karakter)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          className="input-field mb-2"
        />
        <input
          type="password"
          placeholder="Yeni şifre tekrar"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          minLength={6}
          className="input-field"
        />
      </div>
    </div>
  );
} 