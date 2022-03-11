import { useState, useEffect } from "react";
import Link from "next/link";

import { AiFillDelete } from "react-icons/ai";
import Template from "../../components/template";
import AuthorForm from "../../components/authorForm";
import Container from "../../components/container";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState({ name: "", birth: "" });

  useEffect(() => {
    getAuthors();
  }, []);

  const getAuthors = () => {
    fetch("http://localhost:8000/api/authors/")
      .then((res) => {
        res
          .json()
          .then((authors) => setAuthors(authors))
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
      body: JSON.stringify(author),
    };

    fetch("http://localhost:8000/api/authors/", data)
      .then(() => {
        setAuthor({ name: "", birth: "" });
        getAuthors();
      })
      .catch(() => console.log("Error posting"));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/authors/${id}/`, { method: "DELETE" })
      .then(() => getAuthors())
      .catch(() => console.log("Error fetching"));
  };

  const handleInput = (fieldName, event) =>
    setAuthor({ ...author, [fieldName]: event.target.value });

  return (
    <Template>
      <Container>
        <AuthorForm
          title="Crear un autor"
          onChange={handleInput}
          onSubmit={handlePost}
          author={author}
        />

        <div className="text-center flex justify-center">
          <ul className="flex-grow bg-medium-light text-center max-w-4xl m-5 p-6">
            {authors.map((author) => {
              return (
                <li
                  key={author.id}
                  className="flex flex-row justify-between border-2 border-medium-dark p-4 m-2"
                >
                  <Link href={`/authors/${author.id}`}>
                    <a>{author.name}</a>
                  </Link>

                  <button onClick={() => handleDelete(author.id)}>
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
