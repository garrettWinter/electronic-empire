// seed.mjs
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Import JSON files using CommonJS require
import productSeed from './seedData/products.json';
import userSeed from './seedData/users.json';
import orderSeed from './seedData/orders.json';
import orderLineItemSeed from './seedData/orderLineItem.json';

async function seedDatabase() {
    try {
        // Clearing the tables for be seeded again
        await prisma.orderLineItem.deleteMany();
        await prisma.order.deleteMany();
        await prisma.product.deleteMany();
        await prisma.user.deleteMany();

        // Populating the tables with seed data.
        await prisma.product.createMany({
            data: productSeed
        });
        console.log('Seed completed successfully for Product table');

        await prisma.user.createMany({
            data: userSeed
        });
        console.log('Seed completed successfully for User table');

        await prisma.order.createMany({
            data: orderSeed
        });
        console.log('Seed completed successfully for Order table');

        await prisma.orderLineItem.createMany({
            data: orderLineItemSeed
        });
        console.log('Seed completed successfully for orderLineItem table');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();
