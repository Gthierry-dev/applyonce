
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Mail, PhoneCall, MapPin } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';

const Support = () => {
  return (
    <Layout>
      <div className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
            <p className="text-xl text-muted-foreground">
              Our support team is here to assist you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {[
              {
                icon: <MessageSquare className="h-10 w-10 text-[#004D43] mb-2" />,
                title: "Live Chat",
                description: "Talk to a support agent",
                content: "Get immediate assistance through our live chat support. Available Monday through Friday, 9am to 5pm EST.",
                action: "Start Chat"
              },
              {
                icon: <Mail className="h-10 w-10 text-[#004D43] mb-2" />,
                title: "Email Support",
                description: "Send us a message",
                content: "Email our support team for non-urgent inquiries. We usually respond within 24 hours.",
                action: "Email Us"
              },
              {
                icon: <PhoneCall className="h-10 w-10 text-[#004D43] mb-2" />,
                title: "Phone Support",
                description: "Speak with a representative",
                content: "For premium and enterprise customers. Available Monday through Friday, 9am to 5pm EST.",
                action: "Call Support"
              }
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm">{item.content}</p>
                  <Button variant="outline" className="w-full">{item.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Contact Form */}
              <Card className="flex-1">
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
                        <label htmlFor="first-name" className="text-sm font-medium">First Name</label>
                        <Input 
                          id="first-name" 
                          placeholder="Enter your first name" 
                          className="focus-visible:ring-[#004D43] focus-visible:ring-offset-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">Last Name</label>
                        <Input 
                          id="last-name" 
                          placeholder="Enter your last name" 
                          className="focus-visible:ring-[#004D43] focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        className="focus-visible:ring-[#004D43] focus-visible:ring-offset-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea 
                        id="message" 
                        placeholder="How can we help?" 
                        rows={5} 
                        className="focus-visible:ring-[#004D43] focus-visible:ring-offset-0"
                      />
                    </div>
                    <Button className="w-full bg-[#004D43] hover:bg-[#003D33] text-white">Submit</Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Contact Information and Map */}
              <div className="flex-1 flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Get in touch with us</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-[#004D43]" />
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-sm text-muted-foreground">support@applyonce.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneCall className="h-5 w-5 text-[#004D43]" />
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-sm text-muted-foreground">+250 791 284 815</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-[#004D43]" />
                      <div>
                        <h4 className="font-medium">Address</h4>
                        <p className="text-sm text-muted-foreground">
                          Norsken<br />
                          Kigali, Rwanda
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-0">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5077632384716!2d30.0582!3d-1.9441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42bf2b9b8d7%3A0x5a3b1c3f88b92cb7!2sNorsken%20Rwanda!5e0!3m2!1sen!2srw!4v1645564750986!5m2!1sen!2srw"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAQSection />
    </Layout>
  );
};

export default Support;
