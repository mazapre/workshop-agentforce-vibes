'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function CopyPrompt({ text, number }: { text: string; number: number }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }
  return (
    <div className="prompt">
      <div className="prompt-bar">
        <span>
          <span className="prompt-dot" /> PROMPT · ETAPA{' '}
          {String(number).padStart(2, '0')}
        </span>
        <Button
          variant="ghost"
          onClick={copy}
          aria-label={`Copiar prompt da etapa ${number}`}
          className="copy-button"
        >
          {status === 'copied' ? <Check /> : <Copy />}
          {status === 'copied' ? 'Copiado' : 'Copiar prompt'}
        </Button>
      </div>
      <pre>{text}</pre>
      <span className="copy-status" aria-live="polite">
        {status === 'error'
          ? 'Não foi possível copiar. Selecione o texto do prompt e copie manualmente.'
          : status === 'copied'
            ? 'Prompt copiado para a área de transferência.'
            : ''}
      </span>
    </div>
  );
}
