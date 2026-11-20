export const MAX_REQUESTED_QUANTITY = 99;

export function getUnitPriceNgn(): number | null {
  const value = process.env.CLEVIRA_UNIT_PRICE_NGN?.trim();
  if (!value) return null;
  if (!/^[1-9]\d*$/.test(value)) {
    throw new Error("CLEVIRA_UNIT_PRICE_NGN must be a positive whole number of naira.");
  }

  const price = Number(value);
  if (!Number.isSafeInteger(price) || price > Math.floor(Number.MAX_SAFE_INTEGER / MAX_REQUESTED_QUANTITY)) {
    throw new Error("CLEVIRA_UNIT_PRICE_NGN is outside the supported price range.");
  }
  return price;
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
