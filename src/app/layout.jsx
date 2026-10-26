import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { LayoutShell } from '@/components/LayoutShell';

export const metadata = {
  title: 'Abdul Hadi Awais | Principal Full-Stack Engineer & AI Systems Architect',
  description: 'Enterprise portfolio of Abdul Hadi Awais. Specializing in low-latency distributed microservices, autonomous generative AI agents, and high-concurrency cloud systems.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-burgundy text-warmwhite antialiased min-h-screen relative selection:bg-rosegold selection:text-burgundy">
        <ToastProvider>
          <div className="ambient-pattern"></div>
          <LayoutShell>{children}</LayoutShell>
        </ToastProvider>
      </body>
    </html>
  );
}
