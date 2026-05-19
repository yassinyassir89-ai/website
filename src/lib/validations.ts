import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  city: z.string().min(2, 'Ville requise'),
  notes: z.string().optional(),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().min(10, 'Le commentaire doit contenir au moins 10 caractères'),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Le nom est requis'),
  description: z.string().min(10, 'La description est requise'),
  shortDesc: z.string().optional(),
  price: z.number().positive('Le prix doit être positif'),
  comparePrice: z.number().optional(),
  stock: z.number().int().min(0, 'Le stock doit être positif'),
  categoryId: z.string().min(1, 'La catégorie est requise'),
  images: z.array(z.string()).min(1, 'Au moins une image est requise'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type ProductInput = z.infer<typeof productSchema>
