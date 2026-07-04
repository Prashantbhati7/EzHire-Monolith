import { createRedisClient } from './utils/redis.js';
import nodemailer from 'nodemailer';
import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

dns.setDefaultResultOrder('ipv4first');

const startSendMailConsumer = async () => {
    const consumerClient = createRedisClient();

    try {
        await consumerClient.connect();
        console.log("Mail service Redis consumer connected successfully");
        console.log("Mail service consumer started listening for sending mail via Redis");
    } catch (error) {
        console.error("Failed to connect Redis consumer:", error);
        return;
    }

    const queueKey = "queue:send-mail";
    
    // Asynchronous worker loop running in the background
    (async () => {
        while (true) {
            try {
                // brPop takes the queue key and timeout in seconds.
                // Using 20 seconds helps to prevent Upstash from closing inactive connections.
                const result = await consumerClient.brPop(queueKey, 20);
                if (result) {
                    const { element } = result;
                    try {
                        const { to, subject, html } = JSON.parse(element);
                        if (!to || !subject || !html) {
                            console.warn("Invalid email message structure:", element);
                            continue;
                        }
                        
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false,
                            requireTLS: true,
                            auth: {
                                user: process.env.SMTP_USER,
                                pass: process.env.SMTP_PASSWORD // Google Account App Passwords
                            }
                        } as any);

                        await transporter.sendMail({
                            from: "EzHire <no-reply>",
                            to,
                            subject,
                            html
                        });
                        console.log("Mail has been sent to", to);
                    } catch (err) {
                        console.error("Failed to process queue message or send email:", err);
                    }
                }
            } catch (error) {
                console.error("Error in Redis consumer loop:", error);
                // Wait 5 seconds before retrying in case of connection drop
                await new Promise((resolve) => setTimeout(resolve, 5000));
                
                if (!consumerClient.isOpen) {
                    try {
                        console.log("Attempting to reconnect Redis consumer...");
                        await consumerClient.connect();
                    } catch (reconErr) {
                        console.error("Failed to reconnect Redis consumer:", reconErr);
                    }
                }
            }
        }
    })();
};

export default startSendMailConsumer;