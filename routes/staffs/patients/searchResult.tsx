import * as elements from "typed-html";
import UserRow from "./userRow";
import { User } from "../../../types";

const SearchResult = ({ users }: { users: User[] }) => {
  return (
    <tbody id="user-search-result">
      {users.map((user) => (
        <UserRow user={user} />
      ))}
    </tbody>
  );
};

export default SearchResult;
