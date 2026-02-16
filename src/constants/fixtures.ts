import { CharacteristicType } from '$/types'
import placeholderImages from '@/utils/placeholderImages'
import { logoGithub } from 'ionicons/icons'

export const addressFixtures = {
  1: {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    street_address: '123 Main Street',
    extended_address: 'Apt 4B',
    locality: 'New York',
    region: 'NY',
    postal_code: 10001,
    country_code: 'US',
    phone: '5551234567',
    prefix: '+1',
  },
  2: {
    id: 2,
    first_name: 'Marie',
    last_name: 'Curie',
    street_address: '456 Rue de la République',
    extended_address: '',
    locality: 'Paris',
    region: 'Île-de-France',
    postal_code: 75001,
    country_code: 'FR',
    phone: '0145678901',
    prefix: '+33',
  },
}

export const userFixtures = {
  1: {
    id: 1,
    first_name: 'Aldin',
    last_name: 'Music',
    email: 'email@email.com',
    phone: '0101010101',
    prefix: '+33',
    token: 'ABSOLUTELY_HASHED_TOKEN',
  },
}

export const categoryFixtures = {
  1: {
    id: 1,
    image: placeholderImages(['SOC Services']),
    name: {
      en: 'SOC Services',
      fr: 'Services SOC',
    },
    description: {
      en: 'Security Operations Center services for continuous monitoring and incident response.',
      fr: 'Services de centre des opérations de sécurité pour une surveillance continue et une réponse aux incidents.',
    },
    index: 1,
  },
  2: {
    id: 2,
    image: placeholderImages(['EDR Services']),
    name: {
      en: 'EDR Services',
      fr: 'Services EDR',
    },
    description: {
      en: 'Endpoint Detection and Response solutions to protect and monitor endpoints.',
      fr: 'Solutions de détection et de réponse sur les terminaux pour protéger et surveiller les postes.',
    },
    index: 2,
  },
  3: {
    id: 3,
    image: placeholderImages(['XDR Services']),
    name: {
      en: 'XDR Services',
      fr: 'Services XDR',
    },
    description: {
      en: 'Extended Detection and Response services integrating multiple security layers.',
      fr: 'Services de détection et de réponse étendues intégrant plusieurs couches de sécurité.',
    },
    index: 3,
  },
}

export const characteristicFixtures = {
  1: {
    id: 1,
    name: { en: 'High Performance', fr: 'Haute performance' },
    type: CharacteristicType.performance,
  },
  2: {
    id: 2,
    name: { en: 'Optimized', fr: 'Optimisé' },
    type: CharacteristicType.performance,
  },
  3: {
    id: 3,
    name: { en: 'Low Latency', fr: 'Faible latence' },
    type: CharacteristicType.performance,
  },
  4: {
    id: 4,
    name: { en: 'Highly Scalable', fr: 'Haute scalabilité' },
    type: CharacteristicType.scalability,
  },
  5: {
    id: 5,
    name: { en: 'Cloud Ready', fr: 'Prêt pour le cloud' },
    type: CharacteristicType.scalability,
  },
  6: {
    id: 6,
    name: { en: 'Multi-Tenant', fr: 'Multi-locataire' },
    type: CharacteristicType.scalability,
  },
  7: {
    id: 7,
    name: { en: 'Enterprise Level', fr: 'Niveau entreprise' },
    type: CharacteristicType.level,
  },
  8: {
    id: 8,
    name: { en: 'SMB Level', fr: 'Niveau PME' },
    type: CharacteristicType.level,
  },
  9: {
    id: 9,
    name: { en: 'Basic Level', fr: 'Niveau de base' },
    type: CharacteristicType.level,
  },
}

export const socialFixtures = {
  1: {
    id: 1,
    logo: logoGithub,
    link: 'https://github.com/kpoptrashBlaenk',
  },
}

export const homeTextFixtures = {
  1: {
    id: 1,
    text: {
      en: 'Cyna is a pure player in cybersecurity for SMEs and MSPs. Quality of service is at the heart of our business, where we prioritize expertise, proximity, and speed of execution.',
      fr: "Cyna est un acteur pur de la cybersécurité pour les PME et les MSP. La qualité de service est au cœur de notre activité, où nous privilégions l'expertise, la proximité et la rapidité d'exécution.",
    },
  },
}

