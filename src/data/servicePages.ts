export type ServicePage = {
  slug: string;
  title: string;
  metaDescription: string;
  breadcrumb: string;
  heroLabel?: string;
  heroTitle: string;
  heroText: string;
  heroCta?: string;
  h1: string;
  intro: string[];
  image?: string;
  imageAlt?: string;
  /** Optional Overview-band photo; when set, hero keeps `image` and Overview uses this. */
  overviewImage?: string;
  overviewImageAlt?: string;
  sections: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    subBlocks?: { title: string; items: string[] }[];
  }[];
  faqs?: { q: string; a: string }[];
  ctaLabel?: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaButton?: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "custom-home-builder",
    title: "Custom Home Builder Richmond, TX | Contact Us Today!",
    metaDescription:
      "Professional custom home builder in Richmond, TX. 35+ years building dream homes. Call (281) 299-2309.",
    breadcrumb: "Custom Home Building",
    heroLabel: "Over 35 Years Of Experience",
    heroTitle: "We Build Your Dream Home",
    heroText:
      "At NWS Custom Homes and Remodeling, we work with you from start to finish to ensure your home is everything you've envisioned. Whether you're dreaming of something modern, traditional, or entirely unique, our team is ready to bring your ideas to life with expert craftsmanship and care.",
    h1: "Work With a Professional Custom Home Builder in Richmond, TX, and Fort Bend County",
    intro: [
      "As a custom home builder in Richmond, TX and Fort Bend County, we design and build homes around how you live, from first consult to final walkthrough.",
    ],
    image: "/images/custom-home-richmond-tx.jpg",
    imageAlt: "custom home building plan design on table with tools richmond tx",
    overviewImage: "/images/custom-homes-3.jpeg",
    overviewImageAlt:
      "Custom home exterior built by NWS in the Richmond, TX area",
    sections: [
      {
        heading: "A Space as Unique as You Are",
        paragraphs: [
          "Every home starts with a vision. As experienced custom home builders, we're here to help you create a living space that fits your life perfectly. Whether you're looking for a cozy retreat or a spacious estate, we design and build custom built homes that blend style, function, and quality. Our team takes the stress out of the process so you can enjoy the experience of building a truly custom home.",
        ],
      },
      {
        heading: "Custom vs. Production Homes: Pros, Cons & Top Texas Design Trends",
        paragraphs: [
          "When it comes to building your dream home, one of the first major decisions you'll face is choosing between a custom home and a production home. Both offer distinct advantages and drawbacks, depending on your lifestyle, timeline, and budget.",
          "At NWS Custom Homes and Remodeling, we've been helping homeowners throughout Richmond, TX, since 2007, turning ideas into beautifully designed spaces.",
        ],
      },
      {
        heading: "Custom Homes: Built Around You",
        paragraphs: [
          "A custom home gives you the freedom to design a one-of-a-kind space from the ground up. You choose the floor plan, layout, finishes, and every detail in between.",
        ],
        subBlocks: [
          {
            title: "Pros of Custom Built Homes",
            items: [
              "Personalization: Every aspect of your home is tailored to your taste.",
              "Quality and Craftsmanship: High-quality materials and precise workmanship.",
              "Unique Design: Build on any lot with an architectural style that fits you.",
              "Energy Efficiency and Modern Systems: Latest technologies and smart-home systems.",
            ],
          },
          {
            title: "Cons of Custom Built Homes",
            items: [
              "Longer Build Time: Process can take months or over a year.",
              "Higher Cost: Personalization comes at a price.",
              "Decision Fatigue: Endless choices without proper guidance.",
            ],
          },
        ],
      },
      {
        heading: "A Step-by-Step Custom Home Building Process",
        bullets: [
          "Initial Consultation: Discuss your vision, budget, and must-have features",
          "Floor Plan Development: Create a layout tailored to your lifestyle",
          "Design and Material Selection: Choose finishes, fixtures, and details",
          "Permitting and Approvals: Handle local permits and compliance",
          "Construction Phase: Manage framing, systems, and finishing",
          "Final Walkthrough: Review every detail for quality and satisfaction",
        ],
      },
      {
        heading: "Finding the Right Lot in Fort Bend County",
        paragraphs: [
          "Building a custom home starts long before construction begins. Selecting the right lot in Fort Bend County plays a major role in your home's design, cost, and long-term value.",
        ],
        bullets: [
          "Lot Size and Layout: Ensuring enough space for your home design, driveway, and outdoor features",
          "Zoning and Restrictions: Reviewing HOA guidelines and local building requirements",
          "Flood Zones and Drainage: Critical in Richmond, TX to prevent future issues",
          "Utilities and Site Prep: Access to water, sewer, and electrical connections",
        ],
      },
      {
        heading: "Top Design Trends for New Construction Homes in Texas",
        bullets: [
          "Open-Concept Living: Kitchen, dining, and living areas together for entertaining",
          "Outdoor Living Spaces: Outdoor kitchens, covered patios, and lounging areas",
          "Energy Efficiency: Solar panels, high-efficiency HVAC, and superior insulation",
          "Smart Home Integration: Automated lighting, security, and climate control",
          "Natural Finishes and Textures: Wood accents, stone surfaces, and earthy tones",
          "Spa-Inspired Bathrooms: Walk-in showers, freestanding tubs, and high-end finishes",
          "Functional Kitchens: Quartz countertops, custom cabinetry, and large islands",
        ],
      },
      {
        heading: "Production Homes: Convenient and Cost-Effective",
        paragraphs: [
          "Production homes, often built by larger home builders, are designed for efficiency and affordability with a set number of floor plans and finishes. They offer faster turnaround and more predictable pricing, but limited personalization compared to custom built homes.",
        ],
      },
      {
        heading: "Why Choose Us as Your Home Construction Partner?",
        paragraphs: [
          "We take pride in our commitment to quality, from premium materials to unmatched craftsmanship. As a leading home construction company in Richmond, we've completed a wide range of custom-built homes, each tailored to meet the unique goals of our clients. Our experienced construction contractors and dedicated team make your vision a reality while maintaining clear communication and high standards every step of the way.",
        ],
      },
      {
        heading: "Start Your Journey with a Professional Construction Company",
        paragraphs: [
          "Whether you have detailed architectural plans or just a vision in mind, we're here to guide you. Bring your ideas, and we'll handle the rest. As a full-service construction company, we work closely with you to ensure that every detail of your new home exceeds your expectations.",
        ],
      },
    ],
    faqs: [
      {
        q: "What's the difference between a custom home builder and a production home builder?",
        a: "A custom home builder creates a one-of-a-kind home designed specifically for your needs, lifestyle, and property. A production home builder offers pre-designed layouts and limited customization options.",
      },
      {
        q: "How long does it take to build a custom home?",
        a: "On average, new home builds take anywhere from 8 to 14 months from design to completion, depending on size, design complexity, and location.",
      },
      {
        q: "How much does it cost to build a new home in Texas?",
        a: "While production homes may start around $150 per square foot, custom built homes often range between $250 and $500 per square foot or more.",
      },
      {
        q: "Why should I choose a custom home builder over buying an existing home?",
        a: "Choosing a custom home builder allows you to design a home that fits your exact lifestyle, from layout and room flow to energy efficiency and materials.",
      },
      {
        q: "How do I find the right construction company for my new home build?",
        a: "Start by researching local home builders with strong reputations, licenses, insurance, and proven portfolios of custom built homes similar to what you envision.",
      },
    ],
    ctaTitle: "Let's Build Your Future Together",
    ctaText:
      "Ready to build your dream home? Contact NWS Custom Homes and Remodeling today and discover why we're a trusted name among home builders in Richmond, TX.",
    ctaButton: "Speak to Our Experts",
  },
  {
    slug: "remodeling-company",
    title: "Remodeling Company Richmond, TX | Contact Us Today!",
    metaDescription:
      "Trusted remodeling company in Richmond, TX since 2007. Over 35 years of combined experience. Call (281) 299-2309.",
    breadcrumb: "Remodeling",
    heroLabel: "From Painting to Home Additions",
    heroTitle: "Transform Your Home With Expert Remodeling",
    heroText:
      "Remodeling your home is one of the most rewarding ways to maximize your space, improve comfort, and boost property value for you and your family. With the right remodeling company, your vision can become a reality, crafted with precision and care.",
    heroCta: "Contact Our Experts",
    h1: "Find a Dependable Remodeling Company in Richmond, TX",
    intro: [
      "Choosing the right remodeling company can make or break your project. Poor communication, unclear timelines, and inconsistent workmanship can turn a renovation into a stressful experience.",
      "At NWS Custom Homes and Remodeling, we've been serving Richmond, TX, since 2007, bringing over 35 years of combined construction and remodeling experience. We focus on delivering reliable results through clear communication, structured planning, and consistent craftsmanship.",
    ],
    image: "/images/home-remodeling-richmond-tx.jpg",
    imageAlt: "remodeling home living room richmond tx",
    sections: [
      {
        heading: "Reliable Remodeling Services to Fit Your Needs",
        paragraphs: [
          "At NWS, we offer a full range of remodeling services designed to meet your unique needs. Whether you're looking to modernize your kitchen, upgrade your bathroom, or add new space, our team is ready to deliver exceptional results.",
          "From whole-home painting to layout redesigns, our interior remodeling services can breathe new life into any space. We're here to listen, plan, and build. Simply share your vision, and we'll take care of the rest.",
        ],
      },
      {
        heading: "What Sets Our Remodeling Company Apart",
        bullets: [
          "Established local business since 2007",
          "Over 35 years of combined industry experience",
          "Personalized approach to every project",
          "Reliable timelines and organized workflow",
          "Strong reputation in Richmond, TX, and the surrounding areas",
        ],
        paragraphs: [
          "We proudly serve homeowners in Richmond, TX and nearby areas, including Sugar Land, Katy, Fulshear, and Rosenberg.",
        ],
      },
      {
        heading: "Start Your Home Remodel With Confidence",
        paragraphs: [
          "As a trusted remodeling company, our skilled team will guide you every step of the way, ensuring your renovation project stays on schedule and within budget. With our personalized approach and top-tier remodeling services, you can feel confident that your home is in expert hands.",
        ],
      },
    ],
    ctaLabel: "Work with Our Experts",
    ctaTitle: "Revamp Your Living Spaces",
    ctaText:
      "Contact NWS Custom Homes and Remodeling today to learn more about our interior remodeling services in Richmond, TX.",
    ctaButton: "Call Now",
  },
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling Richmond, TX | Contact Us Today!",
    metaDescription:
      "Professional kitchen remodeling in Richmond, TX. 35+ years designing beautiful, functional kitchens. Call (281) 299-2309.",
    breadcrumb: "Kitchen Remodeling",
    heroLabel: "Modern Kitchen Remodeling That Fits Your Lifestyle",
    heroTitle: 'Improve the "Heart" of Your Home',
    heroText:
      "Transform your kitchen into a functional, modern space built around your needs. From layout redesign to premium finishes, every detail is planned for daily comfort, style, and long-term value.",
    h1: "Transform Your Space With Custom Kitchen Remodeling Services in Richmond, TX",
    intro: [
      "Outdated kitchens can make daily routines frustrating and limit how you use your home. Poor layouts, worn cabinets, and a lack of storage often lead to cluttered, inefficient spaces that no longer fit your lifestyle.",
      "At NWS Custom Homes and Remodeling, we specialize in kitchen remodeling services in Richmond, TX, and the surrounding areas, helping homeowners reimagine their space with thoughtful design and quality construction.",
    ],
    image: "/images/kitchen-remodeling-richmond-tx.jpg",
    imageAlt: "kitchen remodeling sketch to real kitchen richmond tx",
    sections: [
      {
        heading: "Elevate Function and Style With Unique Kitchen Features",
        paragraphs: [
          "A successful kitchen remodel balances design, durability, and usability. As a trusted kitchen remodeling company, we guide you through each decision to ensure your space meets both aesthetic and practical goals.",
        ],
        subBlocks: [
          {
            title: "Layout Options for Better Flow",
            items: [
              "Galley Layout: Ideal for smaller spaces with parallel counters",
              "L-Shaped Kitchen: Open feel with flexibility for dining",
              "Island Layout: Prep space, seating, and storage for families",
              "Open Concept Designs: Integrates kitchen with living spaces",
            ],
          },
          {
            title: "Countertop Material Options",
            items: [
              "Quartz Countertops: Durable, low-maintenance, modern",
              "Granite Countertops: Natural stone with unique veining",
              "Butcher Block Countertops: Warm wood surfaces for prep areas",
            ],
          },
          {
            title: "Cabinet Styles and Storage Solutions",
            items: [
              "Shaker Cabinets: Clean lines for modern and traditional kitchens",
              "Flat-Panel Cabinets: Minimalist contemporary style",
              "Custom Cabinetry: Built to maximize storage",
              "Soft-Close Features: Reduce wear and improve function",
            ],
          },
        ],
      },
      {
        heading: "Understanding Kitchen Remodeling Costs in Richmond, TX",
        bullets: [
          "Basic Kitchen Updates ($15,000–$30,000): Cabinet refinishing, new countertops, minor improvements",
          "Mid-Range Remodel ($30,000–$60,000): New cabinetry, upgraded appliances, improved lighting",
          "High-End Kitchen Renovation ($60,000+): Full redesign with custom cabinetry and premium materials",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a kitchen remodel take?",
        a: "Most kitchen remodeling projects take between 4 to 10 weeks depending on the scope. Larger renovations with layout changes or custom cabinetry may take longer.",
      },
      {
        q: "Do I need to move out during the remodel?",
        a: "In most cases, you can stay in your home. However, you may need to set up a temporary kitchen space while work is being completed.",
      },
      {
        q: "What adds the most value in a kitchen remodel?",
        a: "Upgrades like new cabinets, countertops, and improved layouts typically offer the highest return.",
      },
      {
        q: "Can you help with design ideas?",
        a: "Yes, we guide you through layout planning, material selection, and design choices to ensure your kitchen matches your vision.",
      },
      {
        q: "How do I choose the right materials?",
        a: "We help you compare options like quartz, granite, and wood surfaces based on durability, maintenance, and style preferences.",
      },
    ],
    ctaLabel: "Contact Us",
    ctaTitle: "Elevate Your Kitchen With Our Help",
    ctaText:
      "Ready to upgrade your kitchen? Contact NWS Custom Homes and Remodeling today, and let us show you why we're a leading choice for kitchen remodels in Richmond, TX.",
    ctaButton: "Call Now",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling Richmond, TX",
    metaDescription:
      "Top-of-the-line bathroom remodeling services in Richmond, TX. Over 35 years of combined experience. Call (281) 299-2309.",
    breadcrumb: "Bathroom Remodeling",
    heroLabel: "Custom Bathroom Remodeling Built for Comfort",
    heroTitle: "Give Your Bathroom a Makeover",
    heroText:
      "Whether you're ready to update outdated tile floors or replace old fixtures with something more modern and luxurious, our bathroom remodeling team is here to help. At NWS Custom Homes and Remodeling, we turn ordinary bathrooms into relaxing, functional spaces tailored to your style and needs.",
    heroCta: "Contact Our Experts",
    h1: "Top-Of-The-Line Bathroom Remodeling Services in Richmond, TX",
    intro: [
      "An outdated bathroom can feel cramped, inefficient, and difficult to maintain. Limited storage, worn surfaces, and poor ventilation often lead to daily frustration and even long-term moisture issues.",
      "At NWS Custom Homes and Remodeling, we provide luxury bathroom remodeling services in Richmond, TX, and the surrounding areas that focus on both design and durability.",
    ],
    image: "/images/bathroom-remodeling-richmond-tx.jpg",
    imageAlt: "bathroom remodeling sketch to actual bathroom richmond tx",
    sections: [
      {
        heading: "Start-to-Finish Bathroom Renovation",
        paragraphs: [
          "We offer comprehensive bathroom renovation solutions, including new sinks, bathtubs, toilets, custom tile flooring, and updated countertops. Whether you're interested in a modern tub-to-shower conversion or a total redesign, we've got the expertise to deliver.",
        ],
      },
      {
        heading: "The Latest Bathroom Models: Modern Trends and Innovations",
        subBlocks: [
          {
            title: "Spa-Like Retreats for Everyday Luxury",
            items: [
              "Large walk-in showers with frameless glass",
              "Rainfall showerheads and built-in seating",
              "Freestanding soaking tubs",
              "Heated floors, ambient lighting, and towel warmers",
            ],
          },
          {
            title: "Walk-In Shower Conversions",
            items: [
              "Tub-to-Shower Conversions",
              "Frameless Glass Enclosures",
              "Built-In Niches and Seating",
              "Slip-Resistant Flooring",
            ],
          },
          {
            title: "Vanity Styles and Storage Solutions",
            items: [
              "Single Sink Vanities",
              "Double Sink Vanities",
              "Floating Vanities",
              "Custom Storage Solutions",
            ],
          },
          {
            title: "Tile Options for Style and Durability",
            items: [
              "Ceramic Tile",
              "Porcelain Tile",
              "Natural Stone Tile",
              "Large-Format Tile",
            ],
          },
        ],
      },
      {
        heading: "Built for Texas Humidity and Long-Term Performance",
        paragraphs: [
          "Bathrooms in Richmond, TX, face constant exposure to moisture and heat. Without proper planning, this can lead to mold growth, warped materials, and costly repairs. By designing with Texas conditions in mind, we create bathrooms that remain durable, safe, and visually appealing for years.",
        ],
        bullets: [
          "Installing proper ventilation systems to control humidity",
          "Using moisture-resistant materials for walls, flooring, and cabinetry",
          "Sealing tile and grout to prevent water penetration",
          "Ensuring proper drainage and waterproofing in showers",
        ],
      },
      {
        heading: "Smart Technology in Modern Bathrooms",
        paragraphs: [
          "Technology has made its way into nearly every room of the house, and the bathroom is no exception. Homeowners are embracing smart features as part of their bathroom renovation plans to enhance comfort and convenience.",
        ],
        bullets: [
          "Smart mirrors with LED lighting and built-in defoggers",
          "Motion-sensor faucets and voice-activated lighting systems",
          "Heated flooring systems and programmable thermostats",
          "Chromotherapy lighting and smart showers with preferred temperature settings",
        ],
      },
      {
        heading: "Energy-Efficient and Sustainable Materials",
        paragraphs: [
          "Eco-friendly design continues to influence bathroom remodeling. Sustainable materials such as recycled glass tiles, bamboo vanities, and low-VOC paints are in high demand. Water-saving fixtures, like dual-flush toilets and low-flow faucets, help reduce waste without compromising performance.",
        ],
      },
      {
        heading: "Work With a Professional Bathroom Remodeler",
        paragraphs: [
          "At NWS Custom Homes and Remodeling, we take the time to understand your vision. Our personalized consultation process allows us to tailor every bathroom remodel to your unique preferences. We're proud to be one of the top bathroom remodeling companies in Richmond, TX, delivering high-quality craftsmanship and exceptional customer service on every project.",
        ],
      },
      {
        heading: "Let Our Bathroom Remodeling Company Transform Your Space",
        paragraphs: [
          "From minor upgrades to complete transformations, we're your go-to bathroom remodeling company for expert results. Our team handles everything from start to finish, ensuring a smooth and stress-free experience. If you're ready to elevate your bathroom, trust the local experts who know how to get the job done right.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does bathroom remodeling cost in Richmond, TX?",
        a: "On average, homeowners can expect to invest between $10,000 and $25,000 for a complete bathroom renovation, while a luxury bathroom remodel with high-end finishes can go higher. Factors such as custom tile work, vanity replacement, and plumbing updates also influence pricing.",
      },
      {
        q: "How long does a shower conversion take?",
        a: "A shower conversion usually takes about one to two weeks, depending on the design and materials. Simpler conversions may be completed in a few days, while more complex projects with custom tile and glass enclosures can take longer.",
      },
      {
        q: "Can I keep my plumbing layout, or will it change?",
        a: "In many cases, you can keep your existing plumbing layout during a bathroom remodel, especially for cosmetic renovations. If you're changing fixture locations, plumbing lines may need modification.",
      },
      {
        q: "Do you handle permitting and inspections?",
        a: "Yes, we take care of all necessary permits and inspections and ensure your project meets local Richmond, TX building codes and safety standards.",
      },
      {
        q: "What design styles and materials do you use?",
        a: "We offer a wide range of design styles, from classic and contemporary to modern farmhouse and spa-inspired retreats. We source high-quality materials such as porcelain tile, quartz or granite countertops, and custom cabinetry.",
      },
    ],
    ctaLabel: "Start Today",
    ctaTitle: "Create Your Personal Oasis At Home",
    ctaText:
      "We treat every project like it's our own home. Our mission is to provide top-tier bathroom remodeling services that blend luxury, functionality, and value.",
    ctaButton: "Call Now",
  },
  {
    slug: "home-remodel",
    title: "Home Remodel Richmond, TX | Contact Us Today!",
    metaDescription:
      "Experienced home remodel experts in Richmond, TX. 35+ years delivering quality renovations. Call (281) 299-2309 today!",
    breadcrumb: "Whole Home Remodeling",
    heroLabel: "Work with Experts",
    heroTitle: "Renovate Your Home With Confidence",
    heroText:
      "When you're ready to remodel your home, you deserve a team that can bring your vision to life with precision and care. At NWS Custom Homes and Remodeling, we specialize in creating beautiful, functional spaces through thoughtful design and expert craftsmanship.",
    heroCta: "Contact Our Experts",
    h1: "Improve Your Living Spaces With Professional Home Remodel Services in Richmond, TX",
    intro: [
      "At NWS Custom Homes and Remodeling, we believe your home should reflect your lifestyle and taste. That's why we're passionate about providing high-quality home remodel services that enhance both form and function. With years of experience and a proven track record in remodeling houses, we're equipped to manage projects of any size, from small upgrades to complete whole home remodeling.",
    ],
    image: "/images/whole-home-remodeling-richmond-tx.jpg",
    imageAlt: "before and after whole home remodeling richmond tx",
    sections: [
      {
        heading: "Let Us Revamp Your Spaces",
        bullets: [
          "Layout Redesign: Open floor plans that improve flow and usability",
          "Kitchen Renovation: Modern layouts, custom cabinetry, and upgraded surfaces",
          "Bathroom Upgrades: Walk-in showers, vanities, and improved functionality",
          "Living Space Enhancements: Expanded rooms and better lighting",
          "Flooring and Finishes: Durable materials that unify the entire home",
        ],
      },
      {
        heading: "Structured Remodeling Process",
        bullets: [
          "Initial consultation and planning",
          "Design and layout development",
          "Material selection",
          "Construction and installation",
          "Final walkthrough and completion",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a full home remodel take?",
        a: "Most home remodeling projects take between 2 to 6 months depending on the size of the home and the scope of work.",
      },
      {
        q: "What is included in a whole home remodel?",
        a: "A whole home remodel can include layout changes, kitchen and bathroom renovations, flooring updates, lighting upgrades, and new finishes throughout the home.",
      },
      {
        q: "Do I need permits for home remodeling in Richmond, TX?",
        a: "Yes, many remodeling projects require permits, especially if they involve structural changes, electrical work, or plumbing updates. We handle the permitting process.",
      },
      {
        q: "Can I live in my home during a full remodel?",
        a: "In some cases, homeowners can stay during remodeling, but for large-scale renovations temporary relocation may be recommended.",
      },
      {
        q: "How much does home remodeling cost in Richmond, TX?",
        a: "Partial remodels typically start around $50,000, while full home renovations can exceed $100,000 depending on customization and finishes.",
      },
    ],
    ctaLabel: "Start Now",
    ctaTitle: "Make Your Home Functional & Beautiful",
    ctaText:
      "If you're searching for a reliable team that will treat your home remodel as if it were their own, contact NWS Custom Homes and Remodeling.",
    ctaButton: "Speak to Our Experts",
  },
  {
    slug: "bathroom-shower-remodel",
    title: "Bathroom Shower Remodel Richmond, TX | Contact Us Today!",
    metaDescription:
      "Professional shower remodel services in Richmond, TX. Transform your bathroom with custom designs. Call (281) 299-2309.",
    breadcrumb: "Shower Remodel",
    heroLabel: "Over 35 Years Of Experience",
    heroTitle: "Upgrade Your Bathroom with a Stunning Shower Remodel!",
    heroText:
      "At NWS Custom Homes and Remodeling, we help you create the bathroom of your dreams. Whether it's a full shower bath remodel or a small update, we turn your vision into reality. Let's get started!",
    heroCta: "Connect With Us",
    h1: "Revitalize Your Space with Our Bathroom Shower Remodel in Richmond, TX",
    intro: [
      "Are you dealing with an outdated or cramped shower that disrupts your daily routine? Maybe your shower isn't functional, or it's simply not as stylish as you'd like. The frustration of poor water pressure, leaks, or limited space can make a daily task like showering feel like a hassle.",
      "That's where NWS Custom Homes and Remodeling comes in. As experienced bathroom remodelers and shower remodel contractors in Richmond, TX, we specialize in transforming showers to meet your exact needs.",
    ],
    image: "/images/14-kitchen-after.jpg",
    imageAlt: "shower remodel project",
    sections: [
      {
        heading: "Why Choose Our Shower Remodel Services?",
        paragraphs: [
          "Is your shower outdated and no longer meets your needs? A shower bath remodel can breathe new life into your bathroom. Whether you're looking for extra storage, a fresh look, or improved water flow, our shower remodel contractors offer a range of solutions.",
        ],
      },
      {
        heading: "Custom Solutions for Your Dream Bathroom",
        subBlocks: [
          {
            title: "Frameless vs. Framed Glass Enclosures",
            items: [
              "Frameless Glass: Clean, open look with minimal hardware",
              "Framed Glass: Added structure and durability at a lower cost",
            ],
          },
          {
            title: "Tile Options for Style and Durability",
            items: [
              "Porcelain Tile: Highly water-resistant and durable",
              "Ceramic Tile: Affordable and versatile",
              "Natural Stone Tile: Premium look with unique textures",
              "Mosaic Tile Accents: Visual interest and slip resistance",
            ],
          },
          {
            title: "Built-In Storage and Comfort Features",
            items: [
              "Shower Benches",
              "Wall Niches",
              "Corner Shelving",
              "Rainfall Showerheads",
              "Handheld Fixtures",
              "Slip-Resistant Flooring",
            ],
          },
        ],
      },
      {
        heading: "Walk-In Shower Conversion Process",
        bullets: [
          "Initial Assessment: Evaluate layout, plumbing, and structure",
          "Design Planning: Select layout, tile, glass, and fixtures",
          "Demolition and Prep: Remove old materials",
          "Waterproofing: Apply sealing systems to prevent leaks",
          "Installation: Tile, glass, fixtures, and drainage",
          "Final Inspection: Ensure quality and proper function",
        ],
      },
    ],
    ctaTitle: "Claim Your Stunning Shower Remodel Today!",
    ctaText:
      "Transform your bathroom with NWS Custom Homes and Remodeling. Our shower remodel services elevate your space and add value to your home.",
    ctaButton: "Let's Talk",
  },
  {
    slug: "bathtub-remodeling",
    title: "Bathtub Remodeling Richmond, TX | Contact Us Today!",
    metaDescription:
      "Professional bathtub remodeling in Richmond, TX. Quality upgrades and stunning designs. Call (281) 299-2309.",
    breadcrumb: "Bathtub Remodel",
    heroLabel: "Over 35 Years Of Experience",
    heroTitle: "Revamp Your Bathroom with a Stunning Bathtub Remodel",
    heroText:
      "At NWS Custom Homes and Remodeling, we offer high-quality bathtub remodeling services. Whether you're looking to update your current tub or completely redesign your bathroom, our team of skilled professionals can turn your vision into a reality.",
    heroCta: "Get Involved",
    h1: "Give Your Bathroom a Fresh Look with Our Bathtub Remodeling in Richmond, TX",
    intro: [
      "Dealing with an outdated or uncomfortable bathtub can quickly become frustrating. A cracked tub, peeling tiles, or simply a style that doesn't match your taste can impact the overall feel of your bathroom.",
      "At NWS Custom Homes and Remodeling, we specialize in bathtub remodeling in Richmond, TX, providing top-tier services to homeowners who want to upgrade their bathrooms.",
    ],
    image: "/images/13-kitchen-after.jpg",
    imageAlt: "bathtub remodel project",
    sections: [
      {
        heading: "Why Choose Our Bathtub Remodeling Services?",
        paragraphs: [
          "At NWS Custom Homes and Remodeling, we provide tailored bathtub remodel services to fit your unique needs. Our team of skilled professionals brings your bathroom vision to life, whether you're updating an outdated tub or need a complete remodel.",
        ],
      },
      {
        heading: "Affordable and Professional Bathtub Remodels",
        subBlocks: [
          {
            title: "Freestanding Tub Trends",
            items: [
              "Modern Freestanding Tubs: Sleek, sculptural designs",
              "Classic Clawfoot Tubs: Timeless style with deep soak",
              "Minimalist Designs: Clean lines and neutral finishes",
            ],
          },
          {
            title: "Soaking Tubs for Relaxation",
            items: [
              "Deep Soaking Tubs: Full-body immersion",
              "Ergonomic Shapes: Contoured back support",
              "Heat-Retaining Materials: Longer temperature hold",
            ],
          },
          {
            title: "Built-In Tub Options",
            items: [
              "Alcove Tubs: Space-saving for standard layouts",
              "Drop-In Tubs: Custom deck with design flexibility",
            ],
          },
        ],
      },
      {
        heading: "Tub-to-Shower Conversion Process",
        bullets: [
          "Initial Consultation: Evaluate space, plumbing, and goals",
          "Design Planning: Select shower layout, tile, fixtures, and glass",
          "Demolition: Remove existing bathtub and prepare space",
          "Waterproofing and Prep: Moisture barriers and drainage",
          "Installation: Tile, fixtures, glass, and finishing details",
          "Final Walkthrough: Confirm quality and function",
        ],
      },
    ],
    ctaTitle: "Upgrade Your Bathroom Today and Save Big",
    ctaText:
      "Don't wait to transform your bathroom. Schedule your bathtub remodel today for a refreshed, modern look you'll love!",
    ctaButton: "Talk to Us",
  },
  {
    slug: "room-additions-home-additions",
    title: "Home Addition Contractors Richmond, TX | Contact Us Today!",
    metaDescription:
      "Trusted home addition contractors in Richmond, TX and Fort Bend County. Master suites, second stories, and more. Call (281) 299-2309.",
    breadcrumb: "Room Additions & Home Additions",
    heroTitle: "Seamlessly Add Space and Value to Your Home",
    heroText:
      "NWS Custom Homes and Remodeling designs and builds stunning room additions tailored to your lifestyle. From master suites to second stories, we manage every detail so your home feels complete.",
    heroCta: "Book Now",
    h1: "Expand Your Living Areas With Trusted Home Addition Contractors in Richmond, TX, and Fort Bend County",
    intro: [
      "Feeling like your home is running out of space can be overwhelming. Whether your family is growing, you're welcoming in-laws, or you simply want more room to enjoy life, a lack of space creates stress. Cluttered living areas, limited storage, and a lack of privacy make daily routines more challenging than they should be. Without the right home addition contractors, even starting the process can feel intimidating.",
      "That's where NWS Custom Homes and Remodeling steps in. As trusted home addition contractors in Richmond, TX, and Fort Bend County, we've been expanding homes since 2007 with solutions that blend seamlessly into your existing space. Our team handles design, permits, and construction in Fort Bend County, ensuring every detail reflects your needs. From custom room additions to full second-story builds, we focus on delivering quality results that enhance both comfort and value.",
      "We pride ourselves on clear communication and dependable service, so you never feel left in the dark about your project. Our goal is to create functional, beautiful spaces that feel like they were always part of your home.",
    ],
    image: "/images/home-addition-contractors.webp",
    imageAlt: "home addition contractors",
    sections: [
      {
        heading: "Expanding Homes With Custom Solutions",
        paragraphs: [
          "When you need more space, not just any contractor will do. Choosing skilled room addition contractors ensures that your project is handled with precision and care. At NWS Custom Homes and Remodeling, we understand that each family has unique needs, and that's why we offer tailored solutions for every project.",
          "From custom room additions that expand living areas to mother-in-law suite additions that provide privacy and comfort for loved ones, we create spaces designed to fit your lifestyle. Our team of home addition experts knows how to integrate new builds seamlessly with your existing structure, so the finished product feels natural and cohesive.",
        ],
        subBlocks: [
          {
            title: "Room Addition Types",
            items: [
              "Extra Bedrooms: Ideal for growing families or accommodating guests with added privacy and comfort",
              "Living Room Expansions: Open up your home with more space for entertaining and everyday living",
              "Home Offices: Create a quiet, dedicated workspace tailored for productivity",
            ],
          },
          {
            title: "Second-Story Additions",
            items: [
              "Full Second Floors: Add significant square footage without expanding your home's footprint",
              "Partial Second-Story Builds: Expand specific areas while maintaining structural balance",
              "Structural Integration: Designed to match your existing home's style and foundation requirements",
            ],
          },
          {
            title: "Mother-in-Law Suite Additions",
            items: [
              "Private Living Spaces: Separate bedroom, bathroom, and living areas for independence",
              "Kitchenette Options: Allow for self-sufficient living within your home",
              "Attached or Detached Designs: Flexible layouts depending on your property and preferences",
            ],
          },
        ],
      },
      {
        heading: "We Streamline the Fort Bend County Permit Process",
        paragraphs: [
          "Home additions in Richmond, TX, and Fort Bend County require proper permits and approvals to ensure safety and compliance. Navigating this process alone can be overwhelming, but we handle it for you. Our experience working within Fort Bend County helps streamline approvals and avoid delays, keeping your project on track.",
        ],
        bullets: [
          "Initial Planning and Design: Create detailed plans that meet local building codes and zoning requirements",
          "Permit Submission: Submit drawings and documentation to Fort Bend County for approval",
          "Code Compliance Review: Ensure the project meets structural, electrical, and plumbing standards",
          "Inspections: Schedule required inspections throughout the construction process",
          "Final Approval: Confirm that the completed addition meets all local regulations",
        ],
      },
      {
        heading: "Common Timeline for Home Additions",
        paragraphs: [
          "Understanding the timeline helps set realistic expectations for your project. While every addition is unique, most follow a structured schedule.",
        ],
        bullets: [
          "Planning and Design (2–6 weeks): Initial consultations, design development, and material selection",
          "Permitting (2–6 weeks): Approval process depending on project complexity",
          "Construction (8–16+ weeks): Framing, electrical, plumbing, finishing, and final inspections",
        ],
      },
      {
        heading: "Home Addition Costs in Richmond, TX",
        paragraphs: [
          "The cost of a home addition varies based on size, design, and materials. Understanding general ranges helps you plan your investment. We work with you to align your goals with your budget, ensuring every addition delivers value and functionality.",
        ],
        bullets: [
          "Small Room Additions ($40,000–$80,000): Bedrooms, offices, or small expansions",
          "Mid-Range Additions ($80,000–$150,000): Larger living spaces or multi-room additions",
          "Second-Story Additions ($150,000+): Full structural expansions with significant square footage",
          "Mother-in-Law Suites ($100,000+): Private living spaces with bathrooms and kitchenettes",
        ],
      },
      {
        heading: "Creating Living Spaces That Grow With You",
        paragraphs: [
          "In Richmond, TX, and Fort Bend County, families continue to turn to NWS Custom Homes and Remodeling for thoughtful, well-built home additions. Since 2007, we've been dedicated to helping homeowners expand their living space with projects that balance both form and function.",
          "Our company was founded on the belief that a home should adapt to your lifestyle, not the other way around. Whether you need a private retreat, a new gathering area for your family, or space for a loved one, our team brings skill and dedication to every project. As home addition contractors, we take the time to understand your goals before we ever start construction.",
        ],
      },
    ],
    ctaTitle: "Start Your Home Addition Project Today",
    ctaText:
      "Add space, comfort, and value to your home with a custom addition. Contact us today to begin your project.",
    ctaButton: "Talk to an Expert",
  },
  {
    slug: "basement-remodeling-finishing",
    title: "Basement Remodeling Services Richmond, TX | Contact Us Today!",
    metaDescription:
      "Basement remodeling and finishing in Richmond, TX. Transform unused space into living areas. Call (281) 299-2309.",
    breadcrumb: "Basement Remodeling / Finishing",
    heroTitle: "Maximize Your Home with Basement Remodel",
    heroText:
      "At NWS Custom Homes and Remodeling, we make your vision a reality with basement remodeling and finishing that expands your living space. From planning to permits, our team delivers seamless results designed around your family's needs.",
    heroCta: "Check our Services",
    h1: "Get Top Basement Remodeling Services in Richmond, TX",
    intro: [
      "Unfinished basements often end up as wasted space, used for storage instead of adding value to your home. Homeowners dealing with outdated layouts, poor lighting, or a lack of functionality often find themselves frustrated.",
      "That's where NWS Custom Homes and Remodeling comes in. As a trusted team serving Richmond, TX, since 2007, we specialize in basement remodeling services designed to transform underutilized basements into beautiful, functional living spaces.",
    ],
    image: "/images/Basement-Finishing.webp",
    imageAlt: "Basement Finishing",
    sections: [
      {
        heading: "Why Homeowners Choose Our Basement Finishing",
        paragraphs: [
          "When it comes to basement finishing, choosing the right contractor makes all the difference. Our basement finishing contractors help homeowners create functional spaces that match their style and goals.",
          "With our basement finishing services, you don't just add another room, you add comfort, value, and usability. Families often use these spaces for in-law suites, playrooms, gyms, or home theaters.",
        ],
      },
      {
        heading: "Custom Designs Built for Your Lifestyle",
        paragraphs: [
          "Every family has unique needs, and every basement should reflect that. At NWS Custom Homes and Remodeling, we design and build spaces that fit your lifestyle while adding value to your home in Richmond, TX.",
          "Whether you need an additional bedroom, a home office, or a space for entertainment, our basement remodeling services ensure every square foot is used wisely.",
        ],
      },
    ],
    ctaTitle: "Start Your Basement Remodel Now",
    ctaText:
      "Create the perfect basement space for your family, schedule your remodeling project today and bring your vision to life without delay.",
    ctaButton: "Dial Now",
  },
  {
    slug: "garage-remodel-contractors",
    title: "Garage Remodel Contractors Richmond, TX | Contact Us Today!",
    metaDescription:
      "Garage remodel contractors in Richmond, TX. Convert unused garages into offices, gyms, or bedrooms. Call (281) 299-2309.",
    breadcrumb: "Garage Conversions & Remodeling",
    heroTitle: "Turn Your Garage Into a Functional Living Space",
    heroText:
      "At NWS Custom Homes and Remodeling, we transform unused garages into inviting living spaces. From insulation and flooring to finishing touches, we handle it all and show you how your garage can become the most useful room in your home.",
    heroCta: "Talk to Us",
    h1: "Transform Your Space with Garage Remodel Contractors in Richmond, TX Area",
    intro: [
      "Many homeowners in Richmond, TX feel frustrated with garages that become cluttered, cold, and underused. Instead of being a functional extension of the house, they turn into storage areas filled with old boxes and forgotten items.",
      "That is where NWS Custom Homes and Remodeling comes in. Since 2007, we have provided reliable garage remodel contractors who specialize in transforming wasted space into rooms that truly serve a purpose.",
    ],
    image: "/images/garage-remodel.webp",
    imageAlt: "garage remodel",
    sections: [
      {
        heading: "Why Homeowners Choose Our Garage Remodels",
        bullets: [
          "A garage remodel into living space can serve as a guest suite, private office, or gym",
          "Insulation, flooring, and lighting make the room comfortable year-round",
          "New space blends seamlessly with the rest of your home",
          "Avoid expensive additions or the stress of moving",
          "Increase property value while improving everyday living",
        ],
      },
      {
        heading: "Your Trusted Partner for Lasting Home Upgrades",
        paragraphs: [
          "For homeowners in Richmond, TX, NWS Custom Homes and Remodeling delivers projects that improve living spaces and provide lasting value. From flooring and insulation to electrical and finishing touches, we handle each step.",
        ],
      },
    ],
    ctaTitle: "Claim Your Free Consultation and 5% Off Today",
    ctaText:
      "Book now and mention our website to enjoy a free consultation plus 5% off your next project. Make your garage remodel happen today.",
    ctaButton: "Call Us Today",
  },
  {
    slug: "open-concept-remodeling",
    title: "Open Concept Remodeling Richmond, TX | Contact Us Today!",
    metaDescription:
      "Open concept remodeling in Richmond, TX. Wall removal, layout redesign, and inviting living spaces. Call (281) 299-2309.",
    breadcrumb: "Living Room & Open Concept Remodeling",
    heroTitle: "Create a Bright, Welcoming Open Concept Living Space",
    heroText:
      "At NWS Custom Homes and Remodeling, we bring modern style to your home with open concept remodeling. From wall removal to updated finishes, we create inviting living spaces made for today's lifestyle.",
    heroCta: "Let's Talk",
    h1: "Transform Your Space with Modern Open Concept Remodeling in Richmond, TX",
    intro: [
      "Many homeowners in Richmond, TX feel stuck with outdated, closed-off floor plans that make their homes feel dark and cramped. Narrow hallways and boxy rooms limit natural light and create frustration during family gatherings.",
      "That is why NWS Custom Homes and Remodeling offers trusted open concept remodeling designed to transform the way you live. Since 2007, we have been helping families create bright, functional spaces by removing unnecessary walls, opening layouts, and upgrading finishes.",
    ],
    image: "/images/open-concept.webp",
    imageAlt: "open concept remodeling",
    sections: [
      {
        heading: "Why Families Choose Open Concept Remodeling",
        bullets: [
          "Improved flow between kitchen, dining, and living areas",
          "More natural light throughout the home",
          "A living room remodel that feels larger without an addition",
          "Better spaces for family gatherings and entertaining",
          "Flexible layouts that adapt to your lifestyle",
        ],
      },
      {
        heading: "Your Local Remodeling Partner for Modern Homes",
        paragraphs: [
          "In Richmond, TX, NWS Custom Homes and Remodeling has built a strong reputation for bringing new life to traditional houses. We specialize in projects that involve removing walls, updating living room layouts, and making spaces more inviting.",
          "Since 2007, we have been remodeling homes to match modern living standards while staying true to each homeowner's vision.",
        ],
      },
    ],
    ctaTitle: "Get Your Free Consultation and 5% Off Today",
    ctaText:
      "Book now and mention our website to enjoy a free consultation plus 5% off your next project. Start your open concept remodel today.",
    ctaButton: "Call Now",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}
