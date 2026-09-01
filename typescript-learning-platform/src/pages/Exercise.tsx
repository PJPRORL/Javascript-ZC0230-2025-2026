import { useParams, Link } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { ContentData, ContentMeta } from '../data/content';

export default function Exercise() {
  const { lecture } = useParams<{ lecture: string }>();
  const contentKey = `${lecture}_exercise`;
  
  const htmlContent = ContentData[contentKey];
  const meta = ContentMeta[contentKey] || { title: '', date: '', time: '', words: '' };

  if (!htmlContent) {
    return (
      <div className="vp-content">
        <div id="markdown-content">
          <h1>Content niet gevonden</h1>
          <p>De oefeningen voor {lecture} konden niet worden geladen.</p>
        </div>
      </div>
    );
  }

  const toc = useMemo(() => {
    const matches = [...htmlContent.matchAll(/<h([23])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)];
    return matches.map(m => ({
      level: parseInt(m[1], 10),
      id: m[2],
      title: m[3].replace(/<[^>]+>/g, '').trim()
    }));
  }, [htmlContent]);

  useEffect(() => {
    const handleTabClick = (e: Event) => {
      const target = e.target as HTMLElement;
      // Find the clicked button
      const btn = target.closest('button.vp-tab-nav') as HTMLElement | null;
      if (!btn) return;

      // Find the parent .vp-tabs container
      const group = btn.closest('div.vp-tabs') as HTMLElement | null;
      if (!group) return;

      // Collect all nav buttons and tab panels from this group
      const allButtons: HTMLElement[] = [];
      const allPanels: HTMLElement[] = [];

      for (let i = 0; i < group.children.length; i++) {
        const child = group.children[i] as HTMLElement;
        // The nav container holds the buttons
        if (child.classList && child.classList.contains('vp-tabs-nav')) {
          for (let j = 0; j < child.children.length; j++) {
            const navChild = child.children[j] as HTMLElement;
            if (navChild.classList && navChild.classList.contains('vp-tab-nav')) {
              allButtons.push(navChild);
            }
          }
        }
        // Tab panels are direct children of .vp-tabs
        if (child.classList && child.classList.contains('vp-tab')) {
          allPanels.push(child);
        }
      }

      // Find which button was clicked
      const clickedIndex = allButtons.indexOf(btn);
      if (clickedIndex === -1) return;

      // Deactivate all buttons
      allButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      // Hide all panels
      allPanels.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-expanded', 'false');
        p.style.display = 'none';
      });

      // Activate clicked button
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show corresponding panel
      if (clickedIndex < allPanels.length) {
        allPanels[clickedIndex].classList.add('active');
        allPanels[clickedIndex].setAttribute('aria-expanded', 'true');
        allPanels[clickedIndex].style.display = 'block';
      }
    };

    document.addEventListener('click', handleTabClick);

    return () => {
      document.removeEventListener('click', handleTabClick);
    };
  }, []);

  return (
    <>
      <div className="vp-page-title" style={{ paddingBottom: '0' }}>
        <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem', marginBottom: '10px' }}>
          <Link to={`/theory/${lecture}`} style={{ color: 'var(--vp-c-text-mute)', paddingBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19h16v-7H4v7zM4 6v5h16V6H4zm-2 15V4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v17H2z"></path></svg> Theorie
          </Link>
          <Link to={`/exercise/${lecture}`} style={{ color: 'var(--vp-c-brand)', borderBottom: '2px solid var(--vp-c-brand)', paddingBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6l6 6l1.4-1.4zm5.2 0l4.6-4.6l-4.6-4.6L16 6l6 6l-6 6l-1.4-1.4z"></path></svg> Oefeningen
          </Link>
        </div>
        <div className="page-info">
          <span className="page-date-info">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon calendar-icon" viewBox="0 0 1024 1024" fill="currentColor" aria-label="calendar icon" name="calendar" style={{ width: '1em', height: '1em' }}><path d="M716.4 110.137c0-18.753-14.72-33.473-33.472-33.473-18.753 0-33.473 14.72-33.473 33.473v33.473h66.993v-33.473zm-334.87 0c0-18.753-14.72-33.473-33.473-33.473s-33.52 14.72-33.52 33.473v33.473h66.993v-33.473zm468.81 33.52H716.4v100.465c0 18.753-14.72 33.473-33.472 33.473a33.145 33.145 0 01-33.473-33.473V143.657H381.53v100.465c0 18.753-14.72 33.473-33.473 33.473a33.145 33.145 0 01-33.473-33.473V143.657H180.6A134.314 134.314 0 0046.66 277.595v535.756A134.314 134.314 0 00180.6 947.289h669.74a134.36 134.36 0 00133.94-133.938V277.595a134.314 134.314 0 00-133.94-133.938zm33.473 267.877H147.126a33.145 33.145 0 01-33.473-33.473c0-18.752 14.72-33.473 33.473-33.473h736.687c18.752 0 33.472 14.72 33.472 33.473a33.145 33.145 0 01-33.472 33.473z"></path></svg>
            <span style={{ marginLeft: '5px' }}>{meta.date}</span>
          </span>
          <span className="page-reading-time-info" style={{ marginLeft: '15px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon timer-icon" viewBox="0 0 1024 1024" fill="currentColor" aria-label="timer icon" name="timer" style={{ width: '1em', height: '1em' }}><path d="M799.387 122.15c4.402-2.978 7.38-7.897 7.38-13.463v-1.165c0-8.933-7.38-16.312-16.312-16.312H256.33c-8.933 0-16.311 7.38-16.311 16.312v1.165c0 5.825 2.977 10.874 7.637 13.592 4.143 194.44 97.22 354.963 220.201 392.763-122.204 37.542-214.893 196.511-220.2 389.397-4.661 5.049-7.638 11.651-7.638 19.03v5.825h566.49v-5.825c0-7.379-2.849-13.981-7.509-18.9-5.049-193.016-97.867-351.985-220.2-389.527 123.24-37.67 216.446-198.453 220.588-392.892zM531.16 450.445v352.632c117.674 1.553 211.787 40.778 211.787 88.676H304.097c0-48.286 95.149-87.382 213.728-88.676V450.445c-93.077-3.107-167.901-81.297-167.901-177.093 0-8.803 6.99-15.793 15.793-15.793 8.803 0 15.794 6.99 15.794 15.793 0 80.261 63.69 145.635 142.01 145.635s142.011-65.374 142.011-145.635c0-8.803 6.99-15.793 15.794-15.793s15.793 6.99 15.793 15.793c0 95.019-73.789 172.82-165.96 177.093z"></path></svg>
            <span style={{ marginLeft: '5px' }}>{meta.time}</span>
          </span>
          <span className="page-word-info" style={{ marginLeft: '15px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon word-icon" viewBox="0 0 1024 1024" fill="currentColor" aria-label="word icon" name="word" style={{ width: '1em', height: '1em' }}><path d="M518.217 432.64V73.143A73.143 73.143 0 01603.43 1.097a512 512 0 01419.474 419.474 73.143 73.143 0 01-72.046 85.212H591.36a73.143 73.143 0 01-73.143-73.143z"></path><path d="M493.714 566.857h340.297a73.143 73.143 0 0173.143 85.577A457.143 457.143 0 11371.566 117.76a73.143 73.143 0 0185.577 73.143v339.383a36.571 36.571 0 0036.571 36.571z"></path></svg>
            <span style={{ marginLeft: '5px' }}>{meta.words}</span>
          </span>
        </div>
        <hr />
      </div>
      <div className="vp-content">
        {toc.length > 0 && (
          <details className="vp-toc-container" style={{ margin: '1rem 0', padding: '1rem', background: 'var(--vp-c-bg-soft)', borderRadius: '8px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Op Deze Pagina</summary>
            <ul style={{ listStyleType: 'none', paddingLeft: '1rem', marginTop: '0.5rem' }}>
              {toc.map((item, index) => (
                <li key={index} style={{ marginLeft: item.level === 3 ? '1rem' : '0', marginBottom: '0.2rem' }}>
                  <a href={`#${item.id}`} style={{ color: 'var(--vp-c-text-mute)', textDecoration: 'none' }}>{item.title}</a>
                </li>
              ))}
            </ul>
          </details>
        )}
        <div id="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </>
  );
}
