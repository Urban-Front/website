import { useState } from 'react';
// The data
import { getServicesData } from 'lib/api';
import getPreviewData from 'lib/preview';
// The modules
import classnames from 'classnames';
import Layout from 'components/Layout';

export default function About(context) {
  const [preview, setPreview] = useState(false);
  const [data, setData] = useState(context.servicesData.fields);
  getPreviewData(getServicesData, setData, setPreview);
  console.log(data);
  return (
    <Layout preview={preview}>
      <h1 className="body-header">About</h1>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const servicesData = await getServicesData(false);
  return {
    props: {servicesData}
  }
}
