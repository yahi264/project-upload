import Image from "next/image";
import type { Img as ImgData } from "@/lib/catalog";

// Product photo: responsive, served as AVIF/WebP at the right size,
// with the photo's own average colour shown while it loads.
export function Img({
  img,
  alt,
  sizes,
  priority = false,
  quality = 85,
  className = "",
}: {
  img: ImgData;
  alt: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
  className?: string;
}) {
  return (
    <Image
      src={img.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      style={{ backgroundColor: img.color }}
      className={`object-cover ${className}`}
    />
  );
}
