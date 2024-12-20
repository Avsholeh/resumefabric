import { Skeleton } from "../ui/skeleton";

export default function LoadingResume() {
  return (
    <div className="h-screen w-full gap-3 md:gap-5 lg:flex lg:gap-7">
      <div className="flex h-[70%] w-full flex-col gap-3 lg:w-1/2">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-10 w-28 rounded-xl" />
          <div className="flex gap-3">
            <Skeleton className="hidden h-10 w-28 rounded-xl md:block" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-36 w-full rounded-xl" />
      </div>
      <div className="mb-3 hidden h-[70%] w-full md:flex lg:w-1/2">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
