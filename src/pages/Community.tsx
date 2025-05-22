
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Award, Lock } from 'lucide-react';
import CTASection from '@/components/home/CTASection';

const Community = () => {
  return (
    <Layout>
      <div className="py-16 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-xl text-muted-foreground">
              Connect with others, share tips, and celebrate success stories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Users className="h-10 w-10 text-[#004D43] mb-2" />,
                title: "Discussions",
                description: "Join conversations with peers",
                content: "Discuss application strategies, share experiences, and learn from others in your field.",
                action: "Browse Topics"
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-[#004D43] mb-2" />,
                title: "Q&A Forums",
                description: "Get answers to your questions",
                content: "Post questions and get help from community members and experts in various fields.",
                action: "Ask a Question"
              },
              {
                icon: <Award className="h-10 w-10 text-[#004D43] mb-2" />,
                title: "Success Stories",
                description: "Celebrating achievements",
                content: "Read inspiring stories from members who have secured opportunities through our platform.",
                action: "Read Stories"
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

          <div className="max-w-6xl mx-auto mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Community Discussions</CardTitle>
                <CardDescription>Join the conversation with other job seekers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Locked Content Overlay */}
                  <div className="relative">
                    <div className="blur-sm pointer-events-none">
                      {/* Sample Discussion Posts */}
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="border-b border-border p-4">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-muted" />
                            <div className="flex-1">
                              <h3 className="font-medium">Discussion Title {i + 1}</h3>
                              <p className="text-sm text-muted-foreground">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                              </p>
                              <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                                <span>15 comments</span>
                                <span>2 hours ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Login Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                      <div className="text-center">
                        <Lock className="h-12 w-12 text-[#004D43] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Join the Conversation</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Login to access community discussions and connect with other members
                        </p>
                        <Button className="bg-[#004D43] hover:bg-[#003D33] text-white">
                          Login to Access
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <CTASection />
    </Layout>
  );
};

export default Community;
