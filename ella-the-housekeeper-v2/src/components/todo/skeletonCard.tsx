import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({ className }: { className: string }) {
  return (
    <div className={"flex flex-col space-y-3 " + className}>
      <Skeleton className="w-[1050px] h-[350px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[1050px]" />
        <Skeleton className="h-4 w-[1000px]" />
        <Skeleton className="h-4 w-[850px]" />
        <Skeleton className="h-4 w-[800px]" />
        <Skeleton className="h-4 w-[1050px]" />
        <Skeleton className="h-4 w-[1000px]" />
      </div>
    </div>
  );
}
