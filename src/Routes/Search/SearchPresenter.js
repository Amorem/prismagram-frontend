import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
  grid-gap: 25px;
  margin-bottom: 50px;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text={"Search for something"} />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchPost && data.searchUser) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No user found" />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <Section>
          {data.searchPost.length === 0 ? (
            <FatText text="No photos found" />
          ) : (
            data.searchPost.map((post) => null)
          )}
        </Section>
      </Wrapper>
    );
  } else {
    return null;
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;
