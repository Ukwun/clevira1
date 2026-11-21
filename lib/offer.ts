export const PRODUCT_OFFERS = [
  {
    id: "one-bottle",
    label: "1 bottle",
    paidBottles: 1,
    freeBottles: 0,
    priceNgn: 21_500,
  },
  {
    id: "two-bottles",
    label: "2 bottles",
    paidBottles: 2,
    freeBottles: 0,
    priceNgn: 35_000,
  },
  {
    id: "three-plus-one",
    label: "3 bottles + 1 free",
    paidBottles: 3,
    freeBottles: 1,
    priceNgn: 48_000,
  },
  {
    id: "six-plus-two",
    label: "6 bottles + 2 free",
    paidBottles: 6,
    freeBottles: 2,
    priceNgn: 95_000,
  },
] as const;

export type ProductOffer = (typeof PRODUCT_OFFERS)[number];
export type ProductOfferId = ProductOffer["id"];

export function getProductOffer(value: unknown): ProductOffer | null {
  if (typeof value !== "string") return null;
  return PRODUCT_OFFERS.find((offer) => offer.id === value) ?? null;
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
