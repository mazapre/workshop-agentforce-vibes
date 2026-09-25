import { ArrowUpRight } from 'lucide-react';

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
        {/* Static PNGs on GitHub Pages need no client-side image component or optimizer. */}
        {/* oxlint-disable-next-line nextjs/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={884}
          height={864}
          loading="lazy"
          decoding="async"
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
