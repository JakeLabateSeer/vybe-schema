import fs from "fs";
import path from "path";
import { parseStringPromise } from "xml2js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const brand = {
    website: "https://www.vybe.care",
    name: "Vybe Urgent Care",
    logo: "https://www.vybe.care/wp-content/uploads/2022/05/vybe-logo-r-stacked-rgb-color.svg",
    phone: "",
    country: "US",
    languages: [
        "Arabic", "English", "Chinese", "Dutch", "French",
        "German", "Italian", "Russian", "Portuguese", "Spanish"
    ],
    socials: [
        "https://www.facebook.com/vybecare/",
        "https://www.instagram.com/vybecare/",
        "https://www.linkedin.com/company/vybecare/",
        "https://globalphiladelphia.org/organizations/vybe-urgent-care",
        "https://www.healthgrades.com/group-directory/pa-pennsylvania/philadelphia/vybe-urgent-care-xyntlt"
    ]
};
const locations = {
    "bensalem": {
        name: "Bensalem",
        url: "https://www.vybe.care/locations/bensalem/",
        phone: "267-799-1519",
        address: {
            street: "3626 Street Rd",
            city: "Bensalem",
            state: "PA",
            zip: "19020"
        }
    },
    "blue-bell": {
        name: "Blue Bell",
        url: "https://www.vybe.care/locations/blue-bell/",
        phone: "267-518-6946",
        address: {
            street: "920 Dekalb Pike unit 100",
            city: "Blue Bell",
            state: "PA",
            zip: "19422"
        }
    },
    "brookhaven": {
        name: "Brookhaven",
        url: "https://www.vybe.care/locations/brookhaven/",
        phone: "610-876-3072",
        address: {
            street: "4808 Edgmont Avenue",
            city: "Brookhaven",
            state: "PA",
            zip: "19015"
        }
    },
    "center-city": {
        name: "Center City",
        url: "https://www.vybe.care/locations/center-city/",
        phone: "215-398-4791",
        address: {
            street: "1420 Chestnut St",
            city: "Philadelphia",
            state: "PA",
            zip: "19102"
        }
    },
    "center-city-east": {
        name: "Center City East",
        url: "https://www.vybe.care/locations/center-city-east/",
        phone: "215-709-8810",
        address: {
            street: "618 Market St",
            city: "Philadelphia",
            state: "PA",
            zip: "19106"
        }
    },
    "havertown": {
        name: "Havertown",
        url: "https://www.vybe.care/locations/havertown/",
        phone: "215-273-9266",
        address: {
            street: "1305 West Chester Pike",
            city: "Havertown",
            state: "PA",
            zip: "19083"
        }
    },
    "northeast-philly": {
        name: "Northeast Philadelphia",
        url: "https://www.vybe.care/locations/northeast-philly/",
        phone: "267-953-8776",
        address: {
            street: "7390 Bustleton Ave",
            city: "Philadelphia",
            state: "PA",
            zip: "19152"
        }
    },
    "pcom": {
        name: "PCOM",
        url: "https://www.vybe.care/locations/pcom/",
        phone: "267-518-6949",
        address: {
            street: "4190 City Ave, Suite 101",
            city: "Philadelphia",
            state: "PA",
            zip: "19131"
        }
    },
    "port-richmond": {
        name: "Port Richmond",
        url: "https://www.vybe.care/locations/port-richmond/",
        phone: "215-960-9557",
        address: {
            street: "3356 Aramingo Ave",
            city: "Philadelphia",
            state: "PA",
            zip: "19134"
        }
    },
    "radnor": {
        name: "Radnor",
        url: "https://www.vybe.care/locations/radnor/",
        phone: "267-518-6951",
        address: {
            street: "599 Lancaster Ave",
            city: "St Davids",
            state: "PA",
            zip: "19087"
        }
    },
    "ridley": {
        name: "Ridley",
        url: "https://www.vybe.care/locations/ridley/",
        phone: "215-273-9303",
        address: {
            street: "213 Morton Ave",
            city: "Folsom",
            state: "PA",
            zip: "19033"
        }
    },
    "roxborough": {
        name: "Roxborough",
        url: "https://www.vybe.care/locations/roxborough/",
        phone: "215-709-9418",
        address: {
            street: "6060 Ridge Ave #100",
            city: "Philadelphia",
            state: "PA",
            zip: "19128"
        }
    },
    "south-philly": {
        name: "South Philadelphia",
        url: "https://www.vybe.care/locations/south-philly/",
        phone: "215-709-9107",
        address: {
            street: "1217 S Broad St",
            city: "Philadelphia",
            state: "PA",
            zip: "19147"
        }
    },
    "spring-garden": {
        name: "Spring Garden",
        url: "https://www.vybe.care/locations/spring-garden/",
        phone: "267-728-4033",
        address: {
            street: "1500 Spring Garden St Ste R105",
            city: "Philadelphia",
            state: "PA",
            zip: "19130"
        }
    },
    "university-city": {
        name: "University City",
        url: "https://www.vybe.care/locations/university-city/",
        phone: "215-709-8573",
        address: {
            street: "3550 Market St, Ste 102",
            city: "Philadelphia",
            state: "PA",
            zip: "19104"
        }
    },
    "west-philly": {
        name: "West Philadelphia",
        url: "https://www.vybe.care/locations/west-philly/",
        phone: "267-518-6954",
        address: {
            street: "5828 Market St",
            city: "Philadelphia",
            state: "PA",
            zip: "19139"
        }
    }
};

