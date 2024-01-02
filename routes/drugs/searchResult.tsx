import * as elements from "typed-html";
import { Drug } from "../../types";
import DrugRow from "./drugRow";

type SearchResultProps = {
  scrud: string;
  drugs: Drug[];
};

const SearchResult = ({ scrud, drugs }: SearchResultProps) => {
  return (
    <tbody id="drug-search-result">
      {drugs.map((drug) => (
        <DrugRow drug={drug} scrud={scrud} />
      ))}
    </tbody>
  );
};

export default SearchResult;
