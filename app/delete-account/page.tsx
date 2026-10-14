import Link from "next/link";
import PublicShell from "../ui/PublicShell";
import PageHero from "../ui/PageHero";
import styles from "../ui/editorial.module.css";

export const metadata = {
  title: "Delete your Tokilo Business Hub account | Tokilo Technologies",
  description: "Request deletion of your Tokilo Business Hub account and associated personal data, including without reinstalling the mobile app.",
  alternates: { canonical: "/delete-account" },
};

const deletionEmail = "mailto:mubassirnasar@gmail.com?subject=Tokilo%20Business%20Hub%20account%20deletion&body=Please%20delete%20my%20Tokilo%20Business%20Hub%20account%20and%20associated%20personal%20data.%0A%0AMy%20registered%20email%20address%3A%20";

export default function DeleteAccountPage() {
  return (
    <PublicShell>
      <PageHero showFilm={false} eyebrow="Tokilo / Your account" title="Account deletion" accent="You stay in control." description="Delete your Tokilo Business Hub account in the app, or request deletion here if you no longer have the app installed." action="See your options" href="#deletion-options" />
      <div className={styles.legal} id="deletion-options">
        <nav className={styles.legalIndex} aria-label="Account deletion options">
          <a href="#in-the-app">In the app</a>
          <a href="#without-the-app">Without the app</a>
          <a href="#what-is-deleted">Your data</a>
        </nav>
        <div className={styles.legalBody}>
          <article id="in-the-app">
            <h2>Delete from the app</h2>
            <p>Open Tokilo Business Hub, sign in, go to Profile and select Delete account. Review the confirmation before continuing. Deletion is permanent. Signing out or uninstalling the app does not delete your account.</p>
          </article>
          <article id="without-the-app">
            <h2>Request deletion without reinstalling</h2>
            <p>Email Tokilo Technologies from the email address registered to your account. State that you want your Tokilo Business Hub account and associated personal data deleted. We verify ownership before processing requests and contact you if further verification is needed.</p>
            <p><a href={deletionEmail}>Email an account deletion request</a></p>
            <p>You can also email <a href="mailto:mubassirnasar@gmail.com">mubassirnasar@gmail.com</a> directly. Do not include your password, verification codes or payment credentials.</p>
          </article>
          <article id="what-is-deleted">
            <h2>What happens to your data</h2>
            <p>Account deletion covers your sign-in account, profile, project requests and associated support conversations, chat attachments, likes, presence, notification receipts and push registration records. You will lose access to the account and its history.</p>
            <p>If a legal obligation requires us to retain a specific record, we explain what is retained and why when processing your request. Contact Tokilo if you need the status of a deletion request or want to discuss data associated with an ongoing business engagement.</p>
            <p><Link href="/privacy-policy">Read the privacy policy</Link></p>
          </article>
        </div>
      </div>
    </PublicShell>
  );
}
