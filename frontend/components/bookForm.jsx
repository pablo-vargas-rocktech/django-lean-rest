import { AiOutlineSend } from "react-icons/ai";
import { useState, useEffect } from "react";
import FormEntry from "./formEntry";

export default function BookForm({ title, onChange, onSubmit, book }) {
  const [authors, setAuthors] = useState([]);

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

  return (
    <div className="flex flex-row items-center justify-center">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="bg-medium-dark xl:w-1/3 md:w-3/4 w-full p-10"
      >
        <fieldset>
          <legend className="text-medium-light text-center">{title}</legend>
          <FormEntry>
            <label htmlFor="title" className="text-medium-light w-1/4">
              Title
            </label>
            <input
              className="w-3/4 bg-light"
              type="text"
              name="title"
              id="title"
              value={book?.title}
              onChange={(e) => onChange("title", e)}
            />
          </FormEntry>

          <FormEntry>
            <label htmlFor="" className="text-medium-light w-1/4">
              Description
            </label>
            <textarea
              className="w-3/4 bg-light"
              type="text"
              name=""
              id=""
              value={book?.description}
              onChange={(e) => onChange("description", e)}
            />
          </FormEntry>

          <FormEntry>
            <label htmlFor="pages" className="text-medium-light w-1/4">
              Pages
            </label>
            <input
              className="w-3/4 bg-light"
              type="number"
              name="pages"
              id="pages"
              value={book?.pages}
              onChange={(e) => onChange("pages", e)}
            />
          </FormEntry>

          <FormEntry>
            <label htmlFor="author" className="text-medium-light w-1/4">
              Author
            </label>
            <select
              className="w-3/4 bg-light"
              name="author"
              id="author"
              onChange={(e) => onChange("author", e)}
            >
              {authors.map((author) => {
                return (
                  <option
                    value={author.id}
                    key={author.id}
                    selected={author.id == book.author}
                  >
                    {author.name}
                  </option>
                );
              })}
            </select>
          </FormEntry>

          <button className="bg-dark text-light p-4 w-full flex justify-center">
            <AiOutlineSend />
          </button>
        </fieldset>
      </form>
    </div>
  );
}
