import { useEffect, useState, useRef } from 'react';
// The data
import { getHomeData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
import Swiper from 'react-id-swiper';
import Notice from 'components/modules/Notice';
import Gallery from 'components/modules/Gallery';
import FeaturedArticles from 'components/modules/FeaturedArticles';
import FeaturedEvent from 'components/modules/FeaturedEvent';

export default function Home(context) {
  const [isMobile, setIsMobile] = useState(false);
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.homeData.fields);
  getPreviewData(getHomeData, setData, setPreview);
  const gallery = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const params = {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    speed: 600,
    loop: false,
    keyboard: {
      enabled: true
    }
  };
  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || window.innerWidth < 1024
      || window.innerHeight < 600) {
      setIsMobile(true);
    }
  }, []);
  return (
    <Layout preview={preview} className="Home" headerClassName="absolute">
      {isMobile ? (
        <>
          {data.gallery && (
            <Gallery data={data.gallery} />
          )}
          {data.textCallout && (
            <Notice className="h-100" data={data.textCallout} />
          )}
          {(data.featuredArticles || data.featuredEvent) && (
            <div className="bt h-100 flex flex-column flex-row-lg justify-between">
              {data.featuredArticles && (
                <FeaturedArticles
                  data={data.featuredArticles}
                  className={classnames({
                    'w-100 pv5': !data.featuredEvent,
                    'w-100 w-60-lg br-lg pt5 pb3 pb5-lg': data.featuredEvent
                  })}
                />
              )}
              {data.featuredEvent && (
                <FeaturedEvent
                  data={data.featuredEvent}
                  className={classnames('h-100', {
                    'w-100 pv5': !data.featuredArticles,
                    'w-100 w-40-lg pt3 pb5 pv5-lg': data.featuredArticles
                  })}
                />
              )}
            </div>
          )}
        </>
      ): (
        <Swiper {...params} getSwiper={setSwiper}>
          {data.gallery && (
            <Gallery data={data.gallery} />
          )}
          {data.textCallout && (
            <Notice className="h-100" data={data.textCallout} />
          )}
          {(data.featuredArticles || data.featuredEvent) && (
            <div className="bt h-100 flex flex-column flex-row-lg justify-between">
              {data.featuredArticles && (
                <FeaturedArticles
                  data={data.featuredArticles}
                  className={classnames({
                    'w-100 pv5': !data.featuredEvent,
                    'w-100 w-60-lg br-lg pt5 pb3 pb5-lg': data.featuredEvent
                  })}
                />
              )}
              {data.featuredEvent && (
                <FeaturedEvent
                  data={data.featuredEvent}
                  className={classnames('h-100', {
                    'w-100 pv5': !data.featuredArticles,
                    'w-100 w-40-lg pt3 pb5 pv5-lg': data.featuredArticles
                  })}
                />
              )}
            </div>
          )}
        </Swiper>
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
