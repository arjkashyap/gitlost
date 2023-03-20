import { Cache } from "@urql/exchange-graphcache";
import { QueryInput } from "@urql/exchange-graphcache/dist/urql-exchange-graphcache-chunk";

// caching related stuff
export function customUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
