import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { ChatHome } from './pages/ChatHome';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatProvider } from './context/ChatContext';
import { DEEP_LINK_TOPICS } from './chat/topics';

// Chat-first experiment (2026-10-29): the case study pages are gone and their
// URLs open the chat on that project's walkthrough instead, so links already
// shared on LinkedIn and résumés keep working. Unknown slugs still 404.
// HomeV4Blend and CaseStudyPage remain in the repo for Storybook and for
// rolling back.
function WorkTopic() {
  const { slug = '' } = useParams();
  // Object.hasOwn, not `in`: `in` also matches inherited keys, so /work/constructor
  // rendered the chat home instead of a 404 (2026-10-30 audit).
  if (!Object.hasOwn(DEEP_LINK_TOPICS, slug)) return <NotFoundPage />;
  // Keyed so moving between two /work/<slug> URLs plays the new walkthrough.
  return <ChatHome key={slug} topicSlug={slug} />;
}

function App() {
  return (
    <BrowserRouter>
      {/* Shared above the routes so the conversation survives a trip to
          Resume or Contact and back — see decisions.md 2026-07-18. */}
      <ChatProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<ChatHome />} />
          <Route path="/work" element={<ChatHome />} />
          <Route path="/work/:slug" element={<WorkTopic />} />
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
