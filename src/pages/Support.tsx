
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Mail, PhoneCall, HelpCircle } from 'lucide-react';

const Support = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
          <p className="text-xl text-muted-foreground">
            Our support team is here to assist you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <MessageSquare className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Talk to a support agent</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Get immediate assistance through our live chat support. Available Monday through Friday, 9am to 5pm EST.
              </p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Mail className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Send us a message</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                Email our support team for non-urgent inquiries. We usually respond within 24 hours.
              </p>
              <Button variant="outline" className="w-full">Email Us</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <PhoneCall className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>Speak with a representative</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">
                For premium and enterprise customers. Available Monday through Friday, 9am to 5pm EST.
              </p>
              <Button variant="outline" className="w-full">Call Support</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input id="first-name" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input id="last-name" placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question in detail"
                    rows={5}
                  />
                </div>
                
                <Button className="w-full">Submit</Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="h-6 w-6" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: "How do I reset my password?",
                    a: "You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email."
                  },
                  {
                    q: "Can I use ApplyOnce on my mobile device?",
                    a: "Yes! ApplyOnce is fully responsive and works on all devices, including smartphones and tablets."
                  },
                  {
                    q: "How do I update my application information?",
                    a: "You can update your application information from your dashboard by selecting the application and clicking the 'Edit' button."
                  }
                ].map((faq, i) => (
                  <div key={i} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
              <Button variant="link" className="p-0 h-auto mt-4">
                View all FAQs →
              </Button>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Operating Hours</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM EST</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 2:00 PM EST</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Email support is available 24/7, but responses outside of business hours may be delayed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
