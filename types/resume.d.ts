interface KeywordAnalysis {
  matched: string[];
  missing: string[];
  partial: string[];
  categorized: {
    technical: string[];
    soft: string[];
    tools: string[];
    certifications: string[];
  };
  keyword_score: number;
}

interface SemanticAnalysis {
  semantic_score: number;
  explanation: string;
}

interface ImpactAnalysis {
  impact_score: number;
  weak_bullets: string[];
  issues: string[];
}

interface Rewrite {
  original: string;
  improved: string;
  explanation: string;
}

interface AnalysisResult {
  keyword_analysis: KeywordAnalysis;
  semantic_analysis: SemanticAnalysis;
  impact_analysis: ImpactAnalysis;
  rewrites: Rewrite[];
  projected_score: number;
  final_score: number;
  skills_alignment: number;
  experience_alignment: number;
  format_compliance: number;
}

interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}
