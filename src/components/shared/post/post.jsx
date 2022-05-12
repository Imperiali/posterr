import Avatar from "../avatar";
import { useLocation, useNavigate } from "react-router-dom";
import usePost from "../PostsProvider/usePost";
import useUser from "../UserProvider/useUser/useUser";
import Input from "../input";
import { useState } from "react";
import Reply from "../../../../assets/Reply";

const Post = (props) => {
  const { message, user, likes, originalUser, originalPost, type } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const { likePost, dislikePost, addPost } = usePost();
  const { name: currentUsername } = useUser();
  const [repliedPost, setRepliedPost] = useState(false);
  const pathToProfile = (toUser) => {
    if (location.pathname !== "/") {
      return navigate(`${location.pathname}/profile/${toUser}`);
    }
    navigate(`/profile/${toUser}`);
  };
  const postLiked = likes.indexOf(currentUsername) !== -1;

  const handleRepost = () => {
    addPost({
      user: currentUsername,
      message,
      likes: [],
      type: "repost",
      originalUser: user,
    });
  };

  return (
    <div className="py-3 sm:py-4 flex">
      <Avatar url="https://picsum.photos/200" />
      <div className="flex flex-col ml-4 w-full">
        {originalUser && (
          <button
            onClick={() => pathToProfile(originalUser)}
            className="w-28 cursor-pointer bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
          >
            <Reply />
            {originalUser}
          </button>
        )}
        <button
          onClick={() => pathToProfile(user)}
          className="text-gray-400 cursor-pointer self-start"
        >
          {user}
        </button>
        <p className="text-white">{message}</p>
        {originalPost && <Post {...originalPost} />}
        {type !== "replied" && (
          <div className="flex text-blue-400 mt-4">
            {postLiked ? (
              <button
                onClick={() =>
                  dislikePost({ postUsername: user, currentUsername })
                }
                className="mr-4 text-pink-500"
              >
                Dislike
              </button>
            ) : (
              <button
                onClick={() =>
                  likePost({ postUsername: user, currentUsername })
                }
                className="mr-4"
              >
                Like
              </button>
            )}
            <button onClick={handleRepost} className="mr-4">
              Repost
            </button>
            <button
              onClick={() => setRepliedPost(!repliedPost)}
              className="mr-4"
            >
              Reply
            </button>
          </div>
        )}
        {repliedPost && (
          <Input
            withoutAvatar
            post={{ user, message, originalUser, likes, type: "replied" }}
          />
        )}
      </div>
      <div className="border-b-gray-400"></div>
    </div>
  );
};

export default Post;
