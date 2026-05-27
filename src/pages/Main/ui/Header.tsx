import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-4 bg-background">
      <span>Просмотр книжного плана</span>
      <ThemeToggle />
    </header>
  );
}

export default Header;
