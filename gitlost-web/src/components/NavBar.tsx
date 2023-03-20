import {
  Box,
  Button,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isRunningOnServer } from "../utils/isRunningOnServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery(); // do not run this query if doing ssr
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    // user not logged in
    body = (
      <>
        <LinkBox>
          <LinkOverlay as={NextLink} href="/login" m={2}>
            login
          </LinkOverlay>
          <LinkOverlay as={NextLink} href="/register">
            register
          </LinkOverlay>
        </LinkBox>
        {/* <Link as={NextLink} href="/login">
          <Link mr={2}>login</Link>
        </Link>
        <Link as={NextLink} href="/register">
          <Link>register</Link>
        </Link> */}
      </>
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
    <Flex bg="teal" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
