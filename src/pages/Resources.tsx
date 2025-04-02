
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, HelpCircle, Newspaper } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Resources</h1>
          <p className="text-xl text-muted-foreground">
            Helpful guides, articles, and FAQs to help you succeed
          </p>
        </div>
        
        <Tabs defaultValue="guides" className="w-full mb-12">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
          </TabsList>
          
          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Writing an Effective Cover Letter",
                  description: "Learn how to craft a compelling cover letter that gets results",
                  icon: <FileText className="h-8 w-8 text-primary" />
                },
                {
                  title: "Resume Building 101",
                  description: "Tips and tricks for creating a standout resume",
                  icon: <FileText className="h-8 w-8 text-primary" />
                },
                {
                  title: "Interview Preparation",
                  description: "Common questions and how to answer them confidently",
                  icon: <FileText className="h-8 w-8 text-primary" />
                },
                {
                  title: "Scholarship Application Guide",
                  description: "Step-by-step process for applying to scholarships",
                  icon: <FileText className="h-8 w-8 text-primary" />
                }
              ].map((guide, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    {guide.icon}
                    <div>
                      <CardTitle>{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Click to read our comprehensive guide on this topic.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="faqs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-6 w-6" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      q: "How do I track my application status?",
                      a: "You can view and track all your application statuses from your dashboard under the 'Applications' tab."
                    },
                    {
                      q: "Can I apply to multiple opportunities at once?",
                      a: "Yes! Our platform allows you to use your stored information to apply to multiple opportunities with just a few clicks."
                    },
                    {
                      q: "How do I update my profile information?",
                      a: "You can update your profile information from the 'Settings' section of your dashboard."
                    },
                    {
                      q: "Is my personal information secure?",
                      a: "We take security seriously. All your data is encrypted and we never share your information without your consent."
                    }
                  ].map((faq, i) => (
                    <div key={i} className="border-b pb-4 last:border-0">
                      <h3 className="font-semibold mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blog" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Top 10 Scholarships for STEM Students",
                  date: "June 15, 2023",
                  excerpt: "Discover the best scholarship opportunities for students in Science, Technology, Engineering, and Mathematics."
                },
                {
                  title: "How to Stand Out in Competitive Internships",
                  date: "May 22, 2023",
                  excerpt: "Practical advice on making your application shine in a sea of qualified candidates."
                },
                {
                  title: "Grant Writing: Tips from the Experts",
                  date: "April 10, 2023",
                  excerpt: "Learn from successful grant recipients about what makes a winning application."
                },
                {
                  title: "Planning Your Academic Journey: A Roadmap",
                  date: "March 5, 2023",
                  excerpt: "Strategic planning for your academic and professional development from start to finish."
                }
              ].map((post, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <Newspaper className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="webinars" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Upcoming Webinars
                </CardTitle>
                <CardDescription>
                  Register for our free educational webinars led by industry experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Networking for Career Advancement",
                      date: "July 10, 2023 • 2:00 PM EST",
                      speaker: "Dr. Emily Chen, Career Coach"
                    },
                    {
                      title: "Crafting the Perfect Application Essay",
                      date: "July 17, 2023 • 1:00 PM EST",
                      speaker: "Prof. Michael Johnson, Writing Specialist"
                    },
                    {
                      title: "Funding Your Research: A Guide to Grants",
                      date: "July 24, 2023 • 3:00 PM EST",
                      speaker: "Dr. Samantha Williams, Research Director"
                    }
                  ].map((webinar, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <h3 className="font-semibold">{webinar.title}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{webinar.date}</p>
                      <p className="text-sm text-muted-foreground mb-2">Presenter: {webinar.speaker}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Free
                        </span>
                        <button className="text-sm font-medium text-primary hover:underline">
                          Register →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Resources;
