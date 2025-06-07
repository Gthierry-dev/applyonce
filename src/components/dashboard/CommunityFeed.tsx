import React, { useState } from 'react';
import { MessageSquare, ArrowUp, ArrowDown, Share2, Bookmark, TrendingUp, Flame, Heart, Eye } from 'lucide-react';

const PostCard = ({ post, onClick, onLike }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      setIsLiked(true);
      setLikes(prev => prev + 1);
      onLike && onLike(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex">
        <div className="flex flex-col items-center p-2 bg-gray-50 rounded-l-lg">
          <ArrowUp className="w-5 h-5 text-gray-400 hover:text-orange-500 cursor-pointer" />
          <span className="text-sm font-medium text-gray-600">{post.votes}</span>
          <ArrowDown className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
        </div>
        <div className="flex-1 p-4" onClick={() => onClick(post)}>
          <div className="flex items-center mb-2">
            <span className="text-xs text-gray-500">r/{post.community} • {post.timeAgo}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600">{post.title}</h3>
          {post.content && <p className="text-gray-700 text-sm mb-3">{post.content}</p>}
          {post.image && (
            <div className="mb-3 relative" onDoubleClick={handleDoubleClick}>
              <img src={post.image} alt="" className="rounded-lg max-h-96 w-full object-cover" />
              {isLiked && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Heart className="w-16 h-16 text-red-500 fill-current animate-pulse" />
                </div>
              )}
            </div>
          )}
          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
            <div className={`flex items-center space-x-1 hover:text-red-500 cursor-pointer ${isLiked ? 'text-red-500' : ''}`}>
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

const TrendingCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 mb-6">
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h3 className="font-semibold text-gray-900">Trending Today</h3>
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
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-gray-900">{item.topic}</span>
          </div>
          <span className="text-xs text-gray-500">{item.posts}</span>
        </div>
      ))}
    </div>
  </div>
);

const AdSpace = () => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-gray-200 p-6 text-center">
    <h4 className="font-semibold text-gray-900 mb-2">Advertise Here</h4>
    <p className="text-sm text-gray-600 mb-4">Reach thousands of engaged users</p>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
      Learn More
    </button>
  </div>
);

const CommunityFeed = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'u/animeFan2024', content: 'This is so wholesome! Love the character development.', votes: 45, timeAgo: '2h ago', replies: [] },
    { id: 2, user: 'u/spyFamily', content: 'Loid is definitely the best dad in anime right now', votes: 23, timeAgo: '1h ago', replies: [
      { id: 3, user: 'u/mangaReader', content: 'Agreed! The manga is even better', votes: 12, timeAgo: '45m ago' }
    ]},
  ]);
  
  const posts = [
    {
      id: 1,
      title: "loid is so wholesome",
      content: "",
      community: "SpyxFamily",
      votes: 1247,
      comments: 89,
      likes: 324,
      timeAgo: "20 min ago",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "He seen this before by JegsArt!",
      content: "",
      community: "anime",
      votes: 892,
      comments: 156,
      likes: 567,
      timeAgo: "2h ago",
      image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=600&h=900&fit=crop"
    },
    {
      id: 3,
      title: "Amazing fan art compilation",
      content: "Check out these incredible artworks from the community!",
      community: "AnimeArt",
      votes: 2341,
      comments: 234,
      likes: 1892,
      timeAgo: "4h ago",
      image: "https://images.unsplash.com/photo-1612198537655-ba6e3aaeb578?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Weekly anime discussion thread",
      content: "What's everyone watching this season? Drop your recommendations!",
      community: "anime",
      votes: 567,
      comments: 445,
      likes: 892,
      timeAgo: "6h ago",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Cosplay event highlights",
      content: "",
      community: "cosplay",
      votes: 1834,
      comments: 167,
      likes: 2341,
      timeAgo: "8h ago",
      image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=600&h=500&fit=crop"
    }
  ];

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { 
        id: Date.now(), user: 'u/you', content: newComment, votes: 1, timeAgo: 'now', replies: [] 
      }]);
      setNewComment('');
    }
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button onClick={() => setSelectedPost(null)} className="mb-4 text-blue-600 hover:text-blue-800 font-medium">
          ← Back to feed
        </button>
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-500">r/{selectedPost.community} • {selectedPost.timeAgo}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
          {selectedPost.content && <p className="text-gray-700 mb-6">{selectedPost.content}</p>}
          {selectedPost.image && <img src={selectedPost.image} alt="" className="rounded-lg w-full mb-6" />}
          <div className="flex items-center space-x-6 text-gray-500 border-t pt-4">
            <div className="flex items-center space-x-2">
              <ArrowUp className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
              <span className="font-medium">{selectedPost.votes}</span>
              <ArrowDown className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>{selectedPost.comments} comments</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
            <button 
              onClick={addComment}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              Comment
            </button>
          </div>

          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="border-l-2 border-gray-100 pl-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-sm text-blue-600">{comment.user}</span>
                  <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                </div>
                <p className="text-gray-800 mb-2">{comment.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <ArrowUp className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
                    <span>{comment.votes}</span>
                    <ArrowDown className="w-4 h-4 hover:text-blue-500 cursor-pointer" />
                  </div>
                  <button className="hover:text-gray-700">Reply</button>
                </div>
                {comment.replies?.map(reply => (
                  <div key={reply.id} className="ml-6 mt-3 border-l-2 border-gray-50 pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-blue-600">{reply.user}</span>
                      <span className="text-xs text-gray-500">{reply.timeAgo}</span>
                    </div>
                    <p className="text-gray-800 text-sm mb-2">{reply.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ArrowUp className="w-4 h-4 hover:text-orange-500 cursor-pointer" />
                        <span>{reply.votes}</span>
                        <ArrowDown className="w-4 h-4 hover:text-blue-500 cursor-pointer" />
                      </div>
                      <button className="hover:text-gray-700">Reply</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Posts</h2>
            {posts.map(post => (
              <PostCard key={post.id} post={post} onClick={setSelectedPost} onLike={(id) => console.log(`Liked post ${id}`)} />
            ))}
          </div>
        </div>
        
        <div className="w-80">
          <TrendingCard />
          <AdSpace />
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;