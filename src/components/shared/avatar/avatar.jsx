const Avatar = (props) => {
  const { url } = props;

  return (
    <img className="w-10 h-10 rounded-full" src={url} alt="Rounded avatar" />
  );
};

export default Avatar;
