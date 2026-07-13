import { createPageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return createPageMetadata({
    title: 'Contact Us — Paragon AI',
    description: 'Get in touch with the Paragon AI team.',
    path: '/contact-us',
  });
}

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
