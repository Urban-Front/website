import { useState } from 'react';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Notice({
  data,
  className = ''
}) {
  const [isVideo, setIsVideo] = useState(data.fields.backgroundMedia && data.fields.backgroundMedia.fields.file.contentType === 'video/mp4');
  return (
    <article
      className={`Notice relative tc pv6 flex flex-column justify-center items-center ${className}`}
      style={{
        backgroundImage: !isVideo ? `url(${data.fields.backgroundMedia.fields.file.url}?w=1600&fm=jpg&fl=progressive&q=70)`: 'none'
      }}
    >
      {isVideo && (
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
