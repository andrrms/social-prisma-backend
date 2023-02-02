-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostShare" DROP CONSTRAINT "PostShare_postId_fkey";

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostShare" ADD CONSTRAINT "PostShare_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
