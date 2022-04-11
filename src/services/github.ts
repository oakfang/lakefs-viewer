import { useMemo, useRef, useState } from "react";
import qs from "qs";
import { useQuery } from "react-query";
import { keyBy, compact } from "lodash";
import { useGithubClient } from "providers/github";
import { GithubIssue, IssueState } from "types/github";

type Url = `https://${string}`;
type UrlSegment = `<${string}>`;
type Rel = "prev" | "next" | "first" | "last";
type RelSegment = `rel="${Rel}"`;
type LinkHeaderMember = `${UrlSegment};${RelSegment}`;
interface Link {
  url: Url;
  rel: Rel;
}

const LINK_RE = /<(?<url>.*)>;rel="(?<rel>.*)"/;

function parseLinkHeaderMember(item: LinkHeaderMember): Link | null {
  const match = item.match(LINK_RE);
  if (!match) {
    return null;
  }
  return match.groups as unknown as Link;
}

/**
 * Surprisingly, this is how we get page count from Github's API:
 * https://stackoverflow.com/questions/29518253/how-to-get-number-of-result-pages-for-the-data-fetched-from-github-api-for-a-req
 */
function parseLinkHeader(linkHeader: string) {
  const members = linkHeader
    .replace(/\s/g, "")
    .split(",") as LinkHeaderMember[];
  const links = compact(members.map(parseLinkHeaderMember));
  const linksByRel = keyBy(links, "rel") as Partial<Record<Rel, Link>>;
  return linksByRel;
}

export const useRepoIssues = (
  owner: string,
  repo: string,
  state: IssueState = "open"
) => {
  const [page, setPage] = useState(1);
  const github = useGithubClient();
  const { data, isLoading, isFetching } = useQuery(
    ["github", "issues", owner, repo, state, page],
    () =>
      github.request(
        "GET /repos/{owner}/{repo}/issues?page={page}&state={state}",
        {
          owner,
          repo,
          page,
          state,
        }
      ),
    { keepPreviousData: true }
  );
  const totalPages = useMemo(() => {
    if (!data?.headers.link) return null;
    const { last } = parseLinkHeader(data?.headers.link);
    if (!last) return null;
    const { search } = new URL(last.url);
    const { page } = qs.parse(search, { ignoreQueryPrefix: true });
    if (!page) return null;
    return parseInt(page as string);
  }, [data]);
  // the actual last page doesn't provide a "last" rel link
  const totalRef = useRef(totalPages);
  if (totalPages) {
    totalRef.current = totalPages;
  }

  const issues: GithubIssue[] = data?.data ?? [];

  return {
    issues,
    isLoading: isLoading || isFetching,
    totalPages: totalRef.current,
    page,
    setPage,
  };
};
