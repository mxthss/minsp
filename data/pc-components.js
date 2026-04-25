/**
 * Données des composants PC
 * 8 sections : Case, GPU, CPU, RAM, Motherboard, Cooler, Storage, PSU, Fan
 */
(function () {
  const pcComponentGroups = [
    {
      brand: "DeepCool",
      segment: "Boîtier PC",
      category: "case",
      items: [
        "DeepCool CG530 4F"
      ]
    },
    {
      brand: "Gigabyte / Aorus",
      segment: "Carte graphique",
      category: "gpu",
      items: [
        "Aorus GeForce RTX 5090 Master"
      ]
    },
    {
      brand: "AMD",
      segment: "Processeur",
      category: "cpu",
      items: [
        "AMD Ryzen 7 9800X3D"
      ]
    },
    {
      brand: "Patriot",
      segment: "Mémoire RAM",
      category: "ram",
      items: [
        "Patriot Viper Venom"
      ]
    },
    {
      brand: "Gigabyte / Aorus",
      segment: "Carte mère",
      category: "motherboard",
      items: [
        "Aorus B850 Elite WiFi 7"
      ]
    },
    {
      brand: "Arctic",
      segment: "Refroidissement",
      category: "cooler",
      items: [
        "Arctic Liquid Freezer III"
      ]
    },
    {
      brand: "Samsung",
      segment: "Stockage SSD",
      category: "storage",
      items: [
        "Samsung 990 Pro"
      ]
    },
    {
      brand: "Lian Li",
      segment: "Alimentation",
      category: "psu",
      items: [
        "Lian Li Edge 1200W"
      ]
    },
    {
      brand: "Asia Horse",
      segment: "Ventilateurs",
      category: "fan",
      items: [
        "Asia Horse Down Pro"
      ]
    }
  ];

  // Entrées détaillées pour chaque composant
  const pcComponentEntries = {
    "DeepCool CG530 4F": {
      image: "./assets/pc-components/deepcool-cg530-4f.webp",
      summary: "Le DeepCool CG530 4F est un boîtier mid-tower au format compact, conçu pour les builds gaming moderne. Avec son design épuré, son excellent flux d'air et ses 4 ventilateurs ARGB préinstallés, il offre un excellent rapport qualité-prix pour les configurations Gaming.",
      highlights: [
        "Format mid-tower compact",
        "4 ventilateurs ARGB 120mm préinstallés",
        "Excellent flux d'air (maillage frontal)",
        "Support watercooling jusqu'à 360mm",
        "Panneau latéral en verre trempé",
        "Gestion des câbles optimisée"
      ],
      specs: [
        { label: "Type", value: "Boîtier PC" },
        { label: "Format", value: "Mid-Tower" },
        { label: "Dimensions", value: "Compact" },
        { label: "Ventilateurs inclus", value: "4x 120mm ARGB" },
        { label: "Support radiator", value: "Jusqu'à 360mm (top/front)" },
        { label: "Carte mère", value: "ATX, Micro-ATX, Mini-ITX" },
        { label: "GPU max", value: "Jusqu'à 360mm" },
        { label: "Panneau", value: "Verre trempé latéral" },
        { label: "Couleur", value: "Noir" }
      ],
      sources: [
        {
          label: "Site officiel DeepCool",
          url: "https://www.deepcool.com/"
        }
      ]
    },

    "Aorus GeForce RTX 5090 Master": {
      image: "./assets/pc-components/rtx-5090-aorus-master.webp",
      summary: "La GeForce RTX 5090 Aorus Master est le GPU ultime de nouvelle génération, propulsée par l'architecture Blackwell de NVIDIA. Avec une puissance de calcul phénoménale, du ray tracing de nouvelle génération et le DLSS 4, elle redéfinit les standards du gaming 4K et de la création de contenu.",
      highlights: [
        "Architecture NVIDIA Blackwell nouvelle génération",
        "Mémoire GDDR7 ultra-rapide",
        "DLSS 4 avec Multi Frame Generation",
        "Système de refroidissement Windforce X3 avancé",
        "Écran LCD Edge View personnalisable",
        "Connecteur 12VHPWR 600W"
      ],
      specs: [
        { label: "Type", value: "Carte graphique" },
        { label: "GPU", value: "NVIDIA GeForce RTX 5090" },
        { label: "Architecture", value: "Blackwell" },
        { label: "Mémoire", value: "32 GB GDDR7" },
        { label: "Bus mémoire", value: "512-bit" },
        { label: "CUDA Cores", value: "21760" },
        { label: "Boost Clock", value: "Variable (extrêmement élevé)" },
        { label: "TDP", value: "575W (peut monter à 600W)" },
        { label: "Alimentation", value: "12VHPWR 16-pin" },
        { label: "Dimensions", value: "Triple slot, très longue" },
        { label: "Refroidissement", value: "Windforce X3 avec 3 ventilateurs" },
        { label: "Technologies", value: "DLSS 4, Ray Tracing 4ème gen, Reflex" }
      ],
      sources: [
        {
          label: "Fiche officielle Aorus",
          url: "https://www.gigabyte.com/Graphics-Card"
        }
      ]
    },

    "AMD Ryzen 7 9800X3D": {
      image: "./assets/pc-components/ryzen-7-9800x3d.webp",
      summary: "Le Ryzen 7 9800X3D est le processeur gaming ultime d'AMD, équipé de la technologie 3D V-Cache de deuxième génération. Avec 8 cœurs Zen 5 et un cache L3 massif de 96 Mo, il offre des performances gaming inégalées tout en maintenant une excellente efficacité énergétique.",
      highlights: [
        "Technologie AMD 3D V-Cache 2ème gen (96 Mo L3)",
        "Architecture Zen 5 avancée",
        "8 cœurs / 16 threads haute performance",
        "Frequences boost élevées pour le gaming",
        "Efficacité énergétique optimisée",
        "Socket AM5 pour platforme moderne"
      ],
      specs: [
        { label: "Type", value: "Processeur" },
        { label: "Modèle", value: "AMD Ryzen 7 9800X3D" },
        { label: "Architecture", value: "Zen 5 avec 3D V-Cache" },
        { label: "Cœurs / Threads", value: "8 / 16" },
        { label: "Cache L3 total", value: "96 Mo (3D V-Cache)" },
        { label: "Fréquence base", value: "4.7 GHz" },
        { label: "Fréquence boost", value: "Jusqu'à 5.2 GHz" },
        { label: "TDP", value: "120W" },
        { label: "Socket", value: "AM5" },
        { label: "Mémoire support", value: "DDR5 jusqu'à 5600 MHz" },
        { label: "PCIe", value: "PCIe 5.0" },
        { label: "Graphique intégré", value: "AMD Radeon (basique)" }
      ],
      sources: [
        {
          label: "Fiche officielle AMD",
          url: "https://www.amd.com/en/products/processors/desktops/ryzen"
        }
      ]
    },

    "Patriot Viper Venom": {
      image: "./assets/pc-components/patriot-viper-venom.webp",
      summary: "Les Patriot Viper Venom sont des barrettes DDR5 haute performance conçues pour les gamers et les créateurs de contenu. Avec des fréquences élevées et des profils XMP/EXPO pour overclocking simplifié, elles offrent une excellente stabilité et des performances optimales sur les plateformes Intel et AMD.",
      highlights: [
        "Mémoire DDR5 nouvelle génération",
        "Hautes fréquences pour gaming fluide",
        "Profils XMP 3.0 et EXPO pour AMD",
        "Dissipateur thermique efficace",
        "Design agressif avec RGB optionnel",
        "Compatibilité Intel et AMD"
      ],
      specs: [
        { label: "Type", value: "Mémoire RAM" },
        { label: "Standard", value: "DDR5" },
        { label: "Fréquence", value: "6000 MHz (configurable)" },
        { label: "Capacité kit", value: "2x 16 GB (32 GB total)" },
        { label: "Timings", value: "Optimisés pour performance" },
        { label: "Voltage", value: "1.35V" },
        { label: "Profils", value: "XMP 3.0 / AMD EXPO" },
        { label: "Dissipateur", value: "Aluminium haute qualité" },
        { label: "RGB", value: "Oui (selon modèle)" },
        { label: "Couleur", value: "Noir" }
      ],
      sources: [
        {
          label: "Site officiel Patriot",
          url: "https://viper.patriotmemory.com/"
        }
      ]
    },

    "Aorus B850 Elite WiFi 7": {
      image: "./assets/pc-components/b850-aorus-elite-wifi-7.webp",
      summary: "La Aorus B850 Elite WiFi 7 est une carte mère AMD Socket AM5 haut de gamme, conçue pour les processeurs Ryzen 9000. Avec son chipset B850, le WiFi 7 intégré, le PCIe 5.0 et un VRM puissant, elle offre une plateforme stable et performante pour les builds gaming et création.",
      highlights: [
        "Socket AM5 pour Ryzen 7000/9000",
        "WiFi 7 (802.11be) intégré ultra-rapide",
        "Chipset AMD B850",
        "Support PCIe 5.0 (GPU et SSD)",
        "VRM 16+2+2 phases robuste",
        "DDR5 jusqu'à 8000 MHz (OC)",
        "Design Aorus avec RGB Fusion"
      ],
      specs: [
        { label: "Type", value: "Carte mère" },
        { label: "Socket", value: "AMD AM5" },
        { label: "Chipset", value: "AMD B850" },
        { label: "Processeurs", value: "Ryzen 7000/9000 series" },
        { label: "Format", value: "ATX" },
        { label: "Slots RAM", value: "4x DDR5 (jusqu'à 256 GB)" },
        { label: "Fréquence RAM", value: "Jusqu'à 8000 MHz (OC)" },
        { label: "PCIe x16", value: "1x PCIe 5.0" },
        { label: "Slots M.2", value: "4x (dont 1x PCIe 5.0)" },
        { label: "SATA", value: "4x SATA 6Gb/s" },
        { label: "WiFi", value: "WiFi 7 802.11be" },
        { label: "Bluetooth", value: "5.4" },
        { label: "Ethernet", value: "2.5 Gigabit LAN" },
        { label: "USB", value: "USB 3.2 Gen 2x2 (20 Gbps)" },
        { label: "Audio", value: "Realtek ALC1220-VB" },
        { label: "VRM", value: "16+2+2 phases DrMOS" }
      ],
      sources: [
        {
          label: "Fiche officielle Gigabyte",
          url: "https://www.gigabyte.com/Motherboard"
        }
      ]
    },

    "Arctic Liquid Freezer III": {
      image: "./assets/pc-components/arctic-liquid-freezer-iii.webp",
      summary: "L'Arctic Liquid Freezer III est un watercooling AIO (All-In-One) de haute performance, disponible en versions 240mm, 280mm et 360mm. Avec sa pompe efficace, ses ventilateurs P12/P14 optimisés pour la pression statique et son radiateur épais, il offre un refroidissement exceptionnel pour les processeurs haut de gamme.",
      highlights: [
        "Watercooling AIO haute performance",
        "Versions 240mm, 280mm, 360mm disponibles",
        "Ventilateurs P12/P14 PWM PST optimisés",
        "Pompe efficace et silencieuse",
        "Radiateur épais pour meilleur refroidissement",
        "Compatible Intel et AMD (incl. AM5)",
        "Garantie 6 ans"
      ],
      specs: [
        { label: "Type", value: "Watercooling AIO" },
        { label: "Format", value: "360mm (3x 120mm)" },
        { label: "Plateformes", value: "Intel LGA 1700/1200/115x, AMD AM5/AM4" },
        { label: "Ventilateurs", value: "3x Arctic P12 PWM PST" },
        { label: "Vitesse ventilateurs", value: "200-1800 RPM" },
        { label: "Bruit", value: "Très silencieux" },
        { label: "Pompe", value: "Intégrée au waterblock" },
        { label: "Tubulure", value: "Tubes renforcés" },
        { label: "Refroidissement", value: "Exceptionnel pour CPU haut de gamme" },
        { label: "Garantie", value: "6 ans" }
      ],
      sources: [
        {
          label: "Site officiel Arctic",
          url: "https://www.arctic.de/"
        }
      ]
    },

    "Samsung 990 Pro": {
      image: "./assets/pc-components/samsung-990-pro.webp",
      summary: "Le Samsung 990 Pro est un SSD NVMe PCIe 4.0 haut de gamme offrant des performances exceptionnelles. Avec des vitesses de lecture/écriture séquentielles record, il est idéal pour les gamers, les créateurs de contenu et les professionnels nécessitant un stockage ultra-rapide.",
      highlights: [
        "Interface PCIe 4.0 x4 NVMe 2.0",
        "Vitesses record (lecture jusqu'à 7450 MB/s)",
        "Contrôleur Samsung Pascal avancé",
        "Mémoire V-NAND 7ème gen TLC",
        "Dissipateur thermique intégré (version avec heatsink)",
        "Gestion thermique optimisée",
        "Endurance élevée pour usage intensif"
      ],
      specs: [
        { label: "Type", value: "SSD NVMe" },
        { label: "Interface", value: "PCIe 4.0 x4 NVMe 2.0" },
        { label: "Format", value: "M.2 2280" },
        { label: "Capacités", value: "1 To / 2 To / 4 To" },
        { label: "Lecture séquentielle", value: "Jusqu'à 7450 MB/s" },
        { label: "Écriture séquentielle", value: "Jusqu'à 6900 MB/s" },
        { label: "IOPS lecture", value: "1.4M (aléatoire)" },
        { label: "IOPS écriture", value: "1.55M (aléatoire)" },
        { label: "Mémoire", value: "V-NAND 3-bit MLC (TLC)" },
        { label: "Contrôleur", value: "Samsung Pascal" },
        { label: "DRAM", value: "Cache LPDDR4" },
        { label: "Endurance", value: "Jusqu'à 2400 TBW (2 To)" },
        { label: "Garantie", value: "5 ans" }
      ],
      sources: [
        {
          label: "Fiche officielle Samsung",
          url: "https://www.samsung.com/us/computing/memory-storage/solid-state-drives/"
        }
      ]
    },

    "Lian Li Edge 1200W": {
      image: "./assets/pc-components/lian-li-edge-1200w.webp",
      summary: "L'alimentation Lian Li Edge 1200W est une unité haut de gamme certifiée 80 Plus Platinum, conçue pour alimenter les configurations les plus puissantes. Avec sa conception modulaire, ses câbles plats et son excellente efficacité énergétique, elle offre stabilité et silence pour les builds gaming et workstation.",
      highlights: [
        "Puissance 1200W pour configurations haut de gamme",
        "Certification 80 Plus Platinum (efficacité > 90%)",
        "Design entièrement modulaire",
        "Ventilateur 140mm silencieux (mode 0 RPM)",
        "Câbles plats pour gestion facile",
        "Condensateurs japonais 105°C",
        "Connecteur 12VHPWR 600W pour RTX 40/50"
      ],
      specs: [
        { label: "Type", value: "Alimentation PC (PSU)" },
        { label: "Puissance", value: "1200W" },
        { label: "Certification", value: "80 Plus Platinum" },
        { label: "Efficacité", value: "Jusqu'à 94%" },
        { label: "Format", value: "ATX" },
        { label: "Modulaire", value: "Full-modular" },
        { label: "Ventilateur", value: "140mm avec mode 0 RPM" },
        { label: "Condensateurs", value: "100% japonais 105°C" },
        { label: "Connecteurs", value: "1x 24-pin, 2x 4+4 CPU, 4x 6+2 PCIe, 1x 12VHPWR" },
        { label: "Protection", value: "OVP, UVP, OPP, SCP, OCP, OTP" },
        { label: "Dimensions", value: "150 x 86 x 160 mm" },
        { label: "Garantie", value: "10 ans" }
      ],
      sources: [
        {
          label: "Site officiel Lian Li",
          url: "https://lian-li.com/"
        }
      ]
    },

    "Asia Horse Down Pro": {
      image: "./assets/pc-components/asia-horse-down-pro.webp",
      summary: "Les ventilateurs Asia Horse Down Pro sont des fans RGB haute performance conçus pour optimiser le flux d'air dans votre boîtier PC. Avec leur design unique, leurs palettes silencieuses et leur éclairage ARGB personnalisable, ils ajoutent style et performance à votre build.",
      highlights: [
        "Design moderne avec éclairage ARGB",
        "Pales optimisées pour pression statique et flux d'air",
        "Fonctionnement silencieux",
        "Connexion chaînée (daisy chain) simplifiée",
        "Contrôle PWM pour vitesse ajustable",
        "Haute compatibilité avec boîtiers PC"
      ],
      specs: [
        { label: "Type", value: "Ventilateurs PC" },
        { label: "Format", value: "120mm" },
        { label: "Éclairage", value: "ARGB (5V 3-pin)" },
        { label: "Connexion", value: "PWM 4-pin + ARGB 3-pin" },
        { label: "Vitesse", value: "800-1800 RPM (PWM)" },
        { label: "Débit d'air", value: "Élevé pour refroidissement efficace" },
        { label: "Pression statique", value: "Optimisée pour radiateurs" },
        { label: "Niveau sonore", value: "Silencieux (< 30 dBA)" },
        { label: "Roulement", value: "Hydraulique" },
        { label: "Kit", value: "3 ventilateurs avec contrôleur" },
        { label: "Couleur", value: "Noir avec RGB" }
      ],
      sources: [
        {
          label: "Produit Asia Horse",
          url: "https://www.amazon.com/s?k=asia+horse+fans"
        }
      ]
    }
  };

  // Helper functions
  const normalize = function(str) {
    return str.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const normalizeCatalogValue = function(entry) {
    const normalized = Object.assign({}, entry);
    if (normalized.specMap && normalized.specMap.Type) {
      normalized.typeValue = normalized.specMap.Type;
      normalized.typeKey = normalize(normalized.specMap.Type);
    }
    return normalized;
  };

  // Générer PC_COMPONENT_DATA
  let orderCounter = 0;

  window.PC_COMPONENT_DATA = pcComponentGroups.flatMap(function (group) {
    return group.items.map(function (item, index) {
      const curated = pcComponentEntries[item] || {};
      const baseEntry = Object.assign({
        id: normalize(group.brand + "-" + item + "-" + index),
        order: orderCounter++,
        brand: group.brand,
        name: item,
        segment: group.segment,
        category: group.category || "pc-component",
        status: group.status || "active",
        summary: "",
        highlights: [],
        specs: [],
        sources: [],
        image: null
      }, curated);

      const searchParts = [
        baseEntry.name,
        baseEntry.brand,
        baseEntry.segment,
        baseEntry.category,
        baseEntry.summary,
        (baseEntry.highlights || []).join(" "),
        (baseEntry.specs || []).map(function(s) { return s.value; }).join(" ")
      ];

      baseEntry.searchIndex = searchParts.filter(Boolean).join(" ").toLowerCase();

      return normalizeCatalogValue(baseEntry);
    });
  });

  console.log('[PC_COMPONENT_DATA] ' + window.PC_COMPONENT_DATA.length + ' composants PC chargés.');
}());
