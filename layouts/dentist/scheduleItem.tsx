import * as elements from "typed-html";
import Dentist from "./dentist";

const ScheduleItem = ({
  session,
  id,
  date,
  time,
  status,
}: elements.Attributes) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{date}</td>
      <td>
        <span
          class={`fw-bold me-1
          ${session === "Morning" ? "text-warning" : ""}
          ${session === "Afternoon" ? "text-danger" : ""}
          ${session === "Evening" ? "text-success" : ""}
        `}
        >
          {session}
        </span>
        <span class="px-2 py-1 bg-black text-white rounded-lg fw-bold">
          {time}
        </span>
      </td>
      <td>
        <p
          class={`bg ${
            status === "Unbooked" ? "bg-danger" : "bg-success"
          } d-inline-block px-3 py-2 rounded-xl text-white m-0`}
        >
          {status}
        </p>
      </td>

      <td>
        <button class="btn btn-outline-primary" disabled="true">
          Edit
        </button>
        <button class="btn btn-outline-danger" disabled="true">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ScheduleItem;
