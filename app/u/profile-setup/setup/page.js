import ProfileSetupClient from "@/components/ProfileSetupClient";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading profile setup…</div>}>
      <ProfileSetupClient />
    </Suspense>
  );
}
