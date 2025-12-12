import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { 
  User, Mail, Phone, Calendar, MapPin, Briefcase, 
  GraduationCap, Link as LinkIcon, Save, Loader2,
  Camera, Github, Linkedin, Globe, Upload
} from 'lucide-react';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    // Personal Information
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    
    // Academic Information
    college_name: '',
    university: '',
    branch: '',
    semester: '',
    enrollment_number: '',
    session: '',
    graduation_year: '',
    
    // Contact Information
    alternate_email: '',
    alternate_phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Profile Details
    profile_picture_url: '',
    bio: '',
    linkedin_url: '',
    github_url: '',
    portfolio_url: '',
    
    // Skills & Interests
    skills: [],
    interests: [],
    
    // Professional Information
    current_company: '',
    job_title: '',
    experience_years: 0,
    resume_url: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        navigate('/login');
        return;
      }

      setUser(authUser);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        // Set default email from auth
        setFormData(prev => ({ ...prev, email: authUser.email }));
      } else if (profile) {
        setFormData({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          email: profile.email || authUser.email,
          phone: profile.phone || '',
          date_of_birth: profile.date_of_birth || '',
          gender: profile.gender || '',
          college_name: profile.college_name || '',
          university: profile.university || '',
          branch: profile.branch || '',
          semester: profile.semester || '',
          enrollment_number: profile.enrollment_number || '',
          session: profile.session || '',
          graduation_year: profile.graduation_year || '',
          alternate_email: profile.alternate_email || '',
          alternate_phone: profile.alternate_phone || '',
          address: profile.address || '',
          city: profile.city || '',
          state: profile.state || '',
          pincode: profile.pincode || '',
          country: profile.country || 'India',
          profile_picture_url: profile.profile_picture_url || '',
          bio: profile.bio || '',
          linkedin_url: profile.linkedin_url || '',
          github_url: profile.github_url || '',
          portfolio_url: profile.portfolio_url || '',
          skills: profile.skills || [],
          interests: profile.interests || [],
          current_company: profile.current_company || '',
          job_title: profile.job_title || '',
          experience_years: profile.experience_years || 0,
          resume_url: profile.resume_url || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Clean up data before saving - remove empty strings for date fields
      const cleanedData = { ...formData };
      
      // Remove empty date fields to avoid PostgreSQL date validation errors
      if (!cleanedData.date_of_birth || cleanedData.date_of_birth === '') {
        delete cleanedData.date_of_birth;
      }
      
      // Remove empty numeric fields
      if (!cleanedData.graduation_year || cleanedData.graduation_year === '') {
        delete cleanedData.graduation_year;
      }
      if (!cleanedData.experience_years || cleanedData.experience_years === '') {
        cleanedData.experience_years = 0;
      }

      // Check if profile exists first
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      let error;
      if (existingProfile) {
        // Update existing profile
        const result = await supabase
          .from('profiles')
          .update({
            ...cleanedData,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
        error = result.error;
      } else {
        // Insert new profile
        const result = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            ...cleanedData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
        error = result.error;
      }

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile: ' + error.message });
    } finally {
      setSaving(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function addSkill() {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  }

  function removeSkill(skill) {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  }

  function addInterest() {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  }

  function removeInterest(interest) {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  return (
    <div className="w-full animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white">My Profile</h2>
          <div className="h-1 w-16 bg-yellow-400 rounded-full mt-1" />
        </div>

        {/* Success/Error Message */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          {/* Personal Information */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <User className="w-4 h-4 mr-2 text-yellow-400" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-3 py-1.5 text-sm bg-zinc-900 border border-zinc-700 text-zinc-500 rounded-lg cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-sm bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
              <GraduationCap className="w-4 h-4 mr-2 text-yellow-400" />
              Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  College Name
                </label>
                <input
                  type="text"
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleChange}
                  placeholder="e.g., IIT Delhi"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="e.g., Delhi University"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Branch
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science & Engineering</option>
                  <option value="IT">Information Technology</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EE">Electrical Engineering</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="DS">Data Science</option>
                  <option value="AI">Artificial Intelligence</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Semester
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Enrollment Number
                </label>
                <input
                  type="text"
                  name="enrollment_number"
                  value={formData.enrollment_number}
                  onChange={handleChange}
                  placeholder="e.g., 2023CSE001"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Session
                </label>
                <input
                  type="text"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  placeholder="e.g., 2023-2024"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleChange}
                  placeholder="2026"
                  min="2020"
                  max="2030"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Alternate Email
                </label>
                <input
                  type="email"
                  name="alternate_email"
                  value={formData.alternate_email}
                  onChange={handleChange}
                  placeholder="alternate@example.com"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Alternate Phone
                </label>
                <input
                  type="tel"
                  name="alternate_phone"
                  value={formData.alternate_phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Full address"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., New Delhi"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g., Delhi"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="110001"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Professional Links */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
              <LinkIcon className="w-4 h-4 mr-2 text-yellow-400" />
              Professional Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center">
                  <Linkedin className="w-4 h-4 mr-1" /> LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center">
                  <Github className="w-4 h-4 mr-1" /> GitHub URL
                </label>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1 flex items-center">
                  <Globe className="w-4 h-4 mr-1" /> Portfolio URL
                </label>
                <input
                  type="url"
                  name="portfolio_url"
                  value={formData.portfolio_url}
                  onChange={handleChange}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Resume URL
                </label>
                <input
                  type="url"
                  name="resume_url"
                  value={formData.resume_url}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-yellow-400" />
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Current Company
                </label>
                <input
                  type="text"
                  name="current_company"
                  value={formData.current_company}
                  onChange={handleChange}
                  placeholder="e.g., Google"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  className="w-full px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-white mb-4">
              Skills & Interests
            </h2>
            
            {/* Skills */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-zinc-400 mb-2">
                Skills
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill (e.g., React, Python)"
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-3 py-1.5 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-yellow-400 hover:text-yellow-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-2">
                Interests
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                  placeholder="Add an interest (e.g., Machine Learning)"
                  className="flex-1 px-3 py-1.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="px-3 py-1.5 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="text-green-400 hover:text-green-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
