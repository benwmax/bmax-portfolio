import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeV4Blend } from './pages/explorations/HomeV4Blend';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatProvider } from './context/ChatContext';
import { portfolioRebuildData } from './content/portfolio-rebuild';
import { upfluentData } from './content/upfluent';
import { usaaData } from './content/usaa';
import { sabreData } from './content/sabre';

function App() {
  return (
    <BrowserRouter>
      {/* Shared above the routes so the conversation survives navigation
          between Home and case study pages — see decisions.md 2026-07-18. */}
      <ChatProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeV4Blend />} />
          <Route path="/work" element={<HomeV4Blend />} />
          <Route path="/work/portfolio" element={<CaseStudyPage {...portfolioRebuildData} />} />
          <Route path="/work/upfluent" element={<CaseStudyPage {...upfluentData} />} />
          {/* Sagent is intentionally unrouted: its content is still a placeholder
              (Phase 1C brain dump not done), so /work/sagent falls through to the
              404 rather than shipping "Case study in progress." to a visitor.
              src/content/sagent.ts is kept intact — re-listing it is this route
              plus its card in explorations/data.ts. See decisions.md 2026-07-29. */}
          <Route path="/work/usaa" element={<CaseStudyPage {...usaaData} />} />
          <Route path="/work/sabre" element={<CaseStudyPage {...sabreData} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
