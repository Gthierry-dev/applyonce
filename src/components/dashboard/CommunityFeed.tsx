import React, { useState } from 'react';
import { MessageSquare, ArrowUp, ArrowDown, Share2, Bookmark, TrendingUp, Flame, Heart, Eye, Image as ImageIcon, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const PostCard = ({ post, onClick, onLike, onDelete, currentUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const isOwner = currentUser && post.userId === currentUser.id;

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLikes(prev => prev + 1);
      onLike && onLike(post.id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex">
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-l-lg">
          <ArrowUp className="w-5 h-5 text-gray-400 hover:text-main_color cursor-pointer" />
          <span className="text-sm font-medium text-gray-600">{post.votes}</span>
          <ArrowDown className="w-5 h-5 text-gray-400 hover:text-main_color cursor-pointer" />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">r/{post.community} • {post.timeAgo}</span>
              {isOwner && (
                <span className="text-xs text-main_color">• Your post</span>
              )}
            </div>
            {isOwner && (
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Delete post"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-main_color">{post.title}</h3>
          {post.content && <p className="text-gray-700 text-sm mb-3">{post.content}</p>}
          {post.image && (
            <div className="mb-3 relative" onDoubleClick={handleDoubleClick}>
              <img src={post.image} alt="" className="rounded-lg max-h-96 w-full object-cover" />
              {isLiked && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Heart className="w-16 h-16 text-main_color fill-current animate-pulse" />
                </div>
              )}
            </div>
          )}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
            <div className={`flex items-center space-x-1 hover:text-main_color cursor-pointer ${isLiked ? 'text-main_color' : ''}`}>
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <Bookmark className="w-4 h-4" />
              <span>Save</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ comments, onAddComment, onAddReply, onDeleteComment, currentUser }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (parentId) => {
    if (newComment.trim()) {
      onAddReply(parentId, newComment);
      setNewComment('');
      setReplyingTo(null);
    }
  };

  const handleDeleteComment = (commentId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDeleteComment(commentId);
    }
  };

  const renderComment = (comment, depth = 0) => {
    const isOwner = currentUser && comment.userId === currentUser.id;

    return (
      <div key={comment.id} className={cn("border-l-2 pl-4", depth > 0 ? "border-gray-100" : "border-main_color/20")}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-sm text-main_color">{comment.user}</span>
            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
            {isOwner && (
              <span className="text-xs text-main_color">• Your comment</span>
            )}
          </div>
          {isOwner && (
            <button
              onClick={(e) => handleDeleteComment(comment.id, e)}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Delete comment"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-gray-800 mb-2">{comment.content}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ArrowUp className="w-4 h-4 hover:text-main_color cursor-pointer" />
            <span>{comment.votes}</span>
            <ArrowDown className="w-4 h-4 hover:text-main_color cursor-pointer" />
          </div>
          <button 
            className="hover:text-main_color"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
          >
            Reply
          </button>
        </div>
        
        {replyingTo === comment.id && (
          <div className="mt-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a reply..."
              className="mb-2"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
              <Button onClick={() => handleSubmitReply(comment.id)}>Reply</Button>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map(reply => renderComment(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="mb-2"
        />
        <Button onClick={handleSubmitComment} className="w-full">Comment</Button>
      </div>

      <div className="space-y-4">
        {comments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
};

const CreatePostDialog = ({ open, onOpenChange, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!content.trim()) {
      alert('Please enter some content');
      return;
    }
    if (!topic && !newTopic.trim()) {
      alert('Please select or create a topic');
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically upload the image to your server/storage
      // and get back a URL
      const imageUrl = image ? URL.createObjectURL(image) : null;
      
      onSubmit({
        title,
        content,
        topic: newTopic || topic,
        image: imageUrl
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setTopic('');
      setNewTopic('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Topic</Label>
            <div className="flex gap-2">
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="ai-tools">AI Tools</SelectItem>
                  <SelectItem value="startup-life">Startup Life</SelectItem>
                  <SelectItem value="remote-work">Remote Work</SelectItem>
                  <SelectItem value="job-search">Job Search</SelectItem>
                  <SelectItem value="career-advice">Career Advice</SelectItem>
                  <SelectItem value="interview-tips">Interview Tips</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Or create new topic"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              maxLength={300}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/300 characters</p>
          </div>

          <div>
            <Label>Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={6}
              className="resize-none"
            />
          </div>

          <div>
            <Label>Image (optional)</Label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Upload Image
              </label>
              <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
            </div>
            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-lg"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-main_color hover:bg-main_color/90"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const CommunityFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting started with React 18",
      content: "Here's my experience with the new features in React 18...",
      community: "react",
      votes: 1247,
      comments: 89,
      likes: 324,
      timeAgo: "20 min ago",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Best practices for remote work",
      content: "After 3 years of remote work, here are my top tips...",
      community: "remote-work",
      votes: 892,
      comments: 156,
      likes: 567,
      timeAgo: "2h ago",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop"
    }
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'u/techEnthusiast',
      content: 'Great insights! I especially liked the part about...',
      votes: 45,
      timeAgo: '2h ago',
      replies: [
        {
          id: 3,
          user: 'u/codeMaster',
          content: 'Thanks for the feedback! I\'m glad you found it helpful.',
          votes: 12,
          timeAgo: '1h ago',
          replies: []
        }
      ]
    },
    {
      id: 2,
      user: 'u/webDev',
      content: 'Have you tried using the new hooks? They make this even easier.',
      votes: 23,
      timeAgo: '1h ago',
      replies: []
    }
  ]);

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      votes: 0,
      comments: 0,
      likes: 0,
      timeAgo: 'just now'
    };
    setPosts([newPost, ...posts]);
    setCreatePostOpen(false);
  };

  const handleAddComment = (content) => {
    const newComment = {
      id: Date.now(),
      user: 'u/you',
      content,
      votes: 0,
      timeAgo: 'just now',
      replies: []
    };
    setComments([...comments, newComment]);
  };

  const handleAddReply = (parentId, content) => {
    const newReply = {
      id: Date.now(),
      user: 'u/you',
      content,
      votes: 0,
      timeAgo: 'just now',
      replies: []
    };

    const updateComments = (comments) => {
      return comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: updateComments(comment.replies)
          };
        }
        return comment;
      });
    };

    setComments(updateComments(comments));
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setSelectedPost(null)}
          className="mb-4 text-main_color hover:text-main_color/80 font-medium"
        >
          ← Back to feed
        </button>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-500">r/{selectedPost.community} • {selectedPost.timeAgo}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
          {selectedPost.content && <p className="text-gray-700 mb-6">{selectedPost.content}</p>}
          {selectedPost.image && (
            <img src={selectedPost.image} alt="" className="rounded-lg w-full mb-6" />
          )}
          
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onDeleteComment={handleDeleteComment}
            currentUser={{ id: 1 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Latest Posts</h2>
              <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-main_color hover:bg-main_color/90">
                    Create Post
                  </Button>
                </DialogTrigger>
                <CreatePostDialog
                  open={createPostOpen}
                  onOpenChange={setCreatePostOpen}
                  onSubmit={handleCreatePost}
                />
              </Dialog>
            </div>
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => setSelectedPost(post)}
                onLike={(id) => console.log(`Liked post ${id}`)}
                onDelete={(id) => console.log(`Deleted post ${id}`)}
                currentUser={{ id: 1 }}
              />
            ))}
          </div>
        </div>
        
        <div className="w-80">
          <div className="sticky top-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-gray-900">Filter by</span>
                <div className="flex flex-col space-y-1">
                  <button className="text-left px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-700">All</button>
                  <button className="text-left px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-700">Topics</button>
                  <button className="text-left px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-700">Rules</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 mb-4">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-main_color" />
                  <h3 className="font-semibold text-gray-900">Trending Topics</h3>
                </div>
              </div>
              <div className="p-4">
                {[
                  { topic: "Web Development", posts: "2.1k posts" },
                  { topic: "React 18", posts: "1.8k posts" },
                  { topic: "AI Tools", posts: "1.4k posts" },
                  { topic: "Startup Life", posts: "967 posts" },
                  { topic: "Remote Work", posts: "743 posts" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Flame className="w-4 h-4 text-main_color" />
                      <span className="text-sm font-medium text-gray-900">{item.topic}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.posts}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-main_color/5 to-main_color/10 rounded-lg border border-main_color/20 p-6 text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Join Our Community</h4>
              <p className="text-sm text-gray-600 mb-4">Share your experiences and learn from others</p>
              <Button className="bg-main_color hover:bg-main_color/90">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;