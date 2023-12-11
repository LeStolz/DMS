import * as elements from "typed-html";
import { Drug } from "../../types";

type SearchResultProps = {
  scrud: string;
  drugs: Drug[];
};

const SearchResult = ({ scrud, drugs }: SearchResultProps) => {
  return (
    <tbody id="drug-search-result">
      {drugs.length === 0 ? (
        <tr class="text-center">
          <td colspan={5}>No drug found</td>
        </tr>
      ) : (
        drugs.map((drug) => (
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
            </td>
            <td>{drug.name.slice(0, 3).toUpperCase()}</td>
            {scrud === "true" ? (
              <td>
                <button class="btn btn-danger text-white">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            ) : (
              ""
            )}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default SearchResult;
