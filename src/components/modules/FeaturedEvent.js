import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function FeaturedEvent({
  data,
  className = ''
}) {
  return (
    <article className={`FeaturedEvents ph3 tc ${className}`}>
      <h3 className="body-header">Upcoming Events</h3>
      <img className="db mt3 mt6-lg mt6 mha" src={`${data.fields.poster.fields.file.url}?fm=png&q=70`} />
    </article>
  );
};
