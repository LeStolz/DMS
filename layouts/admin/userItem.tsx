import * as elements from "typed-html";

const UserItem = () => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>Nguyen Van A</td>
      <td>0902311123</td>
      <td>
        <a href="/admin/profile-client" type="button" class="btn btn-primary">
          View
        </a>
      </td>
      <td>
        <div class="form-check form-switch d-flex justify-content-center">
          <input
            class="form-check-input fs-4"
            type="checkbox"
            id="flexSwitchCheckChecked"
            checked
          />
        </div>
      </td>
    </tr>
  );
};

export default UserItem;
