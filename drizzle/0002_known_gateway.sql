ALTER TABLE "check_ins" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "check_ins" ADD COLUMN "gym_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gym_id_gyms_id_fk" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
