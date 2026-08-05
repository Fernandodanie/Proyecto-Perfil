const EgresadosApp = (() => {
  // ========== I18N ==========
  const I18N = {
    es: {
      nav_dir: "Directorio", nav_dash: "Mi ficha", nav_login: "Ingresar", nav_logout: "Salir",
      hero_title: "Registro de Egresados", hero_lead: "Directorio de profesionales formados en la carrera de Ingeniería Informática. Cada ficha reúne las competencias, proyectos destacados, trayectoria laboral y contactos de nuestros egresados.",
      btn_reg: "Registrar mi ficha", btn_view_dir: "Ver directorio",
      search_ph: "Buscar por nombre, apellido o rol…", count_fmt: "registro(s) encontrado(s)",
      share_link: "Copiar enlace", qr_code: "Código QR", export_cv: "Exportar CV (PDF)", vcard_btn: "vCard (.vcf)",
      toast_saved: "Ficha guardada correctamente — los cambios ya están visibles en tu perfil público."
    },
    en: {
      nav_dir: "Directory", nav_dash: "My Profile", nav_login: "Sign In", nav_logout: "Sign Out",
      hero_title: "Graduates Directory", hero_lead: "Directory of Computer Engineering graduates. Each profile highlights skills, featured projects, career path, and contact details.",
      btn_reg: "Register my profile", btn_view_dir: "Explore directory",
      search_ph: "Search by name, role or skill…", count_fmt: "record(s) found",
      share_link: "Copy link", qr_code: "QR Code", export_cv: "Export CV (PDF)", vcard_btn: "vCard (.vcf)",
      toast_saved: "Profile saved successfully — changes are now live on your public page."
    }
  };

  // ========== DATOS INICIALES (mantén tu array completo) ==========
  const INITIAL_EGRESADOS = [ /* ... tu array ... */];

  // ========== MÓDULO DE DATOS ==========
  const Data = {
    initDB() {
      const raw = localStorage.getItem("egresados_db_v2");
      let data = null;
      if (raw) { try { data = JSON.parse(raw); } catch (e) { } }
      if (!Array.isArray(data) || data.length === 0) {
        localStorage.setItem("egresados_db_v2", JSON.stringify(INITIAL_EGRESADOS));
      }
      if (!localStorage.getItem("egresado_current_user_id")) {
        localStorage.setItem("egresado_current_user_id", INITIAL_EGRESADOS[0].id);
      }
    },
    getAll() { Data.initDB(); return JSON.parse(localStorage.getItem("egresados_db_v2")); },
    getById(id) { return Data.getAll().find(x => x.id === id) || null; },
    getCurrentUser() {
      Data.initDB();
      const currentId = localStorage.getItem("egresado_current_user_id") || INITIAL_EGRESADOS[0].id;
      return Data.getById(currentId) || INITIAL_EGRESADOS[0];
    },
    saveProfile(profileData) {
      const all = Data.getAll();
      const idx = all.findIndex(x => x.id === profileData.id);
      if (idx !== -1) all[idx] = { ...all[idx], ...profileData };
      else all.push(profileData);
      localStorage.setItem("egresados_db_v2", JSON.stringify(all));
      return profileData;
    },
    loginOrRegister(email, isRegister = false, extraInfo = {}) {
      const all = Data.getAll();
      let user = all.find(x => (x.correo || "").toLowerCase() === email.toLowerCase());
      if (!user && isRegister) {
        const nextNum = String(all.length + 1).padStart(3, "0");
        user = {
          id: `EGR·${extraInfo.anio || 2024}·${nextNum}`,
          nombres: extraInfo.nombres || "Egresado",
          apellidos: extraInfo.apellidos || "Informática",
          rol: "Ingeniero/a Informático/a",
          anio: extraInfo.anio || 2024,
          correo: email,
          lenguajes: ["JavaScript", "Python"],
          bio: "Nuevo profesional egresado de la carrera de Ingeniería Informática UAJMS.",
          proyectos: [], experiencia: [], habilidadesBlandas: ["Trabajo en equipo"]
        };
        Data.saveProfile(user);
      } else if (!user) { user = INITIAL_EGRESADOS[0]; }
      localStorage.setItem("egresado_current_user_id", user.id);
      localStorage.setItem("egresado_logged_in", "true");
      return user;
    },
    getBadges(profile) {
      if (!profile) return [];
      const badges = [];
      let score = 0;
      if (profile.nombres && profile.apellidos && profile.rol) score += 35;
      if (profile.bio && profile.bio.length > 15) score += 20;
      if (profile.lenguajes && profile.lenguajes.length > 0) score += 15;
      if (profile.correo) score += 15;
      if (profile.foto) score += 15;
      if (score === 100) badges.push({ label: "🏆 Perfil Completo", type: "gold" });
      if ((profile.lenguajes || []).length >= 4) badges.push({ label: "⚡ Dev Políglota", type: "cyan" });
      if ((profile.proyectos || []).length >= 2) badges.push({ label: "🚀 Creador Activo", type: "green" });
      if ((profile.experiencia || []).length >= 2) badges.push({ label: "💼 Trayectoria Pro", type: "gold" });
      if (profile.anio <= 2021) badges.push({ label: "🌟 Alumni Senior", type: "cyan" });
      return badges;
    },
    getRecommendations(id) {
      const raw = localStorage.getItem(`egresado_recs_${id}`);
      if (raw) { try { return JSON.parse(raw); } catch (e) { } }
      return [{ autor: "Diego Fernández", cargo: "Full Stack Engineer", mensaje: "Excelente profesional." }];
    },
    addRecommendation(id, rec) {
      const current = Data.getRecommendations(id);
      current.unshift(rec);
      localStorage.setItem(`egresado_recs_${id}`, JSON.stringify(current));
      return current;
    },
    getGlobalStats() {
      const all = Data.getAll();
      const langCounts = {};
      all.forEach(e => { (e.lenguajes || []).forEach(l => { langCounts[l] = (langCounts[l] || 0) + 1; }); });
      const topLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
      return { total: all.length, topLangs };
    }
  };

  // ========== UTILIDADES UI ==========
  const UI = {
    initLangToggle() {
      const nav = document.querySelector(".topbar nav");
      if (!nav || document.getElementById("lang-toggle")) return;
      const btn = document.createElement("button");
      btn.id = "lang-toggle"; btn.className = "btn btn-sm btn-ghost";
      const curLang = localStorage.getItem("app_lang") || "es";
      btn.textContent = curLang === "es" ? "EN" : "ES";
      btn.onclick = () => {
        const next = (localStorage.getItem("app_lang") || "es") === "es" ? "en" : "es";
        localStorage.setItem("app_lang", next);
        btn.textContent = next === "es" ? "EN" : "ES";
        UI.applyTranslations(next);
      };
      nav.appendChild(btn);
    },
    applyTranslations(lang) {
      const dict = I18N[lang] || I18N.es;
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key]) el.textContent = dict[key];
      });
    },
    announceARIA(msg) {
      let announcer = document.getElementById("aria-announcer");
      if (!announcer) {
        announcer = document.createElement("div");
        announcer.id = "aria-announcer"; announcer.className = "sr-only";
        announcer.setAttribute("aria-live", "polite");
        document.body.appendChild(announcer);
      }
      announcer.textContent = msg;
    },
    downloadVCard(profile) {
      if (!profile) return;
      const vcard = ["BEGIN:VCARD", "VERSION:3.0", `FN:${profile.nombres} ${profile.apellidos}`, `TITLE:${profile.rol}`, `EMAIL:${profile.correo || ''}`, `URL;TYPE=GitHub:https://${profile.github || ''}`, `URL;TYPE=LinkedIn:https://${profile.linkedin || ''}`, `NOTE:Egresado de Ingeniería Informática UAJMS (${profile.anio})`, "END:VCARD"].join("\n");
      const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${profile.nombres}_${profile.apellidos}.vcf`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    },
    renderSkillsChart(container, skills) {
      if (!container) return;
      const levels = [90, 85, 78, 92, 88, 75, 80];
      container.innerHTML = `<div style="background:var(--white);border:1px solid var(--gray-200);padding:16px;border-radius:8px;"><strong>📊 Nivel de Dominio Técnico</strong>${skills.map((s, i) => `<div style="margin-top:8px"><div style="display:flex;justify-content:space-between;"><span>${s}</span><span>${levels[i % levels.length]}%</span></div><div style="height:6px;background:var(--gray-100);border-radius:6px"><div style="width:${levels[i % levels.length]}%;height:6px;background:var(--green);border-radius:6px"></div></div></div>`).join('')}</div>`;
    },
    generateQRCanvas(canvas, url) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d"); const size = 180; canvas.width = size; canvas.height = size;
      ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, size, size); ctx.fillStyle = "#000000";
      const cells = 15, cellSize = size / cells; let hash = 0;
      for (let i = 0; i < url.length; i++) hash = url.charCodeAt(i) + ((hash << 5) - hash);
      for (let r = 0; r < cells; r++) for (let c = 0; c < cells; c++) {
        if ((r < 4 && c < 4) || (r < 4 && c > cells - 5) || (r > cells - 5 && c < 4) || Math.abs((hash ^ (r * 31 + c * 17)) % 100) > 45)
          ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    }
  };

  // ========== DIRECTORIO ==========
  const Directorio = {
    selectedIds: [], viewMode: "grid",
    render() {
      const grid = document.getElementById("grid"), count = document.getElementById("count"), search = document.getElementById("search"), filterLang = document.getElementById("filterLang"), filterAnio = document.getElementById("filterAnio"), sortBy = document.getElementById("sortBy"), btnGrid = document.getElementById("btnViewGrid"), btnList = document.getElementById("btnViewList");
      if (!grid) return;
      function initials(n, a) { return ((n ? n[0] : "") + (a ? a[0] : "")).toUpperCase(); }
      const draw = () => {
        const q = (search?.value || "").toLowerCase().trim(), lang = filterLang?.value || "", anio = filterAnio?.value || "", sort = sortBy?.value || "name-asc";
        let items = Data.getAll().filter(e => {
          const text = (e.nombres + " " + e.apellidos + " " + e.rol).toLowerCase();
          return (!q || text.includes(q)) && (!lang || (e.lenguajes || []).includes(lang)) && (!anio || String(e.anio) === anio);
        });
        if (sort === "name-asc") items.sort((a, b) => (a.nombres + a.apellidos).localeCompare(b.nombres + b.apellidos));
        else if (sort === "name-desc") items.sort((a, b) => (b.nombres + b.apellidos).localeCompare(a.nombres + a.apellidos));
        else if (sort === "year-desc") items.sort((a, b) => b.anio - a.anio);
        else if (sort === "year-asc") items.sort((a, b) => a.anio - b.anio);
        grid.className = `grid ${Directorio.viewMode === 'list' ? 'list-view' : ''}`;
        grid.innerHTML = items.map((e, i) => `
          <div class="card">
            <div style="display:flex;justify-content:space-between;"><div class="avatar">${e.foto ? `<img src="${e.foto}">` : initials(e.nombres, e.apellidos)}</div><span class="card-id">${e.id}</span></div>
            <div><div class="card-name">${e.nombres} ${e.apellidos}</div><div class="card-role">${e.rol} · prom. ${e.anio}</div></div>
            <div class="tags">${(e.lenguajes || []).slice(0, 4).map(l => `<span class="tag">${l}</span>`).join("")}</div>
            <a href="perfil.html?id=${encodeURIComponent(e.id)}" class="btn btn-outline btn-sm">Ver ficha</a>
          </div>
        `).join("");
        if (count) count.textContent = `${items.length} ${I18N[localStorage.getItem("app_lang") || "es"].count_fmt}`;
      };
      draw();
      search?.addEventListener("input", draw); filterLang?.addEventListener("change", draw); filterAnio?.addEventListener("change", draw); sortBy?.addEventListener("change", draw);
      if (btnGrid && btnList) {
        btnGrid.onclick = () => { Directorio.viewMode = "grid"; draw(); };
        btnList.onclick = () => { Directorio.viewMode = "list"; draw(); };
      }
    }
  };

  // ========== PERFIL PÚBLICO ==========
  const Perfil = {
    render() {
      const root = document.getElementById("profile-root");
      if (!root) return;
      const params = new URLSearchParams(location.search), id = params.get("id"), e = Data.getById(id);
      if (!e) { document.title = "Egresado no encontrado"; root.innerHTML = `<div class="wrap"><h1>404</h1><p>Egresado no encontrado</p><a href="index.html">Volver</a></div>`; return; }
      document.title = `${e.nombres} ${e.apellidos} — Ficha de Egresado`;
      document.getElementById("p-nombre").textContent = `${e.nombres} ${e.apellidos}`;
      document.getElementById("p-rol").textContent = `${e.rol} · Promoción ${e.anio}`;
      document.getElementById("p-id").textContent = e.id;
      document.getElementById("p-bio").textContent = e.bio;
      const badges = Data.getBadges(e);
      document.getElementById("p-badges").innerHTML = badges.map(b => `<span class="badge-pill ${b.type}">${b.label}</span>`).join("");
      document.getElementById("btnDownloadVCard").onclick = () => UI.downloadVCard(e);
      document.getElementById("p-skills").innerHTML = (e.lenguajes || []).map(l => `<div class="skill"><span>${l}</span></div>`).join("");
      UI.renderSkillsChart(document.getElementById("p-skills-chart"), e.lenguajes);
      document.getElementById("p-projects").innerHTML = (e.proyectos || []).map(p => `<div class="project-card"><h4>${p.titulo}</h4><p>${p.descripcion}</p><div class="tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div></div>`).join("") || "Sin proyectos";
      document.getElementById("p-experience").innerHTML = (e.experiencia || []).map(ex => `<div class="timeline-item"><strong>${ex.puesto}</strong> - ${ex.empresa} (${ex.periodo})<br>${ex.descripcion}</div>`).join("") || "Sin experiencia";
      const renderRecs = () => {
        const recs = Data.getRecommendations(e.id);
        document.getElementById("p-recommendations").innerHTML = recs.map(r => `<div class="recommendation-card"><strong>${r.autor}</strong>: ${r.mensaje}</div>`).join("");
      };
      renderRecs();
      document.getElementById("recForm").onsubmit = (ev) => {
        ev.preventDefault();
        const autor = document.getElementById("rec-autor").value, mensaje = document.getElementById("rec-mensaje").value;
        if (autor && mensaje) { Data.addRecommendation(e.id, { autor, cargo: "", mensaje }); renderRecs(); ev.target.reset(); }
      };
      document.getElementById("btnShareLink").onclick = () => { navigator.clipboard.writeText(window.location.href); alert("Enlace copiado"); };
      document.getElementById("btnShowQR").onclick = () => { UI.generateQRCanvas(document.getElementById("qrCanvas"), window.location.href); document.getElementById("qrModal").classList.add("open"); };
      document.getElementById("closeQRModal").onclick = () => document.getElementById("qrModal").classList.remove("open");
      document.getElementById("btnPrintCV").onclick = () => window.print();
    }
  };

  // ========== DASHBOARD ==========
  const Dashboard = {
    init() {
      const form = document.getElementById("dashForm");
      if (!form) return;
      const profile = Data.getCurrentUser();
      document.getElementById("d-nombres").value = profile.nombres || ""; document.getElementById("d-apellidos").value = profile.apellidos || ""; document.getElementById("d-rol").value = profile.rol || ""; document.getElementById("d-anio").value = profile.anio || ""; document.getElementById("d-bio").value = profile.bio || ""; document.getElementById("d-github").value = profile.github || ""; document.getElementById("d-linkedin").value = profile.linkedin || ""; document.getElementById("d-correo").value = profile.correo || "";
      const linkPublico = document.querySelector('a[href*="perfil.html"]');
      if (linkPublico) linkPublico.href = `perfil.html?id=${encodeURIComponent(profile.id)}`;
      form.addEventListener("submit", e => {
        e.preventDefault();
        const updated = { ...profile, nombres: document.getElementById("d-nombres").value, apellidos: document.getElementById("d-apellidos").value, rol: document.getElementById("d-rol").value, anio: document.getElementById("d-anio").value, bio: document.getElementById("d-bio").value, github: document.getElementById("d-github").value, linkedin: document.getElementById("d-linkedin").value, correo: document.getElementById("d-correo").value };
        Data.saveProfile(updated);
        document.getElementById("toast").classList.add("show");
        setTimeout(() => document.getElementById("toast").classList.remove("show"), 3000);
      });
    }
  };

  // ========== AUTH ==========
  const Auth = {
    initAuthTabs() {
      const tabs = document.querySelectorAll(".tab-btn"), panels = document.querySelectorAll("[data-panel]");
      if (!tabs.length) return;
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          tabs.forEach(t => t.classList.remove("active")); tab.classList.add("active");
          const target = tab.dataset.target;
          panels.forEach(p => p.style.display = (p.dataset.panel === target ? "block" : "none"));
        });
      });
    },
    init() {
      const form = document.getElementById("authForm");
      if (!form) return;
      form.addEventListener("submit", e => {
        e.preventDefault();
        const activeTab = document.querySelector(".tab-btn.active");
        const isRegister = activeTab?.dataset.target === "registro";
        let email = "";
        if (isRegister) {
          email = document.getElementById("re-correo").value;
          const nombres = document.getElementById("re-nombres").value, apellidos = document.getElementById("re-apellidos").value, anio = parseInt(document.getElementById("re-anio").value) || new Date().getFullYear();
          Data.loginOrRegister(email, true, { nombres, apellidos, anio });
        } else {
          email = document.getElementById("li-correo").value;
          Data.loginOrRegister(email, false);
        }
        window.location.href = "dashboard.html";
      });
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    Data.initDB();
    UI.initLangToggle();
    Directorio.render();
    Perfil.render();
    Dashboard.init();
    Auth.initAuthTabs();
    Auth.init();
  });

  return { Data, Directorio, Perfil, Dashboard, Auth };
})();