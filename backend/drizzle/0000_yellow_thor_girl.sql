CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	"email" text NOT NULL,
	"birthdate" date,
	"image" varchar(500),
	"password" text NOT NULL
);
