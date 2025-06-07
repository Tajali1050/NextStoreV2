import { Compare } from "@/components/ui/compare";

interface CompareDemoProps {
  firstImage?: string;
  secondImage?: string;
}

export function CompareDemo({ firstImage, secondImage }: CompareDemoProps) {
  if (!firstImage || !secondImage) return null;

  console.log("firstImage", firstImage);
  console.log("secondImage", secondImage);

  return (
    <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
      <Compare
        firstImage={firstImage}
        secondImage={secondImage}
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[250px] w-[100%] md:h-[500px] md:w-[100%]"
        slideMode="hover"
      />
    </div>
  );
}
