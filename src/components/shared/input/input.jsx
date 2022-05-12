import Avatar from "../avatar";
import usePost from "../PostsProvider/usePost";
import useUser from "../UserProvider/useUser/useUser";
import { useState } from "react";
import Close from "../../../../assets/Close";
import ArrowRight from "../../../../assets/ArrowRight";

const Input = (props) => {
  const { withoutAvatar, post } = props;
  const { avatarUrl, name } = useUser();
  const { addPost, ownPosts } = usePost(name);
  const [textLength, setTextLength] = useState(0);
  const [limitPostExceeded, setLimitPostExceeded] = useState(false);

  const handleChange = (evt) => {
    setTextLength(evt.target.value.length);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const today = new Date().toLocaleDateString("en").replaceAll("/", "-");
    const postsToday = ownPosts
      .slice(0, 5)
      .filter(({ createdAt }) => createdAt === today);

    if (postsToday.length >= 5) {
      evt.target.message.value = "";
      return setLimitPostExceeded(true);
    }

    if (evt.target.message.value) {
      addPost({
        user: name,
        message: evt.target.message.value,
        likes: [],
        originalPost: post || null,
        createdAt: new Date().toLocaleDateString("en").replaceAll("/", "-"),
      });
      evt.target.message.value = "";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex align-middle">
        {withoutAvatar || (
          <label
            htmlFor="large-input"
            className="m-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <Avatar url={avatarUrl} />
          </label>
        )}
        <div className="w-full py-4">
          <textarea
            id="large-input"
            name="message"
            maxLength="777"
            onChange={handleChange}
            placeholder="What about post something that is in your way?"
            className="w-full p-4 text-gray-900 border bg-gray-200 dark:bg-gray-400 border-gray-300 rounded-lg sm:text-md 1dark:border-gray-600 dark:placeholder-gray-900 dark:text-white"
          />
          <span className="text-white">{textLength}/777</span>
        </div>
        <button
          type="submit"
          className="w-20 text-white focus:bg-gray-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center dark:focus:ring-blue-800"
        >
          <ArrowRight />
        </button>
      </form>
      {limitPostExceeded && (
        <div
          id="toast-danger"
          className="flex mx-auto items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <Close />
          </div>
          <div className="ml-3 text-sm font-normal">
            Exceeded limit of posts today.
          </div>
          <button
            type="button"
            onClick={() => setLimitPostExceeded(false)}
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-danger"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <Close />
          </button>
        </div>
      )}
    </>
  );
};

export default Input;
