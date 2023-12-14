export function formatError(string: string) {
  console.error(string);

  if (string.includes("REFERENCE constraint")) {
    return "This item is currently in use.";
  }

  if (string.includes("'.") && string.includes("'")) {
    return string.split("'.")[0].split("'")[1];
  }

  return string;
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatShortDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

export function formatDate(date: Date) {
  const dateString = date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
  });

  return capitalize(dateString);
}

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(price);
}

export async function parseSqlJson(sqlJson: { [key: string]: string }) {
  return (
    await JSON.parse(
      sqlJson["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"],
      (_: any, value: any) => {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return new Date(value);
        }

        return value;
      }
    )
  )[0];
}

export function validateForm(
  removeError: boolean = false,
  error: string = "error"
) {
  return `
    htmx:before-request:
      if (!this.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.classList.add('was-validated');
      ${removeError && `document.querySelector('#${error}').innerHTML = '';`}

    htmx:after-request:
      if (400 <= event.detail.xhr.status) {
        document.querySelector('#${error}').style.color = '';
      }
      else {
        document.querySelector('#${error}').innerHTML = '';
      }

      setTimeout(() => document.querySelector('#status').innerHTML = '', 2000)
  `;
}