export const paymentMethodFixtures = {
  1: {
    id: 1,
    name: 'John Doe',
    last4: '**** **** **** 4242',
    expiration: '12/28',
  },
  2: {
    id: 2,
    name: 'Marie Curie',
    last4: '**** **** **** 4444',
    expiration: '07/27',
  },
}

export const promotionFixtures = {
  6: {
    id: 6,
    image: placeholderImages(['dfm']),
    title: {
      en: "Integration of Cyna's 24/7 SOC Solution",
      fr: 'Intégration de la solution SOC 24/7 de Cyna',
    },
    subtitle: {
      en: 'IT Services and Consulting',
      fr: 'Services et conseil en informatique',
    },
    button: {
      en: 'Read the article',
      fr: "Lire l'article",
    },
    link: '/something',
    index: 0,
  },
  1: {
    id: 1,
    image: placeholderImages(['hopital st camille']),
    title: {
      en: 'Implementation of a Managed SOC',
      fr: "Mise en place d'un SOC Managé",
    },
    subtitle: {
      en: 'Hospital Center',
      fr: 'Centre hospitalier',
    },
    button: {
      en: 'Read the article',
      fr: "Lire l'article",
    },
    link: '/something',
    index: 1,
  },
  2: {
    id: 2,
    image: placeholderImages(['groupe abcd']),
    title: {
      en: 'Cyberattack Incident Response',
      fr: "Réponse à incident d'une cyberattaque",
    },
    subtitle: {
      en: 'Gammist Manufacturer',
      fr: 'Fabricant gammiste',
    },
    button: {
      en: 'Read the article',
      fr: "Lire l'article",
    },
    link: '/something',
    index: 2,
  },
  3: {
    id: 3,
    image: placeholderImages(['sincrone-it-logo']),
    title: {
      en: 'Complete Cybersecurity Supported by 24/7 SOC',
      fr: 'Une cybersécurité complète, portée par le SOC 24/7',
    },
    subtitle: {
      en: 'IT and Telecom Solutions',
      fr: 'Solutions informatiques et télécoms',
    },
    button: {
      en: 'Read the article',
      fr: "Lire l'article",
    },
    link: '/something',
    index: 3,
  },
  4: {
    id: 4,
    image: placeholderImages(['logo-actuelburo']),
    title: {
      en: "Integration of Cyna's 24/7 SOC Offering",
      fr: "Intégration de l'offre SOC 24/7 de Cyna",
    },
    subtitle: {
      en: 'IT Services and Consulting',
      fr: 'Services et conseil en informatique',
    },
    button: {
      en: 'Read the article',
      fr: "Lire l'article",
    },
    link: '/something',
    index: 4,
  },
  5: {
    id: 5,
    image: placeholderImages(['neobrain-1']),
    title: {
      en: 'Simulation of an Attack (Black & Grey Box)',
      fr: "Simulation d'une attaque (Black & Grey Box)",
    },
    subtitle: {
      en: 'Software Publisher',
      fr: 'Éditeur de logiciels',
    },
    button: {
      en: 'Read the article',
      fr: "Lire l'article",
    },
    link: '/something',
    index: 5,
  },
}

