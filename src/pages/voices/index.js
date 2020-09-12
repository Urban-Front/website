import { useState } from 'react';
// The data
import { getArticles } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
import FeaturedArticles from 'components/modules/FeaturedArticles';

export default function Voices(context) {
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.articles);
  getPreviewData(getArticles, setData, setPreview, false);
  console.log(data);
  return (
    <Layout preview={preview}>
      <h1 className="body-header">Voices</h1>
      <FeaturedArticles
        data={data}
        className="w-100"
      />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const articles = await getArticles(false);
  return {
    props: {articles}
  }
}
