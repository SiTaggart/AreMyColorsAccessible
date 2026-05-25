interface SeoArgs {
  title: string;
  description?: string;
}

type MetaTag = { title: string } | { name: string; content: string };

export const seo = ({ title, description }: SeoArgs): MetaTag[] => {
  const tags: MetaTag[] = [
    { title },
    { name: 'og:type', content: 'website' },
    { name: 'og:title', content: title },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: title },
  ];

  if (description) {
    tags.push(
      { name: 'description', content: description },
      { name: 'og:description', content: description },
      { name: 'twitter:description', content: description }
    );
  }

  return tags;
};
