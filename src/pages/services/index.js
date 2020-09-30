import { useState } from 'react';
// The data
import { getServicesData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
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
  const openDetails = (e, detailName) => {
    e.preventDefault();
    console.log('we should set');
  };
  console.log(data);
  return (
    <Layout preview={preview} className="Services" headerClassName="">
      <article className="Container flex flex-wrap mv6">
        {data.services.map((service, index) => {
          return (
            <section key={index} className="Service w-100 w-50-md w-25-lg">
              <h3 className="body-header Services__name">{service.fields.title}</h3>
              <ul>
                {service.fields.serviceDetails.map((detail, index) => {
                  return (
                    <li key={index} className="Services__type mt3">
                      <a
                        href="#"
                        className="Services__link"
                        onClick={(e) => {
                          openDetails(e, detail.fields.title);
                        }}
                      >{detail.fields.title}</a>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </article>
      {modalOpen && <ScrollLockComponent />}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const servicesData = await getServicesData(false);
  return {
    props: {servicesData}
  }
}
