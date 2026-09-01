import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isLecture6 = location.pathname.includes('/lecture6');
  const isLecture7 = location.pathname.includes('/lecture7');
  const isLecture8 = location.pathname.includes('/lecture8');
  const isLecture9 = location.pathname.includes('/lecture9');

  const isAnyLectureActive = isLecture6 || isLecture7 || isLecture8 || isLecture9;

  const [isJsOpen, setIsJsOpen] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(isAnyLectureActive);
  const [isEssentialsOpen, setIsEssentialsOpen] = useState(
    location.pathname.includes('/lecture1') ||
    location.pathname.includes('/lecture2') ||
    location.pathname.includes('/lecture3') ||
    location.pathname.includes('/lecture4') ||
    location.pathname.includes('/lecture5')
  );

  // Keep accordion open if we navigate to a lecture
  useEffect(() => {
    if (isAnyLectureActive) {
      setIsJsOpen(true);
      setIsAdvancedOpen(true);
    }
  }, [location.pathname, isAnyLectureActive]);

  return (
    <aside id="sidebar" className="vp-sidebar" vp-sidebar="">
      <ul className="vp-sidebar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive && location.pathname === '/' ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
            Inleiding
          </NavLink>
        </li>
        
        {/* JavaScript Group */}
        <li>
          <section className="vp-sidebar-group">
            <button 
              className={`vp-sidebar-header clickable ${isJsOpen ? 'active' : ''}`} 
              type="button" 
              onClick={() => setIsJsOpen(!isJsOpen)}
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" style={{ marginRight: '8px' }}><path fill="#f7df1e" d="M3 3h18v18H3V3zm11.85 10.65c-.24-.26-.64-.53-1.28-.84c-.65-.3-1.07-.57-1.28-.79c-.19-.2-.29-.42-.29-.68c0-.28.11-.53.33-.74c.22-.2.53-.3 1.01-.3c.48 0 .8.1.96.3c.15.18.27.46.36.8l1.7-.58c-.18-.59-.51-1.09-1-1.46c-.5-.38-1.12-.57-1.87-.57c-.98 0-1.74.29-2.27.87c-.52.56-.78 1.25-.78 2.02c0 .54.12 1.02.39 1.43c.27.43.68.81 1.25 1.15c.67.39 1.12.7 1.34.96c.2.23.3.51.3.84c0 .35-.14.65-.4.92c-.28.27-.67.4-1.18.4c-.62 0-1.05-.15-1.29-.46c-.23-.3-.42-.76-.56-1.39l-1.84.51c.21 1.07.65 1.87 1.3 2.39c.64.51 1.48.77 2.5.77c1.07 0 1.9-.3 2.47-.9c.57-.59.85-1.33.85-2.22c0-.62-.16-1.15-.49-1.61c-.3-.45-.73-.83-1.26-1.17zM9.42 16.96V9.45H7V18.1c0 .94.24 1.63.71 2.06c.46.43 1.11.64 1.93.64c.78 0 1.36-.18 1.74-.53c.4-.36.63-.82.68-1.37l-1.8-.32c-.03.28-.13.48-.31.62c-.17.15-.41.22-.72.22c-.37 0-.61-.09-.75-.28c-.14-.2-.2-.55-.2-.93z"></path></svg>
                <span className="vp-sidebar-title">JavaScript</span>
              </span>
              <span className={`vp-arrow ${isJsOpen ? 'down' : 'end'}`}></span>
            </button>
            
            {isJsOpen && (
              <ul className="vp-sidebar-links">
                {/* Essentials Group */}
                <li>
                  <section className="vp-sidebar-group">
                    <button 
                      className={`vp-sidebar-header clickable ${isEssentialsOpen ? 'active' : ''}`} 
                      type="button" 
                      onClick={() => setIsEssentialsOpen(!isEssentialsOpen)}
                    >
                      <span className="vp-sidebar-title">Essentials</span>
                      <span className={`vp-arrow ${isEssentialsOpen ? 'down' : 'end'}`}></span>
                    </button>
                    {isEssentialsOpen && (
                      <ul className="vp-sidebar-links">
                        <li>
                          <NavLink to="/theory/lecture1" className={({ isActive }) => (isActive ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            1. Syntax & controlestructuren
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/theory/lecture2" className={({ isActive }) => (isActive ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            2. Arrow functions & arrays
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/theory/lecture3" className={({ isActive }) => (isActive ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            3. Objects
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/theory/lecture4" className={({ isActive }) => (isActive ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            4. DOM manipulatie & events
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/theory/lecture5" className={({ isActive }) => (isActive ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            5. Async programming
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </section>
                </li>

                {/* Advanced Group */}
                <li>
                  <section className="vp-sidebar-group">
                    <button 
                      className={`vp-sidebar-header clickable ${isAdvancedOpen ? 'active' : ''}`} 
                      type="button" 
                      onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    >
                      <span className="vp-sidebar-title">Advanced</span>
                      <span className={`vp-arrow ${isAdvancedOpen ? 'down' : 'end'}`}></span>
                    </button>
                    {isAdvancedOpen && (
                      <ul className="vp-sidebar-links">
                        <li>
                          <NavLink to="/theory/lecture6" className={() => (isLecture6 ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            6. TypeScript
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/theory/lecture7" className={() => (isLecture7 ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            7. Vite
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/theory/lecture8" className={() => (isLecture8 ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            8. Multipage apps
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/theory/lecture9" className={() => (isLecture9 ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                            9. Data management
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </section>
                </li>
              </ul>
            )}
          </section>
        </li>
        <li>
          <section className="vp-sidebar-group">
            <p className="vp-sidebar-header"><span className="vp-sidebar-title">Playground</span></p>
            <ul className="vp-sidebar-links">
              <li>
                <NavLink to="/playground" className={({ isActive }) => (isActive ? 'route-link route-link-active auto-link vp-sidebar-link active' : 'route-link auto-link vp-sidebar-link')}>
                  TypeScript Playground
                </NavLink>
              </li>
            </ul>
          </section>
        </li>
      </ul>
    </aside>
  );
}
