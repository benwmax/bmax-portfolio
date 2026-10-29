import type { ReactNode } from 'react';
import type { StudyId, WidgetId } from '../widgetIds';
import { CaseWalkthrough } from './CaseWalkthrough';
import { StudyDecision, StudyGallery, StudyHard, StudyOutcomes, StudyRole } from './StudyWidgets';
import { SabreDiagram, UpfluentDiagram, UsaaDiagram } from './Diagrams';
import {
  AiLimits,
  AiSplit,
  CareerTimeline,
  ContactLinks,
  DesignSystemLinks,
  Highlights,
  LookingFor,
  ResearchMethods,
  ResumeLinks,
  SideProjects,
  WhyBen,
} from './GlobalWidgets';
import { TopicMenu } from './TopicMenu';

const GLOBAL: Record<string, () => ReactNode> = {
  highlights: () => <Highlights />,
  'why-ben': () => <WhyBen />,
  career: () => <CareerTimeline />,
  'looking-for': () => <LookingFor />,
  research: () => <ResearchMethods />,
  'ai-split': () => <AiSplit />,
  'ai-limits': () => <AiLimits />,
  'side-projects': () => <SideProjects />,
  'links-design-system': () => <DesignSystemLinks />,
  'links-resume': () => <ResumeLinks />,
  'links-contact': () => <ContactLinks />,
  topics: () => <TopicMenu headingLevel={3} />,
};

/**
 * Renders one widget by id. The only place an id turns into UI — ChatTranscript
 * calls this for every id on a message, whether a tour put it there or the
 * model asked for it. Ids are validated before they reach a message
 * (isWidgetId), so the null fallthrough is a belt-and-braces guard.
 */
export function ChatWidget({ id }: { id: WidgetId }) {
  if (id in GLOBAL) return <>{GLOBAL[id]()}</>;

  const [study, part] = id.split('.') as [StudyId, string];
  switch (part) {
    case 'walkthrough':
      return <CaseWalkthrough study={study} />;
    case 'outcomes':
      return <StudyOutcomes study={study} />;
    case 'role':
      return <StudyRole study={study} />;
    case 'decision':
      return <StudyDecision study={study} />;
    case 'hard':
      return <StudyHard study={study} />;
    case 'gallery':
      return <StudyGallery study={study} />;
    case 'diagram':
      if (study === 'sabre') return <SabreDiagram />;
      if (study === 'usaa') return <UsaaDiagram />;
      if (study === 'upfluent') return <UpfluentDiagram />;
      return null;
    default:
      return null;
  }
}
