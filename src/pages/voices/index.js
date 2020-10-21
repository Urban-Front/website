import { useState, useEffect } from 'react';
// The data
import { getArticles } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Link from 'next/link';
import Layout from 'components/Layout';
import FeaturedArticles from 'components/modules/FeaturedArticles';

export default function Voices(context) {
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.articles);
  const [articleTypes, setArticleTypes] = useState([]);
  getPreviewData(getArticles, setData, setPreview, false);
  useEffect(() => {
    let allArticleTypes = [];
    data.forEach(item => {
      if (allArticleTypes.indexOf(item.fields.type[0]) === -1) {
        allArticleTypes.push(item.fields.type[0]);
      }
    });
    setArticleTypes([...new Set(allArticleTypes)]);
  }, []);
  return (
    <Layout preview={preview}>
      <article className={`Voices ph3 w-100`}>
        <h3 className="body-header tc mb3 mb6-lg">UF Voices</h3>
        <section className="Voices__container Container Container__medium flex mv3 mv4-lg">
          <ul className="Voices__filters flex justify-between">
            <li className="Voices__filter Voices__filter-header dib">Filter:</li>
            {articleTypes.map((item, index) => {
              return (
                <li className="Voices__filter Voices__filter-button dib" key={index}><button>{item}</button></li>
              )
            })}
          </ul>
        </section>
        <section className="Voices__container Container Container__medium flex flex-wrap mb6-lg">
          {data.map((item, index) => {
            return (
              <section key={index} className="Voices__article flex flex-column flex-row-md justify-between w-100 mv3">
                {item.fields.image && (
                  <figure className="w-100 w-50-md mb3 mb0-md mr0 mr3-md">
                    <img className="Voices__image" src={`${item.fields.image.fields.file.url}?w=320&fm=jpg&q=70`} />
                  </figure>
                )}
                <div className={classnames('w-100', {
                  'w-50-md': item.fields.image
                })}>
                  <h5 className="Voices__type">{item.fields.type[0]}</h5>
                  <h3 className="Voices__title">{item.fields.title}</h3>
                  {item.fields.tags && (
                    <ul className="Voices__tags">
                      {item.fields.tags.map((item, index) => {
                        return (<li className="Voices__tag dib mr1" key={index}>{item}</li>)
                        })}
                    </ul>
                  )}
                  <p className="Voices__snippet mt3 body-copy">{item.fields.snippet}</p>
                  <Link as={`/voices/${item.fields.slug}`} href="/voices/[slug]">
                    <a className="dib mt3">Read More →</a>
                  </Link>
                </div>
              </section>
            )
          })}
        </section>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const articles = await getArticles(false);
  return {
    props: {articles}
  }
}
