import * as elements from "typed-html";
import { Drug } from "../../types";
import { formatShortDate } from "../../utils";

type DrugBatchRowProps = elements.Children & {
  drugBatch: Drug["drugBatches"][0];
  scrud: string;
  drugId: string;
  drugName?: string;
};

const DrugBatchRow = ({
  drugBatch,
  scrud,
  drugId,
  children,
  drugName,
}: DrugBatchRowProps) => {
  return (
    <tr>
      <td>{drugBatch.stock}</td>
      <td>{formatShortDate(drugBatch.expirationDate)}</td>
      {scrud === "true" ? (
        <td>
          <button
            type="button"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#removeDrugBatchInfoModal"
            onclick={`
              document.querySelector('#removeDrugBatchInfoModal [name="drugId"]').value = "${drugId}";
              document.querySelector('#removeDrugBatchInfoModal [name="drugName"]').value = "${drugName}";
              document.querySelector('#removeDrugBatchInfoModal [name="expirationDate"]').value = "${
                drugBatch.expirationDate.toISOString().split("T")[0]
              }";
              document.querySelector('#removeDrugBatchInfoModal #expirationDate').innerHTML = "${formatShortDate(
                drugBatch.expirationDate
              )}";
              document.querySelector('#removeDrugBatchInfoModal #drugName').innerHTML = "${drugName}";
            `}
            class="close btn btn-danger text-white"
          >
            <i class="bi bi-trash"></i>
          </button>
          {children}
        </td>
      ) : (
        ""
      )}
    </tr>
  );
};

export default DrugBatchRow;
