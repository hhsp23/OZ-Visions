import type { Metadata } from "next";
import { ProductionDetail } from "../ProductionDetail";
import { productions } from "../../site-data";

const production = productions[3];

export const metadata: Metadata = {
  title: `${production.title} | OZ Visions USA`,
  description: production.description,
};

export default function ThePrimusVoyagePage() {
  return <ProductionDetail production={production} />;
}
