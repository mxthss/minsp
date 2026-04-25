/**
 * Données des claviers
 * Structure similaire à mice.js
 */
(function () {
  const keyboardGroups = [
    {
      brand: "ATK",
      segment: "Gaming",
      items: [
        "ATK HEX 80"
      ]
    },
    {
      brand: "SteelSeries",
      segment: "Gaming",
      items: [
        "SteelSeries Apex Pro TKL Gen 3"
      ]
    }
  ];

  // Entrées détaillées pour chaque clavier
  const keyboardEntries = {
    "ATK HEX 80": {
      image: "./assets/keyboards/atk-hex-80.webp",
      summary: "L'ATK HEX 80 est un clavier gaming 80% (TKL) ultra-performant conçu pour les joueurs compétitifs. Avec ses switches rapides, sa latence minimale et son format compact sans pavé numérique, il offre un équilibre parfait entre performance et ergonomie.",
      highlights: [
        "Format 80% (TKL) compact et efficace",
        "Switches mécaniques ultra-rapides",
        "Latence extrêmement faible pour l'esport",
        "Construction robuste avec plate en aluminium",
        "RGB personnalisable par touche"
      ],
      specs: [
        { label: "Format", value: "80% / TKL (Tenkeyless)" },
        { label: "Type", value: "Mécanique" },
        { label: "Switches", value: "ATK Hex (linéaire rapide)" },
        { label: "Polling Rate", value: "8000 Hz" },
        { label: "Latence", value: "< 1 ms" },
        { label: "Connectivité", value: "USB-C filaire" },
        { label: "Material", value: "Aluminium / Plastique haute qualité" },
        { label: "RGB", value: "Par touche, personnalisable" }
      ],
      sources: [
        {
          label: "Site officiel ATK",
          url: "https://www.atkgaming.com/"
        }
      ]
    },
    
    "SteelSeries Apex Pro TKL Gen 3": {
      image: "./assets/keyboards/apex-pro-tkl-gen-3.webp",
      summary: "L'Apex Pro TKL Gen 3 est le clavier gaming ultime de SteelSeries, équipé des switches OmniPoint 2.0 réglables magnétiquement. Chaque touche peut être ajustée individuellement pour la sensibilité, offrant une personnalisation inégalée pour le gaming et la productivité.",
      highlights: [
        "Switches OmniPoint 2.0 réglables magnétiquement",
        "Actuation ajustable de 0.1mm à 4.0mm",
        "Double processeur pour latence nulle",
        "Format TKL compact pour plus d'espace souris",
        "OLED Smart Display intégré",
        "Construction en aluminium aircraft-grade"
      ],
      specs: [
        { label: "Format", value: "80% / TKL (Tenkeyless)" },
        { label: "Type", value: "Mécanique magnétique" },
        { label: "Switches", value: "OmniPoint 2.0" },
        { label: "Actuation", value: "0.1mm - 4.0mm (réglable)" },
        { label: "Polling Rate", value: "1000 Hz" },
        { label: "Temps de réponse", value: "0.5 ms" },
        { label: "Connectivité", value: "USB-C filaire" },
        { label: "Material", value: "Aluminium aircraft-grade" },
        { label: "RGB", value: "Par touche PrismSync" },
        { label: "Fonctions", value: "OLED Smart Display, molette multimédia" }
      ],
      sources: [
        {
          label: "Fiche officielle SteelSeries",
          url: "https://steelseries.com/gaming-keyboards/apex-pro-tkl"
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

  // Générer KEYBOARD_DATA
  let orderCounter = 0;

  window.KEYBOARD_DATA = keyboardGroups.flatMap(function (group) {
    return group.items.map(function (item, index) {
      const curated = keyboardEntries[item] || {};
      const baseEntry = Object.assign({
        id: normalize(group.brand + "-" + item + "-" + index),
        order: orderCounter++,
        brand: group.brand,
        name: item,
        segment: group.segment,
        status: group.status || "active",
        category: "keyboard",
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
        baseEntry.summary,
        (baseEntry.highlights || []).join(" "),
        (baseEntry.specs || []).map(function(s) { return s.value; }).join(" ")
      ];

      baseEntry.searchIndex = searchParts.filter(Boolean).join(" ").toLowerCase();

      return normalizeCatalogValue(baseEntry);
    });
  });

  console.log('[KEYBOARD_DATA] ' + window.KEYBOARD_DATA.length + ' claviers chargés.');
}());
