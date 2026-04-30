import { useState } from "react";

const SERVICES = [
  { id: "mecanique", label: "Mécanique", icon: "🔧", desc: "Réparation auto, moto, vélo" },
  { id: "electricite", label: "Électricité", icon: "⚡", desc: "Installation, dépannage électrique" },
  { id: "fossoyeur", label: "Pompes Funèbres", icon: "🕊️", desc: "Inhumation, fossoyage" },
  { id: "blanchisserie", label: "Blanchisserie", icon: "👕", desc: "Lavage, repassage, pressing" },
  { id: "plomberie", label: "Plomberie", icon: "🚿", desc: "Tuyauterie, sanitaires, fuite" },
  { id: "menuiserie", label: "Menuiserie", icon: "🪵", desc: "Meubles, portes, fenêtres" },
  { id: "coiffure", label: "Coiffure", icon: "✂️", desc: "Coupe, tresse, soin capillaire" },
  { id: "jardinage", label: "Jardinage", icon: "🌿", desc: "Entretien jardin, élagage" },
  { id: "maconnerie", label: "Maçonnerie", icon: "🧱", desc: "Construction, rénovation" },
  { id: "informatique", label: "Informatique", icon: "💻", desc: "Dépannage PC, réseau" },
  { id: "peinture", label: "Peinture", icon: "🎨", desc: "Intérieur, extérieur, décoration" },
  { id: "cuisine", label: "Cuisine / Traiteur", icon: "🍲", desc: "Repas, évènements, cuisine à domicile" },
];

const MOCK_PROVIDERS = [
  { id: 1, name: "Kouamé Rodrigue", service: "mecanique", city: "Cotonou", rating: 4.8, reviews: 32, price: "5 000 F/h", avatar: "KR", bio: "Mécanicien expérimenté, 10 ans d'expérience, spécialisé en Toyota et Peugeot.", available: true },
  { id: 2, name: "Aïcha Bello", service: "blanchisserie", city: "Porto-Novo", rating: 4.9, reviews: 58, price: "1 500 F/kg", avatar: "AB", bio: "Blanchisserie soignée, livraison à domicile possible dans Porto-Novo.", available: true },
  { id: 3, name: "Mathieu Kpènou", service: "electricite", city: "Parakou", rating: 4.6, reviews: 21, price: "8 000 F/j", avatar: "MK", bio: "Électricien certifié, dépannage 24h/24 disponible.", available: false },
  { id: 4, name: "Fatou Diallo", service: "coiffure", city: "Cotonou", rating: 5.0, reviews: 74, price: "3 000 F", avatar: "FD", bio: "Coiffeuse professionnelle, spécialisée en tresses africaines et soin.", available: true },
  { id: 5, name: "Jonas Akpovi", service: "plomberie", city: "Abomey", rating: 4.7, reviews: 19, price: "6 000 F/h", avatar: "JA", bio: "Plombier rapide et efficace, intervention dans 1h.", available: true },
  { id: 6, name: "Pauline Adanté", service: "cuisine", city: "Porto-Novo", rating: 4.8, reviews: 43, price: "À négocier", avatar: "PA", bio: "Traiteur pour événements, spécialités béninoises et internationales.", available: true },
  { id: 7, name: "Koffi Mensah", service: "menuiserie", city: "Cotonou", rating: 4.5, reviews: 27, price: "10 000 F/j", avatar: "KM", bio: "Menuisier-ébéniste, fabrication sur mesure, bois de qualité.", available: true },
  { id: 8, name: "Rosalie Gbénou", service: "fossoyeur", city: "Ouidah", rating: 4.9, reviews: 15, price: "Sur devis", avatar: "RG", bio: "Service funèbre discret et respectueux, disponible 24h/24.", available: true },
];

const CITIES = ["Toutes les villes", "Cotonou", "Porto-Novo", "Parakou", "Abomey", "Ouidah", "Natitingou"];

