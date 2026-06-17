import { useState } from 'react';

export type ChatStatus = 'idle' | 'loading' | 'error';

export interface ChatInputProps {
  placeholder?: string;
  onSubmit: (value: string) => void;
  statusText?: string;
  status?: ChatStatus;
}

export function ChatInput({
  placeholder = 'Ask about my work…',
  onSubmit,
  statusText,
  status = 'idle',
}: ChatInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue('');
  }

  return (
    <div data-component="chat-input" data-status={status}>
      <form onSubmit={handleSubmit} data-chat="form">
        <span aria-hidden="true" data-chat="prompt">›</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={status === 'loading'}
          aria-label="Ask a question"
          data-chat="input"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !value.trim()}
          data-chat="submit"
        >
          ASK
        </button>
      </form>
      {statusText && (
        <p role="status" data-chat="status-text">
          {statusText}
        </p>
      )}
    </div>
  );
}
