import React, { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = {
  "About Us": [
    {
      question: "What makes ApplyOnce different?",
      answer:
        "ApplyOnce streamlines the application process by allowing you to apply to multiple opportunities with a single profile. Our smart matching system helps you find the most relevant opportunities across jobs, internships, grants, and scholarships.",
    },
    {
      question: "Is ApplyOnce free to use?",
      answer:
        "Yes, basic features are free for all users. We also offer premium plans with advanced features for power users and organizations.",
    },
  ],
  Product: [
    {
      question: "How do I create my unified profile?",
      answer:
        "Simply sign up and follow our guided profile creation process. You can import details from your existing resume or fill in our smart forms. Your profile automatically adapts to different application requirements.",
    },
    {
      question: "Can I track my applications?",
      answer:
        "Yes, ApplyOnce provides a comprehensive dashboard where you can track all your applications, their status, and receive updates in real-time.",
    },
  ],
  Applications: [
    {
      question: "How long does the application process take?",
      answer:
        "With your unified profile, most applications take less than 5 minutes to complete. Our system automatically formats your information to match each opportunity's requirements.",
    },
    {
      question: "Can I apply to multiple opportunities at once?",
      answer:
        "Yes! That's one of our core features. You can select multiple relevant opportunities and apply to all of them with just a few clicks.",
    },
  ],
};

const FAQSection = () => {
  const [activeTab, setActiveTab] = React.useState("Product");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="pt-36">
      <div className="max-w-[1400px] px-14 max-lg:px-8 m-auto">
        <div className="flex items-start justify-between w-full max-lg:flex-col">
          <div className="text-center space-y-4 mb-5">
            <h2 className="text-4xl max-md:text-2xl font-bold text-left leading-snug">
              Common Questions
              <br />
              <span className="text-primary">About ApplyOnce</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-start gap-2 flex-wrap mb-8">
            {Object.keys(faqs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-main_color/5 text-muted-foreground hover:bg-accent"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="w-full space-y-3">
          {faqs[activeTab].map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-main_color/5 rounded-3xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-6 py-6 text-left cursor-pointer"
                >
                  <span className="font-medium">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 text-muted-foreground transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  className={`px-6 transition-[max-height] duration-300 overflow-hidden ${
                    isOpen ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <p className="text-muted-foreground pb-6">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
