// The modules
import Layout from 'components/Layout';
import Notice from 'components/modules/Notice';
import Gallery from 'components/modules/Gallery';

export default function Home(context) {
  return (
    <Layout preview={false}>
      <Notice />
      <Gallery />
      <Notice data={{header: 'text callout'}} />
    </Layout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}
  }
}
