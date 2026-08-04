const EgresadosApp = (() => {

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

  const INITIAL_EGRESADOS = [
    { id: "EGR·2021·014", nombres: "Camila", apellidos: "Rojas Terán", rol: "Backend Developer", anio: 2021, lenguajes: ["Python", "SQL", "Go", "Docker", "PostgreSQL"], correo: "camila.rojas@ejemplo.com", github: "github.com/camrojas", linkedin: "linkedin.com/in/camila-rojas", portfolio: "camilarojas.dev", bio: "Desarrolladora backend enfocada en sistemas distribuidos...", habilidadesBlandas: ["Resolución de problemas", "Liderazgo técnico", "Trabajo en equipo"], proyectos: [{ titulo: "Fintech Gateway API", descripcion: "Pasarela de pagos en Go...", tags: ["Go", "Redis", "Docker"], repo: "github.com/camrojas/fintech-gateway", demo: "gateway-demo.dev" }], experiencia: [{ puesto: "Senior Backend Developer", empresa: "PayTech Systems", periodo: "2022 - Presente", descripcion: "Diseño y mantenimiento de APIs..." }] },
    { id: "EGR·2022·033", nombres: "Diego", apellidos: "Fernández Villca", rol: "Full Stack Developer", anio: 2022, lenguajes: ["JavaScript", "Node.js", "React", "TypeScript"], correo: "diego.fernandez@ejemplo.com", github: "github.com/dfvillca", linkedin: "linkedin.com/in/diego-fernandez", portfolio: "diegofernandez.io", bio: "Construye productos web de punta a punta...", habilidadesBlandas: ["Diseño UX/UI", "Comunicación asertiva", "Scrum"], proyectos: [{ titulo: "E-Commerce Dashboard", descripcion: "Plataforma analítica...", tags: ["React", "Node.js"], repo: "github.com/dfvillca/shop" }], experiencia: [{ puesto: "Full Stack Engineer", empresa: "Innova Web", periodo: "2022 - Presente", descripcion: "Aplicaciones web progresivas..." }] },
    { id: "EGR·2020·007", nombres: "Valeria", apellidos: "Mamani Choque", rol: "Data Engineer", anio: 2020, lenguajes: ["Python", "SQL", "Java", "Spark", "AWS"], correo: "valeria.mamani@ejemplo.com", github: "github.com/vmamani", linkedin: "linkedin.com/in/valeria-mamani", portfolio: "", bio: "Diseña pipelines de datos...", habilidadesBlandas: ["Pensamiento analítico", "Gestión de BD"], proyectos: [{ titulo: "AgroData Predictor", descripcion: "Predicción de cultivos...", tags: ["Python", "Scikit-Learn"], repo: "github.com/vmamani/agro" }], experiencia: [{ puesto: "Data Engineer Lead", empresa: "AgroSur Analytics", periodo: "2020 - Presente", descripcion: "Modelado de datos..." }] },
    { id: "EGR·2023·051", nombres: "Jhoser", apellidos: "Aramayo Suárez", rol: "Mobile Developer", anio: 2023, lenguajes: ["Kotlin", "Java", "Dart", "Flutter"], correo: "jhoser.aramayo@ejemplo.com", github: "github.com/jaramayo", linkedin: "linkedin.com/in/jhoser-aramayo", portfolio: "", bio: "Especializado en apps móviles...", habilidadesBlandas: ["Innovación", "Trabajo bajo presión"], proyectos: [{ titulo: "Yacuiba Transit", descripcion: "App en Flutter...", tags: ["Flutter", "Firebase"], repo: "github.com/jaramayo/yacuiba" }], experiencia: [{ puesto: "Mobile Dev Consultant", empresa: "Freelance", periodo: "2023 - Presente", descripcion: "Publicación de apps..." }] },
    { id: "EGR·2019·002", nombres: "Andrea", apellidos: "Vaca Céspedes", rol: "DevOps Engineer", anio: 2019, lenguajes: ["Bash", "Python", "Go", "Kubernetes", "Terraform"], correo: "andrea.vaca@ejemplo.com", github: "github.com/avacc", linkedin: "linkedin.com/in/andrea-vaca", portfolio: "", bio: "Automatiza infraestructura...", habilidadesBlandas: ["Seguridad Cloud", "Automatización"], proyectos: [{ titulo: "K8s Infra Provisioner", descripcion: "Módulos de Terraform...", tags: ["Terraform", "AWS"], repo: "github.com/avacc/k8s" }], experiencia: [{ puesto: "DevOps Specialist", empresa: "CloudNative Latam", periodo: "2020 - Presente", descripcion: "Infraestructura multi-cloud..." }] },
    { id: "EGR·2022·019", nombres: "Marco", apellidos: "Quispe Ortiz", rol: "QA / Software Tester", anio: 2022, lenguajes: ["Java", "Python", "SQL", "Cypress", "Selenium"], correo: "marco.quispe@ejemplo.com", github: "github.com/mquispe", linkedin: "linkedin.com/in/marco-quispe", portfolio: "", bio: "Lidera procesos de QA...", habilidadesBlandas: ["Atención al detalle", "Pruebas QA"], proyectos: [{ titulo: "Automated QA Suite", descripcion: "Suite de pruebas e2e...", tags: ["Cypress", "JavaScript"], repo: "github.com/mquispe/qa" }], experiencia: [{ puesto: "QA Automation Engineer", empresa: "QualityCode Corp", periodo: "2022 - Presente", descripcion: "Diseño e implementación de planes de pruebas..." }] }
  ];

  // ========================= DATOS =========================
  const Data = {
    initDB() {
      const raw = localStorage.getItem("egresados_db_v2");
      let data = null;
      if (raw) { try { data = JSON.parse(raw); } catch (e) { } }
      if (!Array.isArray(data) || data.length === 0) {
        localStorage.setItem("egresados_db_v2", JSON.stringify(INITIAL_EGRESADOS));
      }
      if (!localStorage.getItem("egresado_current_user_id")) {
        localStorage.setItem("egresado_current_user_id", "EGR·2021·014");
      }
    },
    getAll() { Data.initDB(); return JSON.parse(localStorage.getItem("egresados_db_v2")); },
    getById(id) { return Data.getAll().find(x => x.id === id) || null; },
    getCurrentUser() {
      Data.initDB();
      const currentId = localStorage.getItem("egresado_current_user_id") || "EGR·2021·014";
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
      return [{ autor: "Diego Fernández", cargo: "Full Stack Engineer", mensaje: "Excelente profesional, gran capacidad de resolución técnica." }];
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

  // ========================= EFECTOS =========================
  const UIFX = {
    initParticles() {
      const canvas = document.getElementById("bg-particles");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = window.innerWidth, height = canvas.height = window.innerHeight;
      const particleCount = Math.floor(width / 24);
      let mouse = { x: null, y: null, radius: 140 };
      window.addEventListener("resize", () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; });
      window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
      class Particle {
        constructor() { this.x = Math.random() * width; this.y = Math.random() * height; this.vx = (Math.random() - 0.5) * 0.6; this.vy = (Math.random() - 0.5) * 0.6; this.radius = Math.random() * 2 + 1; }
        update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = "#00C2E0"; ctx.fill(); }
      }
      const particles = Array.from({ length: particleCount }, () => new Particle());
      function animate() { ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
      animate();
    },
    initTypewriter() {
      const el = document.getElementById("typewriter");
      if (!el) return;
      const roles = ["Ing. Informática", "Backend Dev", "Full Stack", "Data Engineer", "Mobile Dev", "DevOps"];
      let rIdx = 0, cIdx = 0, isDeleting = false;
      function type() {
        const cur = roles[rIdx];
        el.textContent = isDeleting ? cur.substring(0, cIdx - 1) : cur.substring(0, cIdx + 1);
        cIdx = isDeleting ? cIdx - 1 : cIdx + 1;
        let speed = isDeleting ? 40 : 90;
        if (!isDeleting && cIdx === cur.length) { speed = 2200; isDeleting = true; }
        else if (isDeleting && cIdx === 0) { isDeleting = false; rIdx = (rIdx + 1) % roles.length; speed = 400; }
        setTimeout(type, speed);
      }
      type();
    },
    initSpotlight() {
      document.querySelectorAll(".spotlight-card, .panel, .card").forEach(card => {
        card.classList.add("spotlight-card");
        card.addEventListener("mousemove", e => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        });
      });
    },
    initNotifications() {
      const nav = document.querySelector(".topbar nav");
      if (!nav || document.getElementById("notifDropdown")) return;
      const notifHtml = `
        <div class="notif-wrapper">
          <button type="button" class="notif-btn" id="btnToggleNotif" data-tooltip="Notificaciones">🔔 <span class="notif-badge">3</span></button>
          <div class="notif-dropdown" id="notifDropdown">
            <div class="notif-header"><span>Novedades</span><small style="color:var(--accent-cyan);">Limpiar</small></div>
            <div class="notif-item">👁️ <b>Tu perfil fue visto 14 veces</b> esta semana.<small>Hace 2h</small></div>
            <div class="notif-item">⭐ <b>Diego Fernández</b> te dejó una recomendación.<small>Ayer</small></div>
            <div class="notif-item">🎉 ¡Insignia <b>Dev Políglota</b> obtenida!<small>Hace 3d</small></div>
          </div>
        </div>`;
      const div = document.createElement("div"); div.innerHTML = notifHtml;
      nav.insertBefore(div.firstElementChild, nav.firstChild);
      document.getElementById("btnToggleNotif").onclick = (e) => { e.stopPropagation(); document.getElementById("notifDropdown").classList.toggle("open"); };
      document.addEventListener("click", () => document.getElementById("notifDropdown")?.classList.remove("open"));
    },
    initThemeToggle() {
      const nav = document.querySelector(".topbar nav");
      if (!nav || document.getElementById("theme-toggle")) return;
      const btn = document.createElement("button"); btn.id = "theme-toggle"; btn.className = "theme-toggle-btn";
      const saved = localStorage.getItem("app_theme");
      const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "cyber" : "slate");
      if (theme === "slate") { document.documentElement.setAttribute("data-theme", "slate"); btn.innerHTML = "🌙 Slate"; }
      else { document.documentElement.removeAttribute("data-theme"); btn.innerHTML = "⚡ Cyber"; }
      btn.onclick = () => {
        const isSlate = document.documentElement.getAttribute("data-theme") === "slate";
        if (isSlate) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("app_theme", "cyber"); btn.innerHTML = "⚡ Cyber"; }
        else { document.documentElement.setAttribute("data-theme", "slate"); localStorage.setItem("app_theme", "slate"); btn.innerHTML = "🌙 Slate"; }
      };
      nav.appendChild(btn);
    },
    initLangToggle() {
      const nav = document.querySelector(".topbar nav");
      if (!nav || document.getElementById("lang-toggle")) return;
      const btn = document.createElement("button"); btn.id = "lang-toggle"; btn.className = "lang-toggle-btn";
      const curLang = localStorage.getItem("app_lang") || "es";
      btn.innerHTML = curLang === "es" ? "🌐 ES" : "🌐 EN";
      btn.onclick = () => {
        const next = (localStorage.getItem("app_lang") || "es") === "es" ? "en" : "es";
        localStorage.setItem("app_lang", next);
        btn.innerHTML = next === "es" ? "🌐 ES" : "🌐 EN";
        UIFX.applyTranslations(next);
      };
      nav.appendChild(btn);
    },
    applyTranslations(lang) {
      const dict = I18N[lang] || I18N.es;
      document.querySelectorAll("[data-i18n]").forEach(el => { const key = el.dataset.i18n; if (dict[key]) el.textContent = dict[key]; });
    },
    announceARIA(msg) {
      let announcer = document.getElementById("aria-announcer");
      if (!announcer) { announcer = document.createElement("div"); announcer.id = "aria-announcer"; announcer.className = "sr-only"; announcer.setAttribute("aria-live", "polite"); document.body.appendChild(announcer); }
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
      container.innerHTML = `<div class="skills-chart-box"><div style="font-family:var(--f-mono);color:var(--accent-cyan);margin-bottom:16px;">📊 Nivel de Dominio Técnico</div>${(skills || []).map((s, i) => `<div class="skill-bar-row"><div class="skill-bar-head"><span>${s}</span><span>${levels[i % levels.length]}%</span></div><div class="skill-bar-track"><div class="skill-bar-fill" style="width:0%" data-target="${levels[i % levels.length]}%"></div></div></div>`).join("")}</div>`;
      setTimeout(() => { container.querySelectorAll(".skill-bar-fill").forEach(b => b.style.width = b.dataset.target); }, 100);
    },
    generateQRCanvas(canvas, url) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d"), size = 180; canvas.width = size; canvas.height = size;
      ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, size, size); ctx.fillStyle = "#090E1A";
      const cells = 15, cellSize = size / cells; let hash = 0;
      for (let i = 0; i < url.length; i++) hash = url.charCodeAt(i) + ((hash << 5) - hash);
      for (let r = 0; r < cells; r++) for (let c = 0; c < cells; c++) {
        const corner = (r < 4 && c < 4) || (r < 4 && c > cells - 5) || (r > cells - 5 && c < 4);
        if (corner || Math.abs((hash ^ (r * 31 + c * 17)) % 100) > 45) ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    },
    triggerConfetti() {
      let canvas = document.getElementById("confetti-canvas"); if (!canvas) { canvas = document.createElement("canvas"); canvas.id = "confetti-canvas"; document.body.appendChild(canvas); }
      const ctx = canvas.getContext("2d"); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      const colors = ["#2E86FF", "#00C2E0", "#10B981", "#3CD9F0"];
      let pieces = Array.from({ length: 80 }, () => ({ x: Math.random() * canvas.width, y: -20, r: Math.random() * 6 + 4, vy: Math.random() * 3 + 2, vx: Math.random() * 2 - 1, color: colors[Math.floor(Math.random() * colors.length)] }));
      let d = 0; function loop() { ctx.clearRect(0, 0, canvas.width, canvas.height); pieces.forEach(p => { p.y += p.vy; p.x += p.vx; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill(); }); d++; if (d < 140) requestAnimationFrame(loop); else ctx.clearRect(0, 0, canvas.width, canvas.height); } loop();
    }
  };

  // ========================= DIRECTORIO =========================
  const Directorio = {
    selectedIds: [], viewMode: "grid",
    render() {
      const grid = document.getElementById("grid"), count = document.getElementById("count"), search = document.getElementById("search"), filterLang = document.getElementById("filterLang"), filterAnio = document.getElementById("filterAnio"), sortBy = document.getElementById("sortBy"), btnGrid = document.getElementById("btnViewGrid"), btnList = document.getElementById("btnViewList");
      if (!grid) return;
      const initials = (n, a) => (n ? n[0] : "") + (a ? a[0] : "");
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
          <div class="card spotlight-card reveal-item" style="animation-delay:${i * 0.05}s">
            <label class="compare-check" onclick="event.stopPropagation();">
              <input type="checkbox" data-id="${e.id}" ${Directorio.selectedIds.includes(e.id) ? 'checked' : ''} onchange="EgresadosApp.Directorio.toggleCompare('${e.id}')"> Comparar
            </label>
            <a href="perfil.html?id=${encodeURIComponent(e.id)}" style="display:flex;flex-direction:column;gap:14px;height:100%;">
              <div class="card-top"><div class="avatar">${e.foto ? `<img src="${e.foto}" alt="Avatar">` : initials(e.nombres, e.apellidos)}</div><span class="card-id">${e.id}</span></div>
              <div><div class="card-name">${e.nombres} ${e.apellidos}</div><div class="card-role">${e.rol} · prom. ${e.anio}</div></div>
              <div class="tags">${(e.lenguajes || []).slice(0, 4).map(l => `<span class="tag">${l}</span>`).join("")}</div>
              <div class="card-links"><span>Ver ficha ↗</span></div>
            </a>
          </div>`).join("");
        if (count) count.textContent = `${items.length} ${I18N[localStorage.getItem("app_lang") || "es"].count_fmt}`;
        UIFX.initSpotlight();
      };
      draw();
      search?.addEventListener("input", draw); filterLang?.addEventListener("change", draw); filterAnio?.addEventListener("change", draw); sortBy?.addEventListener("change", draw);
      if (btnGrid && btnList) { btnGrid.onclick = () => { Directorio.viewMode = "grid"; btnGrid.classList.add("active"); btnList.classList.remove("active"); draw(); }; btnList.onclick = () => { Directorio.viewMode = "list"; btnList.classList.add("active"); btnGrid.classList.remove("active"); draw(); }; }
    },
    toggleCompare(id) {
      const idx = Directorio.selectedIds.indexOf(id);
      if (idx !== -1) Directorio.selectedIds.splice(idx, 1);
      else if (Directorio.selectedIds.length < 3) Directorio.selectedIds.push(id);
      else alert("Máximo 3 perfiles para comparar.");
      Directorio.updateCompareBar();
    },
    updateCompareBar() {
      let bar = document.getElementById("compareBar");
      if (!bar) { bar = document.createElement("div"); bar.id = "compareBar"; bar.className = "compare-bar"; bar.innerHTML = `<span>⚖️ <b id="compareCount">0</b> perfiles</span><button class="btn btn-amber btn-sm" onclick="EgresadosApp.Directorio.openCompareModal()">Comparar ↗</button>`; document.body.appendChild(bar); }
      document.getElementById("compareCount").textContent = Directorio.selectedIds.length;
      if (Directorio.selectedIds.length > 0) bar.classList.add("show"); else bar.classList.remove("show");
    },
    openCompareModal() {
      const profiles = Directorio.selectedIds.map(id => Data.getById(id)).filter(Boolean);
      let modal = document.getElementById("compareModal");
      if (!modal) { modal = document.createElement("div"); modal.id = "compareModal"; modal.className = "modal-backdrop"; document.body.appendChild(modal); }
      modal.innerHTML = `<div class="compare-modal-box"><button class="modal-close-btn" onclick="document.getElementById('compareModal').classList.remove('open')">✕</button><h2 style="color:white">Comparación Lado a Lado</h2><table class="compare-table"><thead><tr><th>Característica</th>${profiles.map(p => `<th>${p.nombres} ${p.apellidos}<br><small>${p.id}</small></th>`).join("")}</tr></thead><tbody><tr><td>Rol</td>${profiles.map(p => `<td>${p.rol}</td>`).join("")}</tr><tr><td>Tecnologías</td>${profiles.map(p => `<td>${(p.lenguajes || []).map(l => `<span class="tag" style="margin:2px">${l}</span>`).join("")}</td>`).join("")}</tr><tr><td>Proyectos</td>${profiles.map(p => `<td>${(p.proyectos || []).length} proyecto(s)</td>`).join("")}</tr></tbody></table></div>`;
      modal.classList.add("open");
    }
  };

  // ========================= PERFIL =========================
  const Perfil = {
    render() {
      const root = document.getElementById("profile-root");
      if (!root) return;
      const params = new URLSearchParams(location.search), id = params.get("id"), e = Data.getById(id);
      if (!e) { document.title = "Egresado no encontrado — 404"; root.innerHTML = `<div class="wrap"><div class="not-found-box"><h1>404</h1><h2>Egresado no encontrado</h2><a href="index.html" class="btn btn-amber">← Volver</a></div></div>`; return; }
      document.title = `${e.nombres} ${e.apellidos} — Ficha de Egresado`;
      const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || "—"; };
      setTxt("p-nombre", `${e.nombres} ${e.apellidos}`); setTxt("p-rol", `${e.rol} · Promoción ${e.anio}`); setTxt("p-id", e.id); setTxt("p-bio", e.bio);
      const pBadges = document.getElementById("p-badges"); if (pBadges) { const badges = Data.getBadges(e); pBadges.innerHTML = badges.map(b => `<span class="badge-pill ${b.type}">${b.label}</span>`).join(""); }
      const btnVCard = document.getElementById("btnDownloadVCard"); if (btnVCard) btnVCard.onclick = () => UIFX.downloadVCard(e);
      const pSkills = document.getElementById("p-skills"); if (pSkills) pSkills.innerHTML = (e.lenguajes || []).map(l => `<div class="skill"><span>${l}</span><span class="lvl"><span class="on"></span><span class="on"></span></span></div>`).join("");
      UIFX.renderSkillsChart(document.getElementById("p-skills-chart"), e.lenguajes);
      const pProjects = document.getElementById("p-projects"); if (pProjects) pProjects.innerHTML = (e.proyectos && e.proyectos.length) ? e.proyectos.map(p => `<div class="project-card"><h4>${p.titulo}</h4><p>${p.descripcion}</p><div class="tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div></div>`).join("") : "<p>Sin proyectos</p>";
      const pExp = document.getElementById("p-experience"); if (pExp) pExp.innerHTML = (e.experiencia && e.experiencia.length) ? e.experiencia.map(ex => `<div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-title">${ex.puesto}</div><div class="timeline-sub">${ex.empresa} · ${ex.periodo}</div><div class="timeline-desc">${ex.descripcion}</div></div>`).join("") : "<p>Sin experiencia</p>";
      const recsList = document.getElementById("p-recommendations"), recForm = document.getElementById("recForm");
      const renderRecs = () => { if (!recsList) return; recsList.innerHTML = Data.getRecommendations(e.id).map(r => `<div class="recommendation-card"><div class="recommendation-head"><span>${r.autor}</span><small>${r.cargo || ''}</small></div><div class="recommendation-body">"${r.mensaje}"</div></div>`).join(""); };
      renderRecs();
      if (recForm) recForm.onsubmit = ev => { ev.preventDefault(); const autor = document.getElementById("rec-autor").value, cargo = document.getElementById("rec-cargo").value, mensaje = document.getElementById("rec-mensaje").value; if (autor && mensaje) { Data.addRecommendation(e.id, { autor, cargo, mensaje }); renderRecs(); recForm.reset(); UIFX.announceARIA("Recomendación agregada"); } };
      const btnShare = document.getElementById("btnShareLink"); if (btnShare) btnShare.onclick = () => { navigator.clipboard.writeText(window.location.href); btnShare.textContent = "✓ Copiado!"; setTimeout(() => btnShare.textContent = "🔗 Copiar enlace", 2000); };
      const btnQR = document.getElementById("btnShowQR"); if (btnQR) btnQR.onclick = () => { UIFX.generateQRCanvas(document.getElementById("qrCanvas"), window.location.href); document.getElementById("qrModal").classList.add("open"); };
      const closeQR = document.getElementById("closeQRModal"); if (closeQR) closeQR.onclick = () => document.getElementById("qrModal").classList.remove("open");
      const printBtn = document.getElementById("btnPrintCV"); if (printBtn) printBtn.onclick = () => window.print();
    }
  };

  // ========================= DASHBOARD =========================
  const Dashboard = {
    init() {
      const form = document.getElementById("dashForm"); if (!form) return;
      const profile = Data.getCurrentUser();
      document.getElementById("d-nombres").value = profile.nombres || ""; document.getElementById("d-apellidos").value = profile.apellidos || ""; document.getElementById("d-rol").value = profile.rol || ""; document.getElementById("d-anio").value = profile.anio || ""; document.getElementById("d-bio").value = profile.bio || ""; document.getElementById("d-github").value = profile.github || ""; document.getElementById("d-linkedin").value = profile.linkedin || ""; document.getElementById("d-correo").value = profile.correo || "";
      const adminBox = document.getElementById("adminGlobalStats"); if (adminBox) { const stats = Data.getGlobalStats(); adminBox.innerHTML = `<div class="admin-stats-grid"><div class="admin-stat-card"><b>${stats.total}</b><span>EGRESADOS</span></div><div class="admin-stat-card"><b>🔥 3 DÍAS</b><span>RACHA</span></div></div>`; }
      form.addEventListener("submit", e => {
        e.preventDefault();
        const updated = { ...profile, nombres: document.getElementById("d-nombres").value, apellidos: document.getElementById("d-apellidos").value, rol: document.getElementById("d-rol").value, anio: document.getElementById("d-anio").value, bio: document.getElementById("d-bio").value, github: document.getElementById("d-github").value, linkedin: document.getElementById("d-linkedin").value, correo: document.getElementById("d-correo").value };
        Data.saveProfile(updated);
        const toast = document.getElementById("toast"); if (toast) { toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3000); }
      });
    }
  };

  // ========================= AUTH =========================
  const Auth = {
    initAuthTabs() {
      const tabs = document.querySelectorAll(".tab-btn"), panels = document.querySelectorAll("[data-panel]");
      if (!tabs.length) return;
      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
          tabs.forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          const target = tab.dataset.target;
          panels.forEach(p => p.style.display = (p.dataset.panel === target ? "block" : "none"));
        });
      });
    },
    init() {
      const form = document.getElementById("authForm"); if (!form) return;
      form.addEventListener("submit", e => {
        e.preventDefault();
        const activeTab = document.querySelector(".tab-btn.active");
        const isRegister = activeTab?.dataset.target === "registro";
        let email = "";
        if (isRegister) {
          email = document.getElementById("re-correo")?.value.trim();
          const nombres = document.getElementById("re-nombres")?.value.trim();
          const apellidos = document.getElementById("re-apellidos")?.value.trim();
          const anio = parseInt(document.getElementById("re-anio")?.value, 10) || new Date().getFullYear();
          Data.loginOrRegister(email, true, { nombres, apellidos, anio });
        } else {
          email = document.getElementById("li-correo")?.value.trim();
          Data.loginOrRegister(email, false);
        }
        window.location.href = "dashboard.html";
      });
    }
  };

  // ========================= INICIO GLOBAL =========================
  document.addEventListener("DOMContentLoaded", () => {
    Data.initDB();
    UIFX.initParticles();
    UIFX.initTypewriter();
    UIFX.initSpotlight();
    UIFX.initNotifications();
    UIFX.initThemeToggle();
    UIFX.initLangToggle();
    Directorio.render();
    Perfil.render();
    Dashboard.init();
    Auth.initAuthTabs();
    Auth.init();
  });

  return { Data, UIFX, Directorio, Perfil, Dashboard, Auth };
})();