class SitemapToURLs {
    constructor(sitemapURL) {
        this.sitemapURL = sitemapURL;
        this.seenSitemaps = new Set();
    }

    async fetchAndParseSitemap(url) {
        try {
            const res = await fetch(url, {
                redirect: "follow",
                headers: {
                    "user-agent": "Mozilla/5.0 (compatible; LinkAuditBot/1.0; +https://example.com/bot)"
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const xml = await res.text();
            return await parseStringPromise(xml);
        } catch (err) {
            console.error(`Error fetching/parsing sitemap ${url}:`, err.message);
            return null;
        }
    }

    async extractUrlsFromParsedSitemap(parsed) {
        if (!parsed) return [];

        if (parsed.urlset?.url) {
            return parsed.urlset.url
                .map((entry) => entry.loc?.[0]?.trim())
                .filter(Boolean);
        }

        if (parsed.sitemapindex?.sitemap) {
            let allUrls = [];

            const nestedSitemaps = parsed.sitemapindex.sitemap
                .map((entry) => entry.loc?.[0]?.trim())
                .filter(Boolean);

            for (const sitemapUrl of nestedSitemaps) {
                if (this.seenSitemaps.has(sitemapUrl)) continue;
                this.seenSitemaps.add(sitemapUrl);

                const nestedParsed = await this.fetchAndParseSitemap(sitemapUrl);
                const nestedUrls = await this.extractUrlsFromParsedSitemap(nestedParsed);
                allUrls.push(...nestedUrls);
            }

            return allUrls;
        }

        return [];
    }

    async getSitemapData() {
        this.seenSitemaps.add(this.sitemapURL);
        const parsed = await this.fetchAndParseSitemap(this.sitemapURL);
        const urls = await this.extractUrlsFromParsedSitemap(parsed);
        return [...new Set(urls)];
    }
}

async function getUrlsFromSitemap(sitemapUrl) {
    const sitemapParser = new SitemapToURLs(sitemapUrl);
    return await sitemapParser.getSitemapData();
}

async function main() {

    const sitemap = "https://www.vybe.care/sitemap_index.xml";
    const urls = await getUrlsFromSitemap(sitemap);
    console.log(`Found ${urls.length} sitemap URLs`);

    const OUTPUT_DIR = path.join(__dirname, "schema-json");

    function slugToTitle(url) {
        const pathname = new URL(url).pathname;
        const parts = pathname.split("/").filter(Boolean);
        const last = parts[parts.length - 1] || "home";
        return last
            .replace(/-/g, " ")
            .replace(/\b\w/g, char => char.toUpperCase());
    }
    function safeFilename(url) {
        const u = new URL(url);
        const segments = u.pathname
            .split("/")
            .filter(Boolean)
            .map(segment => segment.replace(/[^\w.-]+/g, "-"));

        if (segments.length === 0) return "home.json";

        const lastSegment = segments[segments.length - 1];
        const parentSegments = segments.slice(0, -1);
        const filePart = lastSegment.endsWith(".json") ? lastSegment : `${lastSegment}.json`;

        return [...parentSegments, filePart].join("/");
    }
    function detectPageType(url) {
        const pathname = new URL(url).pathname;
        if (pathname.startsWith("/services/")) return "service";
        if (pathname.startsWith("/locations/")) return "location";
        if (pathname.startsWith("/category/")) return "category";
        if (pathname === "/blog/" || pathname.startsWith("/blog/")) return "blog";
        if (/\/\d{4}\//.test(pathname)) return "blog";
        return "global";
    }

    function getLocationSlug(url) {
        const parts = new URL(url).pathname.split("/").filter(Boolean);
        // parts[0] === "locations", parts[1] === slug
        return parts[1] || null;
    }

    function buildBaseGraph(page) {
        return {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": `${brand.website}#organization`,
                    "url": brand.website,
                    "name": brand.name,
                    logo: {
                        "@type": "ImageObject",
                        "@id": `${brand.website}#logo`,
                        "name": brand.name + " logo",
                        "url": brand.logo,
                        "contentUrl": brand.logo
                    },
                    sameAs: brand.socials,
                    contactPoint: {
                        "@type": "ContactPoint",
                        "@id": `${brand.website}#contactpoint`,
                        "url": brand.website,
                        "name": brand.name + " contact point",
                        telephone: brand.phone,
                        contactType: "customer service",
                        areaServed: brand.country,
                        availableLanguage: brand.languages
                    }
                },
                {
                    "@type": "WebSite",
                    "@id": `${brand.website}#website`,
                    "url": brand.website,
                    "name": brand.name,
                    publisher: {
                        "@id": `${brand.website}#organization`
                    },
                    potentialAction: {
                        "@type": "SearchAction",
                        "@id": `${brand.website}#searchaction`,
                        "name": "Search",
                        target: `${brand.website}/?s={search_term_string}`,
                        "query-input": "required name=search_term_string"
                    }
                },
                {
                    "@type": "WebPage",
                    "@id": `${page.url}#webpage`,
                    "url": page.url,
                    "name": page.title,
                    description: page.description,
                    isPartOf: {
                        "@id": `${brand.website}#website`
                    },
                    about: {
                        "@id": `${brand.website}#organization`
                    },
                    breadcrumb: {
                        "@id": `${page.url}#breadcrumb`
                    }
                },
                buildBreadcrumb(page)
            ]
        };
    }
    function buildBreadcrumb(page) {
        const u = new URL(page.url);
        const parts = u.pathname.split("/").filter(Boolean);

        if (parts.length === 0) {
            return {
                "@type": "BreadcrumbList",
                "@id": `${page.url}#breadcrumb`,
                "url": page.url,
                "name": "Home",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        "@id": `${page.url}#breadcrumb_listitem`,
                        "url": brand.website,
                        item: brand.website,
                        name: "Home",
                        position: 1,
                    }
                ]
            };
        }

        const itemListElement = [];

        let currentPath = "";
        parts.forEach((part, index) => {
            currentPath += `/${part}`;
            itemListElement.push({
                "@type": "ListItem",
                "@id": `${page.url}#breadcrumb-listitem`,
                "url": `${brand.website}${currentPath}/`,
                "item": `${brand.website}${currentPath}/`,
                name: part.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
                position: index + 1,
            });
        });

        return {
            "@type": "BreadcrumbList",
            "@id": `${page.url}#breadcrumb`,
            "url": page.url,
            itemListElement
        };
    }

