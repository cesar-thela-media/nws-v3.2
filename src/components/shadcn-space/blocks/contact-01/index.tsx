import ContactInfo from "@/components/shadcn-space/blocks/contact-01/contact-info";
import ContactForm from "@/components/shadcn-space/blocks/contact-01/contact-form";

const Contact = () => {
  return (
    <section
      className="py-10 sm:py-14 md:py-20 lg:py-24 bg-primary text-white w-full max-w-full overflow-x-clip"
      data-contact-01
    >
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 sm:px-6 mx-auto w-full min-w-0">
        {/* Mobile: form first (action), then details. Desktop: info | form. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8 items-start">
          <div className="w-full min-w-0 order-2 md:order-1 md:col-span-6">
            <ContactInfo />
          </div>
          <div className="hidden md:block md:col-span-1 md:order-2" aria-hidden />
          <div className="w-full min-w-0 order-1 md:order-3 md:col-span-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
