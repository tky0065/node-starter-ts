import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin111", 10);

  // Create customers
  for (let i = 0; i < 10; i++) {
    await prisma.customer.create({
      data: {
        customerType: faker.helpers.arrayElement([
          "RETAIL",
          "WHOLESALE",
          "DISTRIBUTOR",
          "OTHER",
        ]),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        maxCreditLimit: parseFloat(
          faker.finance.amount({ min: 1000, max: 1000000, dec: 2 })
        ),
        maxCreditDays: faker.helpers.rangeToNumber(20),
        taxPin: faker.finance.amount(),
        dob: faker.date.past().toISOString(),
        email: faker.internet.email(),
        nationalId: faker.internet.userName(),
        country: faker.location.country(),
        location: faker.location.city(),
      },
    });
  }

  // Create users
  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.number(),
        gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
        role: faker.helpers.arrayElement(["ADMIN", "ATTENDANT"]),
      },
    });
  }

  // Create shops
  for (let i = 0; i < 3; i++) {
    await prisma.shop.create({
      data: {
        name: faker.company.name(),
        slug: faker.lorem.slug(),
        location: faker.location.secondaryAddress(),
        adminId: (await prisma.user.findFirst())?.id ?? "",
      },
    });
  }

  // Create suppliers
  for (let i = 0; i < 5; i++) {
    await prisma.supplier.create({
      data: {
        supplierType: faker.helpers.arrayElement([
          "MANUFACTURER",
          "DISTRIBUTOR",
          "WHOLESALER",
          "RETAILER",
          "OTHER",
        ]),
        name: faker.company.name(),
        contactPerson: faker.name.firstName() + " " + faker.name.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        country: faker.address.country(),
        location: faker.address.streetAddress(),
        website: faker.internet.url(),
        registrationNumber: faker.string.alphanumeric(10),
        bankAccountNumber: faker.string.numeric(16),
        bankName: faker.company.name(),
        paymentTerms: faker.lorem.sentence(),
        logo: faker.image.url(),
        rating: parseFloat(faker.finance.amount({ min: 1, max: 5 })),
        notes: faker.lorem.paragraph(),
      },
    });
  }

  // Create units
  for (let i = 0; i < 5; i++) {
    await prisma.unit.create({
      data: {
        name: faker.lorem.word(),
        abreviation: faker.lorem.word(),
        slug: faker.lorem.slug(),
      },
    });
  }

  // Create categories
  for (let i = 0; i < 5; i++) {
    await prisma.category.create({
      data: {
        name: faker.lorem.word(),
        slug: faker.lorem.slug(),
      },
    });
  }

  // Create brands
  for (let i = 0; i < 5; i++) {
    await prisma.brand.create({
      data: {
        name: faker.company.name(),
        slug: faker.lorem.slug(),
      },
    });
  }

  // Create products
  for (let i = 0; i < 10; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        content: faker.lorem.paragraph(),
        sku: faker.string.alphanumeric(8),
        slug: faker.lorem.slug(),
        productCode: faker.string.alphanumeric(10),
        image: faker.image.url(),
        price: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        wholeSalePrice: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        bayPrice: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        tax: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        batchNumber: faker.string.alphanumeric(10),
        costPrice: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        quantity: faker.number.int(100),
        expiryDate: faker.date.future(),
        alertQuantity: faker.number.int(10),
        stockQuantity: faker.number.int(100),
        barcode: faker.string.alphanumeric(13),
        unitId: (await prisma.unit.findFirst())?.id ?? "",
        brandId: (await prisma.brand.findFirst())?.id ?? "",
        shopId: (await prisma.shop.findFirst())?.id ?? "",
        categoryId: (await prisma.category.findFirst())?.id ?? "",
        supplierId: (await prisma.supplier.findFirst())?.id ?? "",
      },
    });
  }

  // Create sales
  for (let i = 0; i < 5; i++) {
    await prisma.sale.create({
      data: {
        saleNumber: faker.string.uuid(),
        customerId: (await prisma.customer.findFirst())?.id ?? "",
        customerName: faker.person.firstName() + " " + faker.person.lastName(),
        customerEmail: faker.internet.email(),
        saleAmount: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        balanceAmount: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        paidAmount: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        status: faker.helpers.arrayElement([
          "PENDING",
          "COMPLETED",
          "DELIVERED",
          "CANCELED",
        ]),
        saleType: faker.helpers.arrayElement(["PAID", "CREDIT"]),
        paymentMethode: faker.helpers.arrayElement([
          "CASH",
          "MOBILE_MONEY",
          "BANK_TRANSFER",
          "CREDIT_CARD",
          "OTHER",
        ]),
        transactionCode: faker.string.uuid(),
        shopId: (await prisma.shop.findFirst())?.id ?? "",
      },
    });
  }

  // Create sale items
  for (let i = 0; i < 10; i++) {
    await prisma.saleItem.create({
      data: {
        productId: (await prisma.product.findFirst())?.id ?? "",
        saleId: (await prisma.sale.findFirst())?.id ?? "",
        quantity: faker.number.int(10),
        productPrice: parseFloat(
          faker.finance.amount({ min: 10, max: 5000000, dec: 2 })
        ),
        productName: faker.commerce.productName(),
        productImage: faker.image.url(),
      },
    });
  }

  console.log("Data seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
