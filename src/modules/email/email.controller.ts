// email.controller.ts
import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.services";


@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Post()
    public async sendEmail(@Body('toemail') toemail: string) {
        try {
            await this.emailService.sendEmail(toemail);
            return 'success';
        } catch (error) {
            return 'error';
        }
    }
}
