'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { loginSchema, type LoginInput } from '@/lib/validations'
import toast from 'react-hot-toast'

export default function ConnexionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    try {
      const res = await signIn('credentials', { ...data, redirect: false })
      if (res?.ok) {
        toast.success('Connexion réussie !')
        router.push(redirect)
        router.refresh()
      } else {
        toast.error('Email ou mot de passe incorrect')
      }
    } catch {
      toast.error('Une erreur est survenue')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Image side */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=85"
          alt="Grow Beauty"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-forest/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
          <Link href="/" className="block mb-8">
            <h1 className="font-serif text-4xl text-beige-50">Grow Beauty</h1>
            <p className="text-xs uppercase tracking-[0.4em] text-gold mt-1">Beauté de Luxe</p>
          </Link>
          <p className="font-serif text-2xl text-beige-100 italic leading-relaxed max-w-sm">
            "La beauté est une forme d'intelligence que l'on apprécie avec les sens."
          </p>
          <div className="w-12 h-px bg-gold mt-6" />
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
            <Link href="/">
              <h1 className="font-serif text-3xl text-forest">Grow Beauty</h1>
            </Link>
          </div>

          <h2 className="font-serif text-3xl text-forest mb-2">Bon retour !</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Connectez-vous pour accéder à votre compte beauté.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">
                Adresse email
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="vous@example.com"
                className="input-luxury w-full"
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Mot de passe
                </label>
                <Link href="/mot-de-passe-oublie" className="text-xs text-gold hover:text-gold-dark">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-luxury w-full pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-forest"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-forest text-beige-50 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-colors disabled:opacity-70 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-beige-50/30 border-t-beige-50 rounded-full animate-spin" />
              ) : (
                <>
                  Se Connecter
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link href="/inscription" className="text-forest font-medium hover:text-gold transition-colors">
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-beige-100 text-center">
            <p className="text-xs text-muted-foreground">
              Compte démo : <strong>test@growbeauty.ma</strong> / <strong>user123</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