// ─── Composants UI ──────────────────────────────────────────────────────────

function Stars({ rating }) {
  return (
    <span style={{ color: "#F59E0B", fontSize: 13, letterSpacing: 1 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
      <span style={{ color: "#94A3B8", marginLeft: 4, fontWeight: 600 }}>{rating}</span>
    </span>
  );
}

function Badge({ children, color = "#0EA5E9" }) {
  return (
    <span style={{
      background: color + "18", color, border: `1px solid ${color}40`,
      borderRadius: 99, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5
    }}>{children}</span>
  );
}

function Avatar({ initials, size = 48, color = "#0EA5E9" }) {
  const colors = ["#0EA5E9","#10B981","#F59E0B","#EF4444","#8B5CF6","#EC4899"];
  const c = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${c}, ${c}aa)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 800, fontSize: size * 0.35,
      flexShrink: 0, boxShadow: `0 4px 14px ${c}44`
    }}>{initials}</div>
  );
}

// ─── Formulaires ────────────────────────────────────────────────────────────

function RegisterProviderForm({ onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", phone:"", city:"Cotonou", service:"", price:"", bio:"", available:true });
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  return (
    <div style={modalOverlay}>
      <div style={{...modalBox, maxWidth: 500}}>
        <button onClick={onClose} style={closeBtn}>✕</button>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            {[1,2].map(i => (
              <div key={i} style={{
                flex:1, height:4, borderRadius:99,
                background: step >= i ? "#0EA5E9" : "#E2E8F0",
                transition:"background 0.3s"
              }}/>
            ))}
          </div>
          <h2 style={modalTitle}>{step===1 ? "👤 Votre profil" : "🛠️ Votre service"}</h2>
          <p style={modalSub}>Étape {step}/2 — {step===1?"Informations personnelles":"Détails du service"}</p>
        </div>

        {step === 1 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <Field label="Nom complet *" value={form.name} onChange={v=>set("name",v)} placeholder="Ex: Jean Koffi"/>
            <Field label="Téléphone *" value={form.phone} onChange={v=>set("phone",v)} placeholder="Ex: +229 97 00 00 00" type="tel"/>
            <div>
              <label style={fieldLabel}>Ville *</label>
              <select value={form.city} onChange={e=>set("city",e.target.value)} style={fieldStyle}>
                {CITIES.slice(1).map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={fieldLabel}>Catégorie de service *</label>
              <select value={form.service} onChange={e=>set("service",e.target.value)} style={fieldStyle}>
                <option value="">-- Choisir --</option>
                {SERVICES.map(s=><option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
              </select>
            </div>
            <Field label="Tarif indicatif" value={form.price} onChange={v=>set("price",v)} placeholder="Ex: 5 000 F/h"/>
            <div>
              <label style={fieldLabel}>Présentation *</label>
              <textarea value={form.bio} onChange={e=>set("bio",e.target.value)}
                placeholder="Décrivez votre expérience, spécialités..."
                style={{...fieldStyle, height:90, resize:"none"}}/>
            </div>
            <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", fontSize:14 }}>
              <input type="checkbox" checked={form.available} onChange={e=>set("available",e.target.checked)}/>
              <span style={{ color:"#475569" }}>Disponible immédiatement</span>
            </label>
          </div>
        )}

        <div style={{ display:"flex", gap:10, marginTop:24 }}>
          {step > 1 && <button onClick={()=>setStep(1)} style={btnSecondary}>← Retour</button>}
          {step < 2
            ? <button onClick={()=>{ if(!form.name||!form.phone) return alert("Remplissez tous les champs"); setStep(2); }} style={btnPrimary}>Suivant →</button>
            : <button onClick={()=>{ if(!form.service||!form.bio) return alert("Remplissez tous les champs"); onSuccess(form); }} style={btnPrimary}>✓ Créer mon profil</button>
          }
        </div>
      </div>
    </div>
  );
}

function RegisterClientForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name:"", phone:"", city:"Cotonou" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  return (
    <div style={modalOverlay}>
      <div style={{...modalBox, maxWidth:420}}>
        <button onClick={onClose} style={closeBtn}>✕</button>
        <h2 style={modalTitle}>🙋 Créer un compte client</h2>
        <p style={modalSub}>Trouvez le bon prestataire près de chez vous</p>
        <div style={{ display:"flex", flexDirection:"column", gap:14, marginTop:20 }}>
          <Field label="Nom complet *" value={form.name} onChange={v=>set("name",v)} placeholder="Ex: Marie Hounsou"/>
          <Field label="Téléphone *" value={form.phone} onChange={v=>set("phone",v)} placeholder="+229 96 00 00 00" type="tel"/>
          <div>
            <label style={fieldLabel}>Ville</label>
            <select value={form.city} onChange={e=>set("city",e.target.value)} style={fieldStyle}>
              {CITIES.slice(1).map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <button onClick={()=>{ if(!form.name||!form.phone) return alert("Champs obligatoires"); onSuccess(form); }}
          style={{...btnPrimary, width:"100%", marginTop:24}}>✓ M'inscrire comme client</button>
      </div>
    </div>
  );
}

function ContactModal({ provider, onClose }) {
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState("");
  return (
    <div style={modalOverlay}>
      <div style={{...modalBox, maxWidth:420}}>
        <button onClick={onClose} style={closeBtn}>✕</button>
        {!sent ? <>
          <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:20 }}>
            <Avatar initials={provider.avatar} size={52}/>
            <div>
              <h3 style={{margin:0, color:"#0F172A", fontWeight:800}}>{provider.name}</h3>
              <p style={{margin:0, color:"#64748B", fontSize:13}}>{SERVICES.find(s=>s.id===provider.service)?.label} · {provider.city}</p>
            </div>
          </div>
          <label style={fieldLabel}>Votre message</label>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)}
            placeholder={`Bonjour ${provider.name.split(" ")[0]}, j'aurais besoin de...`}
            style={{...fieldStyle, height:110, resize:"none", marginTop:6}}/>
          <button onClick={()=>{ if(!msg.trim()) return; setSent(true); }}
            style={{...btnPrimary, width:"100%", marginTop:16}}>📨 Envoyer la demande</button>
        </> : (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:56, marginBottom:12 }}>✅</div>
            <h3 style={{ color:"#0F172A", fontWeight:800 }}>Demande envoyée !</h3>
            <p style={{ color:"#64748B" }}>{provider.name} recevra votre message et vous contactera bientôt.</p>
            <button onClick={onClose} style={{...btnPrimary, marginTop:12}}>Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type="text" }) {
  return (
    <div>
      <label style={fieldLabel}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={placeholder} style={fieldStyle}/>
    </div>
  );
}

