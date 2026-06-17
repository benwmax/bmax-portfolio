export interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return <span data-component="tag">{label}</span>;
}
