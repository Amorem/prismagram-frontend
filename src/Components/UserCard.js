import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${(props) => props.theme.whiteBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ExtendedAvatar = styled(Avatar)`
  margin-bottom: 15px;
  margin-bottom: 10px;
`;

const ExtendedLink = styled(Link)`
  color: inherit;
`;

const UserCard = ({ id, username, isFollowing, url, isSelf }) => (
  <Card>
    <ExtendedAvatar url={url} size={"md"} />
    <ExtendedLink to={`/${username}`}>
      <FatText text={username} />
    </ExtendedLink>
    {!isSelf && <FollowButton isFollowing={isFollowing} id={id} />}
  </Card>
);

UserCard.protoTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default UserCard;
