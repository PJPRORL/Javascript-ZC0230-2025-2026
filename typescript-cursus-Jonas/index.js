/* ============================================================
   TypeScript Cursus — JavaScript
   Router, navigatie, thema-toggle, markdown rendering
   ============================================================ */

// ---- Module Definitions ----
const MODULES = [
  { id: "intro",       file: "00-lees-mij-eerst.md",                         title: "Lees mij eerst",                           icon: "📖" },
  { id: "setup",       file: "01-module-0-setup.md",                          title: "Module 0 — Setup",                         icon: "⚙️" },
  { id: "js-to-ts",    file: "02-module-1-van-javascript-naar-typescript.md", title: "Module 1 — Van JavaScript naar TypeScript", icon: "🔄" },
  { id: "type-system", file: "03-module-2-het-type-systeem.md",               title: "Module 2 — Het Type Systeem",              icon: "🧩" },
  { id: "unions",      file: "04-module-3-unions-en-literals.md",             title: "Module 3 — Unions en Literals",            icon: "🔀" },
  { id: "objects",     file: "05-module-4-objecten.md",                       title: "Module 4 — Objecten",                      icon: "📦" },
  { id: "functions",   file: "06-module-5-functies.md",                       title: "Module 5 — Functies",                      icon: "⚡" },
  { id: "arrays",      file: "07-module-6-arrays.md",                         title: "Module 6 — Arrays",                        icon: "📚" },
  { id: "interfaces",  file: "08-module-7-interfaces.md",                     title: "Module 7 — Interfaces",                    icon: "🔗" },
  { id: "classes",     file: "09-module-8-klassen.md",                        title: "Module 8 — Klassen",                       icon: "🏛️" },
  { id: "modifiers",   file: "10-module-9-type-modifiers.md",                 title: "Module 9 — Type Modifiers",                icon: "🔧" },
  { id: "generics",    file: "11-module-10-generics.md",                      title: "Module 10 — Generics",                     icon: "🧬" },
  { id: "vite",        file: "12-module-11-vite-en-modules.md",               title: "Module 11 — Vite & Modules",               icon: "⚡" },
  { id: "data-mgmt",   file: "13-module-12-data-management.md",               title: "Module 12 — Data Management",              icon: "💾" },
  { id: "multipage",   file: "14-module-13-multipage-apps.md",                title: "Module 13 — Multipage Apps & Architectuur",icon: "🖥️" },
  { id: "declarations",file: "15-module-14-declaratiebestanden.md",           title: "Module 14 — Declaratiebestanden",          icon: "📄" },
  { id: "ide",         file: "16-module-15-ide-functies.md",                  title: "Module 15 — IDE Functies",                 icon: "💻" },
  { id: "config",      file: "17-module-16-configuratie.md",                  title: "Module 16 — Configuratie",                 icon: "🛠️" },
  { id: "syntax-ext",  file: "18-module-17-syntax-extensies.md",              title: "Module 17 — Syntax Extensies (Bonus)",     icon: "✨" },
  { id: "type-ops",    file: "19-module-18-type-operaties.md",                title: "Module 18 — Type Operaties (Bonus)",       icon: "🧮" },
  { id: "solutions",   file: "20-module-19-eindexamen.md",                    title: "Module 19 — Eindexamen & Oplossingen",     icon: "🎓" },
];

// ---- State ----
let currentModuleId = null;
let readModules = JSON.parse(localStorage.getItem("ts-cursus-read") || "[]");

// ---- DOM Elements ----
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const hamburger = document.getElementById("hamburger");
const moduleList = document.getElementById("module-list");
const contentBody = document.getElementById("content-body");
const markReadBtn = document.getElementById("mark-read-btn");
const searchInput = document.getElementById("search-input");
const themeToggleDesktop = document.getElementById("theme-toggle-desktop");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const hljsDark = document.getElementById("hljs-theme-dark");
const hljsLight = document.getElementById("hljs-theme-light");

// ---- Router ----
// De router gebruikt de URL-hash (#) om te bepalen welke module getoond wordt.
// Voorbeeld: index.html#unions → laadt Module 3 — Unions en Literals
// Als er geen hash is, laden we de intro-module.

function getModuleIdFromHash() {
  const hash = window.location.hash.replace("#", "");
  if (hash && MODULES.find(m => m.id === hash)) {
    return hash;
  }
  return MODULES[0].id; // default: intro
}

function navigateTo(moduleId) {
  window.location.hash = moduleId;
}

// Luister naar hash-veranderingen (= onze router)
window.addEventListener("hashchange", () => {
  const id = getModuleIdFromHash();
  loadModule(id);
});

