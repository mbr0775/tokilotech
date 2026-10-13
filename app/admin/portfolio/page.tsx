import AdminWorkspace from "../components/AdminWorkspace";
import ContentManager from "../components/ContentManager";
export default function PortfolioAdminPage() {
  return (
    <AdminWorkspace title="Portfolio projects" active="/admin/portfolio">
      <ContentManager kind="portfolio" />
    </AdminWorkspace>
  );
}
