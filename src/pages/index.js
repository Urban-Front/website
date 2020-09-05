import { useState } from 'react';
// The data
import { getHomeData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
import Notice from 'components/modules/Notice';
import Gallery from 'components/modules/Gallery';
import FeaturedArticles from 'components/modules/FeaturedArticles';
import FeaturedEvent from 'components/modules/FeaturedEvent';

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
      {(data.featuredArticles || data.featuredEvent) && (
        <div className="bt flex justify-between">
          {data.featuredArticles && (
            <FeaturedArticles
              data={data.featuredArticles}
              className={classnames({
                'w-100 pv3 pv5-lg': !data.featuredEvent,
                'w-100 w-60-lg br-lg pv3 pv5-lg': data.featuredEvent
              })}
            />
          )}
          {data.featuredEvent && (
            <FeaturedEvent
              data={data.featuredEvent}
              className={classnames({
                'w-100 pv3 pv5-lg': !data.featuredArticles,
                'w-100 pv3 w-40-lg pv5-lg': data.featuredArticles
              })}
            />
          )}
        </div>
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
