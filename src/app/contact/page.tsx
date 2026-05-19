'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
    toast.success('Message envoyé avec succès !')
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <div className="bg-forest py-16">
          <div className="luxury-container text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Nous Contacter</p>
            <h1 className="font-serif text-4xl text-beige-50">Contactez-Nous</h1>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </div>
        </div>

        <section className="py-20 bg-beige-50">
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              {/* Contact info */}
              <div>
                <h2 className="font-serif text-3xl text-forest mb-4">Parlez-nous</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-10">
                  Notre équipe est à votre disposition pour répondre à toutes vos questions sur nos produits, vos commandes ou tout autre sujet.
                </p>

                <div className="space-y-7">
                  {[
                    { icon: MapPin, title: 'Adresse', content: '123 Boulevard Moulay Youssef\nCasablanca 20000, Maroc' },
                    { icon: Phone, title: 'Téléphone', content: '+212 600 000 000\n+212 522 000 000' },
                    { icon: Mail, title: 'Email', content: 'bonjour@growbeauty.ma\nsupport@growbeauty.ma' },
                    { icon: Clock, title: 'Horaires', content: 'Lundi – Samedi : 9h00 – 19h00\nDimanche : 10h00 – 17h00' },
                  ].map(({ icon: Icon, title, content }) => (
                    <div key={title} className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-forest flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-gold" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gold mb-2">{title}</p>
                        {content.split('\n').map((line, i) => (
                          <p key={i} className="text-forest text-sm">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-white shadow-soft p-8">
                {submitted ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-5">
                    <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center">
                      <Check size={28} className="text-gold" />
                    </div>
                    <h3 className="font-serif text-2xl text-forest">Message Envoyé !</h3>
                    <p className="text-muted-foreground text-sm">Nous vous répondrons dans les 24 heures.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="font-serif text-2xl text-forest mb-6">Envoyer un Message</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Nom</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="input-luxury w-full" />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="input-luxury w-full" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Sujet</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="input-luxury w-full">
                        <option value="">Choisir un sujet...</option>
                        <option>Question sur un produit</option>
                        <option>Suivi de commande</option>
                        <option>Retour / Échange</option>
                        <option>Partenariat</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Message</label>
                      <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required className="input-luxury w-full resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-luxury w-full flex items-center justify-center gap-2">
                      {loading ? <div className="w-4 h-4 border-2 border-beige-50/30 border-t-beige-50 rounded-full animate-spin" /> : <Send size={16} />}
                      Envoyer le Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
