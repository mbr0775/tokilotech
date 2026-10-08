import ShowcaseEditor from "../../components/ShowcaseEditor";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ShowcaseEditor key={id} projectId={id} />;
}
