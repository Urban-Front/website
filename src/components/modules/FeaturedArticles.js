import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import classnames from 'classnames';

export default function FeaturedArticles({
  data,
  className = ''
}) {
  return (
    <article className={`FeaturedArticles ph3 ${className}`}>
      <h3 className="body-header tc mb3 mb6-lg">UF Voices</h3>
      {data.map((item, index) => {
        return (
          <section key={index} className="FeaturedArticle flex flex-column flex-row-md justify-between">
            {item.fields.image && (
              <figure className="w-100 w-25-md mb3 mb0-md mr0 mr3-md">
                <img src={`${item.fields.image.fields.file.url}?fm=jpg&q=70`} />
              </figure>
            )}
            <div className={classnames('w-100', {
              'w-75-md': item.fields.image
            })}>
              <h3 className="FeaturedArticle__title">{item.fields.title}</h3>
              <p className="FeaturedArticle__snippet mt3">{item.fields.snippet}</p>
              <a href="#" className="dib mt3">Read More →</a>
            </div>
          </section>
        )
      })}
    </article>
  );
};
