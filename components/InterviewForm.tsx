"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createInterview } from "@/lib/actions/interview.action";
import { toast } from "sonner";

const TECH_OPTIONS = [
  "React", "Next.js", "Vue.js", "Angular", "TypeScript", "JavaScript",
  "Node.js", "Express", "Python", "Django", "Flask", "Java", "Spring",
  "C#", ".NET", "PHP", "Laravel", "Ruby", "Rails", "Go", "Rust",
  "MongoDB", "PostgreSQL", "MySQL", "Redis", "AWS", "Azure", "Docker",
  "Kubernetes", "GraphQL", "REST API", "Tailwind CSS", "Bootstrap"
];

const InterviewForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    role: "",
    level: "Junior",
    type: "Technical",
    techstack: [] as string[]
  });

  useEffect(() => {
    setCurrentUser("user1");

    const role = searchParams.get('role');
    const type = searchParams.get('type');
    const level = searchParams.get('level');
    const techstack = searchParams.get('techstack');

    if (role || type || level || techstack) {
      setFormData(prev => ({
        ...prev,
        role: role || prev.role,
        type: type === 'mixed' ? 'Mixed' : type === 'technical' ? 'Technical' : type || prev.type,
        level: level ? level.charAt(0).toUpperCase() + level.slice(1) : prev.level,
        techstack: techstack ? techstack.split(',').map(t => t.trim()) : prev.techstack
      }));
    }
  }, [searchParams]);

  const handleTechToggle = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techstack: prev.techstack.includes(tech)
        ? prev.techstack.filter(t => t !== tech)
        : [...prev.techstack, tech]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.role.trim()) {
      toast.error("Please enter a role");
      return;
    }

    if (formData.techstack.length === 0) {
      toast.error("Please select at least one technology");
      return;
    }

    if (!currentUser) {
      toast.error("Please sign in to create an interview");
      router.push('/sign-in');
      return;
    }

    setLoading(true);

    try {
      const result = await createInterview({
        userId: currentUser,
        role: formData.role,
        level: formData.level,
        techstack: formData.techstack,
        type: formData.type
      });

      if (result.success) {
        toast.success("Interview created successfully!");
        router.push(`/interview/${result.interviewId}/questions`);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to create interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Job Role */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="interview-number-badge">1</div>
          <div>
            <label htmlFor="role" className="interview-label !mb-0">Job Role</label>
            <p className="text-[11px] text-light-400 mt-0.5">The position you&apos;re preparing for</p>
          </div>
        </div>
        <input
          id="role"
          type="text"
          placeholder="e.g. Frontend Developer, Full Stack Engineer, DevOps"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="interview-input"
        />
      </div>

      {/* Section 2: Level & Type */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="interview-number-badge">2</div>
          <div>
            <span className="interview-label !mb-0">Experience & Type</span>
            <p className="text-[11px] text-light-400 mt-0.5">Customize difficulty and interview style</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="level" className="text-xs text-light-400 mb-1.5 block">Experience Level</label>
            <select
              id="level"
              value={formData.level}
              onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
              className="interview-select"
            >
              <option value="Junior">Junior (0-2 years)</option>
              <option value="Mid">Mid-level (2-5 years)</option>
              <option value="Senior">Senior (5+ years)</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="text-xs text-light-400 mb-1.5 block">Interview Type</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="interview-select"
            >
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Mixed">Mixed</option>
              <option value="Coding">Coding</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Technologies */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="interview-number-badge">3</div>
          <div>
            <span className="interview-label !mb-0">Technologies & Skills</span>
            <p className="text-[11px] text-light-400 mt-0.5">Select the technologies relevant to your target role</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {TECH_OPTIONS.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => handleTechToggle(tech)}
              className={`interview-tech-btn ${
                formData.techstack.includes(tech) ? "interview-tech-btn-active" : ""
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
        {formData.techstack.length > 0 && (
          <div className="mt-4 p-3.5 rounded-xl" style={{ background: 'rgba(202, 197, 254, 0.05)', border: '1px solid rgba(202, 197, 254, 0.12)' }}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-light-400">{formData.techstack.length} selected</p>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, techstack: [] }))} className="text-[11px] text-primary-200/60 hover:text-primary-200 transition-colors">Clear all</button>
            </div>
            <p className="text-sm text-primary-100 font-medium">{formData.techstack.join(" · ")}</p>
          </div>
        )}
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-light-600/20 to-transparent" />

      <button
        type="submit"
        className="interview-submit-btn"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
            Creating Interview...
          </span>
        ) : "Create Interview"}
      </button>
    </form>
  );
};

export default InterviewForm;
