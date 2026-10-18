import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "./lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) return adminAuth(request);

  // Send visitors without a language in the URL to their browser's language.
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

function preferredLocale(request: NextRequest) {
  const saved = request.cookies.get("locale")?.value;
  if (saved && (locales as readonly string[]).includes(saved)) return saved;
  const header = request.headers.get("accept-language") ?? "";
  const wanted = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return wanted.find((w) => (locales as readonly string[]).includes(w.lang))?.lang ?? defaultLocale;
}

// Protects the requests dashboard with a username and password from .env.local.
function adminAuth(request: NextRequest) {
  const user = process.env.ADMIN_USER || "admin";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Set ADMIN_PASSWORD in .env.local to open the dashboard.", { status: 503 });
  }
  const [scheme, encoded] = (request.headers.get("authorization") ?? "").split(" ");
  if (scheme === "Basic" && encoded) {
    const [u, ...rest] = atob(encoded).split(":");
    if (u === user && rest.join(":") === password) return NextResponse.next();
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Hieron admin"' },
  });
}

export const config = {
  // Everything except API routes, Next.js internals and static files.
  matcher: ["/((?!api|_next|images|favicon|icon|.*\\..*).*)"],
};
