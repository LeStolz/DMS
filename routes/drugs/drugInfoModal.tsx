import * as elements from "typed-html";

const DrugInfoModal = ({ scrud = false }: { scrud?: boolean }) => {
  return (
    <div
      class="modal fade"
      id="drugInfoModalModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="drugInfoModalModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="drugInfoModalModalLabel">
              Amoxicillin
            </h4>
            <div class="d-flex align-items-center gap-3">
              <button
                type="button"
                class="close btn btn-light icon-h-sm icon-w-sm border-0 rounded-circle"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div class="modal-body">
            <div class="row p-2">
              <div class="w-100 row p-0 m-0 mb-3">
                <div class="col-6">
                  <label for="price" class="form-label">
                    Price
                  </label>
                  {scrud === true ? (
                    <input
                      type="text"
                      class="form-control"
                      name="price"
                      id="price"
                      value="30.000đ"
                    />
                  ) : (
                    <input
                      type="text"
                      class="form-control"
                      name="price"
                      id="price"
                      readonly=""
                      value="30.000đ"
                    />
                  )}
                </div>
                <div class="col-6">
                  <label for="unit" class="form-label">
                    Unit
                  </label>
                  {scrud === true ? (
                    <input
                      type="text"
                      class="form-control"
                      name="unit"
                      id="unit"
                      value="Tablets"
                    />
                  ) : (
                    <input
                      type="text"
                      class="form-control"
                      name="unit"
                      id="unit"
                      readonly=""
                      value="Tablets"
                    />
                  )}
                </div>
              </div>
              <div class="mb-3">
                <label for="directive" class="form-label">
                  Directive
                </label>
                {scrud === true ? (
                  <textarea
                    class="form-control"
                    name="directive"
                    id="directive"
                    rows="3"
                  >
                    Use for infections caused by susceptible bacteria,
                    gonorrhea, and gastroenteritis. Do not use for patients with
                    a history of allergy to any type of penicillin or any
                    ingredient of the drug.
                  </textarea>
                ) : (
                  <textarea
                    class="form-control"
                    name="directive"
                    id="directive"
                    rows="3"
                    readonly=""
                  >
                    Use for infections caused by susceptible bacteria,
                    gonorrhea, and gastroenteritis. Do not use for patients with
                    a history of allergy to any type of penicillin or any
                    ingredient of the drug.
                  </textarea>
                )}
              </div>
              <div class="mb-3">
                <label class="form-label">Drug Batches</label>
                <table class="table align-middle w-auto">
                  <thead>
                    <tr>
                      <th scope="col">Stock</th>
                      <th scope="col">Exp. Date</th>
                      {scrud === true ? <th scope="col">Action</th> : ""}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["10", "20/11/2023"],
                      ["13", "24/12/2023"],
                    ].map((drug) => (
                      <tr>
                        <td>{drug[0]}</td>
                        <td>{drug[1]}</td>
                        {scrud === true ? (
                          <td>
                            <button class="btn btn-danger text-white">
                              <i class="bi bi-trash"></i>
                            </button>
                          </td>
                        ) : (
                          ""
                        )}
                      </tr>
                    ))}
                    {scrud === true ? (
                      <tr>
                        <td colspan={5}>
                          <button
                            class="btn btn-primary w-100"
                            type="button"
                            data-dismiss="modal"
                            data-toggle="modal"
                            data-target="#drugBatchInfoModal"
                          >
                            <i class="bi bi-plus"></i> Drug Batch
                          </button>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </tbody>
                </table>
              </div>
              {scrud === true ? (
                <div class="d-grid gap-2">
                  <button
                    data-dismiss="modal"
                    class="close btn btn-danger text-white fw-bold fs-5 py-2 px-5 rounded-md"
                  >
                    Update Drug
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInfoModal;
