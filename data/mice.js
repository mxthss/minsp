(function () {
  const groups = [
    {
      brand: "Logitech",
      segment: "Gaming & bureautique",
      items: [
        "Logitech G Pro X2 Superstrike",
        "Logitech G502 X",
        "Logitech G502 X Plus",
        "Logitech G502 Hero",
        "Logitech G Pro X Superlight",
        "Logitech G Pro X Superlight 2",
        "Logitech G Pro X Superlight 2 SE",
        "Logitech G305 Lightspeed / G304",
        "Logitech MX Master 4",
        "Logitech MX Master 3S",
        "Logitech MX Master 3",
        "Logitech MX Anywhere 3S",
        "Logitech MX Anywhere 2S",
        "Logitech Signature M650",
        "Logitech POP Mouse",
        "Logitech Lift",
        "Logitech M320",
        "Logitech M337 / M535",
        "Logitech M170 / M171",
        "Logitech M220 Silent",
        "Logitech M221 Silent",
        "Logitech M330 Silent Plus",
        "Logitech M720 Triathlon",
        "Logitech MX Vertical",
        "Logitech G703 Lightspeed",
        "Logitech G705 Lightspeed",
        "Logitech G203 Lightsync",
        "Logitech G403 Hero",
        "Logitech G403 Lightspeed",
        "Logitech G603 Lightspeed",
        "Logitech G604 Lightspeed",
        "Logitech G600 MMO",
        "Logitech MX Anywhere 3",
        "Logitech MX Ergo",
        "Logitech M510",
        "Logitech M705 Marathon",
        "Logitech Pebble M350",
        "Logitech M90",
        "Logitech M100",
        "Logitech B100"
      ]
    },
    {
      brand: "Logitech",
      segment: "Legacy & historiques",
      status: "legacy",
      items: [
        "Logitech MX518",
        "Logitech G400 / G400S",
        "Logitech G302",
        "Logitech G303 Shroud Edition"
      ]
    },
    {
      brand: "Razer",
      segment: "Gaming & MMO",
      items: [
        "Razer DeathAdder V4 Pro",
        "Razer DeathAdder V3 Pro",
        "Razer Basilisk V3",
        "Razer Basilisk V3 Pro",
        "Razer Viper V4 Pro",
        "Razer Viper V3 Pro",
        "Razer Naga V2 Pro",
        "Razer Naga V2 HyperSpeed",
        "Razer Pro Click V2",
        "Razer Pro Click V2 Vertical",
        "Razer Naga Pro",
        "Razer Naga X",
        "Razer Viper Mini Hyperspeed",
        "Razer DeathAdder Essential",
        "Razer Cobra Pro",
        "Razer DeathAdder V2",
        "Razer DeathAdder V2 Mini",
        "Razer DeathAdder V3",
        "Razer Basilisk Essential",
        "Razer Basilisk Ultimate",
        "Razer Viper Ultimate",
        "Razer Viper 8KHz",
        "Razer Orochi V2",
        "Razer Pro Click",
        "Razer Atheris",
        "Razer Lancehead"
      ]
    },
    {
      brand: "Corsair",
      segment: "Gaming & MMO",
      items: [
        "Corsair Sabre V2 Pro Wireless",
        "Corsair M75 Wireless",
        "Corsair M55 Wireless",
        "Corsair M65 RGB Ultra",
        "Corsair Scimitar Elite Wireless SE",
        "Corsair Scimitar Elite RGB",
        "Corsair Harpoon Pro RGB",
        "Corsair Scimitar Pro RGB",
        "Corsair Scimitar RGB",
        "Corsair Sabre RGB Pro",
        "Corsair Sabre RGB Pro Wireless",
        "Corsair Katar Pro",
        "Corsair Katar Pro Wireless",
        "Corsair Dark Core RGB Pro",
        "Corsair Dark Core RGB Pro SE",
        "Corsair Ironclaw RGB",
        "Corsair Ironclaw Wireless",
        "Corsair Nightsword RGB"
      ]
    },
    {
      brand: "SteelSeries",
      segment: "Gaming",
      items: [
        "SteelSeries Aerox 9 Wireless",
        "SteelSeries Aerox 3 / Aerox 3 Wireless",
        "SteelSeries Rival 3 Wireless Gen 2",
        "SteelSeries Prime",
        "SteelSeries Sensei / Sensei 310",
        "SteelSeries Kana v2",
        "SteelSeries Rival 710 / Rival 3 / Rival 5",
        "SteelSeries Rival 100",
        "SteelSeries Rival 110",
        "SteelSeries Rival 300",
        "SteelSeries Rival 600",
        "SteelSeries Rival 650 Wireless",
        "SteelSeries Sensei Ten",
        "SteelSeries Sensei Raw",
        "SteelSeries Prime Wireless"
      ]
    },
    {
      brand: "Asus / ROG",
      segment: "Gaming",
      items: [
        "Asus ROG Gladius II Core",
        "Asus ROG Strix Impact III Wireless",
        "Asus ROG Harpe Ace Aim Lab Edition",
        "Asus ROG Harpe Ace Mini",
        "Asus TUF M3",
        "Asus ROG Gladius III",
        "Asus ROG Keris Wireless",
        "Asus ROG Chakram",
        "Asus ROG Spatha"
      ]
    },
    {
      brand: "Glorious",
      segment: "Gaming",
      items: [
        "Glorious Model O",
        "Glorious Model O3 Wireless",
        "Glorious Model D",
        "Glorious Model D3 Wireless",
        "Glorious Model O Wireless",
        "Glorious Model O Minus",
        "Glorious Model D Minus",
        "Glorious Model I",
        "Glorious Series One Pro"
      ]
    },
    {
      brand: "Endgame Gear",
      segment: "Gaming",
      items: [
        "Endgame Gear OP1 8K",
        "Endgame Gear XM2w",
        "Endgame Gear XM1",
        "Endgame Gear XM1r",
        "Endgame Gear OP1"
      ]
    },
    {
      brand: "Microsoft",
      segment: "Bureautique & classique",
      items: [
        "Microsoft Surface Mobile Mouse",
        "Microsoft Pro Intellimouse",
        "Microsoft Wireless IntelliMouse Explorer",
        "Microsoft Basic Optical Mouse",
        "Microsoft Classic Intellimouse",
        "Microsoft Arc Mouse"
      ]
    },
    {
      brand: "Roccat",
      segment: "Gaming",
      items: [
        "Roccat Kone XP Air",
        "Roccat Kone Pro",
        "Roccat Kain 202 Aimo",
        "Roccat Lua",
        "Roccat Kone AIMO",
        "Roccat Kone Pure Ultra",
        "Roccat Kone Burst Pro",
        "Roccat Kova AIMO",
        "Roccat Nyth MMO"
      ]
    },
    {
      brand: "Cooler Master",
      segment: "Gaming",
      items: [
        "Cooler Master MM311",
        "Cooler Master MM520",
        "Cooler Master MM720",
        "Cooler Master MM710",
        "Cooler Master MM711",
        "Cooler Master MM731"
      ]
    },
    {
      brand: "Keychron",
      segment: "Gaming & productivité",
      items: [
        "Keychron M7 8K",
        "Keychron M3 Mini V2 8K"
      ]
    },
    {
      brand: "Turtle Beach",
      segment: "Gaming",
      items: [
        "Turtle Beach Kone II Air",
        "Turtle Beach Kone XP Air"
      ]
    },
    {
      brand: "Zowie",
      segment: "Gaming",
      items: [
        "Zowie EC1",
        "Zowie EC2",
        "Zowie EC3",
        "Zowie FK1",
        "Zowie FK2",
        "Zowie FK2-C",
        "Zowie ZA11",
        "Zowie ZA12",
        "Zowie ZA13"
      ]
    },
    {
      brand: "HyperX",
      segment: "Gaming",
      items: [
        "HyperX Pulsefire series",
        "HyperX Pulsefire Core",
        "HyperX Pulsefire Surge",
        "HyperX Pulsefire Dart",
        "HyperX Pulsefire Raid"
      ]
    },
    {
      brand: "Redragon",
      segment: "Gaming",
      items: [
        "Redragon M612 8000 DPI",
        "Redragon M601",
        "Redragon M602",
        "Redragon M711 Cobra",
        "Redragon M908 Impact",
        "Redragon M913 Impact Elite"
      ]
    },
    {
      brand: "MSI",
      segment: "Gaming",
      items: [
        "MSI Clutch GM31 (wireless)",
        "MSI Clutch GM08",
        "MSI Clutch GM11",
        "MSI Clutch GM20 Elite",
        "MSI Clutch GM41 Lightweight",
        "MSI Clutch GM41 Wireless"
      ]
    },
    {
      brand: "HP / Lenovo",
      segment: "Bureautique & classique",
      items: [
        "HP 230 Slim / Lenovo 600",
        "HP X3000",
        "HP X500"
      ]
    },
    {
      brand: "Dell",
      segment: "Gaming & bureautique",
      items: [
        "Dell Gaming Mouse series",
        "Dell MS116",
        "Dell WM126"
      ]
    },
    {
      brand: "Trust",
      segment: "Gaming & bureautique",
      items: [
        "Trust YVI+",
        "Trust GXT 101",
        "Trust GXT 105",
        "Trust GXT 144",
        "Trust GXT 130"
      ]
    },
    {
      brand: "Autres marques",
      segment: "Divers",
      items: [
        "ATK Blazing Sky U2 8K",
        "ATK Gaming Gear VXE R1 Pro Max Wireless",
        "Lamzu Atlantis Mini Wireless",
        "MCHOSE K7 Ultra Lightweight",
        "Pulsar X2-H CrazyLight",
        "Pulsar ZywOo The Chosen",
        "G-Lab Kult Nitrogen Core",
        "Urban Factory Ergo Mouse",
        "Kensington Ergo Series"
      ]
    }
  ];

  const segmentNotes = {
    "Gaming & bureautique": "Versatile model that may lean toward gaming or office comfort depending on the exact reference.",
    "Legacy & historiques": "Known or legacy reference that should be double-checked for generation and current availability.",
    "Gaming & MMO": "Performance- or MMO-oriented mouse, likely prioritizing sensor quality, buttons, and customization.",
    "Gaming": "Gaming mouse entry that still needs confirmation on weight, sensor, and connection type.",
    "Bureautique & classique": "Office-oriented reference for productivity, daily use, or classic desk setups.",
    "Gaming & productivité": "Reference that may balance precision, comfort, and versatility.",
    "Divers": "Reference that still needs confirmation for the exact brand, image, and full spec sheet."
  };

  const curatedEntries = {
    "Logitech G Pro X2 Superstrike": {
      image: "./assets/mice/logitech-g-pro-x2-superstrike.webp",
      summary: "La PRO X2 Superstrike se place dans la famille esport premium de Logitech G. Elle met en avant une forme ambidextre tr?s comp?tition, une liaison sans fil LIGHTSPEED et les composants maison de derni?re g?n?ration pour privil?gier la pr?cision pure.",
      highlights: [
        "Chassis pro sym?trique",
        "Switches LIGHTFORCE hybrides",
        "Capteur HERO 2",
        "Sans fil LIGHTSPEED"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + USB-C" },
        { label: "Positionnement", value: "esport / FPS" },
        { label: "Capteur", value: "HERO 2" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-ae/products/gaming-mice/pro-x2-superstrike-mouse.html"
        }
      ]
    },
    "Logitech G502 X": {
      image: "./assets/mice/logitech-g502-x.webp",
      summary: "Version filaire modernis?e du c?l?bre G502, la G502 X mise sur un capteur haut de gamme, une molette double mode et beaucoup de contr?les sans basculer dans un poids trop massif. C'est une souris faite pour les joueurs qui veulent une prise en main affirm?e et un maximum de commandes sous le pouce.",
      highlights: [
        "LIGHTFORCE hybride optique / m?canique",
        "Molette double mode avec inclinaison lat?rale",
        "Bouton DPI Shift ajustable ou rempla?able",
        "5 profils embarqu?s et 13 contr?les programmables"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Poids", value: "89 g" },
        { label: "Capteur", value: "HERO 25K" },
        { label: "DPI", value: "100 - 25 600" },
        { label: "Boutons", value: "13 programmables" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/g502-x-wired-lightforce.html"
        }
      ]
    },
    "Logitech G502 X Plus": {
      image: "./assets/mice/logitech-g502-x-plus.webp",
      summary: "La G502 X Plus reprend la philosophie de la G502 X mais en version sans fil premium. Elle ajoute LIGHTSPEED, un bandeau LIGHTSYNC RGB tr?s visible et une compatibilit? POWERPLAY, ce qui en fait une souris charg?e en fonctions pour les joueurs qui veulent du confort et de la personnalisation.",
      highlights: [
        "Sans fil LIGHTSPEED avec USB-C",
        "RGB LIGHTSYNC sur 8 zones",
        "Compatible POWERPLAY",
        "Molette double mode et 13 contr?les programmables"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED" },
        { label: "Poids", value: "106 g" },
        { label: "Capteur", value: "HERO 25K" },
        { label: "Autonomie", value: "jusqu'? 130 h sans RGB" },
        { label: "Boutons", value: "13 programmables" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/g502-x-plus-wireless-lightforce.html"
        }
      ]
    },
    "Logitech G502 Hero": {
      image: "./assets/mice/logitech-g502-hero.webp",
      summary: "La G502 HERO reste la version filaire classique de la famille G502 : une souris tr?s riche en commandes, pens?e pour les joueurs qui aiment personnaliser leurs binds, ajuster le poids et garder une prise en main massive et rassurante.",
      highlights: [
        "Capteur HERO 25K",
        "11 boutons programmables",
        "Poids ajustable",
        "LIGHTSYNC RGB et m?moire embarquee"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Poids", value: "121 g + poids optionnels" },
        { label: "Capteur", value: "HERO 25K" },
        { label: "DPI", value: "jusqu'? 25 600" },
        { label: "Boutons", value: "11 programmables" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/g502-hero-gaming-mouse.html"
        }
      ]
    },
    "Logitech G Pro X Superlight": {
      image: "./assets/mice/logitech-g-pro-x-superlight.webp",
      summary: "La premi?re PRO X SUPERLIGHT est la version esport pur jus de Logitech : un ch?ssis minimaliste, une masse tr?s r?duite et l'objectif de laisser parler la main plut?t que les fonctions annexes. Elle reste tr?s orient?e FPS et jeu comp?titif.",
      highlights: [
        "Format sym?trique ultra minimaliste",
        "Moins de 63 g selon Logitech G",
        "Sans fil LIGHTSPEED",
        "Compatible POWERPLAY"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED" },
        { label: "Poids", value: "moins de 63 g" },
        { label: "Capteur", value: "HERO 25K" },
        { label: "Glisse", value: "PTFE sans additif" },
        { label: "Positionnement", value: "esport / FPS" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/pro-x-superlight-wireless-mouse.html"
        }
      ]
    },
    "Logitech G Pro X Superlight 2": {
      image: "./assets/mice/logitech-g-pro-x-superlight-2.webp",
      summary: "La PRO X SUPERLIGHT 2 est pens?e avant tout pour l'esport : tr?s l?g?re, tr?s simple en apparence, mais concentr?e sur la vitesse, la pr?cision et la fiabilit? sans fil. Elle vise les joueurs comp?titifs qui privil?gient un ch?ssis minimaliste et des performances de tout premier plan.",
      highlights: [
        "Format esport sym?trique tr?s ?pur?",
        "Switches LIGHTFORCE hybrides",
        "Jusqu'a 8 000 Hz en sans-fil",
        "Glisse PTFE et calibration fine dans G HUB"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED" },
        { label: "Poids", value: "60 g" },
        { label: "Capteur", value: "HERO 2" },
        { label: "DPI", value: "100 - 44 000" },
        { label: "Autonomie", value: "jusqu'? 95 h" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/pro-x2-superlight-wireless-mouse.910-006628.html"
        }
      ]
    },
    "Logitech G Pro X Superlight 2 SE": {
      image: "./assets/mice/logitech-g-pro-x-superlight-2-se.webp",
      summary: "La PRO X SUPERLIGHT 2 SE reprend la formule esport ultra l?g?re de Logitech G dans une variante plus accessible. On reste sur une souris minimaliste, tr?s rapide et clairement pens?e pour les joueurs qui veulent un ch?ssis simple, nerveux et sans surcharge.",
      highlights: [
        "Format sym?trique oriente comp?tition",
        "Switches LIGHTFORCE",
        "Capteur HERO 2",
        "Connexion LIGHTSPEED"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED" },
        { label: "Poids", value: "environ 60 g" },
        { label: "Capteur", value: "HERO 2" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-gb/products/gaming-mice/pro-x-superlight-2-se.910-007555.html"
        }
      ]
    },
    "Logitech G305 Lightspeed / G304": {
      image: "./assets/mice/logitech-g305-lightspeed-g304.webp",
      summary: "La G305 LIGHTSPEED, connue aussi sous le nom G304 selon les r?gions, reste une des r?f?rences abordables du sans-fil gaming. Elle mise sur une latence tr?s basse, un capteur HERO efficace et une autonomie ?norme sur pile AA, ce qui la rend pratique pour jouer sans trop d?penser.",
      highlights: [
        "Sans fil LIGHTSPEED en 1 ms",
        "Fonctionne avec une pile AA",
        "Recepteur nano range dans la souris",
        "Format simple, l?ger et facile ? transporter"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED" },
        { label: "Poids", value: "99 g" },
        { label: "Capteur", value: "HERO" },
        { label: "DPI", value: "200 - 12 000" },
        { label: "Autonomie", value: "jusqu'? 250 h" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/g305-lightspeed-wireless-gaming-mouse.html"
        }
      ]
    },
    "Logitech MX Master 4": {
      image: "./assets/mice/logitech-mx-master-4.webp",
      summary: "La MX Master 4 for Business repr?sente la g?n?ration la plus r?cente de la grande souris bureautique Logitech. La page officielle met en avant une connectivit? renforc?e, un nouveau panneau haptique, l'Actions Ring et une ergonomie toujours tr?s marqu?e pour le travail intensif.",
      highlights: [
        "Nouvelle Actions Ring",
        "Retour haptique int?gr?",
        "Darkfield 8 000 DPI",
        "Logi Bolt USB-C + Bluetooth"
      ],
      specs: [
        { label: "Type", value: "Logi Bolt USB-C + Bluetooth" },
        { label: "Poids", value: "150 g" },
        { label: "Boutons", value: "8" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/mx-master-4-business.html"
        }
      ]
    },
    "Logitech MX Master 3S": {
      image: "./assets/mice/logitech-mx-master-3s.webp",
      summary: "La MX Master 3S est une souris bureautique premium clairement orient?e productivit?. Elle combine une forme ergonomique tr?s marqu?e, des clics beaucoup plus silencieux, un capteur haute pr?cision qui suit m?me sur le verre et la c?l?bre molette MagSpeed pour faire d?filer tr?s vite de longs documents.",
      highlights: [
        "Quiet Clicks avec bruit fortement r?duit",
        "Capteur 8 000 DPI qui suit m?me sur verre",
        "Molette MagSpeed tr?s rapide et pr?cise",
        "Pens?e pour le multi-appareils et les workflows"
      ],
      specs: [
        { label: "Type", value: "Bluetooth / Logi Bolt" },
        { label: "Capteur", value: "8 000 DPI" },
        { label: "Surface", value: "m?me sur verre" },
        { label: "Autonomie", value: "jusqu'? 70 jours" },
        { label: "Charge rapide", value: "3 h en 1 min" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/mx-master-3s.html"
        },
        {
          label: "Page combo MX officielle",
          url: "https://www.logitech.com/en-us/products/combos/explore-mx-mechanical-master-3s.html"
        }
      ]
    },
    "Logitech MX Master 3": {
      image: "./assets/mice/logitech-mx-master-3.webp",
      summary: "La MX Master 3 a install? la formule moderne de la souris bureautique premium chez Logitech. Elle se distingue par sa molette MagSpeed, son ergonomie tr?s travaill?e et sa logique de personnalisation applicative pour les workflows intensifs.",
      highlights: [
        "Molette MagSpeed",
        "Forme ergonomique pour longues sessions",
        "Boutons et raccourcis orient?s productivit?"
      ],
      specs: [
        { label: "Type", value: "Bluetooth + r?cepteur USB" },
        { label: "Famille", value: "Master Series" },
        { label: "Usage", value: "productivit? avanc?e" }
      ],
      sources: [
        {
          label: "Annonce officielle Logitech",
          url: "https://news.logitech.com/press-releases/news-details/2019/Logitech-Enables-Advanced-Users-to-Achieve-Peak-Performance-with-MX-Master-3-and-MX-Keys/default.aspx"
        }
      ]
    },
    "Logitech MX Anywhere 3S": {
      image: "./assets/mice/logitech-mx-anywhere-3s.webp",
      summary: "La MX Anywhere 3S est la version compacte et nomade de la philosophie MX. Elle vise le travail mobile, avec un format facile ? glisser dans un sac, une excellente roulette MagSpeed et une pr?cision ?lev?e m?me sur des surfaces difficiles.",
      highlights: [
        "Format compact pour le voyage",
        "8K DPI any-surface tracking",
        "Quiet Clicks",
        "Molette MagSpeed jusqu'? 1000 lignes/s"
      ],
      specs: [
        { label: "Type", value: "Bluetooth / Logi Bolt" },
        { label: "Capteur", value: "8 000 DPI" },
        { label: "Surface", value: "pratiquement partout" },
        { label: "Scroll", value: "jusqu'? 1000 lignes/s" },
        { label: "Positionnement", value: "productivit? nomade" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/mx-anywhere-3s.html"
        }
      ]
    },
    "Logitech MX Anywhere 2S": {
      image: "./assets/mice/logitech-mx-anywhere-2s.webp",
      summary: "La MX Anywhere 2S est la version mobile de la philosophie MX : une petite souris premium faite pour passer facilement d'un ordinateur ? l'autre. Elle mise sur la portabilit?, le capteur Darkfield et les fonctions Logitech Flow pour les utilisateurs qui bougent beaucoup.",
      highlights: [
        "Format voyage de la gamme MX",
        "Multi-appareils avec Logitech Flow",
        "Capteur Darkfield"
      ],
      specs: [
        { label: "Type", value: "Bluetooth + r?cepteur USB" },
        { label: "Positionnement", value: "mobile premium" },
        { label: "Autonomie", value: "jusqu'? 70 jours" }
      ],
      sources: [
        {
          label: "Annonce officielle Logitech",
          url: "https://news.logitech.com/press-releases/news-details/2017/Logitech-Takes-Multi-Computer-Functionality-to-the-Next-Level-with-New-MX-Mice-and-Flow/default.aspx"
        }
      ]
    },
    "Logitech Signature M650": {
      image: "./assets/mice/logitech-signature-m650.webp",
      summary: "La Signature M650 est une souris bureautique simple et bien pens?e pour le quotidien. Elle mise surtout sur le confort longue dur?e, le SmartWheel et une autonomie tr?s large, sans chercher a devenir une souris experte ou gaming.",
      highlights: [
        "SmartWheel adaptatif",
        "Concue pour le confort quotidien",
        "Version orient?e productivit? g?n?raliste",
        "Fonctionnement silencieux type bureau"
      ],
      specs: [
        { label: "Type", value: "Bluetooth / Logi Bolt" },
        { label: "Autonomie", value: "jusqu'? 24 mois" },
        { label: "Scroll", value: "SmartWheel" },
        { label: "Usage", value: "bureautique quotidienne" },
        { label: "Connexion", value: "multi-OS" }
      ],
      sources: [
        {
          label: "Fiche Logitech for Business",
          url: "https://www.logitech.com/en-us/products/mice/m650-signature-wireless-mouse-business.html"
        }
      ]
    },
    "Logitech POP Mouse": {
      image: "./assets/mice/logitech-pop-mouse.webp",
      summary: "La POP Mouse assume un positionnement beaucoup plus lifestyle que technique. Elle vise les setups fun et mobiles avec un format compact, un bouton emoji personnalisable et une connexion simple ? plusieurs appareils.",
      highlights: [
        "Bouton emoji personnalisable",
        "Format compact et coloris tr?s marques",
        "Connexion multi-appareils",
        "Orientation bureau / mobilit?"
      ],
      specs: [
        { label: "Type", value: "Bluetooth / Logi Bolt" },
        { label: "Autonomie", value: "jusqu'? 24 mois" },
        { label: "Particularite", value: "emoji et raccourcis perso" },
        { label: "Usage", value: "bureautique l?g?re" },
        { label: "Format", value: "compact" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/pop-wireless-mouse.html"
        }
      ]
    },
    "Logitech Lift": {
      image: "./assets/mice/logitech-lift.webp",
      summary: "La Lift est la proposition ergonomique accessible de Logitech pour les petites et moyennes mains. Son objectif est clair : r?duire la fatigue du poignet avec une position plus naturelle, sans rendre l'apprentissage trop difficile.",
      highlights: [
        "Angle ergonomique de 57 degr?s",
        "Existe en version gauchere",
        "SmartWheel magn?tique",
        "Connexion jusqu'? 3 appareils"
      ],
      specs: [
        { label: "Type", value: "Bluetooth / Logi Bolt" },
        { label: "Autonomie", value: "jusqu'? 24 mois" },
        { label: "Ergonomie", value: "57 degr?s" },
        { label: "Mains", value: "petites a moyennes" },
        { label: "Connexion", value: "jusqu'? 3 appareils" }
      ],
      sources: [
        {
          label: "Fiche Logitech for Business",
          url: "https://www.logitech.com/en-us/products/mice/lift-vertical-ergonomic-mouse-business.html"
        }
      ]
    },
    "Logitech M320": {
      image: "./assets/mice/logitech-m320.webp",
      summary: "La M320 est une souris sans fil confortable de la gamme grand public Logitech. Elle est avant tout pens?e pour la bureautique simple ?vec une coque plus arrondie, un rev?tement agr?able et une autonomie longue qui en fait une valeur s?re du quotidien.",
      highlights: [
        "Forme plus confortable que les mod?les ultra compacts",
        "Sans fil 2.4 GHz",
        "Autonomie longue dur?e"
      ],
      specs: [
        { label: "Type", value: "Sans fil 2.4 GHz" },
        { label: "Usage", value: "bureautique" },
        { label: "Format", value: "compact confort" }
      ],
      sources: [
        {
          label: "Annonce officielle Logitech",
          url: "https://news.logitech.com/press-releases/news-details/2014/Logitech-Introduces-Wireless-Mouse-M320-Designed-for-Comfort/default.aspx"
        }
      ]
    },
    "Logitech M337 / M535": {
      image: "./assets/mice/logitech-m337-m535.webp",
      summary: "Les M337 et M535 sont des souris Bluetooth compactes con?ues pour les usages nomades. Logitech met surtout en avant leur compatibilit? large, leur capteur utilisable sur de nombreuses surfaces et un format facile ? glisser dans un sac.",
      highlights: [
        "Connexion Bluetooth sans r?cepteur",
        "Format mobile compact",
        "Capteur track-anywhere"
      ],
      specs: [
        { label: "Type", value: "Bluetooth" },
        { label: "Usage", value: "mobile / bureautique" },
        { label: "Format", value: "compact" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech M535",
          url: "https://www.logitech.com/en-us/products/mice/m535-bluetooth-mouse.910-004529.html"
        }
      ]
    },
    "Logitech M170 / M171": {
      image: "./assets/mice/logitech-m170-m171.webp",
      summary: "Les M170 et M171 sont des souris sans fil bureautiques tr?s simples, con?ues pour aller ? l'essentiel. Leur proposition est claire : une liaison 2.4 GHz classique, une autonomie longue dur?e sur pile et un format compact facile ? d?ployer sur n'importe quel PC.",
      highlights: [
        "Sans fil plug-and-play",
        "Format compact pour le quotidien",
        "Autonomie longue sur pile"
      ],
      specs: [
        { label: "Type", value: "Sans fil 2.4 GHz" },
        { label: "Alimentation", value: "pile AA" },
        { label: "Usage", value: "bureautique" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/m170-wireless-mouse.html"
        }
      ]
    },
    "Logitech M220 Silent": {
      image: "./assets/mice/logitech-m220-silent.webp",
      summary: "La M220 Silent vise les postes bureautiques simples ou les environnements calmes. Logitech y met surtout en avant la r?duction du bruit des clics, la facilit? d'installation et une autonomie confortable pour un usage quotidien sans prise de t?te.",
      highlights: [
        "Clics plus silencieux",
        "Petit format ambidextre",
        "Connexion 2.4 GHz classique"
      ],
      specs: [
        { label: "Type", value: "Sans fil 2.4 GHz" },
        { label: "Positionnement", value: "silencieux / bureau" },
        { label: "Alimentation", value: "pile AA" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/m220-wireless-mouse.html"
        }
      ]
    },
    "Logitech M221 Silent": {
      image: "./assets/mice/logitech-m221-silent.webp",
      summary: "La M221 Silent suit la m?me logique que la M220 avec une promesse de clics discrets et une prise en main simple. C'est une souris de bureau pens?e pour le quotidien, surtout quand on veut ?viter le bruit dans un espace partage.",
      highlights: [
        "Technologie SilentTouch",
        "Format compact",
        "Receptionnaire USB nano"
      ],
      specs: [
        { label: "Type", value: "Sans fil 2.4 GHz" },
        { label: "Usage", value: "bureautique silencieuse" },
        { label: "Alimentation", value: "pile AA" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-ph/products/mice/m221-wireless-mouse.html"
        }
      ]
    },
    "Logitech M330 Silent Plus": {
      image: "./assets/mice/logitech-m330-silent-plus.webp",
      summary: "La M330 Silent Plus est une souris de bureau pour droitier qui mise sur le silence et le confort. Elle se distingue des r?f?rences d'entr?e de gamme par une forme plus enveloppante, des clics tr?s att?nu?s et un positionnement plus premium pour la bureautique.",
      highlights: [
        "Clics silencieux",
        "Coque pour droitier plus reposante",
        "Recepteur nano discret"
      ],
      specs: [
        { label: "Type", value: "Sans fil 2.4 GHz" },
        { label: "Positionnement", value: "bureautique silencieuse" },
        { label: "Alimentation", value: "pile AA" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/m330-silent-plus.html"
        }
      ]
    },
    "Logitech M720 Triathlon": {
      image: "./assets/mice/logitech-m720-triathlon.webp",
      summary: "La M720 Triathlon est une souris de travail polyvalente, faite pour tenir longtemps et passer facilement d'un appareil ? l'autre. Elle se distingue surtout par sa forme confortable, sa roulette double mode et son positionnement tr?s pragmatique.",
      highlights: [
        "Confort pleine taille",
        "Dual-mode scrolling",
        "DPI ajustable",
        "Pens?e pour endurance et polyvalence"
      ],
      specs: [
        { label: "Type", value: "Bluetooth / r?cepteur USB" },
        { label: "Autonomie", value: "jusqu'? 24 mois" },
        { label: "Scroll", value: "double mode" },
        { label: "Usage", value: "multi-appareils" },
        { label: "Format", value: "pleine taille pour droitier" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/m720-triathlon.html"
        }
      ]
    },
    "Logitech MX Vertical": {
      image: "./assets/mice/logitech-mx-vertical.webp",
      summary: "La MX Vertical pousse plus loin l'id?e ergonomique que la Lift, avec une prise en main verticale marqu?e et un positionnement premium. C'est une souris orient?e confort et r?duction de la tension musculaire, plus qu'une souris de performance brute.",
      highlights: [
        "Angle vertical de 57 degr?s",
        "Orientation ergonomie premium",
        "Capteur haute pr?cision",
        "Ciblee pour longues journ?es de bureau"
      ],
      specs: [
        { label: "Type", value: "Bluetooth / r?cepteur USB / filaire" },
        { label: "Ergonomie", value: "57 degr?s" },
        { label: "Capteur", value: "jusqu'? 4 000 DPI" },
        { label: "Usage", value: "productivit? et confort" },
        { label: "Format", value: "vertical pour droitier" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech",
          url: "https://www.logitech.com/en-us/products/mice/mx-vertical-ergonomic-mouse.html"
        }
      ]
    },
    "Logitech G703 Lightspeed": {
      image: "./assets/mice/logitech-g703-lightspeed.webp",
      summary: "La G703 LIGHTSPEED est une souris gaming sans fil qui privil?gie la forme ergonomique classique et la r?ponse rapide. Elle s'adresse aux joueurs qui veulent une souris sans fil confortable, s?rieuse et compatible avec l'?cosyst?me Logitech G.",
      highlights: [
        "Ergonomie pour droitier tr?s classique",
        "Sans fil LIGHTSPEED",
        "Compatible POWERPLAY",
        "LIGHTSYNC RGB"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED" },
        { label: "Poids", value: "95 g" },
        { label: "Capteur", value: "HERO 25K" },
        { label: "Autonomie", value: "jusqu'? 35 h avec RGB" },
        { label: "RGB", value: "LIGHTSYNC sur 6 zones" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/g703-hero-wireless-gaming-mouse.html"
        }
      ]
    },
    "Logitech G705 Lightspeed": {
      image: "./assets/mice/logitech-g705-lightspeed.webp",
      summary: "La G705 fait partie de la collection Aurora et cible plus clairement les petites mains que la plupart des souris gaming classiques. Elle combine une silhouette plus douce, du RGB et du sans-fil gaming avec un vrai effort de confort.",
      highlights: [
        "Concue pour les plus petites mains",
        "Sans fil LIGHTSPEED",
        "RGB LIGHTSYNC",
        "Design Aurora Collection"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED + Bluetooth" },
        { label: "Poids", value: "85 g" },
        { label: "Autonomie", value: "jusqu'? 40 h avec RGB" },
        { label: "Boutons", value: "6 programmables" },
        { label: "Usage", value: "gaming petite main" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice/g705-wireless-gaming-mouse.html"
        }
      ]
    },
    "Logitech G203 Lightsync": {
      image: "./assets/mice/logitech-g203-lightsync.webp",
    },
    "Logitech G403 Hero": {
      image: "./assets/mice/logitech-g403-hero.webp",
    },
    "Logitech G403 Lightspeed": {
      image: "./assets/mice/logitech-g403-lightspeed.webp",
    },
    "Logitech G603 Lightspeed": {
      image: "./assets/mice/logitech-g603-lightspeed.webp",
    },
    "Logitech G604 Lightspeed": {
      image: "./assets/mice/logitech-g604-lightspeed.webp",
    },
    "Logitech G600 MMO": {
      image: "./assets/mice/logitech-g600-mmo.webp",
    },
    "Logitech MX Anywhere 3": {
      image: "./assets/mice/logitech-mx-anywhere-3.webp",
    },
    "Logitech MX Ergo": {
      image: "./assets/mice/logitech-mx-ergo.webp",
    },
    "Logitech M510": {
      image: "./assets/mice/logitech-m510.webp",
    },
    "Logitech M705 Marathon": {
      image: "./assets/mice/logitech-m705-marathon.webp",
    },
    "Logitech Pebble M350": {
      image: "./assets/mice/logitech-pebble-m350-cutout.png",
    },
    "Logitech M90": {
      image: "./assets/mice/logitech-m90-cutout.png",
    },
    "Logitech M100": {
      image: "./assets/mice/logitech-m100.webp",
    },
    "Logitech B100": {
      image: "./assets/mice/logitech-b100.webp",
    },
    "Logitech MX518": {
      image: "./assets/mice/logitech-mx518.webp",
      summary: "La MX518 est une r?f?rence culte chez Logitech, connue pour sa forme pour droitier tr?s appr?ci?e et sa place dans l'histoire des souris gaming PC. Aujourd'hui, c'est surtout une fiche patrimoniale qui permet de garder une trace de cette souris embl?matique des premi?res ?poques du FPS.",
      highlights: [
        "Souris culte de l'histoire PC",
        "Forme pour droitier classique",
        "R?f?rence h?ritage Logitech"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Statut", value: "legacy / h?ritage" },
        { label: "Famille", value: "gaming optique" }
      ],
      sources: [
        {
          label: "Support officiel Logitech",
          url: "https://support.logi.com/hc/en-150/articles/360024148634"
        }
      ]
    },
    "Logitech G400 / G400S": {
      image: "./assets/mice/logitech-g400-g400s.webp",
      summary: "Les G400 et G400s repr?sentent une ancienne g?n?ration de souris Logitech G appr?ci?es pour leur forme droite simple et leur suivi fiable. Aujourd'hui, elles servent surtout de r?f?rences historiques dans la lign?e des souris FPS classiques de la marque.",
      highlights: [
        "R?f?rence historique FPS",
        "Format pour droitier simple",
        "Version G400s document?e par Logitech"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Statut", value: "legacy" },
        { label: "Famille", value: "gaming optique" }
      ],
      sources: [
        {
          label: "Support officiel Logitech",
          url: "https://support.logi.com/hc/en-us/articles/360023465473-Logitech-G400s-Optical-Gaming-Mouse-Technical-Specifications"
        }
      ]
    },
    "Logitech G302": {
      image: "./assets/mice/logitech-g302.webp",
      summary: "La G302 fait partie des anciennes r?f?rences Logitech G con?ues pour le jeu rapide, avec une coque compacte et des commandes franches. Elle reste surtout int?ressante comme mod?le historique pour ceux qui suivent l'?volution des souris Logitech orient?es MOBA et FPS.",
      highlights: [
        "Format compact",
        "R?f?rence historique Logitech G",
        "Positionnement MOBA / jeu rapide"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Statut", value: "legacy" },
        { label: "Famille", value: "Logitech G" }
      ],
      sources: [
        {
          label: "Catalogue officiel Logitech G",
          url: "https://www.logitechg.com/en-us/products/gaming-mice.html"
        }
      ]
    },
    "Logitech G303 Shroud Edition": {
      image: "./assets/mice/logitech-g303-shroud-edition.webp",
      summary: "La G303 Shroud Edition remet au go?t du jour la forme anguleuse de la G303 dans une version sans fil co-sign?e avec Shroud. Son shape tr?s particulier parle surtout aux joueurs qui cherchent une tenue de souris tr?s verrouill?e et une sensation de contr?le imm?diate.",
      highlights: [
        "Edition co-designee avec Shroud",
        "Forme anguleuse tr?s distinctive",
        "Sans fil LIGHTSPEED",
        "Orientation FPS / esport"
      ],
      specs: [
        { label: "Type", value: "Sans fil LIGHTSPEED" },
        { label: "Capteur", value: "HERO 25K" },
        { label: "Statut", value: "edition speciale" }
      ],
      sources: [
        {
          label: "Fiche officielle Logitech G",
          url: "https://www.logitechg.com/es-ar/products/gaming-mice/g303-shroud-wireless-mouse.html"
        }
      ]
    },
    "Razer DeathAdder V4 Pro": {
      image: "./assets/mice/razer-deathadder-v4-pro.webp",
      summary: "La DeathAdder V4 Pro est la nouvelle vitrine esport ergonomique de Razer. La marque insiste sur une coque encore plus l?g?re, une liaison HyperSpeed Gen-2, un capteur 45K et une refonte profonde des composants pour rester au sommet en comp?tition.",
      highlights: [
        "56 a 58 g selon coloris",
        "HyperSpeed Wireless Gen-2",
        "Focus Pro 45K Gen-2",
        "Scroll wheel optique"
      ],
      specs: [
        { label: "Type", value: "Sans fil + USB-C" },
        { label: "Capteur", value: "Focus Pro 45K Gen-2" },
        { label: "Autonomie", value: "jusqu'? 150 h" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-deathadder-v4-pro"
        }
      ]
    },
    "Razer DeathAdder V3 Pro": {
      image: "./assets/mice/razer-deathadder-v3-pro.webp",
      summary: "La DeathAdder V3 Pro modernise la formule ergonomique iconique de Razer avec une coque plus l?g?re et plus comp?tition. Elle vise clairement les joueurs FPS et esport qui veulent une souris pour droitier tr?s rapide, tr?s simple en apparence, mais optimis?e pour le geste et la r?activit?.",
      highlights: [
        "Forme ergonomique pour droitier orient?e esport",
        "Version ultra l?g?re de la lign?e DeathAdder",
        "HyperPolling sans fil sur la fiche officielle",
        "Texture Smooth-Touch sur la variante retenue"
      ],
      specs: [
        { label: "Type", value: "Sans fil HyperSpeed" },
        { label: "Poids", value: "63 g" },
        { label: "Texture", value: "Smooth-Touch" },
        { label: "Polling", value: "8 000 Hz sur cette fiche" },
        { label: "Positionnement", value: "ergonomique esport" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-deathadder-v3-pro/specs"
        }
      ]
    },
    "Razer Basilisk V3": {
      image: "./assets/mice/razer-basilisk-v3-cutout.png",
      summary: "La Basilisk V3 est la version filaire de la souris polyvalente haut de gamme de Razer. Elle m?lange une ergonomie pour droitier tr?s confortable, une molette intelligente et une grosse dose de personnalisation pour les joueurs qui veulent une seule souris capable de tout faire.",
      highlights: [
        "Molette HyperScroll intelligente",
        "Forme ergonomique pour droitier",
        "Nombreux boutons programmables",
        "Chroma RGB"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Capteur", value: "Focus+ / Focus Pro selon revision" },
        { label: "Boutons", value: "11 programmables" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/Razer-Basilisk-V3/RZ01-04000100-R3U1"
        }
      ]
    },
    "Razer Basilisk V3 Pro": {
      image: "./assets/mice/razer-basilisk-v3-pro.webp",
      summary: "La Basilisk V3 Pro est la souris Razer tr?s complete par excellence : ergonomique, charg?e en boutons, RGB tr?s pousse et molette ?volu?e. Elle s'adresse aux joueurs qui veulent une souris polyvalente capable de faire du FPS, du jeu solo, de la productivit? et du macro mapping sans compromis de fonctions.",
      highlights: [
        "Molette HyperScroll Tilt Wheel",
        "10+1 boutons programmables",
        "RGB Chroma sur 13 zones",
        "Compatible avec la charge sans fil Razer"
      ],
      specs: [
        { label: "Type", value: "Sans fil HyperSpeed" },
        { label: "Capteur", value: "Focus Pro 30K" },
        { label: "Boutons", value: "10+1" },
        { label: "RGB", value: "13 zones" },
        { label: "Switches", value: "Optical Mouse Switches Gen-3" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-basilisk-v3-pro"
        }
      ]
    },
    "Razer Viper V4 Pro": {
      image: "./assets/mice/razer-viper-v4-pro.webp",
      summary: "La Viper V4 Pro poursuit la lign?e sym?trique comp?tition de Razer. La marque la pr?sente comme une ?volution plus l?g?re, plus rapide et plus pr?cise de sa r?f?rence esport, avec une ergonomie surtout faite pour le claw et le fingertip.",
      highlights: [
        "Shape sym?trique droitier optimis?e claw / fingertip",
        "Souris orient?e esport",
        "Generation V4 Pro la plus r?cente"
      ],
      specs: [
        { label: "Type", value: "Sans fil esports" },
        { label: "Positionnement", value: "FPS / comp?tition" },
        { label: "Memoire", value: "1 profil embarque" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-viper-v4-pro"
        }
      ]
    },
    "Razer Viper V3 Pro": {
      image: "./assets/mice/razer-viper-v3-pro.webp",
      summary: "La Viper V3 Pro est la proposition ultra l?g?re et sym?trique de Razer pour la sc?ne comp?titive. Tout dans cette souris cherche ? r?duire l'inertie et a maximiser la pr?cision brute, avec un poids tr?s bas et un capteur de derni?re g?n?ration con?u pour les joueurs qui jouent au flick et au tracking rapide.",
      highlights: [
        "Chassis sym?trique ultra l?ger",
        "Developpee avec des pros de l'esport",
        "HyperPolling 8K Hz",
        "Capteur Focus Pro 35K Gen-2"
      ],
      specs: [
        { label: "Type", value: "Sans fil HyperSpeed" },
        { label: "Poids", value: "54 g" },
        { label: "Capteur", value: "Focus Pro 35K Gen-2" },
        { label: "Polling", value: "8 000 Hz" },
        { label: "Vitesse max", value: "750 IPS" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-viper-v3-pro/specs"
        }
      ]
    },
    "Razer Naga V2 Pro": {
      image: "./assets/mice/razer-naga-v2-pro.webp",
      summary: "La Naga V2 Pro est une souris MMO tr?s modulaire, pens?e pour ceux qui veulent beaucoup de commandes directes sous les doigts. Son int?r?t principal, c'est de pouvoir changer de plaque lat?rale selon le type de jeu et de garder une molette ?volu?e pour passer d'un usage MMO a un usage plus g?n?raliste.",
      highlights: [
        "3 plaques lat?rales magn?tiques interchangeables",
        "Jusqu'a 22 commandes programmables",
        "Molette HyperScroll Pro Wheel",
        "Positionnement multi-genre MMO / BR / FPS"
      ],
      specs: [
        { label: "Type", value: "Sans fil HyperSpeed" },
        { label: "Plaques", value: "12, 6 ou 2 boutons" },
        { label: "Commandes", value: "jusqu'? 22" },
        { label: "Molette", value: "HyperScroll Pro" },
        { label: "Usage", value: "MMO et multi-genre" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-naga-v2-pro/specs"
        }
      ]
    },
    "Razer Naga V2 HyperSpeed": {
      image: "./assets/mice/razer-naga-v2-hyperspeed.webp",
      summary: "La Naga V2 HyperSpeed reprend l'id?e MMO de la gamme Naga dans une version plus simple que la Pro, mais encore tr?s outill?e. Elle est faite pour les joueurs qui veulent beaucoup de commandes, une grosse autonomie et une vraie polyvalence sans passer sur un mod?le trop co?teux.",
      highlights: [
        "19 boutons et 21 contr?les programmables",
        "HyperScroll double mode",
        "HyperSpeed Wireless et Bluetooth",
        "Capteur Focus Pro 30K"
      ],
      specs: [
        { label: "Type", value: "HyperSpeed + Bluetooth" },
        { label: "Commandes", value: "jusqu'? 21" },
        { label: "Autonomie", value: "jusqu'? 250 h / 400 h" },
        { label: "Capteur", value: "Focus Pro 30K" },
        { label: "Usage", value: "MMO et macros" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-naga-v2-hyperspeed"
        }
      ]
    },
    "Razer Pro Click V2": {
      image: "./assets/mice/razer-pro-click-v2.webp",
      summary: "La Pro Click V2 cherche ? m?langer bureau et gaming dans un seul produit. Son ergonomie plus sage, son autonomie longue dur?e, sa connectivit? multi-appareils et ses raccourcis orient?s productivit? en font une souris int?ressante pour quelqu'un qui travaille beaucoup sur PC mais veut garder un capteur tr?s s?rieux.",
      highlights: [
        "Ergonomie avec large repose-pouce",
        "AI Prompt Master et raccourcis productivit?",
        "Connexion a jusqu'? 5 appareils",
        "Capteur 30K qui suit m?me sur verre"
      ],
      specs: [
        { label: "Positionnement", value: "productivit? + gaming" },
        { label: "Autonomie", value: "jusqu'? 3.5 mois" },
        { label: "Connectivite", value: "5 appareils" },
        { label: "Capteur", value: "Focus Pro 30K" },
        { label: "Commandes", value: "jusqu'? 9" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/productivity/razer-pro-click-v2"
        }
      ]
    },
    "Razer Pro Click V2 Vertical": {
      image: "./assets/mice/razer-pro-click-v2-vertical.webp",
      summary: "La Pro Click V2 Vertical est la version verticale la plus orient?e confort de la gamme Pro Click V2. Elle vise les longues journ?es de travail, mais garde un capteur s?rieux, des raccourcis IA et une connectivit? tr?s large pour rester utile dans un setup hybride.",
      highlights: [
        "Design vertical 71.7 degr?s",
        "Jusqu'a 8 contr?les programmables",
        "5-way multi-device connectivity",
        "Capteur Focus Pro 30K sur verre"
      ],
      specs: [
        { label: "Type", value: "Sans fil multi-appareils" },
        { label: "Ergonomie", value: "71.7 degr?s" },
        { label: "Autonomie", value: "jusqu'? 6 mois" },
        { label: "Capteur", value: "Focus Pro 30K" },
        { label: "Boutons", value: "jusqu'? 8" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/productivity/razer-pro-click-v2-vertical-edition"
        }
      ]
    },
    "Razer Naga Pro": {
      image: "./assets/mice/razer-naga-pro.webp",
      summary: "La Naga Pro est la souris modulaire multi-genre de Razer. Son gros argument, ce sont ses plaques lat?rales interchangeables qui lui permettent de passer d'un usage MMO a un usage FPS ou MOBA sans changer compl?tement de souris.",
      highlights: [
        "3 plaques lat?rales interchangeables",
        "Jusqu'a 19 + 1 contr?les programmables",
        "HyperSpeed Wireless",
        "Approche MMO / MOBA / FPS"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth + USB" },
        { label: "Capteur", value: "Focus+ 20K" },
        { label: "Autonomie", value: "jusqu'? 150 h en Bluetooth" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/mena-en/gaming-mice/razer-naga-pro"
        }
      ]
    },
    "Razer Naga X": {
      image: "./assets/mice/razer-naga-x.webp",
      summary: "La Naga X est la declinaison filaire et plus l?g?re de la philosophie Naga. Elle reste tr?s orient?e MMO gr?ce a son gros bloc de commandes lat?rales, mais cherche ? ?tre moins lourde et plus directe a prendre en main.",
      highlights: [
        "16 boutons programmables",
        "Corps plus l?ger que les Naga sans fil",
        "Capteur optique 18K",
        "Switches optiques de 2e g?n?ration"
      ],
      specs: [
        { label: "Type", value: "Filaire" },
        { label: "Poids", value: "85 g" },
        { label: "Capteur", value: "18 000 DPI" },
        { label: "Boutons", value: "16 programmables" },
        { label: "Usage", value: "MMO" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-naga-x"
        }
      ]
    },
    "Razer Viper Mini Hyperspeed": {
      image: "./assets/mice/razer-viper-mini-hyperspeed.webp",
      summary: "La d?nomination 'Viper Mini Hyperspeed' n'appara?t pas telle quelle dans le catalogue Razer actuel. Je la rattache provisoirement ? la famille Viper Mini ultra l?g?re de Razer, qui met surtout en avant un format compact, tr?s l?ger et haut de gamme pour le jeu comp?titif.",
      highlights: [
        "R?f?rence catalogue ? confirmer",
        "Format Viper Mini compact",
        "Orientation performance ultra l?g?re"
      ],
      specs: [
        { label: "Type", value: "sans fil haut de gamme" },
        { label: "Statut", value: "nom exact ? v?rifier" },
        { label: "Famille", value: "Viper Mini" }
      ],
      sources: [
        {
          label: "Page officielle Razer Viper Mini Signature Edition",
          url: "https://www.razer.com/gaming-mice/razer-viper-mini-signature-edition/"
        }
      ]
    },
    "Razer DeathAdder Essential": {
      image: "./assets/mice/razer-deathadder-essential.webp",
      summary: "La DeathAdder Essential est la porte d'entr?e de Razer sur la forme DeathAdder. Elle garde l'ergonomie pour droitier c?l?bre de la gamme, mais avec une fiche technique plus simple et un tarif nettement plus accessible.",
      highlights: [
        "Forme ergonomique DeathAdder",
        "Capteur optique 6 400 DPI",
        "5 boutons Hyperesponse",
        "Bonne option d'entr?e de gamme"
      ],
      specs: [
        { label: "Type", value: "Filaire" },
        { label: "Capteur", value: "6 400 DPI" },
        { label: "Boutons", value: "5 Hyperesponse" },
        { label: "Forme", value: "ergonomique pour droitier" },
        { label: "Positionnement", value: "gaming accessible" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-deathadder-essential/specs"
        }
      ]
    },
    "Razer Cobra Pro": {
      image: "./assets/mice/razer-cobra-pro.webp",
      summary: "La Cobra Pro est la version compacte et premium de la ligne Cobra. Elle vise les joueurs qui veulent une souris plus petite mais tr?s riche en fonctions, avec du sans-fil, beaucoup de RGB et un capteur haut de gamme.",
      highlights: [
        "Format compact haut de gamme",
        "Focus Pro 30K",
        "11 zones de Chroma RGB",
        "10 contr?les personnalisables"
      ],
      specs: [
        { label: "Type", value: "Sans fil HyperSpeed" },
        { label: "Capteur", value: "Focus Pro 30K" },
        { label: "Boutons", value: "10" },
        { label: "RGB", value: "11 zones" },
        { label: "Positionnement", value: "compact premium" }
      ],
      sources: [
        {
          label: "Fiche officielle Razer",
          url: "https://www.razer.com/gaming-mice/razer-cobra-pro"
        }
      ]
    },
    "Razer DeathAdder V2": {
      image: "./assets/mice/razer-deathadder-v2.webp",
    },
    "Razer DeathAdder V2 Mini": {
      image: "./assets/mice/razer-deathadder-v2-mini.webp",
    },
    "Razer DeathAdder V3": {
      image: "./assets/mice/razer-deathadder-v3-cutout.png",
    },
    "Razer Basilisk Essential": {
      image: "./assets/mice/razer-basilisk-essential.webp",
    },
    "Razer Basilisk Ultimate": {
      image: "./assets/mice/razer-basilisk-ultimate.webp",
    },
    "Razer Viper Ultimate": {
      image: "./assets/mice/razer-viper-ultimate.webp",
    },
    "Razer Viper 8KHz": {
      image: "./assets/mice/razer-viper-8khz.webp",
    },
    "Razer Orochi V2": {
      image: "./assets/mice/razer-orochi-v2.webp",
    },
    "Razer Pro Click": {
      image: "./assets/mice/razer-pro-click.webp",
    },
    "Razer Atheris": {
      image: "./assets/mice/razer-atheris.webp",
    },
    "Razer Lancehead": {
      image: "./assets/mice/razer-lancehead.webp",
    },
    "Corsair Sabre V2 Pro Wireless": {
      image: "./assets/mice/corsair-sabre-v2-pro-wireless.webp",
      summary: "La Sabre V2 Pro Wireless pousse la lign?e Sabre vers un registre plus premium avec un ch?ssis all?g?, une coque magn?sium et un positionnement clairement e-sport. Elle vise les joueurs qui privil?gient la vitesse et les gestes amples.",
      highlights: [
        "Coque magn?sium",
        "Format pour droitier comp?tition",
        "Sans fil hautes performances"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth + USB" },
        { label: "Capteur", value: "MARKSMAN S 26K" },
        { label: "Polling", value: "jusqu'? 8 000 Hz" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-931g100-ww/sabre-v2-pro-wireless-magnesium-alloy-gaming-mouse-black-ch-931g100-ww"
        }
      ]
    },
    "Corsair M75 Wireless": {
      image: "./assets/mice/corsair-m75-wireless.webp",
      summary: "La M75 Wireless est une souris comp?tition ambidextre r?cente de Corsair. Le discours officiel insiste sur sa forme sym?trique, sa l?g?ret? et sa capacit? ? convenir aussi bien aux droitiers qu'aux gauchers avec des boutons interchangeables.",
      highlights: [
        "Shape ambidextre",
        "Boutons lat?raux interchangeables",
        "Approche comp?tition moderne"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth + USB" },
        { label: "Capteur", value: "MARKSMAN optique" },
        { label: "Poids", value: "environ 89 g" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-931d010-na/m75-wireless-lightweight-rgb-gaming-mouse-black-ch-931d010-na"
        }
      ]
    },
    "Corsair M55 Wireless": {
      image: "./assets/mice/corsair-m55-wireless.webp",
      summary: "La M55 Wireless cherche la simplicite efficace : une forme sym?trique compacte, plusieurs types de prise en main compatibles et une connexion sans fil facile ? vivre. Elle vise surtout le milieu de gamme polyvalent.",
      highlights: [
        "Forme sym?trique compacte",
        "Compatible fingertip, claw et palm",
        "SLIPSTREAM v1.5 et Bluetooth",
        "Capteur jusqu'? 24 000 DPI"
      ],
      specs: [
        { label: "Type", value: "SLIPSTREAM + Bluetooth" },
        { label: "Capteur", value: "24 000 DPI" },
        { label: "Boutons", value: "6 programmables" },
        { label: "Autonomie", value: "jusqu'? 185 h / 400 h" },
        { label: "Poids", value: "pile AA" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/revival-series/ch-931f000-ww-rv/m55-wireless-gaming-mouse-revival-series-ch-931f000-ww-rv"
        }
      ]
    },
    "Corsair M65 RGB Ultra": {
      image: "./assets/mice/corsair-m65-rgb-ultra.webp",
      summary: "La M65 RGB Ultra garde la personnalite FPS historique de la famille M65 avec sa coque aluminium et son syst?me de poids. Elle est faite pour les joueurs qui aiment r?gler finement le ressenti de la souris et garder une base tr?s stable sous la main.",
      highlights: [
        "Chassis en aluminium anodise",
        "Systeme de poids r?glable",
        "Capteur MARKSMAN 26K",
        "Tilt gestures et faible lift-off"
      ],
      specs: [
        { label: "Type", value: "Filaire" },
        { label: "Capteur", value: "MARKSMAN 26 000 DPI" },
        { label: "Boutons", value: "8 programmables" },
        { label: "Poids", value: "97 g a 115 g" },
        { label: "Positionnement", value: "FPS tunable" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-9309411-na/m65-rgb-ultra-tunable-fps-gaming-mouse-ch-9309411-na"
        }
      ]
    },
    "Corsair Scimitar Elite Wireless SE": {
      image: "./assets/mice/corsair-scimitar-elite-wireless-se.webp",
      summary: "La Scimitar Elite Wireless SE est la grosse souris MMO de Corsair : beaucoup de boutons, un pave lateral r?glable et un capteur tr?s ambitieux. Elle vise clairement les joueurs qui veulent tout centraliser sur la souris pour MMO, MOBA ou macros.",
      highlights: [
        "16 boutons personnalisables",
        "Key Slider lateral r?glable",
        "Capteur MARKSMAN S 33K",
        "SLIPSTREAM Wireless et Bluetooth"
      ],
      specs: [
        { label: "Type", value: "SLIPSTREAM + Bluetooth" },
        { label: "Capteur", value: "MARKSMAN S 33K" },
        { label: "Vitesse", value: "750 IPS / 50G" },
        { label: "Autonomie", value: "jusqu'? 150 h / 500 h" },
        { label: "Switches", value: "optiques 100M clics" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-9314014-ww/scimitar-elite-wireless-se-mmo-gaming-mouse-gun-metal-ch-9314014-ww"
        }
      ]
    },
    "Corsair Scimitar Elite RGB": {
      image: "./assets/mice/corsair-scimitar-elite-rgb.webp",
      summary: "La Scimitar RGB Elite reste une r?f?rence MMO/MOBA chez Corsair. Son atout principal est son bloc lateral de 12 boutons coulissant, qui permet d'ajuster la position du pavet numerique pour les gros volumes de binds et de macros.",
      highlights: [
        "12 boutons lat?raux repositionnables",
        "Pens?e pour MMO / MOBA",
        "Compatible iCUE"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Boutons", value: "17 programmables" },
        { label: "Capteur", value: "18 000 DPI" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-9304211-na/scimitar-rgb-elite-optical-moba-mmo-gaming-mouse-ch-9304211-na"
        }
      ]
    },
    "Corsair Harpoon Pro RGB": {
      image: "./assets/mice/corsair-harpoon-pro-rgb.webp",
      summary: "La Harpoon RGB Pro est une souris gaming filaire simple et accessible chez Corsair. Elle vise les joueurs qui veulent un ch?ssis l?ger, une forme droite facile ? prendre en main et l'essentiel des fonctions gaming sans aller sur un tarif premium.",
      highlights: [
        "Format compact et l?ger",
        "RGB int?gr? a iCUE",
        "Positionnement entr?e / milieu de gamme"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Capteur", value: "12 000 DPI" },
        { label: "Poids", value: "environ 85 g" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-9301111-na/harpoon-rgb-pro-fps-moba-gaming-mouse-ch-9301111-na"
        }
      ]
    },
    "Corsair Scimitar Pro RGB": {
      image: "./assets/mice/corsair-scimitar-pro-rgb.webp",
      summary: "La Scimitar Pro RGB est une ancienne declinaison MMO de Corsair, d?j? centr?e sur un nombre ?lev? de commandes lat?rales. Elle reste pertinente comme fiche historique pour les utilisateurs qui veulent comparer les g?n?rations de la gamme Scimitar.",
      highlights: [
        "Pavet lateral de 12 boutons",
        "R?f?rence historique MMO",
        "Personnalisation via iCUE"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Usage", value: "MMO / MOBA" },
        { label: "Statut", value: "ancienne g?n?ration" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-9304111-na/scimitar-pro-rgb-optical-moba-mmo-gaming-mouse-a-black-ch-9304111-na"
        }
      ]
    },
    "Corsair Scimitar RGB": {
      image: "./assets/mice/corsair-scimitar-rgb.webp",
      summary: "La Scimitar RGB correspond aux premi?res iterations de la souris MMO de Corsair. On retrouve d?j? l'id?e centrale de la s?rie : un grand nombre de boutons lat?raux et une ergonomie pens?e pour les jeux qui demandent beaucoup de raccourcis.",
      highlights: [
        "Ancienne base de la gamme Scimitar",
        "Beaucoup de commandes sous le pouce",
        "Orientation MMO"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Statut", value: "legacy" },
        { label: "Famille", value: "Scimitar" }
      ],
      sources: [
        {
          label: "Fiche officielle Corsair",
          url: "https://www.corsair.com/us/en/p/gaming-mouse/ch-9000231-na/scimitar-rgb-optical-moba-mmo-gaming-mouse-a-black-ch-9000231-na"
        }
      ]
    },
    "Corsair Sabre RGB Pro": {
      image: "./assets/mice/corsair-sabre-rgb-pro.webp",
    },
    "Corsair Sabre RGB Pro Wireless": {
      image: "./assets/mice/corsair-sabre-rgb-pro-wireless.webp",
    },
    "Corsair Katar Pro": {
      image: "./assets/mice/corsair-katar-pro.webp",
    },
    "Corsair Katar Pro Wireless": {
      image: "./assets/mice/corsair-katar-pro-wireless.webp",
    },
    "Corsair Dark Core RGB Pro": {
      image: "./assets/mice/corsair-dark-core-rgb-pro.webp",
    },
    "Corsair Dark Core RGB Pro SE": {
      image: "./assets/mice/corsair-dark-core-rgb-pro-se.webp",
    },
    "Corsair Ironclaw RGB": {
      image: "./assets/mice/corsair-ironclaw-rgb.webp",
    },
    "Corsair Ironclaw Wireless": {
      image: "./assets/mice/corsair-ironclaw-wireless.webp",
    },
    "Corsair Nightsword RGB": {
      image: "./assets/mice/corsair-nightsword-rgb.webp",
    },
    "SteelSeries Aerox 9 Wireless": {
      image: "./assets/mice/steelseries-aerox-9-wireless.webp",
      summary: "L'Aerox 9 Wireless combine un ch?ssis perc? ultra l?ger avec une vraie logique MMO gr?ce a son bloc de 12 boutons lat?raux. C'est une souris faite pour ceux qui veulent beaucoup de commandes sans revenir a un poids massif.",
      highlights: [
        "18 boutons programmables",
        "Poids de 89 g",
        "AquaBarrier IP54",
        "Quantum 2.0 Wireless + Bluetooth"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth" },
        { label: "Poids", value: "89 g" },
        { label: "Boutons", value: "18" },
        { label: "Autonomie", value: "jusqu'? 180 h" },
        { label: "RGB", value: "3 zones" }
      ],
      sources: [
        {
          label: "Fiche officielle SteelSeries",
          url: "https://steelseries.com/gaming-mice/aerox-9-wireless"
        }
      ]
    },
    "SteelSeries Aerox 3 / Aerox 3 Wireless": {
      image: "./assets/mice/steelseries-aerox-3-aerox-3-wireless.webp",
      summary: "Dans la famille Aerox 3, SteelSeries mise sur un format ultra l?ger et rapide, d?clin?e en version filaire et sans fil. C'est une proposition tr?s mobile, tr?s vive et clairement orient?e FPS / jeu rapide.",
      highlights: [
        "Aerox 3 filaire a 59 g",
        "Aerox 3 Wireless a 68 g",
        "AquaBarrier IP54",
        "Quantum 2.0 sur la version sans fil"
      ],
      specs: [
        { label: "Type", value: "Filaire ou 2.4 GHz + Bluetooth" },
        { label: "Poids", value: "59 g / 68 g" },
        { label: "Boutons", value: "6" },
        { label: "Autonomie", value: "jusqu'? 200 h en sans fil" },
        { label: "RGB", value: "3 zones" }
      ],
      sources: [
        {
          label: "Famille officielle Aerox",
          url: "https://steelseries.com/aerox"
        }
      ]
    },
    "SteelSeries Rival 3 Wireless Gen 2": {
      image: "./assets/mice/steelseries-rival-3-wireless-gen-2.webp",
      summary: "La Rival 3 Wireless Gen 2 reprend la formule d'une souris gaming accessible mais la modernise nettement. SteelSeries insiste ici sur la rapidit? de clic, la robustesse et une autonomie tr?s large pour une souris pens?e comme porte d'entr?e s?rieuse dans le gaming PC.",
      highlights: [
        "TrueMove Air 18K",
        "2.4 GHz et Bluetooth 5.0",
        "60 millions de clics",
        "Autonomie annoncee jusqu'? 450 h en Bluetooth"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth" },
        { label: "Capteur", value: "TrueMove Air 18K" },
        { label: "Latence clic", value: "1.9 ms" },
        { label: "Autonomie", value: "45 a 200 h / jusqu'? 450 h" },
        { label: "Poids", value: "95 a 106 g" }
      ],
      sources: [
        {
          label: "Annonce officielle SteelSeries",
          url: "https://steelseries.com/press/153-steelseries-launches-the-rival-3-gen-2-series"
        }
      ]
    },
    "SteelSeries Prime": {
      image: "./assets/mice/steelseries-prime.webp",
      summary: "La Prime est la souris comp?tition la plus directe de SteelSeries, avec un ch?ssis simple, une ergonomie sobre et un positionnement taille pour l'esport. Elle cherche surtout la pr?cision et la fiabilit? plut?t que la polyvalence ou les gadgets.",
      highlights: [
        "Shape comp?tition droitier",
        "Optical magnetic switches Prestige OM",
        "Approche esport epuree"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Capteur", value: "TrueMove Pro" },
        { label: "Poids", value: "69 g" }
      ],
      sources: [
        {
          label: "Fiche officielle SteelSeries",
          url: "https://steelseries.com/gaming-mice/prime"
        }
      ]
    },
    "SteelSeries Sensei / Sensei 310": {
      image: "./assets/mice/steelseries-sensei-sensei-310.webp",
      summary: "Sous cette entr?e, le Sensei 310 reste la r?f?rence la plus identifiable : une souris ambidextre tr?s orient?e esport et sym?trie, avec un vrai souci de tracking pur et une sensation de clic nette.",
      highlights: [
        "Design ambidextre",
        "Split-trigger buttons",
        "Switches Omron 50M",
        "Vise clairement l'esport"
      ],
      specs: [
        { label: "Type", value: "Filaire" },
        { label: "Capteur", value: "1-to-1 esports sensor" },
        { label: "Switches", value: "Omron 50M" },
        { label: "Forme", value: "ambidextre" },
        { label: "Grip", value: "silicone side grips" }
      ],
      sources: [
        {
          label: "Fiche officielle SteelSeries",
          url: "https://steelseries.com/gaming-mice/sensei-310"
        }
      ]
    },
    "SteelSeries Kana v2": {
      image: "./assets/mice/steelseries-kana-v2.webp",
      summary: "La Kana v2 est une souris SteelSeries d'une g?n?ration plus ancienne, aujourd'hui surtout int?ressante comme r?f?rence historique. Le support officiel la classe parmi les anciens produits, ce qui en fait une fiche de patrimoine pour les amateurs de shapes classiques.",
      highlights: [
        "R?f?rence historique SteelSeries",
        "Produit legacy",
        "Format gaming classique"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Statut", value: "legacy" },
        { label: "Famille", value: "Kana" }
      ],
      sources: [
        {
          label: "Support officiel SteelSeries",
          url: "https://support.steelseries.com/hc/en-us/articles/10710796259853-Where-can-I-find-the-software-for-my-old-SteelSeries-device"
        }
      ]
    },
    "SteelSeries Rival 710 / Rival 3 / Rival 5": {
      image: "./assets/mice/steelseries-rival-710-rival-3-rival-5.webp",
      summary: "Cette fiche regroupe plusieurs g?n?rations et philosophies de la famille Rival chez SteelSeries. On y trouve ? la fois des mod?les plus anciens ou haut de gamme comme la Rival 710, une entr?e de gamme tr?s populaire avec la Rival 3, et une version plus polyvalente ? nombreux boutons avec la Rival 5.",
      highlights: [
        "Famille Rival multi-g?n?rations",
        "Rival 3 tr?s populaire en entr?e de gamme",
        "Rival 5 plus polyvalente",
        "Rival 710 plus ancienne et plus premium"
      ],
      specs: [
        { label: "Type", value: "fiches multiples" },
        { label: "Famille", value: "Rival" },
        { label: "Usage", value: "FPS / polyvalent / gaming" }
      ],
      sources: [
        {
          label: "Fiche officielle SteelSeries Rival 710",
          url: "https://steelseries.com/es-us/gaming-mice/rival-710"
        },
        {
          label: "Fiche officielle SteelSeries Rival 3",
          url: "https://steelseries.com/gaming-mice/rival-3"
        },
        {
          label: "Fiche officielle SteelSeries Rival 5",
          url: "https://steelseries.com/gaming-mice/rival-5"
        }
      ]
    },
    "SteelSeries Rival 100": {
      image: "./assets/mice/steelseries-rival-100-cutout.png",
    },
    "SteelSeries Rival 110": {
      image: "./assets/mice/steelseries-rival-110.webp",
    },
    "SteelSeries Rival 300": {
      image: "./assets/mice/steelseries-rival-300.webp",
    },
    "SteelSeries Rival 600": {
      image: "./assets/mice/steelseries-rival-600.webp",
    },
    "SteelSeries Rival 650 Wireless": {
      image: "./assets/mice/steelseries-rival-650-wireless.webp",
    },
    "SteelSeries Sensei Ten": {
      image: "./assets/mice/steelseries-sensei-ten.webp",
    },
    "SteelSeries Sensei Raw": {
      image: "./assets/mice/steelseries-sensei-raw.webp",
    },
    "SteelSeries Prime Wireless": {
      image: "./assets/mice/steelseries-prime-wireless.webp",
    },
    "Asus ROG Gladius II Core": {
      image: "./assets/mice/asus-rog-gladius-ii-core.webp",
      summary: "La ROG Gladius II Core conserve la silhouette classique pour droitier Gladius dans une version plus accessible et plus l?g?re. ASUS la positionne comme une souris gaming simple, robuste et facile ? personnaliser gr?ce a ses sockets de switch.",
      highlights: [
        "Capteur 6 200 DPI",
        "Push-fit switch sockets",
        "Aura Sync RGB",
        "20% plus l?g?re que la Gladius d'origine"
      ],
      specs: [
        { label: "Type", value: "Filaire" },
        { label: "Capteur", value: "PAW3327 / 6 200 DPI" },
        { label: "Vitesse", value: "220 IPS / 30G" },
        { label: "Forme", value: "droitier" },
        { label: "Usage", value: "gaming g?n?raliste" }
      ],
      sources: [
        {
          label: "Fiche officielle ROG",
          url: "https://rog.asus.com/us/mice-mouse-pads/mice/ergonomic-right-handed/rog-gladius-ii-core-model/"
        }
      ]
    },
    "Asus ROG Strix Impact III Wireless": {
      image: "./assets/mice/asus-rog-strix-impact-iii-wireless.webp",
      summary: "La Strix Impact III Wireless cherche la performance mobile : une souris compacte, tr?s l?g?re et aliment?e par pile, faite pour jouer partout sans tra?ner un gros ch?ssis. ASUS la place clairement comme une souris nomade de pr?cision.",
      highlights: [
        "57 g hors pile et r?cepteur",
        "AimPoint 36K",
        "SpeedNova + Bluetooth",
        "Fonctionne avec AA ou AAA"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth" },
        { label: "Poids", value: "57 g hors pile" },
        { label: "Capteur", value: "36 000 DPI" },
        { label: "Vitesse", value: "650 IPS / 50G" },
        { label: "Autonomie", value: "jusqu'? 618 h en Bluetooth" }
      ],
      sources: [
        {
          label: "Fiche officielle ROG",
          url: "https://rog.asus.com/us/mice-mouse-pads/mice/wireless/rog-strix-impact-iii-wireless/"
        }
      ]
    },
    "Asus ROG Harpe Ace Aim Lab Edition": {
      image: "./assets/mice/asus-rog-harpe-ace-aim-lab-edition.webp",
      summary: "La Harpe Ace Aim Lab Edition est une souris esport haut de gamme co-d?velopp?e avec des joueurs pros et li?e ? l'?cosyst?me Aim Lab. Tout est pens? pour la stabilit? du geste et le r?glage fin de la souris selon le profil du joueur.",
      highlights: [
        "54 g",
        "AimPoint 36K",
        "Tri-mode connectivity",
        "Optimiseur Aim Lab"
      ],
      specs: [
        { label: "Type", value: "USB + 2.4 GHz + Bluetooth" },
        { label: "Poids", value: "54 g" },
        { label: "Capteur", value: "36 000 DPI" },
        { label: "Boutons", value: "5 programmables" },
        { label: "Forme", value: "co-d?velopp?e avec des pros" }
      ],
      sources: [
        {
          label: "Fiche officielle ROG",
          url: "https://rog.asus.com/us/mice-mouse-pads/mice/ambidextrous/rog-harpe-ace-aim-lab-edition-model/"
        }
      ]
    },
    "Asus ROG Harpe Ace Mini": {
      image: "./assets/mice/asus-rog-harpe-ace-mini.webp",
      summary: "La Harpe Ace Mini reprend l'esprit Harpe Ace dans un gabarit plus court et plus bas. ASUS l'oriente vers les joueurs qui veulent une vraie souris comp?titive mais dans un format plus nerveux et plus compatible avec les prises fingertip ou claw fines.",
      highlights: [
        "49 g",
        "Tri-mode connectivity",
        "Onboard control",
        "Shell plus court et hump plus bas"
      ],
      specs: [
        { label: "Type", value: "USB + 2.4 GHz + Bluetooth" },
        { label: "Poids", value: "49 g" },
        { label: "Forme", value: "mini esport" },
        { label: "Connexion", value: "tri-mode" },
        { label: "Usage", value: "fingertip / claw" }
      ],
      sources: [
        {
          label: "Fiche officielle ROG",
          url: "https://rog.asus.com/us/mice-mouse-pads/mice/ambidextrous/rog-harpe-ace-mini/"
        }
      ]
    },
    "Asus TUF M3": {
      image: "./assets/mice/asus-tuf-m3.webp",
    },
    "Asus ROG Gladius III": {
      image: "./assets/mice/asus-rog-gladius-iii.webp",
    },
    "Asus ROG Keris Wireless": {
      image: "./assets/mice/asus-rog-keris-wireless.webp",
    },
    "Asus ROG Chakram": {
      image: "./assets/mice/asus-rog-chakram.webp",
    },
    "Asus ROG Spatha": {
      image: "./assets/mice/asus-rog-spatha.webp",
    },
    "Glorious Model O": {
      image: "./assets/mice/glorious-model-o.webp",
      summary: "Le Model O est l'une des souris qui a popularis? la vague ultra l?g?re chez Glorious. Son shape sym?trique tr?s simple, sa coque perc?e et sa glisse facile en ont fait une r?f?rence pour les joueurs FPS cherchant un ressenti rapide et a?r?.",
      highlights: [
        "Shape sym?trique tr?s populaire",
        "Positionnement ultra l?ger",
        "Famille phare Glorious"
      ],
      specs: [
        { label: "Type", value: "version filaire ou sans fil selon declinaison" },
        { label: "Usage", value: "FPS / jeu rapide" },
        { label: "Famille", value: "Model O" }
      ],
      sources: [
        {
          label: "Collection officielle Glorious Model O",
          url: "https://www.gloriousgaming.com/collections/model-o-mice"
        }
      ]
    },
    "Glorious Model O3 Wireless": {
      image: "./assets/mice/glorious-model-o3-wireless.webp",
      summary: "La r?f?rence 'Model O3 Wireless' semble renvoyer a une ?volution r?cente de la famille Model O sans fil. Le catalogue officiel Glorious met surtout en avant la continuite du shape sym?trique l?ger et la recherche de performance sans fil dans cette lign?e.",
      highlights: [
        "R?f?rence de catalogue ? rapprocher de la famille Model O",
        "Sans fil",
        "Format sym?trique l?ger"
      ],
      specs: [
        { label: "Type", value: "sans fil" },
        { label: "Statut", value: "nom commercial ? confirmer" },
        { label: "Famille", value: "Model O" }
      ],
      sources: [
        {
          label: "Collection officielle Glorious Model O",
          url: "https://www.gloriousgaming.com/collections/model-o-mice"
        }
      ]
    },
    "Glorious Model D": {
      image: "./assets/mice/glorious-model-d-cutout.png",
      summary: "Le Model D transpose la recette Glorious dans un ch?ssis ergonomique pour droitier. Il s'adresse aux joueurs qui veulent une souris tr?s l?g?re mais plus remplie dans la paume qu'un shape sym?trique classique.",
      highlights: [
        "Forme ergonomique pour droitier",
        "Positionnement ultra l?ger",
        "Oriente FPS / tracking"
      ],
      specs: [
        { label: "Type", value: "filaire selon fiche de base" },
        { label: "Usage", value: "gaming comp?titif" },
        { label: "Famille", value: "Model D" }
      ],
      sources: [
        {
          label: "Fiche officielle Glorious",
          url: "https://www.gloriousgaming.com/products/glorious-model-d-matte-black"
        }
      ]
    },
    "Glorious Model D3 Wireless": {
      image: "./assets/mice/glorious-model-d3-wireless.webp",
      summary: "La r?f?rence 'Model D3 Wireless' est rattach?e ici ? la famille Model D sans fil de Glorious. Comme pour le Model O3, le nom de la liste semble viser une ?volution r?cente du shape ergonomique l?ger de la marque.",
      highlights: [
        "R?f?rence ? confirmer dans la famille Model D",
        "Sans fil",
        "Shape ergonomique pour droitier"
      ],
      specs: [
        { label: "Type", value: "sans fil" },
        { label: "Statut", value: "nom commercial ? confirmer" },
        { label: "Famille", value: "Model D" }
      ],
      sources: [
        {
          label: "Collection officielle Glorious Model D",
          url: "https://www.gloriousgaming.com/en-es/collections/model-d-mice"
        }
      ]
    },
    "Glorious Model O Wireless": {
      image: "./assets/mice/glorious-model-o-wireless.webp",
    },
    "Glorious Model O Minus": {
      image: "./assets/mice/glorious-model-o-minus.webp",
    },
    "Glorious Model D Minus": {
      image: "./assets/mice/glorious-model-d-minus.webp",
    },
    "Glorious Model I": {
      image: "./assets/mice/glorious-model-i.webp",
    },
    "Glorious Series One Pro": {
      image: "./assets/mice/glorious-series-one-pro.webp",
    },
    "Endgame Gear OP1 8K": {
      image: "./assets/mice/endgame-gear-op1-8k.webp",
      summary: "L'OP1 8K fait partie des souris Endgame Gear les plus agressives en termes de performances pures. Son petit format, sa latence tr?s basse et son polling 8K en font une fiche tr?s orient?e joueur comp?titif qui privil?gie la r?activit? avant tout.",
      highlights: [
        "Polling 8K",
        "Petit ch?ssis comp?tition",
        "Orientation FPS"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Polling", value: "8 000 Hz" },
        { label: "Famille", value: "OP1" }
      ],
      sources: [
        {
          label: "Fiche officielle Endgame Gear",
          url: "https://www.endgamegear.com/en-us/gaming-mice/op1-8k-v2"
        }
      ]
    },
    "Endgame Gear XM2w": {
      image: "./assets/mice/endgame-gear-xm2w.webp",
      summary: "La XM2w est la declinaison sans fil de la fameuse shape XM chez Endgame Gear. Elle conserve une philosophie comp?tition tr?s marqu?e, avec une coque compacte, une bosse arriere appuyee et un vrai parti pris pour le claw grip.",
      highlights: [
        "Shape culte pour claw grip",
        "Version sans fil",
        "Orientation comp?tition"
      ],
      specs: [
        { label: "Type", value: "Sans fil" },
        { label: "Famille", value: "XM" },
        { label: "Usage", value: "FPS / comp?tition" }
      ],
      sources: [
        {
          label: "Fiche officielle Endgame Gear",
          url: "https://www.endgamegear.com/en-us/gaming-mice/xm2w-4k-v2"
        }
      ]
    },
    "Endgame Gear XM1": {
      image: "./assets/mice/endgame-gear-xm1.webp",
    },
    "Endgame Gear XM1r": {
      image: "./assets/mice/endgame-gear-xm1r.webp",
    },
    "Endgame Gear OP1": {
      image: "./assets/mice/endgame-gear-op1.webp",
    },
    "Microsoft Surface Mobile Mouse": {
      image: "./assets/mice/microsoft-surface-mobile-mouse.webp",
      summary: "La Surface Mobile Mouse est une souris bureautique tr?s simple, fine et facile ? transporter. Microsoft la positionne clairement comme une compagne de travail l?g?re pour Surface et pour tous ceux qui veulent une souris Bluetooth sans encombrement.",
      highlights: [
        "Design l?ger et discret",
        "BlueTrack Technology",
        "Bluetooth sans dongle",
        "Pens?e pour la mobilit?"
      ],
      specs: [
        { label: "Type", value: "Bluetooth 4.x" },
        { label: "Poids", value: "78 g avec piles" },
        { label: "Autonomie", value: "jusqu'? 12 mois" },
        { label: "Alimentation", value: "2 piles AAA" },
        { label: "Technologie", value: "BlueTrack" }
      ],
      sources: [
        {
          label: "Microsoft Store",
          url: "https://www.microsoft.com/en-us/p/surface-mobile-mouse/8xgt2sclg6kg"
        }
      ]
    },
    "Microsoft Pro Intellimouse": {
      image: "./assets/mice/microsoft-pro-intellimouse-cutout.png",
      summary: "La Pro Intellimouse reprend l'h?ritage de la c?l?bre IntelliMouse en le modernisant pour le travail et le jeu. Microsoft la pr?sente comme une souris filaire haute performance avec un vrai accent sur le confort, la pr?cision et la personnalisation.",
      highlights: [
        "Retour d'une forme iconique",
        "Positionnement travail + gaming",
        "Capteur moderne et boutons personnalisables"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Usage", value: "travail et jeu" },
        { label: "Famille", value: "IntelliMouse" }
      ],
      sources: [
        {
          label: "Fiche officielle Microsoft",
          url: "https://www.microsoft.com/da-DK/p/microsoft-pro-intellimouse/8rs0hww7dhnk"
        }
      ]
    },
    "Microsoft Wireless IntelliMouse Explorer": {
      image: "./assets/mice/microsoft-wireless-intellimouse-explorer.webp",
      summary: "La Wireless IntelliMouse Explorer est une tr?s ancienne r?f?rence Microsoft, importante pour l'histoire des souris sans fil grand public. Microsoft la pr?sentait ? l'?poque comme sa premi?re souris optique sans fil avec une vraie emphase sur le confort et l'autonomie.",
      highlights: [
        "R?f?rence historique de 2001",
        "Premiere g?n?ration sans fil Microsoft",
        "Importance patrimoniale"
      ],
      specs: [
        { label: "Type", value: "sans fil RF" },
        { label: "Statut", value: "legacy" },
        { label: "Famille", value: "IntelliMouse Explorer" }
      ],
      sources: [
        {
          label: "Annonce officielle Microsoft",
          url: "https://news.microsoft.com/source/2001/09/25/new-microsoft-mouse-family-unleashes-wireless-intellimouse-explorer/"
        }
      ]
    },
    "Microsoft Basic Optical Mouse": {
      image: "./assets/mice/microsoft-basic-optical-mouse.webp",
    },
    "Microsoft Classic Intellimouse": {
      image: "./assets/mice/microsoft-classic-intellimouse.webp",
    },
    "Microsoft Arc Mouse": {
      image: "./assets/mice/microsoft-arc-mouse.webp",
    },
    "Roccat Kone XP Air": {
      image: "./assets/mice/roccat-kone-xp-air.webp",
      summary: "La Kone XP Air est la declinaison sans fil tr?s complete de la famille Kone. Elle insiste sur la personnalisation, l'?clairage RGB marque et un grand nombre de commandes, tout en gardant le confort de la forme ergonomique historique de Roccat.",
      highlights: [
        "Sans fil",
        "Grand nombre de commandes",
        "RGB tr?s present",
        "Shape Kone droitier"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth + dock" },
        { label: "Famille", value: "Kone XP" },
        { label: "Usage", value: "gaming polyvalent" }
      ],
      sources: [
        {
          label: "Fiche officielle Turtle Beach",
          url: "https://www.turtlebeach.com/products/kone-xp-air-mouse"
        }
      ]
    },
    "Roccat Kone Pro": {
      image: "./assets/mice/roccat-kone-pro.webp",
      summary: "La Kone Pro modernise la grande forme pour droitier de Roccat dans une execution beaucoup plus l?g?re que les anciennes Kone. Elle s'adresse aux joueurs qui aiment les ergonomies pleines mais ne veulent plus d'une souris lourde.",
      highlights: [
        "Shape Kone ergonomique revisitee",
        "Positionnement gaming l?ger",
        "Transition entre l'ancienne et la nouvelle ?poque Roccat"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Famille", value: "Kone" },
        { label: "Usage", value: "gaming droitier" }
      ],
      sources: [
        {
          label: "Fiche officielle Turtle Beach",
          url: "https://hk.turtlebeach.com/products/roccat-kone-pro-mouse"
        }
      ]
    },
    "Roccat Kain 202 Aimo": {
      image: "./assets/mice/roccat-kain-202-aimo.webp",
      summary: "La Kain 202 Aimo fait partie des anciennes souris sans fil gaming de Roccat, aujourd'hui rattach?es au support legacy de Turtle Beach. Elle se distingue surtout par sa forme pour droitier confortable et son positionnement gaming g?n?raliste avec ?clairage AIMO.",
      highlights: [
        "Ancienne souris sans fil Roccat",
        "Eclairage AIMO",
        "Support legacy Turtle Beach"
      ],
      specs: [
        { label: "Type", value: "sans fil" },
        { label: "Statut", value: "legacy" },
        { label: "Famille", value: "Kain" }
      ],
      sources: [
        {
          label: "Support legacy Turtle Beach / Roccat",
          url: "https://support.turtlebeach.com/s/gaming-mice-legacy?language=pt_BR"
        }
      ]
    },
    "Roccat Lua": {
      image: "./assets/mice/roccat-lua.webp",
      summary: "La Roccat Lua est une souris gaming compacte d'une ancienne g?n?ration, aujourd'hui surtout document?e via ses notices et supports archives. Elle reste int?ressante comme petite r?f?rence historique pour les joueurs qui suivaient les souris budget de Roccat.",
      highlights: [
        "Ancien mod?le compact Roccat",
        "R?f?rence budget historique",
        "Documentation archivee"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Statut", value: "legacy" },
        { label: "Famille", value: "Lua" }
      ],
      sources: [
        {
          label: "Guide officiel Roccat Lua",
          url: "https://cdn.turtlebeach.com/device/qig/lua/lua_41-9339-v1.pdf"
        }
      ]
    },
    "Roccat Kone AIMO": {
      image: "./assets/mice/roccat-kone-aimo.webp",
    },
    "Roccat Kone Pure Ultra": {
      image: "./assets/mice/roccat-kone-pure-ultra.webp",
    },
    "Roccat Kone Burst Pro": {
      image: "./assets/mice/roccat-kone-burst-pro.webp",
    },
    "Roccat Kova AIMO": {
      image: "./assets/mice/roccat-kova-aimo.webp",
    },
    "Roccat Nyth MMO": {
      image: "./assets/mice/roccat-nyth-mmo.webp",
    },
    "Cooler Master MM311": {
      image: "./assets/mice/cooler-master-mm311.webp",
      summary: "La MM311 est une souris wireless assez directe dans son approche : l?g?re, simple, avec un capteur correct et une coque visant le rapport performance / prix. Elle s'adresse aux joueurs qui veulent une souris sans fil sans trop se compliquer la vie.",
      highlights: [
        "77 g avec batterie",
        "Capteur 10 000 DPI",
        "2.4 GHz sans fil",
        "Patins PTFE"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz wireless" },
        { label: "Poids", value: "77 g avec batterie" },
        { label: "Capteur", value: "10 000 DPI" },
        { label: "Glisse", value: "PTFE" },
        { label: "Positionnement", value: "gaming l?ger" }
      ],
      sources: [
        {
          label: "Fiche officielle Cooler Master",
          url: "https://www.coolermaster.com/en-us/products/mm311/"
        }
      ]
    },
    "Cooler Master MM520": {
      image: "./assets/mice/cooler-master-mm520.webp",
      summary: "La MM520 est une souris Cooler Master clairement pens?e pour les adeptes du claw grip. Son shape tr?s particulier avec repose-annulaire marque est son principal argument, a destination des joueurs qui n'accrochent pas aux formes plus universelles.",
      highlights: [
        "Shape dedie au claw grip",
        "Repose-annulaire int?gr?",
        "R?f?rence atypique dans le catalogue gaming"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Usage", value: "gaming claw grip" },
        { label: "Famille", value: "MasterMouse" }
      ],
      sources: [
        {
          label: "Fiche officielle Cooler Master",
          url: "https://www.coolermaster.com/es-global/products/mastermouse-mm520/"
        }
      ]
    },
    "Cooler Master MM720": {
      image: "./assets/mice/cooler-master-mm720.webp",
      summary: "La MM720 remet au go?t du jour un shape l?gende chez Cooler Master dans une execution tr?s l?g?re. Son design tr?s court, large et orient?e claw/palm partiel lui donne un ressenti tr?s a part dans le paysage actuel.",
      highlights: [
        "Shape culte modernis?e",
        "Souris tr?s l?g?re",
        "Orientation claw / palm partiel"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Poids", value: "ultra l?ger" },
        { label: "Usage", value: "gaming" }
      ],
      sources: [
        {
          label: "Fiche officielle Cooler Master",
          url: "https://www.coolermaster.com/en-us/products/mm720/"
        }
      ]
    },
    "Cooler Master MM710": {
      image: "./assets/mice/cooler-master-mm710.webp",
    },
    "Cooler Master MM711": {
      image: "./assets/mice/cooler-master-mm711.webp",
    },
    "Cooler Master MM731": {
      image: "./assets/mice/cooler-master-mm731.webp",
    },
    "Keychron M7 8K": {
      image: "./assets/mice/keychron-m7-8k.webp",
      summary: "La Keychron M7 8K cherche ? couvrir ? la fois travail et jeu avec une forme ergonomique l?g?rement plus soutenue que les souris ultrafines. Elle mise surtout sur un tr?s bon capteur, du tri-mode et une personnalisation web tr?s pratique.",
      highlights: [
        "66 g",
        "PixArt 3950 sur la version 8K",
        "2.4 GHz, Bluetooth et filaire",
        "Launcher web et m?moire embarquee"
      ],
      specs: [
        { label: "Type", value: "USB + 2.4 GHz + Bluetooth" },
        { label: "Poids", value: "66 g" },
        { label: "Capteur", value: "PAW 3950 / 30 000 DPI" },
        { label: "Polling", value: "jusqu'? 8 000 Hz" },
        { label: "Autonomie", value: "jusqu'? 140 h en Bluetooth" }
      ],
      sources: [
        {
          label: "Fiche officielle Keychron",
          url: "https://www.keychron.com/products/keychron-m7-wireless-mouse"
        }
      ]
    },
    "Keychron M3 Mini V2 8K": {
      image: "./assets/mice/keychron-m3-mini-v2-8k.webp",
      summary: "La M3 Mini V2 8K reprend la recette Keychron en version plus compacte et encore plus l?g?re. Elle vise autant les joueurs qui veulent un petit ch?ssis r?actif que ceux qui cherchent une souris transportable mais tr?s s?rieuse sur le plan technique.",
      highlights: [
        "55 g",
        "Version 8K avec PixArt 3950",
        "2.4 GHz, Bluetooth et filaire",
        "Launcher web et profilage simple"
      ],
      specs: [
        { label: "Type", value: "USB + 2.4 GHz + Bluetooth" },
        { label: "Poids", value: "55 g" },
        { label: "Capteur", value: "PixArt 3950 sur 8K" },
        { label: "Polling", value: "jusqu'? 8 000 Hz" },
        { label: "Autonomie", value: "jusqu'? 140 h en Bluetooth" }
      ],
      sources: [
        {
          label: "Fiche officielle Keychron",
          url: "https://www.keychron.com/products/keychron-m3-mini-wireless-mouse"
        }
      ]
    },
    "Turtle Beach Kone II Air": {
      image: "./assets/mice/turtle-beach-kone-ii-air.webp",
      summary: "La Kone II Air correspond ? la version la plus r?cente et la plus premium de la famille ergonomique Kone sous Turtle Beach. Elle garde l'esprit des anciennes Kone mais avec une fiche technique moderne, une autonomie solide et davantage de personnalisation.",
      highlights: [
        "Evolution r?cente de la lign?e Kone",
        "Sans fil premium",
        "Ergonomie pour droitier marqu?e"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth + USB" },
        { label: "Famille", value: "Kone II" },
        { label: "Usage", value: "gaming polyvalent" }
      ],
      sources: [
        {
          label: "Fiche officielle Turtle Beach",
          url: "https://www.turtlebeach.com/products/kone-ii-air-mouse"
        }
      ]
    },
    "Turtle Beach Kone XP Air": {
      image: "./assets/mice/turtle-beach-kone-xp-air.webp",
      summary: "Sous branding Turtle Beach, la Kone XP Air garde l'ADN tr?s d?monstratif et riche en commandes de la souris auparavant connue chez Roccat. Elle vise les joueurs qui veulent une ergonomie large, beaucoup de raccourcis et un rendu RGB tr?s visible.",
      highlights: [
        "Nombreuses commandes accessibles",
        "RGB marque",
        "Format ergonomique pour droitier"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + Bluetooth + dock" },
        { label: "Famille", value: "Kone XP" },
        { label: "Usage", value: "gaming riche en contr?les" }
      ],
      sources: [
        {
          label: "Fiche officielle Turtle Beach",
          url: "https://www.turtlebeach.com/products/kone-xp-air-mouse"
        }
      ]
    },
    "Zowie EC1": {
      image: "./assets/mice/zowie-ec1.webp",
    },
    "Zowie EC2": {
      image: "./assets/mice/zowie-ec2.webp",
    },
    "Zowie EC3": {
      image: "./assets/mice/zowie-ec3.webp",
    },
    "Zowie FK1": {
      image: "./assets/mice/zowie-fk1.webp",
    },
    "Zowie FK2": {
      image: "./assets/mice/zowie-fk2.webp",
    },
    "Zowie FK2-C": {
      image: "./assets/mice/zowie-fk2-c.webp",
    },
    "Zowie ZA11": {
      image: "./assets/mice/zowie-za11.webp",
    },
    "Zowie ZA12": {
      image: "./assets/mice/zowie-za12.webp",
    },
    "Zowie ZA13": {
      image: "./assets/mice/zowie-za13.webp",
    },
    "HyperX Pulsefire series": {
      image: "./assets/mice/hyperx-pulsefire-series.webp",
      summary: "La s?rie Pulsefire regroupe l'essentiel des souris gaming HyperX, avec des lignes qui couvrent autant l'ultra l?ger que la modularit? ou le sans fil comp?titif. Le catalogue actuel montre une famille devenue assez large et clairement orient?e performance.",
      highlights: [
        "Famille gaming complete",
        "Versions filaires et sans fil",
        "Positionnement comp?tition moderne"
      ],
      specs: [
        { label: "Type", value: "s?ries multiples" },
        { label: "Usage", value: "FPS / gaming g?n?raliste" },
        { label: "Famille", value: "Pulsefire" }
      ],
      sources: [
        {
          label: "Collection officielle HyperX",
          url: "https://hyperx.com/collections/gaming-mice"
        }
      ]
    },
    "HyperX Pulsefire Core": {
      image: "./assets/mice/hyperx-pulsefire-core.webp",
    },
    "HyperX Pulsefire Surge": {
      image: "./assets/mice/hyperx-pulsefire-surge.webp",
    },
    "HyperX Pulsefire Dart": {
      image: "./assets/mice/hyperx-pulsefire-dart.webp",
    },
    "HyperX Pulsefire Raid": {
      image: "./assets/mice/hyperx-pulsefire-raid.webp",
    },
    "Redragon M612 8000 DPI": {
      image: "./assets/mice/redragon-m612-8000-dpi.webp",
      summary: "La M612, aussi appelee Predator M612 chez Redragon, est une souris gaming filaire tr?s agressive sur le rapport fonctions/prix. La marque met en avant un capteur 8 000 DPI, 11 boutons programmables et une personnalisation logicielle pouss?e pour un budget contenu.",
      highlights: [
        "11 boutons programmables",
        "Jusqu'a 8 000 DPI",
        "RGB et macros",
        "Positionnement budget gaming"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Capteur", value: "jusqu'? 8 000 DPI" },
        { label: "Boutons", value: "11" }
      ],
      sources: [
        {
          label: "Fiche officielle Redragon",
          url: "https://redragonshop.com/products/predator-m612"
        }
      ]
    },
    "Redragon M601": {
      image: "./assets/mice/redragon-m601.webp",
    },
    "Redragon M602": {
      image: "./assets/mice/redragon-m602.webp",
    },
    "Redragon M711 Cobra": {
      image: "./assets/mice/redragon-m711-cobra.webp",
    },
    "Redragon M908 Impact": {
      image: "./assets/mice/redragon-m908-impact.webp",
    },
    "Redragon M913 Impact Elite": {
      image: "./assets/mice/redragon-m913-impact-elite.webp",
    },
    "MSI Clutch GM31 (wireless)": {
      image: "./assets/mice/msi-clutch-gm31-wireless.webp",
      summary: "La Clutch GM31 Wireless est une souris gaming l?g?re de MSI destin?e aux petites et moyennes mains. MSI insiste sur sa forme compacte mais confortable, son autonomie solide et un positionnement sans fil assez accessible face ? la concurrence directe.",
      highlights: [
        "73 g",
        "Shape compacte ergonomique",
        "Jusqu'a 110 h d'autonomie",
        "Dock de charge inclus selon pack"
      ],
      specs: [
        { label: "Type", value: "Sans fil 2.4 GHz + USB" },
        { label: "Capteur", value: "PixArt PAW-3311 / 12 000 DPI" },
        { label: "Boutons", value: "6" }
      ],
      sources: [
        {
          label: "Fiche officielle MSI",
          url: "https://www.msi.com/Gaming-Gear/CLUTCH-GM31-LIGHTWEIGHT-WIRELESS/Specification"
        }
      ]
    },
    "MSI Clutch GM08": {
      image: "./assets/mice/msi-clutch-gm08.webp",
    },
    "MSI Clutch GM11": {
      image: "./assets/mice/msi-clutch-gm11.webp",
    },
    "MSI Clutch GM20 Elite": {
      image: "./assets/mice/msi-clutch-gm20-elite.webp",
    },
    "MSI Clutch GM41 Lightweight": {
      image: "./assets/mice/msi-clutch-gm41-lightweight.webp",
    },
    "MSI Clutch GM41 Wireless": {
      image: "./assets/mice/msi-clutch-gm41-wireless.webp",
    },
    "HP 230 Slim / Lenovo 600": {
      image: "./assets/mice/hp-230-slim-lenovo-600.webp",
      summary: "Cette entr?e regroupe deux souris bureautiques discr?tes et mobiles, la HP 230 Slim et la Lenovo 600 Silent. Les deux mettent surtout l'accent sur un encombrement contenu, une connexion sans fil simple et un usage quotidien silencieux ou nomade.",
      highlights: [
        "Deux r?f?rences bureautiques compactes",
        "Accent sur le silence et la mobilit?",
        "Connexion simple pour PC portable"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz chez HP / Bluetooth chez Lenovo" },
        { label: "Usage", value: "bureautique mobile" },
        { label: "Autonomie", value: "longue dur?e sur batterie ou pile" }
      ],
      sources: [
        {
          label: "Fiche officielle HP 230 Slim",
          url: "https://www.hp.com/ch-en/shop/products/accessories/hp-230-slim-wireless-mouse-aj7c2aa-abb"
        },
        {
          label: "Support officiel Lenovo 600 Bluetooth Silent Mouse",
          url: "https://support.lenovo.com/accessories/acc500170"
        }
      ]
    },
    "HP X3000": {
      image: "./assets/mice/hp-x3000.webp",
    },
    "HP X500": {
      image: "./assets/mice/hp-x500.webp",
    },
    "Dell Gaming Mouse series": {
      image: "./assets/mice/dell-gaming-mouse-series.webp",
      summary: "La s?rie gaming Dell s'appuie surtout aujourd'hui sur la gamme Alienware, qui couvre des mod?les filaires, sans fil et esport. Le catalogue officiel montre une famille ?tendue allant de la souris accessible ? la souris pro ultra l?g?re et haut polling.",
      highlights: [
        "Gamme surtout portee par Alienware",
        "Modeles filaires, sans fil et pro",
        "Orientation gaming et comp?tition"
      ],
      specs: [
        { label: "Type", value: "s?ries multiples" },
        { label: "Famille", value: "Alienware" },
        { label: "Usage", value: "gaming" }
      ],
      sources: [
        {
          label: "Catalogue officiel Dell gaming mice",
          url: "https://www.dell.com/en-us/shopping/wireless-gaming-mice"
        },
        {
          label: "Fiche officielle Alienware Pro Wireless Gaming Mouse",
          url: "https://www.dell.com/en-us/shop/alienware-pro-wireless-gaming-mouse/apd/570-bbgj/pc-accessories"
        }
      ]
    },
    "Dell MS116": {
      image: "./assets/mice/dell-ms116.webp",
    },
    "Dell WM126": {
      image: "./assets/mice/dell-wm126.webp",
    },
    "Trust YVI+": {
      image: "./assets/mice/trust-yvi.webp",
      summary: "La Yvi+ de Trust est une petite souris sans fil grand public qui mise sur la discretion et l'impact environnemental r?duit. Le constructeur met en avant des clics silencieux, un format compact et l'usage de plastiques recycl?s.",
      highlights: [
        "Clics silencieux",
        "Format compact",
        "Conception avec plastiques recycl?s"
      ],
      specs: [
        { label: "Type", value: "Sans fil 2.4 GHz" },
        { label: "DPI", value: "800 / 1600" },
        { label: "Autonomie", value: "jusqu'? 12 mois" }
      ],
      sources: [
        {
          label: "Fiche officielle Trust",
          url: "https://www.trust.com/en/product/25512-yvi-silent-wireless-mouse-black"
        }
      ]
    },
    "Trust GXT 101": {
      image: "./assets/mice/trust-gxt-101.webp",
    },
    "Trust GXT 105": {
      image: "./assets/mice/trust-gxt-105-cutout.png",
    },
    "Trust GXT 144": {
      image: "./assets/mice/trust-gxt-144.webp",
    },
    "Trust GXT 130": {
      image: "./assets/mice/trust-gxt-130.webp",
    },
    "ATK Blazing Sky U2 8K": {
      image: "./assets/mice/atk-blazing-sky-u2-8k.webp",
      summary: "La Blazing Sky U2 8K place ATK sur le terrain des souris ultra l?g?res a haut polling. La page officielle met en avant une base technique moderne, des variantes multiples autour du shape U2 et une orientation clairement comp?titive.",
      highlights: [
        "Polling jusqu'? 8K",
        "Poids annonce entre 44 g et 55 g selon version",
        "Plusieurs variantes autour du shape U2"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + USB selon version" },
        { label: "Capteur", value: "PAW3395 / PAW3950 selon version" },
        { label: "Famille", value: "Blazing Sky U2" }
      ],
      sources: [
        {
          label: "Fiche officielle ATK",
          url: "https://www.atk.store/products/atk-blazing-sky-u2-series-wireless-mouse"
        }
      ]
    },
    "ATK Gaming Gear VXE R1 Pro Max Wireless": {
      image: "./assets/mice/atk-gaming-gear-vxe-r1-pro-max-wireless.webp",
      summary: "Le VXE R1 Pro Max Wireless fait partie d'une gamme qui a rapidement gagne en popularit? pour son rapport poids / capteur / prix. La fiche officielle de la s?rie R1 parle d'une souris tr?s l?g?re, orient?e performance, avec capteur PAW3395 et polling pousse.",
      highlights: [
        "Version Pro Max de la s?rie R1",
        "Poids autour de 53 g",
        "Capteur PAW3395",
        "Approche performance abordable"
      ],
      specs: [
        { label: "Type", value: "2.4 GHz + USB" },
        { label: "Capteur", value: "PAW3395" },
        { label: "Polling", value: "jusqu'? 4 000 Hz avec dongle" }
      ],
      sources: [
        {
          label: "Fiche officielle VXE",
          url: "https://vxe.com/products/vxe-dragonfly-r1-series-wireless-mouse"
        }
      ]
    },
    "Lamzu Atlantis Mini Wireless": {
      image: "./assets/mice/lamzu-atlantis-mini-wireless.webp",
      summary: "L'Atlantis Mini Wireless est l'une des r?f?rences compactes les plus cit?es chez Lamzu. Elle reprend la philosophie Atlantis dans un format resserr?, tr?s appr?ci? des joueurs claw grip qui veulent une coque nerveuse et facile ? verrouiller.",
      highlights: [
        "Petit shape claw grip tr?s appr?ci?",
        "Version sans fil",
        "Lignee Atlantis connue chez les joueurs comp?titifs"
      ],
      specs: [
        { label: "Type", value: "Sans fil" },
        { label: "Famille", value: "Atlantis Mini" },
        { label: "Usage", value: "FPS / comp?tition" }
      ],
      sources: [
        {
          label: "Fiche officielle Lamzu",
          url: "https://lamzu.com/products/lamzu-atlantis-mini-4k-gaming-mouse"
        }
      ]
    },
    "MCHOSE K7 Ultra Lightweight": {
      image: "./assets/mice/mchose-k7-ultra-lightweight.webp",
      summary: "La K7 Ultra Lightweight veut jouer dans la cour des souris comp?titives r?centes avec une base tr?s agressive sur le papier : capteur PAW3950, polling 8K et dock de charge magn?tique. Elle se positionne comme une option moderne et ambitieuse chez MCHOSE.",
      highlights: [
        "PAW3950",
        "Polling 8K en filaire et 2.4 GHz",
        "Dock magn?tique servant aussi de r?cepteur",
        "59 g annonces"
      ],
      specs: [
        { label: "Type", value: "Tri-mode" },
        { label: "Capteur", value: "PAW3950" },
        { label: "Poids", value: "59 g" }
      ],
      sources: [
        {
          label: "Fiche officielle MCHOSE",
          url: "https://www.mchose.store/products/mchose-k7-ultra-lightweight-wireless-gaming-mouse"
        }
      ]
    },
    "Pulsar X2-H CrazyLight": {
      image: "./assets/mice/pulsar-x2-h-crazylight.webp",
      summary: "La r?f?rence 'X2-H CrazyLight' semble renvoyer a une variante tr?s l?g?re de la famille X2H chez Pulsar. Je la rattache provisoirement a cette lign?e, connue pour sa bosse plus haute, sa taille compacte et son orientation comp?tition claw grip.",
      highlights: [
        "R?f?rence catalogue ? rapprocher de X2H",
        "Shape sym?trique a bosse haute",
        "Orientation claw grip / comp?tition"
      ],
      specs: [
        { label: "Type", value: "filaire ou sans fil selon version" },
        { label: "Statut", value: "suffixe CrazyLight ? confirmer" },
        { label: "Capteur", value: "PAW3395 sur fiche X2H de r?f?rence" }
      ],
      sources: [
        {
          label: "Fiche officielle Pulsar X2H",
          url: "https://www.pulsar.gg/products/x2h-wired-gaming-mouse"
        }
      ]
    },
    "Pulsar ZywOo The Chosen": {
      image: "./assets/mice/pulsar-zywoo-the-chosen.webp",
      summary: "La ZywOo The Chosen est une souris co-d?velopp?e avec Mathieu 'ZywOo' Herbaut. Pulsar y met en avant une forme ergonomique orient?e palm grip, un capteur XS-1 maison et une approche comp?tition tr?s assum?e avec options de poids et polling ?lev?.",
      highlights: [
        "Co-d?velopp?e avec ZywOo",
        "Forme ergonomique palm grip",
        "Capteur XS-1 32K",
        "Jusqu'a 8K polling"
      ],
      specs: [
        { label: "Type", value: "USB + dongle 8K fourni" },
        { label: "Capteur", value: "XS-1 32 000 DPI" },
        { label: "Poids", value: "55 g mini / 59 g medium" }
      ],
      sources: [
        {
          label: "Fiche officielle Pulsar",
          url: "https://www.pulsar.gg/products/zywoo-the-chosen-mouse"
        }
      ]
    },
    "G-Lab Kult Nitrogen Core": {
      image: "./assets/mice/g-lab-kult-nitrogen-core.webp",
      summary: "La Kult Nitrogen Core est la grosse souris gaming RGB du catalogue The G-Lab. La marque insiste sur son capteur 10 000 DPI, ses 11 boutons programmables et son centre de gravit? ajustable pour les joueurs qui veulent beaucoup de personnalisation ? prix contenu.",
      highlights: [
        "11 boutons personnalisables",
        "Poids ajustables",
        "RGB configurable",
        "Ergonomie large"
      ],
      specs: [
        { label: "Type", value: "Filaire USB" },
        { label: "Capteur", value: "jusqu'? 10 000 DPI" },
        { label: "Usage", value: "gaming polyvalent / MMO" }
      ],
      sources: [
        {
          label: "Fiche officielle The G-Lab",
          url: "https://www.the-g-lab.tech/en/produit/kult-nitrogen-core/"
        }
      ]
    },
    "Urban Factory Ergo Mouse": {
      image: "./assets/mice/urban-factory-ergo-mouse.webp",
      summary: "Sous cette entr?e g?n?rique, Urban Factory propose plusieurs souris ergonomiques, surtout verticales ou trackball. Le fil conducteur du catalogue est tr?s clair : r?duire les tensions du poignet et proposer des options filaires, sans fil ou multi-appareils pour la bureautique confortable.",
      highlights: [
        "Catalogue centre sur l'ergonomie",
        "Modeles verticaux et trackball",
        "Positionnement bureautique / sant?"
      ],
      specs: [
        { label: "Type", value: "filaire, 2.4 GHz ou Bluetooth selon mod?le" },
        { label: "Usage", value: "ergonomie bureautique" },
        { label: "Famille", value: "ERGO" }
      ],
      sources: [
        {
          label: "Catalogue officiel Urban Factory",
          url: "https://urban-factory.com/en/524-wireless-ergonomic-mouse"
        }
      ]
    },
    "Kensington Ergo Series": {
      image: "./assets/mice/kensington-ergo-series.webp",
      summary: "La s?rie Ergo de Kensington couvre des souris et trackballs orient?s sant? et confort, avec beaucoup d'accent sur la posture de la main. Le constructeur met surtout en avant les angles de prise naturels, les appuis poignet et la connectivit? multi-appareils.",
      highlights: [
        "Grande famille ergonomique",
        "Souris et trackballs verticaux",
        "Accent fort sur la posture"
      ],
      specs: [
        { label: "Type", value: "filaire ou sans fil selon mod?le" },
        { label: "Usage", value: "bureautique ergonomique" },
        { label: "Famille", value: "Pro Fit Ergo" }
      ],
      sources: [
        {
          label: "Fiche officielle Kensington Pro Fit Ergo Wireless Mouse",
          url: "https://www.kensington.com/p/products/electronic-control-solutions/computer-mice/pro-fit-ergo-wireless-mouse3/"
        },
        {
          label: "Fiche officielle Kensington Pro Fit Ergo Vertical Wireless Trackball",
          url: "https://www.kensington.com/p/products/electronic-control-solutions/trackball-products/pro-fit-ergo-vertical-wireless-trackball3/"
        }
      ]
    }
  };

  const normalize = (value) => value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const localImageOverrides = {
    "Logitech G Pro X2 Superstrike": "./assets/mice/Logitech G Pro X2 Superstrike mouse white background png.png",
    "Logitech G502 X": "./assets/mice/Logitech G502 X mouse white background png.png",
    "Logitech G502 X Plus": "./assets/mice/Logitech G502 X Plus mouse white background png.png",
    "Logitech G502 Hero": "./assets/mice/Logitech G502 Hero mouse white background png.png",
    "Logitech G Pro X Superlight": "./assets/mice/Logitech G Pro X Superlight mouse white background png.png",
    "Logitech G Pro X Superlight 2": "./assets/mice/Logitech G Pro X Superlight 2 mouse white background png.webp",
    "Logitech G Pro X Superlight 2 SE": "./assets/mice/Logitech G Pro X Superlight 2 SE mouse white background png.png",
    "Logitech G305 Lightspeed / G304": "./assets/mice/Logitech G305 Lightspeed.png",
    "Logitech MX Master 4": "./assets/mice/Logitech MX Master 4 mouse white background png.png",
    "Logitech MX Master 3S": "./assets/mice/Logitech MX Master 3S mouse white background png.webp",
    "Logitech MX Master 3": "./assets/mice/Logitech MX Master 3 mouse white background png.webp",
    "Logitech MX Anywhere 3S": "./assets/mice/Logitech MX Anywhere 3S mouse white background png.png",
    "Logitech MX Anywhere 2S": "./assets/mice/Logitech MX Anywhere 2S mouse white background png.jpg",
    "Logitech Signature M650": "./assets/mice/Logitech Signature M650 mouse white background png.png",
    "Logitech POP Mouse": "./assets/mice/Logitech POP Mouse mouse white background png.webp",
    "Logitech Lift": "./assets/mice/Logitech Lift mouse white background png.png",
    "Logitech M320": "./assets/mice/Logitech M320 mouse white background png.jpg",
    "Logitech M337 / M535": "./assets/mice/Logitech M337 mouse white background png.jpg",
    "Logitech M170 / M171": "./assets/mice/Logitech M170.webp",
    "Logitech M220 Silent": "./assets/mice/Logitech M220 Silent mouse white background png.png",
    "Logitech M221 Silent": "./assets/mice/Logitech M221 Silent mouse white background png.webp",
    "Logitech M330 Silent Plus": "./assets/mice/Logitech M330 Silent Plus mouse white background png.avif",
    "Logitech M720 Triathlon": "./assets/mice/Logitech M720 Triathlon mouse white background png.png",
    "Logitech MX Vertical": "./assets/mice/Logitech MX Vertical mouse white background png.webp",
    "Logitech G703 Lightspeed": "./assets/mice/Logitech G703 Lightspeed mouse white background png.png",
    "Logitech G705 Lightspeed": "./assets/mice/Logitech G705 Lightspeed mouse white background png.png",
    "Logitech G203 Lightsync": "./assets/mice/Logitech G203 Lightsync mouse white background png.webp",
    "Logitech G403 Hero": "./assets/mice/g403-hero-mouse-top-angle-black-gallery-1.webp",
    "Logitech G403 Lightspeed": "./assets/mice/logitech g403 lightspeed.jpg",
    "Logitech G603 Lightspeed": "./assets/mice/logitech g603 lightspeed.webp",
    "Logitech G604 Lightspeed": "./assets/mice/logitech g604 lightspeed.jpg",
    "Logitech G600 MMO": "./assets/mice/logitech g600 mmo.jpg",
    "Logitech MX Anywhere 3": "./assets/mice/Logitech-MX-Anywhere-3.webp",
    "Logitech MX Ergo": "./assets/mice/logitech mx-ergo.webp",
    "Logitech M510": "./assets/mice/logitech m510-black.png",
    "Logitech M705 Marathon": "./assets/mice/logitech m705.png",
    "Logitech Pebble M350": "./assets/mice/logitech-pebble-m350-cutout.png",
    "Logitech M90": "./assets/mice/logitech-m90-cutout.png",
    "Logitech M100": "./assets/mice/logitech m100 wired.avif",
    "Logitech B100": "./assets/mice/logitech b100.png",
    "Logitech MX518": "./assets/mice/Logitech MX518 mouse white background png.webp",
    "Logitech G400 / G400S": "./assets/mice/Logitech G400  mouse white background png.jpg",
    "Logitech G302": "./assets/mice/Logitech G302 mouse white background png.jpg",
    "Logitech G303 Shroud Edition": "./assets/mice/Logitech G303 Shroud Edition mouse white background png.jpg",
    "Razer DeathAdder V4 Pro": "./assets/mice/Razer DeathAdder V4 Pro mouse white background png.jpg",
    "Razer DeathAdder V3 Pro": "./assets/mice/razer-deathadder-v3-pro.webp",
    "Razer DeathAdder V3": "./assets/mice/razer-deathadder-v3-cutout.png",
    "Razer Basilisk V3": "./assets/mice/razer-basilisk-v3-cutout.png",
    "Razer Basilisk V3 Pro": "./assets/mice/Razer Basilisk V3 pro mouse white background png.png",
    "Razer Viper V4 Pro": "./assets/mice/Razer Viper V4 Pro mouse white background png.avif",
    "Razer Viper V3 Pro": "./assets/mice/Razer Viper V3 Pro mouse white background png.jpg",
    "Razer Naga V2 Pro": "./assets/mice/Razer Naga V2 Pro mouse white background png.jpg",
    "Razer Naga V2 HyperSpeed": "./assets/mice/Razer Naga V2 HyperSpeed mouse white background png.jpg",
    "Razer Pro Click V2": "./assets/mice/Razer Pro Click V2 mouse white background png.png",
    "Razer Pro Click V2 Vertical": "./assets/mice/Razer Pro Click V2 Vertical mouse white background png.png",
    "Razer Naga Pro": "./assets/mice/Razer Naga Pro mouse white background png.jpg",
    "Razer Naga X": "./assets/mice/Razer Naga X mouse white background png.png",
    "Razer Viper Mini Hyperspeed": "./assets/mice/Razer Viper Mini Hyperspeed mouse white background png.png",
    "Razer DeathAdder Essential": "./assets/mice/Razer DeathAdder Essential mouse white background png.jpg",
    "Razer Cobra Pro": "./assets/mice/Razer Cobra Pro mouse white background png.jpg",
    "Razer DeathAdder V2": "./assets/mice/razer deathadder v2.png",
    "Razer DeathAdder V2 Mini": "./assets/mice/Razer DeathAdder V2 Mini mouse.png",
    "Razer Basilisk Essential": "./assets/mice/Razer Basilisk Essential.png",
    "Razer Basilisk Ultimate": "./assets/mice/Razer Basilisk Ultimate.png",
    "Razer Viper Ultimate": "./assets/mice/Razer Viper Ultimate.png",
    "Razer Viper 8KHz": "./assets/mice/Razer Viper 8KHz.png",
    "Razer Orochi V2": "./assets/mice/Razer Orochi V2.jpg",
    "Razer Pro Click": "./assets/mice/Razer Pro Click.png",
    "Razer Atheris": "./assets/mice/Razer Atheris.png",
    "Razer Lancehead": "./assets/mice/Razer Lancehead.jpg",
    "Corsair Sabre V2 Pro Wireless": "./assets/mice/Corsair Sabre V2 Pro Wireless mouse white background png.avif",
    "Corsair M75 Wireless": "./assets/mice/Corsair M75 Wireless mouse white background png.avif",
    "Corsair M55 Wireless": "./assets/mice/Corsair M55 Wireless mouse white background png.avif",
    "Corsair M65 RGB Ultra": "./assets/mice/Corsair M65 RGB Ultra mouse white background png.avif",
    "Corsair Scimitar Elite Wireless SE": "./assets/mice/Corsair Scimitar Elite Wireless SE mouse white background png.avif",
    "Corsair Scimitar Elite RGB": "./assets/mice/Corsair Scimitar Elite RGB mouse white background png.jpg",
    "Corsair Harpoon Pro RGB": "./assets/mice/Corsair Harpoon Pro RGB mouse white background png.jpg",
    "Corsair Scimitar Pro RGB": "./assets/mice/Corsair Scimitar Pro RGB mouse white background png.avif",
    "Corsair Scimitar RGB": "./assets/mice/Corsair Scimitar RGB mouse white background png.avif",
    "Corsair Sabre RGB Pro": "./assets/mice/Corsair Sabre RGB Pro.webp",
    "Corsair Sabre RGB Pro Wireless": "./assets/mice/SABRE_RGB_PRO_WIRELESS_01.avif",
    "Corsair Katar Pro": "./assets/mice/Corsair Katar Pro png.webp",
    "Corsair Katar Pro Wireless": "./assets/mice/corsair KATAR_PRO_WIRELESS.avif",
    "Corsair Dark Core RGB Pro": "./assets/mice/Corsair Dark Core RGB Pro  png.avif",
    "Corsair Dark Core RGB Pro SE": "./assets/mice/coesairDARK_CORE_RGB_SE.avif",
    "Corsair Ironclaw RGB": "./assets/mice/Corsair Ironclaw RGB png.avif",
    "Corsair Ironclaw Wireless": "./assets/mice/Corsair Ironclaw wireless RGB png.jpg",
    "Corsair Nightsword RGB": "./assets/mice/Corsair Nightsword RGB png.jpg",
    "SteelSeries Aerox 9 Wireless": "./assets/mice/SteelSeries Aerox 9 Wireless mouse white background png.png",
    "SteelSeries Aerox 3 / Aerox 3 Wireless": "./assets/mice/SteelSeries Aerox 3 mouse white background png.webp",
    "SteelSeries Rival 3 Wireless Gen 2": "./assets/mice/Steelseries Rival 3 Wireless Gen 2 mouse white background png.webp",
    "SteelSeries Prime": "./assets/mice/Steelseries Prime mouse white background png.webp",
    "SteelSeries Sensei / Sensei 310": "./assets/mice/Steelseries Sensei mouse white background png.png",
    "SteelSeries Kana v2": "./assets/mice/Steelseries Kana v2 mouse white background png.jpg",
    "SteelSeries Rival 710 / Rival 3 / Rival 5": "./assets/mice/Steelseries Rival 710  mouse white background png.webp",
    "SteelSeries Rival 100": "./assets/mice/steelseries-rival-100-cutout.png",
    "SteelSeries Rival 110": "./assets/mice/SteelSeries Rival 110 png.webp",
    "SteelSeries Rival 300": "./assets/mice/SteelSeries Rival 300  png.jpg",
    "SteelSeries Rival 600": "./assets/mice/SteelSeries Rival 600.png",
    "SteelSeries Rival 650 Wireless": "./assets/mice/SteelSeries Rival 650 Wireless png.webp",
    "SteelSeries Sensei Ten": "./assets/mice/SteelSeries Sensei Ten  png.webp",
    "SteelSeries Sensei Raw": "./assets/mice/SteelSeries Sensei Raw  png.jpg",
    "SteelSeries Prime Wireless": "./assets/mice/SteelSeries Prime Wireless  png.jpg",
    "Asus ROG Gladius II Core": "./assets/mice/Asus ROG Gladius II Core mouse white background png.jpg",
    "Asus ROG Strix Impact III Wireless": "./assets/mice/Asus ROG Strix Impact III Wireless mouse white background png.jpg",
    "Asus ROG Harpe Ace Aim Lab Edition": "./assets/mice/Asus ROG Harpe Ace Aim Lab Edition mouse white background png.jpg",
    "Asus ROG Harpe Ace Mini": "./assets/mice/asus-rog-harpe-ace-mini.webp",
    "Asus TUF M3": "./assets/mice/Asus TUF M3 mouse white background png.png",
    "Asus ROG Gladius III": "./assets/mice/Asus ROG Gladius III mouse white background png.jpg",
    "Asus ROG Keris Wireless": "./assets/mice/Asus ROG Keris Wireless mouse white background png.jpg",
    "Asus ROG Chakram": "./assets/mice/Asus ROG Chakram mouse white background png.jpg",
    "Asus ROG Spatha": "./assets/mice/Asus ROG Spatha mouse white background png.png",
    "Glorious Model O": "./assets/mice/Glorious Model O mouse white background png.jpg",
    "Glorious Model O3 Wireless": "./assets/mice/Glorious Model O3 Wireless mouse white background png.webp",
    "Glorious Model D": "./assets/mice/glorious-model-d-cutout.png",
    "Glorious Model D3 Wireless": "./assets/mice/Glorious Model D3 Wireless mouse white background png.webp",
    "Glorious Model O Wireless": "./assets/mice/Glorious Model O Wireless  png.jpg",
    "Glorious Model O Minus": "./assets/mice/Glorious Model O Minus  png.jpg",
    "Glorious Model D Minus": "./assets/mice/Glorious Model D Minus png.jpg",
    "Glorious Model I": "./assets/mice/Glorious Model I png.jpg",
    "Glorious Series One Pro": "./assets/mice/Glorious Series One Pro png.webp",
    "Endgame Gear OP1 8K": "./assets/mice/Endgame Gear OP1 8K mouse white background png.png",
    "Endgame Gear XM2w": "./assets/mice/Endgame Gear XM2w mouse white background png.webp",
    "Endgame Gear XM1": "./assets/mice/Endgame Gear XM1 png.png",
    "Endgame Gear XM1r": "./assets/mice/Endgame Gear XM1r png.webp",
    "Endgame Gear OP1": "./assets/mice/Endgame Gear OP1 png.png",
    "Microsoft Surface Mobile Mouse": "./assets/mice/Microsoft Surface Mobile Mouse mouse white background png.jpg",
    "Microsoft Pro Intellimouse": "./assets/mice/microsoft-pro-intellimouse-cutout.png",
    "Microsoft Wireless IntelliMouse Explorer": "./assets/mice/Microsoft Wireless IntelliMouse Explorer mouse white background png.jpg",
    "Microsoft Basic Optical Mouse": "./assets/mice/Microsoft Basic Optical Mouse mouse white background png.jpg",
    "Microsoft Classic Intellimouse": "./assets/mice/Microsoft Classic Intellimouse mouse white background png.avif",
    "Microsoft Arc Mouse": "./assets/mice/Microsoft Arc Mouse mouse white background png.avif",
    "Roccat Kone XP Air": "./assets/mice/Roccat Kone XP Air mouse white background png.jpg",
    "Roccat Kone Pro": "./assets/mice/Roccat Kone Pro mouse white background png.jpg",
    "Roccat Kain 202 Aimo": "./assets/mice/Roccat Kain 202 Aimo mouse white background png.jpg",
    "Roccat Lua": "./assets/mice/Roccat Lua mouse white background png.jpeg",
    "Roccat Kone AIMO": "./assets/mice/Roccat Kone AIMO mouse white background png.jpg",
    "Roccat Kone Pure Ultra": "./assets/mice/Roccat Kone Pure Ultra mouse white background png.png",
    "Roccat Kone Burst Pro": "./assets/mice/Roccat Kone Burst Pro mouse white background png.jpg",
    "Roccat Kova AIMO": "./assets/mice/Roccat Kova AIMO mouse white background png.png",
    "Roccat Nyth MMO": "./assets/mice/Roccat Nyth MMO mouse white background png.png",
    "Cooler Master MM311": "./assets/mice/Cooler Master MM311 mouse white background png.webp",
    "Cooler Master MM520": "./assets/mice/Cooler Master MM520 mouse white background png.jpg",
    "Cooler Master MM720": "./assets/mice/Cooler Master MM720 mouse white background png.jpg",
    "Cooler Master MM710": "./assets/mice/Cooler Master MM710 mouse white background png.png",
    "Cooler Master MM711": "./assets/mice/Cooler Master MM711 mouse white background png.png",
    "Cooler Master MM731": "./assets/mice/Cooler Master MM731 mouse white background png.png",
    "Keychron M7 8K": "./assets/mice/Keychron M7 8K mouse white background png.avif",
    "Keychron M3 Mini V2 8K": "./assets/mice/Keychron M3 Mini V2 8K mouse white background png.webp",
    "Turtle Beach Kone II Air": "./assets/mice/Turtle Beach Kone II Air mouse white background png.webp",
    "Turtle Beach Kone XP Air": "./assets/mice/Turtle Beach Kone XP Air mouse white background png.webp",
    "Zowie EC1": "./assets/mice/Zowie EC1 png.avif",
    "Zowie EC2": "./assets/mice/Zowie EC2  png.avif",
    "Zowie EC3": "./assets/mice/Zowie EC3 mouse white background png.avif",
    "Zowie FK1": "./assets/mice/Zowie FK1 mouse white background png.avif",
    "Zowie FK2": "./assets/mice/Zowie FK2 mouse white background png.avif",
    "Zowie FK2-C": "./assets/mice/Zowie FK2-c mouse white background png.avif",
    "Zowie ZA11": "./assets/mice/Zowie ZA11 mouse white background png.avif",
    "Zowie ZA12": "./assets/mice/Zowie ZA12 mouse white background png.avif",
    "Zowie ZA13": "./assets/mice/Zowie ZA13 mouse white background png.avif",
    "HyperX Pulsefire series": "./assets/mice/HyperX Pulsefire series mouse white background png.webp",
    "HyperX Pulsefire Core": "./assets/mice/HyperX Pulsefire Core mouse white background png.webp",
    "HyperX Pulsefire Surge": "./assets/mice/HyperX Pulsefire Surge mouse white background png.webp",
    "HyperX Pulsefire Dart": "./assets/mice/HyperX Pulsefire Dart mouse white background png.webp",
    "HyperX Pulsefire Raid": "./assets/mice/HyperX Pulsefire Raid mouse white background png.png",
    "Redragon M612 8000 DPI": "./assets/mice/Redragon M612 8000 DPI mouse white background png.webp",
    "Redragon M601": "./assets/mice/Redragon M601 mouse white background png.webp",
    "Redragon M602": "./assets/mice/Redragon M602 mouse white background png.jpg",
    "Redragon M711 Cobra": "./assets/mice/Redragon M711 Cobra mouse white background png.webp",
    "Redragon M908 Impact": "./assets/mice/Redragon M908 Impact mouse white background png.webp",
    "Redragon M913 Impact Elite": "./assets/mice/Redragon M913 Impact Elite mouse white background png.jpg",
    "MSI Clutch GM31 (wireless)": "./assets/mice/MSI Clutch GM31 (wireless) mouse white background png.png",
    "MSI Clutch GM08": "./assets/mice/MSI Clutch GM08 mouse white background png.jpg",
    "MSI Clutch GM11": "./assets/mice/MSI Clutch GM11 mouse white background png.png",
    "MSI Clutch GM20 Elite": "./assets/mice/MSI Clutch GM20 Elite mouse white background png.webp",
    "MSI Clutch GM41 Lightweight": "./assets/mice/MSI Clutch GM41 Lightweight mouse white background png.jpg",
    "MSI Clutch GM41 Wireless": "./assets/mice/MSI Clutch GM41 Wireless mouse white background png.jpg",
    "HP 230 Slim / Lenovo 600": "./assets/mice/HP 230 Slim mouse white background png.avif",
    "HP X3000": "./assets/mice/HP X3000 mouse white background png.webp",
    "HP X500": "./assets/mice/HP X500 mouse white background png.jpg",
    "Dell Gaming Mouse series": "./assets/mice/Dell Gaming Mouse series mouse white background png.avif",
    "Dell MS116": "./assets/mice/Dell MS116 mouse white background png.webp",
    "Dell WM126": "./assets/mice/Dell WM126 mouse white background png.avif",
    "Trust YVI+": "./assets/mice/Trust YVI+ mouse white background png.png",
    "Trust GXT 101": "./assets/mice/Trust GXT 101 mouse white background png.webp",
    "Trust GXT 105": "./assets/mice/trust-gxt-105-cutout.png",
    "Trust GXT 144": "./assets/mice/Trust GXT 144 mouse white background png.png",
    "Trust GXT 130": "./assets/mice/Trust GXT 130 mouse white background png.webp",
    "ATK Blazing Sky U2 8K": "./assets/mice/ATK Blazing Sky U2 8K mouse white background png.webp",
    "ATK Gaming Gear VXE R1 Pro Max Wireless": "./assets/mice/ATK Gaming Gear VXE R1 Pro Max Wireless mouse white background png.webp",
    "Lamzu Atlantis Mini Wireless": "./assets/mice/Lamzu Atlantis Mini Wireless mouse white background png.jpg",
    "MCHOSE K7 Ultra Lightweight": "./assets/mice/MCHOSE K7 Ultra Lightweight mouse white background png.jpg",
    "Pulsar X2-H CrazyLight": "./assets/mice/Pulsar X2-H CrazyLight mouse white background png.webp",
    "Pulsar ZywOo The Chosen": "./assets/mice/Pulsar ZywOo The Chosen mouse white background png.webp",
    "G-Lab Kult Nitrogen Core": "./assets/mice/G‑Lab Kult Nitrogen Core mouse white background png.webp",
    "Urban Factory Ergo Mouse": "./assets/mice/Urban Factory Ergo Mouse mouse white background png.jpg",
    "Kensington Ergo Series": "./assets/mice/Kensington Ergo Series mouse white background pn.jpg"
  };

  const validLocalImages = new Set(Object.values(localImageOverrides));

  const imagePaletteByBrand = {
    "Logitech": { base: "#f4efe6", accent: "#0f766e", line: "#1f2937", tag: "#ecfdf5" },
    "Razer": { base: "#eef8e4", accent: "#65a30d", line: "#18210f", tag: "#ecfccb" },
    "Corsair": { base: "#fff4dc", accent: "#d97706", line: "#22150b", tag: "#fff7ed" },
    "SteelSeries": { base: "#fff0f3", accent: "#e11d48", line: "#2d1320", tag: "#ffe4e6" },
    "Asus / ROG": { base: "#fff0ee", accent: "#dc2626", line: "#2b1211", tag: "#fee2e2" },
    "Glorious": { base: "#f4f0ff", accent: "#7c3aed", line: "#22153d", tag: "#ede9fe" },
    "Endgame Gear": { base: "#edf4ff", accent: "#2563eb", line: "#16223b", tag: "#dbeafe" },
    "Microsoft": { base: "#edf7ff", accent: "#0284c7", line: "#122433", tag: "#e0f2fe" },
    "Roccat": { base: "#fff3ea", accent: "#ea580c", line: "#301910", tag: "#ffedd5" },
    "Cooler Master": { base: "#fff8da", accent: "#ca8a04", line: "#2c2411", tag: "#fef3c7" },
    "Keychron": { base: "#eef9ef", accent: "#15803d", line: "#162619", tag: "#dcfce7" },
    "Turtle Beach": { base: "#ebfbfd", accent: "#0891b2", line: "#13303a", tag: "#cffafe" },
    "Zowie": { base: "#fff4f2", accent: "#ef4444", line: "#2f1715", tag: "#fee2e2" },
    "HyperX": { base: "#fff0f0", accent: "#dc2626", line: "#2b1414", tag: "#fee2e2" },
    "Redragon": { base: "#fff2ef", accent: "#ea580c", line: "#321915", tag: "#ffedd5" },
    "MSI": { base: "#fff2f2", accent: "#b91c1c", line: "#2f1414", tag: "#fee2e2" },
    "HP / Lenovo": { base: "#f1f8ff", accent: "#2563eb", line: "#12263b", tag: "#dbeafe" },
    "Dell": { base: "#eef7ff", accent: "#0284c7", line: "#122433", tag: "#e0f2fe" },
    "Trust": { base: "#f7f4ff", accent: "#7c3aed", line: "#22163a", tag: "#ede9fe" },
    "Autres marques": { base: "#f4f1ff", accent: "#6d28d9", line: "#21193a", tag: "#ede9fe" },
    "default": { base: "#f5f3ef", accent: "#b45309", line: "#1f1b16", tag: "#fff7ed" }
  };

  const defaultSourceByBrand = {
    "Razer": { label: "Catalogue officiel Razer", url: "https://www.razer.com/pc/gaming-mice" },
    "Corsair": { label: "Catalogue officiel Corsair", url: "https://www.corsair.com/us/en/c/gaming-mice" },
    "SteelSeries": { label: "Catalogue officiel SteelSeries", url: "https://steelseries.com/gaming-mice" },
    "Asus / ROG": { label: "Catalogue officiel ROG", url: "https://rog.asus.com/mice-mouse-pads/mice/" },
    "Glorious": { label: "Catalogue officiel Glorious", url: "https://www.gloriousgaming.com/collections/gaming-mice" },
    "Endgame Gear": { label: "Catalogue officiel Endgame Gear", url: "https://www.endgamegear.com/en-us/gaming-mice" },
    "Microsoft": { label: "Catalogue officiel Microsoft", url: "https://www.microsoft.com/accessories/en-us/mice" },
    "Roccat": { label: "Catalogue officiel Turtle Beach", url: "https://www.turtlebeach.com/collections/pc-gaming-mice" },
    "Cooler Master": { label: "Catalogue officiel Cooler Master", url: "https://www.coolermaster.com/en-us/catalog/peripheral/mice/" },
    "Keychron": { label: "Catalogue officiel Keychron", url: "https://www.keychron.com/collections/mice" },
    "Turtle Beach": { label: "Catalogue officiel Turtle Beach", url: "https://www.turtlebeach.com/collections/pc-gaming-mice" },
    "Zowie": { label: "Catalogue officiel Zowie", url: "https://zowie.benq.com/en-us/mouse.html" },
    "HyperX": { label: "Catalogue officiel HyperX", url: "https://hyperx.com/collections/gaming-mice" },
    "Redragon": { label: "Catalogue officiel Redragon", url: "https://redragonshop.com/collections/mice" },
    "MSI": { label: "Catalogue officiel MSI", url: "https://www.msi.com/Gaming-Gear" },
    "HP / Lenovo": { label: "Catalogue officiel HP", url: "https://www.hp.com/us-en/shop/cat/mice" },
    "Dell": { label: "Catalogue officiel Dell", url: "https://www.dell.com/en-us/shop/pc-accessories/ar/7686/mice-keyboards" },
    "Trust": { label: "Catalogue officiel Trust", url: "https://www.trust.com/en/category/mice" },
    "Autres marques": { label: "Catalogue officiel de marque", url: "https://www.pulsar.gg/collections/mice" }
  };

  const normalizeSpace = (value) => String(value || "").replace(/\s+/g, " ").trim();
  const capitalizeSentenceStarts = (value) => normalizeSpace(value)
    .replace(/^([^A-Za-zÀ-ÖØ-Þà-öø-ÿ]*)([a-zà-öø-ÿ])/, function (_, prefix, letter) {
      return prefix + letter.toUpperCase();
    })
    .replace(/([.!?]\s+)([a-zà-öø-ÿ])/g, function (_, prefix, letter) {
      return prefix + letter.toUpperCase();
    });
  const capitalizeSentenceList = (items) => Array.isArray(items)
    ? items.map(function (item) {
      return typeof item === "string" ? capitalizeSentenceStarts(item) : item;
    })
    : items;
  const toSearch = (value) => normalizeSpace(value).toLowerCase();
  const formatNumber = (value) => String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const escapeXml = (value) => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  const catalogTextReplacements = [
    ["? la fois", "à la fois"],
    ["? l'essentiel", "à l'essentiel"],
    ["? l'autre", "à l'autre"],
    ["? l'époque", "à l'époque"],
    ["? compléter", "à compléter"],
    ["? confirmer", "à confirmer"],
    ["? consolider", "à consolider"],
    ["? rapprocher", "à rapprocher"],
    ["? vérifier", "à vérifier"],
    ["? glisser", "à glisser"],
    ["? devenir", "à devenir"],
    ["? destination", "à destination"],
    ["? prendre", "à prendre"],
    ["? transporter", "à transporter"],
    ["? jouer", "à jouer"],
    ["? vivre", "à vivre"],
    ["?vec", "avec"],
    ["?viter", "éviter"],
    ["?tre", "être"],
    ["?clairage", "éclairage"],
    ["Pens?e", "Pensée"],
    ["pens?e", "pensée"],
    ["?lev?e", "élevée"],
    ["?lev?", "élevé"],
    ["?norme", "énorme"],
    ["?poques", "époques"],
    ["?poque", "époque"],
    ["?tendue", "étendue"],
    ["?volu?e", "évoluée"],
    ["?volution", "évolution"],
    ["?pur?", "épuré"],
    ["Co-d?velopp?e", "Co-développée"],
    ["co-d?velopp?e", "co-développée"],
    ["R?f?rences", "Références"],
    ["R?f?rence", "Référence"],
    ["r?f?rences", "références"],
    ["r?f?rence", "référence"],
    ["Mod?les", "Modèles"],
    ["Mod?le", "Modèle"],
    ["mod?les", "modèles"],
    ["mod?le", "modèle"],
    ["a?r?", "aéré"],
    ["affirm?e", "affirmée"],
    ["agr?able", "agréable"],
    ["aliment?e", "alimentée"],
    ["all?g?", "allégé"],
    ["appr?ci?es", "appréciées"],
    ["appr?ci?e", "appréciée"],
    ["appr?ci?", "apprécié"],
    ["assum?e", "assumée"],
    ["att?nu?s", "atténués"],
    ["avanc?e", "avancée"],
    ["c?l?bre", "célèbre"],
    ["capacit?", "capacité"],
    ["centr?e", "centrée"],
    ["ch?ssis", "châssis"],
    ["charg?e", "chargée"],
    ["cit?es", "citées"],
    ["class?", "classé"],
    ["co-sign?e", "co-signée"],
    ["co?teux", "coûteux"],
    ["comp?titifs", "compétitifs"],
    ["comp?titives", "compétitives"],
    ["comp?titive", "compétitive"],
    ["comp?titif", "compétitif"],
    ["comp?tition", "compétition"],
    ["compatibilit?", "compatibilité"],
    ["compl?tement", "complètement"],
    ["compl?ter", "compléter"],
    ["compl?te", "complète"],
    ["con?ues", "conçues"],
    ["con?u", "conçu"],
    ["concentr?e", "concentrée"],
    ["connectivit?", "connectivité"],
    ["contr?les", "contrôles"],
    ["contr?le", "contrôle"],
    ["d'entr?e", "d'entrée"],
    ["d?clin?e", "déclinée"],
    ["d?filer", "défiler"],
    ["d?j?", "déjà"],
    ["d?monstratif", "démonstratif"],
    ["d?nomination", "dénomination"],
    ["d?penser", "dépenser"],
    ["d?ployer", "déployer"],
    ["degr?s", "degrés"],
    ["derni?re", "dernière"],
    ["destin?e", "destinée"],
    ["discr?tes", "discrètes"],
    ["disponibilit?", "disponibilité"],
    ["document?e", "documentée"],
    ["dur?e", "durée"],
    ["embarqu?s", "embarqués"],
    ["embl?matique", "emblématique"],
    ["entr?e", "entrée"],
    ["facilit?", "facilité"],
    ["fiabilit?", "fiabilité"],
    ["g?n?raliste", "généraliste"],
    ["g?n?rations", "générations"],
    ["g?n?ration", "génération"],
    ["g?n?rique", "générique"],
    ["go?t", "goût"],
    ["gr?ce", "grâce"],
    ["gravit?", "gravité"],
    ["h?ritage", "héritage"],
    ["harmonis?e", "harmonisée"],
    ["imm?diate", "immédiate"],
    ["install?", "installé"],
    ["int?gr?", "intégré"],
    ["int?r?t", "intérêt"],
    ["int?ressante", "intéressante"],
    ["journ?es", "journées"],
    ["jusqu'?", "jusqu'à"],
    ["l'?clairage", "l'éclairage"],
    ["l'?cosyst?me", "l'écosystème"],
    ["l'?poque", "l'époque"],
    ["l'?volution", "l'évolution"],
    ["l'h?ritage", "l'héritage"],
    ["l'id?e", "l'idée"],
    ["l?g?rement", "légèrement"],
    ["l?g?ret?", "légèreté"],
    ["l?g?res", "légères"],
    ["l?g?re", "légère"],
    ["l?gende", "légende"],
    ["l?ger", "léger"],
    ["lat?rales", "latérales"],
    ["lat?raux", "latéraux"],
    ["lat?rale", "latérale"],
    ["li?e", "liée"],
    ["lign?e", "lignée"],
    ["m?canique", "mécanique"],
    ["m?langer", "mélanger"],
    ["m?lange", "mélange"],
    ["m?me", "même"],
    ["m?moire", "mémoire"],
    ["m?rite", "mérite"],
    ["magn?sium", "magnésium"],
    ["magn?tiques", "magnétiques"],
    ["magn?tique", "magnétique"],
    ["marqu?e", "marquée"],
    ["mobilit?", "mobilité"],
    ["modernis?e", "modernisée"],
    ["modularit?", "modularité"],
    ["multi-g?n?rations", "multi-générations"],
    ["n'appara?t", "n'apparaît"],
    ["optimis?e", "optimisée"],
    ["orient?es", "orientées"],
    ["orient?e", "orientée"],
    ["orient?s", "orientés"],
    ["orient?", "orienté"],
    ["outill?e", "outillée"],
    ["pens?e", "pensée"],
    ["pens?", "pensé"],
    ["perc?e", "percée"],
    ["perc?", "percé"],
    ["plut?t", "plutôt"],
    ["popularis?", "popularisé"],
    ["popularit?", "popularité"],
    ["portabilit?", "portabilité"],
    ["pouss?e", "poussée"],
    ["pr?cise", "précise"],
    ["pr?cision", "précision"],
    ["pr?sentait", "présentait"],
    ["pr?sente", "présente"],
    ["premi?res", "premières"],
    ["premi?re", "première"],
    ["priorit?", "priorité"],
    ["privil?gient", "privilégient"],
    ["privil?gier", "privilégier"],
    ["privil?gie", "privilégie"],
    ["productivit?", "productivité"],
    ["r?actif", "réactif"],
    ["r?activit?", "réactivité"],
    ["r?centes", "récentes"],
    ["r?cente", "récente"],
    ["r?cepteur", "récepteur"],
    ["r?duction", "réduction"],
    ["r?duire", "réduire"],
    ["r?duite", "réduite"],
    ["r?duit", "réduit"],
    ["r?gions", "régions"],
    ["r?glable", "réglable"],
    ["r?glage", "réglage"],
    ["r?gler", "régler"],
    ["r?pertori?", "répertorié"],
    ["r?ponse", "réponse"],
    ["rapidit?", "rapidité"],
    ["rattach?es", "rattachées"],
    ["rattach?e", "rattachée"],
    ["recycl?s", "recyclés"],
    ["rempla?able", "remplaçable"],
    ["renforc?e", "renforcée"],
    ["repr?sentent", "représentent"],
    ["repr?sente", "représente"],
    ["resserr?", "resserré"],
    ["rev?tement", "revêtement"],
    ["s?ries", "séries"],
    ["s?rieuse", "sérieuse"],
    ["s?rieux", "sérieux"],
    ["s?rie", "série"],
    ["s?re", "sûre"],
    ["sant?", "santé"],
    ["sc?ne", "scène"],
    ["stabilit?", "stabilité"],
    ["sym?trie", "symétrie"],
    ["sym?trique", "symétrique"],
    ["syst?me", "système"],
    ["t?te", "tête"],
    ["tra?ner", "traîner"],
    ["travaill?e", "travaillée"],
    ["tr?s", "très"],
    ["v?rification", "vérification"],
    ["v?rifier", "vérifier"],
    ["verrouill?e", "verrouillée"]
  ];

  const catalogWordPatterns = [
    [/\bSteelseries\b/g, "SteelSeries"],
    [/\bChassis\b/g, "Châssis"],
    [/\bgrace a\b/g, "grâce à"],
    [/\brecepteur\b/g, "récepteur"],
    [/\bconcue\b/g, "conçue"],
    [/\bdeclinaison\b/g, "déclinaison"],
    [/\bpremiere\b/g, "première"],
    [/\bappuyee\b/g, "appuyée"],
    [/\barriere\b/g, "arrière"],
    [/\bexecution\b/g, "exécution"],
    [/\bdedie\b/g, "dédié"],
    [/\bdeveloppee\b/g, "développée"],
    [/\bcomplete\b/g, "complète"],
    [/\bmodeles\b/g, "modèles"],
    [/\ba rapidement gagne\b/g, "a rapidement gagné"],
    [/\bpolling pousse\b/g, "polling poussé"],
    [/\btrès marques\b/g, "très marqués"],
    [/\brgb marque\b/g, "RGB marqué"],
    [/\bcatalogue centre sur\b/g, "catalogue centré sur"],
    [/\bportee par\b/g, "portée par"],
    [/\bcontinuit[eé]\b/g, "continuité"],
    [/\bannoncee\b/g, "annoncée"],
    [/\bappelee\b/g, "appelée"],
    [/\bdiscretion\b/g, "discrétion"],
    [/\bLignee\b/g, "Lignée"],
    [/\blignee\b/g, "lignée"]
  ];

  function normalizeCatalogText(value) {
    const input = String(value || "");

    if (!input || /^(https?:\/\/|\.\/|\.\.\/|data:|#|rgba\(|url\()/i.test(input)) {
      return input;
    }

    var text = input;

    catalogTextReplacements.forEach(function (pair) {
      text = text.split(pair[0]).join(pair[1]);
    });

    catalogWordPatterns.forEach(function (pair) {
      text = text.replace(pair[0], pair[1]);
    });

    text = text
      .replace(/\? (?=[A-Za-zÀ-ÿ])/g, "à ")
      .replace(/\ba (?=(glisser|déployer|devenir|destination|prendre|transporter|traîner|jouer|vivre|maximiser|personnaliser)\b)/g, "à ")
      .replace(/\bjusqu'a\b/g, "jusqu'à")
      .replace(/\bsans trop depenser\b/g, "sans trop dépenser");

    return text;
  }

  function normalizeCatalogValue(value) {
    if (Array.isArray(value)) {
      return value.map(normalizeCatalogValue);
    }

    if (value && Object.prototype.toString.call(value) === "[object Object]") {
      return Object.keys(value).reduce(function (result, key) {
        result[key] = normalizeCatalogValue(value[key]);
        return result;
      }, {});
    }

    return typeof value === "string"
      ? normalizeCatalogText(value)
      : value;
  }

  const maxValue = (values) => values.length ? Math.max.apply(null, values) : null;

  const getSpecValue = (specs, labels) => {
    const list = Array.isArray(specs) ? specs : [];
    const match = list.find(function (spec) {
      const label = toSearch(spec.label);

      return labels.some(function (candidate) {
        return label === candidate || label.indexOf(candidate) !== -1;
      });
    });

    return match ? normalizeSpace(match.value) : "";
  };

  const extractUnitValues = (text, unit) => {
    const input = normalizeSpace(text);
    const regex = new RegExp("(\\d{1,3}(?:[ .]\\d{3})+|\\d{2,5})\\s*" + unit, "ig");

    return Array.from(input.matchAll(regex)).map(function (match) {
      return parseInt(match[1].replace(/[ .]/g, ""), 10);
    }).filter(Boolean);
  };

  const extractKValues = (text) => Array.from(normalizeSpace(text).matchAll(/(\d{1,2}(?:[.,]\d+)?)\s*k\b/ig)).map(function (match) {
    return Math.round(parseFloat(match[1].replace(",", ".")) * 1000);
  }).filter(Boolean);

  const extractLooseNumberValues = (text) => Array.from(normalizeSpace(text).matchAll(/(\d{1,3}(?:[ .]\d{3})+|\d+(?:[.,]\d+)?)/g)).map(function (match) {
    return parseFloat(match[1].replace(/[ ]/g, "").replace(",", "."));
  }).filter(function (value) {
    return Number.isFinite(value);
  });

  const extractContextualWeightValues = (text) => Array.from(normalizeSpace(text).matchAll(/(?:poids|weight|weigh(?:ing|s)?(?:\s+in\s+at)?)[^0-9]{0,20}(\d{1,3}(?:[.,]\d+)?)\s*g\b/ig)).map(function (match) {
    return parseFloat(match[1].replace(",", "."));
  }).filter(function (value) {
    return Number.isFinite(value);
  });

  const imagePalette = (brand) => imagePaletteByBrand[brand] || imagePaletteByBrand.default;

  const buildPlaceholderImage = (name, brand, typeValue, shapeValue) => {
    const palette = imagePalette(brand);
    const shortBrand = normalizeSpace(brand).slice(0, 24);
    const shortName = normalizeSpace(name).replace(brand, "").trim() || normalizeSpace(name);
    const compactName = shortName.length > 30 ? shortName.slice(0, 27) + "..." : shortName;
    const svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 540" role="img" aria-label="' + escapeXml(name) + '">',
      '<defs>',
      '<linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="100%">',
      '<stop offset="0%" stop-color="' + palette.base + '"/>',
      '<stop offset="100%" stop-color="#ffffff"/>',
      '</linearGradient>',
      '<linearGradient id="mouse" x1="0%" y1="0%" x2="100%" y2="100%">',
      '<stop offset="0%" stop-color="' + palette.accent + '"/>',
      '<stop offset="100%" stop-color="' + palette.line + '"/>',
      '</linearGradient>',
      '</defs>',
      '<rect width="720" height="540" rx="46" fill="' + palette.base + '"/>',
      '<rect x="24" y="24" width="672" height="492" rx="34" fill="url(#card)" stroke="' + palette.line + '" stroke-width="4"/>',
      '<rect x="54" y="52" width="612" height="58" rx="18" fill="' + palette.tag + '" stroke="' + palette.line + '" stroke-width="3"/>',
      '<text x="80" y="90" fill="' + palette.line + '" font-size="26" font-family="Trebuchet MS, Segoe UI, sans-serif" font-weight="700">' + escapeXml(shortBrand) + '</text>',
      '<circle cx="132" cy="226" r="76" fill="' + palette.accent + '" opacity="0.18"/>',
      '<path d="M250 148 C318 116 430 122 486 168 C527 202 550 260 543 324 C536 384 494 421 425 432 C359 442 281 423 245 381 C207 337 198 265 211 221 C221 189 232 165 250 148 Z" fill="url(#mouse)" opacity="0.92"/>',
      '<path d="M364 157 L364 282" stroke="rgba(255,255,255,0.28)" stroke-width="7" stroke-linecap="round"/>',
      '<path d="M302 199 C322 188 346 185 360 188" stroke="rgba(255,255,255,0.16)" stroke-width="7" stroke-linecap="round"/>',
      '<path d="M422 199 C402 188 378 185 364 188" stroke="rgba(255,255,255,0.16)" stroke-width="7" stroke-linecap="round"/>',
      '<text x="60" y="430" fill="' + palette.line + '" font-size="36" font-family="Palatino Linotype, Georgia, serif" font-weight="700">' + escapeXml(compactName) + '</text>',
      '<text x="60" y="470" fill="' + palette.line + '" font-size="22" font-family="Trebuchet MS, Segoe UI, sans-serif">' + escapeXml(typeValue + " / " + shapeValue) + '</text>',
      '<text x="60" y="502" fill="' + palette.accent + '" font-size="20" font-family="Trebuchet MS, Segoe UI, sans-serif">Image temporaire harmonis?e</text>',
      '</svg>'
    ].join("");

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(normalizeCatalogText(svg));
  };

  const buildDefaultSources = (name, brand) => {
    if (brand === "Logitech") {
      if (name.indexOf("Logitech G") === 0 || name.indexOf("Logitech MX518") === 0 || name.indexOf("Logitech G400") === 0) {
        return [
          {
            label: "Catalogue officiel Logitech G",
            url: "https://www.logitechg.com/en-us/products/gaming-mice.html"
          }
        ];
      }

      return [
        {
          label: "Catalogue officiel Logitech",
          url: "https://www.logitech.com/en-us/shop/c/mice"
        }
      ];
    }

    return defaultSourceByBrand[brand]
      ? [defaultSourceByBrand[brand]]
      : [
        {
          label: "Source officielle ? compl?ter",
          url: "https://www.google.com/search?q=" + encodeURIComponent(name + " official mouse")
        }
      ];
  };

  const buildWebPreviewImage = (url) => {
    if (!url || !/^https?:\/\//i.test(url)) {
      return null;
    }

    return "https://image.thum.io/get/width/1200/crop/760/noanimate/?url=" + encodeURIComponent(url);
  };

  const buildSummary = (name, group, standardizedSpecs, hasDirectSource) => {
    const note = segmentNotes[group.segment] || "Model to confirm against a manufacturer page or official support resource.";
    const specMap = standardizedSpecs.map;
    const statusMap = standardizedSpecs.statusMap;
    const facts = [];
    const technicalLabels = ["DPI", "Polling Rate", "Poids"];
    const hasTechnicalGaps = technicalLabels.some(function (label) {
      return statusMap[label] !== "confirmed";
    });

    if (specMap.Type) {
      facts.push(specMap.Type.toLowerCase());
    }

    if (specMap.Forme) {
      facts.push("shape " + specMap.Forme.toLowerCase());
    }

    if (statusMap.Poids !== "unknown") {
      facts.push("weight " + specMap.Poids.toLowerCase() + (statusMap.Poids === "estimated" ? " estimated" : ""));
    }

    if (statusMap["Polling Rate"] === "confirmed") {
      facts.push("polling " + specMap["Polling Rate"]);
    }

    return [
      note,
      facts.length ? "We position it here as a " + facts.join(", ") + " profile." : "",
      group.status === "legacy"
        ? "This reference mainly serves as a historical marker or a comparison point against newer models."
        : "",
      hasDirectSource
        ? (
          hasTechnicalGaps
            ? "This profile gives a good buying direction, but some technical data is still estimated or needs confirmation."
            : "The spec sheet is complete enough to form a serious first opinion."
        )
        : "The source mostly points to a brand catalog, so use this profile as a sorting aid, not absolute truth."
    ].filter(Boolean).join(" ");
  };

  const buildHighlights = (entry, group, specMap, imageStatus) => {
    const curatedHighlights = Array.isArray(entry.highlights) ? entry.highlights.filter(Boolean).slice(0, 3) : [];

    if (curatedHighlights.length) {
      return capitalizeSentenceList(curatedHighlights);
    }

      return capitalizeSentenceList([
        group.status === "legacy" ? "Legacy reference kept in the catalog." : "Active reference currently included in the catalog.",
        specMap.Type + " / " + specMap.Forme + " / " + specMap.Poids,
        imageStatus === "local"
          ? "Local image stored in the project."
          : imageStatus === "official"
            ? "Official image available."
            : imageStatus === "web"
              ? "Web image pulled from the associated source."
              : "Temporary image harmonized while waiting for an official visual."
      ]);
  };

  const inferType = (name, group, rawSpecs, text) => {
    const rawType = toSearch(getSpecValue(rawSpecs, ["type"]));
    const combined = [name, rawType, text].join(" ").toLowerCase();

    if (/(wireless|sans fil|lightspeed|hyperspeed|bluetooth|2\.4|air\b|tri-mode|tri mode|mobile mouse|anywhere|mx master|mx vertical|lift\b|pop mouse|signature m650|triathlon|surface mobile|m170|m171|m220|m221|m330|m337|m535|g703|g705|rival 3 wireless|impact iii wireless|mm311|xm2w|clutch gm31|atlantis|vxe|r1 pro max|230 slim|lenovo 600|yvi\+|kone ii air|kone xp air|pro click)/.test(combined)) {
      return "Sans-fil";
    }

    if (/\bfilaire|wired|usb\b/.test(combined)) {
      return "Filaire";
    }

    return /bureautique|classique|classic|productivité|divers/i.test(group.segment) ? "Sans-fil" : "Filaire";
  };

  const inferShape = (name, group, rawSpecs, text) => {
    const combined = [name, group.brand, group.segment, getSpecValue(rawSpecs, ["type"]), text].join(" ").toLowerCase();

    if (/(deathadder|basilisk|naga|pro click|mx |master|anywhere|lift|vertical|g502|g703|g705|signature|pop mouse|sabre|scimitar|harpoon|m65|gladius|kone|kain|intellimouse|mm520|model d|ergo|m720|redragon m612|zywoo|nitrogen)/.test(combined)) {
      return "Ergonomique";
    }

    if (/(viper|cobra|superlight|superstrike|g305|g302|g303|aerox|rival|prime|sensei|kana|impact|harpe|model o|op1|xm2|atlantis|x2-h|pulsefire|m75|m55|mm311|mm720|u2|r1|k7|gm31|surface mobile|m170|m171|m220|m221|m320|m337|m535|trust yvi|lua)/.test(combined)) {
      return "Ambidextre";
    }

    return /bureautique|classique|classic/i.test(group.segment) ? "Ergonomique" : "Ambidextre";
  };

  const buildSpecField = (value, status) => ({
    value: value,
    status: status
  });

  const confirmedShapeOverrides = {
    "Asus ROG Harpe Ace Mini": "Ambidextre",
    "Cooler Master MM311": "Ambidextre",
    "Keychron M7 8K": "Ergonomique",
    "Keychron M3 Mini V2 8K": "Ergonomique",
    "Logitech MX Master 4": "Ergonomique",
    "Pulsar ZywOo The Chosen": "Ergonomique",
    "Razer Viper V3 Pro": "Ambidextre",
    "Razer Viper V4 Pro": "Ambidextre",
    "Turtle Beach Kone II Air": "Ergonomique",
    "Zowie EC1": "Ergonomique",
    "Zowie EC2": "Ergonomique",
    "Zowie EC3": "Ergonomique",
    "Zowie FK1": "Ambidextre",
    "Zowie FK2": "Ambidextre",
    "Zowie FK2-C": "Ambidextre",
    "Zowie ZA11": "Ambidextre",
    "Zowie ZA12": "Ambidextre",
    "Zowie ZA13": "Ambidextre"
  };

  const confirmedSpecOverrides = {
    "Asus ROG Gladius II Core": {
      "Polling Rate": "1 000 Hz"
    },
    "Asus ROG Harpe Ace Mini": {
      "DPI": "42 000 DPI"
    },
    "Corsair Scimitar Elite Wireless SE": {
      "Poids": "114 g",
      "Polling Rate": "1 000 Hz"
    },
    "Endgame Gear OP1 8K": {
      "DPI": "30 000 DPI",
      "Poids": "49.5 g"
    },
    "Endgame Gear XM2w": {
      "DPI": "30 000 DPI",
      "Polling Rate": "4 000 Hz",
      "Poids": "61.5 g"
    },
    "Keychron M3 Mini V2 8K": {
      "DPI": "30 000 DPI"
    },
    "Logitech G502 X": {
      "DPI": "25 600 DPI"
    },
    "Logitech G502 X Plus": {
      "DPI": "25 600 DPI"
    },
    "Logitech G502 Hero": {
      "DPI": "25 600 DPI"
    },
    "Logitech G305 Lightspeed / G304": {
      "DPI": "12 000 DPI"
    },
    "Logitech G Pro X Superlight 2": {
      "DPI": "44 000 DPI"
    },
    "Logitech MX Master 4": {
      "Polling Rate": "125 Hz"
    },
    "MCHOSE K7 Ultra Lightweight": {
      "DPI": "42 000 DPI"
    },
    "Pulsar X2-H CrazyLight": {
      "DPI": "26 000 DPI",
      "Polling Rate": "1 000 Hz",
      "Poids": "51 g"
    },
    "Razer Basilisk V3": {
      "DPI": "26 000 DPI",
      "Poids": "101 g"
    },
    "Razer Basilisk V3 Pro": {
      "Poids": "112 g"
    },
    "Razer Cobra Pro": {
      "Poids": "77 g"
    },
    "Razer DeathAdder V4 Pro": {
      "Polling Rate": "8 000 Hz",
      "Poids": "56 g"
    },
    "Razer Pro Click V2": {
      "Poids": "110 g"
    },
    "Razer Pro Click V2 Vertical": {
      "Poids": "150 g"
    },
    "Razer Viper V4 Pro": {
      "DPI": "50 000 DPI",
      "Polling Rate": "8 000 Hz",
      "Poids": "49 g"
    },
    "Turtle Beach Kone II Air": {
      "DPI": "26 000 DPI",
      "Polling Rate": "1 000 Hz",
      "Poids": "110 g"
    },
    "Trust YVI+": {
      "DPI": "1 600 DPI"
    }
  };

  const buildProvidedSpecOverride = (dpi, pollingRate, connexion, forme, poids) => ({
    "DPI": dpi,
    "Polling Rate": pollingRate,
    "Type": connexion,
    "Forme": forme,
    "Poids": poids
  });

  const formatProvidedDpi = (value) => /dpi/i.test(value) ? value : value + " DPI";
  const formatProvidedWeight = (value) => String(value || "")
    .replace(/g$/i, " g")
    .replace(/~\s*(\d+)\s*g/i, "~$1 g")
    .replace(/<\s*(\d+)\s*g/i, "< $1 g")
    .replace(/(\d+)g\+/i, "$1 g+")
    .replace(/(\d+)\s*-\s*(\d+)g/i, "$1 - $2 g")
    .replace(/(\d+)g\s*\(vide\)/i, "$1 g (vide)")
    .replace(/\s+/g, " ")
    .trim();

  const providedSpecRows = new Map(`
G Pro X Superlight 2 (SE),32 000,4 000 Hz,Sans fil,Symétrique,60g
G502 X,25 600,1 000 Hz,Filaire,Ergo Droitier,89g
G502 X Plus,25 600,1 000 Hz,Sans fil,Ergo Droitier,106g
G502 Hero,25 600,1 000 Hz,Filaire,Ergo Droitier,121g
G Pro X Superlight,25 600,1 000 Hz,Sans fil,Symétrique,63g
G305 Lightspeed,12 000,1 000 Hz,Sans fil (Pile),Symétrique,99g
MX Master 3S,8 000,125 Hz,Triple (Bolt/BT),Ergo Productivité,141g
MX Master 4,8 000+,125 Hz,Triple (Bolt/BT),Ergo Productivité,~145g
MX Anywhere 3S,8 000,125 Hz,Triple (Bolt/BT),Symétrique (Petit),99g
MX Anywhere 2S,4 000,125 Hz,Triple (Unifying),Symétrique (Petit),106g
Signature M650,4 000,125 Hz,Sans fil (Pile),Ergo / 3 tailles,101g
POP Mouse,4 000,125 Hz,Bluetooth,Symétrique (Pleine),82g
Lift,4 000,125 Hz,Sans fil (Pile),Verticale (57°),125g
M320,1 000,125 Hz,Sans fil (USB),Ergonomique,80g
M337 / M535,1 000,125 Hz,Bluetooth,Ambidextre,82g
M170 / M171,1 000,125 Hz,Sans fil (USB),Ambidextre,70g
M220 / M221 Silent,1 000,125 Hz,Sans fil (USB),Ambidextre,75g
M330 Silent Plus,1 000,125 Hz,Sans fil (USB),Ergo Droitier,91g
M720 Triathlon,1 000,125 Hz,Triple (USB/BT),Ergo Droitier,135g
MX Vertical,4 000,125 Hz,Triple (USB/BT),Verticale,135g
G703 Lightspeed,25 600,1 000 Hz,Sans fil,Ergo Droitier,95g
G705 (Aurora),8 200,1 000 Hz,Sans fil,Ergo (Petit),85g
G203 Lightsync,8 000,1 000 Hz,Filaire,Symétrique,85g
G403 Hero,25 600,1 000 Hz,Filaire,Ergo Droitier,87g
G604 Lightspeed,25 600,1 000 Hz,Triple (USB/BT),Ergo (MMO),135g
G600 MMO,8 200,1 000 Hz,Filaire,Ergo (Large),133g
DeathAdder V3 Pro,30 000,4 000 Hz,Sans fil,Ergo Droitier,63g
DeathAdder V4 Pro,35 000,8 000 Hz,Sans fil,Ergo Droitier,~58g
Viper V3 Pro,35 000,8 000 Hz,Sans fil,Symétrique,54g
Razer Basilisk V3 Pro,30 000,4 000 Hz (8k opt),Triple mode,Ergo Droitier,112g
Razer Viper V4 Pro,35 000,8 000 Hz,Sans fil,Symétrique,~52g
Razer Naga V2 Pro,30 000,1 000 Hz,Triple mode,Ergo (Interchangeable),134g
Razer Naga V2 HyperSpeed,30 000,1 000 Hz,Sans fil (Pile),Ergo (MMO),95g (vide)
Razer Pro Click V2,16 000,1 000 Hz,Triple mode,Ergo Productivité,106g
Razer Cobra Pro,30 000,1 000 Hz (4k opt),Triple mode,Symétrique (Petit),77g
Razer DeathAdder Essential,6 400,1 000 Hz,Filaire,Ergo Droitier,96g
Razer Orochi V2,18 000,1 000 Hz,Sans fil (BT/2.4G),Symétrique (Petit),< 60g
Corsair M75 Wireless,26 000,1 000 Hz,Triple mode,Ambidextre,89g
Corsair M65 RGB Ultra,26 000,8 000 Hz,Filaire,Ergo (Griffue),97g-115g
Corsair Scimitar Elite WL,26 000,2 000 Hz,Triple mode,Ergo (MMO),114g
Corsair Sabre RGB Pro WL,26 000,2 000 Hz,Sans fil,Ergo Droitier,79g
Corsair Katar Pro WL,10 000,1 000 Hz,Sans fil (BT/2.4G),Symétrique (Petit),96g
Corsair Dark Core RGB Pro,18 000,2 000 Hz,Triple mode,Ergo (Large),133g
Corsair Nightsword RGB,18 000,1 000 Hz,Filaire,Ergo Droitier,119g-141g
SS Aerox 9 Wireless,18 000,1 000 Hz,Triple mode,Ergo (MMO/Trouée),89g
SS Prime Wireless,18 000,1 000 Hz,Sans fil,Ergo Droitier,80g
SS Sensei Ten,18 000,1 000 Hz,Filaire,Ambidextre,92g
SS Rival 650 Wireless,12 000,1 000 Hz,Sans fil,Ergo Droitier,121g+
Asus ROG Harpe Ace,36 000,1 000 Hz,Triple mode,Symétrique,54g
Asus ROG Keris Wireless,16 000,1 000 Hz,Triple mode,Ergo Droitier,79g
Asus TUF M3,7 000,1 000 Hz,Filaire,Ergo Droitier,84g
Razer Viper 8KHz,20 000,8 000 Hz,Filaire,Symétrique,71g
Glorious Model O Wireless,19 000,1 000 Hz,Sans fil,Symétrique (Trouée),69g
Glorious Model D3 Wireless,26 000,1 000 Hz,Sans fil,Ergo Droitier,57g
Glorious Model I,19 000,1 000 Hz,Filaire,Ergo (Multi-boutons),69g
Endgame Gear OP1 8K,26 000,8 000 Hz,Filaire,Symétrique (Fine),50g
Endgame Gear XM2w,26 000,1 000 Hz,Sans fil,Symétrique,63g
Zowie EC2-C,3 200,1 000 Hz,Filaire,Ergo Droitier,73g
Zowie FK2-C,3 200,1 000 Hz,Filaire,Symétrique (Basse),70g
Zowie ZA13-C,3 200,1 000 Hz,Filaire,Symétrique (Dos haut),65g
Roccat Kone XP Air,19 000,1 000 Hz,Triple mode,Ergo (Multitâche),104g
Roccat Burst Pro,16 000,1 000 Hz,Filaire,Symétrique,68g
Turtle Beach Kone II Air,26 000,1 000 Hz,Triple mode,Ergo Droitier,110g
Keychron M7 8K,26 000,8 000 Hz,Triple mode,Ergo Droitier,63g
Cooler Master MM711,16 000,1 000 Hz,Filaire,Symétrique (Trouée),60g
Cooler Master MM720,16 000,1 000 Hz,Filaire,Ergo (Large/Court),49g
MSI GM41 Wireless,20 000,1 000 Hz,Sans fil,Symétrique,74g
Redragon M913 Impact,12 400,1 000 Hz,Sans fil,Ergo (MMO),130g
Microsoft Surface Mobile,1 800,125 Hz,Bluetooth,Ambidextre (Plate),78g
Microsoft Pro Intelli,16 000,1 000 Hz,Filaire,Ergo Droitier,104g
Microsoft Arc Mouse,1 000,125 Hz,Bluetooth,Pliable / Tactile,82g
HP X3000,1 600,125 Hz,Sans fil (USB),Ambidextre,80g
Dell MS116,1 000,125 Hz,Filaire,Ambidextre,90g
Trust GXT 144 Rexx,10 000,1 000 Hz,Filaire,Verticale Gaming,138g
Logitech MX Ergo,2 048,125 Hz,Triple mode,Trackball,259g
Logitech M705 Marathon,1 000,125 Hz,Sans fil (Unifying),Ergo Droitier,135g
Logitech M100 / B100,1 000,125 Hz,Filaire,Ambidextre,90g
ATK VXE R1 Pro Max,26 000,4 000 Hz,Sans fil,Symétrique,54g
G-Lab Kult Nitrogen,10 000,1 000 Hz,Filaire,Ergo Droitier,120g
Logitech MX518 (Legendary),16 000,1 000 Hz,Filaire,Ergo Droitier,101g
Logitech G400 / G400S,4 000,1 000 Hz,Filaire,Ergo Droitier,133g
Logitech G303 Shroud Ed.,25 600,1 000 Hz,Sans fil,Diamant (Unique),75g
Logitech G302,4 000,1 000 Hz,Filaire,Diamant (Petit),87g
MSI Clutch GM31 WL,12 000,1 000 Hz,Sans fil,Ergo Droitier,73g
Redragon M711 Cobra,10 000,1 000 Hz,Filaire,Symétrique,105g
Redragon M908 Impact,12 400,1 000 Hz,Filaire,Ergo (MMO),150g
Pulsar X2-H CrazyLight,26 000,4 000 Hz,Sans fil,Symétrique,47g
Pulsar ZywOo Edition,26 000,4 000 Hz,Sans fil,Ergo (Symmetrical),52g
MCHOSE K7 Ultra,26 000,8 000 Hz,Triple mode,Symétrique,55g
ATK Blazing Sky U2 8K,30 000,8 000 Hz,Sans fil,Symétrique,54g
Lamzu Atlantis Mini WL,26 000,1 000 Hz,Sans fil,Symétrique,49g
Kensington Ergo Series,1 600,125 Hz,Triple mode,Verticale,150g
Urban Factory Ergo,1 600,125 Hz,Sans fil,Verticale,115g
Zowie FK1-C,3 200,1 000 Hz,Filaire,Symétrique (Large),74g
Cooler Master MM731,19 000,1 000 Hz,Triple mode,Ergo Droitier,59g
SteelSeries Rival 110,7 200,1 000 Hz,Filaire,Symétrique,87g
SteelSeries Kana v2,4 000,1 000 Hz,Filaire,Ambidextre,72g
Razer Lancehead WL,16 000,1 000 Hz,Sans fil,Ambidextre,111g
Razer Atheris,7 200,125/1 000 Hz,Bluetooth/2.4G,Symétrique (Mini),66g (vide)
Razer Basilisk Ultimate,20 000,1 000 Hz,Sans fil,Ergo Droitier,107g
Logitech M90 / M100,1 000,125 Hz,Filaire,Ambidextre,82g
Logitech G603,12 000,1 000 Hz,Sans fil (Piles),Ergo Droitier,112-135g
Corsair M55 Wireless,24 000,1 000 Hz,Sans fil,Ambidextre,85g
Glorious Series One Pro,19 000,1 000 Hz,Sans fil,Symétrique,50g
Glorious Model O-,12 000,1 000 Hz,Filaire,Symétrique (Mini),58g
HyperX Pulsefire Dart,16 000,1 000 Hz,Sans fil (Qi),Ergo Droitier,110g
HyperX Pulsefire Raid,16 000,1 000 Hz,Filaire,Ergo (11 boutons),95g
Trust GXT 130,2 400,500 Hz,Sans fil,Ergo Droitier,150g
`.trim().split(/\r?\n/).map(function (line) {
    const parts = line.split(",");

    return [
      parts[0].trim(),
      buildProvidedSpecOverride(
        formatProvidedDpi(parts[1].trim()),
        parts[2].trim(),
        parts[3].trim(),
        parts[4].trim(),
        formatProvidedWeight(parts[5].trim())
      )
    ];
  }));

  const providedSpecNameMap = {
    "ATK Blazing Sky U2 8K": "ATK Blazing Sky U2 8K",
    "ATK Gaming Gear VXE R1 Pro Max Wireless": "ATK VXE R1 Pro Max",
    "Asus ROG Harpe Ace Aim Lab Edition": "Asus ROG Harpe Ace",
    "Asus ROG Keris Wireless": "Asus ROG Keris Wireless",
    "Asus TUF M3": "Asus TUF M3",
    "Cooler Master MM711": "Cooler Master MM711",
    "Cooler Master MM720": "Cooler Master MM720",
    "Cooler Master MM731": "Cooler Master MM731",
    "Corsair Dark Core RGB Pro": "Corsair Dark Core RGB Pro",
    "Corsair Katar Pro Wireless": "Corsair Katar Pro WL",
    "Corsair M55 Wireless": "Corsair M55 Wireless",
    "Corsair M65 RGB Ultra": "Corsair M65 RGB Ultra",
    "Corsair M75 Wireless": "Corsair M75 Wireless",
    "Corsair Nightsword RGB": "Corsair Nightsword RGB",
    "Corsair Sabre RGB Pro Wireless": "Corsair Sabre RGB Pro WL",
    "Corsair Scimitar Elite Wireless SE": "Corsair Scimitar Elite WL",
    "Dell MS116": "Dell MS116",
    "Endgame Gear OP1 8K": "Endgame Gear OP1 8K",
    "Endgame Gear XM2w": "Endgame Gear XM2w",
    "G-Lab Kult Nitrogen Core": "G-Lab Kult Nitrogen",
    "Glorious Model D3 Wireless": "Glorious Model D3 Wireless",
    "Glorious Model I": "Glorious Model I",
    "Glorious Model O Minus": "Glorious Model O-",
    "Glorious Model O Wireless": "Glorious Model O Wireless",
    "Glorious Series One Pro": "Glorious Series One Pro",
    "HP X3000": "HP X3000",
    "HyperX Pulsefire Dart": "HyperX Pulsefire Dart",
    "HyperX Pulsefire Raid": "HyperX Pulsefire Raid",
    "Kensington Ergo Series": "Kensington Ergo Series",
    "Keychron M7 8K": "Keychron M7 8K",
    "Lamzu Atlantis Mini Wireless": "Lamzu Atlantis Mini WL",
    "Logitech B100": "Logitech M100 / B100",
    "Logitech G203 Lightsync": "G203 Lightsync",
    "Logitech G302": "Logitech G302",
    "Logitech G303 Shroud Edition": "Logitech G303 Shroud Ed.",
    "Logitech G305 Lightspeed / G304": "G305 Lightspeed",
    "Logitech G400 / G400S": "Logitech G400 / G400S",
    "Logitech G403 Hero": "G403 Hero",
    "Logitech G502 Hero": "G502 Hero",
    "Logitech G502 X": "G502 X",
    "Logitech G502 X Plus": "G502 X Plus",
    "Logitech G600 MMO": "G600 MMO",
    "Logitech G603 Lightspeed": "Logitech G603",
    "Logitech G604 Lightspeed": "G604 Lightspeed",
    "Logitech G703 Lightspeed": "G703 Lightspeed",
    "Logitech G705 Lightspeed": "G705 (Aurora)",
    "Logitech G Pro X Superlight": "G Pro X Superlight",
    "Logitech G Pro X Superlight 2 SE": "G Pro X Superlight 2 (SE)",
    "Logitech Lift": "Lift",
    "Logitech M170 / M171": "M170 / M171",
    "Logitech M220 Silent": "M220 / M221 Silent",
    "Logitech M221 Silent": "M220 / M221 Silent",
    "Logitech M320": "M320",
    "Logitech M330 Silent Plus": "M330 Silent Plus",
    "Logitech M337 / M535": "M337 / M535",
    "Logitech M705 Marathon": "Logitech M705 Marathon",
    "Logitech M720 Triathlon": "M720 Triathlon",
    "Logitech M90": "Logitech M90 / M100",
    "Logitech MX Anywhere 2S": "MX Anywhere 2S",
    "Logitech MX Anywhere 3S": "MX Anywhere 3S",
    "Logitech MX Ergo": "Logitech MX Ergo",
    "Logitech MX Master 3S": "MX Master 3S",
    "Logitech MX Master 4": "MX Master 4",
    "Logitech MX Vertical": "MX Vertical",
    "Logitech MX518": "Logitech MX518 (Legendary)",
    "Logitech POP Mouse": "POP Mouse",
    "Logitech Signature M650": "Signature M650",
    "MCHOSE K7 Ultra Lightweight": "MCHOSE K7 Ultra",
    "MSI Clutch GM31 (wireless)": "MSI Clutch GM31 WL",
    "MSI Clutch GM41 Wireless": "MSI GM41 Wireless",
    "Microsoft Arc Mouse": "Microsoft Arc Mouse",
    "Microsoft Pro Intellimouse": "Microsoft Pro Intelli",
    "Microsoft Surface Mobile Mouse": "Microsoft Surface Mobile",
    "Pulsar X2-H CrazyLight": "Pulsar X2-H CrazyLight",
    "Pulsar ZywOo The Chosen": "Pulsar ZywOo Edition",
    "Razer Atheris": "Razer Atheris",
    "Razer Basilisk Ultimate": "Razer Basilisk Ultimate",
    "Razer Basilisk V3 Pro": "Razer Basilisk V3 Pro",
    "Razer Cobra Pro": "Razer Cobra Pro",
    "Razer DeathAdder Essential": "Razer DeathAdder Essential",
    "Razer DeathAdder V3 Pro": "DeathAdder V3 Pro",
    "Razer DeathAdder V4 Pro": "DeathAdder V4 Pro",
    "Razer Lancehead": "Razer Lancehead WL",
    "Razer Naga V2 HyperSpeed": "Razer Naga V2 HyperSpeed",
    "Razer Naga V2 Pro": "Razer Naga V2 Pro",
    "Razer Orochi V2": "Razer Orochi V2",
    "Razer Pro Click V2": "Razer Pro Click V2",
    "Razer Viper 8KHz": "Razer Viper 8KHz",
    "Razer Viper V3 Pro": "Viper V3 Pro",
    "Razer Viper V4 Pro": "Razer Viper V4 Pro",
    "Redragon M711 Cobra": "Redragon M711 Cobra",
    "Redragon M908 Impact": "Redragon M908 Impact",
    "Redragon M913 Impact Elite": "Redragon M913 Impact",
    "Roccat Kone Burst Pro": "Roccat Burst Pro",
    "Roccat Kone XP Air": "Roccat Kone XP Air",
    "SteelSeries Aerox 9 Wireless": "SS Aerox 9 Wireless",
    "SteelSeries Kana v2": "SteelSeries Kana v2",
    "SteelSeries Prime Wireless": "SS Prime Wireless",
    "SteelSeries Rival 110": "SteelSeries Rival 110",
    "SteelSeries Rival 650 Wireless": "SS Rival 650 Wireless",
    "SteelSeries Sensei Ten": "SS Sensei Ten",
    "Trust GXT 130": "Trust GXT 130",
    "Trust GXT 144": "Trust GXT 144 Rexx",
    "Turtle Beach Kone II Air": "Turtle Beach Kone II Air",
    "Urban Factory Ergo Mouse": "Urban Factory Ergo",
    "Zowie EC2": "Zowie EC2-C",
    "Zowie FK1": "Zowie FK1-C",
    "Zowie FK2-C": "Zowie FK2-C",
    "Zowie ZA13": "Zowie ZA13-C"
  };

  const getProvidedSpecOverride = (name, label) => {
    const rowName = providedSpecNameMap[name];
    const row = rowName ? providedSpecRows.get(rowName) : null;

    return row ? row[label] : null;
  };

  const deriveTypeCategory = (value, fallback) => {
    const normalized = toSearch(value);

    if (!normalized) {
      return fallback;
    }

    if (/sans fil|wireless|bluetooth|bolt|unifying|2\.4|2 4|qi|pile|piles|triple|tri mode/.test(normalized)) {
      return "Sans-fil";
    }

    if (/filaire|wired/.test(normalized)) {
      return "Filaire";
    }

    return fallback;
  };

  const deriveShapeCategory = (value, fallback) => {
    const normalized = toSearch(value);

    if (!normalized) {
      return fallback;
    }

    if (/trackball/.test(normalized)) {
      return "Trackball";
    }

    if (/verticale|vertical|ergo|ergonomique|droitier|productivite|productivité/.test(normalized)) {
      return "Ergonomique";
    }

    if (/ambidextre|symetrique|symétrique|diamant|plate|pliable|tactile/.test(normalized)) {
      return "Ambidextre";
    }

    return fallback;
  };

  const getConfirmedSpecInfo = (name, label, fallback) => {
    const override = getProvidedSpecOverride(name, label)
      || (confirmedSpecOverrides[name] && confirmedSpecOverrides[name][label]);
    return override ? buildSpecField(override, "confirmed") : fallback;
  };

  const inferDpi = (name, group, rawSpecs, text) => {
    const rawDpi = getSpecValue(rawSpecs, ["dpi"]);
    const rawSensor = getSpecValue(rawSpecs, ["capteur"]);
    const dpiValues = extractUnitValues(rawDpi, "dpi").concat(extractLooseNumberValues(rawDpi));
    const sensorValues = extractUnitValues(rawSensor, "dpi").concat(extractKValues(rawSensor).filter(function (value) {
      return value >= 10000;
    }));
    const textValues = extractUnitValues(text, "dpi");
    const detected = maxValue(dpiValues.concat(sensorValues, textValues));
    const lowerName = name.toLowerCase();

    if (detected) {
      return buildSpecField(formatNumber(detected) + " DPI", "confirmed");
    }

    if (/(mx master 4|mx master 3s|mx vertical)/.test(lowerName)) {
      return buildSpecField("8 000 DPI", "estimated");
    }

    if (/(mx master 3|mx anywhere|lift|signature m650|pop mouse|pro click|surface mobile)/.test(lowerName)) {
      return buildSpecField("4 000 DPI", "estimated");
    }

    if (/(m170|m171|m220|m221|m320|m330|m337|m535|yvi\+|230 slim|lenovo 600)/.test(lowerName)) {
      return buildSpecField("1 000 DPI", "estimated");
    }

    return buildSpecField("À confirmer", "unknown");
  };

  const inferPollingRate = (name, group, rawSpecs, text) => {
    const rawPolling = getSpecValue(rawSpecs, ["polling"]);
    const hzValues = extractUnitValues(rawPolling + " " + text, "hz");
    const kValues = extractKValues(rawPolling).concat(/\b8k\b/i.test(name + " " + text) ? [8000] : []);
    const detected = maxValue(hzValues.concat(kValues));

    if (detected) {
      return buildSpecField(formatNumber(detected) + " Hz", "confirmed");
    }

    if (/\b8k\b/i.test(name + " " + text)) {
      return buildSpecField("8 000 Hz", "estimated");
    }

    return buildSpecField("À confirmer", "unknown");
  };

  const inferWeight = (name, group, rawSpecs, text, shapeValue) => {
    const rawWeight = getSpecValue(rawSpecs, ["poids", "weight"]);
    const detected = maxValue(extractUnitValues(rawWeight, "g").concat(extractContextualWeightValues(text)));
    const lowerName = name.toLowerCase();

    if (detected) {
      return buildSpecField(formatNumber(detected) + " g", "confirmed");
    }

    if (/(superlight|crazylight)/.test(lowerName)) {
      return buildSpecField("55 g", "estimated");
    }

    if (/(atlantis mini|harpe ace mini|surface mobile|mini)/.test(lowerName) && /gaming/i.test(group.segment)) {
      return buildSpecField("59 g", "estimated");
    }

    if (/(g502|scimitar|naga|mx master|vertical|lift|kone xp|kone ii|m720|m65|pro click v2 vertical)/.test(lowerName)) {
      return buildSpecField("110 g", "estimated");
    }

    if (shapeValue === "Ergonomique" && /bureautique|classique|classic|productivité/i.test(group.segment)) {
      return buildSpecField("118 g", "estimated");
    }

    return buildSpecField("À confirmer", "unknown");
  };

  const buildStandardSpecs = (name, group, entry, text) => {
    const rawSpecs = Array.isArray(entry.specs) ? entry.specs : [];
    const inferredTypeValue = inferType(name, group, rawSpecs, text);
    const inferredShapeValue = inferShape(name, group, rawSpecs, text);
    const fallbackShapeValue = confirmedShapeOverrides[name] || inferredShapeValue;
    const fallbackShapeStatus = confirmedShapeOverrides[name] ? "confirmed" : "profile";
    const typeInfo = getConfirmedSpecInfo(name, "Type", buildSpecField(inferredTypeValue, "profile"));
    const shapeInfo = getConfirmedSpecInfo(name, "Forme", buildSpecField(fallbackShapeValue, fallbackShapeStatus));
    const typeValue = deriveTypeCategory(typeInfo.value, inferredTypeValue);
    const shapeValue = deriveShapeCategory(shapeInfo.value, fallbackShapeValue);
    const dpiInfo = getConfirmedSpecInfo(name, "DPI", inferDpi(name, group, rawSpecs, text));
    const pollingInfo = getConfirmedSpecInfo(name, "Polling Rate", inferPollingRate(name, group, rawSpecs, text));
    const weightInfo = getConfirmedSpecInfo(name, "Poids", inferWeight(name, group, rawSpecs, text, shapeValue));
    const specMap = {
      "DPI": dpiInfo.value,
      "Polling Rate": pollingInfo.value,
      "Poids": weightInfo.value,
      "Type": typeInfo.value,
      "Forme": shapeInfo.value
    };
    const statusMap = {
      "DPI": dpiInfo.status,
      "Polling Rate": pollingInfo.status,
      "Poids": weightInfo.status,
      "Type": typeInfo.status,
      "Forme": shapeInfo.status
    };

    return {
      map: specMap,
      typeValue: typeValue,
      shapeValue: shapeValue,
      statusMap: statusMap,
      list: [
        { label: "DPI", value: dpiInfo.value, status: dpiInfo.status },
        { label: "Polling Rate", value: pollingInfo.value, status: pollingInfo.status },
        { label: "Poids", value: weightInfo.value, status: weightInfo.status },
        { label: "Type", value: typeInfo.value, status: typeInfo.status },
        { label: "Forme", value: shapeInfo.value, status: shapeInfo.status }
      ]
    };
  };

  const getSpecNumber = (value, unit) => {
    if (!value || /À confirmer/i.test(value)) {
      return null;
    }

    if (unit === "dpi") {
      return maxValue(extractUnitValues(value, "dpi").concat(extractKValues(value)));
    }

    if (unit === "hz") {
      return maxValue(extractUnitValues(value, "hz").concat(extractKValues(value)));
    }

    return maxValue(extractUnitValues(value, unit));
  };

  const pushUnique = (list, value) => {
    if (value && list.indexOf(value) === -1) {
      list.push(value);
    }
  };

  const getPrimaryUseProfile = (name, group, specMap, referenceText) => {
    const combined = [name, group.segment, specMap.Type, specMap.Forme, referenceText].join(" ").toLowerCase();
    const isOfficeSegment = /bureautique|classique|productivité/i.test(group.segment) && !/gaming/i.test(group.segment);

    if (group.status === "legacy") {
      return { key: "legacy", label: "comparaison historique" };
    }

    if (/(mmo|naga|scimitar|g600|m908|impact|g502|basilisk|dark core|nightsword|kone xp|m612|triathlon)/.test(combined)) {
      return { key: "mmo", label: "jeu polyvalent, MMO et macros" };
    }

    if (/(mx |anywhere|vertical|lift|signature|pop mouse|surface mobile|m170|m171|m220|m221|m320|m330|m337|m535|yvi\+|230 slim|lenovo 600|wm126|ms116|arc mouse|ergo|pro click)/.test(combined) || isOfficeSegment) {
      return { key: "office", label: "bureautique, mobilité et confort" };
    }

    if (/(superlight|superstrike|viper|harpe|aerox|op1|xm2|atlantis|x2-h|crazylight|8k|deathadder|prime|sensei|model o|rival|pulsefire|gladius|keris|chakram|m75|m55)/.test(combined) || /gaming/i.test(group.segment)) {
      return { key: "fps", label: "jeu rapide et compétition" };
    }

    return { key: "general", label: "usage polyvalent" };
  };

  const buildDataQuality = (statusMap, hasDirectSource) => {
    const technicalLabels = ["DPI", "Polling Rate", "Poids"];
    const confirmedCount = technicalLabels.filter(function (label) {
      return statusMap[label] === "confirmed";
    }).length;
    const estimatedCount = technicalLabels.filter(function (label) {
      return statusMap[label] === "estimated";
    }).length;

      if (confirmedCount >= 2 && hasDirectSource) {
        return {
          level: "solid",
          label: "Solid profile",
          note: "This profile relies on a more direct product source and several confirmed technical values."
        };
      }

      if (confirmedCount >= 1 || estimatedCount >= 2 || hasDirectSource) {
        return {
          level: "partial",
          label: "Useful but partial profile",
          note: "You can already form a buying opinion, but part of the technical data is still estimated or needs cross-checking."
        };
      }

      return {
        level: "caution",
        label: "Needs cross-checking",
        note: "This profile mainly helps position the product. Before buying, verify the weight, polling rate, and exact manufacturer page."
      };
    };

  const buildReview = (name, group, entry, standardizedSpecs, hasDirectSource) => {
    const specMap = standardizedSpecs.map;
    const statusMap = standardizedSpecs.statusMap;
    const typeValue = standardizedSpecs.typeValue || deriveTypeCategory(specMap.Type, specMap.Type);
    const shapeValue = standardizedSpecs.shapeValue || deriveShapeCategory(specMap.Forme, specMap.Forme);
    const referenceText = normalizeCatalogText([
      name,
      group.segment,
      entry.summary || "",
      (entry.highlights || []).join(" ")
    ].join(" ")).toLowerCase();
    const profile = getPrimaryUseProfile(name, group, specMap, referenceText);
    const dataQuality = buildDataQuality(statusMap, hasDirectSource);
    const weight = getSpecNumber(specMap.Poids, "g");
    const polling = getSpecNumber(specMap["Polling Rate"], "hz");
    const buyReasons = [];
    const avoidReasons = [];
    const isWireless = typeValue === "Sans-fil";
    const isErgo = shapeValue === "Ergonomique";
    const manyButtons = /(mmo|naga|scimitar|g600|g502|basilisk|m612|m908|impact|dark core|nightsword|kone xp|triathlon)/.test(referenceText);
    const mobileUse = /(anywhere|pop mouse|surface mobile|m170|m171|m220|m221|m337|m535|230 slim|lenovo 600|mobile|nomade)/.test(referenceText);

    if (group.status === "legacy") {
      pushUnique(buyReasons, "Worth considering mainly if you compare generations or want a notable part of PC mouse history.");
      pushUnique(avoidReasons, "Legacy model: availability, software support, and value are often less compelling today.");
    }

    if (isWireless) {
      pushUnique(buyReasons, "Wireless convenience is a plus if you want a cleaner desk or more freedom of movement.");
    } else {
      pushUnique(buyReasons, "Wired setup is simpler if you want to avoid charging, batteries, or wireless trade-offs.");
    }

    if (isErgo) {
      pushUnique(buyReasons, "Fuller shape that suits palm grip for gaming or work.");
      pushUnique(avoidReasons, "Less universal shape if you prefer symmetrical shells or change grips often.");
    } else {
      pushUnique(buyReasons, "More neutral shape if you alternate claw, fingertip, or multiple grip styles.");
      pushUnique(avoidReasons, "Often less supportive if you want strong palm support and plenty of comfort at rest.");
    }

    if (weight !== null && weight <= 60) {
      pushUnique(buyReasons, "Very low weight helps if you prefer fast movements and snappy resets.");
    }

    if (weight !== null && weight >= 100) {
      pushUnique(avoidReasons, "Fairly heavy body for fast-paced FPS or if you want a very lively mouse.");
    }

    if (polling !== null && polling >= 4000) {
      pushUnique(buyReasons, "High polling rate can be valuable for very competitive play.");
    }

    if (manyButtons) {
      pushUnique(buyReasons, "Lots of direct controls if you play MMOs, assign macros, or like keeping everything under your thumb.");
      pushUnique(avoidReasons, "Busier shape if you want a minimal, lightweight mouse that feels very simple in hand.");
    }

    if (profile.key === "office") {
      pushUnique(buyReasons, "Good fit for office work, mobility, or everyday comfort.");
      pushUnique(avoidReasons, "Less relevant if your only priority is pure esports or the highest possible polling rate.");
    }

    if (profile.key === "fps") {
      pushUnique(buyReasons, "More convincing for fast games than for macro-heavy or office-focused use.");
      pushUnique(avoidReasons, "Less suitable if you mainly want desk comfort or a command-pad style mouse.");
    }

    if (dataQuality.level !== "solid") {
      pushUnique(avoidReasons, "Profile is still partial: some technical values are estimated or still need confirmation.");
    }

    if (!hasDirectSource) {
      pushUnique(avoidReasons, "Available source mostly points to a brand catalog, not always the exact product page.");
    }

    if (mobileUse) {
      pushUnique(buyReasons, "More coherent format if you move often between devices or work on the go.");
    }

    [
      "The final choice will still come down mainly to shape and real comfort in hand.",
      "A partial profile does not mean the product is bad, but it does require a bit more checking before buying.",
      "If the grip already feels right to you, this profile is a good first filter before checking the sources."
    ].forEach(function (item) {
      if (buyReasons.length < 3) {
        pushUnique(buyReasons, item);
      }
    });

    [
      "If you buy without trying it, shape and width matter more than the raw DPI number.",
      "Even with a good profile, real comfort still depends on your grip, hand size, and main use.",
      "If you hesitate between similar models, real weight, scroll wheel feel, and buttons often make the real difference."
    ].forEach(function (item) {
      if (avoidReasons.length < 3) {
        pushUnique(avoidReasons, item);
      }
    });

    var bestFor;
    var skipFor;

    if (profile.key === "legacy") {
      bestFor = "collection, nostalgia, or comparison with newer mice";
      skipFor = "if you want the most rational buy and the best current performance-to-price value";
    } else if (profile.key === "mmo") {
      bestFor = "MMO, MOBA, versatile gaming, and lots of direct controls";
      skipFor = "if you want a light, minimal shell for pure FPS";
    } else if (profile.key === "office") {
      bestFor = mobileUse
        ? "mobile work, multi-device setups, and compact desks"
        : "long office sessions, remote work, and everyday comfort";
      skipFor = "if you mainly want esports, the lowest possible weight, or very aggressive responsiveness";
    } else if (profile.key === "fps") {
      bestFor = isErgo
        ? "FPS or fast games with stronger palm support"
        : "FPS, tracking, and claw / fingertip grips";
      skipFor = "if you mainly want macros, passive palm support, or a very office-oriented mouse";
    } else {
      bestFor = "versatile use where shape matters more than the raw spec sheet";
      skipFor = "if you want an ultra-specialized position with no compromises";
    }

    const verdict = [
      profile.key === "legacy"
        ? "I would mostly look at it as a historical comparison point, not as the default buy."
        : "I would mainly recommend it if you want " + bestFor + ".",
      dataQuality.level === "solid"
        ? "The profile is solid enough to form a real first opinion, but shape is still the final judge."
        : dataQuality.level === "partial"
          ? "It looks interesting, but I would still cross-check two or three technical points before deciding."
          : "I would stay cautious before buying, because several details are still partial."
    ].join(" ");

    return {
      verdict: capitalizeSentenceStarts(verdict),
      whyBuy: capitalizeSentenceList(buyReasons.slice(0, 3)),
      whyAvoid: capitalizeSentenceList(avoidReasons.slice(0, 3)),
      bestFor: capitalizeSentenceStarts(bestFor),
      skipFor: capitalizeSentenceStarts(skipFor),
      confidence: Object.assign({}, dataQuality, {
        note: capitalizeSentenceStarts(dataQuality.note)
      })
    };
  };

  const resolveImage = (name, brand, entry, specMap, sources) => {
    if (entry.image && !/^https?:\/\//i.test(entry.image) && !/^data:/i.test(entry.image)) {
      return {
        url: entry.image,
        status: "local"
      };
    }

    if (entry.image && /^https?:\/\//i.test(entry.image)) {
      return {
        url: entry.image,
        status: "official"
      };
    }

    if (sources && sources.length && sources[0].url) {
      return {
        url: buildWebPreviewImage(sources[0].url),
        status: "web"
      };
    }

    return {
      url: buildPlaceholderImage(name, brand, specMap.Type, specMap.Forme),
      status: "placeholder"
    };
  };

  /**
   * Construit le texte de recherche pour une souris
   * Inclut: nom, marque, segment, résumé, highlights, et toutes les specs
   */
  const buildSearchText = (entry, group, specMap) => {
    // Extraire le type de capteur depuis les specs brutes de l'entrée
    const rawSpecs = Array.isArray(entry.specs) ? entry.specs : [];
    const sensorSpec = rawSpecs.find(function(spec) {
      return /capteur|sensor|pixart|hero|optical|laser/i.test(spec.label || '');
    });
    const sensorValue = sensorSpec ? sensorSpec.value : '';

    // Extraire tous les labels/valeurs des specs pour une recherche complète
    const allSpecText = rawSpecs.map(function(spec) {
      return (spec.label || '') + ' ' + (spec.value || '');
    }).join(' ');

    // Mots-clés additionnels basés sur le nom du produit
    const nameKeywords = entry.name || '';
    const extractedKeywords = [
      // Extraire les termes de gaming
      /pro|gaming|esport|competition|fps|mmo/i.test(nameKeywords) ? 'gaming esport pro competition' : '',
      // Extraire les types de connexion
      /wireless|sans.?fil|lightspeed|bluetooth/i.test(nameKeywords) ? 'wireless sans fil' : '',
      /filaire|wired/i.test(nameKeywords) ? 'wired filaire' : '',
      // Extraire les features spéciales
      /silent|silencieux/i.test(nameKeywords) ? 'silent silencieux quiet' : '',
      /hero/i.test(nameKeywords) ? 'hero capteur sensor' : '',
      /optical/i.test(nameKeywords) ? 'optical optique' : '',
      /laser/i.test(nameKeywords) ? 'laser' : ''
    ].join(' ');

    const searchParts = [
      entry.name,
      group.brand,
      group.segment,
      entry.summary,
      (entry.highlights || []).join(" "),
      // Specs standardisées
      specMap.DPI,
      specMap["Polling Rate"],
      specMap.Poids,
      specMap.Type,
      specMap.Forme,
      // Capteur extrait des specs
      sensorValue,
      // Toutes les specs brutes
      allSpecText,
      // Mots-clés extraits
      extractedKeywords
    ];

    return searchParts.filter(Boolean).join(" ").toLowerCase();
  };

  let orderCounter = 0;

  window.MOUSE_DATA = groups.flatMap(function (group) {
    return group.items.map(function (item, index) {
      const curated = curatedEntries[item] || {};
      const baseEntry = Object.assign({
        id: normalize(group.brand + "-" + item + "-" + index),
        order: orderCounter++,
        brand: group.brand,
        name: item,
        segment: group.segment,
        status: group.status || "active",
        summary: "",
        highlights: [],
        specs: [],
        sources: [],
        image: null
      }, curated);

      if (localImageOverrides[item]) {
        baseEntry.image = localImageOverrides[item];
      } else if (
        baseEntry.image &&
        !/^https?:\/\//i.test(baseEntry.image) &&
        !/^data:/i.test(baseEntry.image) &&
        !validLocalImages.has(baseEntry.image)
      ) {
        baseEntry.image = null;
      }

      const sourceText = [
        baseEntry.summary,
        (baseEntry.highlights || []).join(" "),
        (baseEntry.specs || []).map(function (spec) {
          return spec.label + " " + spec.value;
        }).join(" ")
      ].join(" ");
      const standardizedSpecs = buildStandardSpecs(item, group, baseEntry, sourceText);
      const hasDirectSource = Array.isArray(baseEntry.sources) && baseEntry.sources.length > 0;
      const sources = baseEntry.sources && baseEntry.sources.length
        ? baseEntry.sources
        : buildDefaultSources(item, group.brand);
      const placeholderImage = buildPlaceholderImage(item, group.brand, standardizedSpecs.map.Type, standardizedSpecs.map.Forme);
      const resolvedImage = resolveImage(item, group.brand, baseEntry, standardizedSpecs.map, sources);
      const generatedSummary = capitalizeSentenceStarts(buildSummary(item, group, standardizedSpecs, hasDirectSource));
      const generatedHighlights = buildHighlights({ highlights: [] }, group, standardizedSpecs.map, resolvedImage.status);
      const summary = capitalizeSentenceStarts(normalizeSpace(baseEntry.summary) || generatedSummary);
      const highlights = buildHighlights(baseEntry, group, standardizedSpecs.map, resolvedImage.status);
      const review = buildReview(item, group, baseEntry, standardizedSpecs, hasDirectSource);

      const normalizedEntry = normalizeCatalogValue(Object.assign({}, baseEntry, {
        summary: summary,
        highlights: highlights,
        autoSummary: generatedSummary,
        autoHighlights: generatedHighlights,
        specs: standardizedSpecs.list,
        specMap: standardizedSpecs.map,
        specStatusMap: standardizedSpecs.statusMap,
        typeValue: standardizedSpecs.typeValue,
        shapeValue: standardizedSpecs.shapeValue,
        review: review,
        sources: sources,
        image: resolvedImage.url,
        imageStatus: resolvedImage.status,
        placeholderImage: placeholderImage,
        searchText: buildSearchText(Object.assign({}, baseEntry, {
          name: item,
          summary: summary,
          highlights: highlights
        }), group, standardizedSpecs.map)
      }));

      normalizedEntry.searchText = buildSearchText(
        normalizedEntry,
        normalizedEntry,
        normalizedEntry.specMap
      );

      return normalizedEntry;
    });
  });

  /**
   * Utilitaire de vérification des doublons
   * Vérifie qu'il n'y a pas de doublons d'IDs ou de produits
   */
  const DuplicateChecker = (function() {
    const check = function() {
      const ids = [];
      const names = [];
      const duplicates = {
        ids: [],
        names: []
      };

      window.MOUSE_DATA.forEach(function(mouse) {
        // Vérifier les IDs dupliqués
        if (ids.includes(mouse.id)) {
          duplicates.ids.push(mouse.id);
        } else {
          ids.push(mouse.id);
        }

        // Vérifier les noms dupliqués (même produit dans différents groupes)
        if (names.includes(mouse.name)) {
          duplicates.names.push(mouse.name);
        } else {
          names.push(mouse.name);
        }
      });

      if (duplicates.ids.length > 0) {
        console.warn('[DuplicateChecker] Doublons d\'IDs trouvés:', duplicates.ids);
      }
      if (duplicates.names.length > 0) {
        console.warn('[DuplicateChecker] Produits en double trouvés:', duplicates.names);
      }

      return {
        hasDuplicates: duplicates.ids.length > 0 || duplicates.names.length > 0,
        duplicates: duplicates,
        total: window.MOUSE_DATA.length,
        uniqueIds: ids.length,
        uniqueNames: names.length
      };
    };

    return { check: check };
  })();

  // Exécuter la vérification après génération
  const checkResult = DuplicateChecker.check();
  if (checkResult.hasDuplicates) {
    console.warn('[MOUSE_DATA] Des doublons ont été détectés:', checkResult.duplicates);
  } else {
    console.log('[MOUSE_DATA] Aucun doublon détecté. ' + checkResult.total + ' produits générés.');
  }

  /**
   * Vérifie la cohérence avec products.json si disponible
   * S'assure que tous les IDs dans products.json existent dans MOUSE_DATA
   */
  const checkProductsJsonConsistency = function() {
    // Vérifier si window.PRODUCTS_DATA existe (doit être chargé séparément)
    if (typeof window === 'undefined' || !window.PRODUCTS_DATA) {
      return; // products.json non chargé
    }

    const productsIds = Object.keys(window.PRODUCTS_DATA);
    const mouseDataIds = window.MOUSE_DATA.map(function(m) { return m.id; });
    const missingInMouseData = [];
    const missingInProducts = [];

    // Vérifier les IDs de products.json qui n'existent pas dans MOUSE_DATA
    productsIds.forEach(function(id) {
      if (!mouseDataIds.includes(id)) {
        missingInMouseData.push(id);
      }
    });

    // Vérifier si on veut aussi détecter les IDs de MOUSE_DATA absents de products.json
    // (uniquement si products.json est censé être exhaustif)
    // mouseDataIds.forEach(function(id) {
    //   if (!productsIds.includes(id)) {
    //     missingInProducts.push(id);
    //   }
    // });

    if (missingInMouseData.length > 0) {
      console.warn('[ProductsJSON] IDs dans products.json mais pas dans MOUSE_DATA:', missingInMouseData);
    }

    return {
      productsCount: productsIds.length,
      mouseDataCount: mouseDataIds.length,
      missingInMouseData: missingInMouseData,
      consistent: missingInMouseData.length === 0
    };
  };

  // Exposer la fonction pour être appelée après chargement de products.json
  window.checkProductsConsistency = checkProductsJsonConsistency;

  // Si products.json est déjà chargé, vérifier immédiatement
  if (typeof window !== 'undefined' && window.PRODUCTS_DATA) {
    checkProductsJsonConsistency();
  }
}());

