import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function withRole(Component, allowedRoles = []) {
  return function RoleProtectedComponent(props) {
    const router = useRouter()

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user || !allowedRoles.includes(user.role)) {
        router.push('/auth/login') // veya yetkisiz sayfası
      }
    }, [])

    return <Component {...props} />
  }
}