    function buildServiceSchema(page) {
        return {
            "@type": "Service",
            "@id": `${page.url}#service`,
            "url": page.url,
            "name": page.title,
            serviceType: page.title,
            description: page.description,
            provider: {
                "@id": `${brand.website}#organization`
            },
            areaServed: {
                "@type": "AdministrativeArea",
                "@id": `${brand.website}#administrativearea`,
                "name": "Greater Philadelphia Area"
            }
        };
    }
    function buildBlogPostingSchema(page) {
        return {
            "@type": "BlogPosting",
            "@id": `${page.url}#blogposting`,
            "url": page.url,
            "name": page.title,
            headline: page.title,
            description: page.description,
            mainEntityOfPage: { "@id": `${page.url}#webpage` },
            author: {
                "@type": "Organization",
                "@id": `${brand.website}#organization`,
                "url": brand.website,
                "name": brand.name
            },
            publisher: {
                "@id": `${brand.website}#organization`
            }
        };
    }
    function buildCategorySchema(page) {
        return {
            "@type": "CollectionPage",
            "@id": `${page.url}#collectionpage`,
            "url": page.url,
            "name": page.title,
            description: page.description,
            isPartOf: {
                "@id": `${brand.website}#website`
            },
            mainEntity: {
                "@type": "ItemList",
                "@id": `${page.url}#itemlist`,
                name: page.title
            }
        };
    }
    function buildLocationSchema(page) {
        const slug = getLocationSlug(page.url);
        const loc = locations[slug];

        // Fall back to generic if slug not found in our data
        if (!loc) {
            return {
                "@type": "MedicalBusiness",
                "@id": `${page.url}#medicalbusiness`,
                "url": page.url,
                "name": page.title,
                telephone: brand.phone,
                parentOrganization: {
                    "@id": `${brand.website}#organization`
                },
                address: {
                    "@type": "PostalAddress",
                    "@id": `${page.url}#postaladdress`,
                    "url": brand.website,
                    "name": brand.name,
                    addressRegion: "PA",
                    addressCountry: "US"
                },
                areaServed: {
                    "@type": "Place",
                    "@id": `${page.url}#place`,
                    "url": page.url,
                    name: page.title
                }
            };
        }

        return {
            "@type": "MedicalBusiness",
            "@id": `${page.url}#medicalbusiness`,
            "url": loc.url,
            "name": ` ${loc.name}, ${brand.name}`,
            telephone: loc.phone,
            parentOrganization: {
                "@id": `${brand.website}#organization`
            },
            address: {
                "@type": "PostalAddress",
                "@id": `${page.url}#postaladdress`,
                "url": page.url,
                "name": loc.name,
                streetAddress: loc.address.street,
                addressLocality: loc.address.city,
                addressRegion: loc.address.state,
                postalCode: loc.address.zip,
                addressCountry: "US"
            },
            areaServed: {
                "@type": "Place",
                "@id": `${page.url}#place`,
                "url": page.url,
                name: loc.name
            }
        };
    }

