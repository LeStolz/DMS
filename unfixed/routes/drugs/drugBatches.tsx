import * as elements from "typed-html";
import { Drug } from "../../types";
import DrugBatchRow from "./drugBatchRow";

type DrugBatchesProps = {
  drugBatches: Drug["drugBatches"] | null;
  drugId: string;
  drugName?: string;
  scrud: string;
};

const DrugBatches = ({
  drugBatches,
  drugId,
  drugName,
  scrud,
}: DrugBatchesProps) => {
  return (
    <tbody id="drug-batches">
      {drugBatches == null ? (
        <tr id="no-drug-batch-found" class="text-center">
          <td colspan={5}>No drug batch found</td>
        </tr>
      ) : (
        drugBatches.map((drugBatch: Drug["drugBatches"][0]) => (
          <DrugBatchRow
            drugBatch={drugBatch}
            drugId={drugId}
            drugName={drugName}
            scrud={scrud}
          />
        ))
      )}
    </tbody>
  );
};

export default DrugBatches;
