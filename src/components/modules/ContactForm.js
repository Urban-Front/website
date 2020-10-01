import IcnTwitter from 'svg/icn-twitter';
import IcnInstagram from 'svg/icn-instagram';
import MailchimpSubscribe from "react-mailchimp-subscribe"
const url = "https://gmail.us2.list-manage.com/subscribe/post?u=376067c300d28e94eb89e57e9&amp;id=fe103be3c6";

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
  let email, fname, lname, description;
  const submit = () => {
    if (email && fname && lname && email.value.indexOf('@')) {
      return onValidated({
        EMAIL: email.value,
        FNAME: fname.value,
        LNAME: lname.value,
        MMERGE3: description.value
      });
    } else {
      return false;
    }
  }

  return (
    <div className="SubscribeForm flex flex-column">
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <div className="flex items-center w-100">
        <input
          className="mt3 w-50 dib"
          ref={node => (fname = node)}
          type="text"
          placeholder="First Name"
        />
        <input
          className="mt3 w-50 dib"
          ref={node => (lname = node)}
          type="text"
          placeholder="Last Name"
        />
      </div>
      <input
        className="mt3 w-100"
        ref={node => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <div className="flex flex-column w-100 mt3 tl">
        <p className="body-copy">How can we help you?</p>
        <p className="SubscribeForm__notice mt1">Please do not include confidential or sensitive information in your message. In the event that we are representing a party with opposing interests to your own, we may have a duty to disclose any information you provide to our client.</p>
        <textarea
          rows="5"
          className="SubscribeForm__description mt2 w-100"
          role="textbox"
          ref={node => (description = node)}
          type="text"
        />
      </div>
      <button className="mt3" onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default function ContactForm({className = ''}) {
  return (
    <article className={`ContactForm relative tc mv6 ${className}`}>
      <h3 className="body-header mt3">Contact Us</h3>
      <p className="body-copy mt3 mb3 mb4-lg">Sign up with your email address to receive news and updates.</p>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
          />
        )}
      />
    </article>
  );
};
