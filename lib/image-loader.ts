// Used only for the GitHub Pages copy: photos are served as-is from the site's folder.
export default function imageLoader({ src, width }: { src: string; width: number }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}?w=${width}`;
}
