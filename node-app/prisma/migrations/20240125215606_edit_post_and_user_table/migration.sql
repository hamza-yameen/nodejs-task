/*
  Warnings:

  - You are about to drop the column `tile` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `tile`,
    DROP COLUMN `userId`,
    ADD COLUMN `title` VARCHAR(191) NOT NULL;
