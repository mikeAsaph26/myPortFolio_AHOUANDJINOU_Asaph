/* ============================================================
   PORTFOLIO — AHOUANDJINOU Asaph Néri Michaël
   projects.js — Données des projets
   Pour ajouter un projet : ajouter un objet dans le tableau
   correspondant (rendus / pcb / impressions3d)
   ============================================================ */

const projects = {

  /* ── Rendus 3D ────────────────────────────────────────── */
  rendus: [
    {
      src:   "Assembly_LumicheckNeo.png",
      name:  "Assembly LumicheckNeo",
      desc:  "Assemblage complet du dispositif LumicheckNeo",
      tags:  ["Fusion 360", "Rendu"],
    },
    {
      src:   "Design_Case_tuberculosis-detector.png",
      name:  "Boîtier Tuberculosis Detector",
      desc:  "Design du boîtier pour détecteur de tuberculose",
      tags:  ["Fusion 360", "Médical"],
    },
    {
      src:   "Design_porteCle_personanalise.png",
      name:  "Porte-clé personnalisé",
      desc:  "Design d'un porte-clé personnalisé en CAO",
      tags:  ["Fusion 360", "Personnalisation"],
    },
    {
      src:   "Dice_design_prototype.png",
      name:  "Prototype Dice Design",
      desc:  "Prototype de conception en forme de dé",
      tags:  ["Fusion 360", "Prototype"],
    },
    {
      src:   "Support_Micro_Assembly.png",
      name:  "Support Micro Assembly",
      desc:  "Support pour assemblage de composants micro",
      tags:  ["Fusion 360", "Mécanique"],
    },
    {
      src:   "01_assemblage d'un_extracteur_fumees.png",
      name:  "Extracteur de fumées — Vue 1",
      desc:  "Assemblage d'un extracteur de fumées (vue 1)",
      tags:  ["Fusion 360", "Industriel"],
    },
    {
      src:   "02_assemblage d'un_extracteur_fumees.png",
      name:  "Extracteur de fumées — Vue 2",
      desc:  "Assemblage d'un extracteur de fumées (vue 2)",
      tags:  ["Fusion 360", "Industriel"],
    },
  ],

  /* ── PCB & CNC ────────────────────────────────────────── */
  pcb: [
    {
      src:   "PCB_LumicheckNeo.png",
      name:  "PCB LumicheckNeo",
      desc:  "Circuit imprimé du dispositif LumicheckNeo",
      tags:  ["KiCad", "PCB"],
    },
    {
      src:   "Assembled_Datalogger_PCB.jpeg",
      name:  "Datalogger PCB assemblé",
      desc:  "Carte PCB du datalogger après assemblage",
      tags:  ["KiCad", "Datalogger"],
    },
    {
      src:   "Datalogger_PCB.jpeg",
      name:  "PCB Datalogger",
      desc:  "Circuit imprimé du datalogger biomédical",
      tags:  ["KiCad", "Médical"],
    },
    {
      src:   "Gravure_Decoupe_Acrylic.jpeg",
      name:  "Gravure & Découpe Acrylique",
      desc:  "Découpe et gravure CNC sur matière acrylique",
      tags:  ["CNC", "Découpe"],
    },
    {
      src:   "Assemblage_Lampe_Cadeau.jpeg",
      name:  "Lampe Cadeau assemblée",
      desc:  "Assemblage final de la lampe cadeau",
      tags:  ["CNC", "Assemblage"],
    },
  ],

  /* ── Impressions 3D ───────────────────────────────────── */
  impressions3d: [
    {
      src:   "Print01.jpeg",
      name:  "Impression 3D — 01",
      desc:  "Pièce imprimée en FDM",
      tags:  ["FDM", "Impression 3D"],
    },
    {
      src:   "Print02.jpeg",
      name:  "Impression 3D — 02",
      desc:  "Prototype FDM",
      tags:  ["FDM", "Prototype"],
    },
    {
      src:   "Print03.jpeg",
      name:  "Impression 3D — 03",
      desc:  "Pièce mécanique imprimée",
      tags:  ["FDM", "Mécanique"],
    },
    {
      src:   "Print04.jpeg",
      name:  "Impression 3D — 04",
      desc:  "Boîtier imprimé sur mesure",
      tags:  ["FDM", "Boîtier"],
    },
    {
      src:   "Print05.jpeg",
      name:  "Impression 3D — 05",
      desc:  "Assemblage de pièces FDM",
      tags:  ["FDM", "Assemblage"],
    },
    {
      src:   "Print06.jpeg",
      name:  "Impression 3D — 06",
      desc:  "Pièce finale imprimée",
      tags:  ["FDM", "Finition"],
    },
  ],
};
