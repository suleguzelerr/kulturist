import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🎭 Kültürist Hakkında</h1>
            <p className="text-xl text-gray-600">Kültürü birlikte yaşayalım!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Misyonumuz</h2>
              <p className="text-gray-700 leading-relaxed">
                Kültürist, kültürel etkinlikleri keşfetmek ve paylaşmak için tasarlanmış bir platformdur. 
                Amacımız, sanat ve kültür tutkunlarını bir araya getirerek, toplumda kültürel farkındalığı 
                artırmak ve sanatın gücünü herkesle paylaşmaktır.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Vizyonumuz</h2>
              <p className="text-gray-700 leading-relaxed">
                Türkiye'nin en kapsamlı kültür ve sanat platformu olmak, her yaştan insanın 
                kültürel etkinliklere kolayca erişebilmesini sağlamak ve kültürel mirasımızı 
                gelecek nesillere aktarmaktır.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Neler Sunuyoruz?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🎵</div>
                <h3 className="font-semibold text-gray-800 mb-2">Konserler</h3>
                <p className="text-gray-600 text-sm">Müzik tutkunları için özel etkinlikler</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎭</div>
                <h3 className="font-semibold text-gray-800 mb-2">Tiyatro</h3>
                <p className="text-gray-600 text-sm">Klasik ve modern tiyatro oyunları</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🎪</div>
                <h3 className="font-semibold text-gray-800 mb-2">Festivaller</h3>
                <p className="text-gray-600 text-sm">Renkli ve eğlenceli festival etkinlikleri</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Değerlerimiz</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 text-xl">✓</span>
                <div>
                  <h3 className="font-medium text-gray-800">Kültürel Çeşitlilik</h3>
                  <p className="text-gray-600 text-sm">Farklı kültürleri ve sanat türlerini destekliyoruz</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 text-xl">✓</span>
                <div>
                  <h3 className="font-medium text-gray-800">Topluluk</h3>
                  <p className="text-gray-600 text-sm">Sanat tutkunlarını bir araya getiriyoruz</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 text-xl">✓</span>
                <div>
                  <h3 className="font-medium text-gray-800">Erişilebilirlik</h3>
                  <p className="text-gray-600 text-sm">Kültürel etkinliklere herkesin erişebilmesini sağlıyoruz</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <button className="btn-primary">
                🏠 Ana Sayfaya Dön
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 