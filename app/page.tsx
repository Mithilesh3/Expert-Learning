import { SummerTrainingPopup } from "@/components/home/summer-training-popup";
import { HeroSection } from "@/sections/home/hero-section";
import { StatsSection } from "@/sections/home/stats-section";
import { getOrganizationSchema } from "@/lib/schema";

export default function Home() {
  const schemas = [getOrganizationSchema()];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SummerTrainingPopup />
      <HeroSection />
      <StatsSection />
    </>
  );
}
