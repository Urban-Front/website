// React
import React, { useRef, useState } from 'react';
// The modules
import Swiper from 'react-id-swiper';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Gallery({
  data,
  className = ''
}) {
  const buttonPrev = useRef(null);
  const buttonNext = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const params = {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,
    loop: true,
    simulateTouch: false,
    keyboard: {
      enabled: true
    },
    preloadImage: true
  };
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  }
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  }
  console.log(data);
  return (
    <article className={`Gallery h75 flex justify-center items-center ${className}`}>
      <div className="swiper-outer flex">
        <Swiper {...params} getSwiper={setSwiper}></Swiper>
          {data.fields.galleryItems.map((item, index) => {
            return (
              <div key={index} className="swiper-slide flex justify-end items-center">
                <section className="Gallery__text tr mh3">
                  <h3 className="Gallery__title body-header">
                    {item.fields.title}
                  </h3>
                  <div className="Gallery__description mt3">
                    {documentToReactComponents(item.fields.description)}
                  </div>
                  <div className="Gallery__cta mt3">
                    {documentToReactComponents(item.fields.cta)}
                  </div>
                </section>
                <img
                  className="Gallery__image absolute"
                  src={`${item.fields.image.fields.file.url}?fm=png&q=70`}
                />
              </div>
            )
          })}
      </div>
    </article>
  );
};
