import * as elements from "typed-html";
import { User } from "../../../types";

type UserRowProps = elements.Children & {
  user: User;
};

const UserRow = ({ user: { id, phone, name }, children }: UserRowProps) => {
  return (
    <tr class="align-middle">
      <td>{phone}</td>
      <td>
        <a class="link-primary" href={`/dentists/profile/${id}`}>
          {name}
        </a>
        {children}
      </td>
    </tr>
  );
};

export default UserRow;
