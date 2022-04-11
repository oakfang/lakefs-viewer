import { components } from "@octokit/openapi-types";

export type GithubIssue = components["schemas"]["issue"];
export type GithubIssueUser = Exclude<GithubIssue["user"], null>;
export type IssueState = "open" | "closed";
