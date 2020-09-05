import { PageTransition } from 'next-page-transitions';
import 'styles/App.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps} />
      </PageTransition>
    </>
  )
}
