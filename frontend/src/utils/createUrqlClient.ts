import { cacheExchange, Resolver } from "@urql/exchange-graphcache"
import Router from "next/router"
import { dedupExchange, Exchange, fetchExchange, stringifyVariables } from "urql"
import { pipe, tap } from "wonka"
import { isServer } from "./isServer"


// Global error handling
export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        // If the OperationResult has an error send a request to sentry
        if (error) {
          // the error is a CombinedError with networkError and graphqlErrors properties
          if (error?.message.includes("not authenticated")) {
            Router.replace("/login")
          }
        }
      })
    )
  }
  const cursorPagination = (): Resolver => {
    return (_parent, fieldArgs, cache, info) => {
      const { parentKey: entityKey, fieldName } = info;
      const allFields = cache.inspectFields(entityKey);// Get all queries in the cache
      const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
      const size = fieldInfos.length;
      if (size === 0) {
        return undefined;
      }
  
      const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
      const isItInTheCache = cache.resolve(
        cache.resolve(entityKey, fieldKey) as string,
        "posts"
      );
      info.partial = !isItInTheCache;
      let hasMore = true
      const results: string[] = [];
      fieldInfos.forEach((fi) => {// Combine results from subsequent queries into the results returned to client
        // const key = cache.resolve(entityKey, fi.fieldKey) as string;
        // const data = cache.resolve(key, "posts") as string[];
        const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string
        const data = cache.resolve(key, "posts") as string[]
        const _hasMore = cache.resolve(key, "hasMore")
        if (!_hasMore) {
          hasMore = _hasMore as boolean;
        }
        results.push(...data);
      });

      return {
        posts: results,
        hasMore,
        __typename: "PaginatedPosts"
      }

    };
  };


export const createUrqlClient = (ssrExchange: any, ctx: any) => {

  // Pass logged in users cookie to graphql for ssr requests so we know
  // their status.
  let cookie = ''

  return {
  url: process.env.BACKEND_API,
  fetchOptions: {
    credentials: "include" as const,
    headers: cookie ? {cookie} : undefined
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
      },
      resolvers: {// Client side resolvers
        Query: {
          posts: cursorPagination()
        }
      },

    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
}
}
