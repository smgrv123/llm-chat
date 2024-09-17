ALTER TABLE "chats" RENAME COLUMN "timeStamp" TO "createdAt";--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;