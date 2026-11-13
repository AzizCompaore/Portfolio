import { Project, SkillCategory, Achievement, EducationItem } from '../types';

export const PERSONAL_INFO = {
  fullName: 'Compaoré Abdoul Aziz',
  shortName: 'Aziz Compaoré',
  firstName: 'Aziz',
  lastName: 'Compaoré',
  title: 'Full-Stack Developer & AI Builder',
  tagline: 'Building digital experiences. Engineering intelligent solutions.',
  location: 'Abidjan, Côte d\'Ivoire',
  institution: 'Université Agitel Formation (Licence 3)',
  email: 'Azizcompaore252@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aziz-compaore-549337299',
  github: 'https://github.com/AzizCompaore',
  bio: `Étudiant en Licence 3 Informatique à l'Université Agitel Formation à Abidjan. Passionné par la conception de solutions numériques, le développement logiciel, l'intelligence artificielle et les nouvelles technologies. Mon profil combine développement full-stack, intégration de modèles d'IA (Google Gemini, OpenAI), bases de données relationnelles et leadership technique lors de hackathons.`,
  images: {
    heroPortrait: '/assets/portfolio/WhatsApp_Image_2026-11-09_at_13.30.33_dc057b37.jpeg',
    leadershipPortrait: '/assets/portfolio/WhatsApp_Image_2026-11-09_at_13.50.14_e88d323f.jpeg',
    awardsPhoto: '/assets/portfolio/WhatsApp_Image_2026-11-09_at_13.21.04_d2a8b303.jpeg',
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'agrivigil-ai',
    title: 'AgriVigil AI',
    tagline: 'Détection prédictive des maladies agricoles par IA & système d\'alerte communautaire',
    category: 'ai',
    categoryLabel: 'IA & Agronomie',
    year: '2026',
    url: 'https://azizcompaore.github.io/agrivigil-ai/',
    screenshot: '/assets/portfolio/agrivigil-ai.png',
    screenshotFit: 'contain',
    githubUrl: 'https://github.com/AzizCompaore',
    role: 'Développeur Lead & Concepteur',
    context: 'Projet conçu et développé dans le cadre du Vibeathon (Juillet 2026).',
    problem: 'Identification des maladies agricoles et des ravageurs sur les cultures végétales.',
    solution: 'Plateforme de détection prédictive par intelligence artificielle couplée à un système d\'alerte communautaire pour les exploitants agricoles.',
    features: [
      'Analyse visuelle pour diagnostic des pathologies végétales',
      'Système d\'alerte communautaire',
      'Backend développé avec Django',
      'Base de données PostgreSQL'
    ],
    technologies: ['Django', 'PostgreSQL', 'Python', 'Intelligence Artificielle', 'React'],
    accentColor: '#12523A',
    statusBadge: 'Vibeathon 2026',
    mockupType: 'browser'
  },
  {
    id: 'horizon-tracking',
    title: 'Horizon Tracking',
    tagline: 'Gestion de flotte & vidéosurveillance professionnelle en Côte d\'Ivoire',
    category: 'web',
    categoryLabel: 'Télématique & GPS',
    year: '2026',
    url: 'https://azizcompaore.github.io/horizon-tracking-site/',
    screenshot: '/assets/portfolio/horizon-tracking.png',
    role: 'Développeur Full-Stack',
    context: 'Plateforme de géolocalisation GPS en temps réel et télématique.',
    problem: 'Supervision des flottes de véhicules et gestion de la sécurité des parcs.',
    solution: 'Plateforme de gestion de flotte intelligente, géolocalisation en temps réel et vidéosurveillance à Abidjan.',
    features: [
      'Géolocalisation GPS en temps réel',
      'Gestion intelligente de flotte automobile',
      'Télématique et suivi de véhicules',
      'Vidéosurveillance professionnelle'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Cartographie GPS'],
    accentColor: '#E65100',
    statusBadge: 'En ligne',
    mockupType: 'browser'
  },
  {
    id: 'agromarche',
    title: 'AgroMarché',
    tagline: 'Le marché direct des planteurs',
    category: 'ecommerce',
    categoryLabel: 'Agri-Commerce',
    year: '2026',
    url: 'https://azizcompaore.github.io/AgroMarche/',
    screenshot: '/assets/portfolio/agromarche.png',
    githubUrl: 'https://github.com/AzizCompaore/AgroMarche',
    role: 'Développeur Frontend',
    context: 'Plateforme de connexion directe entre planteurs et acheteurs.',
    problem: 'Faciliter la commercialisation directe des récoltes agricoles.',
    solution: 'Marché en ligne direct connectant les récoltes et stocks des planteurs aux acheteurs.',
    features: [
      'Affichage des cours et cotations officielles',
      'Publication directe des stocks par les planteurs',
      'Mise en relation acheteurs et producteurs agricoles',
      'Catalogue de produits du terroir ivoirien'
    ],
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    accentColor: '#2E7D32',
    statusBadge: 'En ligne',
    mockupType: 'browser'
  },
  {
    id: 'konekt',
    title: 'KONEKT',
    tagline: 'Le réseau qui nous unit — Mobilité urbaine & Métro d\'Abidjan',
    category: 'web',
    categoryLabel: 'Mobilité Urbaine',
    year: '2026',
    url: 'https://azizcompaore.github.io/konekt/',
    screenshot: '/assets/portfolio/konekt.png',
    githubUrl: 'https://github.com/AzizCompaore/konekt',
    role: 'Développeur Frontend',
    context: 'Projet dédié à la mobilité et aux 37 km de la Ligne 1 du Métro d\'Abidjan (Anyama ↔ Aéroport).',
    problem: 'Information voyageurs et fluidification des déplacements urbains.',
    solution: 'Plateforme interactive présentant le tracé de la Ligne 1, les gares du parcours, la tarification par zone et les prochains départs.',
    features: [
      'Tracé complet de la Ligne 1 (Anyama à l\'Aéroport)',
      'Présentation des gares du parcours',
      'Tarification calculée selon les zones traversées',
      'Aperçu de l\'interface de réservation'
    ],
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    accentColor: '#0284C7',
    statusBadge: 'En ligne',
    mockupType: 'browser'
  },
  {
    id: 'immo-diaspo-rentier',
    title: 'IMMO DIASPO INVEST',
    tagline: 'Investissement locatif en Côte d\'Ivoire pour la diaspora — URIEL GROUP',
    category: 'proptech',
    categoryLabel: 'FinTech & Immobilier',
    year: '2026',
    url: 'https://immodiaspoinvest.urielgroup.fr/',
    screenshot: '/assets/portfolio/immo-diaspo-invest.png',
    role: 'Développeur Web',
    context: 'Projet réalisé pour URIEL GROUP Afrique pour la diaspora.',
    problem: 'Vérifier l\'éligibilité à une solution de financement pour investir dans l\'immobilier en Côte d\'Ivoire depuis l\'étranger.',
    solution: 'Plateforme d\'évaluation d\'éligibilité et de présentation des solutions de financement adaptées pour construire un patrimoine locatif.',
    features: [
      'Vérification en ligne d\'éligibilité au financement',
      'Parcours adapté selon le pays de résidence de la diaspora',
      'Présentation des programmes immobiliers locatifs',
      'Intégration vidéo et prise de contact'
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    accentColor: '#D4AF37',
    statusBadge: 'En ligne',
    mockupType: 'browser'
  },
  {
    id: 'deep-digital',
    title: 'Deep Digital',
    tagline: 'Studio de personnalisation textile à Abidjan',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Textile',
    year: '2026',
    url: 'https://azizcompaore.github.io/deep-digital/',
    screenshot: '/assets/portfolio/deep-digital.png',
    role: 'Développeur Full-Stack',
    context: 'Studio digital de personnalisation textile basé à Abidjan.',
    problem: 'Personnaliser facilement ses vêtements et supports textiles avec aperçu réel avant impression.',
    solution: 'Studio interactif permettant de choisir un support vierge, de composer son visuel et de visualiser sa création en direct.',
    features: [
      'Catalogue de supports personnalisables',
      'Studio de composition et d\'ajustement de visuels',
      'Visualisation de la création en aperçu réel',
      'Demande de personnalisation et commande en ligne'
    ],
    technologies: ['React', 'JavaScript', 'CSS3', 'Tailwind CSS'],
    accentColor: '#4F46E5',
    statusBadge: 'En ligne',
    mockupType: 'browser'
  },
  {
    id: 'marketplace',
    title: 'G-Marketplace',
    tagline: 'Plateforme E-Commerce Multi-Vendeurs avec tarification dégressive',
    category: 'ecommerce',
    categoryLabel: 'Marketplace',
    year: '2026',
    url: 'https://azizcompaore.github.io/Marketplace/',
    screenshot: '/assets/portfolio/g-marketplace.png',
    githubUrl: 'https://github.com/AzizCompaore/Marketplace',
    role: 'Développeur Frontend',
    context: 'Plateforme de commerce électronique multi-vendeurs.',
    problem: 'Regrouper plusieurs univers marchands avec gestion des commandes au détail et en gros.',
    solution: 'Plateforme multi-vendeurs avec moteur de recherche centralisé, tarification dégressive grossiste et univers dédiés.',
    features: [
      'Moteur de recherche centralisé multi-produits',
      'Espaces spécialisés : Shopping, Supermarché, Galerie, Business',
      'Système de tarification dégressive pour les grossistes',
      'Panier et navigation par rayons'
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    accentColor: '#059669',
    statusBadge: 'En ligne',
    mockupType: 'browser'
  },
  {
    id: 'noema',
    title: 'Résidence NOEMA',
    tagline: 'Appartements T2 et T3 à Angré Djorogobité, Abidjan — URIEL GROUP',
    category: 'proptech',
    categoryLabel: 'Immobilier',
    year: '2026',
    url: 'https://laresidencenoema.com/',
    screenshot: '/assets/portfolio/residence-noema.png',
    role: 'Développeur Web',
    context: 'Site vitrine officiel du programme immobilier Résidence NOEMA par URIEL GROUP Afrique.',
    problem: 'Présentation claire des appartements neufs, des plans et des financements pour les futurs acquéreurs.',
    solution: 'Site vitrine présentant le programme résidentiel à Angré Djorogobité avec plans, disponibilités et simulation de financement.',
    features: [
      'Présentation des appartements T2 et T3',
      'Consultation des plans et disponibilités',
      'Outil de simulation de financement',
      'Formulaire de contact direct avec URIEL GROUP'
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    accentColor: '#B45309',
    statusBadge: 'En ligne (laresidencenoema.com)',
    mockupType: 'browser'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'google-build-with-ai',
    title: 'Google Build with AI',
    role: 'Vainqueur du Hackathon',
    date: 'Avril 2026',
    badge: 'Vainqueur',
    organization: 'Google Build with AI',
    summary: 'Vainqueur du hackathon Google Build with AI après avoir conçu et présenté un prototype fonctionnel innovant exploitant les technologies IA de Google.',
    highlights: [
      'Développement d\'une solution innovante utilisant les technologies IA de Google',
      'Travail collaboratif en équipe',
      'Conception, développement et présentation d\'un prototype fonctionnel',
      'Intégration d\'API d\'intelligence artificielle et traitement de données'
    ],
    technologies: ['Google Gemini API', 'Python', 'Intelligence Artificielle']
  },
  {
    id: 'vibeathon-agrivigil',
    title: 'Vibeathon',
    role: 'Développeur Lead & Concepteur du projet Agrivigil',
    date: 'Juillet 2026',
    badge: 'Lead Développeur',
    organization: 'Vibeathon',
    summary: 'Concepteur et développeur lead de la plateforme AgriVigil lors du hackathon Vibeathon.',
    highlights: [
      'Architecture d\'une plateforme de détection prédictive des maladies agricoles par IA',
      'Conception d\'un système d\'alerte communautaire',
      'Développement du backend avec Django',
      'Utilisation et modélisation de base de données PostgreSQL'
    ],
    technologies: ['Django', 'PostgreSQL', 'Python', 'IA Prédictive', 'React']
  }
];

export const TECH_CATEGORIES: SkillCategory[] = [
  {
    id: 'software',
    title: 'Développement Logiciel',
    subtitle: 'Conception d\'applications, POO et interfaces web modernes',
    skills: [
      { name: 'Python', level: 'Avancé', context: 'Programmation orientée objet (POO)' },
      { name: 'Django', level: 'Production', context: 'Backend et architecture logicielle (Agrivigil)' },
      { name: 'JavaScript, HTML5 & CSS3', level: 'Avancé', context: 'Développement frontend et intégration web' },
      { name: 'React', level: 'Production', context: 'Applications interactives et composants modulaires' },
      { name: 'Java', level: 'Opérationnel', context: 'Programmation orientée objet et structures' },
      { name: 'PHP & Bases de Laravel', level: 'Bases', context: 'Bases du framework et architecture MVC' },
      { name: 'Expo', level: 'Opérationnel', context: 'Applications mobiles' }
    ]
  },
  {
    id: 'ai',
    title: 'Intelligence Artificielle',
    subtitle: 'Intégration de modèles de langage et vision',
    skills: [
      { name: 'Large Language Models (LLM)', level: 'Production', context: 'Intégration et exploitation de modèles' },
      { name: 'Google Gemini', level: 'Production', context: 'Intégration d\'API d\'IA Google (Vainqueur Build with AI)' },
      { name: 'OpenAI API', level: 'Opérationnel', context: 'Intégration d\'API d\'intelligence artificielle' },
      { name: 'Machine Learning', level: 'Opérationnel', context: 'Concepts et applications prédictives' }
    ]
  },
  {
    id: 'data',
    title: 'Data & Bases de Données',
    subtitle: 'Modélisation relationnelle et manipulation de données',
    skills: [
      { name: 'SQL', level: 'Avancé', context: 'Requêtes, schémas et modélisation' },
      { name: 'PostgreSQL', level: 'Production', context: 'Base de données relationnelle en production (Vibeathon)' },
      { name: 'SQL Server', level: 'Opérationnel', context: 'Systèmes de gestion de bases de données' },
      { name: 'Oracle Database 21c', level: 'Opérationnel', context: 'Bases de données relationnelles' },
      { name: 'Python Data Stack (Pandas, NumPy, Matplotlib)', level: 'Opérationnel', context: 'Traitement et visualisation de données' },
      { name: 'Bases de Power BI', level: 'Bases', context: 'Tableaux de bord et reporting' }
    ]
  },
  {
    id: 'tools',
    title: 'Environnements & Outils',
    subtitle: 'Gestion de code, systèmes et réseaux',
    skills: [
      { name: 'Git & GitHub', level: 'Avancé', context: 'Gestion de versions et hébergement de projets' },
      { name: 'Réseaux : TCP/IP, DHCP & DNS', level: 'Opérationnel', context: 'Fondamentaux des protocoles réseau' },
      { name: 'Windows Server', level: 'Bases', context: 'Connaissances de base système' },
      { name: 'Microsoft Word & Excel', level: 'Avancé', context: 'Bureautique et documentation technique' }
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership & Conduite de Projet',
    subtitle: 'Encadrement, hackathons et dynamique d\'équipe',
    skills: [
      { name: 'Coordination d\'équipes', level: 'Avancé', context: 'Travail collaboratif et répartition des tâches' },
      { name: 'Gestion de projets', level: 'Opérationnel', context: 'Planification, prototypage et livrables' },
      { name: 'Groupes académiques & Hackathons', level: 'Avancé', context: 'Participation et encadrement à Agitel Formation' }
    ]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'Université Agitel Formation, Abidjan',
    degree: 'Licence 3 Informatique',
    period: '2026',
    location: 'Abidjan, Côte d\'Ivoire',
    details: [
      'Étudiant en Licence 3 Informatique.',
      'Formation en développement logiciel, intelligence artificielle, bases de données et réseaux.',
      'Participation et encadrement de groupes académiques et hackathons.'
    ]
  },
  {
    institution: 'Collège André Malraux',
    degree: 'Baccalauréat',
    period: '2023',
    location: 'Côte d\'Ivoire',
    details: [
      'Baccalauréat obtenu en 2023.'
    ]
  }
];
