import { useState, useEffect } from 'react';
import { 
  X, Save, Plus, Trash2, ChevronDown, ChevronUp, 
  BookOpen, FileText, List, Image, Video, Link as LinkIcon,
  Eye, EyeOff, AlertCircle, Check
} from 'lucide-react';
import { createCourse, updateCourse } from '../../services/adminService';
import ImageUpload from '../ImageUpload';

export default function AdvancedCourseEditor({ course, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Info
    course_id: '',
    title: '',
    slug: '',
    subtitle: '',
    overview: '',
    
    // Categorization
    branch: 'CSE',
    category: '',
    type: 'online',
    level: 'beginner',
    tags: [],
    
    // Pricing
    price_cents: 0,
    mrp_cents: 0,
    discount_percentage: 0,
    is_free: false,
    
    // Content
    description: '',
    detailed_description: {
      sections: []
    },
    what_you_learn: [],
    requirements: [],
    target_audience: [],
    
    // Curriculum
    curriculum: {
      modules: []
    },
    total_duration_hours: 0,
    total_lessons: 0,
    total_modules: 0,
    
    // Instructor
    instructor_name: '',
    instructor_title: '',
    instructor_bio: '',
    instructor_image_url: '',
    
    // Media
    thumbnail_url: '',
    banner_url: '',
    promo_video_url: '',
    gallery_images: [],
    
    // Features
    features: [],
    tools_covered: [],
    projects: [],
    
    // Enrollment
    max_enrollments: null,
    enrollment_start_date: '',
    enrollment_end_date: '',
    course_start_date: '',
    course_end_date: '',
    
    // Certificate
    certificate_available: true,
    certificate_template_url: '',
    
    // Status
    status: 'draft',
    is_featured: false,
    is_trending: false,
    is_new: true,
    
    // SEO
    meta_title: '',
    meta_description: '',
    meta_keywords: []
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [expandedModules, setExpandedModules] = useState([]);

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        price_cents: course.price_cents / 100,
        mrp_cents: course.mrp_cents / 100,
        tags: course.tags || [],
        what_you_learn: course.what_you_learn || [],
        requirements: course.requirements || [],
        target_audience: course.target_audience || [],
        detailed_description: course.detailed_description || { sections: [] },
        curriculum: course.curriculum || { modules: [] },
        features: course.features || [],
        tools_covered: course.tools_covered || [],
        projects: course.projects || [],
        gallery_images: course.gallery_images || [],
        meta_keywords: course.meta_keywords || []
      });
    }
  }, [course]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));

    // Auto-generate slug from title
    if (name === 'title' && !course) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }

    // Auto-calculate discount
    if (name === 'price_cents' || name === 'mrp_cents') {
      const price = name === 'price_cents' ? parseFloat(value) : parseFloat(formData.price_cents);
      const mrp = name === 'mrp_cents' ? parseFloat(value) : parseFloat(formData.mrp_cents);
      if (mrp > 0) {
        const discount = Math.round(((mrp - price) / mrp) * 100);
        setFormData(prev => ({ ...prev, discount_percentage: discount }));
      }
    }
  }

  // Array field helpers
  function addArrayItem(field, value) {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  }

  function removeArrayItem(field, index) {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  }

  // Content Section Management
  function addContentSection() {
    setFormData(prev => ({
      ...prev,
      detailed_description: {
        sections: [
          ...prev.detailed_description.sections,
          {
            type: 'paragraph',
            content: '',
            heading: ''
          }
        ]
      }
    }));
  }

  function updateContentSection(index, updates) {
    setFormData(prev => ({
      ...prev,
      detailed_description: {
        sections: prev.detailed_description.sections.map((section, i) =>
          i === index ? { ...section, ...updates } : section
        )
      }
    }));
  }

  function removeContentSection(index) {
    setFormData(prev => ({
      ...prev,
      detailed_description: {
        sections: prev.detailed_description.sections.filter((_, i) => i !== index)
      }
    }));
  }

  // Curriculum Module Management
  function addModule() {
    setFormData(prev => ({
      ...prev,
      curriculum: {
        modules: [
          ...prev.curriculum.modules,
          {
            title: '',
            description: '',
            duration_hours: 0,
            lessons: []
          }
        ]
      },
      total_modules: prev.total_modules + 1
    }));
  }

  function updateModule(index, updates) {
    setFormData(prev => ({
      ...prev,
      curriculum: {
        modules: prev.curriculum.modules.map((module, i) =>
          i === index ? { ...module, ...updates } : module
        )
      }
    }));
  }

  function removeModule(index) {
    setFormData(prev => ({
      ...prev,
      curriculum: {
        modules: prev.curriculum.modules.filter((_, i) => i !== index)
      },
      total_modules: Math.max(0, prev.total_modules - 1)
    }));
  }

  function addLesson(moduleIndex) {
    setFormData(prev => ({
      ...prev,
      curriculum: {
        modules: prev.curriculum.modules.map((module, i) =>
          i === moduleIndex
            ? {
                ...module,
                lessons: [
                  ...module.lessons,
                  {
                    title: '',
                    type: 'video',
                    duration_minutes: 0,
                    content_url: '',
                    is_free_preview: false
                  }
                ]
              }
            : module
        )
      },
      total_lessons: prev.total_lessons + 1
    }));
  }

  function updateLesson(moduleIndex, lessonIndex, updates) {
    setFormData(prev => ({
      ...prev,
      curriculum: {
        modules: prev.curriculum.modules.map((module, i) =>
          i === moduleIndex
            ? {
                ...module,
                lessons: module.lessons.map((lesson, j) =>
                  j === lessonIndex ? { ...lesson, ...updates } : lesson
                )
              }
            : module
        )
      }
    }));
  }

  function removeLesson(moduleIndex, lessonIndex) {
    setFormData(prev => ({
      ...prev,
      curriculum: {
        modules: prev.curriculum.modules.map((module, i) =>
          i === moduleIndex
            ? {
                ...module,
                lessons: module.lessons.filter((_, j) => j !== lessonIndex)
              }
            : module
        )
      },
      total_lessons: Math.max(0, prev.total_lessons - 1)
    }));
  }

  function toggleModuleExpanded(index) {
    setExpandedModules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        price_cents: Math.round(parseFloat(formData.price_cents) * 100),
        mrp_cents: Math.round(parseFloat(formData.mrp_cents) * 100),
        total_duration_hours: parseInt(formData.total_duration_hours) || 0,
        total_lessons: parseInt(formData.total_lessons) || 0,
        total_modules: parseInt(formData.total_modules) || 0,
        // Auto-generate meta fields if empty
        meta_title: formData.meta_title || formData.title,
        meta_description: formData.meta_description || formData.overview
      };

      // Remove empty dates
      if (!dataToSubmit.enrollment_start_date) delete dataToSubmit.enrollment_start_date;
      if (!dataToSubmit.enrollment_end_date) delete dataToSubmit.enrollment_end_date;
      if (!dataToSubmit.course_start_date) delete dataToSubmit.course_start_date;
      if (!dataToSubmit.course_end_date) delete dataToSubmit.course_end_date;

      if (course) {
        await updateCourse(course.id, dataToSubmit);
        setMessage({ type: 'success', text: 'Course updated successfully!' });
      } else {
        await createCourse(dataToSubmit);
        setMessage({ type: 'success', text: 'Course created successfully!' });
      }

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error saving course:', error);
      setMessage({ type: 'error', text: 'Failed to save course: ' + error.message });
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FileText },
    { id: 'content', label: 'Content & Description', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: List },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'settings', label: 'Settings', icon: Eye }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80">
      <div className="flex items-start justify-center min-h-screen p-4">
        <div className="relative w-full max-w-7xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {course ? 'Edit Course' : 'Create New Course'}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">
                {formData.status === 'published' ? '🟢 Published' : '⚪ Draft'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mx-6 mt-4 p-3 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}>
              {message.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {message.text}
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b border-zinc-800 px-6 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-zinc-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
              {/* BASIC INFO TAB */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Full Stack Web Development Masterclass"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Course ID * <span className="text-xs text-zinc-500">(unique)</span>
                      </label>
                      <input
                        type="text"
                        name="course_id"
                        value={formData.course_id}
                        onChange={handleChange}
                        disabled={!!course}
                        required
                        placeholder="fullstack-2024"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Slug * <span className="text-xs text-zinc-500">(URL-friendly)</span>
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        placeholder="fullstack-web-development"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                        placeholder="Learn HTML, CSS, JavaScript, React, Node.js & More"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Short Overview
                      </label>
                      <textarea
                        name="overview"
                        value={formData.overview}
                        onChange={handleChange}
                        rows={3}
                        placeholder="A brief description that appears on course cards..."
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Branch *
                      </label>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      >
                        <option value="CSE">Computer Science & Engineering</option>
                        <option value="IT">Information Technology</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="EE">Electrical Engineering</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="CE">Civil Engineering</option>
                        <option value="DS">Data Science</option>
                        <option value="AI">Artificial Intelligence</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Course Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      >
                        <option value="online">Online Course</option>
                        <option value="industrial_training">Industrial Training</option>
                        <option value="workshop">Workshop</option>
                        <option value="bootcamp">Bootcamp</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Web Development, Data Science, etc."
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Difficulty Level *
                      </label>
                      <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="all_levels">All Levels</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="price_cents"
                        value={formData.price_cents}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="999"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        MRP (₹)
                      </label>
                      <input
                        type="number"
                        name="mrp_cents"
                        value={formData.mrp_cents}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        placeholder="1999"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Discount %
                      </label>
                      <input
                        type="number"
                        name="discount_percentage"
                        value={formData.discount_percentage}
                        disabled
                        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-500 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Duration (hours)
                      </label>
                      <input
                        type="number"
                        name="total_duration_hours"
                        value={formData.total_duration_hours}
                        onChange={handleChange}
                        min="0"
                        placeholder="40"
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="is_free"
                        checked={formData.is_free}
                        onChange={handleChange}
                        className="w-4 h-4 text-yellow-400 rounded"
                      />
                      <label className="text-sm text-zinc-300">
                        Free Course
                      </label>
                    </div>
                  </div>

                  {/* Instructor Info */}
                  <div className="pt-6 border-t border-zinc-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Instructor Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Instructor Name
                        </label>
                        <input
                          type="text"
                          name="instructor_name"
                          value={formData.instructor_name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          name="instructor_title"
                          value={formData.instructor_title}
                          onChange={handleChange}
                          placeholder="Senior Software Engineer"
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Bio
                        </label>
                        <textarea
                          name="instructor_bio"
                          value={formData.instructor_bio}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Brief bio about the instructor..."
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Instructor Image URL
                        </label>
                        <input
                          type="url"
                          name="instructor_image_url"
                          value={formData.instructor_image_url}
                          onChange={handleChange}
                          placeholder="https://example.com/instructor.jpg"
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTENT TAB */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* What You'll Learn */}
                  <ArrayFieldEditor
                    title="What You'll Learn"
                    items={formData.what_you_learn}
                    onAdd={(value) => addArrayItem('what_you_learn', value)}
                    onRemove={(index) => removeArrayItem('what_you_learn', index)}
                    placeholder="e.g., Build responsive web applications"
                  />

                  {/* Requirements */}
                  <ArrayFieldEditor
                    title="Requirements / Prerequisites"
                    items={formData.requirements}
                    onAdd={(value) => addArrayItem('requirements', value)}
                    onRemove={(index) => removeArrayItem('requirements', index)}
                    placeholder="e.g., Basic knowledge of HTML"
                  />

                  {/* Target Audience */}
                  <ArrayFieldEditor
                    title="Who This Course Is For"
                    items={formData.target_audience}
                    onAdd={(value) => addArrayItem('target_audience', value)}
                    onRemove={(index) => removeArrayItem('target_audience', index)}
                    placeholder="e.g., Aspiring web developers"
                  />

                  {/* Features */}
                  <ArrayFieldEditor
                    title="Course Features"
                    items={formData.features}
                    onAdd={(value) => addArrayItem('features', value)}
                    onRemove={(index) => removeArrayItem('features', index)}
                    placeholder="e.g., Lifetime access, Certificate of completion"
                  />

                  {/* Tools Covered */}
                  <ArrayFieldEditor
                    title="Tools & Technologies"
                    items={formData.tools_covered}
                    onAdd={(value) => addArrayItem('tools_covered', value)}
                    onRemove={(index) => removeArrayItem('tools_covered', index)}
                    placeholder="e.g., React, Node.js, MongoDB"
                  />

                  {/* Projects */}
                  <ArrayFieldEditor
                    title="Projects Included"
                    items={formData.projects}
                    onAdd={(value) => addArrayItem('projects', value)}
                    onRemove={(index) => removeArrayItem('projects', index)}
                    placeholder="e.g., E-commerce Website, Chat Application"
                  />

                  {/* Detailed Description */}
                  <div className="pt-6 border-t border-zinc-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Detailed Description</h3>
                      <button
                        type="button"
                        onClick={addContentSection}
                        className="flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Add Section
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.detailed_description.sections.map((section, index) => (
                        <div key={index} className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <select
                              value={section.type}
                              onChange={(e) => updateContentSection(index, { type: e.target.value })}
                              className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg text-sm"
                            >
                              <option value="heading">Heading</option>
                              <option value="paragraph">Paragraph</option>
                              <option value="list">List</option>
                              <option value="quote">Quote</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => removeContentSection(index)}
                              className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {section.type === 'heading' && (
                            <input
                              type="text"
                              value={section.heading || ''}
                              onChange={(e) => updateContentSection(index, { heading: e.target.value })}
                              placeholder="Section Heading"
                              className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg"
                            />
                          )}

                          <textarea
                            value={section.content}
                            onChange={(e) => updateContentSection(index, { content: e.target.value })}
                            rows={section.type === 'heading' ? 2 : 4}
                            placeholder={
                              section.type === 'list'
                                ? 'Enter items separated by new lines'
                                : 'Enter content...'
                            }
                            className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg mt-2"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CURRICULUM TAB */}
              {activeTab === 'curriculum' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Course Curriculum</h3>
                      <p className="text-sm text-zinc-400 mt-1">
                        {formData.total_modules} modules · {formData.total_lessons} lessons
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addModule}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Module
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.curriculum.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="bg-zinc-800/50 border border-zinc-700 rounded-lg">
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-3">
                              <input
                                type="text"
                                value={module.title}
                                onChange={(e) => updateModule(moduleIndex, { title: e.target.value })}
                                placeholder="Module Title"
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg font-medium"
                              />
                              <textarea
                                value={module.description}
                                onChange={(e) => updateModule(moduleIndex, { description: e.target.value })}
                                rows={2}
                                placeholder="Module description..."
                                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 text-white rounded-lg text-sm"
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => toggleModuleExpanded(moduleIndex)}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded"
                              >
                                {expandedModules.includes(moduleIndex) ? (
                                  <ChevronUp className="w-5 h-5" />
                                ) : (
                                  <ChevronDown className="w-5 h-5" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeModule(moduleIndex)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {expandedModules.includes(moduleIndex) && (
                            <div className="mt-4 pl-4 border-l-2 border-zinc-700 space-y-3">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div key={lessonIndex} className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-3">
                                  <div className="flex items-center gap-3 mb-2">
                                    <input
                                      type="text"
                                      value={lesson.title}
                                      onChange={(e) =>
                                        updateLesson(moduleIndex, lessonIndex, { title: e.target.value })
                                      }
                                      placeholder="Lesson title"
                                      className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded text-sm"
                                    />
                                    <select
                                      value={lesson.type}
                                      onChange={(e) =>
                                        updateLesson(moduleIndex, lessonIndex, { type: e.target.value })
                                      }
                                      className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded text-sm"
                                    >
                                      <option value="video">Video</option>
                                      <option value="article">Article</option>
                                      <option value="quiz">Quiz</option>
                                      <option value="assignment">Assignment</option>
                                    </select>
                                    <button
                                      type="button"
                                      onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                      className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      type="number"
                                      value={lesson.duration_minutes}
                                      onChange={(e) =>
                                        updateLesson(moduleIndex, lessonIndex, {
                                          duration_minutes: parseInt(e.target.value)
                                        })
                                      }
                                      placeholder="Duration (min)"
                                      className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded text-sm"
                                    />
                                    <label className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded text-sm text-zinc-300">
                                      <input
                                        type="checkbox"
                                        checked={lesson.is_free_preview}
                                        onChange={(e) =>
                                          updateLesson(moduleIndex, lessonIndex, {
                                            is_free_preview: e.target.checked
                                          })
                                        }
                                        className="w-4 h-4"
                                      />
                                      Free Preview
                                    </label>
                                  </div>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addLesson(moduleIndex)}
                                className="w-full py-2 border border-dashed border-zinc-700 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-600 text-sm"
                              >
                                + Add Lesson
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MEDIA TAB */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Thumbnail Upload */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        📸 Thumbnail (Course Card Image) *
                      </label>
                      {formData.thumbnail_url ? (
                        <div>
                          <img
                            src={formData.thumbnail_url}
                            alt="Thumbnail preview"
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, thumbnail_url: '' }))}
                            className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <ImageUpload
                          label="Upload Thumbnail"
                          onUploadComplete={(url) => setFormData(prev => ({ ...prev, thumbnail_url: url }))}
                        />
                      )}
                    </div>

                    {/* Banner Upload */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        🖼️ Banner Image (Course Header)
                      </label>
                      {formData.banner_url ? (
                        <div>
                          <img
                            src={formData.banner_url}
                            alt="Banner preview"
                            className="w-full h-32 object-cover rounded-lg mb-2"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, banner_url: '' }))}
                            className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <ImageUpload
                          label="Upload Banner"
                          onUploadComplete={(url) => setFormData(prev => ({ ...prev, banner_url: url }))}
                        />
                      )}
                    </div>

                    {/* Promo Video */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        🎬 Promo Video URL
                      </label>
                      <input
                        type="url"
                        name="promo_video_url"
                        value={formData.promo_video_url}
                        onChange={handleChange}
                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                      <p className="text-xs text-zinc-400 mt-1">Supports YouTube, Vimeo, or direct video URLs</p>
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      🖼️ Gallery Images
                    </label>
                    <div className="space-y-3">
                      {formData.gallery_images && formData.gallery_images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          {formData.gallery_images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={img}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeArrayItem('gallery_images', idx)}
                                className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <ImageUpload
                        label="Add Gallery Image"
                        onUploadComplete={(url) => addArrayItem('gallery_images', url)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Publication Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Status *
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-zinc-300">
                          <input
                            type="checkbox"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          Featured Course
                        </label>
                        <label className="flex items-center gap-2 text-sm text-zinc-300">
                          <input
                            type="checkbox"
                            name="is_trending"
                            checked={formData.is_trending}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          Trending
                        </label>
                        <label className="flex items-center gap-2 text-sm text-zinc-300">
                          <input
                            type="checkbox"
                            name="is_new"
                            checked={formData.is_new}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          New Course
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800">
                    <h3 className="text-lg font-semibold text-white mb-4">Enrollment Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Max Enrollments
                        </label>
                        <input
                          type="number"
                          name="max_enrollments"
                          value={formData.max_enrollments || ''}
                          onChange={handleChange}
                          placeholder="Unlimited"
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Enrollment Start Date
                        </label>
                        <input
                          type="date"
                          name="enrollment_start_date"
                          value={formData.enrollment_start_date}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Enrollment End Date
                        </label>
                        <input
                          type="date"
                          name="enrollment_end_date"
                          value={formData.enrollment_end_date}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm text-zinc-300">
                          <input
                            type="checkbox"
                            name="certificate_available"
                            checked={formData.certificate_available}
                            onChange={handleChange}
                            className="w-4 h-4"
                          />
                          Certificate Available
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-zinc-800">
                    <h3 className="text-lg font-semibold text-white mb-4">SEO Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Meta Title
                        </label>
                        <input
                          type="text"
                          name="meta_title"
                          value={formData.meta_title}
                          onChange={handleChange}
                          placeholder="Auto-filled from course title"
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Meta Description
                        </label>
                        <textarea
                          name="meta_description"
                          value={formData.meta_description}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Auto-filled from overview"
                          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>

                      <ArrayFieldEditor
                        title="Meta Keywords"
                        items={formData.meta_keywords}
                        onAdd={(value) => addArrayItem('meta_keywords', value)}
                        onRemove={(index) => removeArrayItem('meta_keywords', index)}
                        placeholder="web development, react, javascript"
                      />

                      <ArrayFieldEditor
                        title="Tags"
                        items={formData.tags}
                        onAdd={(value) => addArrayItem('tags', value)}
                        onRemove={(index) => removeArrayItem('tags', index)}
                        placeholder="frontend, backend, fullstack"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 bg-zinc-900/50">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {course ? 'Update Course' : 'Create Course'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Helper component for array fields
function ArrayFieldEditor({ title, items, onAdd, onRemove, placeholder }) {
  const [inputValue, setInputValue] = useState('');

  function handleAdd() {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        {title}
      </label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 font-medium"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="flex items-center gap-1 px-3 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-full text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-zinc-500 hover:text-red-400"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
