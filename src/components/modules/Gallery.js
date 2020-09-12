// React
import React, { useRef, useState } from 'react';
// The modules
import Swiper from 'react-id-swiper';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import classnames from 'classnames';

export default function Gallery({
  data,
  className = ''
}) {
  const buttonPrev = useRef(null);
  const buttonNext = useRef(null);
  const gallery = useRef(null);
  const [color, setColor] = useState('blue');
  const [swiper, setSwiper] = useState(null);
  const positionClasses = ['top left', 'bottom left', 'top right', 'bottom right', 'center left', 'center right'];
  const params = {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 600,
    loop: true,
    simulateTouch: false,
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
  return (
    <article className={`Gallery h75 relative ${className} ${color}`} ref={gallery}>
      <button
        alt="before"
        className="Gallery__arrow Gallery__arrow-prev absolute ml3"
        onClick={goPrev}
      >‹</button>
      <button
        alt="next"
        className="Gallery__arrow Gallery__arrow-next absolute mr3"
        onClick={goNext}
      >›</button>
      <div className="swiper-outer flex">
        <Swiper {...params} getSwiper={setSwiper}>
          {data.fields.galleryItems.map((item, index) => {
            console.log(item);
            const position = positionClasses[index % positionClasses.length];
            return (
              <div
                key={index}
                datacolor={item.fields.colorPicker[0]}
                className={classnames(`swiper-slide flex ${item.fields.colorPicker[0]}`, {
                  'justify-start items-start tl': position === 'top left',
                  'justify-start items-end tl': position === 'bottom left',
                  'justify-end items-start tr': position === 'top right',
                  'justify-end items-end tr': position === 'bottom right',
                  'justify-start items-center tl': position === 'center left',
                  'justify-end items-start tr': position === 'center right'
                })}
              >
                <section className="Gallery__text ma5 ma7-lg">
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
        </Swiper>
      </div>
    </article>
  );
};
