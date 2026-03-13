'use client';

import { createEducationEntry } from '@/lib/resume-builder/default-data';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface EducationFormProps {
  data: ResumeEducation[];
  onChange: (data: ResumeEducation[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const addEntry = () => {
    onChange([...data, createEducationEntry()]);
  };

  const removeEntry = (id: string) => {
    onChange(data.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof ResumeEducation, value: string | string[]) => {
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const moveEntry = (index: number, direction: 'up' | 'down') => {
    const newData = [...data];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newData.length) return;
    [newData[index], newData[targetIndex]] = [newData[targetIndex], newData[index]];
    onChange(newData);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Education</h3>
        <button
          onClick={addEntry}
          className="flex items-center gap-1.5 text-sm text-primary-200 hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 && (
        <p className="text-sm text-light-600 text-center py-6">
          No education entries yet. Click "Add Education" to get started.
        </p>
      )}

      <div className="space-y-4">
        {data.map((entry, index) => (
          <div key={entry.id} className="interview-glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-light-600" />
                <span className="text-sm font-medium text-light-400">
                  Education {index + 1}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {index > 0 && (
                  <button
                    onClick={() => moveEntry(index, 'up')}
                    className="text-xs text-light-400 hover:text-white"
                  >
                    ↑
                  </button>
                )}
                {index < data.length - 1 && (
                  <button
                    onClick={() => moveEntry(index, 'down')}
                    className="text-xs text-light-400 hover:text-white"
                  >
                    ↓
                  </button>
                )}
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-destructive-100 hover:text-destructive-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-sm text-light-400 mb-1">Institution</label>
                <input
                  type="text"
                  value={entry.institution}
                  onChange={(e) => updateEntry(entry.id, 'institution', e.target.value)}
                  placeholder="Stanford University"
                  className="interview-input w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-light-400 mb-1">Degree</label>
                <input
                  type="text"
                  value={entry.degree}
                  onChange={(e) => updateEntry(entry.id, 'degree', e.target.value)}
                  placeholder="M.S. Computer Science"
                  className="interview-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-light-400 mb-1">Start Date</label>
                <input
                  type="month"
                  value={entry.startDate}
                  onChange={(e) => updateEntry(entry.id, 'startDate', e.target.value)}
                  className="interview-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-light-400 mb-1">End Date</label>
                <input
                  type="month"
                  value={entry.endDate === 'Present' ? '' : entry.endDate}
                  onChange={(e) => updateEntry(entry.id, 'endDate', e.target.value || 'Present')}
                  className="interview-input w-full"
                  placeholder="Present"
                />
              </div>
              <div>
                <label className="block text-sm text-light-400 mb-1">Location</label>
                <input
                  type="text"
                  value={entry.location || ''}
                  onChange={(e) => updateEntry(entry.id, 'location', e.target.value)}
                  placeholder="Stanford, CA"
                  className="interview-input w-full"
                />
              </div>
              <div>
                <label className="block text-sm text-light-400 mb-1">GPA</label>
                <input
                  type="text"
                  value={entry.gpa || ''}
                  onChange={(e) => updateEntry(entry.id, 'gpa', e.target.value)}
                  placeholder="3.9"
                  className="interview-input w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-light-400 mb-1">Highlights (one per line)</label>
              <textarea
                value={(entry.highlights || []).join('\n')}
                onChange={(e) =>
                  updateEntry(
                    entry.id,
                    'highlights',
                    e.target.value.split('\n').filter((l) => l.trim())
                  )
                }
                placeholder="Dean's List all semesters&#10;Research in distributed systems"
                rows={3}
                className="interview-textarea w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
