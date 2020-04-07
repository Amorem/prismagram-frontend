import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, {
    variables: {
      id,
    },
  });
  const [unfollowMutation] = useMutation(UNFOLLOW, {
    variables: {
      id,
    },
  });

  const onClick = () => {
    if (isFollowingState === true) {
      setIsFollowingState(false);
      unfollowMutation();
    } else {
      setIsFollowingState(true);
      followMutation();
    }
  };
  return (
    <FollowButtonPresenter
      isFollowing={isFollowingState}
      id={id}
      onClick={onClick}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;