// ─── Carte prestataire ───────────────────────────────────────────────────────

function ProviderCard({ p, onContact }) {
  const svc = SERVICES.find(s => s.id === p.service);
  return (
    <div style={cardStyle}>
      <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:12 }}>
        <Avatar initials={p.avatar} size={50}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:4 }}>
            <h3 style={{ margin:0, fontSize:15, fontWeight:800, color:"#0F172A" }}>{p.name}</h3>
            <Badge color={p.available ? "#10B981":"#94A3B8"}>{p.available?"● Disponible":"○ Occupé"}</Badge>
          </div>
          <p style={{ margin:"2px 0 4px", fontSize:12, color:"#64748B" }}>{svc?.icon} {svc?.label} · 📍 {p.city}</p>
          <Stars rating={p.rating}/>
          <span style={{ color:"#94A3B8", fontSize:11, marginLeft:6 }}>({p.reviews} avis)</span>
        </div>
      </div>
      <p style={{ margin:"0 0 12px", fontSize:13, color:"#475569", lineHeight:1.5,
        display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
        {p.bio}
      </p>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontWeight:800, color:"#0EA5E9", fontSize:14 }}>{p.price}</span>
        <button onClick={()=>onContact(p)} style={btnSmall}>Contacter</button>
      </div>
    </div>
  );
}

