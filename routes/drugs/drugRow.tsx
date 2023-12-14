import * as elements from "typed-html";
import { Drug } from "../../types";

type DrugRowProps = elements.Children & {
  drug: Drug;
  scrud?: string;
};

const DrugRow = ({ drug, scrud = "false", children }: DrugRowProps) => {
  return (
    <tr class="align-middle">
      <td>
        <a
          hx-post="/drugs/details"
          hx-include="this"
          hx-target="#drugInfoModalModal .modal-body"
          role="button"
          data-toggle="modal"
          data-target="#drugInfoModalModal"
          class="link-primary"
        >
          {drug.name}
          <input type="hidden" name="id" value={drug.id} />
          <input type="hidden" name="scrud" value={scrud} />
        </a>
        <br></br>
        <span class="invalid-feedback d-inline">
          <span id={`drug-${drug.name}-error`}></span>
        </span>
        {children}
      </td>
      <td>{drug.name.slice(0, 3).toUpperCase()}</td>
      {scrud === "true" ? (
        <td>
          <button
            class="btn btn-danger text-white"
            hx-post="/drugs/removeDrug"
            hx-include="this"
            hx-target="#drug-search-result"
            hx-target-error={`#drug-${drug.name}-error`}
            hx-swap="outerHTML"
            role="button"
          >
            <i class="bi bi-trash"></i>
            <input type="hidden" name="id" value={drug.id} />
          </button>
        </td>
      ) : (
        ""
      )}
    </tr>
  );
};

export default DrugRow;
