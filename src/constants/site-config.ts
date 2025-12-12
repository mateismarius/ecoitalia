// constants.ts - Fisier de configurare centralizat pentru EcoItalia

export const SITE_CONFIG = {
    name: "EcoItalia",
    tagline: "Distribuitor oficial Freebubbles",
    description: "Branduri premium de curatenie si ingrijire personala din Italia",
    phone: "0739 77 88 77",
    email: "contact@ecoitalia.ro",
    shopUrl: "https://ecoitalia.ro/magazin",
    freeBubblesUrl: "https://freebubbles.ro",

    cities: {
        primary: ["Brasov", "Focsani"],
        secondary: ["Cluj-Napoca", "Bucuresti", "Timisoara"]
    },

    locations: [
        {
            city: "Brasov",
            address: "Str. Republican nr. 43",
            hours: "L-V: 9:00-18:00, S: 9:00-14:00",
            phone: "0739 77 88 77",
            email: "brasov@ecoitalia.ro",
            mapUrl: "https://maps.google.com/?q=Brasov+Republican+43"
        },
        {
            city: "Focsani",
            address: "Piata Moldovei, langa frizeria Sporul",
            hours: "L-V: 9:00-18:00, S: 9:00-14:00",
            phone: "0739 77 88 77",
            email: "focsani@ecoitalia.ro",
            mapUrl: "https://maps.google.com/?q=Focsani+Piata+Moldovei"
        }
    ],

    brands: {
        freebubbles: {
            name: "Freebubbles",
            country: "Italia",
            featured: true,
            url: "https://freebubbles.ro",
            logo: "/brands/freebubbles.png",
            description: "Detergenti la robinet, 90% biodegradabili, hipoalergenici, fabricati in Italia",
            features: [
                "90% biodegradabili",
                "Hipoalergenici si fara nichel",
                "Netestate pe animale",
                "Made in Italy",
                "Concept la robinet - fara risipa de ambalaje"
            ],
            categories: [
                "Detergenti de rufe",
                "Balsam de rufe",
                "Detergent vase",
                "Detergent podele",
                "Degresant",
                "Solutii curatare rosturi",
                "Sapun lichid",
                "Gel de dus",
                "Sampon si balsam"
            ]
        },
        premium: [
            {
                name: "Chanteclair",
                country: "Italia",
                logo: "/brands/chanteclair.png",
                description: "Brand italian premium de detergenti si produse de curatenie, cu peste 60 de ani de experienta",
                categories: ["Detergenti vase", "Degresanti", "Curatare suprafete"]
            },
            {
                name: "Tesori d'Oriente",
                country: "Italia",
                logo: "/brands/tesori.png",
                description: "Parfumuri orientale rafinate pentru rufe si ingrijire personala",
                categories: ["Parfumuri rufe", "Gel de dus", "Sapunuri lichide", "Creme"]
            },
            {
                name: "Clemente",
                country: "Italia",
                logo: "/brands/clemente.png",
                description: "Produse de curatenie profesionale din Italia",
                categories: ["Detergenti profesionali", "Solutii HORECA"]
            },
            {
                name: "Horomia",
                country: "Italia",
                logo: "/brands/horomia.png",
                description: "Parfumuri de ambient si odorizante premium",
                categories: ["Odorizante", "Parfumuri ambient", "Difuzoare"]
            }
        ],
        standard: [
            {
                name: "Misavan",
                country: "Romania",
                logo: "/brands/misavan.png",
                description: "Brand romanesc de incredere pentru produse de curatenie",
                categories: ["Detergenti", "Produse curatenie"]
            },
            {
                name: "Puresimple",
                country: "Romania",
                logo: "/brands/puresimple.png",
                description: "Solutii simple si eficiente pentru curatenie",
                categories: ["Detergenti ecologici", "Produse naturale"]
            },
            {
                name: "Sano",
                country: "Israel",
                logo: "/brands/sano.png",
                description: "Brand international recunoscut pentru calitate",
                categories: ["Detergenti", "Produse igienizare"]
            }
        ]
    },

    categories: [
        {
            name: "Produse de curatenie",
            description: "Detergenti, degresanti, solutii de curatare pentru casa si birou",
            icon: "🧹"
        },
        {
            name: "Parfumuri pentru rufe",
            description: "Balsamuri si parfumuri care lasa rufele proaspete si parfumate",
            icon: "🌸"
        },
        {
            name: "Ingrijire personala",
            description: "Sapunuri, geluri de dus, sampoane si produse de igiena",
            icon: "🧴"
        },
        {
            name: "Detergenti profesionali",
            description: "Solutii industriale pentru HORECA si firme de curatenie",
            icon: "💼"
        }
    ],

    b2bSectors: [
        {
            title: "HORECA",
            description: "Hoteluri, restaurante, cafenele",
            details: "Solutii complete pentru industria ospitalitatii: detergenti profesionali, produse de igienizare, solutii de curatare pentru bucatarii comerciale.",
            benefits: [
                "Preturi speciale pentru cantitati mari",
                "Livrari programate",
                "Consultanta specializata",
                "Produse certificate HACCP"
            ]
        },
        {
            title: "Spalatorii Auto",
            description: "Produse profesionale de curatare",
            details: "Detergenti concentrati, ceara auto, solutii pentru curatare interioare si exterioare.",
            benefits: [
                "Produse concentrate - eficienta maxima",
                "Stoc permanent disponibil",
                "Suport tehnic",
                "Raport calitate-pret excelent"
            ]
        },
        {
            title: "Firme de Curatenie",
            description: "Solutii complete pentru servicii",
            details: "Gama completa de detergenti profesionali, echipamente si consumabile pentru firme de curatenie.",
            benefits: [
                "Discount-uri pentru parteneri",
                "Livrare rapida",
                "Facturare flexibila",
                "Produse eficiente si economice"
            ]
        },
        {
            title: "Institutii Publice",
            description: "Comenzi prin SEAP",
            details: "Suntem inregistrati in Sistemul Electronic de Achizitii Publice. Oferim solutii pentru scoli, spitale, primarii.",
            benefits: [
                "Oferte personalizate SEAP",
                "Produse certificate UE",
                "Livrari contractuale",
                "Suport documentatie"
            ]
        }
    ],

    socialMedia: {
        facebook: "https://facebook.com/ecoitalia",
        instagram: "https://instagram.com/ecoitalia",
        linkedin: "https://linkedin.com/company/ecoitalia"
    },

    seo: {
        keywords: [
            "freebubbles romania",
            "detergenti biodegradabili",
            "produse curatenie italia",
            "detergenti ecologici brasov",
            "detergenti ecologici focsani",
            "comenzi seap detergenti",
            "produse horeca"
        ]
    }
};

