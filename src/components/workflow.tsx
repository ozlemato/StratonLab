import { Mail, FileText, Database, Check, ScanLine, Waypoints, UserCheck, ArrowDown, ArrowRight } from 'lucide-react';

// Schéma redondant avec les quatre articles : aucune information essentielle masquée.
export function Workflow() {
  return <div className="workflow-visual" data-stage="0" aria-hidden="true">
    <div className="workflow-grid" />
    <div className="workflow-caption"><span className="status-dot" /> DU BESOIN À L’USAGE <span>ILLUSTRATION</span></div>
    <div className="workflow-track">
      <svg className="workflow-wires" aria-hidden="true"/><svg className="workflow-line" aria-hidden="true"/>
      <div className="workflow-node" data-active="true">
        <div className="source-pills"><span><Mail /> E-mails</span><span><FileText /> Documents</span><span><Database /> Outils métier</span></div>
        <div className="source-branches"><svg viewBox="0 0 300 56" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 V28 Q50 42 64 42 H150 M150 0 V56 M250 0 V28 Q250 42 236 42 H150" /></svg></div>
        <div className="flow-ticket"><span className="flow-icon"><ScanLine /></span><div><small>01 / COMPRENDRE</small><strong>Votre besoin, clarifié.</strong></div><Check className="flow-check" /></div>
        <div className="flow-context">Un objectif partagé. Un périmètre précis.</div>
      </div>
      <div className="workflow-node" data-active="false">
        <div className="flow-ticket"><span className="flow-icon"><Waypoints /></span><div><small>02 / CONCEVOIR</small><strong>Un parcours à mettre à l’épreuve.</strong></div><Check className="flow-check" /></div>
        <div className="flow-blueprint"><span>Une demande</span><ArrowRight /><span>Un traitement</span><ArrowRight /><span>Une validation</span></div>
        <div className="mini-fields"><span>Sources identifiées</span><span>Règles définies</span><span>Prototype à tester</span></div>
      </div>
      <div className="workflow-node" data-active="false">
        <div className="flow-ticket"><span className="flow-icon"><Database /></span><div><small>03 / CONNECTER</small><strong>Vos outils travaillent ensemble.</strong></div><Check className="flow-check" /></div>
        <div className="connection-stack"><div><FileText /><span>Vos documents<small>Les sources utiles</small></span><Check /></div><div><Database /><span>Votre outil métier<small>Les accès autorisés</small></span><Check /></div><div><UserCheck /><span>Votre équipe<small>Les points de contrôle</small></span><Check /></div></div>
      </div>
      <div className="workflow-node" data-active="false">
        <div className="flow-ticket"><span className="flow-icon"><UserCheck /></span><div><small>04 / FAIRE PROGRESSER</small><strong>Votre équipe garde la main.</strong></div><Check className="flow-check" /></div>
        <div className="flow-followup"><span><Check /> Prendre en main</span><span><Check /> Évaluer les usages</span><span><Check /> Ajuster ensemble</span></div>
        <div className="flow-result"><ArrowDown size={16} /> Une solution intégrée à votre quotidien</div>
      </div>
    </div>
  </div>;
}
