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
            <p className="Person__description mt3">Ut rhoncus magna vel vestibulum efficitur</p>
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
            <p className="Person__description mt3">Ut rhoncus magna vel vestibulum efficitur</p>
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
            <p className="Person__description mt3">Ut rhoncus magna vel vestibulum efficitur</p>
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
            <p className="Person__description mt3">Ut rhoncus magna vel vestibulum efficitur</p>
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
            <p className="Person__description mt3">Ut rhoncus magna vel vestibulum efficitur</p>
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
          <p className="Person__description mt3">Ut rhoncus magna vel vestibulum efficitur.</p>
          <p className="Person__sub-description mt3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed malesuada nulla. Cras mollis orci dolor, facilisis elementum eros sagittis at.</p>
          <p className="Person__paragraph body-copy mt3">Maecenas eu nisi nec diam vestibulum cursus. Nullam tempus ac eros a scelerisque. Cras vitae neque in erat feugiat molestie eget sit amet elit. Pellentesque nunc odio, laoreet in arcu quis, ullamcorper pharetra velit. Duis fermentum, ligula non pellentesque convallis, sapien ligula sagittis sem, sed laoreet dolor sapien et tellus. Praesent ac lacus ultricies nulla tincidunt molestie sed luctus erat. Cras eget pretium dolor, id ullamcorper augue. Aenean a sollicitudin libero, eget ultricies libero. Mauris condimentum tortor lacus, a molestie lacus malesuada eget. Ut at lectus sapien. Phasellus sed fermentum elit, ut tempor nibh. Suspendisse ornare ut ex id lobortis. Phasellus sit amet mattis nulla. Morbi egestas velit nisi, sed fermentum massa mattis in. In id enim in nisl volutpat molestie a id lorem.</p>
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
