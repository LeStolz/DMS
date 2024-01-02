import * as elements from "typed-html";
import { User } from "../../types";
import UserRow from "./userRow";

const SearchResult = ({ users }: { users: User[] }) => {
  return (
    <tbody id="user-search-result">
      {users.length === 0 ? (
        <tr class="text-center">
          <td colspan={5}>No user found</td>
        </tr>
      ) : (
        users.map((user) => <UserRow user={user} />)
      )}
    </tbody>
  );
};

export default SearchResult;
