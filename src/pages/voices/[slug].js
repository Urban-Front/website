import { useState } from 'react';
// The data
import { getArticles, getArticleBySlug } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Voices(context) {
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.article.fields);
  getPreviewData(getArticleBySlug, setData, setPreview);
  return (
    <Layout preview={preview} className="Voices">
      <article className="Container mt4 mb7">
        <section className="Voices__header-image-wrapper">
          <div className="Voices__header-image-wrapper-inner">
            <img src={`${data.image.fields.file.url}?w=2048&fm=jpg&fl=progressive&q=70`} alt={data.image.fields.file.title} className="Voices__header-image db mha" />
          </div>
        </section>
        <section className="Container Container__medium Voices__head pb4">
          <h3 className="Voices__header body-header mt6">{data.title}</h3>
          <div className="Voices__head-inner bt bb pv3 mt5">
            <h5 className="Voices__snippet">{data.snippet}</h5>
            <p className="Voices__author mt3">{data.author}</p>
          </div>
        </section>
        <section className="Container Container__thin Voices__body body-copy mt6">
          {documentToReactComponents(data.post)}
        </section>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const params = context.params;
  const article = await getArticleBySlug(false, params);
  return {
    props: {article}
  }
}

export async function getStaticPaths() {
  const items = await getArticles(false, true);
  return {
    paths: items?.map(item => `/voices/${item.fields.slug}`) ?? [],
    fallback: false
  }
}
