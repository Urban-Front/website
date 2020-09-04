import { useState } from 'react';
// The data
import { getHomeData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import Layout from 'components/Layout';
import Notice from 'components/modules/Notice';
import Gallery from 'components/modules/Gallery';

export default function Home(context) {
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.homeData.fields);
  getPreviewData(getHomeData, setData, setPreview);
  return (
    <Layout preview={preview}>
      {data.notice && (
        <Notice data={data.notice} />
      )}
      {data.gallery && (
        <Gallery data={data.gallery} />
      )}
      {data.textCallout && (
        <Notice data={data.textCallout} />
      )}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const homeData = await getHomeData(false);
  return {
    props: {homeData}
  }
}
