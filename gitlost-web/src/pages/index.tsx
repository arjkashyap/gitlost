import {} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useProjectsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useProjectsQuery();
  return (
    <>
      {/* <NavBar /> */}
      <NavBar />
      <div>Hello world !</div>
      <br />
      {!data ? (
        <div>loading ...</div>
      ) : (
        data.projects.map((p) => <div key={p.id}>{p.name}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
