'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import WhitelistManager from '@/components/whitelist-manager'
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Mail, 
  TrendingUp,
  RefreshCw,
  Lock
} from 'lucide-react'

interface AnalyticsData {
  summary: {
    totalAccess: number
    totalVerifications: number
    totalBlocked: number
    totalAnalyses: number
    ipLimits: number
    emailLimits: number
    suspiciousIPs: number
    blockedIPs: number
  }
  charts: {
    daily: Array<{
      date: string
      access: number
      verifications: number
      blocked: number
      analyses: number
    }>
    hourly: Array<{
      hour: string
      access: number
      verifications: number
      blocked: number
      analyses: number
    }>
  }
  rankings: {
    topIPs: Array<{ ip: string; count: number }>
    topEmails: Array<{ email: string; count: number }>
  }
  security: {
    recentSuspicious: Array<{
      timestamp: string
      ip: string
      action: string
      email?: string
      details?: string
    }>
    totalSuspicious: number
  }
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const authenticate = async () => {
    if (!password) {
      setError('Mot de passe requis')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/analytics', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      })

      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
        setIsAuthenticated(true)
        setLastUpdate(new Date())
      } else {
        setError('Mot de passe incorrect')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const refreshData = useCallback(async () => {
    if (!isAuthenticated) return

    setLoading(true)
    try {
      const response = await fetch('/api/analytics', {
        headers: {
          'Authorization': `Bearer ${password}`
        }
      })

      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
        setLastUpdate(new Date())
      }
    } catch {
      setError('Erreur lors du rafraîchissement')
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, password])

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(refreshData, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, refreshData])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Admin Dashboard
            </CardTitle>
            <CardDescription className="text-gray-300">
              Accès sécurisé aux analytics IA Recrutement Pro
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Mot de passe admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && authenticate()}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <Button
              onClick={authenticate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement des données...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Dashboard Admin - IA Recrutement Pro
            </h1>
            <p className="text-gray-300">
              Dernière mise à jour : {lastUpdate?.toLocaleString('fr-FR')}
            </p>
          </div>
          <Button
            onClick={refreshData}
            disabled={loading}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Total Accès
              </CardTitle>
              <Eye className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.summary.totalAccess.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Vérifications
              </CardTitle>
              <Mail className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.summary.totalVerifications.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Analyses IA
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.summary.totalAnalyses.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Tentatives Bloquées
              </CardTitle>
              <Shield className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.summary.totalBlocked.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rate Limiting Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                IPs Actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-cyan-400">
                {data.summary.ipLimits}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Emails Actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-400">
                {data.summary.emailLimits}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                IPs Suspectes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-yellow-400">
                {data.summary.suspiciousIPs}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                IPs Bloquées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-red-400">
                {data.summary.blockedIPs}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top IPs et Emails */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Top 10 IPs</CardTitle>
              <CardDescription className="text-gray-300">
                Adresses IP les plus actives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.rankings.topIPs.map((item, index) => (
                  <div key={item.ip} className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm">
                      #{index + 1} {item.ip}
                    </span>
                    <span className="text-cyan-400 font-semibold">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Top 10 Emails</CardTitle>
              <CardDescription className="text-gray-300">
                Emails les plus actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.rankings.topEmails.map((item, index) => (
                  <div key={item.email} className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm truncate">
                      #{index + 1} {item.email}
                    </span>
                    <span className="text-green-400 font-semibold">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activités suspectes récentes et Liste blanche */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-black/40 backdrop-blur-xl border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Activités Suspectes Récentes (24h)
              </CardTitle>
              <CardDescription className="text-gray-300">
                {data.security.recentSuspicious.length} activités suspectes détectées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {data.security.recentSuspicious.map((activity, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-red-500/10 rounded border border-red-500/20">
                    <div className="flex-1">
                      <div className="text-white text-sm">
                        <span className="font-mono">{activity.ip}</span>
                        {activity.email && (
                          <span className="ml-2 text-gray-300">({activity.email})</span>
                        )}
                      </div>
                      <div className="text-red-400 text-xs">
                        {activity.action} - {new Date(activity.timestamp).toLocaleString('fr-FR')}
                      </div>
                      {activity.details && (
                        <div className="text-gray-400 text-xs">{activity.details}</div>
                      )}
                    </div>
                  </div>
                ))}
                {data.security.recentSuspicious.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    Aucune activité suspecte détectée dans les dernières 24h
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Gestionnaire de liste blanche */}
          <WhitelistManager />
        </div>
      </div>
    </div>
  )
}