import { notFound } from "next/navigation";

// Any unknown address inside a language shows the localized 404 page.
export default function CatchAll() {
  notFound();
}
