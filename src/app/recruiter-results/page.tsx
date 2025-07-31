"use client";

import { useEffect, useState } from "react";
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
  XCircle,
  TrendingUp,
  AlertCircle,
  Home,
  ArrowLeft,
  Award,
  Users,
  Target,
  Star,
  Eye,
  Download,
  Mail,
  Calendar,
  FileText,
  User,
  X
} from "lucide-react";

type Candidate = {
  "full-name": string;
  email: string;
  location: string;
  "education-level": string;
  "years-of-experience": number;
  "salary-expectation": string;
  verdict: string;
  "final-score": number;
  // Critères de scoring détaillés
  "analyse-financiere": number;
  "reporting-financier": number;
  "modelisation-financiere": number;
  "previsions-financieres": number;
  "cloture-comptable": number;
  "pilotage-budgetaire": number;
  "business-partnering-financier": number;
  "optimisation-structure-couts": number;
  "strategie-financiere": number;
  "amelioration-processus-financiers": number;
  "automatisation-outils-financiers": number;
  "utilisation-outils-bi": number;
  "maitrise-excel-fonctions-avancees": number;
  "maitrise-excel-vba-macros": number;
  "erp-sap": number;
  "outil-bi-power-bi": number;
  "connaissance-bloomberg": number;
  "anglais-professionnel": number;
  "francais-courant": number;
  "formation-bac-plus-5-finance-ecole-commerce-equivalent": number;
  "experience-minimum-5-ans-analyse-financiere-ou-controle-de-gestion-ou-business-partner-financier": number;
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
  [k: string]: unknown;
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

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const analysisId = sessionStorage.getItem('analysisId')
        if (!analysisId) {
          throw new Error('ID d\'analyse manquant')
        }
        
        // Utiliser les données du fichier json.md
        const fallbackData = [
          {
            "full-name": "ANNE MOREAU",
            "email": "help@enhancv.com",
            "location": "Bordeaux, FR",
            "education-level": "Master en Finance",
            "years-of-experience": 12,
            "salary-expectation": null,
            "verdict": "Bonne candidate avec plus de 5 ans d'expérience en analyse financière et contrôle de gestion, très compétente en business partnering, maîtrise Power BI, SAP et Excel avancé. Forte en optimisation et recommandations stratégiques, elle a réduit significativement les écarts budgétaires et amélioré la marge.",
            "final-score": 39,
            "analyse-financiere": 2,
            "reporting": 2,
            "suivi-indicateurs-performance-kpis": 2,
            "modélisation-financière": 2,
            "prévisions-financières": 2,
            "evaluation-projets-investissement": 1,
            "cloture-mensuelle": 2,
            "pilotage-cycles-budgetaires": 2,
            "suivi-budgets-sg&a-opex": 2,
            "business-partnering": 2,
            "optimisation-structure-couts": 2,
            "recommandations-strategiques": 2,
            "amelioration-processus-financiers": 2,
            "automatisation-processus": 2,
            "outil-bi": 2,
            "maitrise-excel": 2,
            "maitrise-vba-macros": 1,
            "erp-sap": 2,
            "outil-bi-power-bi": 2,
            "connaissance-bloomberg": 0,
            "francais-courant": 2,
            "anglais-professionnel": 1
          },
          {
            "full-name": "YANN GARNIER",
            "email": "yann.garnier@mail.com",
            "location": "Bordeaux, France",
            "education-level": "Master 2 Finance d'Entreprise",
            "years-of-experience": 3,
            "salary-expectation": null,
            "verdict": "Candidat junior avec 3 ans d'expérience, maîtrise Excel avancé avec VBA, Power BI, SAP et Bloomberg, bon en contrôle budgétaire et reporting. Moins d'expérience dans la clôture mensuelle et pilotage complet des budgets Sg&A, ce qui limite sa capacité à être pleinement opérationnel sur un poste senior.",
            "final-score": 35,
            "analyse-financiere": 2,
            "reporting": 2,
            "suivi-indicateurs-performance-kpis": 2,
            "modélisation-financière": 2,
            "prévisions-financières": 1,
            "evaluation-projets-investissement": 1,
            "cloture-mensuelle": 0,
            "pilotage-cycles-budgetaires": 1,
            "suivi-budgets-sg&a-opex": 1,
            "business-partnering": 1,
            "optimisation-structure-couts": 1,
            "recommandations-strategiques": 1,
            "amelioration-processus-financiers": 2,
            "automatisation-processus": 2,
            "outil-bi": 2,
            "maitrise-excel": 2,
            "maitrise-vba-macros": 2,
            "erp-sap": 2,
            "outil-bi-power-bi": 2,
            "connaissance-bloomberg": 2,
            "francais-courant": 2,
            "anglais-professionnel": 2
          },
          {
            "full-name": "Paul MARTIN",
            "email": "paul.martin@email.com",
            "location": "Lyon, France",
            "education-level": "Master en Finance",
            "years-of-experience": 6,
            "salary-expectation": null,
            "verdict": "Profil solide avec plus de 5 ans d'expérience en analyse financière dans des grandes institutions, expertise avancée en modélisation, VBA, Bloomberg, maîtrise Excel avancé et connaissance SAP. Très bon en reporting et recommandations stratégiques, mais suivi des budgets Sg&A moins explicité.",
            "final-score": 30,
            "analyse-financiere": 2,
            "reporting": 2,
            "suivi-indicateurs-performance-kpis": 1,
            "modélisation-financière": 2,
            "prévisions-financières": 2,
            "evaluation-projets-investissement": 1,
            "cloture-mensuelle": 1,
            "pilotage-cycles-budgetaires": 1,
            "suivi-budgets-sg&a-opex": 0,
            "business-partnering": 2,
            "optimisation-structure-couts": 2,
            "recommandations-strategiques": 2,
            "amelioration-processus-financiers": 1,
            "automatisation-processus": 0,
            "outil-bi": 0,
            "maitrise-excel": 2,
            "maitrise-vba-macros": 2,
            "erp-sap": 1,
            "outil-bi-power-bi": 0,
            "connaissance-bloomberg": 2,
            "francais-courant": 2,
            "anglais-professionnel": 2
          },
          {
            "full-name": "Raoul ROBILLARD",
            "email": "r.robillard@eemail.com",
            "location": "Metz",
            "education-level": "Master 2 spécialisé en Analyse financière internationale",
            "years-of-experience": 5,
            "salary-expectation": null,
            "verdict": "Bon profil avec une expertise en modélisation financière, évaluation de projets et reporting, maîtrise confirmée d'Excel, Bloomberg et SQL, ainsi qu'anglais courant. Expérience en gestion de portefeuille et recommandations stratégiques solides, mais peu d'éléments sur le suivi des budgets Sg&A ou Power BI.",
            "final-score": 28,
            "analyse-financiere": 2,
            "reporting": 2,
            "suivi-indicateurs-performance-kpis": 2,
            "modélisation-financière": 2,
            "prévisions-financières": 2,
            "evaluation-projets-investissement": 2,
            "cloture-mensuelle": 1,
            "pilotage-cycles-budgetaires": 1,
            "suivi-budgets-sg&a-opex": 0,
            "business-partnering": 1,
            "optimisation-structure-couts": 1,
            "recommandations-strategiques": 2,
            "amelioration-processus-financiers": 1,
            "automatisation-processus": 0,
            "outil-bi": 0,
            "maitrise-excel": 2,
            "maitrise-vba-macros": 1,
            "erp-sap": 0,
            "outil-bi-power-bi": 0,
            "connaissance-bloomberg": 2,
            "francais-courant": 2,
            "anglais-professionnel": 2
          }
        ];

        const processedFallback = fallbackData.map((c: any, idx) => ({
          ...c,
          color: candidateColors[idx % candidateColors.length]
        }));
        setData(processedFallback);
        setLoading(false);
        
      } catch (err) {
        console.error('Erreur lors du chargement des résultats:', err);
        setError(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const calculateScore = (c: Candidate) =>
    c["final-score"] ?? Number(String(c["final-score"]).replace(/\/.*/, "")) || 0;

  const sorted = [...data].sort((a, b) => calculateScore(b) - calculateScore(a));

  const chartData = sorted.map((c, idx) => ({
    ...c,
    score: calculateScore(c),
    color: c.color?.primary || candidateColors[idx % candidateColors.length].primary
  }));

  const scrollToCandidate = (name: string) => {
    const id = `candidate-${name.replace(/\s+/g, '-').toLowerCase()}`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-cyan-400', 'ring-opacity-75');
      setTimeout(() => el.classList.remove('ring-2', 'ring-cyan-400', 'ring-opacity-75'), 2000);
    }
  };

  const handleViewCV = (c: Candidate) =>
    setDocumentPopup({ isOpen: true, type: 'cv', candidate: c, content: c.cvContent || 'Contenu du CV non disponible' });

  const handleDownloadCV = (c: Candidate) => {
    const fileName = c.cvFile || `${c["full-name"]}_CV.pdf`;
    setDownloadNotification({ isVisible: true, fileName, candidateColor: c.color?.primary || '#06b6d4' });
    setTimeout(() => setDownloadNotification(prev => ({ ...prev, isVisible: false })), 3000);
  };

  const handleViewMotivationLetter = (c: Candidate) =>
    setDocumentPopup({ isOpen: true, type: 'motivation', candidate: c, content: c.motivationContent || 'Lettre non disponible' });

  const handleDownloadMotivationLetter = (c: Candidate) => {
    const fileName = c.motivationLetterFile || `${c["full-name"]}_Lettre.pdf`;
    setDownloadNotification({ isVisible: true, fileName, candidateColor: c.color?.primary || '#06b6d4' });
    setTimeout(() => setDownloadNotification(prev => ({ ...prev, isVisible: false })), 3000);
  };

  const handleSendEmail = (c: Candidate) => {
    const subject = encodeURIComponent(`Candidature - Premier contact`);
    const body = encodeURIComponent(`Bonjour ${c["full-name"]},\n\nNous avons examiné votre candidature et souhaitons vous contacter pour discuter de votre profil.\n\nCordialement,\nL'équipe de recrutement`);
    window.open(`mailto:${c.email}?subject=${subject}&body=${body}`);
  };

  const handleScheduleMeeting = (c: Candidate) =>
    alert(`Planification d'un rendez-vous avec ${c["full-name"]}\nEmail: ${c.email}\n\nFonctionnalité à venir.`);

  const closeDocumentPopup = () =>
    setDocumentPopup({ isOpen: false, type: null, candidate: null, content: '' });

  if (loading)
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

  if (error)
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Erreur</h2>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={() => (window.location.href = '/services/ia')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Retour à l'analyse
            </button>
          </div>
        </div>
      </main>
    );
    
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-8 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="relative">
          <button
            onClick={() => (window.location.href = '/')}
            className="absolute left-0 top-0 flex items-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 group bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <Home className="w-5 h-5" />
            <span className="ml-2 text-sm font-medium">Accueil</span>
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
          <KpiCard icon={<Target />} label="Meilleur score" value={sorted.length ? `${calculateScore(sorted[0])}/100` : "-"} color="from-emerald-500 to-teal-500" />
          <KpiCard icon={<Star />} label="Score moyen" value={sorted.length ? `${Math.round(sorted.reduce((acc, c) => acc + calculateScore(c), 0) / sorted.length)}/100` : "-"} color="from-amber-500 to-orange-500" />
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
                  <YAxis tick={{ fill: '#fff', fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "8px", color: "#fff", backdropFilter: "blur(10px)" }}
                    formatter={(value) => [`${value}/100`, "Score"]}
                    labelFormatter={(label) => `Candidat: ${label}`}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]} style={{ cursor: 'pointer' }} onClick={(_, idx) => scrollToCandidate(chartData[idx]["full-name"])}>
                    {chartData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
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
                            <div className="relative group"><button onClick={() => handleScheduleMeeting(sorted[0])} className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300 border border-yellow-500/30"><Calendar className="w-5 h-5 text-yellow-400" /></button><div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Planifier un RDV</div></div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right"><div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full px-4 py-2 shadow-lg"><span className="text-white font-bold text-lg">{calculateScore(sorted[0])}/100</span></div></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Expérience:</span><p className="text-white font-semibold">{sorted[0]["years-of-experience"]} ans</p></div>
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Formation:</span><p className="text-white font-semibold truncate">{sorted[0]["education-level"]}</p></div>
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Localisation:</span><p className="text-white font-semibold">{sorted[0].location}</p></div>
                      <div className="bg-white/5 rounded-lg p-3"><span className="text-yellow-400 text-sm font-medium">Email:</span><p className="text-white font-semibold truncate">{sorted[0].email}</p></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3"><FileText className="w-5 h-5 text-cyan-400" /><span className="text-white font-medium">CV</span></div>
                        <div className="flex space-x-3 justify-center">
                          <div className="relative group"><button onClick={() => handleViewCV(sorted[0])} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-500/30"><Eye className="w-4 h-4 text-cyan-400" /><span className="text-cyan-400 text-sm font-medium">Voir</span></button></div>
                          <div className="relative group"><button onClick={() => handleDownloadCV(sorted[0])} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-500/30"><Download className="w-4 h-4 text-cyan-400" /><span className="text-cyan-400 text-sm font-medium">Télécharger</span></button></div>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3"><User className="w-5 h-5 text-emerald-400" /><span className="text-white font-medium">Lettre de motivation</span></div>
                        <div className="flex space-x-3 justify-center">
                          <div className="relative group"><button onClick={() => handleViewMotivationLetter(sorted[0])} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-all duration-300 border border-emerald-500/30"><Eye className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400 text-sm font-medium">Voir</span></button></div>
                          <div className="relative group"><button onClick={() => handleDownloadMotivationLetter(sorted[0])} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-all duration-300 border border-emerald-500/30"><Download className="w-4 h-4 text-emerald-400" /><span className="text-emerald-400 text-sm font-medium">Télécharger</span></button></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg p-4 border border-yellow-500/20">
                      <h5 className="text-yellow-400 font-semibold mb-2 flex items-center"><Star className="w-4 h-4 mr-2 fill-yellow-400" />Pourquoi ce candidat est le meilleur choix :</h5>
                      <p className="text-slate-200 leading-relaxed">{sorted[0].verdict}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Autres candidats */}
            {sorted.length > 1 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center"><Users className="w-5 h-5 mr-2" />Autres candidats</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sorted.slice(1).map((c, idx) => {
                    const score = calculateScore(c);
                    return (
                      <div
                        key={idx}
                        id={`candidate-${c["full-name"].replace(/\s+/g, '-').toLowerCase()}`}
                        className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: c.color?.primary }}>#{idx + 2}</div>
                            <div className="flex-1 min-w-0"><h4 className="text-base font-semibold text-white truncate">{c["full-name"]}</h4></div>
                          </div>
                          <div className="inline-flex items-center px-2 py-1 rounded-full text-white font-bold text-xs" style={{ backgroundColor: c.color?.primary }}>{score}/100</div>
                        </div>

                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <div className="relative group"><button onClick={() => handleSendEmail(c)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"><Mail className="w-4 h-4 text-white" /></button></div>
                          <div className="relative group"><button onClick={() => handleScheduleMeeting(c)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"><Calendar className="w-4 h-4 text-white" /></button></div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 text-xs mb-3">
                          <div><span className="text-slate-400">Expérience:</span><p className="text-white">{c["years-of-experience"]} ans</p></div>
                          <div><span className="text-slate-400">Formation:</span><p className="text-white truncate">{c["education-level"]}</p></div>
                          <div><span className="text-slate-400">Localisation:</span><p className="text-white truncate">{c.location}</p></div>
                        </div>

                        <div className="mb-3">
                          <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1 text-center">
                              <div className="flex items-center justify-center space-x-1 mb-2"><FileText className="w-3 h-3 text-cyan-400" /><span className="text-white font-medium text-xs">CV</span></div>
                              <div className="relative group inline-block"><button onClick={() => handleViewCV(c)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"><Eye className="w-3 h-3 text-white" /></button></div>
                            </div>
                            <div className="flex-1 text-center">
                              <div className="flex items-center justify-center space-x-1 mb-2"><User className="w-3 h-3 text-emerald-400" /><span className="text-white font-medium text-xs">Lettre</span></div>
                              <div className="relative group inline-block"><button onClick={() => handleViewMotivationLetter(c)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"><Eye className="w-3 h-3 text-white" /></button></div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 mt-auto">
                          <span className="text-slate-400 text-xs font-medium">Verdict:</span>
                          <p className="text-slate-200 mt-1 text-xs leading-relaxed line-clamp-3">{c.verdict}</p>
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-white/20" style={{ backgroundColor: `${documentPopup.candidate.color?.primary}20` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: documentPopup.candidate.color?.primary }}>
                      {documentPopup.type === 'cv' ? <FileText className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{documentPopup.type === 'cv' ? 'Curriculum Vitae' : 'Lettre de motivation'}</h3>
                      <p className="text-slate-300">{documentPopup.candidate["full-name"]}</p>
                    </div>
                  </div>
                  <button onClick={closeDocumentPopup} className="text-white hover:text-slate-300 transition-colors"><X className="w-6 h-6" /></button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">{documentPopup.content}</pre>
                </div>
              </div>
              <div className="p-6 border-t border-white/20 flex justify-end space-x-3">
                <button onClick={closeDocumentPopup} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-white/10">Fermer</button>
                <button
                  onClick={() => {
                    documentPopup.type === 'cv' ? handleDownloadCV(documentPopup.candidate!) : handleDownloadMotivationLetter(documentPopup.candidate!);
                  }}
                  style={{ backgroundColor: documentPopup.candidate.color?.primary }}
                  className="hover:opacity-90 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" /> Télécharger
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