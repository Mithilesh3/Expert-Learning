import { buildMetadata } from "@/lib/metadata";
import { CorporateProgramsSection } from "@/components/corporate/corporate-programs-section";

export const metadata = buildMetadata({
  title: "Corporate Training | GenZNext Research & Training",
  description:
    "Corporate cloud, AI, and DevOps training solutions for modern teams and enterprise capability building.",
  path: "/corporate-training",
});

export default function CorporateTrainingPage() {
  return (
    <>
      <CorporateProgramsSection />
    </>
  );
}
