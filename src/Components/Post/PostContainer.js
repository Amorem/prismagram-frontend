import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { toast } from "react-toastify";
import PostPresenter from "./PostPresenter";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { ME } from "../../SharedQueries";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  location,
  caption
}) => {
  const [isLikedState, setIsLiked] = useState(isLiked);
  const [likeCountState, setLikeCount] = useState(likeCount);
  const comment = useInput("");
  const { data: meQuery } = useQuery(ME);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment.value
    }
  });

  const toggleLike = async () => {
    if (isLikedState === true) {
      setIsLiked(false);
      setLikeCount(likeCountState - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountState + 1);
    }
    try {
      await toggleLikeMutation();
    } catch {
      setIsLiked(!isLikedState);
      toast.error("Cannot save like");
    }
  };

  const onKeyPress = async e => {
    if (e.which === 13) {
      e.preventDefault();
      comment.setValue("");
      setSelfComments([
        ...selfComments,
        {
          id: Math.floor(Math.random() * 100),
          text: comment.value,
          user: { username: meQuery.me.username }
        }
      ]);
      try {
        await addCommentMutation();
      } catch {
        toast.error("Cannot save comment");
      }
    }
  };

  useEffect(() => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 3000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 3000);
    }
  }, [currentItem, files.length]);

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountState}
      isLiked={isLikedState}
      comments={comments}
      newComment={comment}
      createdAt={createdAt}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      location={location}
      caption={caption}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default PostContainer;
