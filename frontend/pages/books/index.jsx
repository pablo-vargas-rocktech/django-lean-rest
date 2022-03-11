import { useState, useEffect } from "react";
import Link from "next/link";

import { AiFillDelete } from "react-icons/ai";
import Template from "../../components/template";
import BookForm from "../../components/bookForm";
import Container from "../../components/container";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    title: "",
    description: "",
    pages: 0,
    author: 0,
  });

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    fetch("http://localhost:8000/api/books/")
      .then((res) => {
        res
          .json()
          .then((books) => setBooks(books))
          .catch(() => console.log("Error fetching"));
      })
      .catch(() => console.log("Error fetching"));
  };

  const handlePost = (event) => {
    event.preventDefault();

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    };

    fetch("http://localhost:8000/api/books/", data)
      .then(() => {
        setBook({ title: "", description: "", pages: 0, author: 0 });
        getBooks();
      })
      .catch(() => console.log("Error posting"));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/books/${id}/`, { method: "DELETE" })
      .then(() => getBooks())
      .catch(() => console.log("Error fetching"));
  };

  const handleInput = (fieldName, event) =>
    setBook({ ...book, [fieldName]: event.target.value });

  return (
    <Template>
      <Container>
        <BookForm
          title="Crear un libro"
          onChange={handleInput}
          onSubmit={handlePost}
          book={book}
        />

        <div className="text-center flex justify-center">
          <ul className="flex-grow bg-medium-light text-center max-w-4xl m-5 p-6">
            {books.map((book) => {
              return (
                <li
                  key={book.id}
                  className="flex flex-row justify-between border-2 border-medium-dark p-4 m-2"
                >
                  <Link href={`/books/${book.id}`}>
                    <a>{book.title}</a>
                  </Link>
                  <button onClick={() => handleDelete(book.id)}>
                    <AiFillDelete />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Template>
  );
}
