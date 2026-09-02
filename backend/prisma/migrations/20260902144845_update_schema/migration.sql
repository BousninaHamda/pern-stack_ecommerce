/*
  Warnings:

  - The values [INACTIVE] on the enum `ProductStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `billingAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `couponId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `discountAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddressId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `taxAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productSlug` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeChargeId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `colorId` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CouponCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CouponProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductColorImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductStatus_new" AS ENUM ('ACTIVE', 'OUT_OF_STOCK', 'DRAFT');
ALTER TABLE "public"."Product" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "status" TYPE "ProductStatus_new" USING ("status"::text::"ProductStatus_new");
ALTER TYPE "ProductStatus" RENAME TO "ProductStatus_old";
ALTER TYPE "ProductStatus_new" RENAME TO "ProductStatus";
DROP TYPE "public"."ProductStatus_old";
ALTER TABLE "Product" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropForeignKey
ALTER TABLE "CouponCategory" DROP CONSTRAINT "CouponCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CouponCategory" DROP CONSTRAINT "CouponCategory_couponId_fkey";

-- DropForeignKey
ALTER TABLE "CouponProduct" DROP CONSTRAINT "CouponProduct_couponId_fkey";

-- DropForeignKey
ALTER TABLE "CouponProduct" DROP CONSTRAINT "CouponProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_billingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";

-- DropForeignKey
ALTER TABLE "ProductColor" DROP CONSTRAINT "ProductColor_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductColorImage" DROP CONSTRAINT "ProductColorImage_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_colorId_fkey";

-- DropIndex
DROP INDEX "CartItem_productId_idx";

-- DropIndex
DROP INDEX "Category_name_idx";

-- DropIndex
DROP INDEX "Order_couponId_idx";

-- DropIndex
DROP INDEX "Order_orderNumber_key";

-- DropIndex
DROP INDEX "Payment_status_idx";

-- DropIndex
DROP INDEX "Product_createdAt_idx";

-- DropIndex
DROP INDEX "Product_price_idx";

-- DropIndex
DROP INDEX "ProductVariant_colorId_idx";

-- DropIndex
DROP INDEX "ProductVariant_productId_colorId_size_key";

-- DropIndex
DROP INDEX "ProductVariant_sku_idx";

-- DropIndex
DROP INDEX "ProductVariant_stock_idx";

-- DropIndex
DROP INDEX "User_createdAt_idx";

-- DropIndex
DROP INDEX "User_role_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "billingAddressId",
DROP COLUMN "couponId",
DROP COLUMN "discountAmount",
DROP COLUMN "orderNumber",
DROP COLUMN "shippingAddressId",
DROP COLUMN "shippingAmount",
DROP COLUMN "subtotal",
DROP COLUMN "taxAmount";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "color",
DROP COLUMN "productName",
DROP COLUMN "productSlug",
DROP COLUMN "size",
DROP COLUMN "sku";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paidAt",
DROP COLUMN "provider",
DROP COLUMN "stripeChargeId",
DROP COLUMN "stripeCustomerId",
ADD COLUMN     "method" "PaymentMethod" NOT NULL DEFAULT 'STRIPE';

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "colorId",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "isActive",
DROP COLUMN "lastName",
DROP COLUMN "passwordHash",
DROP COLUMN "phone",
DROP COLUMN "role",
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "clerkId" TEXT NOT NULL,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Coupon";

-- DropTable
DROP TABLE "CouponCategory";

-- DropTable
DROP TABLE "CouponProduct";

-- DropTable
DROP TABLE "ProductColor";

-- DropTable
DROP TABLE "ProductColorImage";

-- DropTable
DROP TABLE "ProductImage";

-- DropEnum
DROP TYPE "CouponScope";

-- DropEnum
DROP TYPE "CouponStatus";

-- DropEnum
DROP TYPE "DiscountType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL,
    "wishlistId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShippingAddress_orderId_key" ON "ShippingAddress"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- CreateIndex
CREATE INDEX "WishlistItem_wishlistId_idx" ON "WishlistItem"("wishlistId");

-- CreateIndex
CREATE INDEX "WishlistItem_productId_idx" ON "WishlistItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_wishlistId_productId_key" ON "WishlistItem"("wishlistId", "productId");

-- CreateIndex
CREATE INDEX "CartItem_cartId_idx" ON "CartItem"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "ShippingAddress" ADD CONSTRAINT "ShippingAddress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishlistItem" ADD CONSTRAINT "WishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
