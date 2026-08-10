"use client";

import { useState } from "react";
import { RequestAccessModal } from "./RequestAccessModal";

export function AccessRestrictedCard({
  onRequestAccess,
}: {
  onRequestAccess?: () => void;
}) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h3>Access Restricted</h3>
      <p>You need to request access to view this course.</p>
      <button onClick={onRequestAccess}>Request Access</button>
    </div>
  );
}

export default function CourseAccessPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AccessRestrictedCard onRequestAccess={() => setIsModalOpen(true)} />

      <RequestAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseTitle="ISTAD Web Development Bootcamp"
      />
    </>
  );
}