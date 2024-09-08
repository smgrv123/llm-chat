export default function Navbar({ userName }: { userName: string }) {
  return (
    <nav className="w-full flex flex-row py-5 px-10 bg-background text-primaryText justify-between">
      <div>gpt</div>
      <div>{userName}</div>
    </nav>
  );
}
