import { FC } from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { GithubIssueUser } from "types/github";
import { Row } from "ui/common";

interface Props {
  user: GithubIssueUser | null;
}

export const UserDetails: FC<Props> = ({ user }) => {
  if (!user) return null;
  return (
    <Row>
      <Avatar alt={user.login} src={user.avatar_url} />
      <Typography color="text.secondary" gutterBottom>
        {user.login}
      </Typography>
    </Row>
  );
};
