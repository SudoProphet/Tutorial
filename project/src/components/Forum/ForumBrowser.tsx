import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Clock, Search, Plus, Tag } from 'lucide-react';
import { ForumPost } from '../../types';

const SAMPLE_POSTS: ForumPost[] = [
  {
    id: '1',
    title: 'Help with Python loops - getting stuck on for vs while',
    content: 'I\'m working through the Python fundamentals lesson and having trouble understanding when to use for loops vs while loops. Can someone explain the difference with some examples?',
    authorId: '2',
    author: {
      id: '2',
      email: 'sarah@example.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      username: 'sarahj',
      totalPoints: 450,
      currentBadge: {
        id: 'silver',
        name: 'Silver Achiever',
        description: 'Demonstrated consistent learning',
        pointsRequired: 300,
        color: '#C0C0C0',
        icon: 'Medal'
      },
      joinedAt: '2024-01-08T10:00:00Z',
      lastActive: '2024-01-20T14:30:00Z',
      completedLessons: ['intro-algorithms', 'python-basics'],
      completedQuizzes: ['intro-algorithms-quiz']
    },
    category: 'python',
    tags: ['loops', 'beginner', 'help'],
    likes: 12,
    replies: [
      {
        id: '1',
        content: 'Great question! For loops are best when you know how many times you want to iterate, while loops are better when you want to continue until a condition is met.',
        authorId: '3',
        author: {
          id: '3',
          email: 'mike@example.com',
          firstName: 'Mike',
          lastName: 'Chen',
          username: 'mikechen',
          totalPoints: 1200,
          currentBadge: {
            id: 'gold',
            name: 'Gold Performer',
            description: 'Excellent programming skills',
            pointsRequired: 700,
            color: '#FFD700',
            icon: 'Trophy'
          },
          joinedAt: '2024-01-05T10:00:00Z',
          lastActive: '2024-01-20T16:00:00Z',
          completedLessons: ['intro-algorithms', 'python-basics', 'data-structures-arrays'],
          completedQuizzes: ['intro-algorithms-quiz']
        },
        likes: 8,
        createdAt: '2024-01-20T10:30:00Z'
      }
    ],
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-20T09:00:00Z'
  },
  {
    id: '2',
    title: 'Array vs List - What\'s the actual difference?',
    content: 'I keep seeing both terms used. Are arrays and lists the same thing in Python? What about in other languages like Java or C?',
    authorId: '4',
    author: {
      id: '4',
      email: 'alex@example.com',
      firstName: 'Alex',
      lastName: 'Rodriguez',
      username: 'alexr',
      totalPoints: 680,
      currentBadge: {
        id: 'silver',
        name: 'Silver Achiever',
        description: 'Demonstrated consistent learning',
        pointsRequired: 300,
        color: '#C0C0C0',
        icon: 'Medal'
      },
      joinedAt: '2024-01-12T10:00:00Z',
      lastActive: '2024-01-19T20:15:00Z',
      completedLessons: ['intro-algorithms', 'data-structures-arrays'],
      completedQuizzes: []
    },
    category: 'data-structures',
    tags: ['arrays', 'lists', 'comparison'],
    likes: 7,
    replies: [],
    createdAt: '2024-01-19T15:00:00Z',
    updatedAt: '2024-01-19T15:00:00Z'
  }
];

interface ForumBrowserProps {
  onPostSelect: (post: ForumPost) => void;
}

const ForumBrowser: React.FC<ForumBrowserProps> = ({ onPostSelect }) => {
  const [posts] = useState<ForumPost[]>(SAMPLE_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C Programming' },
    { value: 'algorithms', label: 'Algorithms' },
    { value: 'data-structures', label: 'Data Structures' },
    { value: 'general', label: 'General Discussion' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
          <p className="text-gray-600">Ask questions, share knowledge, and connect with fellow learners</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            onClick={() => onPostSelect(post)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              {/* Author Avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {post.author.firstName.charAt(0)}{post.author.lastName.charAt(0)}
                </span>
              </div>

              {/* Post Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  {post.category && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {post.content}
                </p>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <span className="font-medium text-gray-700">{post.author.firstName} {post.author.lastName}</span>
                      <span 
                        className="ml-2 px-2 py-1 text-xs text-white rounded-full"
                        style={{ backgroundColor: post.author.currentBadge.color }}
                      >
                        {post.author.currentBadge.name.split(' ')[0]}
                      </span>
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {getTimeAgo(post.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.replies.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">Try adjusting your search or create a new post</p>
        </div>
      )}
    </div>
  );
};

export default ForumBrowser;