// One lookup from a study id to its content, so widgets don't each import five
// content files. The content objects themselves stay the single source of truth.

import type { CaseStudyContent } from '../pages/CaseStudyPage';
import type { CaseStudyArtVariant } from '../components/CaseStudyCard/CaseStudyArt';
import { CASE_STUDIES } from '../pages/explorations/data';
import { upfluentData } from '../content/upfluent';
import { sagentData } from '../content/sagent';
import { usaaData } from '../content/usaa';
import { sabreData } from '../content/sabre';
import { portfolioRebuildData } from '../content/portfolio-rebuild';
import type { StudyId } from './widgetIds';
import type { TopicId } from './topics';

export interface StudyInfo {
  content: CaseStudyContent;
  /** Canonical industry label — CLAUDE.md Component Usage rule 4. */
  tag: 'Travel' | 'Fintech' | 'Mortgage' | 'Insurance' | 'AI Collaboration';
  topic: TopicId;
  /** Display name — Portfolio Rebuild's `company` field reads oddly in a header. */
  name: string;
  /**
   * The project's line-art cover, read from its work-grid card so the chat and
   * the old grid can't disagree. Portfolio Rebuild has no card, so no art.
   */
  art?: CaseStudyArtVariant;
  /** Display index chip ("01"–"04"), also from the card. */
  index?: string;
  /** Years as the card shows them ("2015–18"), falling back to the content's range. */
  years: string;
}

function fromCard(name: string) {
  const card = CASE_STUDIES.find((c) => c.title === name);
  return { art: card?.art, index: card?.index, cardYear: card?.year };
}

function study(
  content: CaseStudyContent,
  tag: StudyInfo['tag'],
  topic: TopicId,
  name: string,
): StudyInfo {
  const { art, index, cardYear } = fromCard(name);
  return { content, tag, topic, name, art, index, years: cardYear ?? content.dateRange };
}

export const STUDIES: Record<StudyId, StudyInfo> = {
  upfluent: study(upfluentData, 'Fintech', 'upfluent', 'Upfluent'),
  sagent: study(sagentData, 'Mortgage', 'sagent', 'Sagent'),
  usaa: study(usaaData, 'Insurance', 'usaa', 'USAA'),
  sabre: study(sabreData, 'Travel', 'sabre', 'Sabre'),
  portfolio: study(portfolioRebuildData, 'AI Collaboration', 'ai', 'Portfolio rebuild'),
};

/** The client case studies in portfolio order (CLAUDE.md: 01 Upfluent, 02 Sagent, 03 USAA, 04 Sabre). */
export const CLIENT_STUDY_ORDER: StudyId[] = ['upfluent', 'sagent', 'usaa', 'sabre'];
