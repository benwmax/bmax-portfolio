import { Tag } from './Tag';

export interface CaseStudyCardProps {
  number: string;
  title: string;
  description: string;
  tag: string;
  href: string;
}

export function CaseStudyCard({ number, title, description, tag, href }: CaseStudyCardProps) {
  return (
    <article data-component="case-study-card">
      <a href={href} data-card="link">
        <span data-card="number">{number}</span>
        <div data-card="content">
          <h3 data-card="title">{title}</h3>
          <p data-card="description">{description}</p>
          <Tag label={tag} />
        </div>
      </a>
    </article>
  );
}
