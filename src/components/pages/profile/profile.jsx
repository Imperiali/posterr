import { useNavigate, useParams } from "react-router-dom";
import useUsers from "../../shared/UsersProvider/useUsers";
import usePost from "../../shared/PostsProvider/usePost";
import PostList from "../../shared/postList";
import Input from "../../shared/input";
import useUser from "../../shared/UserProvider/useUser/useUser";
import postService from "../../../service/post";
import Close from "../../../../assets/Close";

const Profile = () => {
  const { profileName } = useParams();
  const {
    name: currentUser,
    avatarUrl: currentUserAvatarUrl,
    following: currentUserFollowing,
    followers: currentUserFollowers,
    createdAt: currentUserCreatedAt,
    follow,
    unfollow,
  } = useUser();
  const isCurrentUser = profileName === currentUser;
  const navigate = useNavigate();
  let { name, avatarUrl, followers, following, createdAt } =
    useUsers(profileName) || {};
  const { ownPosts, fetchPosts, setLoading } = usePost(name || currentUser);
  let isCurrentUserFollowing = currentUserFollowing.indexOf(name) !== -1;

  const handleClick = (callback) => {
    isCurrentUserFollowing = !isCurrentUserFollowing;
    callback();
    const resolvePosts = async () => {
      setLoading(true);
      const posts = await postService();
      fetchPosts(posts);
      setLoading(false);
    };
    resolvePosts();
  };

  if (isCurrentUser) {
    name = currentUser;
    avatarUrl = currentUserAvatarUrl;
    followers = currentUserFollowers;
    following = currentUserFollowing;
    createdAt = currentUserCreatedAt;
  }

  return (
    <div className="grid place-items-center h-screen overflow-y-auto overflow-x-hidden fixed z-50 w-full inset-0 h-modal h-full">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <button
              onClick={() => navigate(-1)}
              className="w-10 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <Close />
            </button>
          </div>
          <div className="flex mx-4">
            <div className="flex-2 m-4 bg-white dark:bg-gray-700 ">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="my-3 w-24 h-24 rounded-full shadow-lg"
                  src={avatarUrl}
                  alt=""
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {name}
                </h5>
                <div className="flex justify-between w-full">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Followers{" "}
                    {isCurrentUser
                      ? currentUserFollowers.length
                      : followers.length}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Following{" "}
                    {isCurrentUser
                      ? currentUserFollowing.length
                      : following.length}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Since {createdAt}
                </span>
                {isCurrentUser || (
                  <div className="flex mt-4 space-x-3 lg:mt-6">
                    {isCurrentUserFollowing ? (
                      <button
                        onClick={() => handleClick(() => unfollow(name))}
                        className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClick(() => follow(name))}
                        className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Follow
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="my-4">
                <Input withoutAvatar />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Posts {ownPosts.length}
              </span>
              <div className="mb-4 max-h-52 overflow-auto">
                <PostList posts={ownPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
