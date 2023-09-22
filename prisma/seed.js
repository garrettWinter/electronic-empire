import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDatabase() {
    try {
        // Clearing the tables for be seeded again
        await prisma.orderLineItem.deleteMany();
        await prisma.order.deleteMany();
        await prisma.product.deleteMany();
        await prisma.user.deleteMany();
        // Populating the tables with seed data.
        await prisma.product.createMany({
            data: [
                {
                    productId: 1,
                    productName: '75 inch TV',
                    productPrice: 4321.99,
                    productImage: 'image1',
                    ProductDescription: 'A huge 4k TV',
                },
                {
                    productId: 2,
                    productName: 'PS5',
                    productPrice: 499.99,
                    productImage: 'image2',
                    ProductDescription: 'Shinny New PS5',
                },
                {
                    productId: 3,
                    productName: '2TB SSD',
                    productPrice: 169.99,
                    productImage: 'image3',
                    ProductDescription: 'New harddrive for the win!',
                },
                {
                    productId: 4,
                    productName: 'Cell Phone',
                    productPrice: 1299.99,
                    productImage: 'image4',
                    ProductDescription: 'Brand new phone, but same as the last version.',
                },
            ],
        });
        console.log('Seed completed successfully for Product table');
        await prisma.user.createMany({
            data: [
                {
                    userId: '75ec0d9c-01e6-418a-8c85-fd74db6a6f7h',
                    userName: 'tester1',
                    password: 'password1',
                },
                {
                    userId: '2d1ea2e5-3017-4247-b934-16878938e22h',
                    userName: 'tester2',
                    password: 'password2',
                },
            ],
        });
        console.log('Seed completed successfully for User table');

        await prisma.order.createMany({
            data: [
                {
                    orderId: 1,
                    userId: '75ec0d9c-01e6-418a-8c85-fd74db6a6f7h',
                    orderTotal: 169.99,
                },
                {
                    orderId: 2,
                    userId: '75ec0d9c-01e6-418a-8c85-fd74db6a6f7h',
                    orderTotal: 6921.97,
                },
                {
                    orderId: 3,
                    userId: '2d1ea2e5-3017-4247-b934-16878938e22h',
                    orderTotal: 669.98,
                },
            ],
        });
        console.log('Seed completed successfully for Order table');

        await prisma.orderLineItem.createMany({
            data: [
                {
                    orderLineItemId: 1,
                    orderId: 1,
                    productId: 3,
                    qty: 1,
                    linePrice: 169.99,
                },
                {
                    orderLineItemId: 2,
                    orderId: 2,
                    productId: 1,
                    qty: 1,
                    linePrice: 4321.99,
                },
                {
                    orderLineItemId: 3,
                    orderId: 2,
                    productId: 4,
                    qty: 2,
                    linePrice: 2599.98,
                },
                {
                    orderLineItemId: 4,
                    orderId: 3,
                    productId: 2,
                    qty: 1,
                    linePrice: 499.99,
                },
                {
                    orderLineItemId: 5,
                    orderId: 3,
                    productId: 3,
                    qty: 1,
                    linePrice: 169.99,
                },
            ],
        });
        console.log('Seed completed successfully for orderLineItem table');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();