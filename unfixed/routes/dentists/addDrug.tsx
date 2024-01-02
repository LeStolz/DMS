import * as elements from "typed-html";
import { DrugBatch } from "../../types";
import { formatPlural, formatShortDate } from "../../utils";

const AddDrug = ({
  drug,
}: {
  drug: DrugBatch & { expirationDate: string };
}) => {
  return (
    <tr>
      <td>
        <p class="d-flex align-items-center m-0">
          {drug.name}
          <input type="hidden" name="drugId" value={drug.id} />
          <input
            type="hidden"
            name="expirationDate"
            value={drug.expirationDate}
          />
          <input type="hidden" name="dosage" value={drug.dosage} />
          <input
            type="hidden"
            name="quantity"
            value={drug.quantity.toString()}
          />
        </p>
      </td>
      <td>
        <p class="d-flex align-items-center m-0">
          {Number(drug.quantity)}{" "}
          {formatPlural(
            Number(drug.quantity) || 1,
            drug.unit || "",
            `${drug.unit}s` || ""
          )}
        </p>
      </td>
      <td>
        <p class="d-flex align-items-center m-0">{drug.dosage}</p>
      </td>
      <td>
        <p class="d-flex align-items-center m-0">{drug.expirationDate}</p>
      </td>
      <td>
        <button
          class="btn btn-danger text-white"
          onclick="
            $(this).parent().parent().remove();
          "
        >
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default AddDrug;
