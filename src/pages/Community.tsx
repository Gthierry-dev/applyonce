
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Award } from 'lucide-react';

const Community = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
          <p className="text-xl text-muted-foreground">
            Connect with others, share tips, and celebrate success stories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Discussions</CardTitle>
              <CardDescription>Join conversations with peers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Discuss application strategies, share experiences, and learn from others in your field.
              </p>
              <Button variant="outline" className="w-full">Browse Topics</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <MessageSquare className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Q&A Forums</CardTitle>
              <CardDescription>Get answers to your questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Post questions and get help from community members and experts in various fields.
              </p>
              <Button variant="outline" className="w-full">Ask a Question</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <Award className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Success Stories</CardTitle>
              <CardDescription>Celebrating achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Read inspiring stories from members who have secured opportunities through our platform.
              </p>
              <Button variant="outline" className="w-full">Read Stories</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to join the conversation?</h2>
          <Button size="lg" className="px-8">Sign Up Now</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
