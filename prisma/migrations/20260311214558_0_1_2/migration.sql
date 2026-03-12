/*
  Warnings:

  - You are about to drop the column `name` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "name",
ADD COLUMN     "email" VARCHAR(255),
ADD COLUMN     "full_name" VARCHAR(150),
ADD COLUMN     "linkedin_url" VARCHAR(255),
ADD COLUMN     "location" VARCHAR(150),
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "portfolio_url" VARCHAR(255);

-- CreateTable
CREATE TABLE "education" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profile_id" UUID NOT NULL,
    "institution" VARCHAR(150) NOT NULL,
    "degree" VARCHAR(150) NOT NULL,
    "field" VARCHAR(150) NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
