import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    // user not logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
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
