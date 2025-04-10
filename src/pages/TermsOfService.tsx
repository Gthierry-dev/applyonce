
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const TermsOfService = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 10, 2025</p>
        
        <Separator className="my-6" />
        
        <div className="prose prose-slate max-w-none">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to ApplyOnce ("we," "our," or "us"). By accessing or using our website, mobile applications, or any other services we offer (collectively, the "Services"), you agree to be bound by these Terms of Service.
            </p>
            <p className="mb-4">
              Please read these Terms carefully. They constitute a legal agreement between you and ApplyOnce. If you do not agree with any part of these Terms, you may not use our Services.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
            <p className="mb-4">
              To access certain features of our Services, you may need to register for an account. When you register, you agree to provide accurate, current, and complete information about yourself.
            </p>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
            <p className="mb-4">
              When using our Services, you agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Interfere with or disrupt our Services</li>
              <li>Attempt to gain unauthorized access to our Services</li>
              <li>Use our Services for any unlawful purpose</li>
              <li>Transmit any viruses, worms, or other malicious code</li>
              <li>Engage in automated data collection without our consent</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">4. Content and Intellectual Property</h2>
            <p className="mb-4">
              Our Services contain content owned or licensed by ApplyOnce, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software. This content is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mb-4">
              You may not copy, reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services without our express written consent.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">5. User Content</h2>
            <p className="mb-4">
              You may be able to submit content to our Services, such as application details, profiles, and other materials ("User Content"). You retain ownership of your User Content, but you grant us a non-exclusive, royalty-free, worldwide, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content.
            </p>
            <p className="mb-4">
              You are solely responsible for your User Content and the consequences of posting it. We reserve the right to remove any User Content that violates these Terms or that we find objectionable for any reason.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">6. Privacy</h2>
            <p className="mb-4">
              Our Privacy Policy describes how we collect, use, and share information about you when you use our Services. By using our Services, you agree to our collection, use, and sharing of your information as described in the Privacy Policy.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p className="mb-4">
              Upon termination, your right to use our Services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <p className="mb-4">
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p className="mb-4">
              WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE CORRECTED.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              IN NO EVENT SHALL APPLYONE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF OUR SERVICES.
            </p>
            <p className="mb-4">
              OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED THE AMOUNT YOU PAID TO US, IF ANY, FOR THE USE OF OUR SERVICES DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
            <p className="mb-4">
              We may revise these Terms from time to time. The most current version will always be posted on our website. If a revision is material, we will provide notice prior to the new terms taking effect.
            </p>
            <p className="mb-4">
              By continuing to use our Services after revisions become effective, you agree to be bound by the revised Terms.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-4">
              Email: support@applyonce.com<br />
              Address: 123 Main Street, Suite 100, San Francisco, CA 94105
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
