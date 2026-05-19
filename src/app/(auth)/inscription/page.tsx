'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import toast from 'react-hot-toast'

export default function InscriptionPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        await signIn('credentials', { email: data.email, password: data.password, redirect: false })
        toast.success('Compte créé avec succès !')
        router.push('/')
      } else {
        const error = await res.json()
        toast.error(error.message || 'Erreur lors de la création du compte')
      }
    } catch {
      toast.error('Une erreur est survenue')
    }
    setIsLoading(false)
  }

  const benefits = [
    'Accès à votre historique de commandes',
    'Liste de favoris personnalisée',
    'Offres exclusives réservées aux membres',
    'Suivi de livraison en temps réel',
  ]

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Image side */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&auto=format&fit=crop&q=85"
          alt="Grow Beauty"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-forest/60" />
        <div className="absolute inset-0 flex flex-col justify-center p-14">
          <Link href="/">
            <h1 className="font-serif text-4xl text-beige-50 mb-1">Grow Beauty</h1>
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-10">Beauté de Luxe</p>
          </Link>
          <h2 className="font-serif text-3xl text-beige-100 mb-6">Rejoignez notre communauté</h2>
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-beige-200 text-sm">
                <div className="w-6 h-6 border border-gold flex items-center justify-center flex-shrink-0">
                  <Check size={13} className="text-gold" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-8 bg-beige-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10 lg:hidden">
            <Link href="/"><h1 className="font-serif text-3xl text-forest">Grow Beauty</h1></Link>
          </div>

          <h2 className="font-serif text-3xl text-forest mb-2">Créer un compte</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Rejoignez Grow Beauty pour une expérience beauté personnalisée.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Nom complet</label>
              <input {...register('name')} placeholder="Yasmine Benali" className="input-luxury w-full" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Email</label>
              <input {...register('email')} type="email" placeholder="vous@example.com" className="input-luxury w-full" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 8 caractères"
                  className="input-luxury w-full pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-forest">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Confirmer le mot de passe</label>
              <input {...register('confirmPassword')} type="password" placeholder="••••••••" className="input-luxury w-full" />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-forest text-beige-50 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-colors disabled:opacity-70 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-beige-50/30 border-t-beige-50 rounded-full animate-spin" />
              ) : (
                <>Créer mon Compte <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Déjà un compte ?{' '}
              <Link href="/connexion" className="text-forest font-medium hover:text-gold">Se connecter</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
