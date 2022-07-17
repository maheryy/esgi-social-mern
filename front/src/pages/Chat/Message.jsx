import { useMemo } from "react";
import { OtherMessage } from "./OtherMessage";
import { UserMessage } from "./UserMessage";

export const Message = ({ data }) => {
  // TODO : change this when auth works
  const isCurrentUser = useMemo(() => data.userId === 1, []);
  return isCurrentUser ? (
    <UserMessage data={data} />
  ) : (
    <OtherMessage data={data} />
  );
};
