import Home2Main from './components/home2/Home2Main';

const siteUrl = 'https://www.dholeratimes.com';
const logoUrl = 'https://www.dholeratimes.com/dtlogo.png';

const jsonLd = (data) => {
  return JSON.stringify(data).replace(/</g, '\\u003c');
};

const corporationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Corporation',
  name: 'Dholera Times',
  alternateName: 'DT',
  url: `${siteUrl}/`,
  logo: logoUrl,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '620, JMD Megapolis, Sohna Rd, Sector 48',
    addressLocality: 'Gurgaon',
    addressRegion: 'Haryana',
    postalCode: '122001',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61572970112485',
    'https://www.instagram.com/dholeratimes/',
    'https://www.youtube.com/@dholeratimes',
    'https://x.com/dholeratimes',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dholera Times',
  url: `${siteUrl}/`,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const realEstateAgentSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Dholera Times',
  url: siteUrl,
  logo: logoUrl,
  image: logoUrl,
  priceRange: 'from ₹10 Lakh',
  telephone: '+91 99589 93549',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '620, JMD Megapolis, Sohna Rd, Sector 48',
    addressLocality: 'Gurgaon',
    addressRegion: 'Haryana',
    postalCode: '122001',
    addressCountry: 'IN',
  },
  areaServed: {
    '@type': 'Place',
    name: 'Dholera Smart City',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Dholera Smart City Completed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dholera Smart City is currently under development. Phase 1 infrastructure is nearing completion, and full development is planned in phases up to 2040. Key infrastructure such as roads, power, water supply, and the activation area is progressing rapidly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Dholera Smart City a good investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Dholera is considered a promising long-term investment due to rapid infrastructure development, government support, and increasing industrial interest. Land prices are comparatively lower today, offering strong potential for future returns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Dholera bigger than Delhi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dholera Special Investment Region covers around 920 sq km. The planned urban development area of Dholera is about 500 sq km, positioning it among India’s largest planned smart city regions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Tata investing in Dholera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the Tata Group has announced major investments in Dholera, including India’s first semiconductor manufacturing plant, renewable energy initiatives, and advanced electronics manufacturing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the distance between Dholera Smart City and Ahmedabad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dholera is approximately 100 km from Ahmedabad. The Ahmedabad–Dholera Expressway is expected to reduce travel time significantly, with future connectivity improvements also proposed.',
      },
    },
  ],
};

export const metadata = {
  title: 'Dholera Smart City Gujarat | News, Projects & Plot Investment',
  description:
    'Exclusive residential plots in Dholera Smart City Gujarat! Close to Dholera SIR & International Airport. Book now for high returns!',
  alternates: {
    canonical: siteUrl,
  },
};

export const revalidate = 3600;

export default function Page() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(corporationSchema),
        }}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(websiteSchema),
        }}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(realEstateAgentSchema),
        }}
      />

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: jsonLd(faqSchema),
        }}
      />

      <Home2Main />
    </>
  );
}