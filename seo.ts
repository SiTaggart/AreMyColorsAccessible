interface SeoOptions {
  title?: string;
  description: string;
}

interface SeoMeta {
  title?: string;
  name?: string;
  content: string;
}

const siteTitle = "Are My Colours Accessible";

export const seo = ({ title = siteTitle, description }: SeoOptions): Array<SeoMeta> => [
  { title, content: title },
  { name: "description", content: description },
  { name: "og:title", content: title },
  { name: "og:description", content: description },
  { name: "twitter:card", content: "summary" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
];
