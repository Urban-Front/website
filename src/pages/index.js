// The modules
import Layout from 'components/Layout';
import Notice from 'components/modules/Notice';
import Gallery from 'components/modules/Gallery';

export default function Home(context) {
  return (
    <Layout preview={false}>
      <Notice />
      <Gallery />
    </Layout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}
  }
}
