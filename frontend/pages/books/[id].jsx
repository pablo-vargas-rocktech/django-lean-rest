import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BookForm from "../../components/bookForm";
import Template from "../../components/template";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({
    title: "",
    description: "",
    pages: 0,
    author: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8000/api/books/${id}/`)
      .then((res) => {
        res
          .json()
          .then((book) => setBook(book))
          .catch(() => console.log("Error fetching"));
      })
      .catch(() => console.log("Error fetching"));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(book),
    };
    fetch(`http://localhost:8000/api/books/${id}/`, data)
      .then(router.push("/books"))
      .catch(() => console.log("Error updating"));
  };

  const handleInput = (fieldName, event) =>
    setBook({ ...book, [fieldName]: event.target.value });

  return (
    <Template>
      <BookForm onChange={handleInput} onSubmit={handleUpdate} book={book} />
    </Template>
  );
}
