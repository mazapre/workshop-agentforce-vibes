import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agentforce Vibes — Workshop em 13 etapas',
  description:
    'Um roteiro prático em português para construir uma aplicação de gestão de visitantes com Salesforce, Apex, LWC e Agentforce.',
  icons: {
    icon: `${process.env.NODE_ENV === 'production' ? '/workshop-agentforce-vibes' : ''}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
