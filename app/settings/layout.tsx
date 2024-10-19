export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex flex-col min-h-screen bg-background gap-2 text-primaryText">{children}</main>;
}
