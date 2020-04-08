import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";

const Wrapper = styled.div`
  min-height: 60vh;
`;

const Header = styled.header``;

const HeaderColumn = styled.div``;

export default ({ loading, data }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    const {
      seeUser: {
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        posts,
        postsCount,
      },
    } = data;
    console.log(data);
    return (
      <Header>
        <HeaderColumn>
          <Avatar size="lg" url={avatar} />
        </HeaderColumn>
      </Header>
    );
  }
};
