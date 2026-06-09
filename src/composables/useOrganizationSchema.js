export function useOrganizationSchema() {
  // Build breadcrumbs dynamically based on the current route path
  const getBreadcrumbs = (to, baseUrl) => {
    const segments = to.path.split("/").filter(Boolean);
    const breadcrumbs = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ];

    segments.forEach((segment, index) => {
      const name =
        segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
        "Home";
      const itemUrl = `${baseUrl}/${segments.slice(0, index + 1).join("/")}`;
      breadcrumbs.push({
        "@type": "ListItem",
        position: index + 2,
        name,
        item: itemUrl,
      });
    });

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs,
    };
  };
  const getJsonLd = (to, baseUrl) => {
    const canonicalUrl = `${baseUrl}${to.path}`;
    const { country, league, matchSlug } = to.params;

    switch (to.name) {
      case "home":
      case "home-page":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "7bet",
          url: baseUrl,
          description:
            "7bet is Kenya’s most trusted online sports betting and casino platform, offering live sports, virtuals, and instant payouts via M-Pesa.",
          inLanguage: "en-KE",
          publisher: {
            "@type": "Organization",
            name: "7bet",
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/sports/{search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        };

      case "sports":
        return {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Sports Betting - 7bet",
          description:
            "Bet on football, basketball, tennis, and other sports with live odds and instant updates on 7bet.",
          url: canonicalUrl,
          about: {
            "@type": "SportsOrganization",
            name: "7bet Sportsbook",
            sport: "Football, Basketball, Tennis, Rugby, Cricket",
          },
        };
      case "match-details":
        // Extract match info from route params
        return {
          "@context": "https://schema.org",
          "@type": "SportsEvent",
          name:
            matchSlug
              ?.replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase()) || "Sports Match",
          url: canonicalUrl,
          eventStatus: "https://schema.org/EventScheduled",
          startDate: new Date().toISOString(), // you can replace with actual match start time
          location: {
            "@type": "Place",
            name:
              league
                ?.replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase()) || "League",
            address: {
              "@type": "PostalAddress",
              addressCountry:
                country?.toUpperCase() === "ENGLAND"
                  ? "GB"
                  : country?.substring(0, 2).toUpperCase() || "KE",
            },
          },
          competitor: [
            {
              "@type": "SportsTeam",
              name:
                matchSlug
                  ?.split("-vs-")[0]
                  ?.replace(/-/g, " ")
                  ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Team A",
            },
            {
              "@type": "SportsTeam",
              name:
                matchSlug
                  ?.split("-vs-")[1]
                  ?.replace(/-/g, " ")
                  ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Team B",
            },
          ],
          offers: {
            "@type": "Offer",
            url: canonicalUrl,
            price: "0.00",
            priceCurrency: "UGX",
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
            description: `Bet on ${matchSlug
              ?.replace(/-/g, " ")
              ?.replace(/\b\w/g, (c) => c.toUpperCase())} on 7bet.`,
          },
          organizer: {
            "@type": "Organization",
            name: "7bet",
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
          },
        };

      case "live":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Live Betting - 7bet",
          description:
            "Enjoy live betting on ongoing sports matches with real-time odds and cash out options.",
          url: canonicalUrl,
          about: {
            "@type": "SportsEvent",
            name: "Live Matches",
            eventStatus: "https://schema.org/EventInProgress",
          },
        };

      case "casino":
      case "new-games":
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Online Casino - 7bet",
          description:
            "Play exciting online casino games including slots, roulette, and aviator at 7bet.",
          url: canonicalUrl,
          mainEntity: {
            "@type": "Game",
            name: "7bet Casino Games",
            applicationCategory: "Game",
            operatingSystem: "Web",
          },
        };

      case "promotions":
        return {
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          name: "7bet Promotions & Bonuses",
          description:
            "Explore 7bet promotions including free bets, deposit bonuses, and cashback offers.",
          url: canonicalUrl,
          itemListElement: [
            {
              "@type": "Offer",
              name: "Free Bet Bonus",
              description:
                "Register now and get a free bet bonus on your first deposit.",
              url: `${baseUrl}/promotions/free-bet`,
              price: "0",
              priceCurrency: "UGX",
              availability: "https://schema.org/InStock",
            },
          ],
        };

      case "contact":
      case "profile":
      case "self-exclusion":
        return {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact 7bet Support",
          description:
            "Get help and support for your 7bet account, deposits, withdrawals, and betting issues.",
          url: canonicalUrl,
          mainEntity: {
            "@type": "Organization",
            name: "7bet",
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+254111060000",
              contactType: "Customer Support",
              areaServed: "KE",
              availableLanguage: ["English", "Swahili"],
            },
          },
        };

      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: to.meta.title || "7bet",
          description:
            to.meta.description ||
            "7bet offers sports betting, live games, virtuals, and casino entertainment in Kenya.",
          url: canonicalUrl,
        };
    }
  };

  const combinedSchemas = (to, baseUrl) => [
    getJsonLd(to, baseUrl),
    getBreadcrumbs(to, baseUrl),
  ];

  return {
    getJsonLd,
    combinedSchemas,
  };
}
