import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="txi-app">
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main className="txi-main">{children}</main>
      </div>
    </div>
  );
}
