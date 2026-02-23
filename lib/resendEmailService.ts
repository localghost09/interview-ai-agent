import { Resend } from 'resend';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  fromName?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  provider: string;
}

class ResendEmailService {
  private static instance: ResendEmailService;
  private resend: Resend | null = null;

  private constructor() {
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
    }
  }

  public static getInstance(): ResendEmailService {
    if (!ResendEmailService.instance) {
      ResendEmailService.instance = new ResendEmailService();
    }
    return ResendEmailService.instance;
  }

  /**
   * Send email using Resend
   */
  public async sendEmail(options: EmailOptions): Promise<EmailResult> {
    try {
      if (!this.resend) {
        throw new Error('Resend API key not configured');
      }

      console.log('📧 Sending email via Resend:', {
        to: options.to,
        subject: options.subject,
        from: options.from || process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com'
      });

      const result = await this.resend.emails.send({
        from: options.from || process.env.RESEND_FROM_EMAIL || 'AI MockPrep <noreply@yourdomain.com>',
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, '') // Strip HTML for text version
      });

      console.log('✅ Resend email sent successfully:', result.data?.id);

      return {
        success: true,
        messageId: result.data?.id,
        provider: 'Resend'
      };

    } catch (error) {
      console.error('❌ Resend email failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Resend error',
        provider: 'Resend'
      };
    }
  }
}

export default ResendEmailService.getInstance();
