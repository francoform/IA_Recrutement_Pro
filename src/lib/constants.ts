export const APP_CONFIG = {
  name: 'IA Recrutement Pro',
  description: 'Plateforme IA pour le recrutement intelligent',
  version: '1.0.0',
} as const

export const API_ENDPOINTS = {
  analyze: '/api/analyze',
  upload: '/api/upload',
  results: '/api/results',
} as const

export const FILE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['.pdf', '.doc', '.docx'],
  maxFiles: 20,
} as const

export const COLORS = {
  primary: '#06b6d4',
  secondary: '#0891b2',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
} as const