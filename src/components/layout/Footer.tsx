'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { Logo } from './logo'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const base = `/${locale}`

  const shopLinks = [
    { key: 'shop', href: `${base}/boutique` },
    { key: 'new', href: `${base}/boutique?filter=nouveau` },
    { key: 'bestsellers', href: `${base}/boutique?filter=bestseller` },
    { key: 'promos', href: `${base}/promotions` },
    { key: 'about', href: `${base}/a-propos` },
  ]

  const helpLinks = [
    { key: 'faq', href: `${base}/faq` },
    { key: 'shipping', href: `${base}/livraison` },
    { key: 'returns', href: `${base}/retours` },
    { key: 'privacy', href: `${base}/confidentialite` },
    { key: 'terms', href: `${base}/cgv` },
  ]

  return (
    <footer className="bg-ink text-white">
      <div className="luxury-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex justify-start">
              <Logo size="md" showTagline={false} variant="dark" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{t('tagline')}</p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com/growbeauty.ma', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5 font-semibold">{t('boutique')}</h4>
            <ul className="space-y-3">
              {shopLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5 font-semibold">{t('help')}</h4>
            <ul className="space-y-3">
              {helpLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-gold transition-colors group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-5 font-semibold">{t('contact')}</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={14} className="text-gold flex-shrink-0" />
                <a href={`tel:${t('phone').replace(/\s/g, '')}`} className="hover:text-gold transition-colors">
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={14} className="text-gold flex-shrink-0" />
                <a href={`mailto:${t('email')}`} className="hover:text-gold transition-colors">
                  {t('email')}
                </a>
              </li>
            </ul>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Horaires</p>
              <p className="text-sm text-white/60">{t('hours')}</p>
              <p className="text-sm text-white/60">{t('hours_sun')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10" />

      <div className="luxury-container py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">{t('rights')}</p>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>{t('payment')}</span>
            <span className="text-white/20">·</span>
            <span className="text-gold">{t('cod')}</span>
          </div>
          <p className="text-xs text-white/40">{t('made_with')}</p>
        </div>
      </div>
    </footer>
  )
}
