import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function FeaturedArticles({
  data,
  className = ''
}) {
  return (
    <article className={`FeaturedArticles mh3 ${className}`}>
      <h3 className="body-header tc mb3 mb6-lg">UF Voices</h3>
      {data.map((item, index) => {
        return (
          <section className="FeaturedArticle">
            <h3 className="FeaturedArticle__title">{item.fields.title}</h3>
            <p className="FeaturedArticle__snippet mt3">{item.fields.snippet}</p>
            <a href="#" className="dib mt3">Read More →</a>
          </section>
        )
      })}
    </article>
  );
};
