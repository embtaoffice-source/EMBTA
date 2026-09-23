import React, { useState, useRef } from 'react';
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  Bell,
  Search,
  Activity,
  Plus,
  UploadCloud,
  Trash2,
  CheckCircle,
} from 'lucide-react';
import { SEOHead } from '../components/layout/SEOHead';
import { Breadcrumb } from '../components/common/Breadcrumb';

import { useEffect } from 'react';

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('news');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Data states
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // News form states
  const [newsForm, setNewsForm] = useState({ title: '', excerpt: '', content: '' });
  const [isPublishing, setIsPublishing] = useState(false);

  // Gallery upload states
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Page content states
  const [siteContent, setSiteContent] = useState<Record<string, any>>({});
  const [contentEdits, setContentEdits] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const icons = [FileText, ImageIcon, Activity, Activity];

      // Fetch stats
      fetch('http://localhost:5000/api/stats')
        .then(res => res.json())
        .then(data => {
          const statsWithIcons = data.map((item: any, i: number) => ({ ...item, icon: icons[i] }));
          setStats(statsWithIcons);
        })
        .catch(err => console.error("Error fetching stats", err));

      // Fetch activity
      fetch('http://localhost:5000/api/activity')
        .then(res => res.json())
        .then(data => setRecentActivity(data))
        .catch(err => console.error("Error fetching activity", err));

      // Fetch news
      fetch('http://localhost:5000/api/news')
        .then(res => res.json())
        .then(data => setNews(data))
        .catch(err => console.error("Error fetching news", err));

      // Fetch gallery
      fetch('http://localhost:5000/api/gallery')
        .then(res => res.json())
        .then(data => setGallery(data))
        .catch(err => console.error("Error fetching gallery", err));

      // Fetch site content
      fetch('http://localhost:5000/api/content')
        .then(res => res.json())
        .then((rows: any[]) => {
          const map: Record<string, any> = {};
          const editMap: Record<string, string> = {};
          rows.forEach(r => { map[r.key] = r; editMap[r.key] = r.value; });
          setSiteContent(map);
          setContentEdits(editMap);
        })
        .catch(err => console.error("Error fetching content", err));
    }
  }, [isAuthenticated]);

  const refreshActivity = () =>
    fetch('http://localhost:5000/api/activity')
      .then(res => res.json())
      .then(data => setRecentActivity(data));


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password! Try "admin123"');
    }
  };

  const handlePublishNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    try {
      const res = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newsForm,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          author: 'Admin'
        })
      });
      const newArticle = await res.json();
      setNews([newArticle, ...news]);
      setNewsForm({ title: '', excerpt: '', content: '' });
      
      // Refresh activity feed
      const activityRes = await fetch('http://localhost:5000/api/activity');
      const activityData = await activityRes.json();
      setRecentActivity(activityData);
      
      alert('News published successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to publish news.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsUploading(true);
    setUploadSuccess(false);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('caption', caption);
      const res = await fetch('http://localhost:5000/api/gallery', { method: 'POST', body: formData });
      const newImage = await res.json();
      setGallery([newImage, ...gallery]);
      setSelectedFile(null);
      setCaption('');
      setUploadSuccess(true);
      await refreshActivity();
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Upload failed. Make sure the server is running.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id: number, filename: string) => {
    if (!confirm(`Delete this image permanently?`)) return;
    try {
      await fetch(`http://localhost:5000/api/gallery/${id}`, { method: 'DELETE' });
      setGallery(gallery.filter((img: any) => img.id !== id));
      await refreshActivity();
    } catch (err) {
      alert('Failed to delete image.');
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) setSelectedFile(file);
  };

  const handleSaveContent = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      // Save each changed field
      const saves = Object.entries(contentEdits).map(([key, value]) =>
        fetch(`http://localhost:5000/api/content/${key}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value })
        })
      );
      await Promise.all(saves);

      // Now apply changes to the actual .ts source files
      const applyRes = await fetch('http://localhost:5000/api/content/apply', { method: 'POST' });
      const applyData = await applyRes.json();

      await refreshActivity();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-embta-navy text-embta-light flex flex-col items-center justify-center p-4">
        <SEOHead title="Admin Login" description="Login to EMBTA Portal" />
        <div className="w-full max-w-md bg-embta-navy-dark border border-embta-surface-border p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-heading text-white">EMBTA Admin</h1>
            <p className="text-embta-slate text-sm mt-2">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Password (hint: admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-embta-navy border border-embta-surface-border rounded-xl focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-embta-green text-embta-navy font-bold rounded-xl hover:bg-embta-green-light transition-colors"
            >
              Log In
            </button>
          </form>
          <div className="mt-6 text-center">
             <a href="/" className="text-sm text-embta-slate hover:text-white transition-colors">
               &larr; Back to website
             </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-embta-navy text-embta-light pt-6">
      <SEOHead title="Admin Dashboard" description="EMBTA Backend Administration Portal" />

      {/* Top Bar for Admin */}
      <div className="bg-embta-navy-dark border-b border-embta-surface-border py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Breadcrumb items={[{ label: 'Admin Dashboard' }]} />
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-embta-slate" />
              <input 
                type="text" 
                placeholder="Search admin..." 
                className="pl-9 pr-4 py-1.5 bg-embta-navy border border-embta-surface-border rounded-lg text-sm focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors"
              />
            </div>
            <button className="p-1.5 text-embta-slate hover:text-embta-green transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-4 border-l border-embta-surface-border">
              <div className="w-8 h-8 rounded-full bg-embta-surface-border flex items-center justify-center font-bold text-sm text-embta-green">
                A
              </div>
              <span className="text-sm font-medium hidden sm:block">Admin User</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 shrink-0">
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'news', label: 'News & Events', icon: FileText },
                { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                { id: 'pages', label: 'Edit Page Text', icon: Settings },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-embta-green/10 text-embta-green border border-embta-green/20' 
                        : 'text-embta-slate hover:bg-embta-surface-border hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-embta-green' : 'opacity-70'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              
              <div className="pt-8 mt-8 border-t border-embta-surface-border">
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5 opacity-70" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            
            {/* Header section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Welcome back, Admin
                </h1>
                <p className="text-embta-slate text-sm mt-1">
                  Here is what's happening with the EMBTA platform today.
                </p>
              </div>
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-embta-green text-embta-navy font-bold rounded-lg hover:bg-embta-green-light transition-colors shadow-[0_0_15px_rgba(40,240,165,0.3)]">
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="p-5 rounded-2xl bg-embta-navy-dark border border-embta-surface-border relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-embta-surface-border/50 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500" />
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 rounded-lg bg-embta-surface-border">
                        <Icon className="w-5 h-5 text-embta-green-light" />
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {stat.change}
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                      <p className="text-sm text-embta-slate font-medium">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              <div className="xl:col-span-2 space-y-6">
                {/* Tab switcher */}
                <div className="flex gap-2">
                  {[
                    { id: 'news', label: 'News & Events', icon: FileText },
                    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                    { id: 'pages', label: 'Edit Page Text', icon: Settings },
                  ].map(tab => {
                    const Icon = tab.icon;
                    const isActiveTab = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                          isActiveTab
                            ? 'bg-embta-green/10 text-embta-green border border-embta-green/20'
                            : 'bg-embta-navy-dark border border-embta-surface-border text-embta-slate hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* NEWS EDITOR */}
                {activeTab === 'news' && (
                  <div className="space-y-6">
                    {/* Publish Form */}
                    <div className="bg-embta-navy-dark border border-embta-surface-border rounded-2xl p-6">
                      <h2 className="text-lg font-bold text-white font-heading mb-5">Publish New Article</h2>
                      <form onSubmit={handlePublishNews} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-embta-slate uppercase tracking-wider mb-1.5">Headline / Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Annual General Meeting 2026"
                            value={newsForm.title}
                            onChange={e => setNewsForm({ ...newsForm, title: e.target.value })}
                            className="w-full px-4 py-2.5 bg-embta-navy border border-embta-surface-border rounded-xl text-white placeholder:text-embta-slate focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-embta-slate uppercase tracking-wider mb-1.5">Short Summary *</label>
                          <input
                            type="text"
                            required
                            placeholder="A brief one-line description shown on the news listing page"
                            value={newsForm.excerpt}
                            onChange={e => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                            className="w-full px-4 py-2.5 bg-embta-navy border border-embta-surface-border rounded-xl text-white placeholder:text-embta-slate focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-embta-slate uppercase tracking-wider mb-1.5">Full Content *</label>
                          <textarea
                            required
                            rows={8}
                            placeholder="Write the full article content here..."
                            value={newsForm.content}
                            onChange={e => setNewsForm({ ...newsForm, content: e.target.value })}
                            className="w-full px-4 py-2.5 bg-embta-navy border border-embta-surface-border rounded-xl text-white placeholder:text-embta-slate focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors resize-none"
                          />
                        </div>
                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setNewsForm({ title: '', excerpt: '', content: '' })}
                            className="px-4 py-2 text-sm text-embta-slate hover:text-white border border-embta-surface-border rounded-xl transition-colors"
                          >
                            Clear
                          </button>
                          <button
                            type="submit"
                            disabled={isPublishing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-embta-green text-embta-navy font-bold rounded-xl hover:bg-embta-green-light transition-colors shadow-[0_0_15px_rgba(40,240,165,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {isPublishing ? (
                              <>
                                <div className="w-4 h-4 border-2 border-embta-navy/40 border-t-embta-navy rounded-full animate-spin" />
                                Publishing...
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                Publish Article
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Published Articles List */}
                    <div className="bg-embta-navy-dark border border-embta-surface-border rounded-2xl p-6">
                      <h2 className="text-lg font-bold text-white font-heading mb-5">
                        Published Articles ({news.length})
                      </h2>
                      {news.length === 0 ? (
                        <div className="text-center py-10 text-embta-slate">
                          <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">No articles yet. Use the form above to publish your first one!</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-embta-surface-border/50">
                          {news.map((article: any) => (
                            <div key={article.id} className="py-4 flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white text-sm mb-1 truncate">{article.title}</h3>
                                <p className="text-xs text-embta-slate line-clamp-1">{article.excerpt}</p>
                                <p className="text-xs text-embta-green-light mt-1">{article.date} · by {article.author}</p>
                              </div>
                              <span className="shrink-0 text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                Published
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* GALLERY UPLOADER */}
                {activeTab === 'gallery' && (
                  <div className="space-y-6">
                    {/* Upload Form */}
                    <div className="bg-embta-navy-dark border border-embta-surface-border rounded-2xl p-6">
                      <h2 className="text-lg font-bold text-white font-heading mb-5">Upload New Image</h2>
                      <form onSubmit={handleUploadImage} className="space-y-4">

                        {/* Drag & Drop Zone */}
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleFileDrop}
                          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                            dragOver
                              ? 'border-embta-green bg-embta-green/5'
                              : selectedFile
                              ? 'border-embta-green/50 bg-embta-green/5'
                              : 'border-embta-surface-border hover:border-embta-green/40'
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                          />
                          {selectedFile ? (
                            <div>
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Preview"
                                className="h-40 mx-auto rounded-lg object-cover mb-3"
                              />
                              <p className="text-sm font-medium text-embta-green">{selectedFile.name}</p>
                              <p className="text-xs text-embta-slate mt-1">
                                {(selectedFile.size / 1024).toFixed(0)} KB · Click to change
                              </p>
                            </div>
                          ) : (
                            <div>
                              <UploadCloud className="w-12 h-12 text-embta-slate mx-auto mb-3 opacity-50" />
                              <p className="text-white font-medium mb-1">Drag & drop an image here</p>
                              <p className="text-sm text-embta-slate">or click to browse · JPG, PNG, WEBP up to 10MB</p>
                            </div>
                          )}
                        </div>

                        {/* Caption */}
                        <div>
                          <label className="block text-xs font-semibold text-embta-slate uppercase tracking-wider mb-1.5">Caption (optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. Trade Expo 2026 Opening Ceremony"
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            className="w-full px-4 py-2.5 bg-embta-navy border border-embta-surface-border rounded-xl text-white placeholder:text-embta-slate focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors"
                          />
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-1">
                          {uploadSuccess && (
                            <span className="flex items-center gap-1.5 text-sm text-green-400">
                              <CheckCircle className="w-4 h-4" /> Uploaded!
                            </span>
                          )}
                          <button
                            type="submit"
                            disabled={!selectedFile || isUploading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-embta-green text-embta-navy font-bold rounded-xl hover:bg-embta-green-light transition-colors shadow-[0_0_15px_rgba(40,240,165,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-embta-navy/40 border-t-embta-navy rounded-full animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <UploadCloud className="w-4 h-4" />
                                Upload Image
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Gallery Grid */}
                    <div className="bg-embta-navy-dark border border-embta-surface-border rounded-2xl p-6">
                      <h2 className="text-lg font-bold text-white font-heading mb-5">
                        Gallery Images ({gallery.length})
                      </h2>
                      {gallery.length === 0 ? (
                        <div className="text-center py-10 text-embta-slate">
                          <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-30" />
                          <p className="text-sm">No images yet. Upload your first image above!</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {gallery.map((img: any) => (
                            <div key={img.id} className="group relative rounded-xl overflow-hidden bg-embta-surface-border aspect-square">
                              <img
                                src={img.url}
                                alt={img.caption || 'Gallery image'}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              {/* Overlay on hover */}
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-2">
                                {img.caption && (
                                  <p className="text-white text-xs text-center font-medium line-clamp-2">{img.caption}</p>
                                )}
                                <button
                                  onClick={() => handleDeleteImage(img.id, img.filename)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white text-xs font-medium rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" /> Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* PAGES TEXT EDITOR */}
                {activeTab === 'pages' && (
                  <div className="space-y-6">
                    <div className="bg-embta-navy-dark border border-embta-surface-border rounded-2xl p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <h2 className="text-lg font-bold text-white font-heading">Edit Website Text</h2>
                          <p className="text-xs text-embta-slate mt-1">
                            Changes save to the database and update the website source files instantly via hot-reload.
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {saveSuccess && (
                            <span className="flex items-center gap-1.5 text-sm text-green-400">
                              <CheckCircle className="w-4 h-4" /> Saved & applied!
                            </span>
                          )}
                          <button
                            onClick={handleSaveContent}
                            disabled={isSaving}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-embta-green text-embta-navy font-bold rounded-xl hover:bg-embta-green-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {isSaving ? (
                              <>
                                <div className="w-4 h-4 border-2 border-embta-navy/40 border-t-embta-navy rounded-full animate-spin" />
                                Saving...
                              </>
                            ) : (
                              'Save All Changes'
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Group fields by section */}
                      {['General', 'Contact', 'About'].map(section => {
                        const fields = Object.values(siteContent).filter((f: any) => f.section === section);
                        if (fields.length === 0) return null;
                        return (
                          <div key={section} className="mb-8">
                            <h3 className="text-xs font-bold text-embta-green uppercase tracking-widest mb-4 pb-2 border-b border-embta-surface-border/50">
                              {section}
                            </h3>
                            <div className="space-y-4">
                              {fields.map((field: any) => {
                                const isLong = ['support_text', 'address', 'about_subtitle', 'who_we_are_lead', 'who_we_are_body'].includes(field.key);
                                return (
                                  <div key={field.key}>
                                    <label className="block text-xs font-semibold text-embta-slate uppercase tracking-wider mb-1.5">
                                      {field.label}
                                    </label>
                                    {isLong ? (
                                      <textarea
                                        rows={3}
                                        value={contentEdits[field.key] ?? field.value}
                                        onChange={e => setContentEdits({ ...contentEdits, [field.key]: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-embta-navy border border-embta-surface-border rounded-xl text-white focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors resize-none text-sm"
                                      />
                                    ) : (
                                      <input
                                        type="text"
                                        value={contentEdits[field.key] ?? field.value}
                                        onChange={e => setContentEdits({ ...contentEdits, [field.key]: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-embta-navy border border-embta-surface-border rounded-xl text-white focus:outline-none focus:border-embta-green focus:ring-1 focus:ring-embta-green transition-colors text-sm"
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                <div className="bg-embta-navy-dark border border-embta-surface-border rounded-2xl p-6">
                  <h2 className="text-lg font-bold text-white font-heading mb-6">Activity Feed</h2>
                  <div className="space-y-5">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity: any) => (
                        <div key={activity.id} className="relative pl-4 border-l-2 border-embta-surface-border">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-embta-navy border-2 border-embta-green"></div>
                          <p className="text-sm font-medium text-white mb-0.5">{activity.action}</p>
                          <p className="text-xs text-embta-green-light mb-1">{activity.target}</p>
                          <p className="text-xs text-embta-slate">{activity.time}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-embta-slate text-center">Loading activity...</p>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
};