// ─── APP PRINCIPALE ──────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("home");
  const [modal, setModal] = useState(null);
  const [filterService, setFilterService] = useState("all");
  const [filterCity, setFilterCity] = useState("Toutes les villes");
  const [search, setSearch] = useState("");
  const [providers, setProviders] = useState(MOCK_PROVIDERS);
  const [toast, setToast] = useState(null);
  const [contactTarget, setContactTarget] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 3500); };

  const filtered = providers.filter(p => {
    const svc = filterService === "all" || p.service === filterService;
    const city = filterCity === "Toutes les villes" || p.city === filterCity;
    const q = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      SERVICES.find(s=>s.id===p.service)?.label.toLowerCase().includes(search.toLowerCase());
    return svc && city && q;
  });

  return (
    <div style={{ fontFamily:"'Sora', 'Segoe UI', sans-serif", minHeight:"100vh", background:"#F8FAFC" }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap');
        * { box-sizing:border-box; }
        button:hover { opacity:0.88; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-thumb { background:#CBD5E1; border-radius:99px; }
        input:focus, select:focus, textarea:focus { outline:2px solid #0EA5E9; border-color:#0EA5E9; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background:"#fff", borderBottom:"1px solid #E2E8F0",
        padding:"0 24px", height:64, display:"flex", alignItems:"center",
        justifyContent:"space-between", position:"sticky", top:0, zIndex:100,
        boxShadow:"0 1px 12px #0000000a"
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={()=>setView("home")}>
          <div style={{
            width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#0EA5E9,#3B82F6)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:18
          }}>🤝</div>
          <span style={{ fontWeight:900, fontSize:20, color:"#0F172A", letterSpacing:-0.5 }}>ServiLink</span>
          <span style={{ fontSize:11, fontWeight:700, color:"#0EA5E9", background:"#EFF6FF",
            padding:"2px 7px", borderRadius:99, marginLeft:2 }}>Bénin</span>
        </div>

        <nav style={{ display:"flex", gap:6 }}>
          {[["home","🏠 Accueil"],["search","🔍 Trouver"]].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{
              background: view===v?"#EFF6FF":"transparent",
              color: view===v?"#0EA5E9":"#475569",
              border:"none", borderRadius:8, padding:"7px 14px",
              fontWeight:700, fontSize:13, cursor:"pointer", transition:"all .2s"
            }}>{l}</button>
          ))}
          <button onClick={()=>setModal("client")} style={btnPrimary}>+ Inscription</button>
        </nav>
      </header>

      {/* TOAST */}
      {toast && (
        <div style={{
          position:"fixed", bottom:28, left:"50%", transform:"translateX(-50%)",
          background:"#0F172A", color:"#fff", padding:"12px 24px", borderRadius:12,
          fontWeight:700, fontSize:14, zIndex:9999, boxShadow:"0 8px 32px #0003",
          animation:"slideUp .3s ease"
        }}>{toast}</div>
      )}

      {/* MODAL INSCRIPTION */}
      {modal === "provider" && (
        <RegisterProviderForm onClose={()=>setModal(null)} onSuccess={(f)=>{
          const svc = SERVICES.find(s=>s.id===f.service);
          setProviders(prev=>[...prev, {
            id: Date.now(), name:f.name, service:f.service,
            city:f.city, rating:5.0, reviews:0, price:f.price||"À définir",
            avatar: f.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),
            bio:f.bio, available:f.available
          }]);
          setModal(null);
          showToast(`✅ Profil de ${f.name} créé avec succès !`);
          setView("search");
        }}/>
      )}
      {modal === "client" && (
        <RegisterClientForm onClose={()=>setModal(null)} onSuccess={(f)=>{
          setModal(null);
          showToast(`🎉 Bienvenue ${f.name} ! Trouvez votre prestataire.`);
          setView("search");
        }}/>
      )}
      {contactTarget && (
        <ContactModal provider={contactTarget} onClose={()=>setContactTarget(null)}/>
      )}

      {/* PAGE ACCUEIL */}
      {view === "home" && (
        <main>
          {/* HERO */}
          <section style={{
            background:"linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0EA5E9 100%)",
            padding:"80px 24px 100px", textAlign:"center", position:"relative", overflow:"hidden"
          }}>
            <div style={{
              position:"absolute", inset:0, opacity:0.06,
              backgroundImage:"radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)",
              backgroundSize:"40px 40px"
            }}/>
            <div style={{ position:"relative", maxWidth:680, margin:"0 auto" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#ffffff18",
                borderRadius:99, padding:"6px 16px", marginBottom:24, backdropFilter:"blur(8px)" }}>
                <span style={{ fontSize:12 }}>🌍</span>
                <span style={{ color:"#BAE6FD", fontWeight:600, fontSize:12 }}>Plateforme #1 de services au Bénin</span>
              </div>
              <h1 style={{ fontSize:"clamp(32px,6vw,58px)", fontWeight:900, color:"#fff",
                lineHeight:1.1, margin:"0 0 16px", letterSpacing:-1 }}>
                Trouvez le bon<br/><span style={{ color:"#38BDF8" }}>prestataire</span> près de vous
              </h1>
              <p style={{ fontSize:"clamp(14px,2vw,18px)", color:"#94A3B8", marginBottom:40, lineHeight:1.6 }}>
                Mécanicien, électricien, blanchisserie, fossoyeur et bien plus —<br/>
                des professionnels vérifiés à votre service.
              </p>
              <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={()=>setModal("client")} style={{
                  background:"#0EA5E9", color:"#fff", border:"none",
                  borderRadius:12, padding:"14px 28px", fontWeight:800, fontSize:15,
                  cursor:"pointer", boxShadow:"0 8px 24px #0EA5E944"
                }}>🙋 Je cherche un service</button>
                <button onClick={()=>setModal("provider")} style={{
                  background:"transparent", color:"#fff", border:"2px solid #ffffff40",
                  borderRadius:12, padding:"14px 28px", fontWeight:800, fontSize:15,
                  cursor:"pointer", backdropFilter:"blur(8px)"
                }}>🔧 Je suis prestataire</button>
              </div>
            </div>
          </section>

          {/* STATS */}
          <div style={{ display:"flex", justifyContent:"center", gap:0, background:"#fff",
            borderBottom:"1px solid #E2E8F0", flexWrap:"wrap" }}>
            {[["🛠️", providers.length+"+", "Prestataires"],
              ["🏙️", "6", "Villes"],
              ["⭐", "4.8", "Note moyenne"],
              ["🔧", SERVICES.length+"+", "Catégories"]].map(([icon,num,lab])=>(
              <div key={lab} style={{ padding:"20px 32px", textAlign:"center", borderRight:"1px solid #F1F5F9" }}>
                <div style={{ fontSize:22 }}>{icon}</div>
                <div style={{ fontWeight:900, fontSize:24, color:"#0F172A" }}>{num}</div>
                <div style={{ fontSize:12, color:"#94A3B8", fontWeight:600 }}>{lab}</div>
              </div>
            ))}
          </div>

          {/* CATÉGORIES */}
          <section style={{ maxWidth:1080, margin:"56px auto", padding:"0 24px" }}>
            <h2 style={{ textAlign:"center", fontWeight:900, color:"#0F172A", fontSize:26, marginBottom:8 }}>
              Nos catégories de services
            </h2>
            <p style={{ textAlign:"center", color:"#94A3B8", marginBottom:36, fontSize:14 }}>
              Cliquez sur une catégorie pour trouver un prestataire
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:14 }}>
              {SERVICES.map(svc => (
                <div key={svc.id} onClick={()=>{ setFilterService(svc.id); setView("search"); }}
                  style={{
                    background:"#fff", border:"1px solid #E2E8F0", borderRadius:14,
                    padding:"20px 14px", textAlign:"center", cursor:"pointer",
                    transition:"all .2s", boxShadow:"0 2px 8px #0000000a"
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 32px #0EA5E922"; e.currentTarget.style.borderColor="#0EA5E9"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 2px 8px #0000000a"; e.currentTarget.style.borderColor="#E2E8F0"; }}
                >
                  <div style={{ fontSize:32, marginBottom:8 }}>{svc.icon}</div>
                  <div style={{ fontWeight:700, fontSize:13, color:"#0F172A" }}>{svc.label}</div>
                  <div style={{ fontSize:11, color:"#94A3B8", marginTop:4 }}>{svc.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* PRESTATAIRES EN VEDETTE */}
          <section style={{ background:"#F8FAFC", padding:"48px 24px" }}>
            <div style={{ maxWidth:1080, margin:"0 auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:12 }}>
                <h2 style={{ fontWeight:900, color:"#0F172A", fontSize:22, margin:0 }}>⭐ Prestataires en vedette</h2>
                <button onClick={()=>setView("search")} style={{ color:"#0EA5E9", background:"none",
                  border:"1px solid #0EA5E9", borderRadius:8, padding:"7px 14px", fontWeight:700, fontSize:13, cursor:"pointer" }}>
                  Voir tous →
                </button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
                {providers.filter(p=>p.reviews>20).slice(0,3).map(p=>(
                  <ProviderCard key={p.id} p={p} onContact={setContactTarget}/>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ background:"linear-gradient(135deg,#0EA5E9,#3B82F6)", padding:"56px 24px", textAlign:"center" }}>
            <h2 style={{ color:"#fff", fontWeight:900, fontSize:26, margin:"0 0 12px" }}>
              Vous êtes prestataire de services ?
            </h2>
            <p style={{ color:"#BAE6FD", marginBottom:28, fontSize:15 }}>
              Inscrivez-vous gratuitement et développez votre clientèle.
            </p>
            <button onClick={()=>setModal("provider")} style={{
              background:"#fff", color:"#0EA5E9", border:"none",
              borderRadius:12, padding:"14px 32px", fontWeight:800, fontSize:15, cursor:"pointer"
            }}>🚀 Créer mon profil gratuitement</button>
          </section>
        </main>
      )}

      {/* PAGE RECHERCHE */}
      {view === "search" && (
        <main style={{ maxWidth:1080, margin:"0 auto", padding:"32px 24px" }}>
          <h1 style={{ fontWeight:900, fontSize:26, color:"#0F172A", marginBottom:24 }}>
            🔍 Trouver un prestataire
          </h1>

          {/* FILTRES */}
          <div style={{
            background:"#fff", borderRadius:16, padding:20, marginBottom:24,
            border:"1px solid #E2E8F0", display:"flex", gap:12, flexWrap:"wrap",
            boxShadow:"0 2px 12px #0000000a"
          }}>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="🔎 Rechercher par nom ou service..."
              style={{...fieldStyle, flex:"1 1 220px", margin:0}}/>
            <select value={filterService} onChange={e=>setFilterService(e.target.value)}
              style={{...fieldStyle, flex:"1 1 170px", margin:0}}>
              <option value="all">Tous les services</option>
              {SERVICES.map(s=><option key={s.id} value={s.id}>{s.icon} {s.label}</option>)}
            </select>
            <select value={filterCity} onChange={e=>setFilterCity(e.target.value)}
              style={{...fieldStyle, flex:"1 1 150px", margin:0}}>
              {CITIES.map(c=><option key={c}>{c}</option>)}
            </select>
            <button onClick={()=>{ setSearch(""); setFilterService("all"); setFilterCity("Toutes les villes"); }}
              style={{ ...btnSecondary, flexShrink:0 }}>↺ Réinitialiser</button>
          </div>

          {/* RÉSULTATS */}
          <div style={{ marginBottom:16, color:"#64748B", fontSize:13, fontWeight:600 }}>
            {filtered.length} prestataire{filtered.length>1?"s":""} trouvé{filtered.length>1?"s":""}
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 24px" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>😔</div>
              <h3 style={{ color:"#0F172A", fontWeight:800 }}>Aucun prestataire trouvé</h3>
              <p style={{ color:"#94A3B8" }}>Essayez d'élargir vos critères de recherche.</p>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
              {filtered.map(p=><ProviderCard key={p.id} p={p} onContact={setContactTarget}/>)}
            </div>
          )}

          <div style={{ marginTop:32, textAlign:"center" }}>
            <p style={{ color:"#94A3B8", fontSize:13 }}>Vous êtes prestataire et pas encore inscrit ?</p>
            <button onClick={()=>setModal("provider")} style={btnPrimary}>+ Rejoindre ServiLink</button>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer style={{
        background:"#0F172A", color:"#64748B", textAlign:"center",
        padding:"24px", fontSize:12, marginTop:40
      }}>
        <p style={{ margin:0 }}>
          🤝 <strong style={{ color:"#fff" }}>ServiLink Bénin</strong> — Plateforme de mise en relation · 2025 ·
          <span style={{ color:"#0EA5E9" }}> Cotonou, Porto-Novo, Parakou & +</span>
        </p>
      </footer>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const cardStyle = {
  background:"#fff", borderRadius:16, padding:20,
  border:"1px solid #E2E8F0", boxShadow:"0 2px 12px #0000000a",
  transition:"transform .2s, box-shadow .2s",
};

const modalOverlay = {
  position:"fixed", inset:0, background:"#0000007a",
  display:"flex", alignItems:"center", justifyContent:"center",
  zIndex:1000, padding:16, backdropFilter:"blur(4px)"
};
const modalBox = {
  background:"#fff", borderRadius:20, padding:32,
  width:"100%", position:"relative",
  boxShadow:"0 32px 80px #00000033"
};
const modalTitle = { fontSize:22, fontWeight:900, color:"#0F172A", margin:"0 0 4px" };
const modalSub   = { color:"#94A3B8", fontSize:13, margin:0 };
const closeBtn   = {
  position:"absolute", top:16, right:16,
  background:"#F1F5F9", border:"none", borderRadius:99,
  width:32, height:32, cursor:"pointer", fontWeight:700,
  color:"#64748B", fontSize:14
};
const fieldLabel = { display:"block", fontWeight:700, fontSize:12, color:"#475569", marginBottom:4, letterSpacing:0.3 };
const fieldStyle = {
  width:"100%", padding:"10px 14px", borderRadius:10,
  border:"1.5px solid #E2E8F0", fontSize:14, color:"#0F172A",
  background:"#F8FAFC", fontFamily:"inherit", transition:"border .2s"
};
const btnPrimary = {
  background:"linear-gradient(135deg,#0EA5E9,#3B82F6)", color:"#fff",
  border:"none", borderRadius:10, padding:"11px 22px",
  fontWeight:800, fontSize:14, cursor:"pointer",
  boxShadow:"0 4px 14px #0EA5E944", flex:1
};
const btnSecondary = {
  background:"#F1F5F9", color:"#475569", border:"1.5px solid #E2E8F0",
  borderRadius:10, padding:"11px 18px", fontWeight:700, fontSize:13, cursor:"pointer"
};
const btnSmall = {
  background:"#EFF6FF", color:"#0EA5E9", border:"1px solid #BFDBFE",
  borderRadius:8, padding:"7px 14px", fontWeight:700, fontSize:13, cursor:"pointer"
};
