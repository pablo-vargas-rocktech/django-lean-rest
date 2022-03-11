import { AiOutlineSend } from "react-icons/ai";
import FormEntry from "./formEntry";

export default function AuthorForm({ title, onChange, onSubmit, author }) {
  return (
    <div className="flex flex-row items-center justify-center">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="bg-medium-dark xl:w-1/3 md:w-3/4 w-full p-10"
      >
        <fieldset>
          <legend className="text-medium-light text-center">{title}</legend>
          <FormEntry>
            <label htmlFor="name" className="text-medium-light w-1/4">
              Name
            </label>
            <input
              className="w-3/4 bg-light"
              type="text"
              name="name"
              id="name"
              value={author?.name}
              onChange={(e) => onChange("name", e)}
            />
          </FormEntry>

          <FormEntry>
            <label htmlFor="birth" className="text-medium-light w-1/4">
              Birth
            </label>
            <input
              className="w-3/4 bg-light"
              type="date"
              name="birth"
              id="birth"
              value={author?.birth}
              onChange={(e) => onChange("birth", e)}
            />
          </FormEntry>

          <button className="bg-dark text-light p-4 w-full flex justify-center">
            <AiOutlineSend />
          </button>
        </fieldset>
      </form>
    </div>
  );
}
