import {} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => (
  <>
    {/* <NavBar /> */}
    <NavBar />
    <div>Hello world !</div>
  </>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
