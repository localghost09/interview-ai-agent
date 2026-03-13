'use client';

interface SummaryFormProps {
  data: ResumeSummary;
  onChange: (data: ResumeSummary) => void;
}

export default function SummaryForm({ data, onChange }: SummaryFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Professional Summary</h3>
      <p className="text-sm text-light-400">
        Write a 2-4 sentence summary highlighting your experience, key skills, and career goals.
      </p>
      <textarea
        value={data.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder="Results-driven software engineer with 6+ years of experience building scalable web applications..."
        rows={5}
        className="interview-textarea w-full"
      />
      <p className="text-xs text-light-600">
        {data.content.length} characters
      </p>
    </div>
  );
}
