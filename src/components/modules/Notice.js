import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Notice({
  data,
  className = '',
  showVideo = false
}) {
  return (
    <article className={`Notice tc pv6 flex flex-column justify-center items-center ${className}`}>
      {showVideo && (
        <video className="Notice__video absolute" autoPlay loop muted playsInline poster="images/poster.png">
          <source src="video/sequence.mp4" type="video/mp4" />
        </video>
      )}
      <div className="Container Container__medium tl">
        <h1 className="Notice__header special-header">{data.fields.title}</h1>
      </div>
      <div className="Container Container__medium tl">
        <div className="Notice__description mt3">
          {documentToReactComponents(data.fields.description)}
        </div>
        <div className="Notice__cta mt3">
          <Link href={`/${data.fields.ctaLink}`}>
            <a title={data.fields.ctaText}>{data.fields.ctaText} ›</a>
          </Link>
        </div>
      </div>
    </article>
  );
};
