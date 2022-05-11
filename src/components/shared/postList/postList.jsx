import Post from "../post";
import { nanoid } from "nanoid";

const PostList = (props) => {
  const { posts } = props;

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-400">
      {posts.length > 0 ? (
        posts?.map((post) => <Post key={nanoid()} {...post} />)
      ) : (
        <div className="text-white flex mt-4">No posts to show :/</div>
      )}
    </div>
  );
};

export default PostList;
