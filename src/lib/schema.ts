import { site } from "../config/site";

type Json = Record<string, unknown>;

const business = {
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: site.brand,
  legalName: site.legalName,
  url: site.url,
  image: `${site.url}/logo.png`,
  telephone: site.phone,
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.5726,
    longitude: 88.4165,
  },
  areaServed: site.areasServed.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
  ...(site.social.length ? { sameAs: site.social } : {}),
};

export const organizationSchema: Json = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.brand,
  legalName: site.legalName,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logo.png`,
  },
  founder: { "@type": "Person", name: site.ceo },
};

export const localBusinessSchema: Json = {
  ...business,
  "@type": "LocalBusiness",
  "@id": `${site.url}/#localbusiness`,
  name: `${site.brand} — ${site.address.locality}`,
  priceRange: "Contact for quote",
};

export const websiteSchema: Json = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.brand} — ${site.slogan}`,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-IN",
};

export const breadcrumbSchema = (
  items: { label: string; href?: string }[]
): Json => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    ...(item.href ? { item: `${site.url}${item.href}` } : {}),
  })),
});

export const serviceSchema = (options: {
  name: string;
  description: string;
  path: string;
  image: string;
}): Json => ({
  "@type": "Service",
  "@id": `${site.url}${options.path}#service`,
  name: options.name,
  description: options.description,
  url: `${site.url}${options.path}`,
  image: `${site.url}${options.image}`,
  provider: { "@id": `${site.url}/#localbusiness` },
  areaServed: site.areasServed.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  })),
});

export const faqSchema = (items: readonly { q: string; a: string }[]): Json => ({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export const collectionSchema = (options: {
  name: string;
  description: string;
  path: string;
  items: { id: string; name: string; url?: string }[];
}): Json => ({
  "@type": "ItemList",
  "@id": `${site.url}${options.path}#list`,
  name: options.name,
  description: options.description,
  numberOfItems: options.items.length,
  itemListElement: options.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${item.id} — ${item.name}`,
    ...(item.url ? { url: `${site.url}${item.url}` } : {}),
  })),
});
