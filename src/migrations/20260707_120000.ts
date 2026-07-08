import {
  type MigrateDownArgs,
  type MigrateUpArgs,
  sql,
} from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_products_category" AS ENUM('ai-systems', 'robotics', 'infrastructure', 'research', 'developer-tools');
  CREATE TYPE "public"."enum_products_status" AS ENUM('active', 'coming-soon', 'archived');
  CREATE TYPE "public"."enum_help_articles_category" AS ENUM('getting-started', 'account', 'billing', 'technical', 'security', 'integrations', 'troubleshooting');
  CREATE TYPE "public"."enum_faqs_category" AS ENUM('general', 'account-billing', 'products', 'technical', 'security', 'support');
  CREATE TYPE "public"."enum_careers_department" AS ENUM('engineering', 'research', 'product', 'design', 'operations', 'sales-marketing', 'people');
  CREATE TYPE "public"."enum_careers_type" AS ENUM('full-time', 'part-time', 'contract', 'internship');
  CREATE TYPE "public"."enum_legal_pages_type" AS ENUM('privacy-policy', 'terms-of-service', 'cookie-policy', 'acceptable-use', 'data-processing', 'other');

  CREATE TABLE "products_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );

  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"category" "enum_products_category" NOT NULL,
  	"logo_id" integer,
  	"cover_image_id" integer,
  	"link" varchar,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"status" "enum_products_status" DEFAULT 'active',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "help_articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"category" "enum_help_articles_category" NOT NULL,
  	"summary" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" "enum_faqs_category" NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"department" "enum_careers_department" NOT NULL,
  	"location" varchar NOT NULL,
  	"type" "enum_careers_type" DEFAULT 'full-time' NOT NULL,
  	"summary" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"requirements" jsonb,
  	"apply_link" varchar,
  	"salary_range" varchar,
  	"active" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"type" "enum_legal_pages_type" NOT NULL,
  	"summary" varchar,
  	"content" jsonb NOT NULL,
  	"effective_date" timestamp(3) with time zone DEFAULT now(),
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  -- Extend the locked-documents relations table with the new collections.
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "help_articles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "careers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "legal_pages_id" integer;

  -- Foreign keys for new tables
  ALTER TABLE "products_features" ADD CONSTRAINT "products_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_help_articles_fk" FOREIGN KEY ("help_articles_id") REFERENCES "public"."help_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;

  -- Indexes
  CREATE INDEX "products_features_order_idx" ON "products_features" USING btree ("_order");
  CREATE INDEX "products_features_parent_id_idx" ON "products_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_logo_idx" ON "products" USING btree ("logo_id");
  CREATE INDEX "products_cover_image_idx" ON "products" USING btree ("cover_image_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");

  CREATE UNIQUE INDEX "help_articles_slug_idx" ON "help_articles" USING btree ("slug");
  CREATE INDEX "help_articles_updated_at_idx" ON "help_articles" USING btree ("updated_at");
  CREATE INDEX "help_articles_created_at_idx" ON "help_articles" USING btree ("created_at");

  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");

  CREATE UNIQUE INDEX "careers_slug_idx" ON "careers" USING btree ("slug");
  CREATE INDEX "careers_updated_at_idx" ON "careers" USING btree ("updated_at");
  CREATE INDEX "careers_created_at_idx" ON "careers" USING btree ("created_at");

  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");

  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_help_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("help_articles_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_careers_id_idx" ON "payload_locked_documents_rels" USING btree ("careers_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");`)
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "products_features" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "help_articles" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "careers" CASCADE;
  DROP TABLE "legal_pages" CASCADE;

  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "products_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "help_articles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "careers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "legal_pages_id";

  DROP TYPE "public"."enum_products_category";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum_help_articles_category";
  DROP TYPE "public"."enum_faqs_category";
  DROP TYPE "public"."enum_careers_department";
  DROP TYPE "public"."enum_careers_type";
  DROP TYPE "public"."enum_legal_pages_type";`)
}
