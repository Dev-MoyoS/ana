export const postListQuery = /* groq */ `
  *[_type == "post"] | order(publishedAt desc)[0...12]{
    _id,
    title,
    slug,
    publishedAt,
    "category": category->title,
    excerpt
  }
`;

