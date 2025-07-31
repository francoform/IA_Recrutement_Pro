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

// Couleurs pour chaque candidat avec des tons plus doux
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
        const analysisId = sessionStorage.getItem('analysisId');
        
        if (!analysisId) {
          setError("Aucune analyse trouvée. Veuillez relancer une analyse.");
          setLoading(false);
          return;
        }

        const response = await fetch('https://n8nify.francoform.com/webhook/690fb674-2054-44c2-8805-5bb30c6091fa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ analysisId })
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        
        // Votre webhook retourne maintenant directement un tableau
        let candidatesData = Array.isArray(result) ? result : [result];
        
        if (!Array.isArray(candidatesData) || candidatesData.length === 0) {
          throw new Error('Aucune donnée de candidat trouvée');
        }
        
        const processedData = candidatesData.map((candidate: any, index: number) => ({
          ...candidate,
          "final-score": typeof candidate["final-score"] === 'number' 
            ? candidate["final-score"] 
            : Number(candidate["final-score"]) || 0,
          color: candidateColors[index % candidateColors.length]
        }));
        
        setData(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        
        // Données de fallback mises à jour avec votre nouvelle structure
        const fallbackData = [
          {
            "full-name": "Anne Moreau",
            "email": "help@enhancv.com",
            "location": "Bordeaux",
            "education-level": "Master en Finance, Université Paris-Dauphine",
            "years-of-experience": 12,
            "salary-expectation": "",
            "verdict": "Excellent profil senior avec plus de 5 ans d'expérience en contrôle de gestion et business partnering. Expertise solide en SAP, Power BI, modélisation financière et optimisation budgétaire. Compétences managériales et amélioration continue très bien démontrées.",
            "final-score": 36,
            "analyse-financiere": 2,
            "reporting-financier": 2,
            "modelisation-financiere": 2,
            "previsions-financieres": 2,
            "cloture-comptable": 2,
            "pilotage-budgetaire": 2,
            "business-partnering-financier": 2,
            "optimisation-structure-couts": 2,
            "strategie-financiere": 2,
            "amelioration-processus-financiers": 2,
            "automatisation-outils-financiers": 2,
            "utilisation-outils-bi": 2,
            "maitrise-excel-fonctions-avancees": 1,
            "maitrise-excel-vba-macros": 0,
            "erp-sap": 2,
            "outil-bi-power-bi": 2,
            "connaissance-bloomberg": 0,
            "anglais-professionnel": 1,
            "francais-courant": 2,
            "formation-bac-plus-5-finance-ecole-commerce-equivalent": 2,
            "experience-minimum-5-ans-analyse-financiere-ou-controle-de-gestion-ou-business-partner-financier": 2
          },
          {
            "full-name": "Yann Garnier",
            "email": "yann.garnier@mail.com",
            "location": "Bordeaux",
            "education-level": "Master 2 Finance d'Entreprise, KEDGE Business School",
            "years-of-experience": 3,
            "salary-expectation": "",
            "verdict": "Profil junior avec 3 ans d'expérience, bonne maîtrise de la modélisation Excel (VBA) et reporting financier. Expérience en budget et business partnering confirmée, maîtrise de SAP et Power BI indiquée. Manque d'expérience requise (5 ans).",
            "final-score": 35,
            "analyse-financiere": 2,
            "reporting-financier": 2,
            "modelisation-financiere": 2,
            "previsions-financieres": 2,
            "cloture-comptable": 0,
            "pilotage-budgetaire": 2,
            "business-partnering-financier": 2,
            "optimisation-structure-couts": 1,
            "strategie-financiere": 1,
            "amelioration-processus-financiers": 1,
            "automatisation-outils-financiers": 2,
            "utilisation-outils-bi": 2,
            "maitrise-excel-fonctions-avancees": 2,
            "maitrise-excel-vba-macros": 2,
            "erp-sap": 2,
            "outil-bi-power-bi": 2,
            "connaissance-bloomberg": 2,
            "anglais-professionnel": 2,
            "francais-courant": 2,
            "formation-bac-plus-5-finance-ecole-commerce-equivalent": 2,
            "experience-minimum-5-ans-analyse-financiere-ou-controle-de-gestion-ou-business-partner-financier": 0
          }
        ];
        
        const processedData = fallbackData.map((candidate: any, index: number) => ({
          ...candidate,
          color: candidateColors[index % candidateColors.length]
        }));
        
        setData(processedData);
        setError(`Erreur de connexion: ${err instanceof Error ? err.message : 'Erreur inconnue'}. Utilisation des données de test.`);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const calculateScore = (c: Candidate) => {
    // Votre final-score est déjà calculé dans le workflow n8n
    return c["final-score"] || 0;
  };
    return Number(String(c["final-score"]).replace(/\/.*/, "")) || 0;
  };

  const sorted = [...data].sort((a, b) => calculateScore(b) - calculateScore(a));

  const chartData = sorted.map((candidate, index) => ({
    ...candidate,
    score: calculateScore(candidate),
    color: candidate.color?.primary || candidateColors[index % candidateColors.length].primary
  }));

  const scrollToCandidate = (candidateName: string) => {
    const element = document.getElementById(`candidate-${candidateName.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('ring-2', 'ring-cyan-400', 'ring-opacity-75');
      setTimeout(() => {
        element.classList.remove('ring-2', 'ring-cyan-400', 'ring-opacity-75');
      }, 2000);
    }
  };

  const handleViewCV = (candidate: Candidate) => {
    setDocumentPopup({
      isOpen: true,
      type: 'cv',
      candidate,
      content: candidate.cvContent || 'Contenu du CV non disponible'
    });
  };

  const handleDownloadCV = (candidate: Candidate) => {
    // Simuler le téléchargement
    const fileName = candidate.cvFile || `${candidate["full-name"]}_CV.pdf`;
    
    // Afficher la notification
    setDownloadNotification({
      isVisible: true,
      fileName,
      candidateColor: candidate.color?.primary || '#06b6d4'
    });
    
    // Masquer la notification après 3 secondes
    setTimeout(() => {
      setDownloadNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleViewMotivationLetter = (candidate: Candidate) => {
    setDocumentPopup({
      isOpen: true,
      type: 'motivation',
      candidate,
      content: candidate.motivationContent || 'Contenu de la lettre de motivation non disponible'
    });
  };

  const handleDownloadMotivationLetter = (candidate: Candidate) => {
    // Simuler le téléchargement
    const fileName = candidate.motivationLetterFile || `${candidate["full-name"]}_Lettre.pdf`;
    
    // Afficher la notification
    setDownloadNotification({
      isVisible: true,
      fileName,
      candidateColor: candidate.color?.primary || '#06b6d4'
    });
    
    // Masquer la notification après 3 secondes
    setTimeout(() => {
      setDownloadNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleSendEmail = (candidate: Candidate) => {
    // Ouvrir le client email avec l'adresse pré-remplie
    const subject = encodeURIComponent(`Candidature - Premier contact`);
    const body = encodeURIComponent(`Bonjour ${candidate["full-name"]},\n\nNous avons examiné votre candidature et souhaitons vous contacter pour discuter de votre profil.\n\nCordialement,\nL'équipe de recrutement`);
    window.open(`mailto:${candidate.email}?subject=${subject}&body=${body}`);
  };

  const handleScheduleMeeting = (candidate: Candidate) => {
    // Pour l'instant, afficher une alerte - à intégrer plus tard avec le planning
    alert(`Planification d'un rendez-vous avec ${candidate["full-name"]}\nEmail: ${candidate.email}\n\nCette fonctionnalité sera intégrée au planning du recruteur prochainement.`);
  };

  const closeDocumentPopup = () => {
    setDocumentPopup({ isOpen: false, type: null, candidate: null, content: '' });
  };

  if (loading)
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400/30 border-t-cyan-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-blue-400/20 border-r-blue-400 animate-spin mx-auto" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <span className="text-cyan-400 text-lg font-medium">Chargement des résultats...</span>
            <p className="text-slate-300 text-sm mt-2">Analyse des candidatures en cours</p>
          </div>
        </div>
      </main>
    );

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Erreur</h2>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={() => window.location.href = '/services/ia'}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Retour à l'analyse
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-8 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header avec bouton retour */}
        <header className="relative">
          {/* Bouton retour à l'accueil */}
          <button
            onClick={() => window.location.href = '/'}
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

        {/* ---------- KPI Cards ---------- */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <KpiCard
            icon={<Users className="w-6 h-6" />}
            label="Candidats analysés"
            value={data.length.toString()}
            color="from-blue-500 to-cyan-500"
          />
          <KpiCard
            icon={<Target className="w-6 h-6" />}
            label="Meilleur score"
            value={sorted.length ? `${calculateScore(sorted[0])}/100` : "-"}
            color="from-emerald-500 to-teal-500"
          />
          <KpiCard
            icon={<Star className="w-6 h-6" />}
            label="Score moyen"
            value={
              sorted.length ? `${Math.round(sorted.reduce((acc, c) => acc + calculateScore(c), 0) / sorted.length)}/100` : "-"
            }
            color="from-amber-500 to-orange-500"
          />
        </section>

        {/* ---------- Chart ---------- */}
        <section>
          <GlassCard className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-2 mr-3">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Scores des candidats</h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="full-name" 
                    tick={{ fill: '#fff', fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    tick={{ fill: '#fff', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      color: "#fff",
                      backdropFilter: "blur(10px)"
                    }}
                    formatter={(value, name, props) => [
                      `${value}/100`,
                      "Score"
                    ]}
                    labelFormatter={(label) => `Candidat: ${label}`}
                  />
                  <Bar 
                    dataKey="score" 
                    radius={[8, 8, 0, 0]}
                    onClick={(data, index) => {
                      if (data && chartData[index]) {
                        const candidateName = chartData[index]["full-name"];
                        if (candidateName) {
                          scrollToCandidate(candidateName);
                        }
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </section>

        {/* ---------- Candidates Cards ---------- */}
        <section>
          <GlassCard className="p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-2 mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Détails des candidats</h3>
            </div>
            
            {/* Meilleur candidat - Pleine largeur avec style doré */}
            {sorted.length > 0 && (
              <div className="mb-8">
                <div className="relative bg-gradient-to-r from-yellow-600/20 via-amber-500/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/30 p-6 overflow-hidden">
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent animate-pulse"></div>
                  
                  {/* Étoiles décoratives */}
                  <div className="absolute top-4 right-4 flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {/* Badge Gagnant */}
                        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-3 shadow-lg">
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                              🏆 {sorted[0]["full-name"]}
                            </h4>
                            <span className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              MEILLEUR CANDIDAT
                            </span>
                          </div>
                          
                          {/* Actions rapides */}
                          <div className="flex items-center space-x-3">
                            <div className="relative group">
                              <button
                                onClick={() => handleSendEmail(sorted[0])}
                                className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300 border border-yellow-500/30"
                              >
                                <Mail className="w-5 h-5 text-yellow-400" />
                              </button>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                Envoyer un email
                              </div>
                            </div>
                            <div className="relative group">
                              <button
                                onClick={() => handleScheduleMeeting(sorted[0])}
                                className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300 border border-yellow-500/30"
                              >
                                <Calendar className="w-5 h-5 text-yellow-400" />
                              </button>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                Planifier un RDV
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Score */}
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full px-4 py-2 shadow-lg">
                          <span className="text-white font-bold text-lg">{calculateScore(sorted[0])}/100</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Informations détaillées */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <span className="text-yellow-400 text-sm font-medium">Expérience:</span>
                        <p className="text-white font-semibold">{sorted[0]["years-of-experience"]} ans</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <span className="text-yellow-400 text-sm font-medium">Formation:</span>
                        <p className="text-white font-semibold">{sorted[0]["education-level"]}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <span className="text-yellow-400 text-sm font-medium">Localisation:</span>
                        <p className="text-white font-semibold">{sorted[0].location}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <span className="text-yellow-400 text-sm font-medium">Email:</span>
                        <p className="text-white font-semibold truncate">{sorted[0].email}</p>
                      </div>
                    </div>
                    
                    {/* Documents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      {/* Section CV */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <FileText className="w-5 h-5 text-cyan-400" />
                          <span className="text-white font-medium">CV</span>
                        </div>
                        <div className="flex space-x-3">
                          <div className="relative group">
                            <button
                              onClick={() => handleViewCV(sorted[0])}
                              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-500/30"
                            >
                              <Eye className="w-4 h-4 text-cyan-400" />
                              <span className="text-cyan-400 text-sm font-medium">Voir</span>
                            </button>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Voir le CV
                            </div>
                          </div>
                          <div className="relative group">
                            <button
                              onClick={() => handleDownloadCV(sorted[0])}
                              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-500/30"
                            >
                              <Download className="w-4 h-4 text-cyan-400" />
                              <span className="text-cyan-400 text-sm font-medium">Télécharger</span>
                            </button>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Télécharger le CV
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section Lettre de motivation */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <User className="w-5 h-5 text-emerald-400" />
                          <span className="text-white font-medium">Lettre de motivation</span>
                        </div>
                        <div className="flex space-x-3">
                          <div className="relative group">
                            <button
                              onClick={() => handleViewMotivationLetter(sorted[0])}
                              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-all duration-300 border border-emerald-500/30"
                            >
                              <Eye className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400 text-sm font-medium">Voir</span>
                            </button>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Voir la lettre
                            </div>
                          </div>
                          <div className="relative group">
                            <button
                              onClick={() => handleDownloadMotivationLetter(sorted[0])}
                              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-all duration-300 border border-emerald-500/30"
                            >
                              <Download className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400 text-sm font-medium">Télécharger</span>
                            </button>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              Télécharger la lettre
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Verdict détaillé */}
                    <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg p-4 border border-yellow-500/20">
                      <h5 className="text-yellow-400 font-semibold mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-2 fill-yellow-400" />
                        Pourquoi ce candidat est le meilleur choix :
                      </h5>
                      <p className="text-slate-200 leading-relaxed">{sorted[0].verdict}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Autres candidats - Grille */}
              {sorted.length > 1 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Autres candidats
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sorted.slice(1).map((candidate, idx) => {
                      const score = calculateScore(candidate);
                      
                      return (
                        <div 
                          key={idx}
                          id={`candidate-${candidate["full-name"].replace(/\s+/g, '-').toLowerCase()}`}
                          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300 flex flex-col"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              {/* Rang avec couleur */}
                              <div 
                                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                                style={{ backgroundColor: candidate.color?.primary }}
                              >
                                #{idx + 2}
                              </div>
                              
                              {/* Nom du candidat */}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-base font-semibold text-white truncate">
                                  {candidate["full-name"]}
                                </h4>
                              </div>
                            </div>
                            
                            {/* Score */}
                            <div 
                              className="inline-flex items-center px-2 py-1 rounded-full text-white font-bold text-xs"
                              style={{ backgroundColor: candidate.color?.primary }}
                            >
                              {score}/100
                            </div>
                          </div>
                          
                          {/* Actions rapides */}
                          <div className="flex items-center justify-center space-x-2 mb-3">
                            <div className="relative group">
                              <button
                                onClick={() => handleSendEmail(candidate)}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"
                              >
                                <Mail className="w-4 h-4 text-white" />
                              </button>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                Envoyer un email
                              </div>
                            </div>
                            <div className="relative group">
                              <button
                                onClick={() => handleScheduleMeeting(candidate)}
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"
                              >
                                <Calendar className="w-4 h-4 text-white" />
                              </button>
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                Planifier un RDV
                              </div>
                            </div>
                          </div>
                          
                          {/* Informations candidat */}
                          <div className="grid grid-cols-1 gap-2 text-xs mb-3">
                            <div>
                              <span className="text-slate-400">Expérience:</span>
                              <p className="text-white">{candidate["years-of-experience"]} ans</p>
                            </div>
                            <div>
                              <span className="text-slate-400">Formation:</span>
                              <p className="text-white truncate">{candidate["education-level"]}</p>
                            </div>
                            <div>
                              <span className="text-slate-400">Localisation:</span>
                              <p className="text-white truncate">{candidate.location}</p>
                            </div>
                          </div>
                          
                          {/* Documents - Seulement consultation */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between space-x-4">
                              {/* Section CV */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-1 mb-2">
                                  <FileText className="w-3 h-3 text-cyan-400" />
                                  <span className="text-white font-medium text-xs">CV</span>
                                </div>
                                <div className="flex justify-center">
                                  <div className="relative group">
                                    <button
                                      onClick={() => handleViewCV(candidate)}
                                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"
                                    >
                                      <Eye className="w-3 h-3 text-white" />
                                    </button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                      Consulter le CV
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Section Lettre de motivation */}
                              <div className="flex-1">
                                <div className="flex items-center space-x-1 mb-2">
                                  <User className="w-3 h-3 text-emerald-400" />
                                  <span className="text-white font-medium text-xs">Lettre</span>
                                </div>
                                <div className="flex justify-center">
                                  <div className="relative group">
                                    <button
                                      onClick={() => handleViewMotivationLetter(candidate)}
                                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10"
                                    >
                                      <Eye className="w-3 h-3 text-white" />
                                    </button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                      Consulter la lettre
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Verdict */}
                          <div className="pt-3 border-t border-white/10 mt-auto">
                            <span className="text-slate-400 text-xs font-medium">Verdict:</span>
                            <p className="text-slate-200 mt-1 text-xs leading-relaxed line-clamp-3">{candidate.verdict}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </GlassCard>
          </section>
        </div>

        {/* ---------- Document Popup ---------- */}
        {documentPopup.isOpen && documentPopup.candidate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div 
                className="p-6 border-b border-white/20"
                style={{ backgroundColor: `${documentPopup.candidate.color?.primary}20` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: documentPopup.candidate.color?.primary }}
                    >
                      {documentPopup.type === 'cv' ? <FileText className="w-5 h-5" /> : <User className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {documentPopup.type === 'cv' ? 'Curriculum Vitae' : 'Lettre de motivation'}
                      </h3>
                      <p className="text-slate-300">{documentPopup.candidate["full-name"]}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeDocumentPopup}
                    className="text-white hover:text-slate-300 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <pre className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {documentPopup.content}
                  </pre>
                </div>
              </div>
              
              {/* Footer */}
              <div className="p-6 border-t border-white/20 flex justify-end space-x-3">
                <button
                  onClick={closeDocumentPopup}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-white/10"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    if (documentPopup.type === 'cv') {
                      handleDownloadCV(documentPopup.candidate!);
                    } else {
                      handleDownloadMotivationLetter(documentPopup.candidate!);
                    }
                  }}
                  style={{ backgroundColor: documentPopup.candidate.color?.primary }}
                  className="hover:opacity-90 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Download Notification ---------- */}
        {downloadNotification.isVisible && (
          <div className="fixed top-4 right-4 z-50">
            <div 
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 shadow-2xl animate-in slide-in-from-right duration-300"
              style={{ borderLeftColor: downloadNotification.candidateColor, borderLeftWidth: '4px' }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: downloadNotification.candidateColor }}
                >
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
      </main>
    );
  };

function KpiCard({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
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
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}