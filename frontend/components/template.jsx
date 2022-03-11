import Head from "next/head";
import Link from "next/link";
import { BiLibrary } from "react-icons/bi";
import { BsBook, BsPersonLinesFill } from "react-icons/bs";

export default function template({ children }) {
  return (
      <>
      <Head>
        <title>REST Front</title>
        <meta name="description" content="Front end for backend wit django" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex flex-column items-center justify-center bg-dark">
        <Link href="/">
          <a>
              <h1 className="flex flex-column items-center p-3 text-white hover:text-medium-light">
              <BiLibrary className="mr-2" />
              Library
            </h1>
          </a>
        </Link>

        <Link href="/authors">
          <a>
            <h3 className="flex flex-column items-center p-3 text-white hover:text-medium-light">
              <BsBook className="mr-2" />
              Authors
            </h3>
          </a>
        </Link>

        <Link href="/books">
          <a>
            <h3 className="flex flex-column items-center p-3 text-white hover:text-medium-light">
              <BsPersonLinesFill className="mr-2" />
              Books
            </h3>
          </a>
        </Link>
      </header>

      <main className="p-4">{children}</main>
    </>
  );
}