export const productsFixtures = {
  1: {
    id: 1,
    category: categoryFixtures[1],
    image: placeholderImages(['Cyna SOC', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna SOC', fr: 'Cyna SOC' },
    top: true,
    priority: false,
    price: 120,
    disponible: true,
    index: 1,
    created_at: '2023-05-12T10:15:00Z',
    description_functionality: {
      en: 'Real-time monitoring and incident response for enterprise networks.',
      fr: 'Surveillance en temps réel et réponse aux incidents pour les réseaux d’entreprise.',
    },
    description_advantage: {
      en: 'Reduces risk and ensures compliance with security standards.',
      fr: 'Réduit les risques et assure la conformité avec les standards de sécurité.',
    },
    description_security: {
      en: 'SOC solution with advanced threat detection and 24/7 monitoring.',
      fr: 'Solution SOC avec détection avancée des menaces et surveillance 24/7.',
    },
    characteristics_performance: [characteristicFixtures[1], characteristicFixtures[2]],
    characteristics_scalability: [characteristicFixtures[6]],
    characteristics_level: [characteristicFixtures[7]],
  },
  2: {
    id: 2,
    category: categoryFixtures[1],
    image: placeholderImages(['Cyna SOC Advanced', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna SOC Advanced', fr: 'Cyna SOC Avancé' },
    top: false,
    priority: false,
    price: 200,
    disponible: true,
    index: 2,
    created_at: '2023-11-02T14:45:00Z',
    description_functionality: {
      en: 'Advanced SOC platform with AI-driven threat analysis.',
      fr: 'Plateforme SOC avancée avec analyse des menaces pilotée par IA.',
    },
    description_advantage: {
      en: 'Enhanced automation and faster incident response.',
      fr: 'Automatisation améliorée et réponse aux incidents plus rapide.',
    },
    description_security: {
      en: 'Includes SOC 24/7 monitoring, automated alerts, and detailed reporting.',
      fr: 'Inclut la surveillance SOC 24/7, alertes automatiques et rapports détaillés.',
    },
    characteristics_performance: [characteristicFixtures[2], characteristicFixtures[3]],
    characteristics_scalability: [characteristicFixtures[4], characteristicFixtures[5]],
    characteristics_level: [characteristicFixtures[8]],
  },
  3: {
    id: 3,
    category: categoryFixtures[2],
    image: placeholderImages(['Cyna EDR', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna EDR', fr: 'Cyna EDR' },
    top: true,
    priority: true,
    price: 150,
    disponible: true,
    index: 3,
    created_at: '2024-03-18T09:30:00Z',
    description_functionality: {
      en: 'Endpoint detection and response for multi-device environments.',
      fr: 'Détection et réponse aux incidents sur les terminaux multi-appareils.',
    },
    description_advantage: {
      en: 'Improves endpoint security and reduces breach risks.',
      fr: 'Améliore la sécurité des terminaux et réduit les risques de violation.',
    },
    description_security: {
      en: 'EDR solution with AI-based threat hunting and alerting.',
      fr: "Solution EDR avec chasse aux menaces et alertes basées sur l'IA.",
    },
    characteristics_performance: [characteristicFixtures[1], characteristicFixtures[3]],
    characteristics_scalability: [characteristicFixtures[5]],
    characteristics_level: [characteristicFixtures[7]],
  },
  4: {
    id: 4,
    category: categoryFixtures[3],
    image: placeholderImages(['Cyna XDR', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna XDR', fr: 'Cyna XDR' },
    top: true,
    priority: true,
    price: 250,
    disponible: false,
    index: 4,
    created_at: '2024-07-01T16:20:00Z',
    description_functionality: {
      en: 'Extended detection and response integrating multiple security layers.',
      fr: 'Détection et réponse étendues intégrant plusieurs couches de sécurité.',
    },
    description_advantage: {
      en: 'Centralized threat management across networks, endpoints, and cloud.',
      fr: 'Gestion centralisée des menaces sur les réseaux, terminaux et cloud.',
    },
    description_security: {
      en: 'XDR platform with unified monitoring and proactive threat mitigation.',
      fr: 'Plateforme XDR avec surveillance unifiée et atténuation proactive des menaces.',
    },
    characteristics_performance: [characteristicFixtures[2], characteristicFixtures[3]],
    characteristics_scalability: [characteristicFixtures[5], characteristicFixtures[6]],
    characteristics_level: [characteristicFixtures[8]],
  },
  5: {
    id: 5,
    category: categoryFixtures[1],
    image: placeholderImages(['Cyna SOC Pro', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna SOC Pro', fr: 'Cyna SOC Pro' },
    top: false,
    priority: true,
    price: 180,
    disponible: true,
    index: 5,
    created_at: '2024-01-12T11:00:00Z',
    description_functionality: {
      en: 'SOC with compliance reporting and alerting automation.',
      fr: 'SOC avec rapports de conformité et automatisation des alertes.',
    },
    description_advantage: {
      en: 'Reduces manual monitoring and improves response times.',
      fr: 'Réduit la surveillance manuelle et améliore les temps de réponse.',
    },
    description_security: {
      en: 'AI-driven SOC with real-time dashboards and incident logs.',
      fr: 'SOC piloté par IA avec tableaux de bord en temps réel et journaux d’incidents.',
    },
    characteristics_performance: [characteristicFixtures[3], characteristicFixtures[4]],
    characteristics_scalability: [characteristicFixtures[1], characteristicFixtures[2]],
    characteristics_level: [characteristicFixtures[9]],
  },
  6: {
    id: 6,
    category: categoryFixtures[2],
    image: placeholderImages(['Cyna EDR Pro', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna EDR Pro', fr: 'Cyna EDR Pro' },
    top: false,
    priority: false,
    price: 170,
    disponible: true,
    index: 6,
    created_at: '2024-02-25T13:30:00Z',
    description_functionality: {
      en: 'Enhanced EDR with cloud telemetry and automated remediation.',
      fr: 'EDR amélioré avec télémétrie cloud et remédiation automatisée.',
    },
    description_advantage: {
      en: 'Faster endpoint threat neutralization and reporting.',
      fr: 'Neutralisation et rapport des menaces plus rapide sur les terminaux.',
    },
    description_security: {
      en: 'Includes sandboxing, AI threat detection, and live alerts.',
      fr: 'Inclut sandboxing, détection des menaces par IA et alertes en direct.',
    },
    characteristics_performance: [characteristicFixtures[5], characteristicFixtures[6]],
    characteristics_scalability: [characteristicFixtures[3], characteristicFixtures[4]],
    characteristics_level: [characteristicFixtures[7]],
  },
  7: {
    id: 7,
    category: categoryFixtures[3],
    image: placeholderImages(['Cyna XDR Pro', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna XDR Pro', fr: 'Cyna XDR Pro' },
    top: true,
    priority: true,
    price: 300,
    disponible: true,
    index: 7,
    created_at: '2024-05-10T08:45:00Z',
    description_functionality: {
      en: 'Comprehensive XDR platform for multi-cloud environments.',
      fr: 'Plateforme XDR complète pour environnements multi-cloud.',
    },
    description_advantage: {
      en: 'Simplifies enterprise security and centralizes monitoring.',
      fr: 'Simplifie la sécurité de l’entreprise et centralise la surveillance.',
    },
    description_security: {
      en: 'Supports multi-layer detection, incident response, and analytics.',
      fr: 'Prend en charge la détection multi-couche, la réponse aux incidents et l’analyse.',
    },
    characteristics_performance: [characteristicFixtures[7], characteristicFixtures[8]],
    characteristics_scalability: [characteristicFixtures[6], characteristicFixtures[7]],
    characteristics_level: [characteristicFixtures[9]],
  },
  8: {
    id: 8,
    category: categoryFixtures[1],
    image: placeholderImages(['Cyna SOC Lite', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna SOC Lite', fr: 'Cyna SOC Lite' },
    top: false,
    priority: false,
    price: 90,
    disponible: true,
    index: 8,
    created_at: '2024-06-15T09:10:00Z',
    description_functionality: {
      en: 'Light SOC with basic monitoring and alerting.',
      fr: 'SOC léger avec surveillance et alertes de base.',
    },
    description_advantage: {
      en: 'Affordable entry-level SOC for small teams.',
      fr: 'SOC d’entrée de gamme abordable pour petites équipes.',
    },
    description_security: {
      en: 'Basic logs and alerts with simple dashboard.',
      fr: 'Journaux et alertes basiques avec tableau de bord simple.',
    },
    characteristics_performance: [characteristicFixtures[1], characteristicFixtures[2]],
    characteristics_scalability: [characteristicFixtures[1]],
    characteristics_level: [characteristicFixtures[6]],
  },
  9: {
    id: 9,
    category: categoryFixtures[2],
    image: placeholderImages(['Cyna EDR Lite', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna EDR Lite', fr: 'Cyna EDR Lite' },
    top: false,
    priority: false,
    price: 110,
    disponible: true,
    index: 9,
    created_at: '2024-07-20T14:00:00Z',
    description_functionality: {
      en: 'Light EDR solution for small networks.',
      fr: 'Solution EDR légère pour petits réseaux.',
    },
    description_advantage: {
      en: 'Simple deployment with basic endpoint protection.',
      fr: 'Déploiement simple avec protection basique des terminaux.',
    },
    description_security: {
      en: 'Minimal AI-based detection and alerting.',
      fr: 'Détection et alertes basiques basées sur l’IA.',
    },
    characteristics_performance: [characteristicFixtures[1], characteristicFixtures[3]],
    characteristics_scalability: [characteristicFixtures[2], characteristicFixtures[3]],
    characteristics_level: [characteristicFixtures[6]],
  },
  10: {
    id: 10,
    category: categoryFixtures[3],
    image: placeholderImages(['Cyna XDR Lite', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna XDR Lite', fr: 'Cyna XDR Lite' },
    top: false,
    priority: false,
    price: 200,
    disponible: false,
    index: 10,
    created_at: '2024-08-01T12:30:00Z',
    description_functionality: {
      en: 'Simplified XDR for SMBs with essential monitoring.',
      fr: 'XDR simplifié pour PME avec surveillance essentielle.',
    },
    description_advantage: {
      en: 'Cost-effective solution with basic alerts.',
      fr: 'Solution économique avec alertes de base.',
    },
    description_security: {
      en: 'Core XDR functions without advanced analytics.',
      fr: 'Fonctions XDR de base sans analyse avancée.',
    },
    characteristics_performance: [characteristicFixtures[4], characteristicFixtures[5]],
    characteristics_scalability: [characteristicFixtures[5], characteristicFixtures[6]],
    characteristics_level: [characteristicFixtures[7]],
  },
  11: {
    id: 11,
    category: categoryFixtures[1],
    image: placeholderImages(['Cyna SOC Enterprise', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna SOC Enterprise', fr: 'Cyna SOC Enterprise' },
    top: true,
    priority: true,
    price: 350,
    disponible: true,
    index: 11,
    created_at: '2024-09-10T15:20:00Z',
    description_functionality: {
      en: 'Enterprise SOC with advanced compliance and monitoring.',
      fr: 'SOC d’entreprise avec conformité avancée et surveillance.',
    },
    description_advantage: {
      en: 'Full automation and SLA-backed incident response.',
      fr: 'Automatisation complète et réponse aux incidents SLA.',
    },
    description_security: {
      en: 'Full SOC suite with AI, dashboards, and alerts.',
      fr: 'Suite complète SOC avec IA, tableaux de bord et alertes.',
    },
    characteristics_performance: [characteristicFixtures[6], characteristicFixtures[7]],
    characteristics_scalability: [characteristicFixtures[6], characteristicFixtures[7]],
    characteristics_level: [characteristicFixtures[9]],
  },
  12: {
    id: 12,
    category: categoryFixtures[2],
    image: placeholderImages(['Cyna EDR Enterprise', '1', '2', '3', '4', '5', '6']),
    name: { en: 'Cyna EDR Enterprise', fr: 'Cyna EDR Enterprise' },
    top: true,
    priority: true,
    price: 300,
    disponible: true,
    index: 12,
    created_at: '2024-10-05T10:10:00Z',
    description_functionality: {
      en: 'Enterprise-grade EDR for multi-device environments.',
      fr: 'EDR de niveau entreprise pour environnements multi-appareils.',
    },
    description_advantage: {
      en: 'Centralized monitoring, AI detection, and automated remediation.',
      fr: 'Surveillance centralisée, détection par IA et remédiation automatisée.',
    },
    description_security: {
      en: 'Advanced EDR with analytics, threat hunting, and alerts.',
      fr: 'EDR avancé avec analyse, chasse aux menaces et alertes.',
    },
    characteristics_performance: [characteristicFixtures[7], characteristicFixtures[8]],
    characteristics_scalability: [characteristicFixtures[7], characteristicFixtures[8]],
    characteristics_level: [characteristicFixtures[9]],
  },
}
