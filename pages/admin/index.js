import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    <div style={{ padding: "20px" }}>
      <h1>Admin Paneli</h1>
      <p>Yalnızca admin kullanıcılar bu sayfayı görebilir.</p>
    </div>
  );
}
