"use client";

import { Separator } from "@/components/ui/separator";
import { site } from "@/data/site";
import { motion } from "motion/react";

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

/** Copy block for orange contact section; hours + promo animate into view */
const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 text-white min-w-0 w-full">
      <motion.div
        className="flex flex-col gap-3 sm:gap-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fade}
      >
        <div className="flex gap-3 items-center">
          <div className="w-2 h-2 rounded-full bg-white shrink-0" />
          <p className="text-base font-medium text-white/90 !m-0">
            Start Your Project
          </p>
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white !m-0 text-balance">
          Reach Out to Our Contractors
        </p>
        <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-md !m-0 leading-relaxed text-pretty">
          Our friendly team is here to help. Questions or queries? Get in touch!
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-5 sm:gap-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={fade}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-medium text-white/70 !m-0">Office</p>
          <a
            href={`tel:${site.phone.officeTel}`}
            className="text-base font-semibold text-white hover:text-white/90 underline-offset-2 hover:underline"
          >
            {site.phone.office}
          </a>
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-sm font-medium text-white/70 !m-0">Mobile</p>
          <a
            href={`tel:${site.phone.mobileTel}`}
            className="text-base font-semibold text-white hover:text-white/90 underline-offset-2 hover:underline"
          >
            {site.phone.mobile}
          </a>
        </div>
        <div className="flex flex-col gap-1 min-w-0 min-[400px]:col-span-2">
          <p className="text-sm font-medium text-white/70 !m-0">Email</p>
          <a
            href={`mailto:${site.email}`}
            className="text-base font-semibold text-white hover:text-white/90 underline-offset-2 hover:underline break-all"
          >
            {site.email}
          </a>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-1"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fade}
      >
        <p className="text-sm font-medium text-white/70 !m-0">Location</p>
        <p className="text-base font-semibold text-white !m-0">
          {site.location}
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col gap-1"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
      >
        <p className="text-sm font-medium text-white/70 !m-0">Hours</p>
        <p className="text-base font-medium text-white !m-0">
          {site.hours.weekdays}
        </p>
        <p className="text-base font-medium text-white !m-0">
          {site.hours.saturday}
        </p>
        <p className="text-base font-medium text-white/75 !m-0">
          {site.hours.sunday}
        </p>
      </motion.div>

      <Separator
        orientation="horizontal"
        className="bg-white/25 data-[orientation=horizontal]:bg-white/25"
      />
      <motion.p
        className="text-sm text-white/85 !m-0"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
      >
        Mention this website for a free consultation and 5% off your next
        project.
      </motion.p>
    </div>
  );
};

export default ContactInfo;
