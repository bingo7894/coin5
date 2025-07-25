import Prisma from "@prisma/client";
const PrismaClient = Prisma.PrismaClient; // This is the PrismaClient class constructor

declare global {
  // We want 'prisma' to be an instance of PrismaClient
  var prisma: InstanceType<typeof PrismaClient> | undefined; // <-- THIS IS THE CRUCIAL CHANGE
}

// Reuse the existing global instance or create a new one
const db = globalThis.prisma || new PrismaClient();

// In development, keep the global instance so it's not recreated on hot reloads
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export default db;
