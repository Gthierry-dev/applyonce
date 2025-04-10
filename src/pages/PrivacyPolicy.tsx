
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 10, 2025</p>
        
        <Separator className="my-6" />
        
        <div className="prose prose-slate max-w-none">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              At ApplyOnce, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile applications, or any other services we offer (collectively, the "Services").
            </p>
            <p className="mb-4">
              Please read this Privacy Policy carefully. By using our Services, you agree to the collection, use, and sharing of your information as described in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, information we collect automatically when you use our Services, and information from third parties.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">2.1 Information You Provide</h3>
            <p className="mb-4">
              We collect information you provide when you:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Create an account or profile</li>
              <li>Fill out application forms</li>
              <li>Upload documents or other content</li>
              <li>Communicate with us or other users</li>
              <li>Participate in surveys or promotions</li>
              <li>Request customer support</li>
            </ul>
            <p className="mb-4">
              This information may include your name, email address, phone number, mailing address, employment history, education, skills, interests, and any other information you choose to provide.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">2.2 Information We Collect Automatically</h3>
            <p className="mb-4">
              When you use our Services, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Log data (e.g., IP address, browser type, pages visited, time spent)</li>
              <li>Device information (e.g., device type, operating system)</li>
              <li>Location information</li>
              <li>Cookies and similar technologies</li>
              <li>Usage information (e.g., actions taken, features used)</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">2.3 Information from Third Parties</h3>
            <p className="mb-4">
              We may receive information about you from third parties, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Business partners</li>
              <li>Social media platforms (if you connect your account)</li>
              <li>Background check providers (with your consent)</li>
              <li>Other users (e.g., referrals, recommendations)</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information for various purposes, including to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Provide, maintain, and improve our Services</li>
              <li>Process applications and match you with opportunities</li>
              <li>Communicate with you about our Services</li>
              <li>Personalize your experience</li>
              <li>Analyze usage patterns and trends</li>
              <li>Detect, investigate, and prevent fraudulent or unauthorized activities</li>
              <li>Comply with legal obligations</li>
              <li>Respond to your requests or inquiries</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Opportunity providers (e.g., employers, scholarship committees)</li>
              <li>Service providers (e.g., hosting, analytics, payment processing)</li>
              <li>Business partners (with your consent)</li>
              <li>Legal authorities (when required by law)</li>
              <li>Affiliated companies</li>
              <li>Other users (as directed by you)</li>
            </ul>
            <p className="mb-4">
              We may also share aggregated or de-identified information that cannot reasonably be used to identify you.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Choices and Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="mb-4">
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="mb-4">
              Our Services are not intended for children under the age of 16. We do not knowingly collect or solicit personal information from children under 16. If we learn that we have collected personal information from a child under 16, we will promptly delete it. If you believe we have collected information from a child under 16, please contact us.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p className="mb-4">
              Your information may be transferred to, stored, and processed in countries other than the one in which you reside. By using our Services, you consent to the transfer of your information to countries that may have different data protection laws from your country of residence.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to this Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The most current version will always be posted on our website with the effective date. If we make material changes, we will provide notice through our Services or by other means.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <p className="mb-4">
              Email: privacy@applyonce.com<br />
              Address: 123 Main Street, Suite 100, San Francisco, CA 94105
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
