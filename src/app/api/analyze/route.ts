import { NextRequest, NextResponse } from 'next/server'
import { analyzeFiles } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    // Vérifier le token d'authentification
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification manquant' },
        { status: 401 }
      )
    }

    // Vérifier les limites de rate limiting via l'API Supabase
    const checkResponse = await fetch(`${request.nextUrl.origin}/api/analysis/check-limits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    })

    if (!checkResponse.ok) {
      const errorData = await checkResponse.json()
      return NextResponse.json(errorData, { status: checkResponse.status })
    }
    
    // Vérification de la taille avant traitement
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) { // 10MB
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 10MB)' },
        { status: 413 }
      )
    }

    // Traitement des fichiers
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Vérifier la taille des fichiers (max 10MB par fichier)
    const maxSize = 10 * 1024 * 1024 // 10MB
    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `Le fichier ${file.name} dépasse la taille maximale de 10MB` },
          { status: 400 }
        )
      }
    }

    // Analyser les fichiers
    const results = await analyzeFiles(files)

    // SEULEMENT après une analyse réussie, incrémenter les compteurs via l'API Supabase
    await fetch(`${request.nextUrl.origin}/api/analysis/increment-counters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    })

    return NextResponse.json({
      success: true,
      results
    })
  } catch (error) {
    console.error('Erreur analyse:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse' },
      { status: 500 }
    )
  }
}