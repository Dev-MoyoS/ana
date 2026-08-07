import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { WorldShell } from "@/components/shared/WorldShell";

export const metadata = {
  title: "Admin — The World of Analufuno Mudau",
};

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <WorldShell
      eyebrow="Admin"
      title="A quiet control room behind the magic."
      subtitle="Secure dashboard for managing content and experiences."
    >
      <AdminDashboard />
    </WorldShell>
  );
}

