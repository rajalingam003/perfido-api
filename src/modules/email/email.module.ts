import { Module } from "@nestjs/common";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.services";
import  { MailerModule} from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from "@nestjs/config";
import { join } from "path";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"



@Module({
    imports:[
        MailerModule.forRootAsync({
            imports:[ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: 'smtp.sendgrid.net',
                    auth: {
                        user: configService.get('EMAIL_USER_NAME'), // Use environment variable for username
                        pass: configService.get('EMAIL_PASSWORD') // Use environment variable for password
                    }
                },
                template:{
                    dir: join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                }
            }),
            inject: [ConfigService],
        })

    ],
    controllers: [EmailController],
    providers: [EmailService],
})

export class EmailModule {}