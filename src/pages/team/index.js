import { useState } from 'react';
// The data
import { getHomeData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';
import ScrollLockComponent from 'components/utils/scrollLockComponent';

export default function Team(context) {
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.homeData.fields);
  getPreviewData(getHomeData, setData, setPreview);
  const openDetails = (e, person) => {
    e.preventDefault();
    setModalOpen(true);
  }
  const closeDetails = () => {
    setModalOpen(false);
  }
  return (
    <Layout preview={preview} className="Team" headerClassName="">
      <article className="Container flex flex-wrap mv6">
        <section className="Person w-100 w-50-md w-third-lg">
          <a
            href="#"
            alt="Person Details"
            className="Person__link db pv3 ph3-md"
            onClick={(e) => {
              openDetails(e, 'Harvey')
            }}>
            <figure className="Person__image"></figure>
            <h3 className="Person__name body-header mt3">Person Name</h3>
            <p className="Person__description mt3">Uneven Geographical Development</p>
          </a>
        </section>
        <section className="Person w-100 w-50-md w-third-lg">
          <a
            href="#"
            alt="Person Details"
            className="Person__link db pv3 ph3-md"
            onClick={(e) => {
              openDetails(e, 'Harvey')
            }}>
            <figure className="Person__image"></figure>
            <h3 className="Person__name body-header mt3">Person Name</h3>
            <p className="Person__description mt3">Uneven Geographical Development</p>
          </a>
        </section>
        <section className="Person w-100 w-50-md w-third-lg">
          <a
            href="#"
            alt="Person Details"
            className="Person__link db pv3 ph3-md"
            onClick={(e) => {
              openDetails(e, 'Harvey')
            }}>
            <figure className="Person__image"></figure>
            <h3 className="Person__name body-header mt3">Person Name</h3>
            <p className="Person__description mt3">Uneven Geographical Development</p>
          </a>
        </section>
        <section className="Person w-100 w-50-md w-third-lg">
          <a
            href="#"
            alt="Person Details"
            className="Person__link db pv3 ph3-md"
            onClick={(e) => {
              openDetails(e, 'Harvey')
            }}>
            <figure className="Person__image"></figure>
            <h3 className="Person__name body-header mt3">Person Name</h3>
            <p className="Person__description mt3">Uneven Geographical Development</p>
          </a>
        </section>
        <section className="Person w-100 w-50-md w-third-lg">
          <a
            href="#"
            alt="Person Details"
            className="Person__link db pv3 ph3-md"
            onClick={(e) => {
              openDetails(e, 'Harvey')
            }}>
            <figure className="Person__image"></figure>
            <h3 className="Person__name body-header mt3">Person Name</h3>
            <p className="Person__description mt3">Uneven Geographical Development</p>
          </a>
        </section>
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
          <h3 className="Person__name body-header">Person Name</h3>
          <p className="Person__description mt3">Unitary Urban Strategy and Tactics</p>
          <p className="Person__sub-description mt3">Urban political ecology, complex urban systems, non-speculative property systems, transdisciplinary coordination, socio-spatial justice, alternative economies</p>
          <p className="Person__paragraph body-copy mt3">Robles-Durán (Mexico / NY, USA) is an Urbanist with expertise in the design and analysis of complex urban systems and urban political-ecology. He is an Associate Professor of Urbanism at The New School / Parsons, New York and co-founder of Cohabitation Strategies, a globally recognized non-profit cooperative for socio-spatial development. He also was co-founder and co-director with David Harvey of the National Center for the Right to the Territory (CENEDET) in Ecuador. Robles-Duran is a current fellow at the Center for Urban Research on Austerity in Leicester, UK. His work has been exhibited in numerous venues around the world, including the Venice Biennale of Architecture, the Istanbul Design Biennial, the Shenzhen Biennial, and the MoMA in NYC.</p>
        </div>
      </article>
      {modalOpen && <ScrollLockComponent />}
    </Layout>
  )
}

export async function getStaticProps(context) {
  const homeData = await getHomeData(false);
  return {
    props: {homeData}
  }
}
