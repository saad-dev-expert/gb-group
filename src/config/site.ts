/**
 * Single source of truth for GB GROUP brand, contact and integration settings.
 * Domain-specific values must only be edited here.
 */
export const site = {
  brand: "GB GROUP",
  legalName: "GB Group",
  url: "https://www.gbgroup.in",
  slogan: "Ek Chhat Ke Neeche 4 Badi Services",
  description:
    "GB GROUP is a multi-service consultancy and agency in Jharkhand and West Bengal, delivering Transport & Export, Education & Placement, Land Sales & Joint Ventures, and Advertisement & Marketing under one roof.",
  ceo: "Mohit Mallar",
  phone: "+917439786518",
  phoneDisplay: "74397 86518",
  whatsappNumber: "917439786518",
  email: "ceo@gbgroup.co.in",
  address: {
    street: "GC 50, Block Sector V",
    locality: "Kolkata",
    region: "West Bengal",
    postalCode: "700064",
    country: "IN",
    full: "GC 50, Block Sector V, Kolkata, West Bengal – 700064",
  },
  areasServed: ["Jharkhand", "West Bengal"],
  social: [] as string[],
  analyticsId: import.meta.env.PUBLIC_GA_ID || "",
  leadEndpoint: import.meta.env.PUBLIC_LEAD_ENDPOINT || "",
};

export const waLink = (text?: string) =>
  text
    ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${site.whatsappNumber}`;

export const telLink = `tel:${site.phone}`;
export const mailLink = `mailto:${site.email}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/land-joint-venture", label: "Properties" },
  { href: "/contact", label: "Contact" },
];

export type Service = {
  key: string;
  title: string;
  short: string;
  path: string;
  image: string;
  imageAlt: string;
  kicker: string;
  summary: string;
  accent: string;
};

export const services: Service[] = [
  {
    key: "education",
    title: "Education & Placement",
    short: "Admissions, career guidance and job placement.",
    path: "/services/education-placement",
    image: "/images/education-graduation.webp",
    imageAlt: "Graduates celebrating at a university campus",
    kicker: "Academics & careers",
    summary:
      "Course selection, admission support, career counselling and verified placement assistance for students and professionals.",
    accent: "#0f9f8f",
  },
  {
    key: "transport",
    title: "Transport & Export",
    short: "Move cargo across eastern India and to the ports.",
    path: "/services/transport-export",
    image: "/images/transport-fleet.webp",
    imageAlt: "Commercial freight truck on a highway",
    kicker: "Logistics & trade",
    summary:
      "Freight movement, industrial cargo and export coordination between Jharkhand, West Bengal and the Kolkata / Haldia ports.",
    accent: "#0284c7",
  },
  {
    key: "land",
    title: "Land Sales & Joint Ventures",
    short: "Verified land and transparent joint development.",
    path: "/services/land-joint-work",
    image: "/images/land-field.webp",
    imageAlt: "Open land at sunrise",
    kicker: "Property & partnerships",
    summary:
      "Clear-title land acquisition, plot sales and structured joint ventures between landowners and credible developers.",
    accent: "#b45309",
  },
  {
    key: "marketing",
    title: "Advertisement & Marketing",
    short: "Visibility that turns into real enquiries.",
    path: "/services/advertising-marketing",
    image: "/images/marketing-print.webp",
    imageAlt: "Marketing strategy material on a desk",
    kicker: "Growth & branding",
    summary:
      "Outdoor advertising, digital campaigns, print collateral, ground activation and brand identity for regional businesses.",
    accent: "#7c3aed",
  },
];

export type Listing = {
  id: string;
  area: string;
  location: string;
  state: "Jharkhand" | "West Bengal";
  size: string;
  purpose: string;
  category: "Commercial" | "Industrial" | "Logistics" | "Residential" | "Hospitality";
  type: string;
  detail: string;
  image: string;
};

