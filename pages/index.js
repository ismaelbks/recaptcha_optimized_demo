import { useState } from "react";
import dynamic from "next/dynamic";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));

export default function Home() {
  const initialFormContent = {
    firstName: "",
    email: "",
    captcha: ""
  }
  const [formContent, setFormContent] = useState(initialFormContent);
  const [recaptchaNeeded, setRecaptchaNeeded] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const inputName = target.name;
    const authorizedField = Object.keys(initialFormContent);

    if (!authorizedField.includes(inputName)) {
      return;
    }

    const value = target.value;
    setFormContent({ ...formContent, [inputName]: value });
    setRecaptchaNeeded(true);
  };

  const recaptchaPublicKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return;
    }

    setFormContent({ ...formContent, captcha: captchaCode });
  };

  return (
    <main className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="max-w-5xl bg-slate-300 border border-slate-500 rounded-md p-8">
        <h1 className="text-4xl font-bold text-center">
          Optimizing ReCaptcha
          <br />
          <span className="text-indigo-600">with NextJs</span>
        </h1>

        
        <form className="flex flex-col gap-y-4 mt-6">
          <input
            id="firstName"
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formContent.firstName}
            placeholder="Fistname"
            required={true}
            className="bg-white rounded-md border border-slate-600 h-10 px-2"
          />
          <input
            id="email"
            type="text"
            name="email"
            onChange={handleChange}
            value={formContent.email}
            placeholder="Email"
            required={true}
            className="bg-white rounded-md border border-slate-600 h-10 px-2"
          />

          <div className="flex justify-center">
            {recaptchaNeeded && <ReCAPTCHA
              sitekey={recaptchaPublicKey}
              onChange={onReCAPTCHAChange}
              theme="dark"
            />}
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-2 bg-slate-800 text-white rounded-md duration-200 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={formContent.captcha === ""}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  )
}
