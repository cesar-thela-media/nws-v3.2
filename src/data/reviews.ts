/**
 * Real client reviews as published on nws-homes.com
 * (names, dates, quotes from Google / Angi on the live site).
 *
 * Avatar photos are professional stock-style portraits for UI only, 
 * not verified Google profile photos of the named reviewers.
 * Project images are real NWS portfolio photos.
 */

export type Review = {
  name: string;
  date: string;
  text: string;
  source: "Google" | "Angi";
  initial: string;
  projectTag: string;
  projectImage: string;
  /** Portrait photo for avatar circle */
  avatar: string;
};

export const reviews: Review[] = [
  {
    name: "Allison Crane",
    date: "08/30/2023",
    initial: "A",
    source: "Google",
    projectTag: "Kitchen & living remodel",
    projectImage: "/images/kitchen-gallery-1.jpeg",
    avatar: "/images/avatars/avatar-1.jpg",
    text: "NWS remodeled the downstairs of our house including the kitchen, dining, 2 living rooms, and a half bath. It turned out beautifully and they were so easy to work with. Each time an issue presented itself, they handled it calmly, professionally, and worked to find a pragmatic solution. Also, they were able to complete the job in just 3 months! We have been very impressed and plan to use their services for our next home improvement project!",
  },
  {
    name: "Katie Jacob",
    date: "08/15/2023",
    initial: "K",
    source: "Google",
    projectTag: "Custom home build",
    projectImage: "/images/custom-homes-1.jpeg",
    avatar: "/images/avatars/avatar-2.jpg",
    text: "NWS took care of our full home build during the middle of the pandemic. Giovani and Alejandro are great communicators and kept us up to date on the home build and any hiccups along the way (long lead times for supplies, thanks Covid). We are very pleased with the outcome of our home and service provided during the building experience.",
  },
  {
    name: "Carrie Neal",
    date: "07/21/2023",
    initial: "C",
    source: "Google",
    projectTag: "Multiple projects",
    projectImage: "/images/remodeling-1.jpeg",
    avatar: "/images/avatars/avatar-3.jpg",
    text: "We have used NWS for several home projects, from minor things to major renovations. We keep going back to them because they do good work!",
  },
  {
    name: "Amy Heinz",
    date: "07/04/2023",
    initial: "A",
    source: "Google",
    projectTag: "Renovation",
    projectImage: "/images/remodeling-2.jpeg",
    avatar: "/images/avatars/avatar-4.jpg",
    text: "These guys are top notch. Contractors are usually tough, but Alejandro and crew always responded, always showed up and made sure the job was done right! We will use NWS again no doubt.",
  },
  {
    name: "Drew Lowery",
    date: "06/16/2021",
    initial: "D",
    source: "Google",
    projectTag: "Full renovation",
    projectImage: "/images/whole-home-remodeling-richmond-tx.jpg",
    avatar: "/images/avatars/avatar-5.jpg",
    text: "First class operation and team from building scope of work to final punch list. Alejandro was the Manager over our home renovation and did a great job handling everything we asked of he and his team. Would highly recommend to anyone looking to build custom or have a custom renovation completed.",
  },
  {
    name: "Sheila Ventura",
    date: "03/19/2020",
    initial: "S",
    source: "Google",
    projectTag: "Four bathrooms",
    projectImage: "/images/bathroom-gallery-1.jpeg",
    avatar: "/images/avatars/avatar-6.jpg",
    text: "NWS has just remodeled all 4 of our bathrooms and did a fantastic job. They are friendly and easy to work with and the quality of their work is very good. I would highly recommend them for any Remodeling work you need done",
  },
  {
    name: "Mark Dixon",
    date: "05/16/2018",
    initial: "M",
    source: "Google",
    projectTag: "Patio & roof",
    projectImage: "/images/custom-homes-3.jpeg",
    avatar: "/images/avatars/avatar-7.jpg",
    text: "NWS did a great job doing the concrete work and building a 12′ x 40′ covered patio along with a total roof replacement. They were professional, easy to work with, and kept the work area clean. I am very pleased with the results. Based on my experience with NWS, I would use them again.",
  },
  {
    name: "Mark D.",
    date: "10/23/2017",
    initial: "M",
    source: "Angi",
    projectTag: "Patio & roof",
    projectImage: "/images/remodeling-3.jpeg",
    avatar: "/images/avatars/avatar-8.jpg",
    text: "Everything went well. The employees were professional and very detailed. I was updated daily on progress and what to expect by the end of the job. The project did not go over budget. It was performed in a timely manner as explained prior to work beginning. The worksite was clean and a follow up crew came by to pick up any left over debris. The results were great. The roof was inspected after installation with no problems or errors reported. The patio looks great. The painters did a good job as well and there were no spills or spots of paint left behind.",
  },
  {
    name: "Eddie L.",
    date: "04/03/2017",
    initial: "E",
    source: "Angi",
    projectTag: "Remodeling",
    projectImage: "/images/kitchen-gallery-2.jpeg",
    avatar: "/images/avatars/avatar-9.jpg",
    text: "Very well and all work completed promptly",
  },
  {
    name: "Tim O.",
    date: "03/31/2017",
    initial: "T",
    source: "Angi",
    projectTag: "Bath, outdoor kitchen & pool",
    projectImage: "/images/bathroom-gallery-2.jpeg",
    avatar: "/images/avatars/avatar-10.jpg",
    text: "Excellent! Very pleased with NWS remodeling. Great value and they can do anything! NWS remodeled our master bathroom and added an outdoor kitchen with a 500 square foot deck as well as replastered our pool and did new flagstone surrounding pool. The work was top notch and they worked with us when we had questions or concerns and were always there to make the final outcome top notch. Would highly recommend and have used them on several smaller projects since and have always been impressed.",
  },
];

export type TestimonialCard = {
  name: string;
  username: string;
  body: string;
  initial: string;
  avatar: string;
  projectImage: string;
  source: "Google" | "Angi";
  date: string;
};

export const nwsTestimonials: TestimonialCard[] = reviews.map((r) => ({
  name: r.name,
  username: `${r.source} · ${r.date}`,
  body: `“${r.text}”`,
  initial: r.initial,
  avatar: r.avatar,
  projectImage: r.projectImage,
  source: r.source,
  date: r.date,
}));
