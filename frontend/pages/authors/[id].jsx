import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AuthorForm from "../../components/authorForm";
import Template from "../../components/template";

export default function Author() {
  const router = useRouter();
  const { id } = router.query;

  const [author, setAuthor] = useState({ name: "", birth: "" });

  useEffect(() => {
    fetch(`http://localhost:8000/api/authors/${id}/`)
      .then((res) => {
        res
          .json()
          .then((author) => setAuthor(author))
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
      body: JSON.stringify(author),
    };
    fetch(`http://localhost:8000/api/authors/${id}/`, data)
      .then(router.push("/authors"))
      .catch(() => console.log("Error updating"));
  };

  const handleInput = (fieldName, event) =>
    setAuthor({ ...author, [fieldName]: event.target.value });

  return (
    <Template>
      <AuthorForm
        title={`Cambiar autor (${author.id})`}
        onChange={handleInput}
        onSubmit={handleUpdate}
        author={author}
      />
    </Template>
  );
}
