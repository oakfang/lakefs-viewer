import { FC, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ExpandIcon from "@mui/icons-material/Expand";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";

import { GithubIssue } from "types/github";
import { Row } from "ui/common";
import { IssueHeader } from "./IssueHeader";
import { IssueBody } from "./IssueBody";

interface Props {
  issue: GithubIssue;
}

export const Issue: FC<Props> = ({ issue }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <CardContent>
        <Row>
          <Button
            disabled={!issue.body}
            aria-label={expanded ? "Collapse" : "Expand"}
            variant="text"
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? <UnfoldLessIcon /> : <ExpandIcon />}
          </Button>
          <IssueHeader issue={issue} />
        </Row>
        {issue.body && <IssueBody issue={issue} isExpnaded={expanded} />}
      </CardContent>
    </Card>
  );
};
