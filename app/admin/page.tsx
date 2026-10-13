import Link from "next/link";
import { FolderOpen, Package, PanelsTopLeft } from "lucide-react";
import AdminWorkspace from "./components/AdminWorkspace";
import styles from "./workspace.module.css";

export default function AdminPage() {
  return (
    <AdminWorkspace title="One workspace. Connected content.">
      <p className={styles.intro}>
        Manage the existing content shared by your website and mobile
        application.
      </p>
      <div className={styles.overview}>
        {[
          {
            href: "/admin/projects",
            title: "Website showcase",
            description:
              "Choose which projects appear on the website and mobile showcase. Manage cover images, gallery, order and publishing.",
            icon: PanelsTopLeft,
          },
          {
            href: "/admin/portfolio",
            title: "Portfolio projects",
            description:
              "Create and update project descriptions, categories, client names, technologies and status. Link them to showcase entries.",
            icon: FolderOpen,
          },
          {
            href: "/admin/products",
            title: "Products",
            description:
              "Add products with their brand, category, display price, cover image, availability and publishing status.",
            icon: Package,
          },
        ].map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href}>
            <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
            <h2>{title}</h2>
            <p>{description}</p>
            <span>Manage content</span>
          </Link>
        ))}
      </div>
    </AdminWorkspace>
  );
}
