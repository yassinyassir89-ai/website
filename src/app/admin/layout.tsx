'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingBag, Users, Tag, BarChart3, Settings, LogOut, ChevronRight, Layers
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/commandes', label: 'Commandes', icon: ShoppingBag },
  { href: '/admin/produits', label: 'Produits', icon: Package },
  { href: '/admin/categories', label: 'Catégories', icon: Tag },
  { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'authenticated' && session.user.role !== 'ADMIN') {
      router.push('/')
    }
    if (status === 'unauthenticated') {
      router.push('/connexion')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-50">
        <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') return null

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-forest flex-shrink-0 flex flex-col">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/" className="block">
            <h1 className="font-serif text-xl text-beige-50">Grow Beauty</h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-0.5">Administration</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 text-sm rounded transition-all duration-150',
                  isActive
                    ? 'bg-gold text-white'
                    : 'text-beige-300 hover:bg-white/10 hover:text-beige-50'
                )}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white text-sm font-medium">
              {session.user.name?.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-beige-50 text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-beige-400 text-xs truncate">{session.user.email}</p>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-2 px-4 py-2 text-xs text-beige-400 hover:text-beige-50 transition-colors">
            ← Retour au site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:text-red-300 transition-colors w-full"
          >
            <LogOut size={13} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
