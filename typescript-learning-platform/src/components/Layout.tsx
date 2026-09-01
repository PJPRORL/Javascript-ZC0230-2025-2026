import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  const [theme, setTheme] = useState('dark');
  const [isLessenOpen, setIsLessenOpen] = useState(false);
  const [isOefeningenOpen, setIsOefeningenOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("vuepress-theme-hope-scheme") || "dark";
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem("vuepress-theme-hope-scheme", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div id="app">
      <div className="theme-container external-link-icon has-toc" vp-container="">
        <header id="navbar" className="vp-navbar" vp-navbar="">
          <div className="vp-navbar-start">
            <button type="button" className="vp-toggle-sidebar-button" title="Toggle Sidebar">
              <span className="icon"></span>
            </button>
            <Link className="route-link vp-brand" to="/">
              <span className="vp-site-name hide-in-pad">JavaScript Leerlijn</span>
            </Link>
          </div>
          <div className="vp-navbar-center">
            <nav className="vp-nav-links">
              
              <div 
                className="vp-nav-item hide-in-mobile"
                onMouseEnter={() => setIsLessenOpen(true)}
                onMouseLeave={() => setIsLessenOpen(false)}
              >
                <div className="vp-dropdown-wrapper">
                  <button type="button" className="vp-dropdown-title" aria-label="Lessen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L1 7l11 5l9-4.1V17h2V7L12 2zm0 10.9l-9-4.1L12 4l9 4.1l-9 4.8z"></path><path fill="currentColor" d="M4 11v6c0 2.2 3.6 4 8 4s8-1.8 8-4v-6l-2 1v5c0 1.1-2.7 2-6 2s-6-.9-6-2v-5l-2-1z"></path></svg> Lessen
                    <span className="arrow"></span>
                    {isLessenOpen && (
                      <ul className="vp-dropdown" style={{ display: 'block' }}>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture1">1. Syntax & controlestructuren</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture2">2. Arrow functions & arrays</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture3">3. Objects</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture4">4. DOM manipulatie & events</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture5">5. Async programming</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture6">6. TypeScript</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture7">7. Vite</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture8">8. Multipage apps</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/theory/lecture9">9. Data management</Link></li>
                      </ul>
                    )}
                  </button>
                </div>
              </div>

              <div className="vp-nav-item hide-in-mobile">
                <Link className="route-link auto-link" to="/playground">TS Playground</Link>
              </div>

              <div 
                className="vp-nav-item hide-in-mobile"
                onMouseEnter={() => setIsOefeningenOpen(true)}
                onMouseLeave={() => setIsOefeningenOpen(false)}
              >
                <div className="vp-dropdown-wrapper">
                  <button type="button" className="vp-dropdown-title" aria-label="Oefeningen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6l6 6l1.4-1.4zm5.2 0l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6l-1.4-1.4z"></path></svg> Oefeningen
                    <span className="arrow"></span>
                    {isOefeningenOpen && (
                      <ul className="vp-dropdown" style={{ display: 'block' }}>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture1">1. Syntax & controlestructuren</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture2">2. Arrow functions & arrays</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture3">3. Objects</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture4">4. DOM manipulatie & events</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture5">5. Async programming</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture6">6. TypeScript</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture7">7. Vite</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture8">8. Multipage apps</Link></li>
                        <li className="vp-dropdown-item"><Link className="route-link auto-link" to="/exercise/lecture9">9. Data management</Link></li>
                      </ul>
                    )}
                  </button>
                </div>
              </div>

            </nav>
          </div>
          
          <div className="vp-navbar-end">
            <div className="vp-nav-item hide-in-mobile">
              <button 
                type="button" 
                className="vp-appearance-button" 
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21A9 9 0 0 1 3 12a9 9 0 0 1 9-9c.33 0 .66.02 1 .05A9.52 9.52 0 0 0 9 12c0 4.14 2.65 7.66 6.36 8.97c-.77.19-1.57.29-2.36.29z"></path></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 8a3 3 0 1 1 0-6a3 3 0 0 1 0 6m0-12a1 1 0 0 0 1-1V1a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1m0 16a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1M5.64 5.64a1 1 0 0 0 1.41-1.41l-.7-.71a1 1 0 1 0-1.42 1.42l.71.7m13.43 13.43a1 1 0 0 0-1.41 1.41l.71.7a1 1 0 1 0 1.41-1.4l-.71-.71M4 12a1 1 0 0 0-1-1H1a1 1 0 1 0 0 2h2a1 1 0 0 0 1-1m17-1h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2M5.64 18.36l-.71.7a1 1 0 1 0 1.42 1.42l.7-0.71a1 1 0 1 0-1.41-1.41m12.02-12.02l.7-.71a1 1 0 1 0-1.41-1.42l-.71.7a1 1 0 1 0 1.42 1.43"></path></svg>
                )}
              </button>
            </div>
          </div>
        </header>

        <Sidebar />

        <main id="main-content" className="vp-page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
