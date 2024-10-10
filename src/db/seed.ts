import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
  // Hash the password "admin111"
  const hashedPassword = await bcrypt.hash("admin111", 10);

  // Seed Users with hashed password
  const usersData = Array.from({ length: 10 }, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: hashedPassword, // Use hashed password
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    dob: faker.date.past().toISOString(),
    gender: faker.helpers.arrayElement(["MALE", "FEMALE"]),
    image: faker.image.avatar(),
    role: faker.helpers.arrayElement(["ADMIN", "ATTENDANT"]),
  }));

  await db.user.createMany({
    data: usersData,
  });

  // Retrieve created users to get their IDs
  const createdUsers = await db.user.findMany();
  const attendant = await db.user.findMany({
    where: {
      role: "ATTENDANT",
    },
  });

  // Seed Shops
  const shopsData = Array.from({ length: 10 }, (_, i) => ({
    name: faker.company.name(),
    slug: faker.lorem.slug(),
    location: faker.location.city(),
    adminId: createdUsers[i % createdUsers.length].id, // Assigner un admin parmi les 10 users créés
    attendantIds: [attendant[i % attendant.length].id], // Ajoutez les ids des attendants plus tard si besoin
  }));

  await db.shop.createMany({
    data: shopsData,
  });

  // Seed Customers
  const customersData = Array.from({ length: 50 }, () => ({
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
    maxCreditLimit: parseFloat(faker.finance.amount()),
    maxCreditDays: faker.helpers.rangeToNumber(20),
    taxPin: faker.finance.amount(),
    dob: faker.date.past().toISOString(),
    email: faker.internet.email(),
    nationalId: faker.internet.userName(),
    country: faker.location.country(),
    location: faker.location.city(),
  }));

  await db.customer.createMany({
    data: customersData,
  });
  // Seed Suppliers
  const suppliersData = Array.from({ length: 20 }, () => ({
    supplierType: faker.helpers.arrayElement([
      "MANUFACTURER",
      "DISTRIBUTOR",
      "WHOLESALER",
      "RETAILER",
      "OTHER",
    ]),
    name: faker.company.name(),
    contactPerson: faker.person.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    country: faker.location.country(),
    location: faker.location.city(),
    website: faker.internet.url(),
    registrationNumber: faker.finance.amount(),
    bankAccountNumber: faker.finance.amount(),
    bankName: faker.company.name(),
    paymentTerms: faker.lorem.sentence(),
    logo: faker.image.url(),
    rating: parseFloat(faker.finance.amount()),
    notes: faker.lorem.paragraph(),
  }));

  await db.supplier.createMany({
    data: suppliersData,
  });

  // Seed Units
  const unitsData = Array.from({ length: 5 }, () => ({
    name: faker.commerce.productMaterial(),
    abreviation: faker.lorem.word(),
    slug: faker.lorem.slug(),
  }));

  await db.unit.createMany({
    data: unitsData,
  });

  // Seed Categories
  const categoriesData = Array.from({ length: 5 }, () => ({
    name: faker.commerce.department(),
    slug: faker.lorem.slug(),
  }));

  await db.category.createMany({
    data: categoriesData,
  });

  // Seed Brands
  const brandsData = Array.from({ length: 5 }, () => ({
    name: faker.company.name(),
    slug: faker.lorem.slug(),
  }));

  await db.brand.createMany({
    data: brandsData,
  });

  // Retrieve created units, categories, brands, and suppliers to get their IDs
  const createdUnits = await db.unit.findMany();
  const createdCategories = await db.category.findMany();
  const createdBrands = await db.brand.findMany();
  const createdSuppliers = await db.supplier.findMany();
   const createShop = await db.shop.findMany();

  // Seed Products
  const productsData = Array.from({ length: 50 }, (_, i) => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    content: faker.lorem.paragraph(),
    sku: faker.internet.displayName(),
    slug: faker.lorem.slug(),
    productCode: faker.lorem.slug(),
    image: faker.image.urlPlaceholder(),
    price: parseFloat(faker.commerce.price()),
    bayPrice: parseFloat(faker.commerce.price()),
    tax: parseFloat(faker.finance.amount()),
    batchNumber: faker.commerce.productMaterial(),
    costPrice: parseFloat(faker.commerce.price()),
    wholeSalePrice: parseFloat(faker.commerce.price()),
    quantity: faker.number.int(),
    expiryDate: faker.date.future().toISOString(),
    alertQuantity: faker.number.int(),
    stockQuantity: faker.number.int(),
    barcode: faker.vehicle.manufacturer(),
    unitId: createdUnits[i % createdUnits.length].id,
    shopId: createShop[i % createShop.length].id,
    brandId: createdBrands[i % createdBrands.length].id,
    categoryId: createdCategories[i % createdCategories.length].id,
    supplierId: createdSuppliers[i % createdSuppliers.length].id,
  }));

  await db.product.createMany({
    data: productsData,
  });

  console.log(
    "Seeded users, shops,supplier, brand, unit,category , product and customers successfully!"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
