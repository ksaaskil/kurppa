-- AlterTable
ALTER TABLE "Observation" ADD COLUMN     "observationLocationAccuracy" DOUBLE PRECISION,
ADD COLUMN     "observationLocationTimestamp" TIMESTAMP(3);
