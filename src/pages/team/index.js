import { useState } from 'react';
// The data
import { getTeamData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
import ScrollLockComponent from 'components/utils/scrollLockComponent';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Team(context) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    name: '',
    tagline: '',
    subTagline: '',
    description: null
  });
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.teamData.fields);
  getPreviewData(getTeamData, setData, setPreview);
  const openDetails = (e, person) => {
    e.preventDefault();
    let info = data.teamMembers.filter(item => item.fields.name === person);
    const infoObj = {
      name: info[0].fields.name,
      tagline: info[0].fields.tagline,
      subTagline: info[0].fields.subTagline,
      description: info[0].fields.description
    };
    setModalInfo(infoObj);
    setModalOpen(true);
  }
  const closeDetails = () => {
    setModalOpen(false);
  }
  console.log(data);
  return (
    <Layout preview={preview} className="Team" headerClassName="">
      <article className="Container flex flex-wrap mv6">
        {data.teamMembers.map((item, index) => {
          return (
            <section key={index} className="Person w-100 w-50-md w-third-lg">
              <a
                href="#"
                alt="Person Details"
                className="Person__link db pv3 ph3-md"
                onClick={(e) => {
                  openDetails(e, item.fields.name);
                }}>
                <figure className="Person__image">
                  <img src={`${item.fields.image.fields.file.url}?fm=jpg&q=70`} />
                </figure>
                <h3 className="Person__name body-header mt3">{item.fields.name}</h3>
                <p className="Person__description mt3">{item.fields.tagline}</p>
              </a>
            </section>
          )
        })}
      </article>
      <button className={classnames("Person__overlay fixed w-100 h-100", {
        open: modalOpen
      })} onClick={closeDetails}></button>
      <article className={classnames("Person__details fixed w-100 w-50-lg h-100", {
        open: modalOpen
      })}>
        <div className="Person__details-inner w-100 pa3 pt6 pa6-lg">
          <button className="Person__details-close" onClick={closeDetails}>
            <span className="left"></span>
            <span className="right"></span>
          </button>
          <h3 className="Person__name body-header">{modalInfo.name}</h3>
          <p className="Person__description mt3">{modalInfo.tagline}</p>
          <p className="Person__sub-description mt3">{modalInfo.subTagline}</p>
          {modalInfo.description && (
            <div className="Person__paragraph body-copy mt3">
              {documentToReactComponents(modalInfo.description)}
            </div>
          )}
        </div>
      </article>
      {modalOpen && <ScrollLockComponent />}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const teamData = await getTeamData(false);
  return {
    props: {teamData}
  }
}
