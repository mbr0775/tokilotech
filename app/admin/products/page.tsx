import AdminWorkspace from "../components/AdminWorkspace";
import ContentManager from "../components/ContentManager";
export default function ProductsAdminPage() {
  return (
    <AdminWorkspace title="Products" active="/admin/products">
      <ContentManager kind="products" />
    </AdminWorkspace>
  );
}
