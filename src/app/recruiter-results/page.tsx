/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import {
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Home,
  ArrowLeft,
  ArrowRight,
  Award,
  Users,
  Target,
  Star,
  Download,
  Mail,
  X,
  Send,
  FileText
} from "lucide-react";
import { Footer } from '@/components/layout/footer';

// Interface dynamique pour les candidats - accepte n'importe quelles propriétés de compétences
type Candidate = {
  "full-name": string;
  email: string;
  location: string;
  "education-level": string;
  "years-of-experience": number;
  "salary-expectation": string | null;
  verdict: string;
  "final-score": number;
  color?: {
    primary: string;
    light: string;
    bg: string;
    border: string;
  };
  cvFile?: string;
  motivationLetterFile?: string;
  cvContent?: string;
  motivationContent?: string;
  // Toutes les autres propriétés sont dynamiques (compétences)
  [k: string]: string | number | object | null | undefined;
};

const candidateColors = [
  { primary: '#06b6d4', light: '#67e8f9', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { primary: '#10b981', light: '#6ee7b7', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { primary: '#f59e0b', light: '#fbbf24', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { primary: '#ef4444', light: '#f87171', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  { primary: '#8b5cf6', light: '#a78bfa', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { primary: '#ec4899', light: '#f472b6', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
  { primary: '#14b8a6', light: '#5eead4', bg: 'bg-teal-500/10', border: 'border-teal-500/20' },
  { primary: '#f97316', light: '#fb923c', bg: 'bg-orange-500/10', border: 'border-orange-500/20' }
];

export default function RecruiterResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documentPopup, setDocumentPopup] = useState<{
    isOpen: boolean;
    type: 'cv' | 'motivation' | null;
    candidate: Candidate | null;
    content: string;
  }>({ isOpen: false, type: null, candidate: null, content: '' });
  const [downloadNotification, setDownloadNotification] = useState<{
    isVisible: boolean;
    fileName: string;
    candidateColor: string;
  }>({ isVisible: false, fileName: '', candidateColor: '' });
  
  // États pour les popups
  const [emailPopup, setEmailPopup] = useState<{
    isOpen: boolean;
    candidate: Candidate | null;
  }>({ isOpen: false, candidate: null });
  
  const [emailForm, setEmailForm] = useState({
    from: '',
    cc: '',
    message: 'Bonjour,\n\nNous avons examiné votre candidature avec attention et votre profil nous intéresse vivement.\n\nNous aimerions organiser un entretien pour discuter plus en détail de vos compétences et de nos opportunités.\n\nSeriez-vous disponible pour un échange dans les prochains jours ?\n\nCordialement,\nL\'équipe de recrutement'
  });
  
  // État pour la popup candidat
  const [candidatePopup, setCandidatePopup] = useState<{
    isOpen: boolean;
    candidate: Candidate | null;
  }>({ isOpen: false, candidate: null });
const sendEmailViaSMTP = async (candidate: Candidate, form: typeof emailForm) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: candidate.email,
          from: form.from,
          cc: form.cc,
          subject: `Candidature - ${candidate["full-name"]}`,
          message: form.message,
          candidateName: candidate["full-name"]
        })
      });
      
      if (response.ok) {
        alert('Email envoyé avec succès !');
        setEmailPopup({ isOpen: false, candidate: null });
        setEmailForm({ from: '', cc: '', message: emailForm.message });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch {
      alert('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
    }
  };
  
  // Fonctions pour gérer la popup candidat
  const openCandidatePopup = (candidate: Candidate) => {
    setCandidatePopup({ isOpen: true, candidate });
  };
  
  const closeCandidatePopup = () => {
    setCandidatePopup({ isOpen: false, candidate: null });
  };
  
  // Fonction pour détecter automatiquement les compétences (propriétés numériques entre 0 et 2)
  const detectSkills = (candidate: Candidate): [string, number][] => {
    const skills: [string, number][] = [];
    const baseProperties = [
      'full-name', 'email', 'location', 'education-level', 
      'years-of-experience', 'salary-expectation', 'verdict', 'final-score',
      'color', 'cvFile', 'motivationLetterFile', 'cvContent', 'motivationContent'
    ];
    
    for (const [key, value] of Object.entries(candidate)) {
      // Ignorer les propriétés de base
      if (baseProperties.includes(key)) continue;
      
      // Vérifier si c'est une compétence (valeur numérique entre 0 et 2)
      if (typeof value === 'number' && value >= 0 && value <= 2) {
        skills.push([key, value]);
      }
    }
    
    return skills.sort((a, b) => b[1] - a[1]); // Trier par score décroissant
  };

  // Fonction pour mapper dynamiquement les données du webhook vers l'interface Candidate
  const mapWebhookToCandidate = (webhookCandidate: Record<string, unknown>): Candidate => {
    const baseCandidate: Candidate = {
      "full-name": String(webhookCandidate["full-name"] || ''),
      email: String(webhookCandidate.email || ''),
      location: String(webhookCandidate.location || ''),
      "education-level": String(webhookCandidate["education-level"] || ''),
      "years-of-experience": Number(webhookCandidate["years-of-experience"]) || 0,
      "salary-expectation": webhookCandidate["salary-expectation"] ? String(webhookCandidate["salary-expectation"]) : null,
      verdict: String(webhookCandidate.verdict || ''),
      "final-score": Number(webhookCandidate["final-score"]) || 0,
      cvFile: webhookCandidate.cvFile ? String(webhookCandidate.cvFile) : undefined,
      motivationLetterFile: webhookCandidate.motivationLetterFile ? String(webhookCandidate.motivationLetterFile) : undefined,
      cvContent: webhookCandidate.cvContent ? String(webhookCandidate.cvContent) : undefined,
      motivationContent: webhookCandidate.motivationContent ? String(webhookCandidate.motivationContent) : undefined
    };
    
    // Ajouter dynamiquement toutes les autres propriétés (compétences)
    const result = { ...baseCandidate };
    for (const [key, value] of Object.entries(webhookCandidate)) {
      if (!baseCandidate.hasOwnProperty(key)) {
        result[key] = value as string | number | object | null | undefined;
      }
    }
    
    return result;
  };

  useEffect(() => {
  const fetchResults = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Lire directement les résultats depuis sessionStorage
      const analysisResults = sessionStorage.getItem('analysisResults')

      if (!analysisResults) {
        throw new Error('Résultats d\'analyse manquants')
      }
      
      const webhookData = JSON.parse(analysisResults)

      // Vérifier si webhookData est un array ou un objet
      let candidatesArray: Record<string, unknown>[] = []
      
      if (Array.isArray(webhookData)) {
        candidatesArray = webhookData

        // Vérifier que le premier élément a les propriétés attendues d'un candidat
        if (candidatesArray.length > 0) {
          const firstCandidate = candidatesArray[0]
          const hasExpectedProps = firstCandidate &&
            typeof firstCandidate === 'object' &&
            ('full-name' in firstCandidate || 'email' in firstCandidate || 'final-score' in firstCandidate)

          if (!hasExpectedProps) {
            candidatesArray = [] // Reset pour chercher ailleurs
          }
        }
      }
      
      if ((!Array.isArray(candidatesArray) || candidatesArray.length === 0) && webhookData && typeof webhookData === 'object') {
        // Vérifier si webhookData est un objet candidat unique
        if ((!Array.isArray(candidatesArray) || candidatesArray.length === 0) && 
            webhookData && 
            typeof webhookData === 'object' && 
            !Array.isArray(webhookData)) {
          
          // Vérifier si c'est un objet candidat avec les propriétés attendues
          const hasExpectedProps = ('full-name' in webhookData || 'email' in webhookData || 'final-score' in webhookData)
          
          if (hasExpectedProps) {
            candidatesArray = [webhookData as Record<string, unknown>]
          } else {
            // Essayer différentes propriétés possibles pour les candidats
            const possibleKeys = ['candidates', 'results', 'data', 'items', 'list', 'output', 'response']
            
            for (const key of possibleKeys) {
              if (webhookData[key] && Array.isArray(webhookData[key])) {
                candidatesArray = webhookData[key] as Record<string, unknown>[]
                break
              }
            }
          }
        }
        
        // Si aucune propriété standard trouvée, chercher récursivement dans l'objet
        if (!Array.isArray(candidatesArray) || candidatesArray.length === 0) {
          const findArraysRecursively = (obj: unknown): unknown[] => {
             const arrays: unknown[] = []

            if (Array.isArray(obj)) {
              arrays.push(obj)
            } else if (obj && typeof obj === 'object') {
              for (const [, value] of Object.entries(obj)) {
                arrays.push(...findArraysRecursively(value))
              }
            }
            
            return arrays
          }
          
          const foundArrays = findArraysRecursively(webhookData)

          // Prendre le premier array non-vide qui contient des objets
           for (const arr of foundArrays) {
             if (Array.isArray(arr) && arr.length > 0 && typeof arr[0] === 'object' && arr[0] !== null) {
               candidatesArray = arr as Record<string, unknown>[]
               break
             }
           }
        }
      }
      
      if (!Array.isArray(candidatesArray) || candidatesArray.length === 0) {
        throw new Error('Aucun candidat trouvé dans les résultats')
      }
      
      // Limiter le nombre de candidats à 10 maximum
      const limitedCandidatesArray = candidatesArray.slice(0, 10)

      // Mapper les données du webhook vers l'interface Candidate et ajouter les couleurs
      const processedData = limitedCandidatesArray.map((webhookCandidate: Record<string, unknown>, idx: number) => ({
        ...mapWebhookToCandidate(webhookCandidate),
        color: candidateColors[idx % candidateColors.length]
      }))
      setData(processedData)
      setLoading(false)
      
    } catch (err) {
      console.error('Erreur chargement résultats:', err)

      // EN CAS D'ERREUR, UTILISER DES DONNÉES DE FALLBACK GÉNÉRIQUES
      const fallbackData = [
        {
          "full-name": "Candidat Exemple 1",
          "email": "candidat1@example.com",
          "location": "Paris, France",
          "education-level": "Master",
          "years-of-experience": 5,
          "salary-expectation": "",
          "verdict": "Profil intéressant avec une bonne expérience dans le domaine. Compétences techniques solides et motivation évidente.",
          "final-score": 25,
          "competence-1": 2,
          "competence-2": 1,
          "competence-3": 2
        },
        {
          "full-name": "Candidat Exemple 2",
          "email": "candidat2@example.com",
          "location": "Lyon, France",
          "education-level": "Licence",
          "years-of-experience": 3,
          "salary-expectation": "",
          "verdict": "Candidat prometteur avec un potentiel d'évolution intéressant. Bonnes bases techniques à développer.",
          "final-score": 20,
          "competence-1": 1,
          "competence-2": 2,
          "competence-3": 1
        }
      ];

      const processedFallback = fallbackData.map((c: Candidate, idx) => ({
        ...c,
        color: candidateColors[idx % candidateColors.length]
      }));
      setData(processedFallback);
      setLoading(false);
      setError(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };
  fetchResults();
}, []);

  const calculateScore = (c: Candidate) =>
    (c["final-score"] ?? Number(String(c["final-score"]).replace(/\/.*/, ""))) || 0;

  const sorted = [...data].sort((a, b) => calculateScore(b) - calculateScore(a));

  const chartData = sorted.map((c, idx) => ({
    ...c,
    score: calculateScore(c),
    color: c.color?.primary || candidateColors[idx % candidateColors.length].primary
  }));

  // Calculer le score maximum dynamiquement
  const maxScore = Math.max(...chartData.map(c => c.score), 40);
  const yAxisMax = Math.ceil(maxScore / 10) * 10;

  const scrollToCandidate = (name: string) => {
    const id = `candidate-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-cyan-400', 'ring-opacity-75');
      setTimeout(() => el.classList.remove('ring-2', 'ring-cyan-400', 'ring-opacity-75'), 2000);
    }
  };

   const handleDownloadCV = (c: Candidate) => {
    const fileName = c.cvFile || `${c["full-name"]}_CV.pdf`;
    setDownloadNotification({ isVisible: true, fileName, candidateColor: c.color?.primary || '#06b6d4' });
    setTimeout(() => setDownloadNotification(prev => ({ ...prev, isVisible: false })), 3000);
  };

  const handleDownloadMotivationLetter = (c: Candidate) => {
    const fileName = c.motivationLetterFile || `${c["full-name"]}_Lettre.pdf`;
    setDownloadNotification({ isVisible: true, fileName, candidateColor: c.color?.primary || '#06b6d4' });
    setTimeout(() => setDownloadNotification(prev => ({ ...prev, isVisible: false })), 3000);
  };

  // Remplacer l'ancienne fonction handleSendEmail (ligne 218-222) par :
  const handleSendEmail = (c: Candidate) => {
  setEmailPopup({ isOpen: true, candidate: c });
  };



  const closeDocumentPopup = () =>
    setDocumentPopup({ isOpen: false, type: null, candidate: null, content: '' });

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400/30 border-t-cyan-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-blue-400/20 border-r-blue-400 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <span className="text-cyan-400 text-lg font-medium">Chargement des résultats...</span>
            <p className="text-slate-300 text-sm mt-2">Analyse des candidatures en cours</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Erreur</h2>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={() => router.push('/services/ia')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Retour à l'analyse
            </button>
          </div>
        </div>
      </main>
    );
  }
  
  console.log('🎨 [DEBUG] Rendu du composant principal')
  console.log('🎨 [DEBUG] Nombre de candidats à afficher:', data.length)
  console.log('🎨 [DEBUG] Liste des candidats:', data)
    
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 text-white relative">
      {/* Background overlay pour plus de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <header className="relative">
          <button
            onClick={() => router.push('/')}
            className="absolute left-0 top-0 flex items-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 group bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <Home className="w-5 h-5" />
            <span className="ml-2 text-sm font-medium">Accueil</span>
          </button>
          <button
            onClick={() => router.push('/services/ia')}
            className="absolute right-0 top-0 flex items-center text-emerald-400 hover:text-emerald-300 transition-all duration-300 group bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 hover:bg-white/10"
          >
            <FileText className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Nouvelle analyse</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="text-center pt-16 sm:pt-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-3 mr-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Résultats d'analyse
                </h1>
              </div>
              <p className="text-slate-300 text-lg">
                Classement & détails des <span className="text-cyan-400 font-semibold">{data.length} candidats</span> analysés
              </p>
            </div>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <KpiCard icon={<Users />} label="Candidats analysés" value={data.length.toString()} color="from-blue-500 to-cyan-500" />
          <KpiCard icon={<Target />} label="Meilleur score" value={sorted.length ? `${calculateScore(sorted[0])}/${yAxisMax}` : "-"} color="from-emerald-500 to-teal-500" />
          <KpiCard icon={<Star />} label="Score moyen" value={sorted.length ? `${Math.round(sorted.reduce((acc, c) => acc + calculateScore(c), 0) / sorted.length)}/${yAxisMax}` : "-"} color="from-amber-500 to-orange-500" />
        </section>

        {/* Chart */}
        <section>
          <GlassCard className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-2 mr-3"><TrendingUp className="w-5 h-5 text-white" /></div>
              <h3 className="text-xl font-semibold text-white">Scores des candidats</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="full-name" tick={{ fill: '#fff', fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fill: '#fff', fontSize: 12 }} domain={[0, yAxisMax]} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: "transparent !important", 
                      border: "1px solid rgba(6, 182, 212, 0.3)", 
                      borderRadius: "12px", 
                      color: "#fff", 
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    }}
                    wrapperStyle={{
                      backgroundColor: "transparent !important",
                      border: "none",
                      outline: "none"
                    }}
                    cursor={{ fill: "transparent" }}
                    itemStyle={{
                      backgroundColor: "transparent !important",
                      border: "none"
                    }}
                    labelStyle={{
                      backgroundColor: "transparent !important",
                      color: "#fff"
                    }}
                  />
                  <Bar 
                    dataKey="score" 
                    radius={[8, 8, 0, 0]} 
                    style={{ cursor: 'pointer' }} 
                    onClick={(_, idx) => scrollToCandidate(chartData[idx]["full-name"])}
                  >
                    {chartData.map((entry, idx) => (
                      <Cell 
                        key={`cell-${idx}`} 
                        fill={entry.color}
                        style={{
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </section>

        {/* Candidates Cards */}
        <section>
          <GlassCard className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-2 mr-3"><Users className="w-5 h-5 text-white" /></div>
              <h3 className="text-xl font-semibold text-white">Détails des candidats</h3>
            </div>

            {/* Meilleur candidat */}
            {sorted.length > 0 && (
              <div className="mb-8">
                <div className="relative bg-gradient-to-r from-yellow-600/20 via-amber-500/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/30 p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-3 shadow-lg"><Award className="w-8 h-8 text-white" /></div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">🏆 {sorted[0]["full-name"]}</h4>
                            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">MEILLEUR CANDIDAT</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="relative group"><button onClick={() => handleSendEmail(sorted[0])} className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300 border border-yellow-500/30"><Mail className="w-5 h-5 text-yellow-400" /></button><div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Envoyer un email</div></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right"><div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full px-4 py-2 shadow-lg"><span className="text-white font-bold text-lg">{calculateScore(sorted[0])}/{yAxisMax}</span></div></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Expérience:</span><p className="text-white font-semibold">{sorted[0]["years-of-experience"]} ans</p></div>
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Formation:</span><p className="text-white font-semibold truncate">{sorted[0]["education-level"]}</p></div>
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Localisation:</span><p className="text-white font-semibold">{sorted[0].location}</p></div>
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Email:</span><p className="text-white font-semibold truncate">{sorted[0].email}</p></div>
                    </div>

                    {/* Compétences dynamiques pour le meilleur candidat */}
                    {(() => {
                      const skills = detectSkills(sorted[0]);
                      if (skills.length > 0) {
                        return (
                          <div className="mb-4">
                            <h5 className="text-yellow-400 font-semibold mb-3 flex items-center">
                              <Star className="w-4 h-4 mr-2 fill-yellow-400" />Compétences évaluées
                            </h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {skills.map(([skillName, skillValue]) => {
                                const displayName = skillName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                const scoreColor = skillValue === 2 ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                                                 skillValue === 1 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                                                 'bg-red-500/20 text-red-300 border-red-500/30';
                                return (
                                  <div key={skillName} className={`${scoreColor} rounded-lg px-3 py-2 text-sm border flex justify-between items-center`}>
                                    <span title={displayName}>{displayName}</span>
                                    <span className="font-bold ml-2 text-lg">{skillValue}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}

                    

                    <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg p-4 border border-yellow-500/20">
                      <h5 className="text-yellow-400 font-semibold mb-2 flex items-center"><Star className="w-4 h-4 mr-2 fill-yellow-400" />Pourquoi ce candidat est le meilleur choix :</h5>
                      <p className="text-slate-200 leading-relaxed">{sorted[0].verdict}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        {emailPopup.isOpen && emailPopup.candidate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-md w-full">
              <div className="p-6 border-b border-white/20" style={{ backgroundColor: `${emailPopup.candidate.color?.primary}20` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: emailPopup.candidate.color?.primary }}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Envoyer un email</h3>
                      <p className="text-slate-300">{emailPopup.candidate["full-name"]}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEmailPopup({ isOpen: false, candidate: null })} 
                    className="text-white hover:text-slate-300 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">De (votre email)</label>
                  <input
                    type="email"
                    value={emailForm.from}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="votre.email@entreprise.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">CC (optionnel)</label>
                  <input
                    type="email"
                    value={emailForm.cc}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, cc: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="cc@entreprise.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    value={emailForm.message}
                    onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={6}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none text-sm"
                    placeholder="Votre message..."
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setEmailPopup({ isOpen: false, candidate: null })}
                    className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => emailPopup.candidate && sendEmailViaSMTP(emailPopup.candidate, emailForm)}
                    disabled={!emailForm.from || !emailForm.message}
                    className="relative overflow-hidden bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-all duration-300 flex items-center backdrop-blur-sm border border-white/20 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Send className="w-4 h-4 mr-2 relative z-10" /> 
                    <span className="relative z-10">Envoyer</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
            {/* Autres candidats */}
            {sorted.length > 1 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><Users className="w-5 h-5 mr-2" />Autres candidats</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sorted.slice(1).map((c, idx) => {
                    const score = calculateScore(c);
                    return (
                      <div
                        key={idx}
                        id={`candidate-${c["full-name"].replace(/\s+/g, '-').toLowerCase()}`}
                        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 flex flex-col cursor-pointer hover:border-white/30"
                        onClick={() => openCandidatePopup(c)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: c.color?.primary }}>#{idx + 2}</div>
                            <div className="flex-1 min-w-0"><h4 className="text-base font-semibold text-white truncate">{c["full-name"]}</h4></div>
                          </div>
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-white font-bold text-xs" style={{ backgroundColor: c.color?.primary }}>{score}/{yAxisMax}</div>
                        </div>

                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <div className="relative group"><button onClick={(e) => { e.stopPropagation(); handleSendEmail(c); }} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"><Mail className="w-4 h-4 text-white" /></button></div>
                        </div>

                        {/* Informations en ligne comme le meilleur candidat */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="bg-white/5 rounded-lg p-2 text-center">
                            <span className="text-slate-400 text-xs font-medium block mb-1">Expérience</span>
                            <p className="text-white font-semibold text-sm">{c["years-of-experience"]} ans</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2 text-center">
                            <span className="text-slate-400 text-xs font-medium block mb-1">Formation</span>
                            <p className="text-white font-semibold text-xs truncate" title={c["education-level"]}>{c["education-level"]}</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2 text-center">
                            <span className="text-slate-400 text-xs font-medium block mb-1">Localisation</span>
                            <p className="text-white font-semibold text-xs truncate" title={c.location}>{c.location}</p>
                          </div>
                        </div>

                        {/* Compétences dynamiques */}
                        {(() => {
                          const skills = detectSkills(c);
                          if (skills.length > 0) {
                            return (
                              <div className="mb-4">
                                <span className="text-slate-400 text-xs font-medium block mb-2">Compétences clés</span>
                                <div className="grid grid-cols-2 gap-1">
                                  {skills.slice(0, 6).map(([skillName, skillValue]) => {
                                    const displayName = skillName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                    const scoreColor = skillValue === 2 ? 'bg-green-500/20 text-green-300' : 
                                                     skillValue === 1 ? 'bg-yellow-500/20 text-yellow-300' : 
                                                     'bg-red-500/20 text-red-300';
                                    return (
                                      <div key={skillName} className={`${scoreColor} rounded px-2 py-1 text-xs flex justify-between items-center`}>
                                        <span title={displayName}>{displayName}</span>
                                        <span className="font-bold ml-1">{skillValue}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                                {skills.length > 6 && (
                                  <p className="text-slate-400 text-xs mt-1">+{skills.length - 6} autres compétences</p>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })()}

                        <div className="pt-3 border-t border-white/10 mt-auto">
                          <span className="text-slate-400 text-xs font-medium">Verdict:</span>
                          <p className="text-slate-200 text-xs leading-relaxed mt-1 line-clamp-3">{c.verdict}</p>
                        </div>
                        
                        <div className="mt-3 text-center">
                          <div className="text-xs text-slate-400">Cliquez pour voir tous les détails</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </GlassCard>
        </section>

        {/* Popup Document */}
        {documentPopup.isOpen && documentPopup.candidate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-[95vw] sm:max-w-md sm:w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 sm:p-6 border-b border-white/20 flex-shrink-0" style={{ backgroundColor: `${documentPopup.candidate.color?.primary}20` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: documentPopup.candidate.color?.primary }}>
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-semibold text-white truncate">{documentPopup.type === 'cv' ? 'Curriculum Vitae' : 'Lettre de motivation'}</h3>
                      <p className="text-slate-300 text-sm sm:text-base truncate">{documentPopup.candidate["full-name"]}</p>
                    </div>
                  </div>
                  <button onClick={closeDocumentPopup} className="text-white hover:text-slate-300 transition-colors flex-shrink-0 ml-2"><X className="w-5 h-5 sm:w-6 sm:h-6" /></button>
                </div>
              </div>
              <div className="p-4 sm:p-6 overflow-y-auto scrollbar-hide flex-1">
                <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10">
                  <pre className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-mono">{documentPopup.content}</pre>
                </div>
              </div>
              <div className="p-4 sm:p-6 border-t border-white/20 flex justify-end space-x-2 sm:space-x-3 flex-shrink-0">
                <button onClick={closeDocumentPopup} className="bg-white/10 hover:bg-white/20 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 border border-white/10 text-sm sm:text-base">Fermer</button>
                <button
                  onClick={() => {
                    if (documentPopup.candidate) {
                      if (documentPopup.type === 'cv') {
                        handleDownloadCV(documentPopup.candidate);
                      } else {
                        handleDownloadMotivationLetter(documentPopup.candidate);
                      }
                    }
                  }}
                  style={{ backgroundColor: documentPopup.candidate.color?.primary }}
                  className="hover:opacity-90 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 flex items-center text-sm sm:text-base"
                >
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Télécharger
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification téléchargement */}
        {downloadNotification.isVisible && (
          <div className="fixed top-4 right-4 z-50">
            <div
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 shadow-2xl animate-in slide-in-from-right duration-300"
              style={{ borderLeftColor: downloadNotification.candidateColor, borderLeftWidth: '4px' }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: downloadNotification.candidateColor }}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-medium">Téléchargement réussi</p>
                  <p className="text-slate-300 text-sm">{downloadNotification.fileName}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Popup candidat détaillé */}
         {candidatePopup.isOpen && candidatePopup.candidate && (
           <div 
             className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4"
             onClick={closeCandidatePopup}
           >
            <div 
               className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-[95vw] sm:max-w-4xl sm:w-full max-h-[90vh] overflow-hidden flex flex-col"
               onClick={(e) => e.stopPropagation()}
             >
              <div className="p-4 sm:p-6 border-b border-white/20 flex-shrink-0" style={{ backgroundColor: `${candidatePopup.candidate.color?.primary}20` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ backgroundColor: candidatePopup.candidate.color?.primary }}>
                      <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-2xl font-bold text-white truncate">{candidatePopup.candidate["full-name"]}</h3>
                      <p className="text-slate-300 text-sm sm:text-base truncate">{candidatePopup.candidate.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={closeCandidatePopup} 
                    className="text-white hover:text-slate-300 transition-colors flex-shrink-0 ml-2"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto scrollbar-hide flex-1">
                {/* Informations générales */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
                  <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                     <span className="text-slate-400 text-xs sm:text-sm font-medium">Score final</span>
                     <p className="text-white font-bold text-lg sm:text-xl">{candidatePopup.candidate["final-score"]}/40</p>
                   </div>
                   <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                     <span className="text-slate-400 text-xs sm:text-sm font-medium">Expérience</span>
                     <p className="text-white font-semibold text-sm sm:text-base">{candidatePopup.candidate["years-of-experience"] ? `${candidatePopup.candidate["years-of-experience"]} ans` : 'Non spécifiée'}</p>
                   </div>
                   <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                     <span className="text-slate-400 text-xs sm:text-sm font-medium">Formation</span>
                     <p className="text-white font-semibold text-sm sm:text-base">{candidatePopup.candidate["education-level"] || 'Non spécifiée'}</p>
                   </div>
                   <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                     <span className="text-slate-400 text-xs sm:text-sm font-medium">Localisation</span>
                     <p className="text-white font-semibold text-sm sm:text-base">{candidatePopup.candidate.location || 'Non spécifiée'}</p>
                   </div>
                </div>

                {/* Compétences détaillées */}
                {(() => {
                  const skills = detectSkills(candidatePopup.candidate);
                  if (skills.length > 0) {
                    return (
                      <div>
                        <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 fill-yellow-400 text-yellow-400" />
                          Toutes les compétences évaluées
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                          {skills.map(([skillName, skillValue]) => {
                            const displayName = skillName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                            const scoreColor = skillValue === 2 ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                                             skillValue === 1 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 
                                             'bg-red-500/20 text-red-300 border-red-500/30';
                            return (
                              <div key={skillName} className={`${scoreColor} rounded-lg px-3 sm:px-4 py-2 sm:py-3 border flex justify-between items-center`}>
                                <span className="font-medium text-sm sm:text-base truncate" title={displayName}>{displayName}</span>
                                <span className="font-bold text-lg sm:text-xl flex-shrink-0 ml-2">{skillValue}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Verdict détaillé */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
                    Analyse détaillée
                  </h4>
                  <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10">
                    <p className="text-slate-200 leading-relaxed text-sm sm:text-base">{candidatePopup.candidate.verdict}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4 justify-center pb-2">
                  <button
                    onClick={() => {
                      closeCandidatePopup();
                      handleSendEmail(candidatePopup.candidate!);
                    }}
                    className="backdrop-blur-xl border text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
                    style={{
                      backgroundColor: `${candidatePopup.candidate.color?.primary}20`,
                      borderColor: `${candidatePopup.candidate.color?.primary}50`,
                      background: `linear-gradient(135deg, ${candidatePopup.candidate.color?.primary}20, ${candidatePopup.candidate.color?.primary}10)`
                    }}
                  >
                    <Mail className="w-5 h-5" />
                    <span>Envoyer un email</span>
                  </button>
                  {candidatePopup.candidate.cvFile && (
                    <button
                      onClick={() => handleDownloadCV(candidatePopup.candidate!)}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      <span>Télécharger CV</span>
                    </button>
                  )}
                  {candidatePopup.candidate.motivationLetterFile && (
                    <button
                      onClick={() => handleDownloadMotivationLetter(candidatePopup.candidate!)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      <span>Télécharger Lettre</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Boutons d'action en bas de page */}
        <div className="mt-16 mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <button
            onClick={() => router.push('/services/ia')}
            className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 backdrop-blur-xl border border-blue-500/30 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Nouvelle analyse</span>
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 backdrop-blur-xl border border-emerald-500/30 text-white px-8 py-4 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center group-hover:-rotate-12 transition-transform duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-semibold text-lg">Retour à l'accueil</span>
          </button>
        </div>

        {/* Footer original */}
        <Footer />
    </main>
  );
}

function KpiCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <GlassCard className="p-6 hover:scale-105 transition-all duration-300 group">
      <div className="flex items-center space-x-4">
        <div className={`bg-gradient-to-r ${color} rounded-xl p-3 shadow-lg group-hover:shadow-xl transition-shadow`}>
          <div className="text-white">{icon}</div>
        </div>
        <div>
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </GlassCard>
  );
}

function GlassCard({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ${className}`}>{children}</div>;
}
   