'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { tokenStore } from '@/lib/api';
import { ProjectForm } from '@/components/admin/project-form';

export default function NewProjectPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => { if (!tokenStore.get()) router.push('/admin/login'); else setReady(true); }, [router]);
  if (!ready) return null;
  return <ProjectForm />;
}