// ---- Build Sidebar ----
function buildSidebar() {
  moduleList.innerHTML = "";
  MODULES.forEach(mod => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${mod.id}`;
    a.dataset.moduleId = mod.id;

    const indicator = document.createElement("span");
    indicator.className = "read-indicator" + (readModules.includes(mod.id) ? " read" : "");
    
    const text = document.createTextNode(` ${mod.title}`);
    
    a.appendChild(indicator);
    a.appendChild(text);
    li.appendChild(a);
    moduleList.appendChild(li);
  });
}

// ---- Filter Sidebar ----
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  const items = moduleList.querySelectorAll("li");
  items.forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(query) ? "" : "none";
  });
});

// ---- Load Module ----
async function loadModule(moduleId) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return;

  currentModuleId = moduleId;

  // Update sidebar active state
  document.querySelectorAll(".sidebar-nav a").forEach(a => {
    a.classList.toggle("active", a.dataset.moduleId === moduleId);
  });

  // Update mark-read button
  updateMarkReadBtn();

  // Show loading
  contentBody.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Module laden...</p>
    </div>`;
  contentBody.classList.remove("loaded");

  // Close mobile sidebar
  closeSidebar();

  try {
    const response = await fetch(`modules/${mod.file}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    renderMarkdown(markdown);
  } catch (err) {
    contentBody.innerHTML = `
      <div class="loading">
        <p style="color: var(--danger-text);">⚠️ Kon de module niet laden.</p>
        <p style="font-size: 0.85em; color: var(--text-secondary);">${err.message}</p>
      </div>`;
  }
}

// ---- Render Markdown ----
function renderMarkdown(markdown) {
  // Configure marked
  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: true,
  });

  // Custom renderer
  const renderer = new marked.Renderer();

  // Add language label to code blocks
  renderer.code = function(code, language) {
    // Handle both old and new marked.js API
    let text, lang;
    if (typeof code === 'object') {
      text = code.text;
      lang = code.lang;
    } else {
      text = code;
      lang = language;
    }
    
    const validLang = lang && hljs.getLanguage(lang) ? lang : "plaintext";
    const highlighted = hljs.highlight(text, { language: validLang }).value;
    const langLabel = lang ? ` data-lang="${lang}"` : "";
    return `<pre${langLabel}><code class="hljs language-${validLang}">${highlighted}</code></pre>`;
  };

  // Process callout blockquotes
  const processedMarkdown = markdown.replace(
    /^> \*\*(💡 Tip|⚠️ Belangrijk|🔴 Let op|📝 Opmerking|TIP|BELANGRIJK|LET OP|OPMERKING):\*\*\s*([\s\S]*?)(?=\n(?!> )|\n\n|$)/gm,
    (match, type, content) => {
      const typeMap = {
        "💡 Tip": "tip", "TIP": "tip",
        "⚠️ Belangrijk": "warn", "BELANGRIJK": "warn",
        "🔴 Let op": "danger", "LET OP": "danger",
        "📝 Opmerking": "note", "OPMERKING": "note",
      };
      const iconMap = {
        "tip": "💡", "warn": "⚠️", "danger": "🔴", "note": "📝"
      };
      const titleMap = {
        "tip": "Tip", "warn": "Belangrijk", "danger": "Let op", "note": "Opmerking"
      };
      const cls = typeMap[type] || "note";
      const cleanContent = content.replace(/^> ?/gm, "").trim();
      return `<div class="callout callout-${cls}"><div class="callout-title">${iconMap[cls]} ${titleMap[cls]}</div><p>${cleanContent}</p></div>`;
    }
  );

  marked.setOptions({ renderer });
  const html = marked.parse(processedMarkdown);

  contentBody.innerHTML = html;

  // Trigger fade-in
  requestAnimationFrame(() => {
    contentBody.classList.add("loaded");
  });

  // Highlight any remaining code blocks
  contentBody.querySelectorAll("pre code:not(.hljs)").forEach(block => {
    hljs.highlightElement(block);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ---- Mark as Read ----
function updateMarkReadBtn() {
  if (readModules.includes(currentModuleId)) {
    markReadBtn.textContent = "✓ Gelezen";
    markReadBtn.classList.add("is-read");
  } else {
    markReadBtn.textContent = "Markeer als gelezen";
    markReadBtn.classList.remove("is-read");
  }
}

markReadBtn.addEventListener("click", () => {
  if (!currentModuleId) return;
  
  if (readModules.includes(currentModuleId)) {
    readModules = readModules.filter(id => id !== currentModuleId);
  } else {
    readModules.push(currentModuleId);
  }

  localStorage.setItem("ts-cursus-read", JSON.stringify(readModules));
  updateMarkReadBtn();

  // Update sidebar indicator
  const link = document.querySelector(`a[data-module-id="${currentModuleId}"]`);
  if (link) {
    const indicator = link.querySelector(".read-indicator");
    indicator.classList.toggle("read", readModules.includes(currentModuleId));
  }
});

// ---- Theme Toggle ----
function getTheme() {
  return localStorage.getItem("ts-cursus-theme") || "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ts-cursus-theme", theme);

  // Update icons
  const icon = theme === "dark" ? "☀️" : "🌙";
  document.querySelectorAll(".theme-icon").forEach(el => el.textContent = icon);

  // Toggle highlight.js themes
  hljsDark.disabled = theme !== "dark";
  hljsLight.disabled = theme !== "light";
}

function toggleTheme() {
  const current = getTheme();
  setTheme(current === "dark" ? "light" : "dark");
}

themeToggleDesktop.addEventListener("click", toggleTheme);
themeToggleMobile.addEventListener("click", toggleTheme);

// ---- Mobile Sidebar ----
function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("active");
  hamburger.classList.add("active");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
  hamburger.classList.remove("active");
}

hamburger.addEventListener("click", () => {
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

sidebarOverlay.addEventListener("click", closeSidebar);

// ---- Init ----
function init() {
  // Set theme
  setTheme(getTheme());

  // Build sidebar
  buildSidebar();

  // Load initial module from URL hash
  const initialId = getModuleIdFromHash();
  loadModule(initialId);
}

init();
