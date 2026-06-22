import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { portfolioRebuildData } from './content/portfolio-rebuild';
import { upfluentData } from './content/upfluent';
import { sagentData } from './content/sagent';
import { usaaData } from './content/usaa';
import { sabreData } from './content/sabre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<HomePage />} />
        <Route path="/work/portfolio" element={<CaseStudyPage {...portfolioRebuildData} />} />
        <Route path="/work/upfluent" element={<CaseStudyPage {...upfluentData} />} />
        <Route path="/work/sagent" element={<CaseStudyPage {...sagentData} />} />
        <Route path="/work/usaa" element={<CaseStudyPage {...usaaData} />} />
        <Route path="/work/sabre" element={<CaseStudyPage {...sabreData} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
