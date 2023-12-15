import * as elements from "typed-html";
import UserRow from "./userRow";
import { User } from "../../../types";

const SearchResult = ({ users }: { users: User[] }) => {
  return (
    <tbody id="user-search-result">
      {users.length === 0 ? (
        <tr class="text-center">
          <td colspan={5}>No patient found</td>
        </tr>
      ) : (
        users.map((user) => <UserRow user={user} />)
      )}
    </tbody>
  );
};

export default SearchResult;
