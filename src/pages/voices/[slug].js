import { useState } from 'react';
// The data
import { getArticles, getArticleBySlug } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';

export default function Voices(context) {
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.article.fields);
  getPreviewData(getArticleBySlug, setData, setPreview);
  console.log(data);
  return (
    <Layout preview={preview}>
      <article className="Container Container__thin">
        <h3 className="body-header">{data.title}</h3>
      </article>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const params = context.params;
  const article = await getArticleBySlug(params);
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
