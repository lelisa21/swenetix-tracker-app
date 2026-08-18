import { useState, type FormEvent } from "react";
import SubmitButton from "../../components/SubmitButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { addIdeaRequested } from "./ideasSlice";

function IdeaForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     dispatch(
      addIdeaRequested({title, description})
     )
    console.log("Submitting idea:", {
      title,
      description,
    });
  };

  return (
    <form className="idea-form" onSubmit={handleSubmit}>
      <h2>Submit a new idea</h2>

      <label htmlFor="title">Title</label>

      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Solar-powered backpack"
      />

      <label htmlFor="description">Description</label>

      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your idea..."
        rows={4}
      />

      <SubmitButton type="submit">
        Submit idea
      </SubmitButton>
    </form>
  );
}

export default IdeaForm;