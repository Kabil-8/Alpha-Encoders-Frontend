import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  FolderGit2,
  Users,
  LogOut,
  RefreshCw,
  Search,
  ExternalLink,
  MessageSquare,
  Mail,
  Trash2,
  Plus,
  Eye,
  Download,
  Building,
  DollarSign,
  Phone,
  CheckCircle2,
  GitBranch,
  Activity,
  Layers,
  ChevronRight,
  UserPlus,
  Edit3,
  FileText,
  GraduationCap,
  Globe,
  ShieldCheck,
  ShieldAlert,
  Crown,
  Table,
  LayoutGrid,
  UserCheck
} from 'lucide-react';
import { SpotlightCard } from '../../components/reactbits/SpotlightCard';
import { Modal } from '../../components/shared/Modal';
import { apiUrl } from '../../config/api';

export interface InternshipApplicationData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  college: string;
  degree: string;
  graduationYear: string;
  domain: string;
  experienceLevel: string;
  skills: string[];
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl: string;
  statementOfPurpose: string;
  duration: string;
  startDate: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interview' | 'accepted' | 'rejected';
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface InquiryItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  websiteType: string;
  requiredFeatures: string[];
  estimatedBudget?: string;
  completionTimeline?: string;
  description: string;
  status: 'new' | 'contacted' | 'in_review' | 'closed';
  notes?: string;
  createdAt: string;
}

export interface ProjectMetrics {
  lighthousePerformance?: number;
  pageSpeed?: string;
  accessibility?: number;
  seoScore?: number;
  payloadSize?: string;
}

export interface ProjectItemData {
  id: string;
  name: string;
  slug: string;
  industry: string;
  tagline: string;
  description: string;
  clientName?: string;
  clientFeedback?: string;
  projectBudget?: string;
  deliveryDuration?: string;
  completionDate?: string;
  services: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  verifiedResult?: string;
  featured: boolean;
  category: string;
  highlights: string[];
  architectureOverview: string;
  metrics?: ProjectMetrics;
  createdAt: string;
  updatedAt?: string;
}

export interface UserInquirySnapshot {
  inquiryId: string;
  websiteType: string;
  submittedAt: string;
  estimatedBudget?: string;
  completionTimeline?: string;
  status: string;
  description: string;
  requiredFeatures: string[];
}

export interface UserItemData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  role: 'admin' | 'client' | 'prospect' | 'lead' | 'vip';
  status: 'active' | 'in_discussion' | 'completed' | 'onboarding';
  totalInquiries: number;
  totalEstimatedValue: number;
  currency: string;
  notes: string;
  websiteTypes: string[];
  associatedProjects: string[];
  inquiryHistory: UserInquirySnapshot[];
  picture?: string;
  createdAt: string;
  lastActiveAt: string;
  liveInquiries?: InquiryItem[];
}

