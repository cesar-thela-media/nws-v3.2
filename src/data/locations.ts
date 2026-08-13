export type LocationService = {
  label: string;
  detail?: string;
  href: string;
};

export type Location = {
  slug: string;
  name: string;
  href: string;
  title: string;
  description: string;
  h1: string;
  body: string[];
  ctaLabel?: string;
  ctaHref?: string;
  sections?: {
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
    services?: LocationService[];
  }[];
  formTitle: string;
  formIntro?: string;
  heroImage?: string;
  heroImageAlt?: string;
};

export const locations: Location[] = [
  {
    slug: "richmond-tx",
    name: "Richmond, TX",
    href: "#",
    title: "Residential Remodeling Services Richmond, TX | NWS Custom Homes",
    description:
      "Reliable residential remodeling services in Richmond, TX. 35+ years of experience delivering quality home renovations.",
    h1: "Dependable Residential Remodeling Services in Richmond, TX: NWS Custom Homes and Remodeling",
    body: [
      "When it comes to transforming your home, choosing the right remodeling company is essential. NWS Custom Homes and Remodeling has been turning homeowners' dreams into reality since 2007 in Richmond, TX.",
      "Our team of experts is dedicated to helping you create a beautiful and functional space for your family. Whether you're looking for a complete home remodel or a kitchen or bathroom renovation, we have the expertise to bring your vision to life.",
    ],
    formTitle: "We're Looking Forward to Work With You",
  },
  {
    slug: "sugar-land-tx",
    name: "Sugar Land, TX",
    href: "/sugar-land-tx/",
    title: "Remodeling Company Sugar Land, TX | Call Us Today!",
    description:
      "Transform your space with our reliable remodeling company in Sugar Land, TX. Dial (281) 299-2309 for expert services.",
    h1: "Dependable Residential Remodeling Services in Sugar Land, TX: NWS Custom Homes and Remodeling",
    body: [
      "When it comes to transforming your home, choosing the right remodeling company is essential. NWS Custom Homes and Remodeling has been turning homeowners' dreams into reality since 2007 in Sugar Land, TX.",
      "Our team of experts is dedicated to helping you create a beautiful and functional space for your family. Whether you're looking for a complete home remodel or a kitchen or bathroom renovation, we have the expertise to bring your vision to life. From the initial design phase to the final touches, our skilled craftsmen will ensure a smooth and timely delivery of residential remodeling services.",
      "At NWS Custom Homes and Remodeling, we offer a wide range of residential remodeling services to cater to your specific needs. These include:",
    ],
    ctaLabel: "Speak to Our Experts",
    formTitle: "Quality Services Tailored to Your Needs",
    formIntro:
      "Choose NWS Custom Homes and Remodeling as your trusted remodeling company in Sugar Land, TX. Contact us today to discuss your remodeling project and let us help you bring your home improvement dreams to life.",
    heroImage: "/images/hero-custom-home-remodeling-paralax-image.jpg",
    heroImageAlt: "NWS remodeling project serving Sugar Land, TX",
    sections: [
      {
        heading: "Services We Provide",
        services: [
          {
            label: "Custom home building, from lot selection and design to full construction",
            href: "/services/custom-home-builder/",
          },
          {
            label: "Whole home remodeling for top-to-bottom transformations",
            href: "/services/home-remodel/",
          },
          {
            label: "Kitchen remodeling to improve layout, functionality, and style",
            href: "/services/kitchen-remodeling/",
          },
          {
            label: "Bathroom remodeling with upgraded features and finishes",
            href: "/services/bathroom-remodeling/",
          },
          {
            label: "Shower remodels that blend comfort, aesthetics, and performance",
            href: "/services/bathroom-shower-remodel/",
          },
          {
            label: "Bathtub remodels for a more relaxing and modern bathing space",
            href: "/services/bathtub-remodeling/",
          },
          {
            label: "General remodeling solutions for any room in your home",
            href: "/services/remodeling-company/",
          },
        ],
      },
    ],
  },
  {
    slug: "katy-tx",
    name: "Katy, TX",
    href: "/katy-tx/",
    title: "Remodeling Company Katy, TX | Call Us Today!",
    description:
      "Enhance your home with our trusted remodeling company in Katy, TX. Call (281) 299-2309 for stunning renovations you'll love.",
    h1: "Get Trusted Residential Remodeling Services in Katy, TX",
    body: [
      "When it comes to building your dream home or renovating your existing space, you need a trusted partner who understands your vision. NWS Custom Homes and Remodeling is the premier custom home builder and remodeling company in Katy, TX, dedicated to turning your dreams into reality with top-quality residential remodeling services.",
      "With our extensive experience and expertise, we have earned a reputation for delivering exceptional craftsmanship and personalized service. As a locally owned and operated company, we take pride in our commitment to customer satisfaction and our ability to bring your unique vision to life.",
      "As a full-service custom home builder and remodeling company, we offer a comprehensive range of services tailored to meet your specific needs:",
    ],
    ctaLabel: "Speak to Our Experts",
    formTitle: "Comprehensive Remodeling Services",
    formIntro:
      "Contact us today to discuss your custom home building or remodeling project in Katy, TX. Let us bring your vision to life and create a home that exceeds your expectations.",
    heroImage: "/images/custom-homes-3.jpeg",
    heroImageAlt: "NWS remodeling project serving Katy, TX",
    sections: [
      {
        heading: "Our Services",
        services: [
          { label: "Custom Home Building", href: "/services/custom-home-builder/" },
          { label: "Remodeling", href: "/services/remodeling-company/" },
          { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling/" },
          { label: "Bathroom Remodeling", href: "/services/bathroom-remodeling/" },
          { label: "Whole Home Remodeling", href: "/services/home-remodel/" },
          { label: "Shower Remodel", href: "/services/bathroom-shower-remodel/" },
          { label: "Bathtub Remodel", href: "/services/bathtub-remodeling/" },
        ],
        paragraphs: [
          "At NWS Custom Homes and Remodeling, we prioritize open communication, attention to detail, and quality craftsmanship. Our team of experienced professionals will work closely with you throughout the entire process, ensuring that every aspect of our residential remodeling services are executed to perfection.",
        ],
      },
    ],
  },
  {
    slug: "fulshear-tx",
    name: "Fulshear, TX",
    href: "/fulshear-tx/",
    title: "Remodeling Company Fulshear, TX | Call Us Today!",
    description:
      "Enhance your home with our trusted remodeling company in Fulshear, TX. Call (281) 299-2309 for stunning renovations you'll love.",
    h1: "Your First Choice for Residential Remodeling Services in Fulshear, TX",
    body: [
      "Embarking on the journey of constructing your ideal dwelling or transforming your current home requires a dedicated ally who shares your aspirations. NWS Custom Homes and Remodeling stands out as the leading custom home builder and provider of residential remodeling services in Fulshear, TX, with a steadfast dedication to actualizing your dream home. Reach out to us today!",
    ],
    ctaLabel: "Speak to Our Experts",
    formTitle: "Team Up With Us!",
    formIntro:
      "Reach out to us for an in-depth conversation about your refurbishment plans in Fulshear, TX. Entrust us with the responsibility of translating your visions into reality.",
    heroImage: "/images/home-addition-contractors.webp",
    heroImageAlt: "NWS remodeling project serving Fulshear, TX",
    sections: [
      {
        heading: "Discover Top-Notch Remodeling Solutions",
        paragraphs: [
          "In a sector populated with competitors, NWS Custom Homes and Remodeling distinguishes itself by not just constructing structures but by building dreams, establishing us as the remodeling company families trust. Our comprehensive service list, consistent quality, and client-focused approach make us the go-to choice in Fulshear, TX. Whether it's a custom build or a home remodel, we're shaping futures, one brick at a time.",
          "Our identity as a holistic custom home builder and remodeling company equips us to present an all-encompassing array of services, meticulously curated to align with your distinct requirements.",
        ],
        services: [
          {
            label: "Custom Home Building",
            detail:
              "From lot selection to final walkthrough, we build fully personalized homes from the ground up.",
            href: "/services/custom-home-builder/",
          },
          {
            label: "Whole Home Remodeling",
            detail:
              "Complete interior transformations to refresh layout, style, and function across your entire home.",
            href: "/services/remodeling-company/",
          },
          {
            label: "Kitchen Remodeling",
            detail:
              "Upgrade your kitchen with improved layouts, modern finishes, and high-performance features.",
            href: "/services/kitchen-remodeling/",
          },
          {
            label: "Bathroom Remodeling",
            detail:
              "Transform outdated bathrooms into functional, stylish spaces tailored to your needs.",
            href: "/services/bathroom-remodeling/",
          },
          {
            label: "Shower Remodel",
            detail:
              "Replace old showers with sleek, durable designs that enhance comfort and usability.",
            href: "/services/bathroom-shower-remodel/",
          },
          {
            label: "Bathtub Remodel",
            detail:
              "Swap outdated tubs for modern, relaxing options that elevate your bathroom experience.",
            href: "/services/bathtub-remodeling/",
          },
          {
            label: "General Remodeling",
            detail:
              "Interior upgrades for any room, including living spaces, bedrooms, and more.",
            href: "/services/home-remodel/",
          },
        ],
      },
    ],
  },
  {
    slug: "west-side-of-houston-tx",
    name: "West Side of Houston, TX",
    href: "/west-side-of-houston-tx/",
    title: "Remodeling Company West Side of Houston, TX | Start Your Project!",
    description:
      "Looking for a remodeling company on West Side of Houston, TX? Call NWS Custom Homes and Remodeling at (281) 299-2309 today for renovations.",
    h1: "Your Trusted Residential Remodeling Services in the West Side of Houston, TX",
    body: [
      "Hiring the right remodeling company can feel like a gamble. Missed deadlines, unclear communication, and unexpected costs can turn a home upgrade into a stressful experience. Many homeowners are left chasing contractors or dealing with unfinished work that doesn't reflect their vision.",
      "That's where we come in. At NWS Custom Homes and Remodeling, we've been serving homeowners across the West Side of Houston, TX, since 2007 with dependable residential remodeling services tailored to your lifestyle. From small upgrades to full-scale transformations, we build with purpose and precision. Our team takes the time to understand your goals, offering creative design ideas and high-quality workmanship that bring your vision to life.",
      "Whether you're planning a stylish kitchen update or a full home remodel, we deliver clear communication, reliable timelines, and personalized service. We know how important your home is, and we're here to make it better, not harder.",
      "Let us take the stress out of remodeling. With NWS, you can feel confident knowing your home is in capable hands.",
    ],
    ctaLabel: "Start Your Project",
    formTitle: "Get in Touch for Remodeling Services Near You",
    formIntro:
      "Ready to start your remodel in the West Side of Houston, TX? Fill out the form below to connect with NWS Custom Homes and Remodeling for local, reliable renovation services.",
    heroImage: "/images/remodeling-1.jpeg",
    heroImageAlt: "NWS remodeling project serving the West Side of Houston, TX",
    sections: [
      {
        heading: "Let's Build Something Great, Schedule Your Remodel Today!",
        paragraphs: [
          "At NWS Custom Homes and Remodeling, we're proud to offer a full range of residential remodeling services designed to meet your unique remodeling goals. Whether you're improving functionality, increasing value, or just updating a space to reflect your taste, our work is customized to fit the needs of West Side of Houston, TX residents.",
        ],
        services: [
          {
            label: "Custom Home Building",
            detail:
              "As your dedicated custom home builder, we craft fully personalized homes from the ground up.",
            href: "/services/custom-home-builder/",
          },
          {
            label: "Remodeling",
            detail:
              "We handle everything from small updates to large-scale home remodel projects, all tailored to your space and style.",
            href: "/services/remodeling-company/",
          },
          {
            label: "Kitchen Remodeling",
            detail:
              "Bring new life to your kitchen with thoughtful layouts, modern finishes, and smart storage solutions.",
            href: "/services/kitchen-remodeling/",
          },
          {
            label: "Bathroom Remodeling",
            detail:
              "From sleek vanities to functional upgrades, our bathroom remodeling service focuses on comfort and design.",
            href: "/services/bathroom-remodeling/",
          },
          {
            label: "Whole Home Remodeling",
            detail:
              "Give your entire home a cohesive, modern look with our whole-house transformation services.",
            href: "/services/home-remodel/",
          },
          {
            label: "Shower Remodel",
            detail:
              "Need a bathroom shower remodel? We install walk-in showers, custom tilework, and fixtures that add style and function.",
            href: "/services/bathroom-shower-remodel/",
          },
          {
            label: "Bathtub Remodel",
            detail:
              "Our bathtub remodeling service upgrades old tubs with stylish, accessible, and relaxing options.",
            href: "/services/bathtub-remodeling/",
          },
        ],
      },
      {
        heading: "Your Quick Guide to Hiring the Right Remodeling Company",
        paragraphs: [
          "Starting a renovation project can be exciting, but also intimidating. At NWS Custom Homes and Remodeling, we've been helping homeowners since 2007 and understand what goes into a successful remodeling experience.",
        ],
        bullets: [
          "Know Your Why: Understanding the purpose behind your remodel helps guide decisions, whether it's resale value or everyday comfort.",
          "Set a Realistic Budget: Plan for both expected costs and unexpected surprises to avoid project delays or cuts mid-way.",
          "Prioritize Communication: Choose a team that listens to your goals and updates you regularly throughout the process.",
          "Think Function First: Especially in kitchen remodeling and bathroom remodeling, design should always serve the way you live.",
        ],
      },
    ],
  },
  {
    slug: "cinco-ranch-tx",
    name: "Cinco Ranch, TX",
    href: "/cinco-ranch-tx/",
    title: "Remodeling Company Cinco Ranch, TX | NWS Custom Homes and Remodeling",
    description:
      "Discover trusted remodeling solutions in Cinco Ranch, TX. Call (281) 299-2309 for tailored upgrades, custom homes, and exceptional service.",
    h1: "Transform Your Home With Superior Residential Remodeling Services in Cinco Ranch, TX",
    body: [
      "Revamping your home should feel exciting, not overwhelming. From choosing the right contractor to balancing budgets and perfecting designs, the process can come with its challenges. Partnering with a skilled remodeling team ensures your home improvement journey is smooth and stress-free.",
      "At NWS Custom Homes and Remodeling in Cinco Ranch, TX, we take pride in turning your ideas into reality. Our dedication to craftsmanship and personalized service has made us a go-to resource for homeowners for quality residential remodeling services. Whether it's a modern kitchen makeover, a spa-like bathroom remodel, or a full home renovation, we bring creativity and reliability to every project.",
      "Let our experienced team manage the details, ensuring your remodel is completed on time and meets the highest standards. Your dream home is just a call away.",
    ],
    heroImage: "/images/custom-homes-4.jpeg",
    heroImageAlt: "NWS remodeling project serving Cinco Ranch, TX",
    ctaLabel: "Discuss Your Remodeling Project Now",
    ctaHref: "/contact/",
    formTitle: "Plan Your Remodeling Service Today",
    formIntro:
      "Reach out to us in Cinco Ranch, TX, for tailored remodeling and custom home solutions. Fill out our form to receive personalized recommendations and expert service.",
    sections: [
      {
        heading: "Discover Our Services for Your Dream Space",
        paragraphs: [
          "NWS Custom Homes and Remodeling offers Cinco Ranch, TX, residents a variety of remodeling services tailored to their unique needs. We focus on designs that complement your lifestyle and elevate your living space.",
        ],
        services: [
          {
            label: "Custom Home Building",
            detail:
              "Our team can craft personalized homes that reflect your vision, from the ground up.",
            href: "/services/custom-home-builder/",
          },
          {
            label: "Remodeling",
            detail:
              "We're here to refresh any space with designs that bring new life to your home.",
            href: "/services/remodeling-company/",
          },
          {
            label: "Kitchen Remodeling",
            detail:
              "Count on us to enhance your kitchen's functionality and style with layouts that suit your needs.",
            href: "/services/kitchen-remodeling/",
          },
          {
            label: "Bathroom Remodeling",
            detail:
              "Let us upgrade your bathroom with luxurious touches and efficient features.",
            href: "/services/bathroom-remodeling/",
          },
          {
            label: "Whole Home Remodeling",
            detail:
              "We can reimagine your entire home with cohesive designs that maximize appeal and usability.",
            href: "/services/home-remodel/",
          },
          {
            label: "Shower Remodel",
            detail:
              "Upgrade your shower with sleek, durable materials and layouts that improve both style and usability.",
            href: "/services/bathroom-shower-remodel/",
          },
          {
            label: "Bathtub Remodel",
            detail:
              "Replace outdated tubs with modern, comfortable options designed for relaxation and everyday convenience.",
            href: "/services/bathtub-remodeling/",
          },
        ],
      },
      {
        heading: "Achieving success in Your Remodel",
        paragraphs: [
          "Starting a remodeling project can feel like a big step, but the right knowledge can simplify the process. Staying informed about remodeling trends in Cinco Ranch, TX, helps you make decisions that add value and suit your preferences.",
          "Explore our specialties:",
          "Here's how to make your remodel a success:",
          "These tips are a starting point for creating a home you'll love for years.",
        ],
        bullets: [
          "Set Clear Goals: Define the must-haves and priorities for your project to guide your decisions.",
          "Plan Your Budget Wisely: Allocate resources effectively to stay on track without compromising quality.",
          "Select Durable Materials: Choose finishes that combine beauty and resilience for lasting results.",
          "Partner With Professionals: A dependable contractor ensures the project stays on schedule and meets your expectations.",
        ],
      },
    ],
  },
  {
    slug: "rosenberg-tx",
    name: "Rosenberg, TX",
    href: "/rosenberg-tx/",
    title: "Remodeling Company Rosenberg, TX | NWS Custom Homes and Remodeling",
    description:
      "Revamp your home with NWS Custom Homes and Remodeling, your remodeling company in Rosenberg, TX. Call (281) 299-2309 for custom home solutions.",
    h1: "Revitalize Your Home with Reliable Residential Remodeling Services in Rosenberg, TX",
    body: [
      "Feeling overwhelmed with your current living space? We know how frustrating it can be when your home doesn't meet your needs. Remodeling projects often bring chaos and stress, disrupting your daily life. Finding dependable residential remodeling services in Rosenberg, TX, can seem impossible.",
      "At NWS Custom Homes and Remodeling, we're here to change that. We've been serving communities since 2007, transforming homes into beautiful, functional spaces. Whether you need a kitchen overhaul or a complete home makeover, our services ensure your home reflects your style and fits your lifestyle.",
      "Imagine walking into a home where every room feels just right. Say goodbye to cramped kitchens and outdated bathrooms. Our remodeling company focuses on creating spaces that make you happy and comfortable.",
    ],
    ctaLabel: "Get Started",
    ctaHref: "/contact/",
    formTitle: "Ready to Upgrade Your Home?",
    formIntro:
      "Transform your living space with our remodeling services. Reach out to NWS Custom Homes and Remodeling and start your journey toward a beautiful, functional home today.",
    heroImage: "/images/remodeling-3.jpeg",
    heroImageAlt: "NWS remodeling project serving Rosenberg, TX",
    sections: [
      {
        heading: "Discover Our Remodeling Services",
        paragraphs: [
          "We're proud to offer a variety of residential remodeling services tailored for Rosenberg, TX, residents. Our goal is to make your remodeling journey smooth and satisfying. From modernizing kitchens to creating custom homes, we've got you covered.",
        ],
        services: [
          {
            label: "Custom Home Building",
            detail:
              "We design and build homes from the ground up, focusing on your vision and local building standards.",
            href: "/services/custom-home-builder/",
          },
          {
            label: "Home Remodeling",
            detail:
              "Refresh your entire home with our remodeling services, crafted to meet local preferences and climate conditions.",
            href: "/services/remodeling-company/",
          },
          {
            label: "Kitchen Remodeling",
            detail:
              "Create a functional, stylish kitchen that makes cooking a joy. We focus on layout, storage, and design tailored to your needs.",
            href: "/services/kitchen-remodeling/",
          },
          {
            label: "Bathroom Remodeling",
            detail:
              "Transform your bathroom into a relaxing retreat with modern fixtures and designs that maximize space.",
            href: "/services/bathroom-remodeling/",
          },
          {
            label: "Whole Home Remodeling",
            detail:
              "Overhaul your entire home for a fresh, cohesive look that enhances comfort and functionality.",
            href: "/services/home-remodel/",
          },
          {
            label: "Shower Remodel",
            detail:
              "Upgrade your shower with sleek, durable materials and layouts that improve both style and usability.",
            href: "/services/bathroom-shower-remodel/",
          },
          {
            label: "Bathtub Remodel",
            detail:
              "Replace outdated tubs with modern, comfortable options designed for relaxation and everyday convenience.",
            href: "/services/bathtub-remodeling/",
          },
        ],
      },
      {
        heading: "Your Roadmap to a Successful Remodeling Project",
        paragraphs: [
          "Planning a remodeling project in Rosenberg, TX, can feel overwhelming, but with the right tips and knowledge, you can handle it confidently. Our guide is designed to help you plan effectively and achieve the best results.",
          "Here are some practical tips to get you started:",
          "These tips will help you start your project with confidence. We love sharing our knowledge to help homeowners. Whether you're doing it yourself or seeking professional help, these tips are just the beginning.",
          "Ready to transform your home? Contact NWS Custom Homes and Remodeling in Rosenberg, TX, today.",
        ],
        bullets: [
          "Budget Wisely: Determine your budget and stick to it. This prevents unexpected costs and keeps your project on track.",
          "Know Your Style: Collect ideas and decide on your design preferences to ensure a cohesive look and smooth communication with us.",
          "Choose the Right Team: Hire a reputable remodeling company like NWS Custom Homes and Remodeling. Check references and past projects to ensure quality.",
          "Prepare for Surprises: Remodeling can bring unexpected challenges. Have a buffer in your budget and timeline to handle unforeseen issues.",
        ],
      },
    ],
  },
  {
    slug: "weston-lakes-tx",
    name: "Weston Lakes, TX",
    href: "/weston-lakes-tx/",
    title: "Remodeling Company Weston Lakes, TX | NWS Custom Homes and Remodeling",
    description:
      "Partner with a premier remodeling company in Weston Lakes, TX. Call us at (281) 299-2309 for home transformations, custom builds, and more.",
    h1: "Partner With a Premier Provider of Residential Remodeling Services in Weston Lakes, TX",
    body: [
      "Remodeling a home can feel overwhelming. Between choosing the right contractor, managing budgets, and making endless design decisions, homeowners often face a range of frustrations. Finding a trustworthy, experienced remodeling company that delivers quality residential remodeling services can make all the difference in creating a functional, beautiful space without stress.",
      "At NWS Custom Homes and Remodeling in Weston Lakes, TX, we specialize in helping you bring your vision to life. With a commitment to quality and a focus on personalized service, we've been transforming homes since 2007. Whether you're dreaming of a kitchen upgrade, a luxurious bathroom remodel, or a complete home transformation, we're here to exceed your expectations.",
      "Experience a remodeling journey that's seamless and satisfying. Let our team of professionals handle every aspect, ensuring your project is completed on time and to the highest standards.",
    ],
    ctaLabel: "Start Your Remodeling Project Now",
    ctaHref: "/contact/",
    formTitle: "Schedule Your Local Remodeling Service",
    formIntro:
      "Get in touch with us in Weston Lakes, TX, for custom home and remodeling solutions. Fill out our form for more details and personalized service recommendations.",
    heroImage: "/images/remodeling-2.jpeg",
    heroImageAlt: "NWS remodeling project serving Weston Lakes, TX",
    sections: [
      {
        heading: "Explore Our Services and Revitalize Your Space",
        paragraphs: [
          "NWS Custom Homes and Remodeling is proud to offer Weston Lakes, TX, residents a full suite of residential remodeling services designed to address your unique home improvement needs. Each service is tailored to align with local styles, preferences, and the needs of Texas homeowners.",
        ],
        services: [
          {
            label: "Custom Home Building",
            detail:
              "Our team can bring your dream home to life, creating a personalized space from the ground up.",
            href: "/services/custom-home-builder/",
          },
          {
            label: "Remodeling",
            detail:
              "We're here to help you transform any room, giving your home a fresh look and feel.",
            href: "/services/remodeling-company/",
          },
          {
            label: "Kitchen Remodeling",
            detail:
              "Count on us to update your kitchen with a beautiful, functional design that suits your lifestyle.",
            href: "/services/kitchen-remodeling/",
          },
          {
            label: "Bathroom Remodeling",
            detail:
              "Let us create a relaxing, modern bathroom that adds value and style to your home.",
            href: "/services/bathroom-remodeling/",
          },
          {
            label: "Whole Home Remodeling",
            detail:
              "We can transform your entire home, delivering a cohesive and stunning new look for every room.",
            href: "/services/home-remodel/",
          },
          {
            label: "Shower Remodel",
            detail:
              "Upgrade your shower with sleek, durable materials and layouts that improve both style and usability.",
            href: "/services/bathroom-shower-remodel/",
          },
          {
            label: "Bathtub Remodel",
            detail:
              "Replace outdated tubs with modern, comfortable options designed for relaxation and everyday convenience.",
            href: "/services/bathtub-remodeling/",
          },
        ],
      },
      {
        heading: "Achieve Your Remodeling Goals With Our Tips",
        paragraphs: [
          "Remodeling can seem like a daunting field, but with the right information, you can approach your project confidently. Understanding current remodeling trends in Weston Lakes, TX, can help you make choices that add value and enjoyment to your home.",
          "With these tips, you're ready to make informed decisions for your remodel. At NWS Custom Homes and Remodeling, we're passionate about sharing our expertise and supporting homeowners at every step. Whether you're pursuing a DIY project or seeking professional help, our team is here to help you succeed.",
        ],
        bullets: [
          "Define Your Priorities: Start by identifying what matters most to you, whether it's functionality, aesthetics, or specific features.",
          "Set a Realistic Budget: Establishing a budget early on will help you make informed choices and keep the project within financial reach.",
          "Choose Quality Materials: Investing in durable, high-quality materials ensures that your remodel will stand the test of time.",
          "Work with a Reliable Contractor: Choosing a trusted contractor helps keep your project on track and within budget.",
        ],
      },
    ],
  },
  {
    slug: "park-row-tx",
    name: "Park Row, TX",
    href: "/park-row-tx/",
    title: "Home Remodeling Park Row | TX",
    description:
      "Quality home remodeling in Park Row, TX since 2007. Kitchen, bathroom, custom builds, and additions. Call (281) 299-2309 for your consultation.",
    h1: "Professional Home Remodeling Services in Park Row, TX",
    body: [
      "Complete Renovation Solutions for Your Property",
      "Finding a trusted contractor in Park Row can feel overwhelming when you're planning a major renovation or building project. At NWS Custom Homes and Remodeling, we've been transforming homes across Park Row and the surrounding Richmond area since 2007. Our team understands the unique needs of Texas homeowners, from dealing with our humid climate that demands proper moisture control to creating outdoor living spaces that can withstand our intense summer heat.",
      "Whether you're planning a complete kitchen renovation, updating your bathroom, adding square footage with a home addition, or building a custom home from the ground up, our experienced team handles every phase of your project. We specialize in kitchen and bathroom remodeling, custom home construction, foundation work, roofing services, and whole-home renovations that help Park Row families create functional, beautiful living spaces.",
      "Our approach starts with understanding your vision and budget during a personalized consultation. From there, we handle project planning, architectural drawings, permit coordination, and construction management so you can focus on the exciting parts of your transformation. We maintain clear communication throughout the process and keep your property clean and organized during construction.",
      "Park Row homeowners choose us because we treat every project like it's our own home. Our team includes licensed contractors, skilled craftsmen, and dedicated project managers who ensure quality work at every stage. We offer comprehensive services including foundation installation and drainage, structural repairs both interior and exterior, concrete work, deck and patio construction, roofing installation and repair, and full remodeling services.",
      "We understand that home improvement projects are significant investments. That's why we provide transparent pricing, realistic timelines, and regular updates as your project progresses. Our commitment is to deliver craftsmanship that lasts and spaces your family will enjoy for years to come. Call us at (281) 299-2309 to schedule your free consultation and discuss how we can bring your vision to life.",
    ],
    ctaLabel: "Get Your Free Consultation",
    ctaHref: "/contact/",
    formTitle: "Transform Your Park Row Home Today",
    formIntro:
      "Call us to discuss your project. Our team will help you create the functional, beautiful space your family deserves.",
    heroImage: "/images/Professional-Home-Remodeling-Services-in-Park-Row-TX.webp",
    heroImageAlt: "Professional home remodeling services in Park Row, TX",
    sections: [],
  },
];

/** @deprecated use per-location services; kept for Areas chips compatibility */
/** @deprecated use canonicalServiceAreaCatalog and per-location services. */
export const serviceLinksForLocations = [
  {
    label: "Custom home building",
    detail: "from lot selection and design to full construction",
    href: "/services/custom-home-builder/",
  },
  {
    label: "Whole home remodeling",
    detail: "for top-to-bottom transformations",
    href: "/services/remodeling-company/",
  },
  {
    label: "Kitchen remodeling",
    detail: "to improve layout, functionality, and style",
    href: "/services/kitchen-remodeling/",
  },
  {
    label: "Bathroom remodeling",
    detail: "with upgraded features and finishes",
    href: "/services/bathroom-remodeling/",
  },
  {
    label: "Shower remodels",
    detail: "that blend comfort, aesthetics, and performance",
    href: "/services/bathroom-shower-remodel/",
  },
  {
    label: "Bathtub remodels",
    detail: "for a more relaxing and modern bathing space",
    href: "/services/bathtub-remodeling/",
  },
  {
    label: "General remodeling",
    detail: "solutions for any room in your home",
    href: "/services/home-remodel/",
  },
];
