const EgresadosApp = (() => {

  const I18N = {
    es: {
      nav_dir: "Directorio",
      nav_dash: "Mi ficha",
      nav_login: "Ingresar",
      nav_logout: "Salir",
      hero_title: "Registro de Egresados",
      hero_lead: "Directorio de profesionales formados en la carrera de Ingeniería Informática. Cada ficha reúne las competencias, proyectos destacados, trayectoria laboral y contactos de nuestros egresados.",
      btn_reg: "Registrar mi ficha",
      btn_view_dir: "Ver directorio",
      search_ph: "Buscar por nombre, apellido o rol…",
      count_fmt: "registro(s) encontrado(s)",
      share_link: "Copiar enlace",
      qr_code: "Código QR",
      export_cv: "Exportar CV (PDF)",
      vcard_btn: "vCard (.vcf)",
      toast_saved: "Ficha guardada correctamente — los cambios ya están visibles en tu perfil público."
    },
    en: {
      nav_dir: "Directory",
      nav_dash: "My Profile",
      nav_login: "Sign In",
      nav_logout: "Sign Out",
      hero_title: "Graduates Directory",
      hero_lead: "Directory of Computer Engineering graduates. Each profile highlights skills, featured projects, career path, and contact details.",
      btn_reg: "Register my profile",
      btn_view_dir: "Explore directory",
      search_ph: "Search by name, role or skill…",
      count_fmt: "record(s) found",
      share_link: "Copy link",
      qr_code: "QR Code",
      export_cv: "Export CV (PDF)",
      vcard_btn: "vCard (.vcf)",
      toast_saved: "Profile saved successfully — changes are now live on your public page."
    }
  };

  const INITIAL_EGRESADOS = [
    {
      id: "EGR·2021·014",
      nombres: "Camila",
      apellidos: "Rojas Terán",
      rol: "Backend Developer",
      anio: 2021,
      lenguajes: ["Python", "SQL", "Go", "Docker", "PostgreSQL"],
      correo: "camila.rojas@ejemplo.com",
      github: "github.com/camrojas",
      linkedin: "linkedin.com/in/camila-rojas",
      portfolio: "camilarojas.dev",
      bio: "Desarrolladora backend enfocada en sistemas distribuidos y APIs de alto tráfico. Egresada de la promoción 2021, actualmente lidera la arquitectura de microservicios en el sector fintech.",
      habilidadesBlandas: ["Resolución de problemas", "Liderazgo técnico", "Trabajo en equipo", "Arquitectura limpia"],
      proyectos: [
        {
          titulo: "Fintech Gateway API",
          descripcion: "Pasarela de pagos en Go con procesamiento asíncrono y tolerancia a fallos.",
          tags: ["Go", "Redis", "Docker"],
          repo: "github.com/camrojas/fintech-gateway",
          demo: "gateway-demo.dev"
        },
        {
          titulo: "Data Pipeline UAJMS",
          descripcion: "Pipeline de ETL para análisis estadístico de rendimiento académico universitario.",
          tags: ["Python", "PostgreSQL", "Airflow"],
          repo: "github.com/camrojas/uajms-pipeline",
          demo: ""
        }
      ],
      experiencia: [
        {
          puesto: "Senior Backend Developer",
          empresa: "PayTech Systems",
          periodo: "2022 - Presente",
          descripcion: "Diseño y mantenimiento de APIs REST/gRPC procesando +50k req/min."
        },
        {
          puesto: "Desarrolladora Junior",
          empresa: "SoftBolivia Labs",
          periodo: "2021 - 2022",
          descripcion: "Desarrollo de módulos backend en Python/Django para gestión de inventarios."
        }
      ]
    },
    {
      id: "EGR·2022·033",
      nombres: "Diego",
      apellidos: "Fernández Villca",
      rol: "Full Stack Developer",
      anio: 2022,
      lenguajes: ["JavaScript", "Node.js", "React", "TypeScript"],
      correo: "diego.fernandez@ejemplo.com",
      github: "github.com/dfvillca",
      linkedin: "linkedin.com/in/diego-fernandez",
      portfolio: "diegofernandez.io",
      bio: "Construye productos web de punta a punta. Le apasiona la arquitectura de software accesible, animaciones fluidas y experiencias web interactivas.",
      habilidadesBlandas: ["Diseño UX/UI", "Comunicación asertiva", "Gestión Ágil / Scrum"],
      proyectos: [
        {
          titulo: "E-Commerce Dashboard Pro",
          descripcion: "Plataforma analítica en tiempo real para comercios locales.",
          tags: ["React", "Node.js", "Tailwind"],
          repo: "github.com/dfvillca/shop-analytics",
          demo: "shop-analytics.app"
        }
      ],
      experiencia: [
        {
          puesto: "Full Stack Engineer",
          empresa: "Innova Web Studio",
          periodo: "2022 - Presente",
          descripcion: "Construcción de aplicaciones web progresivas (PWA) con React y Node.js."
        }
      ]
    },
    {
      id: "EGR·2020·007",
      nombres: "Valeria",
      apellidos: "Mamani Choque",
      rol: "Data Engineer",
      anio: 2020,
      lenguajes: ["Python", "SQL", "Java", "Spark", "AWS"],
      correo: "valeria.mamani@ejemplo.com",
      github: "github.com/vmamani",
      linkedin: "linkedin.com/in/valeria-mamani",
      portfolio: "",
      bio: "Diseña pipelines de datos masivos y modelos analíticos para empresas agroindustriales del sur de Bolivia.",
      habilidadesBlandas: ["Pensamiento analítico", "Gestión de BD", "Resolución de problemas"],
      proyectos: [
        {
          titulo: "AgroData Predictor",
          descripcion: "Sistema de predicción de rendimiento de cultivos usando machine learning.",
          tags: ["Python", "Scikit-Learn", "FastAPI"],
          repo: "github.com/vmamani/agro-predictor",
          demo: ""
        }
      ],
      experiencia: [
        {
          puesto: "Data Engineer Lead",
          empresa: "AgroSur Analytics",
          periodo: "2020 - Presente",
          descripcion: "Modelado de datos en Snowflake y orquestación con Apache Airflow."
        }
      ]
    },
    {
      id: "EGR·2023·051",
      nombres: "Jhoser",
      apellidos: "Aramayo Suárez",
      rol: "Mobile Developer",
      anio: 2023,
      lenguajes: ["Kotlin", "Java", "Dart", "Flutter"],
      correo: "jhoser.aramayo@ejemplo.com",
      github: "github.com/jaramayo",
      linkedin: "linkedin.com/in/jhoser-aramayo",
      portfolio: "",
      bio: "Especializado en apps móviles nativas y multiplataforma. Ganador del hackathon regional UAJMS 2023.",
      habilidadesBlandas: ["Innovación", "Trabajo bajo presión", "Adaptabilidad"],
      proyectos: [
        {
          titulo: "Yacuiba Transit App",
          descripcion: "App en Flutter para rutas y horarios del transporte público de Yacuiba.",
          tags: ["Flutter", "Firebase", "Maps API"],
          repo: "github.com/jaramayo/yacuiba-transit",
          demo: ""
        }
      ],
      experiencia: [
        {
          puesto: "Mobile Dev Consultant",
          empresa: "Freelance",
          periodo: "2023 - Presente",
          descripcion: "Creación y publicación de aplicaciones en Play Store y App Store."
        }
      ]
    },
    {
      id: "EGR·2019·002",
      nombres: "Andrea",
      apellidos: "Vaca Céspedes",
      rol: "DevOps Engineer",
      anio: 2019,
      lenguajes: ["Bash", "Python", "Go", "Kubernetes", "Terraform"],
      correo: "andrea.vaca@ejemplo.com",
      github: "github.com/avacc",
      linkedin: "linkedin.com/in/andrea-vaca",
      portfolio: "",
      bio: "Automatiza infraestructura en la nube y pipelines de despliegue continuo (CI/CD). Entusiasta del software libre.",
      habilidadesBlandas: ["Seguridad Cloud", "Automatización", "Comunicación"],
      proyectos: [
        {
          titulo: "K8s Infra Provisioner",
          descripcion: "Módulos de Terraform para desplegar clusters EKS de producción automatizados.",
          tags: ["Terraform", "AWS", "Bash"],
          repo: "github.com/avacc/k8s-terraform-aws",
          demo: ""
        }
      ],
      experiencia: [
        {
          puesto: "DevOps Specialist",
          empresa: "CloudNative Latam",
          periodo: "2020 - Presente",
          descripcion: "Administración de infraestructura multi-cloud y monitoreo con Prometheus/Grafana."
        }
      ]
    },
    {
      id: "EGR·2022·019",
      nombres: "Marco",
      apellidos: "Quispe Ortiz",
      rol: "QA / Software Tester",
      anio: 2022,
      lenguajes: ["Java", "Python", "SQL", "Cypress", "Selenium"],
      correo: "marco.quispe@ejemplo.com",
      github: "github.com/mquispe",
      linkedin: "linkedin.com/in/marco-quispe",
      portfolio: "",
      bio: "Lidera procesos de aseguramiento de calidad y automatización de pruebas e2e en proyectos ágiles.",
      habilidadesBlandas: ["Atención al detalle", "Pruebas QA", "Metodologías Ágiles"],
      proyectos: [
        {
          titulo: "Automated QA Suite",
          descripcion: "Suite de pruebas end-to-end automatizadas en Cypress para portales bancarios.",
          tags: ["Cypress", "JavaScript", "CI/CD"],
          repo: "github.com/mquispe/qa-automation-suite",
          demo: ""
        }
      ],
      experiencia: [
        {
          puesto: "QA Automation Engineer",
          empresa: "QualityCode Corp",
          periodo: "2022 - Presente",
          descripcion: "Diseño e implementación de planes de pruebas automatizadas y de rendimiento."
        }
      ]
    }
  ];

  // ==================== MÓDULO DE DATOS ====================
  const Data = {
    initDB() {
      const raw = localStorage.getItem("egresados_db_v2");
      let data = null;
      if (raw) {
        try { data = JSON.parse(raw); } catch (e) { }
      }
      // Repoblar si no es un array o está vacío
      if (!Array.isArray(data) || data.length === 0) {
        localStorage.setItem("egresados_db_v2", JSON.stringify(INITIAL_EGRESADOS));
      }
      // Si no hay usuario actual, asignar el primer egresado de prueba
      if (!localStorage.getItem("egresado_current_user_id")) {
        localStorage.setItem("egresado_current_user_id", INITIAL_EGRESADOS[0].id);
      }
    },

    getAll() {
      Data.initDB();
      try {
        return JSON.parse(localStorage.getItem("egresados_db_v2")) || INITIAL_EGRESADOS;
      } catch (e) { return INITIAL_EGRESADOS; }
    },

    getById(id) {
      return Data.getAll().find(x => x.id === id) || null;
    },

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
          proyectos: [],
          experiencia: [],
          habilidadesBlandas: ["Trabajo en equipo"]
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
      if (raw) {
        try { return JSON.parse(raw); } catch (e) { }
      }
      return [
        { autor: "Diego Fernández", cargo: "Full Stack Engineer", mensaje: "Excelente profesional, gran capacidad de resolución técnica y trabajo colaborativo." }
      ];
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
      all.forEach(e => {
        (e.lenguajes || []).forEach(l => { langCounts[l] = (langCounts[l] || 0) + 1; });
      });
      const topLangs = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
      return { total: all.length, topLangs };
    }
  };

  // ==================== MÓDULO DE EFECTOS Y UTILIDADES ====================
  const UIFX = {
    initParticles() {
      const canvas = document.getElementById("bg-particles");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;

      const particleCount = Math.floor(width / 24);
      let mouse = { x: null, y: null, radius: 140 };

      window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });

      class Particle {
        constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.vx = (Math.random() - 0.5) * 0.6;
          this.vy = (Math.random() - 0.5) * 0.6;
          this.radius = Math.random() * 2 + 1;
        }
        update() {
          this.x += this.vx; this.y += this.vy;
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
          ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = "#00C2E0"; ctx.fill();
        }
      }

      const particles = Array.from({ length: particleCount }, () => new Particle());

      function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
      }
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
        card.addEventListener("mousemove", (e) => {
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
          <button type="button" class="notif-btn" id="btnToggleNotif" data-tooltip="Notificaciones recientes">
            🔔 <span class="notif-badge">3</span>
          </button>
          <div class="notif-dropdown" id="notifDropdown">
            <div class="notif-header">
              <span>Novedades</span>
              <small style="color: var(--accent-cyan);">Limpiar</small>
            </div>
            <div class="notif-item">
              👁️ <b>Tu perfil público fue visto 14 veces</b> esta semana.
              <small>Hace 2 horas</small>
            </div>
            <div class="notif-item">
              ⭐ <b>Diego Fernández</b> te dejó una recomendación profesional.
              <small>Ayer</small>
            </div>
            <div class="notif-item">
              🎉 ¡Felicidades! Alcanzaste la insignia <b>Dev Políglota</b>.
              <small>Hace 3 días</small>
            </div>
          </div>
        </div>
      `;

      const div = document.createElement("div");
      div.innerHTML = notifHtml;
      nav.insertBefore(div.firstElementChild, nav.firstChild);

      const btn = document.getElementById("btnToggleNotif");
      const dropdown = document.getElementById("notifDropdown");
      if (btn && dropdown) {
        btn.onclick = (e) => {
          e.stopPropagation();
          dropdown.classList.toggle("open");
        };
        document.addEventListener("click", () => dropdown.classList.remove("open"));
      }
    },

    initThemeToggle() {
      const nav = document.querySelector(".topbar nav");
      if (!nav || document.getElementById("theme-toggle")) return;

      const btn = document.createElement("button");
      btn.id = "theme-toggle"; btn.type = "button"; btn.className = "theme-toggle-btn";
      const saved = localStorage.getItem("app_theme");
      const theme = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "cyber" : "slate");

      if (theme === "slate") { document.documentElement.setAttribute("data-theme", "slate"); btn.innerHTML = "🌙 Slate"; }
      else { document.documentElement.removeAttribute("data-theme"); btn.innerHTML = "⚡ Cyber"; }

      btn.addEventListener("click", () => {
        const isSlate = document.documentElement.getAttribute("data-theme") === "slate";
        if (isSlate) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("app_theme", "cyber"); btn.innerHTML = "⚡ Cyber"; }
        else { document.documentElement.setAttribute("data-theme", "slate"); localStorage.setItem("app_theme", "slate"); btn.innerHTML = "🌙 Slate"; }
      });
      nav.appendChild(btn);
    },

    initLangToggle() {
      const nav = document.querySelector(".topbar nav");
      if (!nav || document.getElementById("lang-toggle")) return;

      const btn = document.createElement("button");
      btn.id = "lang-toggle"; btn.type = "button"; btn.className = "lang-toggle-btn";
      const curLang = localStorage.getItem("app_lang") || "es";
      btn.innerHTML = curLang === "es" ? "🌐 ES" : "🌐 EN";

      btn.addEventListener("click", () => {
        const nextLang = (localStorage.getItem("app_lang") || "es") === "es" ? "en" : "es";
        localStorage.setItem("app_lang", nextLang);
        btn.innerHTML = nextLang === "es" ? "🌐 ES" : "🌐 EN";
        UIFX.applyTranslations(nextLang);
      });
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
        announcer.id = "aria-announcer";
        announcer.className = "sr-only";
        announcer.setAttribute("aria-live", "polite");
        document.body.appendChild(announcer);
      }
      announcer.textContent = msg;
    },

    downloadVCard(profile) {
      if (!profile) return;
      const vcardText = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${profile.nombres} ${profile.apellidos}`,
        `TITLE:${profile.rol}`,
        `EMAIL:${profile.correo || ''}`,
        `URL;TYPE=GitHub:https://${profile.github || ''}`,
        `URL;TYPE=LinkedIn:https://${profile.linkedin || ''}`,
        `NOTE:Egresado de Ingeniería Informática UAJMS (${profile.anio})`,
        "END:VCARD"
      ].join("\n");

      const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${profile.nombres}_${profile.apellidos}.vcf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    renderSkillsChart(container, skills) {
      if (!container) return;
      const mockLevels = [90, 85, 78, 92, 88, 75, 80];
      container.innerHTML = `
        <div class="skills-chart-box">
          <div style="font-family: var(--f-mono); font-size: 0.8rem; color: var(--accent-cyan); margin-bottom: 16px;">
            📊 Nivel de Dominio Técnico
          </div>
          ${(skills || []).map((s, idx) => `
            <div class="skill-bar-row">
              <div class="skill-bar-head"><span>${s}</span><span>${mockLevels[idx % mockLevels.length]}%</span></div>
              <div class="skill-bar-track"><div class="skill-bar-fill" style="width: 0%;" data-target="${mockLevels[idx % mockLevels.length]}%"></div></div>
            </div>
          `).join("")}
        </div>
      `;
      setTimeout(() => {
        container.querySelectorAll(".skill-bar-fill").forEach(b => b.style.width = b.dataset.target);
      }, 100);
    },

    generateQRCanvas(canvas, urlText) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const size = 180;
      canvas.width = size; canvas.height = size;
      ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#090E1A";
      const cells = 15, cellSize = size / cells;
      let hash = 0;
      for (let i = 0; i < urlText.length; i++) hash = urlText.charCodeAt(i) + ((hash << 5) - hash);

      for (let row = 0; row < cells; row++) {
        for (let col = 0; col < cells; col++) {
          const isCorner = (row < 4 && col < 4) || (row < 4 && col > cells - 5) || (row > cells - 5 && col < 4);
          if (isCorner || Math.abs((hash ^ (row * 31 + col * 17)) % 100) > 45) {
            ctx.fillRect(col * cellSize + 1, row * cellSize + 1, cellSize - 2, cellSize - 2);
          }
        }
      }
    },

    triggerConfetti() {
      let canvas = document.getElementById("confetti-canvas");
      if (!canvas) { canvas = document.createElement("canvas"); canvas.id = "confetti-canvas"; document.body.appendChild(canvas); }
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      const colors = ["#2E86FF", "#00C2E0", "#10B981", "#3CD9F0"];
      let pieces = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width, y: -20, r: Math.random() * 6 + 4,
        vy: Math.random() * 3 + 2, vx: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));

      let duration = 0;
      function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => { p.y += p.vy; p.x += p.vx; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill(); });
        duration++;
        if (duration < 140) requestAnimationFrame(loop);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      loop();
    }
  };

  // ==================== MÓDULO DIRECTORIO ====================
  const Directorio = {
    selectedIds: [],
    viewMode: "grid",

    render() {
      const grid = document.getElementById("grid");
      const count = document.getElementById("count");
      const search = document.getElementById("search");
      const filterLang = document.getElementById("filterLang");
      const filterAnio = document.getElementById("filterAnio");
      const sortBy = document.getElementById("sortBy");
      const btnGrid = document.getElementById("btnViewGrid");
      const btnList = document.getElementById("btnViewList");

      if (!grid) return;

      function initials(n, a) { return ((n ? n[0] : "") + (a ? a[0] : "")).toUpperCase(); }

      const draw = () => {
        const q = (search?.value || "").toLowerCase().trim();
        const lang = filterLang?.value || "";
        const anio = filterAnio?.value || "";
        const sort = sortBy?.value || "name-asc";

        let items = Data.getAll().filter(e => {
          const text = (e.nombres + " " + e.apellidos + " " + e.rol).toLowerCase();
          const matchesQ = !q || text.includes(q);
          const matchesLang = !lang || (e.lenguajes && e.lenguajes.includes(lang));
          const matchesAnio = !anio || String(e.anio) === String(anio);
          return matchesQ && matchesLang && matchesAnio;
        });

        items.sort((a, b) => {
          if (sort === "name-asc") return (a.nombres + a.apellidos).localeCompare(b.nombres + b.apellidos);
          if (sort === "name-desc") return (b.nombres + b.apellidos).localeCompare(a.nombres + a.apellidos);
          if (sort === "year-desc") return b.anio - a.anio;
          if (sort === "year-asc") return a.anio - b.anio;
          return 0;
        });

        grid.className = `grid ${Directorio.viewMode === 'list' ? 'list-view' : ''}`;
        grid.innerHTML = items.map((e, idx) => `
          <div class="card spotlight-card reveal-item" style="animation-delay: ${idx * 0.05}s;">
            <label class="compare-check" onclick="event.stopPropagation();">
              <input type="checkbox" data-id="${e.id}" ${Directorio.selectedIds.includes(e.id) ? 'checked' : ''} onchange="EgresadosApp.Directorio.toggleCompare('${e.id}')">
              Comparar
            </label>

            <a href="perfil.html?id=${encodeURIComponent(e.id)}" style="display: flex; flex-direction: column; gap: 14px; height: 100%;">
              <div class="card-top">
                <div class="avatar">${e.foto ? `<img src="${e.foto}" alt="Avatar">` : initials(e.nombres, e.apellidos)}</div>
                <span class="card-id">${e.id}</span>
              </div>
              <div>
                <div class="card-name">${e.nombres} ${e.apellidos}</div>
                <div class="card-role">${e.rol} · prom. ${e.anio}</div>
              </div>
              <div class="tags">
                ${(e.lenguajes || []).slice(0, 4).map(l => `<span class="tag">${l}</span>`).join("")}
              </div>
              <div class="card-links">
                <span>Ver ficha ↗</span>
              </div>
            </a>
          </div>
        `).join("");

        if (count) count.textContent = `${items.length} ${I18N[localStorage.getItem("app_lang") || "es"].count_fmt}`;
        UIFX.initSpotlight();
      };

      draw();
      search?.addEventListener("input", draw);
      filterLang?.addEventListener("change", draw);
      filterAnio?.addEventListener("change", draw);
      sortBy?.addEventListener("change", draw);

      if (btnGrid && btnList) {
        btnGrid.onclick = () => { Directorio.viewMode = "grid"; btnGrid.classList.add("active"); btnList.classList.remove("active"); draw(); };
        btnList.onclick = () => { Directorio.viewMode = "list"; btnList.classList.add("active"); btnGrid.classList.remove("active"); draw(); };
      }
    },

    toggleCompare(id) {
      const idx = Directorio.selectedIds.indexOf(id);
      if (idx !== -1) Directorio.selectedIds.splice(idx, 1);
      else if (Directorio.selectedIds.length < 3) Directorio.selectedIds.push(id);
      else alert("Puedes comparar hasta un máximo de 3 perfiles simultáneamente.");

      Directorio.updateCompareBar();
    },

    updateCompareBar() {
      let bar = document.getElementById("compareBar");
      if (!bar) {
        bar = document.createElement("div");
        bar.id = "compareBar";
        bar.className = "compare-bar";
        bar.innerHTML = `
          <span>⚖️ <b id="compareCount">0</b> perfiles seleccionados</span>
          <button type="button" class="btn btn-amber btn-sm" onclick="EgresadosApp.Directorio.openCompareModal()">Comparar perfiles ↗</button>
        `;
        document.body.appendChild(bar);
      }

      const countEl = document.getElementById("compareCount");
      if (countEl) countEl.textContent = Directorio.selectedIds.length;

      if (Directorio.selectedIds.length > 0) bar.classList.add("show");
      else bar.classList.remove("show");
    },

    openCompareModal() {
      const profiles = Directorio.selectedIds.map(id => Data.getById(id)).filter(Boolean);
      let modal = document.getElementById("compareModal");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "compareModal";
        modal.className = "modal-backdrop";
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="compare-modal-box">
          <button type="button" class="modal-close-btn" onclick="document.getElementById('compareModal').classList.remove('open')">✕</button>
          <h2 style="color: white; font-family: var(--f-display); margin-bottom: 8px;">Comparación Lado a Lado</h2>
          <p style="color: var(--text-secondary); font-size: 0.88rem;">Matriz comparativa de competencias técnicas y trayectoria.</p>

          <table class="compare-table">
            <thead>
              <tr>
                <th>Característica</th>
                ${profiles.map(p => `<th>${p.nombres} ${p.apellidos}<br><small style="color:var(--accent-blue-light);">${p.id}</small></th>`).join("")}
              </tr>
            </thead>
            <tbody>
              <tr>
                <b>Rol / Especialidad</b>
                ${profiles.map(p => `<td><b>${p.rol}</b></td>`).join("")}
              </tr>
              <tr>
                <b>Promoción</b>
                ${profiles.map(p => `<td>${p.anio}</td>`).join("")}
              </tr>
              <tr>
                <b>Tecnologías</b>
                ${profiles.map(p => `<td>${(p.lenguajes || []).map(l => `<span class="tag" style="margin:2px;">${l}</span>`).join("")}</td>`).join("")}
              </tr>
              <tr>
                <b>Proyectos</b>
                ${profiles.map(p => `<td>${(p.proyectos || []).length} proyecto(s) destacado(s)</td>`).join("")}
              </tr>
              <tr>
                <b>Contacto</b>
                ${profiles.map(p => `<td>${p.correo ? `✉ ${p.correo}` : '—'}</td>`).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      `;
      modal.classList.add("open");
    }
  };

  // ==================== MÓDULO PERFIL PÚBLICO ====================
  const Perfil = {
    render() {
      const root = document.getElementById("profile-root");
      if (!root) return;

      const params = new URLSearchParams(location.search);
      const id = params.get("id");
      const e = Data.getById(id);

      if (!e) {
        document.title = "Egresado no encontrado — 404";
        root.innerHTML = `<div class="wrap"><div class="not-found-box"><h1>404</h1><h2>Egresado no encontrado</h2><a href="index.html" class="btn btn-amber">← Volver al directorio</a></div></div>`;
        return;
      }

      document.title = `${e.nombres} ${e.apellidos} — Ficha de Egresado`;

      const setTxt = (id, val) => { const item = document.getElementById(id); if (item) item.textContent = val || "—"; };
      setTxt("p-nombre", `${e.nombres} ${e.apellidos}`);
      setTxt("p-rol", `${e.rol} · Promoción ${e.anio}`);
      setTxt("p-id", e.id);
      setTxt("p-bio", e.bio);

      // Badges
      const pBadges = document.getElementById("p-badges");
      if (pBadges) {
        const badges = Data.getBadges(e);
        pBadges.innerHTML = badges.map(b => `<span class="badge-pill ${b.type}">${b.label}</span>`).join("");
      }

      // vCard Button
      const btnVCard = document.getElementById("btnDownloadVCard");
      if (btnVCard) btnVCard.onclick = () => UIFX.downloadVCard(e);

      // Skills & Chart
      const pSkills = document.getElementById("p-skills");
      if (pSkills) {
        pSkills.innerHTML = (e.lenguajes || []).map(l => `<div class="skill"><span>${l}</span><span class="lvl"><span class="on"></span><span class="on"></span></span></div>`).join("");
      }
      UIFX.renderSkillsChart(document.getElementById("p-skills-chart"), e.lenguajes);

      // Proyectos
      const pProjects = document.getElementById("p-projects");
      if (pProjects) {
        pProjects.innerHTML = (e.proyectos && e.proyectos.length > 0) ? e.proyectos.map(p => `
          <div class="project-card">
            <h4>${p.titulo}</h4><p>${p.descripcion}</p>
            <div class="tags">${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join("")}</div>
          </div>
        `).join("") : `<p style="color: var(--text-muted);">Sin proyectos registrados.</p>`;
      }

      // Experiencia
      const pExp = document.getElementById("p-experience");
      if (pExp) {
        pExp.innerHTML = (e.experiencia && e.experiencia.length > 0) ? e.experiencia.map(ex => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-title">${ex.puesto}</div>
            <div class="timeline-sub">${ex.empresa} · ${ex.periodo}</div>
            <div class="timeline-desc">${ex.descripcion}</div>
          </div>
        `).join("") : `<p style="color: var(--text-muted);">Sin experiencia registrada.</p>`;
      }

      // Recomendaciones
      const recsList = document.getElementById("p-recommendations");
      const recForm = document.getElementById("recForm");

      const renderRecs = () => {
        if (!recsList) return;
        const recs = Data.getRecommendations(e.id);
        recsList.innerHTML = recs.map(r => `
          <div class="recommendation-card">
            <div class="recommendation-head">
              <span>${r.autor}</span>
              <small>${r.cargo || 'Colega Egresado'}</small>
            </div>
            <div class="recommendation-body">"${r.mensaje}"</div>
          </div>
        `).join("");
      };
      renderRecs();

      if (recForm) {
        recForm.onsubmit = (ev) => {
          ev.preventDefault();
          const autor = document.getElementById("rec-autor").value;
          const cargo = document.getElementById("rec-cargo").value;
          const mensaje = document.getElementById("rec-mensaje").value;

          if (autor && mensaje) {
            Data.addRecommendation(e.id, { autor, cargo, mensaje });
            renderRecs();
            recForm.reset();
            UIFX.announceARIA("Recomendación agregada exitosamente");
          }
        };
      }

      // QR & Share & Print
      const btnShare = document.getElementById("btnShareLink");
      if (btnShare) {
        btnShare.onclick = () => {
          navigator.clipboard.writeText(window.location.href);
          btnShare.textContent = "✓ ¡Enlace copiado!";
          setTimeout(() => btnShare.textContent = "🔗 Copiar enlace", 2000);
        };
      }

      const btnQR = document.getElementById("btnShowQR");
      if (btnQR) {
        btnQR.onclick = () => {
          UIFX.generateQRCanvas(document.getElementById("qrCanvas"), window.location.href);
          document.getElementById("qrModal").classList.add("open");
        };
      }
      const closeQR = document.getElementById("closeQRModal");
      if (closeQR) closeQR.onclick = () => document.getElementById("qrModal").classList.remove("open");

      const printBtn = document.getElementById("btnPrintCV");
      if (printBtn) printBtn.onclick = () => window.print();
    }
  };

  // ==================== MÓDULO DASHBOARD ====================
  const Dashboard = {
    init() {
      const form = document.getElementById("dashForm");
      if (!form) return;

      const profile = Data.getCurrentUser();
      document.getElementById("d-nombres").value = profile.nombres || "";
      document.getElementById("d-apellidos").value = profile.apellidos || "";
      document.getElementById("d-rol").value = profile.rol || "";
      document.getElementById("d-anio").value = profile.anio || "";
      document.getElementById("d-bio").value = profile.bio || "";
      document.getElementById("d-github").value = profile.github || "";
      document.getElementById("d-linkedin").value = profile.linkedin || "";
      document.getElementById("d-correo").value = profile.correo || "";

      // Actualizar enlace "Ver ficha pública" para que apunte al perfil real del usuario
      const linkPublico = document.querySelector('a[href*="perfil.html"]');
      if (linkPublico) {
        linkPublico.href = `perfil.html?id=${encodeURIComponent(profile.id)}`;
      }

      // Estadísticas globales (solo si existe el contenedor)
      const adminStatsBox = document.getElementById("adminGlobalStats");
      if (adminStatsBox) {
        const stats = Data.getGlobalStats();
        adminStatsBox.innerHTML = `
          <div class="admin-stats-grid">
            <div class="admin-stat-card"><b>${stats.total}</b><span>EGRESADOS EN SISTEMA</span></div>
            <div class="admin-stat-card"><b>100%</b><span>PERFILES ACTIVOS</span></div>
            <div class="admin-stat-card"><b>🔥 3 DÍAS</b><span>RACHA ACTIVA</span></div>
          </div>
        `;
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const updated = {
          ...profile,
          nombres: document.getElementById("d-nombres").value,
          apellidos: document.getElementById("d-apellidos").value,
          rol: document.getElementById("d-rol").value,
          anio: document.getElementById("d-anio").value,
          bio: document.getElementById("d-bio").value,
          github: document.getElementById("d-github").value,
          linkedin: document.getElementById("d-linkedin").value,
          correo: document.getElementById("d-correo").value
        };
        Data.saveProfile(updated);
        const toast = document.getElementById("toast");
        if (toast) { toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3000); }
      });
    }
  };

  // ==================== MÓDULO AUTENTICACIÓN ====================
  const Auth = {
    initAuthTabs() {
      const tabs = document.querySelectorAll(".tab-btn");
      const panels = document.querySelectorAll("[data-panel]");
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
      const form = document.getElementById("authForm");
      if (!form) return;

      form.addEventListener("submit", (e) => {
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

  // ==================== ARRANQUE GLOBAL ====================
  document.addEventListener("DOMContentLoaded", () => {
    Data.initDB();
    UIFX.initParticles();
    UIFX.initTypewriter();
    UIFX.initSpotlight();
    UIFX.initNotifications();
    UIFX.initThemeToggle();
    UIFX.initLangToggle();
    // Línea eliminada: UIFX.initKeyboardShortcuts();

    Directorio.render();
    Perfil.render();
    Dashboard.init();
    Auth.initAuthTabs();
    Auth.init();
  });

  return { Data, UIFX, Directorio, Perfil, Dashboard, Auth };

})();