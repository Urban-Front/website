import IcnTwitter from 'svg/icn-twitter';
import IcnInstagram from 'svg/icn-instagram';
import MailchimpSubscribe from "react-mailchimp-subscribe"
const url = "https://gmail.us2.list-manage.com/subscribe/post?u=376067c300d28e94eb89e57e9&amp;id=fe103be3c6";

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
  let email, name, untitled;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value,
      UNTITLED: untitled.value
    });

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
      <input
        className="mt3 w-100"
        ref={node => (name = node)}
        type="text"
        placeholder="Your name"
      />
      <input
        className="mt3 w-100"
        ref={node => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <input
        className="mt3 w-100"
        ref={node => (untitled = node)}
        type="text"
      />
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
