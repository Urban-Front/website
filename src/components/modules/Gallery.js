// React
import React, { useRef, useState } from 'react';
// The modules
import Swiper from 'react-id-swiper';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import classnames from 'classnames';
import Link from 'next/link';

export default function Gallery({
  data,
  className = ''
}) {
  const gallery = useRef(null);
  const [color, setColor] = useState('blue');
  const [swiper, setSwiper] = useState(null);
  const positionClasses = ['top left', 'bottom left', 'top right', 'bottom right', 'center left', 'center right'];
  const params = {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 900,
    loop: true,
    simulateTouch: false,
    initialSlide: Math.floor(Math.random() * data.fields.galleryItems.length),
    autoplay: {
      delay: 10000,
    },
    keyboard: {
      enabled: true
    },
    on: {
      slideChange: function() {
        setColor(this.slides[this.activeIndex].getAttribute('datacolor'));
      }
    },
    preloadImage: true
  };
  return (
    <article className={`Gallery h-100 relative ${className} ${color}`} ref={gallery}>
      <div className="swiper-outer flex">
        <Swiper {...params} getSwiper={setSwiper}>
          {data.fields.galleryItems.map((item, index) => {
            console.log(item);
            const position = positionClasses[index % positionClasses.length];
            console.log(position === 'top right');
            return (
              <div
                key={index}
                datacolor={item.fields.colorPicker[0]}
                className={classnames(`swiper-slide flex ${item.fields.colorPicker[0]}`, {
                  'tl justify-start items-start': position === 'top left',
                  'tl justify-start items-end': position === 'bottom left',
                  'tr items-start justify-end': position === 'top right',
                  'tr justify-end items-end': position === 'bottom right',
                  'tl justify-start items-center': position === 'center left',
                  'tr justify-end items-start': position === 'center right'
                })}
                style={{
                  backgroundImage: `url(${item.fields.image.fields.file.url}?fm=png&q=70)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center'
                }}
              >
                <section className="Gallery__text ma5 mh7-lg mv6-lg">
                  <div className="Gallery__title-wrapper">
                    <h3 className="Gallery__title body-header">
                      {item.fields.title}
                    </h3>
                  </div>
                  <div className="Gallery__description mt3">
                    {documentToReactComponents(item.fields.description)}
                  </div>
                  <Link href={`/services`}>
                    <a title="Services" className="Gallery__cta mt3 dib">See how we can help ›</a>
                  </Link>
                </section>
              </div>
            )
          })}
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>
    </article>
  );
};
