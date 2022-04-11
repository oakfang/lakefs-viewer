import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useRepoIssues } from "services/github";
import { SpacedRow } from "ui/common";
import { Issue } from "ui/Issue";
import { useState } from "react";
import { IssueState } from "types/github";

export function App() {
  const [issueState, setIssueState] = useState<IssueState>("open");
  const { isLoading, issues, totalPages, page, setPage } = useRepoIssues(
    "treeverse",
    "lakeFS",
    issueState
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <SpacedRow>
          <Typography variant="h3" sx={{ padding: 1 }}>
            LakeFS Viewer
          </Typography>
          {totalPages && (
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={(_, page) => setPage(page)}
            />
          )}
        </SpacedRow>
      </AppBar>
      <Tabs
        value={issueState === "open" ? 0 : 1}
        onChange={(_, value) => setIssueState(value ? "closed" : "open")}
        aria-label="basic tabs example"
      >
        <Tab label="Open Issues" {...a11yProps(0)} />
        <Tab label="Closed Issues" {...a11yProps(1)} />
      </Tabs>
      {isLoading ? <LinearProgress /> : null}
      <Stack spacing={2} padding={2}>
        {issues.map((issue) => (
          <Issue key={issue.id} issue={issue} />
        ))}
      </Stack>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
