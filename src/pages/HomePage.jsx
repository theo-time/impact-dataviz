// HomePage.jsx
import React from 'react';
import './HomePage.scss';
import impactColors from '../configs/colorCode.js';
// import exampleImage from '/mnt/data/d9ef8abf-f8b0-49eb-b5de-1e40dcdf69cc.png';

export default function HomePage() {
  return (
    <div className="homepage-container">
      <section className="homepage-section">
        <h1>☀️ Bienvenue sur ImpactViz !</h1>
        <p>
          Ce site vous permet d'explorer les impacts environnementaux de milliers de procédés issus de la <strong>Base Empreinte</strong>.
          Grâce à des visualisations interactives, vous pourrez comparer des produits, comprendre leur contribution à divers impacts, et naviguer à travers les catégories de procédé.
        </p>
      </section>

      <section className="homepage-section">
        <h2>📊 Qu'est-ce que la Base Empreinte ?</h2>
        <p>
          La <strong>Base Empreinte</strong> est un référentiel public de données environnementales publié par l’ADEME. Elle regroupe des <strong>fiches</strong> représentant des procédés de production, de transport, ou de gestion en fin de vie.
          Chaque fiche est accompagnée d'une quantification d'impacts environnementaux sur 14 indicateurs.
          En savoir plus : <a href="https://base-empreinte.ademe.fr/" target="_blank" rel="noopener noreferrer">base-empreinte.ademe.fr</a>
        </p>
      </section>

      <section className="homepage-section">
        <h2>🧱 Les procédés</h2>
        <p>
          Un <strong>procédé</strong> est une unité de transformation, de production, de transport ou de traitement en fin de vie. Ces procédés sont organisés de façon hiérarchique par catégories :
        </p>
        <p> Bois &gt; Produit Intermédiaire &gt; Bois dérivé &gt; Contreplaqué </p>
        <p>
          Ici par exemple, le <em>Contreplaqué</em> est rangé dans la catégorie Bois, sous-catégorie Produit Intermédiaire, et sous-sous-catégorie Bois dérivé.
        </p>
      </section>

      <section className="homepage-section">
        <h2>♻️ Les impacts environnementaux</h2>
        <p>
          Chaque procédé est associé à 14 <strong>indicateurs d’impact</strong> représentant différentes pressions sur l’environnement. Voici la liste complète avec leur signification et code couleur :
        </p>
        <ul className="impact-list">
          {Object.entries(impactColors).map(([impact, color]) => (
            <li key={impact}>
              <span className="impact-bullet" style={{ backgroundColor: color }}></span>
              <strong>{impact}</strong> : {getImpactExplanation(impact)}
            </li>
          ))}
        </ul>
      </section>

      <section className="homepage-section">
        <h2>🧭 Présentation du site</h2>
        <p> Sur ce site, vous pourrez : </p>
        <ul>
          <li><strong>🔎 Exploration</strong> : naviguer dans la hiérarchie des catégories et comparer des procédés.</li>
          <li><strong>📈 Dashboard</strong> : visualisations synthétiques et graphiques interactifs sur les données.</li>
          <li><strong>🗂️ Métadonnées</strong> : accéder aux descriptions détaillées des procédés et des indicateurs.</li>
        </ul>
      </section>
    </div>
  );
}

function getImpactExplanation(impact) {
  const explanations = {
    "Acidification": "Formation de substances acides affectant les sols et l’eau.",
    "Changement climatique": "Réchauffement global dû aux émissions de gaz à effet de serre.",
    "Changement climatique - Fossile": "Part du changement climatique lié aux sources fossiles.",
    "Changement climatique - Biogénique": "Part liée aux sources biologiques (ex : biomasse).",
    "Appauvrissement de la couche d’ozone": "Destruction de l’ozone stratosphérique protégeant des UV.",
    "Eutrophisation eaux douces": "Surcroît de nutriments dans les eaux douces provoquant une prolifération végétale.",
    "Eutrophisation marine": "Même phénomène en milieu marin.",
    "Eutrophisation terrestre": "Enrichissement excessif des sols en azote.",
    "Formation d’ozone photochimique": "Production d’ozone troposphérique nocif à partir de polluants.",
    "Particules": "Émissions de particules fines dangereuses pour la santé humaine.",
    "Radiations ionisantes": "Exposition à des rayonnements ionisants.",
    "Utilisation de ressources fossiles": "Extraction de ressources fossiles (pétrole, gaz, charbon).",
    "Utilisation de ressources minérales et métalliques": "Consommation de ressources abiotiques (minerais, métaux).",
    "Utilisation des sols": "Transformation et occupation des surfaces naturelles."
  };
  return explanations[impact] ?? '';
}