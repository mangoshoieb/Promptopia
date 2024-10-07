import Link from "next/link";

const Form = ({ type, post, setPost, submit, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Prompts</h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Ai Prompt
          </span>
          <textarea
            className="form_textarea"
            required
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write Your Prompt here"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            tag <span className="font-normal">(#idea,#webdevelopment)</span>
          </span>
          <input
            className="form_input"
            required
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="tags"
          ></input>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-400 text-sm">
          Cancel
          </Link>
          <button type="sumbit"
          disabled={submit}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submit ? `${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
