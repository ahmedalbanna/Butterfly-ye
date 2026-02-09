export const metadata = {
  title: 'Butterfly Store API',
  description: 'Backend API for Butterfly Store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
