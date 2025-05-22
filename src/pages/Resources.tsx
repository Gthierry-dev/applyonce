
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen, HelpCircle, Newspaper } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CTASection from '@/components/home/CTASection';

const Resources = () => {
  return (
    <Layout>
      <div className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Resources</h1>
            <p className="text-xl text-muted-foreground">
              Helpful guides, articles, and FAQs to help you succeed
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="guides" className="w-full mb-12">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4">
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="webinars">Webinars</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Resume Building Guide",
                      description: "Create a standout resume",
                      content: "Learn the essential elements of a professional resume and how to make yours stand out."
                    },
                    {
                      title: "Interview Preparation",
                      description: "Ace your interviews",
                      content: "Comprehensive guide to common interview questions and effective answering strategies."
                    },
                    {
                      title: "Application Strategy",
                      description: "Maximize your chances",
                      content: "Strategic approaches to job applications and following up effectively."
                    },
                    {
                      title: "Career Planning",
                      description: "Plan your path",
                      content: "Long-term career planning strategies and goal-setting techniques."
                    }
                  ].map((item, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <FileText className="h-8 w-8 text-[#004D43] mb-2" />
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="blog" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "How to Stand Out in Job Applications",
                      author: "Career Expert",
                      date: "March 15, 2024",
                      image: "/blog/job-applications.jpg",
                      excerpt: "Learn the key strategies to make your job applications stand out from the crowd."
                    },
                    {
                      title: "The Future of Remote Work",
                      author: "Industry Analyst",
                      date: "March 10, 2024",
                      image: "/blog/remote-work.jpg",
                      excerpt: "Discover how remote work is shaping the future of employment."
                    },
                    // Add more blog posts
                  ].map((post, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        <img src={post.image} alt={post.title} className="object-cover" />
                      </div>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>By {post.author} • {post.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="webinars" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Resume Writing Masterclass",
                      presenter: "Jane Smith",
                      date: "March 20, 2024",
                      time: "2:00 PM EST",
                      description: "Learn how to craft a compelling resume that gets results."
                    },
                    {
                      title: "Interview Success Strategies",
                      presenter: "John Doe",
                      date: "March 25, 2024",
                      time: "3:00 PM EST",
                      description: "Master the art of interviewing with confidence."
                    }
                  ].map((webinar, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>{webinar.title}</CardTitle>
                        <CardDescription>
                          With {webinar.presenter} • {webinar.date} at {webinar.time}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{webinar.description}</p>
                        <Button className="w-full">Register Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Professional Resume",
                      type: "CV Template",
                      downloads: "2.5k",
                      format: "PDF, DOCX"
                    },
                    {
                      title: "Cover Letter",
                      type: "Letter Template",
                      downloads: "1.8k",
                      format: "PDF, DOCX"
                    },
                    {
                      title: "Thank You Note",
                      type: "Email Template",
                      downloads: "1.2k",
                      format: "PDF, TXT"
                    }
                  ].map((template, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <FileText className="h-8 w-8 text-[#004D43] mb-2" />
                        <CardTitle>{template.title}</CardTitle>
                        <CardDescription>{template.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <span>{template.downloads} downloads</span>
                          <span>{template.format}</span>
                        </div>
                        <Button variant="outline" className="w-full">Download</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <CTASection />
    </Layout>
  );
};

export default Resources;
