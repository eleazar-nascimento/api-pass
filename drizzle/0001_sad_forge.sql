CREATE TABLE IF NOT EXISTS "gyms" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"latitude" numeric NOT NULL,
	"longitude" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "gyms_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "check_ins" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"validated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password_hash" text;