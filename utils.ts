export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
