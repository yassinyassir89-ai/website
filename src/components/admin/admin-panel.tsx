'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Plus, Edit, Tag, BarChart3, LogOut } from 'lucide-react'
import { ProductBuilder } from './product-builder'
import { ProductEditor } from './product-editor'
import { BrandBuilder } from './brand-builder'
import { AdminStats } from './admin-stats'

type Tab = 'add' | 'edit' | 'brand' | 'stats'

export function AdminPanel() {
  const t = useTranslations('builder')
  const tAuth = useTranslations('admin_auth')
  const router = useRouter()
  const locale = useLocale()
  const [active, setActive] = useState<Tab>('stats')

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push(`/${locale}/admin/login`)
    router.refresh()
  }

  const tabs: Array<{ id: Tab; label: string; icon: typeof Plus }> = [
    { id: 'stats', label: t('tabs.stats'), icon: BarChart3 },
    { id: 'add', label: t('tabs.add'), icon: Plus },
    { id: 'edit', label: t('tabs.edit'), icon: Edit },
    { id: 'brand', label: t('tabs.brand'), icon: Tag },
  ]

  return (
    <div className="luxury-container py-8 md:py-12">
      {/* Header */}
      <motion.div
        className="mb-6 flex items-start justify-between gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-ink">{t('title')}</h1>
          <p className="text-sm text-ink/60 mt-1">{t('subtitle')}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 text-sm font-semibold transition-colors shadow-sm"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">{tAuth('logout')}</span>
        </button>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-1.5 shadow-soft mb-6 flex gap-1 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              active === id
                ? 'bg-primary text-white shadow-pink'
                : 'text-ink/60 hover:text-primary hover:bg-primary-light'
            }`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content with smooth transitions */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {active === 'stats' && <AdminStats />}
        {active === 'add' && <ProductBuilder />}
        {active === 'edit' && <ProductEditor />}
        {active === 'brand' && <BrandBuilder />}
      </motion.div>
    </div>
  )
}
