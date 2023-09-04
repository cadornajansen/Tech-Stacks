import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "./skeleton";

const CardSkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-lg" />

        <span className="font-bold space-y-2">
          <Skeleton className="w-20 h-5 rounded-lg" />

          <CardDescription className="font-medium">
            <Skeleton className="w-20 h-3 rounded-lg" />
          </CardDescription>
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="w-60 h-4 rounded-lg" />
      <Skeleton className="w-full h-4 rounded-lg" />
      <Skeleton className="w-full h-4 rounded-lg" />
      <Skeleton className="w-full h-4 rounded-lg" />
    </CardContent>
    <CardFooter className="flex items-center gap-2">
      <Skeleton className="w-28 h-6 rounded-lg" />
      <Skeleton className="w-28 h-6 rounded-lg" />
      <Skeleton className="w-36 h-6 rounded-lg" />
    </CardFooter>
  </Card>
);

export default CardSkeleton;
