import * as elements from "typed-html";

const Patient = () => {
  return (
    <div class="max-w-xl container pt-4">
      <h1>Patients</h1>
      <form>
        <div class="input-group my-3">
          <input type="text" class="form-control" placeholder="0903617711" />
          <button class="btn btn-primary">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Phone</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              name: "Alice",
              phone: "0903617711",
            },
            {
              name: "Bob",
              phone: "0903617711",
            },
            {
              name: "Charlie",
              phone: "0903617711",
            },
            {
              name: "David",
              phone: "0903617711",
            },
            {
              name: "Eva",
              phone: "0903617711",
            },
          ].map(({ name, phone }) => (
            <tr class="align-middle">
              <td>{phone}</td>
              <td>
                <a class="link-primary" href="/users/profile">
                  {name}
                </a>
              </td>
              <td>
                <a
                  role="button"
                  class="btn btn-primary"
                  href="/dentists/addTreatment"
                >
                  <i class="bi bi-plus"></i> Treatment
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patient;
