'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Star, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reviewSchema, type ReviewInput } from '@/lib/validations'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Review } from '@/types'

interface ReviewSectionProps {
  productId: string
  reviews: Review[]
  onReviewAdded: () => void
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {Array(5).fill(0).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={22}
            className={i < (hovered || value) ? 'fill-gold text-gold' : 'text-beige-300'}
          />
        </button>
      ))}
    </div>
  )
}

export function ReviewSection({ productId, reviews, onReviewAdded }: ReviewSectionProps) {
  const { data: session } = useSession()
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [rating, setRating] = useState(5)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5 },
  })

  const avgRating = reviews.length
    ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
    : 0

  const onSubmit = async (data: ReviewInput) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, rating, productId }),
      })
      if (res.ok) {
        toast.success('Avis publié avec succès !')
        reset()
        setShowForm(false)
        onReviewAdded()
      } else {
        const err = await res.json()
        toast.error(err.message || 'Erreur lors de la publication')
      }
    } catch {
      toast.error('Erreur réseau')
    }
    setSubmitting(false)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="font-serif text-2xl text-forest mb-2">Avis Clients</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(avgRating) ? 'fill-gold text-gold' : 'text-beige-200'} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {avgRating.toFixed(1)} sur 5 ({reviews.length} avis)
              </span>
            </div>
          )}
        </div>
        {session && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm font-medium text-forest border border-forest px-5 py-2.5 hover:bg-forest hover:text-beige-50 transition-all"
          >
            Laisser un avis
          </button>
        )}
      </div>

      {/* Review form */}
      {showForm && session && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-beige-50 border border-beige-200 p-6 mb-8"
        >
          <h4 className="font-medium text-forest mb-4">Partagez votre expérience</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Note</label>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Titre (optionnel)</label>
              <input {...register('title')} placeholder="Résumé de votre avis" className="input-luxury w-full" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Commentaire *</label>
              <textarea
                {...register('comment')}
                rows={4}
                placeholder="Décrivez votre expérience avec ce produit..."
                className="input-luxury w-full resize-none"
              />
              {errors.comment && <p className="text-xs text-red-500 mt-1">{errors.comment.message}</p>}
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="btn-luxury px-6 py-3 disabled:opacity-70">
                {submitting ? 'Publication...' : 'Publier'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-luxury-outline px-6 py-3">
                Annuler
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {!session && (
        <div className="bg-beige-50 border border-beige-200 p-5 mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            <a href="/connexion" className="text-forest font-medium hover:text-gold">Connectez-vous</a> pour laisser un avis.
          </p>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground text-sm">
          Soyez le premier à donner votre avis sur ce produit.
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-b border-beige-200 pb-6 last:border-0"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-beige-200 rounded-full flex items-center justify-center">
                    <User size={16} className="text-forest" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-forest">{review.user?.name || 'Client'}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} size={13} className={j < review.rating ? 'fill-gold text-gold' : 'text-beige-200'} />
                  ))}
                </div>
              </div>
              {review.title && <p className="font-medium text-forest text-sm mb-1">{review.title}</p>}
              <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              {review.isVerified && (
                <span className="text-[10px] uppercase tracking-wider text-gold mt-2 block">Achat vérifié</span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
