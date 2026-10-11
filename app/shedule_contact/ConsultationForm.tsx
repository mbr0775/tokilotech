"use client";
import { useState, type FormEvent } from "react";
import { Mail, Phone, Send } from "lucide-react";
import ui from "../design.module.css";
import styles from "../ui/editorial.module.css";

export default function ConsultationForm() {
  const [draftOpened, setDraftOpened] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const labels = [
      "name",
      "email",
      "phone",
      "company",
      "service",
      "date",
      "time",
      "message",
    ];
    const body = labels
      .map(
        (key) =>
          `${key.charAt(0).toUpperCase() + key.slice(1)}: ${form.get(key) || "Not specified"}`,
      )
      .join("\n");
    window.location.href = `mailto:mubassirnasar@gmail.com?subject=${encodeURIComponent(`Consultation request: ${form.get("service")}`)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }
  return (
    <section className={styles.section}>
      <div className={styles.split}>
        <div className={styles.aside}>
          <span className={ui.eyebrow}>A good conversation comes first</span>
          <h2>
            Tell us what
            <br />
            you have in mind.
          </h2>
          <p>
            Share your idea, the problem you want to solve, or the product you
            want to improve. We will use those details to discuss scope,
            approach, and the next steps.
          </p>
          <div className={styles.contactLinks}>
            <a href="mailto:mubassirnasar@gmail.com">
              <Mail size={18} />
              mubassirnasar@gmail.com
            </a>
            <a href="tel:+94705373833">
              <Phone size={18} />
              +94 705373833
            </a>
          </div>
          <ol className={styles.steps}>
            <li>
              <span>01</span>Share your goals and requirements
            </li>
            <li>
              <span>02</span>Discuss the scope and approach
            </li>
            <li>
              <span>03</span>Agree on the next steps together
            </li>
          </ol>
        </div>
        <form onSubmit={submit} className={styles.formPanel}>
          <h2>Request a consultation</h2>
          <p>
            Your email app opens with these details ready to send. A preferred
            time is a request; we will confirm availability with you.
          </p>
          <div className={styles.formGrid}>
            <label className={ui.field}>
              Your name *
              <input
                name="name"
                autoComplete="name"
                required
                placeholder="Full name"
              />
            </label>
            <label className={ui.field}>
              Email address *
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label className={ui.field}>
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Your phone number"
              />
            </label>
            <label className={ui.field}>
              Company
              <input
                name="company"
                autoComplete="organization"
                placeholder="Company or brand"
              />
            </label>
            <label className={`${ui.field} ${styles.full}`}>
              What can we help with? *
              <select name="service" defaultValue="" required>
                <option value="" disabled>
                  Select a service
                </option>
                <option>Web application development</option>
                <option>Mobile app development</option>
                <option>Backend & cloud systems</option>
                <option>AI & automation</option>
                <option>Product design</option>
                <option>Other / Discuss my idea</option>
              </select>
            </label>
            <label className={ui.field}>
              Preferred date
              <input name="date" type="date" />
            </label>
            <label className={ui.field}>
              Preferred time (Sri Lanka time)
              <input name="time" type="time" />
            </label>
            <label className={`${ui.field} ${styles.full}`}>
              Your project *
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Your idea, goals, requirements, and any timeline you have in mind."
              />
            </label>
          </div>
          <button type="submit" className={ui.submit}>
            <Send size={17} />
            Prepare consultation email
          </button>
          {draftOpened && (
            <p role="status" className={styles.message}>
              Your email draft is ready in your email app. Send it there to
              share your request. You can also email us directly using the
              address above.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
