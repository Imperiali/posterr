import { useNavigate, useParams } from "react-router-dom";
import useUser from "../UserProvider/useUser/useUser";
import usePost from "../PostsProvider/usePost";
import PostList from "../postList";
import { useEffect, useState } from "react";
import Spinner from "../../../../assets/Spinner";

const Feed = () => {
  const navigate = useNavigate();
  const { name, following } = useUser();
  const { allPosts, loading } = usePost(name);
  const { postsMode } = useParams();
  const [checked, setChecked] = useState(false);

  const followingPosts = allPosts?.filter(
    (post) => following.indexOf(post.user) !== -1
  );

  const handleToggle = (evt) => {
    setChecked(!checked);
    if (evt.target.checked) return navigate(`/following`);
    navigate(`/all`);
  };

  let posts = postsMode === "following" ? followingPosts : allPosts;

  useEffect(() => {
    if (postsMode === "following") return setChecked(true);
    setChecked(false);
  }, []);

  return (
    <div className="rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex align-baseline ">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
          Posts from all
        </span>
        <label
          htmlFor="default-toggle"
          className="relative inline-flex items-center cursor-pointer mx-4"
        >
          <input
            checked={checked}
            onChange={handleToggle}
            type="checkbox"
            id="default-toggle"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
          from who you follow
        </span>
      </div>
      {loading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
};

export default Feed;
