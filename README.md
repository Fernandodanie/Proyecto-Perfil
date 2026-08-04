# Registro de Egresados — Ing. Informática, UAJMS

Directorio web de egresados de la carrera de Ingeniería Informática (Facultad de Ingeniería en Recursos Naturales y Tecnología, UAJMS, Yacuiba). Cada egresado tiene una ficha pública con su rol, lenguajes/tecnologías y contactos (correo, GitHub, LinkedIn), más un panel privado para editar sus propios datos.

> **Estado:** prototipo estático generado con IA, front-end puro (HTML/CSS/JS sin build ni backend). Este README se irá actualizando a medida que rediseñemos y agreguemos funcionalidad real.

---

## 1. Estructura del proyecto

```
registro-egresados/
├── index.html        # Directorio público — landing + grid buscable de egresados
├── login.html         # Ingresar / crear cuenta (demo sin backend)
├── dashboard.html      # Panel privado — editar mi ficha
├── perfil.html         # Ficha pública de un egresado (?id=EGR·AÑO·NNN)
├── styles.css          # Sistema de diseño único, compartido por las 4 páginas
├── app.js              # Datos simulados + lógica de las 4 páginas
└── README.md
```

No hay build step: son archivos estáticos que se abren directo o se sirven con cualquier servidor estático (Live Server, `python -m http.server`, GitHub Pages, Cloudflare Pages, etc.).

## 2. Páginas

| Página | Rol | Notas |
|---|---|---|
| `index.html` | Directorio público | Hero + barra de búsqueda/filtro por lenguaje + grid de tarjetas (`.card`) enlazadas a `perfil.html?id=...` |
| `login.html` | Autenticación | Tabs "Iniciar sesión" / "Crear cuenta". El submit es falso: cualquier dato redirige a `dashboard.html` |
| `dashboard.html` | Panel privado | Form de datos personales, chips de lenguajes, enlaces (GitHub/LinkedIn/correo/portafolio), visibilidad de la ficha, checklist de progreso. El submit solo muestra un toast, no persiste nada |
| `perfil.html` | Ficha pública | Lee `?id=` de la URL, busca en `EGRESADOS` (`app.js`) y pinta hero + bio + skills + contacto |

## 3. Datos

Todo vive **hardcodeado** en `app.js`, en el arreglo `EGRESADOS` (6 egresados de ejemplo). No hay backend ni base de datos todavía — es la primera pieza a reemplazar cuando esto deje de ser demo:

```js
{
  id, nombres, apellidos, rol, anio,
  lenguajes: [...],
  correo, github, linkedin, bio
}
```

`dashboard.html` y `login.html` no escriben sobre este arreglo; son formularios de interfaz sin persistencia real.

## 4. Sistema de diseño actual (`styles.css`)

- **Paleta:** fondo "papel" grisáceo-verdoso (`--paper #EEF0EA`) + superficies oscuras tipo terminal (`--ink #10151F`) + acento ámbar (`--amber #E8A33D`) + acento índigo (`--indigo #3E4C8A`).
- **Tipografía:** `Space Mono` para display/mono, `Sora` para cuerpo.
- **Motivo visual:** referencias a "ficha de registro" / terminal — línea de pseudo-SQL en el hero (`SELECT * FROM egresados WHERE...`), grid de fondo tipo blueprint, IDs con formato `EGR·AÑO·NNN`.
- **Componentes:** tarjetas de egresado, chip-input de lenguajes, panel de dashboard con checklist de progreso, ficha pública con `skill-row` y `contact-card`.

## 5. Diagnóstico — por qué se siente "genérico/cuadrado"

Vale la pena anotarlo antes de rediseñar, para no repetir los mismos defaults:

- **Layout muy en grilla/caja:** todo vive dentro de `.panel`/`.card` con el mismo `border-radius` chico y el mismo borde de 1px — no hay jerarquía visual fuerte entre secciones, todo pesa igual.
- **El motivo "terminal/base de datos" está solo en el hero.** Se anuncia con la línea SQL pero no se sostiene en el resto de las páginas (dashboard y perfil son formularios genéricos de SaaS).
- **Tarjetas del directorio muy plantilla:** avatar cuadrado + nombre + tags + 2 links abajo es el patrón por defecto de "card de equipo" que se ve en cualquier landing.
- **Poca personalidad de contenido:** los egresados de ejemplo, roles y bios son genéricos (podrían ser de cualquier universidad del mundo). No hay nada que ancle esto a Yacuiba / UAJMS / la realidad de la carrera más allá del texto del header.
- **Sin momento de firma ("signature element"):** no hay una pieza memorable propia del proyecto — todo son paneles y grids intercambiables.

Esto va a guiar las próximas iteraciones: menos "SaaS dashboard genérico", más identidad propia ligada al contexto real (carrera, egresados, Yacuiba).

## 6. Pendiente / próximos pasos

- [ ] Rediseño visual — romper la sensación de "todo en cajas iguales", definir un elemento de firma
- [ ] Persistencia real de datos (backend/API o al menos localStorage) en `dashboard.html`
- [ ] Autenticación real en `login.html`
- [ ] Subida de foto de perfil (hoy solo hay iniciales)
- [ ] Reemplazar datos simulados por egresados reales (con su consentimiento)
- [ ] Revisar accesibilidad: foco visible, contraste, `reduced-motion` (ya respetado parcialmente)

## 7. Cómo verlo localmente

```bash
cd registro-egresados
python3 -m http.server 8000
# abrir http://localhost:8000
```

---
*Última actualización: se documentó el estado inicial del proyecto tal como fue generado, antes de la primera pasada de rediseño.*