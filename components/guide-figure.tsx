import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

type GuideFigureProps = {
  file: string;
  title: string;
  alt: string;
  caption: string;
};

export function GuideFigure({ file, title, alt, caption }: GuideFigureProps) {
  const src = `./images/${file}`;

  return (
    <figure className="guide-figure">
      <div className="figure-heading">
        <span>REFERÊNCIA VISUAL</span>
        <strong>{title}</strong>
      </div>
      <a
        className="figure-image-link"
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Ampliar imagem: ${title} (abre em nova aba)`}
      >
        <Image
          src={src}
          alt={alt}
          width={884}
          height={864}
          loading="lazy"
          decoding="async"
          unoptimized
        />
      </a>
      <figcaption>
        <p>{caption}</p>
        <a href={src} target="_blank" rel="noreferrer">
          Abrir em tamanho original <ArrowUpRight size={15} aria-hidden="true" />
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </figcaption>
    </figure>
  );
}
