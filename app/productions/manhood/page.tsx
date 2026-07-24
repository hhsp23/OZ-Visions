import type { Metadata } from "next";
import { ProductionDetail } from "../ProductionDetail";
import { productions } from "../../site-data";

const production = productions[0];

export const metadata: Metadata = {
  title: `${production.title} | OZ Visions USA`,
  description: production.description,
};

export default function ManhoodPage() {
  return <ProductionDetail production={production} />;
}
