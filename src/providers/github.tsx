import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  PropsWithChildren,
} from "react";
import { Octokit } from "@octokit/core";

const GithubContext = createContext(new Octokit());

export const useGithubClient = () => useContext(GithubContext);

interface GithubProviderProps {
  githubToken: string;
}

export const GithubProvider: FunctionComponent<
  PropsWithChildren<GithubProviderProps>
> = ({ githubToken, children }) => {
  const client = useMemo(
    () => new Octokit({ auth: githubToken }),
    [githubToken]
  );

  return (
    <GithubContext.Provider value={client}>{children}</GithubContext.Provider>
  );
};
