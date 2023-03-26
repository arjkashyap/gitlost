import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const userIsAuth = () => {
  // make sure the user is logged in
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.me) {
      // store the address which the user wanted to access earlier in param
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
