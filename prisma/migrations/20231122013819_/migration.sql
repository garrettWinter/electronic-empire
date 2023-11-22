/*
  Warnings:

  - You are about to drop the column `ProductDescription` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productDescription` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ProductDescription",
ADD COLUMN     "productDescription" VARCHAR(4000) NOT NULL;
