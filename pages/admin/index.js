import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    // Eğer giriş yapılmamışsa veya admin değilse yönlendir
    if (!storedUser || storedUser.role !== "admin") {
      router.push("/unauthorized");
    }
  }, []);

  // Yüklenene kadar boş göster
  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Paneli</h1>
          <p className="text-gray-600">Yalnızca admin kullanıcılar bu sayfayı görebilir.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/events">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Etkinlik Yönetimi</h3>
              <p className="text-gray-600">Etkinlikleri onayla, düzenle veya sil</p>
            </div>
          </Link>

          <Link href="/admin/testimonials">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Yorum Yönetimi</h3>
              <p className="text-gray-600">Kullanıcı yorumlarını onayla veya sil</p>
            </div>
          </Link>

          <Link href="/admin/dashboard">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">İstatistikler</h3>
              <p className="text-gray-600">Site istatistiklerini görüntüle</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
