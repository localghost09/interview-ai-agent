'use client';

import { createCertificationEntry } from '@/lib/resume-builder/default-data';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsFormProps {
  data: ResumeCertification[];
  onChange: (data: ResumeCertification[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addEntry = () => {
    onChange([...data, createCertificationEntry()]);
  };

  const removeEntry = (id: string) => {
    onChange(data.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof ResumeCertification, value: string) => {
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Certifications</h3>
        <button
          onClick={addEntry}
          className="flex items-center gap-1.5 text-sm text-primary-200 hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-sm text-light-600 text-center py-6">
          No certifications yet. Click "Add Certification" to add your credentials.
        </p>
      )}

      <div className="space-y-4">
        {data.map((entry, index) => (
          <div key={entry.id} className="interview-glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-light-400">Certification {index + 1}</span>
              <button onClick={() => removeEntry(entry.id)} className="text-destructive-100 hover:text-destructive-200 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm text-light-400 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={entry.name}
                  onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
                  placeholder="AWS Solutions Architect – Professional"
                  className="interview-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-light-400 mb-1">Issuer</label>
                <input
                  type="text"
                  value={entry.issuer}
                  onChange={(e) => updateEntry(entry.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                  className="interview-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-light-400 mb-1">Date</label>
                <input
                  type="month"
                  value={entry.date}
                  onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                  className="interview-input w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-light-400 mb-1">URL (optional)</label>
                <input
                  type="text"
                  value={entry.url || ''}
                  onChange={(e) => updateEntry(entry.id, 'url', e.target.value)}
                  placeholder="credential-url.com/verify"
                  className="interview-input w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
