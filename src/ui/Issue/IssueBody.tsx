import { FC } from "react";
import styled from "@emotion/styled";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { GithubIssue } from "types/github";

interface Props {
  issue: GithubIssue;
  isExpnaded: boolean;
}

export const IssueBody: FC<Props> = ({ issue, isExpnaded }) => {
  return (
    <Collapse collapsedSize={0} in={isExpnaded}>
      <MarkdownContainer paddingX={10} paddingY={2}>
        <Divider />
        <ReactMarkdown children={issue.body!} remarkPlugins={[remarkGfm]} />
      </MarkdownContainer>
    </Collapse>
  );
};

const MarkdownContainer = styled(Box)`
  a {
    color: ${(props) => props.theme.palette.primary.main};
  }
  a:visited {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;