    function buildSchemaForUrl(url) {
        const pageType = detectPageType(url);
        const slug = getLocationSlug(url);
        const loc = pageType === "location" && slug ? locations[slug] : null;

        const page = {
            url,
            title: loc ? `${loc.name} Urgent Care` : slugToTitle(url),
            description: loc
                ? `${brand.name} - ${loc.name} | ${loc.address.street}, ${loc.address.city}, ${loc.address.state} ${loc.address.zip}`
                : `${slugToTitle(url)} | ${brand.name}`,
            type: pageType
        };

        const schema = buildBaseGraph(page);

        if (pageType === "service") schema["@graph"].push(buildServiceSchema(page));
        if (pageType === "blog") schema["@graph"].push(buildBlogPostingSchema(page));
        if (pageType === "category") schema["@graph"].push(buildCategorySchema(page));
        if (pageType === "location") schema["@graph"].push(buildLocationSchema(page));

        return schema;
    }
    function saveSchemas() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        urls.forEach(url => {
            const schema = buildSchemaForUrl(url);
            const filename = safeFilename(url);
            const filepath = path.join(OUTPUT_DIR, filename);

            fs.mkdirSync(path.dirname(filepath), { recursive: true });
            fs.writeFileSync(filepath, JSON.stringify(schema, null, 2), "utf8");

            console.log(`Saved: ${filepath}`);
        });

        console.log(`Done. Created ${urls.length} schema JSON files.`);
    }

    saveSchemas();
}

main().catch(console.error);
