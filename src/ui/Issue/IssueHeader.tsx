import { FC } from "react";
import { capitalize } from "lodash";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { GithubIssue } from "types/github";
import { SpacedRow, Row } from "ui/common";
import { UserDetails } from "./UserDetails";

const { contrastColor } = require("contrast-color");

interface Props {
  issue: GithubIssue;
}

export const IssueHeader: FC<Props> = ({ issue }) => {
  return (
    <Box flex={1}>
      <SpacedRow>
        <Row>
          <Typography color="text.secondary">#{issue.number}</Typography>
          <Chip
            label={capitalize(issue.state)}
            variant="outlined"
            size="small"
            color={issue.state === "open" ? "success" : "error"}
          />
          {issue.labels.map((label, idx) => (
            <Chip
              key={typeof label === "string" ? idx : label.id}
              label={typeof label === "string" ? label : label.name}
              variant="outlined"
              size="small"
              sx={
                typeof label === "string"
                  ? {}
                  : {
                      background: `#${label.color}`,
                      color: contrastColor({ bgColor: `#${label.color}` }),
                    }
              }
            />
          ))}
        </Row>
        <UserDetails user={issue.user} />
      </SpacedRow>

      <Typography variant="h5">{issue.title}</Typography>
    </Box>
  );
};
