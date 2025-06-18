import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter()

    useEffect(() => {
      const user = localStorage.getItem('user')
      if (!user) {
        router.push('/auth/login')
      }
    }, [])

    return <Component {...props} />
  }
}
