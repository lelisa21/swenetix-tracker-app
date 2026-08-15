import { useState, type FormEvent } from "react";
import SubmitButton from "../../components/SubmitButton";

function IdeaForm() {
  const [title, setTitle] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting idea:", { title, details });
  };

  return (
    <form className="idea-form" onSubmit = {handleSubmit}>
      <h2>Submit a new idea</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Solar-powered backpack"
      />

      <label htmlFor="details">Description</label>
      <textarea
        id="details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
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
