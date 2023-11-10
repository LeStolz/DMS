import * as elements from "typed-html";

const DrugItem = ({
  ID,
  Name,
  Unit,
  Directive,
  Import,
  expriredDate,
}: elements.Attributes) => {
  return (
    <tr>
      <th scope="row">{ID}</th>
      <td>{Name}</td>
      <td>{Unit}</td>
      <td>{Directive}</td>
      <td>{Import}</td>
      <td>{expriredDate}</td>
      <td>
        <a href="/admin/drug-detail" type="button" class="btn btn-primary">
          Edit
        </a>
      </td>
    </tr>
  );
};
export default DrugItem;