export interface AdminStats {
  totalInquiries: number;
  newInquiries: number;
  inProgressInquiries: number;
  totalProjects: number;
  featuredProjects: number;
  totalUsers: number;
  activeClients: number;
  estimatedPipeline: number;
  totalInternships?: number;
  pendingInternships?: number;
  shortlistedInternships?: number;
  currency: string;
}

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'projects' | 'users' | 'internships'>('overview');

  // Main Datasets
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [projects, setProjects] = useState<ProjectItemData[]>([]);
  const [users, setUsers] = useState<UserItemData[]>([]);
  const [internships, setInternships] = useState<InternshipApplicationData[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');

  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');
  const [projectSearch, setProjectSearch] = useState('');

  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');

  const [internshipDomainFilter, setInternshipDomainFilter] = useState('all');
  const [internshipStatusFilter, setInternshipStatusFilter] = useState('all');
  const [internshipSearch, setInternshipSearch] = useState('');

  // Modals & Detail Drawers
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<ProjectItemData | null>(null);
  const [selectedUserDetail, setSelectedUserDetail] = useState<UserItemData | null>(null);
  const [selectedInternshipDetail, setSelectedInternshipDetail] = useState<InternshipApplicationData | null>(null);
  const [internshipNoteEdit, setInternshipNoteEdit] = useState('');
  const [isSavingInternshipNote, setIsSavingInternshipNote] = useState(false);

  // Project Add / Edit Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItemData | null>(null);
  const [projName, setProjName] = useState('');
  const [projSlug, setProjSlug] = useState('');
  const [projIndustry, setProjIndustry] = useState('');
  const [projCategory, setProjCategory] = useState('Web Application');
  const [projTagline, setProjTagline] = useState('');
  const [projDescription, setProjDescription] = useState('');
  const [projClientName, setProjClientName] = useState('');
  const [projClientFeedback, setProjClientFeedback] = useState('');
  const [projBudget, setProjBudget] = useState('$5,000');
  const [projDuration, setProjDuration] = useState('3-4 Weeks');
  const [projCompletionDate, setProjCompletionDate] = useState('2026');
  const [projLiveUrl, setProjLiveUrl] = useState('');
  const [projGithubUrl, setProjGithubUrl] = useState('');
  const [projVerifiedResult, setProjVerifiedResult] = useState('');
  const [projTech, setProjTech] = useState('React, TypeScript, Tailwind CSS, Vite');
  const [projServices, setProjServices] = useState('Web Development, UI/UX Design');
  const [projHighlights, setProjHighlights] = useState('');
  const [projArchitecture, setProjArchitecture] = useState('');
  const [projFeatured, setProjFeatured] = useState(false);

  // User Add / Edit Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItemData | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userCompany, setUserCompany] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'client' | 'prospect' | 'lead' | 'vip'>('lead');
  const [userStatus, setUserStatus] = useState<'active' | 'in_discussion' | 'completed' | 'onboarding'>('in_discussion');
  const [userValue, setUserValue] = useState('5000');
  const [userNotes, setUserNotes] = useState('');
  const [userWebsites, setUserWebsites] = useState('Business website');
  const [userProjects, setUserProjects] = useState('');
  const [userViewMode, setUserViewMode] = useState<'grid' | 'table'>('grid');

  // Temporary note editing in user dossier
  const [dossierNote, setDossierNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Auth guard
  useEffect(() => {
    const token = localStorage.getItem('ae_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Master fetcher
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [inqRes, projRes, usersRes, statsRes, internRes] = await Promise.all([
        fetch(apiUrl('/api/inquiries')),
        fetch(apiUrl('/api/projects')),
        fetch(apiUrl('/api/users')),
        fetch(apiUrl('/api/admin/stats')),
        fetch(apiUrl('/api/internships'))
      ]);

      const inqData = await inqRes.json();
      const projData = await projRes.json();
      const usersData = await usersRes.json();
      const statsData = await statsRes.json();
      const internData = await internRes.json();

      if (inqData.success) setInquiries(inqData.inquiries || []);
      if (projData.success) setProjects(projData.projects || []);
      if (usersData.success) setUsers(usersData.users || []);
      if (statsData.success) setStats(statsData.stats || null);
      if (internData.success) setInternships(internData.internships || []);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleLogout = () => {
    localStorage.removeItem('ae_admin_token');
    localStorage.removeItem('ae_admin_user');
    navigate('/admin/login');
  };

  // -------------------------------------------------------------------
  // INQUIRY ACTIONS
  // -------------------------------------------------------------------
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(apiUrl(`/api/inquiries/${id}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this lead inquiry?')) return;
    try {
      const res = await fetch(apiUrl(`/api/inquiries/${id}`), { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete inquiry', err);
    }
  };

  // -------------------------------------------------------------------
  // PROJECT ACTIONS
  // -------------------------------------------------------------------
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjName('');
    setProjSlug('');
    setProjIndustry('Technology & Digital Architecture');
    setProjCategory('Web Application');
    setProjTagline('');
    setProjDescription('');
    setProjClientName('');
    setProjClientFeedback('');
    setProjBudget('$5,000');
    setProjDuration('3-4 Weeks');
    setProjCompletionDate('2026');
    setProjLiveUrl('');
    setProjGithubUrl('');
    setProjVerifiedResult('Production verified deployment with responsive mobile performance.');
    setProjTech('React, TypeScript, Tailwind CSS, Vite');
    setProjServices('Web Development, UI/UX Design, Performance Optimization');
    setProjHighlights('Modular architecture\nHigh conversion user flows\nOptimized sub-second load times');
    setProjArchitecture('Engineered with modern frontend components, responsive layouts, and performant state handling.');
    setProjFeatured(true);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: ProjectItemData) => {
    setEditingProject(proj);
    setProjName(proj.name);
    setProjSlug(proj.slug);
    setProjIndustry(proj.industry);
    setProjCategory(proj.category || 'Web Application');
    setProjTagline(proj.tagline);
    setProjDescription(proj.description);
    setProjClientName(proj.clientName || '');
    setProjClientFeedback(proj.clientFeedback || '');
    setProjBudget(proj.projectBudget || '');
    setProjDuration(proj.deliveryDuration || '');
    setProjCompletionDate(proj.completionDate || '');
    setProjLiveUrl(proj.liveUrl || '');
    setProjGithubUrl(proj.githubUrl || '');
    setProjVerifiedResult(proj.verifiedResult || '');
    setProjTech(proj.technologies.join(', '));
    setProjServices(proj.services.join(', '));
    setProjHighlights(proj.highlights.join('\n'));
    setProjArchitecture(proj.architectureOverview || '');
    setProjFeatured(proj.featured);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: projName,
      slug: projSlug || undefined,
      industry: projIndustry,
      category: projCategory,
      tagline: projTagline,
      description: projDescription,
      clientName: projClientName,
      clientFeedback: projClientFeedback,
      projectBudget: projBudget,
      deliveryDuration: projDuration,
      completionDate: projCompletionDate,
      liveUrl: projLiveUrl,
      githubUrl: projGithubUrl,
      verifiedResult: projVerifiedResult,
      technologies: projTech.split(',').map((t) => t.trim()).filter(Boolean),
      services: projServices.split(',').map((s) => s.trim()).filter(Boolean),
      highlights: projHighlights.split('\n').map((h) => h.trim()).filter(Boolean),
      architectureOverview: projArchitecture,
      featured: projFeatured
    };

    try {
      let res;
      if (editingProject) {
        res = await fetch(apiUrl(`/api/projects/${editingProject.id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(apiUrl('/api/projects'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      const data = await res.json();
      if (data.success) {
        setIsProjectModalOpen(false);
        fetchAllData();
      } else {
        alert(data.message || 'Failed to save project.');
      }
    } catch (err) {
      console.error('Error saving project', err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(apiUrl(`/api/projects/${id}`), { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
        if (selectedProjectDetail?.id === id || selectedProjectDetail?.slug === id) {
          setSelectedProjectDetail(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  // -------------------------------------------------------------------
  // USER ACTIONS
  // -------------------------------------------------------------------
  const openNewUserModal = () => {
    setEditingUser(null);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserCompany('');
    setUserLocation('Remote / Global');
    setUserRole('prospect');
    setUserStatus('in_discussion');
    setUserValue('5000');
    setUserNotes('Client lead added directly via admin console.');
    setUserWebsites('Business website');
    setUserProjects('');
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (usr: UserItemData) => {
    setEditingUser(usr);
    setUserName(usr.fullName);
    setUserEmail(usr.email);
    setUserPhone(usr.phone || '');
    setUserCompany(usr.company || '');
    setUserLocation(usr.location || '');
    setUserRole(usr.role);
    setUserStatus(usr.status);
    setUserValue(String(usr.totalEstimatedValue || 0));
    setUserNotes(usr.notes || '');
    setUserWebsites(usr.websiteTypes ? usr.websiteTypes.join(', ') : '');
    setUserProjects(usr.associatedProjects ? usr.associatedProjects.join(', ') : '');
    setIsUserModalOpen(true);
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      fullName: userName,
      email: userEmail,
      phone: userPhone || undefined,
      company: userCompany || undefined,
      location: userLocation || undefined,
      role: userRole,
      status: userStatus,
      totalEstimatedValue: Number(userValue) || 0,
      notes: userNotes,
      websiteTypes: userWebsites.split(',').map((w) => w.trim()).filter(Boolean),
      associatedProjects: userProjects.split(',').map((p) => p.trim()).filter(Boolean)
    };

    try {
      let res;
      if (editingUser) {
        res = await fetch(apiUrl(`/api/users/${editingUser.id}`), {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(apiUrl('/api/users'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      const data = await res.json();
      if (data.success) {
        setIsUserModalOpen(false);
        fetchAllData();
      } else {
        alert(data.message || 'Failed to save client profile.');
      }
    } catch (err) {
      console.error('Error saving client', err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user record from CRM?')) return;
    try {
      const res = await fetch(apiUrl(`/api/users/${id}`), { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        if (selectedUserDetail?.id === id) setSelectedUserDetail(null);
      } else {
        alert(data.message || 'Failed to delete user.');
      }
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  const handleToggleAdminRole = async (usr: UserItemData) => {
    const isCurrentlyAdmin = usr.role === 'admin';
    const targetRole = isCurrentlyAdmin ? 'client' : 'admin';
    const confirmText = isCurrentlyAdmin
      ? `Revoke Admin status for ${usr.fullName} (${usr.email})? They will be demoted to Client and lose administrative access.`
      : `Promote ${usr.fullName} (${usr.email}) to Studio Administrator? They will be granted full administrative command center control.`;

    if (!window.confirm(confirmText)) return;

    try {
      const res = await fetch(apiUrl(`/api/users/${usr.id}/role`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: targetRole }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === usr.id ? { ...u, role: targetRole } : u))
        );
        if (selectedUserDetail?.id === usr.id) {
          setSelectedUserDetail((prev) => (prev ? { ...prev, role: targetRole } : null));
        }
      } else {
        alert(data.message || 'Failed to update user role.');
      }
    } catch (err) {
      console.error('Error toggling admin role', err);
    }
  };

  const handleSaveDossierNote = async () => {
    if (!selectedUserDetail) return;
    setIsSavingNote(true);
    try {
      const res = await fetch(apiUrl(`/api/users/${selectedUserDetail.id}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: dossierNote })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedUserDetail(data.user);
        setUsers((prev) => prev.map((u) => (u.id === data.user.id ? data.user : u)));
      }
    } catch (err) {
      console.error('Failed to update dossier note', err);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Open user dossier
  const handleOpenUserDossier = (user: UserItemData) => {
    setSelectedUserDetail(user);
    setDossierNote(user.notes || '');
  };

  // -------------------------------------------------------------------
  // EXPORT UTILITIES
  // -------------------------------------------------------------------
  const exportInquiriesCSV = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Company', 'Website Type', 'Budget', 'Timeline', 'Status', 'Date'];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.fullName}"`,
      i.email,
      `"${i.phone || ''}"`,
      `"${i.company || ''}"`,
      `"${i.websiteType}"`,
      `"${i.estimatedBudget || ''}"`,
      `"${i.completionTimeline || ''}"`,
      i.status,
      i.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `alpha_encoders_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportProjectsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(projects, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `alpha_encoders_projects_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportUsersJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `alpha_encoders_clients_crm_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportInternshipsCSV = () => {
    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'College',
      'Degree',
      'Graduation Year',
      'Domain',
      'Experience Level',
      'Skills',
      'Resume URL',
      'GitHub',
      'Portfolio',
      'LinkedIn',
      'Duration',
      'Start Date',
      'Status',
      'Admin Notes',
      'Submitted Date'
    ];
    const rows = internships.map((i) => [
      i.id,
      `"${i.fullName}"`,
      i.email,
      `"${i.phone || ''}"`,
      `"${i.college}"`,
      `"${i.degree}"`,
      i.graduationYear,
      `"${i.domain}"`,
      i.experienceLevel,
      `"${(i.skills || []).join('; ')}"`,
      `"${i.resumeUrl}"`,
      `"${i.githubUrl || ''}"`,
      `"${i.portfolioUrl || ''}"`,
      `"${i.linkedinUrl || ''}"`,
      `"${i.duration}"`,
      `"${i.startDate}"`,
      i.status,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`,
      i.createdAt
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `alpha_encoders_internships_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // -------------------------------------------------------------------
  // INTERNSHIP ACTIONS
  // -------------------------------------------------------------------
  const handleUpdateInternshipStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(apiUrl(`/api/internships/${id}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInternships((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedInternshipDetail && selectedInternshipDetail.id === id) {
          setSelectedInternshipDetail((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update internship status', err);
    }
  };

  const handleSaveInternshipNotes = async (id: string) => {
    setIsSavingInternshipNote(true);
    try {
      const res = await fetch(apiUrl(`/api/internships/${id}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: internshipNoteEdit }),
      });
      const data = await res.json();
      if (data.success) {
        setInternships((prev) =>
          prev.map((item) => (item.id === id ? { ...item, adminNotes: internshipNoteEdit } : item))
        );
        if (selectedInternshipDetail && selectedInternshipDetail.id === id) {
          setSelectedInternshipDetail((prev) => (prev ? { ...prev, adminNotes: internshipNoteEdit } : null));
        }
      }
    } catch (err) {
      console.error('Failed to save internship note', err);
    } finally {
      setIsSavingInternshipNote(false);
    }
  };

  const handleDeleteInternship = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this internship application?')) return;
    try {
      const res = await fetch(apiUrl(`/api/internships/${id}`), { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInternships((prev) => prev.filter((i) => i.id !== id));
        if (selectedInternshipDetail && selectedInternshipDetail.id === id) {
          setSelectedInternshipDetail(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete internship application', err);
    }
  };

  // -------------------------------------------------------------------
  // FILTERED DATASETS
  // -------------------------------------------------------------------
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const matchesSearch =
      inquirySearch === '' ||
      inq.fullName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(inquirySearch.toLowerCase())) ||
      inq.description.toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      projectCategoryFilter === 'all' || (p.category && p.category.toLowerCase() === projectCategoryFilter.toLowerCase());
    const matchesSearch =
      projectSearch === '' ||
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.industry.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.tagline.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.clientName && p.clientName.toLowerCase().includes(projectSearch.toLowerCase())) ||
      p.technologies.some((t) => t.toLowerCase().includes(projectSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const filteredUsers = users.filter((u) => {
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    const matchesSearch =
      userSearch === '' ||
      u.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.company && u.company.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.phone && u.phone.toLowerCase().includes(userSearch.toLowerCase())) ||
      (u.location && u.location.toLowerCase().includes(userSearch.toLowerCase()));
    return matchesRole && matchesStatus && matchesSearch;
  });

  const filteredInternships = internships.filter((item) => {
    const matchesDomain =
      internshipDomainFilter === 'all' || item.domain.toLowerCase() === internshipDomainFilter.toLowerCase();
    const matchesStatus = internshipStatusFilter === 'all' || item.status === internshipStatusFilter;
    const matchesSearch =
      internshipSearch === '' ||
      item.fullName.toLowerCase().includes(internshipSearch.toLowerCase()) ||
      item.email.toLowerCase().includes(internshipSearch.toLowerCase()) ||
      item.college.toLowerCase().includes(internshipSearch.toLowerCase()) ||
      item.domain.toLowerCase().includes(internshipSearch.toLowerCase()) ||
      (item.skills && item.skills.some((s) => s.toLowerCase().includes(internshipSearch.toLowerCase())));
    return matchesDomain && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* TOP COMMAND NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#0A1024]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/alpha-encoders-icon-dark.png"
                alt="Alpha Encoders Emblem"
                className="w-8 h-8 rounded-lg shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="font-['Space_Grotesk'] text-lg font-bold tracking-tight text-white">
                Alpha <span className="text-cyan-400">Encoders</span>
              </span>
            </Link>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-500/30 text-cyan-300 font-mono hidden sm:inline">
              Control Center • K.Kabil (kabilk2023@gmail.com)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchAllData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101A31] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-slate-300 transition-all disabled:opacity-50"
              title="Refresh all real-time telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
              <span className="hidden sm:inline">Sync Data</span>
            </button>

            <Link
              to="/admin/quotation"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 border border-blue-500/40 text-xs font-mono text-white transition-all shadow-sm"
              title="Open Proposal & Quotation Engine"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">Quotation Engine</span>
            </Link>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101A31] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-cyan-300 transition-all"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-xs font-mono text-rose-300 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI METRIC CARDS */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <SpotlightCard
              spotlightColor="rgba(37, 99, 255, 0.15)"
              className="p-5 rounded-2xl bg-[#0A1024] border border-blue-500/20"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Total Leads</span>
                <Inbox className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                {stats.totalInquiries}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">{stats.newInquiries} new</span>
                <span>• {stats.inProgressInquiries} in review</span>
              </div>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.15)"
              className="p-5 rounded-2xl bg-[#0A1024] border border-blue-500/20"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Pipeline Value</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-emerald-400">
                ${stats.estimatedPipeline.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">Est. commercial pipeline</div>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(37, 99, 255, 0.15)"
              className="p-5 rounded-2xl bg-[#0A1024] border border-blue-500/20"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Live Projects</span>
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                {stats.totalProjects}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <span className="text-cyan-300 font-medium">{stats.featuredProjects} Featured deployments</span>
              </div>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(34, 211, 238, 0.15)"
              className="p-5 rounded-2xl bg-[#0A1024] border border-blue-500/20"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider">Clients & Users</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="font-['Space_Grotesk'] text-3xl font-bold text-white">
                {stats.totalUsers || users.length}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                <span className="text-blue-300 font-semibold">{stats.activeClients || users.filter(u => u.role === 'client').length} active partners</span>
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* PRIMARY NAVIGATION TABS */}
        <div className="flex border-b border-slate-800 space-x-1 sm:space-x-4 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 font-['Space_Grotesk'] text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-500 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 font-['Space_Grotesk'] text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'border-blue-500 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Inquiries & Leads</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 font-mono">
              {inquiries.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 font-['Space_Grotesk'] text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-blue-500 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects Studio</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 font-mono">
              {projects.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 font-['Space_Grotesk'] text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'users'
                ? 'border-blue-500 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clients & Users CRM</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 font-mono">
              {users.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('internships')}
            className={`inline-flex items-center gap-2 py-3 px-4 border-b-2 font-['Space_Grotesk'] text-sm font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'internships'
                ? 'border-blue-500 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Internships & Talent</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/60 text-cyan-300 font-mono">
              {internships.length}
            </span>
            {internships.filter((i) => i.status === 'pending').length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                {internships.filter((i) => i.status === 'pending').length} new
              </span>
            )}
          </button>

          <Link
            to="/admin/quotation"
            className="inline-flex items-center gap-2 py-3 px-4 border-b-2 border-transparent text-slate-400 hover:text-cyan-300 font-['Space_Grotesk'] text-sm font-semibold transition-colors whitespace-nowrap ml-auto"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Quotation & Proposal Builder</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 border border-blue-500/30 text-cyan-300 font-mono">
              Admin
            </span>
          </Link>
        </div>

        {/* ============================================================= */}
        {/* TAB 1: OVERVIEW */}
        {/* ============================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Recent Leads Preview */}
            <div className="rounded-2xl bg-[#0A1024] border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Recent Project Submissions</h3>
                  <p className="text-xs text-slate-400">Incoming prospective client requests awaiting review</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>View All Inquiries</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#101A31] text-slate-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Website Scope</th>
                      <th className="py-3 px-4">Est. Budget</th>
                      <th className="py-3 px-4">Timeline</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {inquiries.slice(0, 5).map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{inq.fullName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{inq.email}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-cyan-300">{inq.websiteType}</td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400">{inq.estimatedBudget || 'Flexible'}</td>
                        <td className="py-3.5 px-4 text-slate-400">{inq.completionTimeline || 'Flexible'}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              inq.status === 'new'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : inq.status === 'in_review'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                : inq.status === 'contacted'
                                ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {inq.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1.5 rounded-lg bg-[#101A31] text-cyan-300 hover:bg-blue-600 hover:text-white transition-all"
                            title="Inspect complete lead details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Glance Grid: Projects & Clients */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Projects Quick View */}
              <div className="rounded-2xl bg-[#0A1024] border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-['Space_Grotesk'] text-base font-bold text-white">Live Showcase Deployments</h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    className="text-xs text-cyan-400 hover:underline font-mono"
                  >
                    Manage ({projects.length}) →
                  </button>
                </div>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProjectDetail(proj)}
                      className="cursor-pointer p-3.5 rounded-xl bg-[#101A31]/60 hover:bg-[#101A31] border border-slate-800/80 hover:border-blue-500/40 flex items-center justify-between transition-all"
                    >
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{proj.name}</span>
                          {proj.featured && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-900/60 text-cyan-300 font-mono">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{proj.industry}</div>
                      </div>
                      <span className="text-xs text-cyan-400 font-mono flex items-center gap-1">
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clients Quick View */}
              <div className="rounded-2xl bg-[#0A1024] border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-['Space_Grotesk'] text-base font-bold text-white">Registered Client CRM</h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('users')}
                    className="text-xs text-cyan-400 hover:underline font-mono"
                  >
                    View CRM ({users.length}) →
                  </button>
                </div>
                <div className="space-y-3">
                  {users.slice(0, 4).map((usr) => (
                    <div
                      key={usr.id}
                      onClick={() => handleOpenUserDossier(usr)}
                      className="cursor-pointer p-3.5 rounded-xl bg-[#101A31]/60 hover:bg-[#101A31] border border-slate-800/80 hover:border-blue-500/40 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-500/30 flex items-center justify-center font-bold text-cyan-300 text-xs font-mono">
                          {usr.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-sm">{usr.fullName}</div>
                          <div className="text-xs text-slate-400">{usr.company || usr.email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-semibold text-emerald-400">
                          ${usr.totalEstimatedValue?.toLocaleString() || '0'}
                        </span>
                        <div className="text-[10px] text-slate-400 uppercase font-mono">{usr.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 2: INQUIRIES & LEADS */}
        {/* ============================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search by name, email, company..."
                    className="pl-9 pr-4 py-2 rounded-xl bg-[#0A1024] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
                  />
                </div>

                <select
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0A1024] border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="in_review">In Review</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportInquiriesCSV}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#101A31] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-cyan-300 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="rounded-2xl bg-[#0A1024] border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#101A31] text-slate-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Client Contact</th>
                      <th className="py-3 px-4">Company</th>
                      <th className="py-3 px-4">Website Scope</th>
                      <th className="py-3 px-4">Budget Range</th>
                      <th className="py-3 px-4">Submission Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                          No inquiries found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{inq.fullName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{inq.email}</div>
                            {inq.phone && <div className="text-[11px] text-emerald-400 font-mono">{inq.phone}</div>}
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-300">
                            {inq.company || <span className="text-slate-600">—</span>}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-cyan-300">{inq.websiteType}</td>
                          <td className="py-3.5 px-4 font-mono text-emerald-400 font-medium">
                            {inq.estimatedBudget || 'Flexible'}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                              className={`px-2 py-1 rounded text-[11px] font-mono font-semibold focus:outline-none ${
                                inq.status === 'new'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                  : inq.status === 'in_review'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                  : 'bg-slate-800 text-slate-400 border border-slate-700'
                              }`}
                            >
                              <option value="new">NEW</option>
                              <option value="in_review">IN REVIEW</option>
                              <option value="contacted">CONTACTED</option>
                              <option value="closed">CLOSED</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(inq)}
                                className="p-1.5 rounded-lg bg-[#101A31] text-cyan-300 hover:bg-blue-600 hover:text-white transition-all"
                                title="Inspect Lead Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={`mailto:${inq.email}?subject=${encodeURIComponent(
                                  'Alpha Encoders • Project Architecture Inquiry'
                                )}`}
                                className="p-1.5 rounded-lg bg-[#101A31] text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                                title="Reply via Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1.5 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-600 hover:text-white transition-all"
                                title="Delete Inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: PROJECTS STUDIO (COMPLETE SPECS) */}
        {/* ============================================================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header with Search and New Project Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search projects, stack, client..."
                    className="pl-9 pr-4 py-2 rounded-xl bg-[#0A1024] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
                  />
                </div>

                <select
                  value={projectCategoryFilter}
                  onChange={(e) => setProjectCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#0A1024] border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Enterprise Portal">Enterprise Portal</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportProjectsJSON}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#101A31] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-cyan-300 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <button
                  type="button"
                  onClick={openNewProjectModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#0A1024] border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-semibold">{proj.industry}</span>
                      <div className="flex items-center gap-2">
                        {proj.category && (
                          <span className="px-2 py-0.5 rounded bg-[#101A31] text-[10px] font-mono text-slate-300">
                            {proj.category}
                          </span>
                        )}
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded bg-blue-900/50 border border-blue-500/30 text-[10px] font-mono text-cyan-300 font-semibold">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-['Space_Grotesk'] text-xl font-bold text-white flex items-center gap-2">
                        <span>{proj.name}</span>
                        {proj.clientName && (
                          <span className="text-xs text-slate-400 font-normal">({proj.clientName})</span>
                        )}
                      </h4>
                      <p className="text-xs font-medium text-slate-300 mt-1">{proj.tagline}</p>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{proj.description}</p>

                    {/* Quick Specs Pill Roster */}
                    <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400 pt-1">
                      {proj.projectBudget && (
                        <span className="bg-[#101A31] px-2 py-0.5 rounded text-emerald-400">
                          Budget: {proj.projectBudget}
                        </span>
                      )}
                      {proj.deliveryDuration && (
                        <span className="bg-[#101A31] px-2 py-0.5 rounded text-blue-300">
                          Duration: {proj.deliveryDuration}
                        </span>
                      )}
                      {proj.completionDate && (
                        <span className="bg-[#101A31] px-2 py-0.5 rounded text-slate-300">
                          {proj.completionDate}
                        </span>
                      )}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.technologies.slice(0, 5).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#101A31] text-cyan-300 font-mono">
                          {t}
                        </span>
                      ))}
                      {proj.technologies.length > 5 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-slate-500 font-mono">
                          +{proj.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {proj.liveUrl ? (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-500 font-mono">No live URL</span>
                      )}

                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                        >
                          <GitBranch className="w-3 h-3" />
                          <span>Repo</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProjectDetail(proj)}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-[#101A31] text-cyan-300 hover:bg-blue-600 hover:text-white transition-all font-semibold"
                        title="View Full Technical Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Specs</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditProjectModal(proj)}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-[#101A31] text-slate-300 hover:text-white transition-colors"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-xs px-2 py-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 4: USERS & CLIENTS CRM MANAGEMENT (FULL CRUD & ADMIN PROMOTION) */}
        {/* ============================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in">
            {/* KPI Metric Summary Bar for Users Management */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#0A1024] border border-blue-500/30 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Registered Users
                  </span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                    {users.length}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-cyan-300">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-tr from-[#130d2a] to-[#0A1024] border border-purple-500/40 flex items-center justify-between shadow-lg shadow-purple-500/10">
                <div>
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block flex items-center gap-1">
                    <Crown className="w-3 h-3 text-purple-400" />
                    <span>Studio Admins</span>
                  </span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-purple-200">
                    {users.filter((u) => u.role === 'admin').length + 1}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A1024] border border-blue-500/30 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Active Clients
                  </span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-cyan-300">
                    {users.filter((u) => u.role === 'client' || u.status === 'active' || u.status === 'completed').length}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A1024] border border-slate-800 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Pipeline Volume
                  </span>
                  <span className="font-['Space_Grotesk'] text-2xl font-bold text-emerald-400">
                    ${users.reduce((acc, u) => acc + (u.totalEstimatedValue || 0), 0).toLocaleString()}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Header & Controls */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center p-4 rounded-2xl bg-[#0A1024] border border-slate-800">
              <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search name, email, company..."
                    className="pl-9 pr-4 py-2 rounded-xl bg-[#050816] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-full sm:w-64"
                  />
                </div>

                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#050816] border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">👑 Administrators (Admin)</option>
                  <option value="client">Client Partner</option>
                  <option value="vip">VIP Account</option>
                  <option value="prospect">Prospect</option>
                  <option value="lead">Lead</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#050816] border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="in_discussion">In Discussion</option>
                  <option value="completed">Completed</option>
                  <option value="onboarding">Onboarding</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                {/* View Mode Toggle */}
                <div className="flex items-center rounded-xl bg-[#050816] border border-slate-800 p-0.5">
                  <button
                    type="button"
                    onClick={() => setUserViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs transition-all ${
                      userViewMode === 'grid'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Grid Card View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs transition-all ${
                      userViewMode === 'table'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Dense Table View"
                  >
                    <Table className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={exportUsersJSON}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#101A31] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-cyan-300 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>

                <button
                  type="button"
                  onClick={openNewUserModal}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register User / Admin</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT: GRID VIEW */}
            {userViewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className={`rounded-2xl bg-[#0A1024] p-5 space-y-4 transition-all shadow-lg flex flex-col justify-between ${
                      u.role === 'admin'
                        ? 'border border-purple-500/50 shadow-purple-500/10 hover:border-purple-400'
                        : 'border border-slate-800 hover:border-blue-500/40'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Header with Avatar and Role */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {u.picture ? (
                            <img
                              src={u.picture}
                              alt={u.fullName}
                              className="w-10 h-10 rounded-xl object-cover border border-cyan-500/40 shrink-0"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold font-['Space_Grotesk'] text-base shrink-0 ${
                              u.role === 'admin'
                                ? 'bg-purple-950/80 border-purple-500/50 text-purple-200'
                                : 'bg-[#101A31] border-blue-500/30 text-cyan-300'
                            }`}>
                              {u.fullName.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-['Space_Grotesk'] text-base font-bold text-white leading-tight truncate">
                              {u.fullName}
                            </h4>
                            {u.company && <p className="text-xs text-slate-400 truncate">{u.company}</p>}
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1 ${
                            u.role === 'admin'
                              ? 'bg-purple-950/90 text-purple-200 border border-purple-500/50 shadow-sm shadow-purple-500/30'
                              : u.role === 'vip'
                              ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                              : u.role === 'client'
                              ? 'bg-blue-950/80 text-cyan-300 border border-blue-500/40'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {u.role === 'admin' && <Crown className="w-3 h-3 text-purple-300" />}
                          <span>{u.role}</span>
                        </span>
                      </div>

                      {/* Contact & Location Info */}
                      <div className="text-xs text-slate-300 space-y-1 font-mono pt-1">
                        <div className="flex items-center gap-2 text-slate-400 truncate">
                          <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{u.email}</span>
                        </div>
                        {u.phone && (
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{u.phone}</span>
                          </div>
                        )}
                        {u.location && (
                          <div className="flex items-center gap-2 text-slate-400">
                            <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{u.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Associated Projects and Scope */}
                      {u.associatedProjects && u.associatedProjects.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {u.associatedProjects.map((pName, pIdx) => (
                            <span
                              key={pIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-cyan-300 font-mono font-medium"
                            >
                              Project: {pName}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Metrics Bar */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-[#101A31]/50 border border-slate-800/80 text-[11px] font-mono">
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase">Inquiries</span>
                          <span className="font-bold text-white">{u.totalInquiries || 0} Submitted</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[9px] uppercase">Pipeline</span>
                          <span className="font-bold text-emerald-400">
                            ${u.totalEstimatedValue?.toLocaleString() || '0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleOpenUserDossier(u)}
                        className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Full Dossier</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        {/* Quick 1-Click Make Admin / Revoke Admin Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleAdminRole(u)}
                          className={`p-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                            u.role === 'admin'
                              ? 'bg-purple-950/80 text-purple-200 border border-purple-500/50 hover:bg-rose-950 hover:text-rose-300 hover:border-rose-500'
                              : 'bg-[#101A31] text-slate-300 hover:text-cyan-300 hover:border-cyan-400 border border-slate-800'
                          }`}
                          title={u.role === 'admin' ? 'Revoke Admin Access' : 'Make User Administrator'}
                        >
                          {u.role === 'admin' ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
                          ) : (
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditUserModal(u)}
                          className="p-1.5 rounded-lg bg-[#101A31] text-slate-300 hover:text-white"
                          title="Edit User Profile"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={`mailto:${u.email}`}
                          className="p-1.5 rounded-lg bg-[#101A31] text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
                          title="Email User"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-600 hover:text-white transition-all"
                          title="Remove from CRM"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: DENSE TABLE VIEW */}
            {userViewMode === 'table' && (
              <div className="rounded-2xl bg-[#0A1024] border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#101A31] text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">User / Client</th>
                        <th className="py-3 px-4">Role & Privilege</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Phone / Location</th>
                        <th className="py-3 px-4">Inquiries</th>
                        <th className="py-3 px-4">Pipeline Value</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {u.picture ? (
                                <img
                                  src={u.picture}
                                  alt={u.fullName}
                                  className="w-8 h-8 rounded-lg object-cover border border-cyan-500/40 shrink-0"
                                />
                              ) : (
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                  u.role === 'admin'
                                    ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                                    : 'bg-[#152344] text-cyan-300 border border-blue-500/30'
                                }`}>
                                  {u.fullName.charAt(0)}
                                </div>
                              )}
                              <div>
                                <span className="font-['Space_Grotesk'] text-sm font-bold text-white block">
                                  {u.fullName}
                                </span>
                                <span className="text-[11px] text-slate-400 block">{u.email}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase inline-flex items-center gap-1 ${
                                  u.role === 'admin'
                                    ? 'bg-purple-950 text-purple-200 border border-purple-500/50 shadow-sm'
                                    : u.role === 'vip'
                                    ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                    : u.role === 'client'
                                    ? 'bg-blue-950 text-cyan-300 border border-blue-500/40'
                                    : 'bg-slate-800 text-slate-300'
                                }`}
                              >
                                {u.role === 'admin' && <Crown className="w-3 h-3 text-purple-300" />}
                                <span>{u.role}</span>
                              </span>

                              {/* Direct 1-Click Toggle Admin */}
                              <button
                                type="button"
                                onClick={() => handleToggleAdminRole(u)}
                                className={`text-[10px] px-2 py-0.5 rounded transition-all font-semibold ${
                                  u.role === 'admin'
                                    ? 'text-rose-400 hover:text-rose-300 hover:underline'
                                    : 'text-cyan-400 hover:text-cyan-300 hover:underline'
                                }`}
                              >
                                {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 uppercase">
                              {u.status.replace('_', ' ')}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="block text-slate-300">{u.phone || 'No phone'}</span>
                            <span className="block text-[11px] text-slate-500">{u.location || 'Remote'}</span>
                          </td>

                          <td className="py-3 px-4 text-white font-bold">
                            {u.totalInquiries || 0}
                          </td>

                          <td className="py-3 px-4 text-emerald-400 font-bold">
                            ${u.totalEstimatedValue?.toLocaleString() || '0'}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenUserDossier(u)}
                                className="p-1.5 rounded-lg bg-[#101A31] text-cyan-400 hover:text-white"
                                title="View Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => openEditUserModal(u)}
                                className="p-1.5 rounded-lg bg-[#101A31] text-slate-300 hover:text-white"
                                title="Edit Profile"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-600 hover:text-white transition-all"
                                title="Delete User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 5: INTERNSHIPS & TALENT PIPELINE */}
        {/* ============================================================= */}
        {activeTab === 'internships' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Filter & Action Bar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
              <div className="flex flex-wrap gap-2 items-center w-full lg:w-auto">
                {/* Search */}
                <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate, college, skills..."
                    value={internshipSearch}
                    onChange={(e) => setInternshipSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#101A31] border border-slate-700/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* Domain Selector */}
                <select
                  value={internshipDomainFilter}
                  onChange={(e) => setInternshipDomainFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-[#101A31] border border-slate-700/60 text-xs text-cyan-300 font-mono focus:outline-none"
                >
                  <option value="all">All Domains (8 Tracks)</option>
                  <option value="Full-Stack Web Development">Full-Stack Web</option>
                  <option value="Frontend Engineering & UI/UX Design">Frontend & UI/UX</option>
                  <option value="Backend & Cloud Architecture">Backend & Cloud</option>
                  <option value="AI & Machine Learning / GenAI">AI & ML / GenAI</option>
                  <option value="Mobile Application Development">Mobile App Dev</option>
                  <option value="Computer Science Research & Technical Whitepapers">CS Research & Papers</option>
                  <option value="Cybersecurity & DevSecOps">Cybersecurity</option>
                  <option value="Digital Growth, SEO & Product Strategy">Digital SEO & Growth</option>
                </select>

                {/* Status Filter Buttons */}
                <div className="hidden sm:flex items-center gap-1 bg-[#101A31] p-1 rounded-xl border border-slate-800">
                  {['all', 'pending', 'reviewing', 'shortlisted', 'accepted', 'rejected'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setInternshipStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                        internshipStatusFilter === st
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportInternshipsCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#101A31] hover:bg-slate-800 border border-slate-700/60 text-xs font-mono text-cyan-300 transition-all shadow-sm"
                  title="Download candidate roster as CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <a
                  href="/careers#apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Public Careers Portal</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#0A1024] border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Total Applicants</span>
                <span className="font-bold text-white text-sm">{internships.length}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A1024] border border-amber-500/20 flex items-center justify-between">
                <span className="text-amber-300">Pending Review</span>
                <span className="font-bold text-amber-300 text-sm">
                  {internships.filter((i) => i.status === 'pending').length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A1024] border border-purple-500/20 flex items-center justify-between">
                <span className="text-purple-300">Shortlisted / Interview</span>
                <span className="font-bold text-purple-300 text-sm">
                  {internships.filter((i) => i.status === 'shortlisted' || i.status === 'interview').length}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A1024] border border-emerald-500/20 flex items-center justify-between">
                <span className="text-emerald-300">Offers / Accepted</span>
                <span className="font-bold text-emerald-300 text-sm">
                  {internships.filter((i) => i.status === 'accepted').length}
                </span>
              </div>
            </div>

            {/* Candidate Applications Table / Grid */}
            {filteredInternships.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-[#0A1024] border border-slate-800 space-y-3">
                <GraduationCap className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="font-['Space_Grotesk'] text-base font-bold text-white">No applications match your filter</h4>
                <p className="text-xs text-slate-400">Try adjusting your domain track, search term, or status filter.</p>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#0A1024] border border-slate-800 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#101A31] text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Candidate</th>
                        <th className="py-3.5 px-4">College & Degree</th>
                        <th className="py-3.5 px-4">Domain Track</th>
                        <th className="py-3.5 px-4">Duration & Start</th>
                        <th className="py-3.5 px-4">Status & Decision</th>
                        <th className="py-3.5 px-4">Portfolio Links</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredInternships.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-900/60 transition-colors">
                          {/* Candidate Name & Contact */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                                {app.fullName.slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-white">{app.fullName}</div>
                                <div className="text-[11px] text-slate-400 font-mono">{app.email}</div>
                                {app.phone && <div className="text-[10px] text-emerald-400 font-mono">{app.phone}</div>}
                              </div>
                            </div>
                          </td>

                          {/* College & Degree */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-200">{app.college}</div>
                            <div className="text-[11px] text-slate-400">
                              {app.degree} • Class of {app.graduationYear}
                            </div>
                          </td>

                          {/* Domain Track & Experience */}
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-blue-950 text-cyan-300 border border-blue-500/30">
                              {app.domain}
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono mt-1">
                              Level: <span className="text-slate-300">{app.experienceLevel}</span>
                            </div>
                          </td>

                          {/* Duration & Start */}
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className="text-slate-200 font-semibold">{app.duration}</div>
                            <div className="text-slate-400 text-[10px]">Start: {app.startDate}</div>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateInternshipStatus(app.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold uppercase border focus:outline-none cursor-pointer ${
                                app.status === 'accepted'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                  : app.status === 'shortlisted' || app.status === 'interview'
                                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                                  : app.status === 'reviewing'
                                  ? 'bg-blue-950 text-blue-300 border-blue-500/40'
                                  : app.status === 'rejected'
                                  ? 'bg-rose-950 text-rose-300 border-rose-500/40'
                                  : 'bg-amber-950 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              <option value="pending">PENDING</option>
                              <option value="reviewing">REVIEWING</option>
                              <option value="shortlisted">SHORTLISTED</option>
                              <option value="interview">INTERVIEW</option>
                              <option value="accepted">ACCEPTED</option>
                              <option value="rejected">REJECTED</option>
                            </select>
                          </td>

                          {/* Direct Links */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              {app.resumeUrl && (
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#101A31] hover:bg-blue-600 text-cyan-300 hover:text-white transition-all text-[11px] font-mono border border-slate-700/60"
                                  title="View Resume / CV"
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>Resume</span>
                                </a>
                              )}
                              {app.githubUrl && (
                                <a
                                  href={app.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded bg-[#101A31] hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-slate-700/60"
                                  title="Open GitHub"
                                >
                                  <GitBranch className="w-3 h-3" />
                                </a>
                              )}
                              {app.portfolioUrl && (
                                <a
                                  href={app.portfolioUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded bg-[#101A31] hover:bg-slate-800 text-cyan-400 hover:text-white transition-all border border-slate-700/60"
                                  title="Open Portfolio"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedInternshipDetail(app);
                                  setInternshipNoteEdit(app.adminNotes || '');
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#101A31] hover:bg-blue-600 text-cyan-300 hover:text-white font-semibold text-xs transition-all border border-slate-700/60"
                                title="Inspect Full Application Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Dossier</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteInternship(app.id)}
                                className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-600 hover:text-white transition-all border border-rose-500/30"
                                title="Delete Application"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================= */}
      {/* MODAL: COMPLETE INQUIRY DETAILS */}
      {/* ============================================================= */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        maxWidth="2xl"
        subtitle={selectedInquiry ? `Lead Details • ${selectedInquiry.id}` : undefined}
        title={selectedInquiry?.fullName}
      >
        {selectedInquiry && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Email Address</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-cyan-300 hover:underline font-mono">
                  {selectedInquiry.email}
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Phone / WhatsApp</span>
                <span className="text-emerald-400 font-mono">{selectedInquiry.phone || 'Not provided'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Company / Brand</span>
                <span className="text-white font-medium">{selectedInquiry.company || 'Not provided'}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Website Classification</span>
                <span className="text-cyan-400 font-mono">{selectedInquiry.websiteType}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Estimated Budget</span>
                <span className="text-emerald-400 font-mono font-bold">
                  {selectedInquiry.estimatedBudget || 'Flexible'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">Delivery Timeline</span>
                <span className="text-white font-mono">{selectedInquiry.completionTimeline || 'Flexible'}</span>
              </div>
            </div>

            {/* Requested Features */}
            {selectedInquiry.requiredFeatures && selectedInquiry.requiredFeatures.length > 0 && (
              <div>
                <h5 className="font-['Space_Grotesk'] text-sm font-bold text-white mb-2">Required Features</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedInquiry.requiredFeatures.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#101A31] border border-blue-500/20 text-cyan-300 font-mono"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h5 className="font-['Space_Grotesk'] text-sm font-bold text-white">Project Scope & Description</h5>
              <div className="p-4 rounded-xl bg-[#101A31]/60 border border-slate-800 text-slate-300 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.description}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-[#101A31] border border-slate-700 text-xs font-mono text-cyan-300"
                >
                  <option value="new">NEW</option>
                  <option value="in_review">IN REVIEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="closed">CLOSED</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Alpha Encoders Project Discovery • ${selectedInquiry.websiteType}`
                  )}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Architecture Proposal</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ============================================================= */}
      {/* MODAL: COMPLETE PROJECT DOSSIER / FULL SPECS */}
      {/* ============================================================= */}
      <Modal
        isOpen={!!selectedProjectDetail}
        onClose={() => setSelectedProjectDetail(null)}
        maxWidth="3xl"
        subtitle={
          selectedProjectDetail ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold">{selectedProjectDetail.industry}</span>
              {selectedProjectDetail.featured && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 text-cyan-300 font-mono">
                  Featured
                </span>
              )}
            </div>
          ) : undefined
        }
        title={
          selectedProjectDetail ? (
            <div>
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white mt-1">
                {selectedProjectDetail.name}
              </h3>
              <p className="text-xs text-slate-300 font-medium">{selectedProjectDetail.tagline}</p>
            </div>
          ) : undefined
        }
      >
        {selectedProjectDetail && (
          <div className="space-y-6">

            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Client</span>
                <span className="text-white font-semibold">{selectedProjectDetail.clientName || 'Direct Client'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Budget</span>
                <span className="text-emerald-400 font-bold">{selectedProjectDetail.projectBudget || 'Custom'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Timeline</span>
                <span className="text-blue-300 font-semibold">{selectedProjectDetail.deliveryDuration || '3-4 Weeks'}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Completion</span>
                <span className="text-slate-200">{selectedProjectDetail.completionDate || '2026'}</span>
              </div>
            </div>

            {/* Web Vitals & Metrics */}
            {selectedProjectDetail.metrics && (
              <div className="p-4 rounded-2xl bg-[#101A31]/50 border border-slate-800 space-y-2">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Production Telemetry & Performance Benchmarks</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center font-mono">
                  <div className="p-2 rounded-lg bg-[#0A1024]">
                    <span className="text-[10px] text-slate-400 block">Lighthouse</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {selectedProjectDetail.metrics.lighthousePerformance || 99}/100
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A1024]">
                    <span className="text-[10px] text-slate-400 block">Page Speed</span>
                    <span className="text-cyan-300 font-bold text-sm">
                      {selectedProjectDetail.metrics.pageSpeed || '0.38s'}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A1024]">
                    <span className="text-[10px] text-slate-400 block">Accessibility</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {selectedProjectDetail.metrics.accessibility || 100}%
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A1024]">
                    <span className="text-[10px] text-slate-400 block">SEO Score</span>
                    <span className="text-cyan-300 font-bold text-sm">
                      {selectedProjectDetail.metrics.seoScore || 100}%
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0A1024]">
                    <span className="text-[10px] text-slate-400 block">Payload Size</span>
                    <span className="text-slate-300 font-bold text-sm">
                      {selectedProjectDetail.metrics.payloadSize || '142 KB'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Full Description & Verified Result */}
            <div className="space-y-2">
              <h5 className="font-['Space_Grotesk'] text-sm font-bold text-white">Project Overview</h5>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#101A31]/40 border border-slate-800">
                {selectedProjectDetail.description}
              </p>
            </div>

            {selectedProjectDetail.verifiedResult && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs leading-relaxed space-y-1">
                <span className="font-mono font-bold text-emerald-400 uppercase text-[10px] block">
                  Verified Outcome
                </span>
                <p className="text-slate-200">{selectedProjectDetail.verifiedResult}</p>
              </div>
            )}

            {/* Client Testimonial / Feedback */}
            {selectedProjectDetail.clientFeedback && (
              <div className="p-4 rounded-xl bg-[#101A31] border-l-4 border-blue-500 text-xs italic text-slate-300">
                "{selectedProjectDetail.clientFeedback}"
                {selectedProjectDetail.clientName && (
                  <span className="block mt-1 font-mono text-[10px] text-cyan-300 not-italic font-semibold">
                    — {selectedProjectDetail.clientName}
                  </span>
                )}
              </div>
            )}

            {/* Architecture Overview */}
            {selectedProjectDetail.architectureOverview && (
              <div className="space-y-2">
                <h5 className="font-['Space_Grotesk'] text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Architectural Blueprint & Separation of Concerns</span>
                </h5>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed p-4 rounded-xl bg-[#101A31]/40 border border-slate-800">
                  {selectedProjectDetail.architectureOverview}
                </p>
              </div>
            )}

            {/* Highlights */}
            {selectedProjectDetail.highlights && selectedProjectDetail.highlights.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-['Space_Grotesk'] text-sm font-bold text-white">Engineering Highlights</h5>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProjectDetail.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack & Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">Technologies</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProjectDetail.technologies.map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#101A31] text-cyan-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">Services Provided</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProjectDetail.services.map((s, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#101A31] text-blue-300 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-3">
                {selectedProjectDetail.liveUrl && (
                  <a
                    href={selectedProjectDetail.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <span>Launch Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProjectDetail.githubUrl && (
                  <a
                    href={selectedProjectDetail.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#101A31] hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  const p = selectedProjectDetail;
                  setSelectedProjectDetail(null);
                  openEditProjectModal(p);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Edit Project
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ============================================================= */}
      {/* MODAL: COMPLETE CLIENT DOSSIER & CRM PROFILE */}
      {/* ============================================================= */}
      <Modal
        isOpen={!!selectedUserDetail}
        onClose={() => setSelectedUserDetail(null)}
        maxWidth="3xl"
        title={
          selectedUserDetail ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full pr-8">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold font-['Space_Grotesk'] text-xl shrink-0 ${
                  selectedUserDetail.role === 'admin'
                    ? 'bg-purple-950 border-purple-500 text-purple-200'
                    : 'bg-blue-950 border-blue-500/40 text-cyan-300'
                }`}>
                  {selectedUserDetail.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                      {selectedUserDetail.fullName}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded font-mono uppercase font-bold flex items-center gap-1 ${
                      selectedUserDetail.role === 'admin'
                        ? 'bg-purple-950 border border-purple-500 text-purple-200 shadow-sm'
                        : 'bg-blue-950 border border-blue-500/30 text-cyan-300'
                    }`}>
                      {selectedUserDetail.role === 'admin' && <Crown className="w-3 h-3 text-purple-300" />}
                      <span>{selectedUserDetail.role}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono font-normal mt-0.5">
                    {selectedUserDetail.company ? `${selectedUserDetail.company} • ` : ''}
                    Client ID: {selectedUserDetail.id}
                  </p>
                </div>
              </div>

              {/* Quick Admin Toggle In Dossier */}
              <button
                type="button"
                onClick={() => handleToggleAdminRole(selectedUserDetail)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-center ${
                  selectedUserDetail.role === 'admin'
                    ? 'bg-purple-950 text-purple-300 border border-purple-500/50 hover:bg-rose-950 hover:text-rose-300'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:brightness-110'
                }`}
              >
                {selectedUserDetail.role === 'admin' ? (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span>Revoke Admin Role</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Make Administrator</span>
                  </>
                )}
              </button>
            </div>
          ) : undefined
        }
      >
        {selectedUserDetail && (
          <div className="space-y-6">
            {/* Contact Roster */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Email</span>
                <a href={`mailto:${selectedUserDetail.email}`} className="text-cyan-300 hover:underline block truncate">
                  {selectedUserDetail.email}
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Phone / WhatsApp</span>
                <span className="text-emerald-400 block">
                  {selectedUserDetail.phone || 'None provided'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#101A31] space-y-1">
                <span className="text-slate-400 text-[10px] uppercase block">Location</span>
                <span className="text-slate-300 block">{selectedUserDetail.location || 'Remote'}</span>
              </div>
            </div>

            {/* Commercial Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#101A31]/50 border border-slate-800 text-center">
                <span className="text-slate-400 text-[10px] uppercase block">Lifetime Value</span>
                <span className="text-emerald-400 font-bold text-base">
                  ${selectedUserDetail.totalEstimatedValue?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]/50 border border-slate-800 text-center">
                <span className="text-slate-400 text-[10px] uppercase block">Status</span>
                <span className="text-cyan-300 font-semibold uppercase">
                  {selectedUserDetail.status.replace('_', ' ')}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]/50 border border-slate-800 text-center">
                <span className="text-slate-400 text-[10px] uppercase block">Total Submissions</span>
                <span className="text-white font-bold text-base">
                  {selectedUserDetail.totalInquiries || 0}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]/50 border border-slate-800 text-center">
                <span className="text-slate-400 text-[10px] uppercase block">First Contact</span>
                <span className="text-slate-300">
                  {new Date(selectedUserDetail.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Associated Projects */}
            {selectedUserDetail.associatedProjects && selectedUserDetail.associatedProjects.length > 0 && (
              <div className="space-y-2">
                <span className="font-['Space_Grotesk'] text-sm font-bold text-white block">
                  Associated Portfolio Projects
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedUserDetail.associatedProjects.map((pName, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3 py-1.5 rounded-xl bg-blue-950 border border-blue-500/40 text-cyan-300 text-xs font-mono font-semibold"
                    >
                      🚀 {pName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Inquiry History Timeline */}
            <div className="space-y-3">
              <h5 className="font-['Space_Grotesk'] text-sm font-bold text-white flex items-center justify-between">
                <span>Inquiry History & Project Requests</span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedUserDetail.inquiryHistory?.length || 0} Events
                </span>
              </h5>

              {(!selectedUserDetail.inquiryHistory || selectedUserDetail.inquiryHistory.length === 0) ? (
                <p className="text-xs text-slate-500 font-mono p-4 rounded-xl bg-[#101A31]">
                  No past inquiry records attached to this client.
                </p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {selectedUserDetail.inquiryHistory.map((hist, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-4 rounded-xl bg-[#101A31]/60 border border-slate-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-cyan-300 font-semibold">{hist.websiteType}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(hist.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{hist.description}</p>
                      <div className="flex flex-wrap gap-2 text-[10px] font-mono pt-1 text-slate-400">
                        {hist.estimatedBudget && (
                          <span className="text-emerald-400">Budget: {hist.estimatedBudget}</span>
                        )}
                        {hist.completionTimeline && (
                          <span className="text-blue-300">Timeline: {hist.completionTimeline}</span>
                        )}
                        <span className="uppercase text-cyan-400">Status: {hist.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Internal CRM Notes with Quick Save */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-['Space_Grotesk'] text-sm font-bold text-white">Internal Studio Notes</h5>
                <button
                  type="button"
                  onClick={handleSaveDossierNote}
                  disabled={isSavingNote}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                >
                  {isSavingNote ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
              <textarea
                rows={3}
                value={dossierNote}
                onChange={(e) => setDossierNote(e.target.value)}
                placeholder="Record client discussions, preferences, next steps..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#101A31] border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {selectedUserDetail.phone && (
                  <a
                    href={`https://wa.me/${selectedUserDetail.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {selectedUserDetail.phone && (
                  <a
                    href={`tel:${selectedUserDetail.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#101A31] hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                )}
                <a
                  href={`mailto:${selectedUserDetail.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Client</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => {
                  const u = selectedUserDetail;
                  setSelectedUserDetail(null);
                  openEditUserModal(u);
                }}
                className="text-xs px-3.5 py-2 rounded-xl bg-[#101A31] text-slate-300 hover:text-white"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ============================================================= */}
      {/* MODAL: ADD / EDIT PROJECT (COMPLETE FIELDS) */}
      {/* ============================================================= */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        maxWidth="2xl"
        title={editingProject ? 'Edit Project Specifications' : 'Publish New Live Project'}
      >
        <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    placeholder="e.g. TheCustomNest"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Slug / URL Identifier
                  </label>
                  <input
                    type="text"
                    value={projSlug}
                    onChange={(e) => setProjSlug(e.target.value)}
                    placeholder="e.g. the-custom-nest"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Industry / Vertical
                  </label>
                  <input
                    type="text"
                    value={projIndustry}
                    onChange={(e) => setProjIndustry(e.target.value)}
                    placeholder="e.g. Handcrafted Lifestyle & E-Commerce"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  >
                    <option value="E-commerce">E-commerce</option>
                    <option value="Web Application">Web Application</option>
                    <option value="Enterprise Portal">Enterprise Portal</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Tagline / Subheading
                </label>
                <input
                  type="text"
                  value={projTagline}
                  onChange={(e) => setProjTagline(e.target.value)}
                  placeholder="e.g. Artisan Crochet & Handcrafted Lifestyle Storefront"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={projDescription}
                  onChange={(e) => setProjDescription(e.target.value)}
                  placeholder="Provide comprehensive narrative of problem solved and architecture built..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Client Brand Name
                  </label>
                  <input
                    type="text"
                    value={projClientName}
                    onChange={(e) => setProjClientName(e.target.value)}
                    placeholder="e.g. TheCustomNest Studio"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Contract Budget
                  </label>
                  <input
                    type="text"
                    value={projBudget}
                    onChange={(e) => setProjBudget(e.target.value)}
                    placeholder="e.g. $4,800"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={projDuration}
                    onChange={(e) => setProjDuration(e.target.value)}
                    placeholder="e.g. 3 Weeks"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Live Production URL
                  </label>
                  <input
                    type="url"
                    value={projLiveUrl}
                    onChange={(e) => setProjLiveUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    GitHub / Repo URL
                  </label>
                  <input
                    type="url"
                    value={projGithubUrl}
                    onChange={(e) => setProjGithubUrl(e.target.value)}
                    placeholder="https://github.com/alpha-encoders/repo"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={projTech}
                  onChange={(e) => setProjTech(e.target.value)}
                  placeholder="React, TypeScript, Tailwind CSS, Vite"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Services Provided (comma separated)
                </label>
                <input
                  type="text"
                  value={projServices}
                  onChange={(e) => setProjServices(e.target.value)}
                  placeholder="E-commerce Development, UI/UX Design, Performance Tuning"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Engineering Highlights (one bullet per line)
                </label>
                <textarea
                  rows={3}
                  value={projHighlights}
                  onChange={(e) => setProjHighlights(e.target.value)}
                  placeholder="Multi-category filtering&#10;Frictionless slide-out cart drawer&#10;Sub-second image loading"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Architectural Blueprint Overview
                </label>
                <textarea
                  rows={2}
                  value={projArchitecture}
                  onChange={(e) => setProjArchitecture(e.target.value)}
                  placeholder="Built with modular React and TypeScript components, prioritizing fast initial bundle delivery..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="projFeatured"
                  checked={projFeatured}
                  onChange={(e) => setProjFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-800"
                />
                <label htmlFor="projFeatured" className="text-slate-300 font-medium">
                  Feature prominently on Home and Projects showcase
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#101A31] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/30"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
      </Modal>

      {/* ============================================================= */}
      {/* MODAL: ADD / EDIT CLIENT PROFILE (COMPLETE FIELDS) */}
      {/* ============================================================= */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        maxWidth="2xl"
        title={editingUser ? 'Edit Client CRM Profile' : 'Register New Client Profile'}
      >
        <form onSubmit={handleSaveUser} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="kabilk2023@gmail.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+91 8667452487"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={userCompany}
                    onChange={(e) => setUserCompany(e.target.value)}
                    placeholder="e.g. Artisan Flora Studio"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    placeholder="City, Country"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Role Category
                  </label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  >
                    <option value="admin">👑 Studio Administrator (Admin)</option>
                    <option value="client">Client Partner</option>
                    <option value="vip">VIP Enterprise Account</option>
                    <option value="lead">Sales Lead</option>
                    <option value="prospect">Discovery Prospect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={userStatus}
                    onChange={(e) => setUserStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  >
                    <option value="in_discussion">In Discussion</option>
                    <option value="active">Active</option>
                    <option value="onboarding">Onboarding</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {userRole === 'admin' && (
                <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <ShieldCheck className="w-4 h-4 text-purple-300 shrink-0" />
                  <span>
                    <strong>Studio Administrator Privilege:</strong> Setting this user as Admin grants full access to the Admin Command Center, users CRM CRUD, project publishing, and system database controls.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Est. Commercial Pipeline Value ($)
                  </label>
                  <input
                    type="number"
                    value={userValue}
                    onChange={(e) => setUserValue(e.target.value)}
                    placeholder="5000"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                    Associated Projects (comma separated)
                  </label>
                  <input
                    type="text"
                    value={userProjects}
                    onChange={(e) => setUserProjects(e.target.value)}
                    placeholder="e.g. TheCustomNest, EduSphere"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Internal Relationship Notes
                </label>
                <textarea
                  rows={3}
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                  placeholder="Record background context, technical requirements, discovery conversation notes..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#101A31] border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#101A31] text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/30"
                >
                  {editingUser ? 'Update Client' : 'Register Profile'}
                </button>
              </div>
            </form>
      </Modal>

      {/* ============================================================= */}
      {/* MODAL: COMPLETE INTERNSHIP CANDIDATE DOSSIER */}
      {/* ============================================================= */}
      <Modal
        isOpen={!!selectedInternshipDetail}
        onClose={() => setSelectedInternshipDetail(null)}
        maxWidth="3xl"
        subtitle={
          selectedInternshipDetail ? (
            <div className="flex items-center gap-2">
              <span>Candidate Dossier • {selectedInternshipDetail.id}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                  selectedInternshipDetail.status === 'accepted'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : selectedInternshipDetail.status === 'shortlisted' || selectedInternshipDetail.status === 'interview'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                    : selectedInternshipDetail.status === 'reviewing'
                    ? 'bg-blue-950 text-blue-300 border border-blue-500/40'
                    : selectedInternshipDetail.status === 'rejected'
                    ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                }`}
              >
                {selectedInternshipDetail.status}
              </span>
            </div>
          ) : undefined
        }
        title={
          selectedInternshipDetail ? (
            <div>
              <span className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                {selectedInternshipDetail.fullName}
              </span>
              <p className="text-xs text-slate-300 font-mono mt-1 font-normal">
                {selectedInternshipDetail.college} • {selectedInternshipDetail.degree} (Class of{' '}
                {selectedInternshipDetail.graduationYear})
              </p>
            </div>
          ) : undefined
        }
      >
        {selectedInternshipDetail && (
          <div className="space-y-6">

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Domain Track</span>
                <span className="text-cyan-300 font-bold">{selectedInternshipDetail.domain}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Experience</span>
                <span className="text-white font-semibold">{selectedInternshipDetail.experienceLevel}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Duration</span>
                <span className="text-emerald-400 font-bold">{selectedInternshipDetail.duration}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#101A31]">
                <span className="text-slate-400 text-[10px] uppercase block">Start Date</span>
                <span className="text-blue-300 font-semibold">{selectedInternshipDetail.startDate}</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#101A31] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Email</span>
                  <a
                    href={`mailto:${selectedInternshipDetail.email}`}
                    className="text-cyan-300 hover:underline font-mono"
                  >
                    {selectedInternshipDetail.email}
                  </a>
                </div>
                <Mail className="w-4 h-4 text-blue-400" />
              </div>

              <div className="p-3.5 rounded-xl bg-[#101A31] flex items-center justify-between">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">Phone / WhatsApp</span>
                  <span className="text-emerald-400 font-mono">
                    {selectedInternshipDetail.phone || 'Not provided'}
                  </span>
                </div>
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* External Links Bar */}
            <div className="p-4 rounded-2xl bg-[#101A31]/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold block">
                Portfolio, Resume & Artifacts
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedInternshipDetail.resumeUrl && (
                  <a
                    href={selectedInternshipDetail.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open Official Resume / CV</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                {selectedInternshipDetail.githubUrl && (
                  <a
                    href={selectedInternshipDetail.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1024] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-all"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                {selectedInternshipDetail.portfolioUrl && (
                  <a
                    href={selectedInternshipDetail.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1024] hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono transition-all"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Live Portfolio</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                )}

                {selectedInternshipDetail.linkedinUrl && (
                  <a
                    href={selectedInternshipDetail.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A1024] hover:bg-slate-800 border border-slate-700 text-blue-300 text-xs font-mono transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
              </div>
            </div>

            {/* Technical Skills */}
            {selectedInternshipDetail.skills && selectedInternshipDetail.skills.length > 0 && (
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-2">
                  Technical Stack & Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInternshipDetail.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#101A31] border border-slate-800 text-cyan-300 text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Statement of Purpose */}
            <div>
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-2">
                Statement of Purpose / Motivation
              </span>
              <div className="p-4 rounded-2xl bg-[#101A31]/40 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                "{selectedInternshipDetail.statementOfPurpose}"
              </div>
            </div>

            {/* Review Decision & Admin Notes */}
            <div className="p-4 rounded-2xl bg-[#101A31] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                  Board Review & Decision
                </span>
                <select
                  value={selectedInternshipDetail.status}
                  onChange={(e) =>
                    handleUpdateInternshipStatus(selectedInternshipDetail.id, e.target.value)
                  }
                  className="px-3 py-1 rounded-lg text-xs font-mono font-semibold uppercase bg-[#0A1024] border border-slate-700 text-white focus:outline-none"
                >
                  <option value="pending">PENDING REVIEW</option>
                  <option value="reviewing">UNDER REVIEW</option>
                  <option value="shortlisted">SHORTLISTED</option>
                  <option value="interview">INTERVIEW SCHEDULED</option>
                  <option value="accepted">ACCEPTED / OFFER SENT</option>
                  <option value="rejected">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-mono text-[10px] uppercase mb-1">
                  Internal Review Notes & Interview Feedback
                </label>
                <textarea
                  rows={3}
                  value={internshipNoteEdit}
                  onChange={(e) => setInternshipNoteEdit(e.target.value)}
                  placeholder="Record evaluation, GitHub code quality assessment, interview questions, or follow-up instructions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A1024] border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveInternshipNotes(selectedInternshipDetail.id)}
                  disabled={isSavingInternshipNote}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all disabled:opacity-50"
                >
                  {isSavingInternshipNote ? 'Saving...' : 'Save Review Notes'}
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDeleteInternship(selectedInternshipDetail.id)}
                className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-mono"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Application</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedInternshipDetail(null)}
                className="px-5 py-2 rounded-xl bg-[#101A31] hover:bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
