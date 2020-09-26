import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Notice({
  data,
  className = ''
}) {
  return (
    <article className={`Notice tc pv6 flex flex-column justify-center items-center ${className}`}>
      <div className="Container Container__thin">
        <h1 className="Notice__header body-header">{data.fields.title}</h1>
        <div className="Notice__description mt3">
          {documentToReactComponents(data.fields.description)}
        </div>
        <div className="Notice__cta mt3">
          {documentToReactComponents(data.fields.cta)}
        </div>
      </div>
    </article>
  );
};
