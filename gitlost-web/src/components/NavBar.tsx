import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => setIsServer(false), []);

  const [{ data, fetching }] = useMeQuery({ pause: isServer }); // do not run this query if doing ssr
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    // user not logged in
    body = (
      <Box display="flex" alignItems="center">
        <LinkBox mr={2}>
          <LinkOverlay as={NextLink} href="/login">
            login
          </LinkOverlay>
        </LinkBox>
        <LinkBox>
          <LinkOverlay as={NextLink} href="/register">
            register
          </LinkOverlay>
        </LinkBox>
      </Box>
    );
  } else {
    body = (
      <Flex align={"center"}>
        <Box m={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout({});
          }}
          variant={"link"}
          isLoading={logoutFetching}
        >
          logout
        </Button>
      </Flex>
    );
    // user is logged in
  }
  return (
    <Flex zIndex={1} position="sticky" top={0} bg="teal" p={4}>
      <Flex flex={1} m={"auto"} align="center" maxW={800}>
        <LinkBox>
          <LinkOverlay as={NextLink} href="/">
            <Heading>GitLost</Heading>
          </LinkOverlay>
        </LinkBox>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
