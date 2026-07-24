export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function siteAsset(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}

export const siteHref = siteAsset;
