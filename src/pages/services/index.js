import { useState } from 'react';
// The data
import { getServicesData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
import SubscribeForm from 'components/modules/SubscribeForm';
import ScrollLockComponent from 'components/utils/scrollLockComponent';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function About(context) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    photo: null,
    description: null
  });
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.servicesData.fields);
  getPreviewData(getServicesData, setData, setPreview);
  const openDetails = (e, detail) => {
    e.preventDefault();
    setModalInfo({
      title: detail.title,
      photo: detail.photo,
      description: detail.description
    });
    setModalOpen(true);
  };
  const closeDetails = () => {
    setModalOpen(false);
  };
  return (
    <Layout preview={preview} className="Services" headerClassName="">
      <article className="mv6 Services__introduction pv3 pv6-lg w-100 w-70-lg">
        <h3 className="body-header special-header mb4">What we do</h3>
        {documentToReactComponents(data.introduction)}
      </article>
      <article className="Container flex flex-wrap mv6">
        {data.services.map((service, index) => {
          return (
            <section key={index} className="Service w-100 w-50-md w-25-lg">
              <div className={classnames("Service__inner mb3", {
                'mh3-lg': index > 0 && index < 3,
                'mr3-lg': index === 0,
                'ml3-lg': index === 3,
                'mt3 mt0-lg': index !== 0
              })}>
                <h3 className="body-header Services__name">{service.fields.title}</h3>
                <ul>
                  {service.fields.serviceDetails.map((detail, index) => {
                    return (
                      <li key={index} className="Services__type mt3">
                        <a
                          href="#"
                          className="Services__link"
                          onClick={(e) => {
                            openDetails(e, detail.fields);
                          }}
                        >{detail.fields.title}</a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          )
        })}
      </article>
      <button className={classnames("Service__overlay fixed w-100 h-100", {
        open: modalOpen
      })} onClick={closeDetails}></button>
      <article className={classnames("Service__details fixed w-100 w-75-lg h-100", {
        open: modalOpen
      })}>
        <div className="Service__details-inner w-100 ph3 pv6 ph4-md ph6-lg">
          <button className="Service__details-close" onClick={closeDetails}>
            <span className="left"></span>
            <span className="right"></span>
          </button>
          <h3 className="Service__name body-header relative">
            <span className="Service__name-inner">{modalInfo.title}</span>
            {modalInfo.photo && (
              <img
                src={`${modalInfo.photo.fields.file.url}?fm=jpg&q=70`}
                className="Service__photo absolute" />
            )}
          </h3>
          {modalInfo.description && (
            <div className="Person__paragraph body-copy mt3">
              {documentToReactComponents(modalInfo.description)}
            </div>
          )}
        </div>
      </article>
      {modalOpen && <ScrollLockComponent />}
      <SubscribeForm className="SubscribeForm--general" />
    </Layout>
  )
}

export async function getStaticProps(context) {
  const servicesData = await getServicesData(false);
  return {
    props: {servicesData}
  }
}
