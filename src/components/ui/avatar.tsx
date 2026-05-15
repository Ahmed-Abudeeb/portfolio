"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { src?: string; alt?: string; fallback?: string }
>(({ className, src, alt, fallback, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full bg-slate-100", className)}
    {...props}
  >
    {src ? (
      <img src={src} alt={alt || ""} className="aspect-square h-full w-full object-cover" />
    ) : (
      <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-500">
        {fallback || "?"}
      </span>
    )}
  </div>
));
Avatar.displayName = "Avatar";

export { Avatar };
