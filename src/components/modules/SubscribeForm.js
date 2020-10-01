import MailchimpSubscribe from "react-mailchimp-subscribe"
const url = "https://gmail.us2.list-manage.com/subscribe/post?u=376067c300d28e94eb89e57e9&amp;id=fe103be3c6";

export default function SubscribeForm({className = ''}) {
  return (
    <article className={`SubscribeForm relative ${className}`}>
      <section className="Container tc pv6 flex flex-column justify-center items-center">
        <h3 className="body-header">Subscribe</h3>
        <p className="body-copy mt3 mb3 mb4-lg">Sign up with your email address to receive news and updates.</p>
        <MailchimpSubscribe url={url}/>
        <p className="body-copy SubscribeForm__notice mt3 mt4-lg">We respect your privacy and will not share this information. You are free to unsubscribe at any time.</p>
      </section>
      <section className="SubscribeForm__license flex flex-column items-start mt7">
        <a className="SubscribeForm__license-link" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">
          <img src="images/cc.png"></img>
        </a>
        <p className="SubscribeForm__license-text body-copy">Urban Front 2020. All the work of Urban Front is licensed under a <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License.</a></p>
      </section>
    </article>
  );
};
