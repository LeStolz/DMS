import * as elements from "typed-html";

const PatientItem = ({ id, name, phone }: elements.Attributes) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{phone}</td>
      <td>
        <a class="btn btn-primary" href="/dentist/patient-detail" role="button">
          View <i class="bi bi-eye"></i>
        </a>
      </td>
    </tr>
  );
};

export default PatientItem;
