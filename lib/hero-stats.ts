export type HeroStatItem = {
  value: string;
  label: string;
};

export async function getHeroStats(): Promise<HeroStatItem[] | null> {
  return [
    { value: "6000+", label: "Students enrolled" },
    { value: "98%", label: "Certification pass rate" },
    { value: "40+", label: "Industry courses" },
    { value: "4.8*", label: "Average rating" },
  ];
}
