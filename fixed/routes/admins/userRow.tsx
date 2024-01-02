import * as elements from "typed-html";
import { User } from "../../types";

type UserRowProps = elements.Children & {
  user: User;
};

const UserRow = ({
  user: { phone, name, role, isLocked },
  children,
}: UserRowProps) => {
  return (
    <tr class="align-middle">
      <td>{phone}</td>
      <td>{name}</td>
      <td>{role}</td>
      <td>
        <div class="form-check form-switch">
          <input
            name="lock"
            class="form-check-input"
            type="checkbox"
            checked={isLocked}
            role="switch"
            id="flexSwitchCheckDefault"
            hx-post="/admins/toggleLock"
            hx-trigger="click"
            hx-swap="none"
            hx-include="closest div"
          />
          <input type="hidden" name="phone" value={phone} />
          <input type="hidden" name="role" value={role} />
          <label class="form-check-label" for="flexSwitchCheckDefault" />
          {children}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
