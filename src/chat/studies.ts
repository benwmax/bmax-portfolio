// One lookup from a study id to its content, so widgets don't each import five
// content files. The content objects themselves stay the single source of truth.

import type { CaseStudyContent } from '../pages/CaseStudyPage';
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
}

export const STUDIES: Record<StudyId, StudyInfo> = {
  upfluent: { content: upfluentData, tag: 'Fintech', topic: 'upfluent', name: 'Upfluent' },
  sagent: { content: sagentData, tag: 'Mortgage', topic: 'sagent', name: 'Sagent' },
  usaa: { content: usaaData, tag: 'Insurance', topic: 'usaa', name: 'USAA' },
  sabre: { content: sabreData, tag: 'Travel', topic: 'sabre', name: 'Sabre' },
  portfolio: {
    content: portfolioRebuildData,
    tag: 'AI Collaboration',
    topic: 'ai',
    name: 'Portfolio rebuild',
  },
};

/** The client case studies in portfolio order (CLAUDE.md: 01 Upfluent, 02 Sagent, 03 USAA, 04 Sabre). */
export const CLIENT_STUDY_ORDER: StudyId[] = ['upfluent', 'sagent', 'usaa', 'sabre'];
