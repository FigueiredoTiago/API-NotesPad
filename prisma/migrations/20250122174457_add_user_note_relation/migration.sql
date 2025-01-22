-- DropIndex
DROP INDEX "Note_id_key";

-- DropIndex
DROP INDEX "User_id_key";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
