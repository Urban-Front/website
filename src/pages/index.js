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
import Contact from 'components/modules/Contact';
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
    speed: 900,
    loop: false,
    simulateTouch: false,
    keyboard: {
      enabled: true
    }
  };
  useEffect(() => {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || window.innerWidth < 1024
      || window.innerHeight < 576) {
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
          {data.notices.map((item, index) => {
            return (
              <Notice key={index} className="h-100" data={item} />
            )
          })}
          <Contact className="h-100" />
        </>
      ): (
        <Swiper {...params} getSwiper={setSwiper}>
          {data.gallery && (
            <Gallery data={data.gallery} />
          )}
          {data.notices.map((item, index) => {
            return (
              <Notice key={index} className="h-100 swiper-notice" data={item} />
            )
          })}
          <Contact className="h-100" />
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
