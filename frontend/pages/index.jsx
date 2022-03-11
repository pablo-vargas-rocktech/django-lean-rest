import Link from "next/link";
import Template from "../components/template";

export default function Home() {
  return (
    <Template>
      <div className="flex flex-row justify-evenly items-center">
        <Link href="/books">
          <a className="underline p-4 bg-medium-dark text-light w-1/4 text-center">
            Books
          </a>
        </Link>
        <Link href="/authors">
          <a className="underline p-4 bg-medium-dark text-light w-1/4 text-center">
            Authors
          </a>
        </Link>
      </div>

      <div className="flex flex-row items-center justify-center p-10">
        <img className="w-1/2" src="/images/library.jpeg" alt="Library" />
      </div>
    </Template>
  );
}
