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
