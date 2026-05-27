import Content from "./ui/Content";
import Header from "./ui/Header";

function Main() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-6xl flex-col px-6 py-8">
      <Header />
      <Content />
    </main>
  );
}

export default Main;
