"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
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
    // In a real app, you'd get this from your auth context
    // For now, we'll use a dummy user ID
    setCurrentUser("user1");
    
    // Pre-fill form from URL parameters
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="role">Job Role</Label>
        <Input
          id="role"
          type="text"
          placeholder="e.g. Frontend Developer, Full Stack Engineer"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="level">Experience Level</Label>
        <select
          id="level"
          value={formData.level}
          onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Junior" className="text-black">Junior (0-2 years)</option>
          <option value="Mid" className="text-black">Mid-level (2-5 years)</option>
          <option value="Senior" className="text-black">Senior (5+ years)</option>
        </select>
      </div>

      <div>
        <Label htmlFor="type">Interview Type</Label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Technical" className="text-black">Technical</option>
          <option value="Behavioral" className="text-black">Behavioral</option>
          <option value="Mixed" className="text-black">Mixed</option>
          <option value= "Coding"  className="text-black">Codeing</option>
        </select>
      </div>

      <div>
        <Label>Technologies & Skills</Label>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
          {TECH_OPTIONS.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => handleTechToggle(tech)}
              className={`p-2 text-sm rounded-md border transition-colors ${
                formData.techstack.includes(tech)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
        {formData.techstack.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {formData.techstack.join(", ")}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full btn-primary" 
        disabled={loading}
      >
        {loading ? "Creating Interview..." : "Create Interview"}
      </Button>
    </form>
  );
};

export default InterviewForm;
