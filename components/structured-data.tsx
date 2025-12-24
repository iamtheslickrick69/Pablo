import { site } from "@/lib/cms"

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bunkerexcavation.com",
    "name": site.company.name,
    "image": "https://bunkerexcavation.com/whitelogo.png",
    "description": site.company.description,
    "url": "https://bunkerexcavation.com",
    "telephone": `+1${site.contact.phone}`,
    "email": site.contact.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": site.location.city,
      "addressRegion": site.location.state,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.0965",
      "longitude": "-113.5684"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "37.0965",
        "longitude": "-113.5684"
      },
      "geoRadius": "50000"
    },
    "founder": {
      "@type": "Person",
      "name": site.company.owner
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Excavation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Foundation Excavation",
            "description": "Professional foundation digging for residential and commercial buildings"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Basement Excavation",
            "description": "Expert basement excavation with drainage planning"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Site Work",
            "description": "Large-scale site preparation for commercial developments"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Land Grading",
            "description": "Professional land leveling for proper drainage"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Utility Trenching",
            "description": "Accurate trenching for water, sewer, and electrical systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Land Clearing",
            "description": "Complete lot clearing with tree removal and debris hauling"
          }
        }
      ]
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "14:00"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
