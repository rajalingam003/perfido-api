import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from "@nestjs/config";
import { readFileSync } from 'fs';
import * as handlebars from 'handlebars';
import { JSDOM } from 'jsdom';

@Injectable()
export class EmailService {
    constructor(
        private mailService: MailerService,
        private configService: ConfigService
    ) {}

    public async sendEmail(toemail: string) {
        try {
            // Read the template file content
            const templateContent = readFileSync('src/modules/email/templates/ResetPassword.hbs', 'utf-8');
            
            // Compile the template using Handlebars
            const template = handlebars.compile(templateContent);

            // Render the template with data (if needed)
            const templateData = {
                otpCode: 123456 // Add your OTP code here
            };
            const emailBody = template(templateData);

            const { document } = new JSDOM(emailBody).window;
            const titleElement = document.querySelector("title");
            const subject = titleElement ? titleElement.textContent : "Default Subject";

            // Send the email
            const emailOptions = {
                to: toemail,
                from: this.configService.get('EMAIL'),
                subject: subject,
                html: emailBody
            };
            await this.mailService.sendMail(emailOptions);
            
            return 'Email successfully sent';
        } catch (error) {
            throw new Error('Failed to send email');
        }
    }
}
