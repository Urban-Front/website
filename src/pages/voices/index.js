import { useState } from 'react';
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
  getPreviewData(getArticles, setData, setPreview, false);
  return (
    <Layout preview={preview}>
      <article className={`Voices ph3 w-100`}>
        <h3 className="body-header tc mb3 mb6-lg">UF Voices</h3>
        <section className="Voices__container Container flex flex-wrap">
          {data.map((item, index) => {
            return (
              <section key={index} className={classnames("Voices__article flex flex-column flex-row-md justify-between w-100 w-50-lg mv3", {
                'pr3-lg': index % 2 === 0,
                'pl3-lg': index % 2 === 1
              })}>
                {item.fields.image && (
                  <figure className="w-100 w-50-md mb3 mb0-md mr0 mr3-md">
                    <img className="Voices__image" src={`${item.fields.image.fields.file.url}?w=320&fm=jpg&q=70`} />
                  </figure>
                )}
                <div className={classnames('w-100', {
                  'w-50-md': item.fields.image
                })}>
                  <h3 className="Voices__title">{item.fields.title}</h3>
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
