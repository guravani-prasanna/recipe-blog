import { getBaseUrl } from "./utils";

export function generateSEO({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const baseUrl = getBaseUrl();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: "Recipe Blog",
      type: "article",
    },
  };
}
