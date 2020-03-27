import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">about us</Link>
      </ListItem>
      <ListItem>
        <Link href="#">support</Link>
      </ListItem>
      <ListItem>
        <Link href="#">press</Link>
      </ListItem>
      <ListItem>
        <Link href="#">api</Link>
      </ListItem>
      <ListItem>
        <Link href="#">privacy</Link>
      </ListItem>
      <ListItem>
        <Link href="#">terms</Link>
      </ListItem>
      <ListItem>
        <Link href="#">directory</Link>
      </ListItem>
      <ListItem>
        <Link href="#">profiles</Link>
      </ListItem>
      <ListItem>
        <Link href="#">hastags</Link>
      </ListItem>
      <ListItem>
        <Link href="#">langage</Link>
      </ListItem>
    </List>
    <Copyright> &copy; {new Date().getFullYear()} Instaclone </Copyright>
  </Footer>
);