export const listings: Listing[] = [
  {
    id: "GB-JV-01",
    area: "Sector V / Salt Lake, Kolkata",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    size: "35 Kathas (~0.58 acres)",
    purpose: "IT park / Grade-A office building",
    category: "Commercial",
    type: "Joint venture (50:50)",
    detail: "120 ft road frontage, beside established IT corridors, approvals in place.",
    image: "/images/property-kolkata.webp",
  },
  {
    id: "GB-JV-02",
    area: "Ring Road commercial zone, Ranchi",
    location: "Ranchi, Jharkhand",
    state: "Jharkhand",
    size: "5.5 acres (freehold)",
    purpose: "Logistics hub / warehousing / freight depot",
    category: "Logistics",
    type: "JV or outright sale",
    detail: "Four-lane highway access, demarcated boundary, non-encumbrance certified.",
    image: "/images/property-ranchi.webp",
  },
  {
    id: "GB-JV-03",
    area: "Adityapur industrial corridor, Jamshedpur",
    location: "Jamshedpur, Jharkhand",
    state: "Jharkhand",
    size: "2.8 acres",
    purpose: "Manufacturing plant / auto ancillary unit",
    category: "Industrial",
    type: "JV or direct sale",
    detail: "High-tension power nearby, industrial zoning approved, ready possession.",
    image: "/images/property-jamshedpur.webp",
  },
  {
    id: "GB-JV-04",
    area: "NH-19 expressway hub, Durgapur",
    location: "Durgapur, West Bengal",
    state: "West Bengal",
    size: "4 acres",
    purpose: "Showroom / commercial complex / motel",
    category: "Commercial",
    type: "Joint venture",
    detail: "High-visibility expressway frontage, level ground, strong traffic catchment.",
    image: "/images/property-durgapur.webp",
  },
  {
    id: "GB-JV-05",
    area: "GT Road bypass, Dhanbad",
    location: "Dhanbad, Jharkhand",
    state: "Jharkhand",
    size: "3.2 acres",
    purpose: "Mineral yard / transport depot",
    category: "Industrial",
    type: "Outright sale or JV",
    detail: "Clear ownership titles, wide heavy-vehicle access, close to industrial clusters.",
    image: "/images/property-dhanbad.webp",
  },
  {
    id: "GB-JV-06",
    area: "National Highway corridor, Howrah",
    location: "Howrah, West Bengal",
    state: "West Bengal",
    size: "80 Kathas (~1.32 acres)",
    purpose: "FMCG warehousing / light manufacturing",
    category: "Logistics",
    type: "Joint venture",
    detail: "Quick access to Kolkata, container accessibility, reliable water supply.",
    image: "/images/property-howrah.webp",
  },
  {
    id: "GB-JV-07",
    area: "Eastern bypass corridor, Siliguri",
    location: "Siliguri, West Bengal",
    state: "West Bengal",
    size: "3.5 acres",
    purpose: "Hospitality resort / educational campus",
    category: "Hospitality",
    type: "JV or sale",
    detail: "Foothill setting with connectivity towards Sikkim and the North-East.",
    image: "/images/property-siliguri.webp",
  },
];

export const faqs = {
  transport: [
    {
      q: "Which locations does GB GROUP transport to?",
      a: "We move goods across Jharkhand and West Bengal, with regular corridors through Ranchi, Jamshedpur, Dhanbad, Bokaro, Kolkata, Howrah, Durgapur and Siliguri, plus port links to Kolkata and Haldia.",
    },
    {
      q: "What kind of cargo can you handle?",
      a: "Industrial and steel cargo, raw materials and minerals, manufactured goods, FMCG, containerised freight and agricultural commodities. Share your cargo type in the enquiry for a precise answer.",
    },
    {
      q: "Do you assist with export documentation?",
      a: "Yes. We guide clients through invoices, packing lists, shipping bills, e-way bills and coordination with customs agents, port authorities and container yards.",
    },
    {
      q: "How quickly can I get a freight quote?",
      a: "Send your pickup point, delivery point and cargo details. Enquiries go straight to our team on WhatsApp and email for a direct response.",
    },
  ],
  education: [
    {
      q: "Which courses can GB GROUP guide me through?",
      a: "Engineering, management, computer applications, healthcare, law, design, humanities and diploma programmes, along with admission support in recognised institutions.",
    },
    {
      q: "Do you help with scholarships or education loans?",
      a: "We provide guidance on eligible scholarship schemes and education loan documentation. Eligibility depends on the institution and the student's profile.",
    },
    {
      q: "Is placement support guaranteed?",
      a: "We provide resume preparation, interview coaching and referrals to active hiring partners. Final selection is decided by the employer, so we do not promise guaranteed jobs.",
    },
    {
      q: "Can students from one state apply in the other?",
      a: "Yes. We regularly guide students from Jharkhand seeking colleges in West Bengal and vice versa.",
    },
  ],
  land: [
    {
      q: "How does a joint venture work?",
      a: "A landowner contributes the land and a developer funds and executes the project. Terms such as area or revenue sharing, timelines and security are documented in a JV agreement before work begins.",
    },
    {
      q: "What checks are done before a land deal?",
      a: "Deed chain and title verification, encumbrance checks, zoning and classification review, mutation records and boundary demarcation.",
    },
    {
      q: "Do you only handle large land parcels?",
      a: "No. Our current portfolio ranges from around 25 Kathas to 10+ acres across commercial, industrial, logistics and residential use cases.",
    },
    {
      q: "Can I list my own land with GB GROUP?",
      a: "Yes. Use the enquiry form on this page and include the location, approximate size and your preferred deal structure.",
    },
  ],
  marketing: [
    {
      q: "What does GB GROUP's advertising service include?",
      a: "Outdoor hoardings and print material, social and digital campaigns, on-ground activation, and brand identity work such as logos, profiles and signage.",
    },
    {
      q: "Which businesses do you work with?",
      a: "Retailers and showrooms, manufacturers, educational institutes, real estate developers, healthcare providers, startups and local service businesses.",
    },
    {
      q: "Can you run campaigns in both states?",
      a: "Yes. We plan and execute campaigns across Jharkhand and West Bengal, from city-level outdoor placements to local promotional drives.",
    },
    {
      q: "How do I get a campaign proposal?",
      a: "Share your business type, target cities and goal in the enquiry form. Our team will discuss scope and indicative costs directly with you.",
    },
  ],
} as const;
