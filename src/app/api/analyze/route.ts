import { NextRequest, NextResponse } from 'next/server'
import { analyzeFiles } from '@/lib/ai-service'

// Configuration pour cette route API
export const runtime = 'nodejs'
export const maxDuration = 30 // 30 secondes max

export async function POST(request: NextRequest) {
  try {
    // Vérification de la taille avant traitement
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 10MB)' },
        { status: 413 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('file') as File[]
    
    if (!files.length) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    const results = await analyzeFiles(files)
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('Erreur analyse:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse' },
      { status: 500 }
    )
  }
}