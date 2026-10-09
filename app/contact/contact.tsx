"use client";

import { type FormEvent } from "react";
import { Mail, Phone, ArrowRight, Code2, Smartphone, BrainCircuit, Cloud } from "lucide-react";
import styles from "../design.module.css";

const services = [
  { icon: Code2, title: "Web Applications" },
  { icon: Smartphone, title: "Mobile Applications" },
  { icon: BrainCircuit, title: "AI Solutions" },
  { icon: Cloud, title: "Cloud Systems" },
];

export default function Contact() {
  function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Project inquiry: ${data.get("service")}`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\n${data.get("message")}`;
    window.location.href = `mailto:mubassirnasar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className={`${styles.section} ${styles.surface}`}>
      <div className={`${styles.container} ${styles.contactGrid}`}>
        <div>
          <span className={styles.eyebrow}>Contact Tokilo</span>
          <h2 id="contact-heading" className={styles.heading}>Let&apos;s build something <span>amazing together</span></h2>
          <p className={styles.intro}>Have an idea, product requirement, or digital challenge? Our team is ready to help you create the right solution.</p>
          <div className={styles.contactInfo}>
            <h3>Talk with us</h3><p>Discuss your software, AI, or digital transformation project.</p>
            <div className={styles.contactDetails}>
              <a href="tel:+94705373833"><Phone size={17} aria-hidden="true" /><span>+94 705373833</span></a>
              <a href="mailto:mubassirnasar@gmail.com"><Mail size={17} aria-hidden="true" /><span>mubassirnasar@gmail.com</span></a>
            </div>
            <h4 className={styles.buildLabel}>We build</h4>
            <div className={styles.buildServices}>{services.map((service) => { const Icon = service.icon; return <span key={service.title}><Icon size={15} aria-hidden="true" />{service.title}</span>; })}</div>
          </div>
        </div>
        <form className={styles.form} onSubmit={sendInquiry}>
          <h3>Start your project</h3><p>Tell us about your requirements.</p>
          <div className={styles.fields}>
            <label className={styles.field} htmlFor="contact-name">Your name *<input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required /></label>
            <label className={styles.field} htmlFor="contact-email">Email address *<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Email address" required /></label>
            <label className={styles.field} htmlFor="contact-service">Select service *<select id="contact-service" name="service" defaultValue="" required><option value="" disabled>Select service</option><option>Web Application</option><option>Mobile Application</option><option>AI Solution</option><option>Cloud System</option></select></label>
            <label className={styles.field} htmlFor="contact-message">Tell us about your project *<textarea id="contact-message" name="message" placeholder="Tell us about your project" rows={4} required /></label>
          </div>
          <button type="submit" className={styles.submit}>Send inquiry<ArrowRight size={17} aria-hidden="true" /></button>
          <p>Your email app will open with your inquiry ready to send.</p>
        </form>
      </div>
    </section>
  );
}
