"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
  defaultValue?: number;
  onRatingChange: (e: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RatingStars({ className, onRatingChange, defaultValue }: Props): React.ReactElement {
  const [rating, setRating] = useState<number>(defaultValue || 3);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className={cn("rating flex gap-2", className)}>
      {[1, 2, 3, 4, 5].map((value) => (
        <CheckboxStar key={value} checked={value <= rating} onClick={() => handleRatingChange(value)} />
      ))}
    </div>
  );
}

function CheckboxStar({ checked, ...restProps }: { checked: boolean } & React.HTMLAttributes<HTMLInputElement>) {
  if (checked) {
    return (
      <div className="inline-block" {...restProps}>
        <Star fill="#f59e0b" strokeWidth={0} />
      </div>
    );
  } else {
    return (
      <div className="inline-block" {...restProps}>
        <Star color="#f59e0b" strokeWidth={1.5} />
      </div>
    );
  }
}
