interface SeoArgs {
  description?: string;
  title: string;
}

type MetaTag = { title: string } | { content: string; name: string };

export const seo = ({ description, title }: SeoArgs): Array<MetaTag> => {
  const tags: Array<MetaTag> = [
    { title },
    { content: 'website', name: 'og:type' },
    { content: title, name: 'og:title' },
    { content: 'summary', name: 'twitter:card' },
    { content: title, name: 'twitter:title' },
  ];

  if (description) {
    tags.push(
      { content: description, name: 'description' },
      { content: description, name: 'og:description' },
      { content: description, name: 'twitter:description' },
    );
  }

  return tags;
};
