import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { min } from "date-fns";

const db = new PrismaClient();

async function main() {
  // Hash the password "admin111"
  const hashedPassword = await bcrypt.hash("admin111", 10);
  console.log("Seeding in progress...");

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
    maxCreditLimit: parseFloat(faker.finance.amount({min: 1000, max: 1000000})),
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
    bayPrice: parseFloat(faker.commerce.price({ min: 100, max: 1000000 })),
    tax: parseFloat(faker.finance.amount()),
    batchNumber: faker.commerce.productMaterial(),
    costPrice: parseFloat(faker.commerce.price({ min: 100, max: 1000000 })),
    wholeSalePrice: parseFloat(faker.commerce.price()),
    quantity: faker.number.int({ min: 5, max: 1000000 }),
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

  // Seed Payees
  const payeesData = Array.from({ length: 10 }, () => ({
    name: faker.person.fullName(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
  }));

  await db.payee.createMany({
    data: payeesData,
  });

  // Seed ExpenseCategories
  const expenseCategoriesData = Array.from({ length: 5 }, () => ({
    name: faker.commerce.department(),
    slug: faker.lorem.slug(),
  }));

  await db.expenseCategory.createMany({
    data: expenseCategoriesData,
  });

  // Retrieve created payees, expense categories, and shops to get their IDs
  const createdPayees = await db.payee.findMany();
  const createdExpenseCategories = await db.expenseCategory.findMany();

  // Seed Expenses
  const expensesData = Array.from({ length: 20 }, (_, i) => ({
    title: faker.commerce.productName(),
    amount: parseFloat(faker.finance.amount({ min: 5, max: 10000 })),
    description: faker.lorem.paragraph(),
    attachments: [faker.image.url(), faker.image.url()],
    expenseDate: faker.date.past().toISOString(),
    shopId: createShop[i % createShop.length].id,
    categoryId: createdExpenseCategories[i % createdExpenseCategories.length].id,
    payeeId: createdPayees[i % createdPayees.length].id,
  }));

  await db.expense.createMany({
    data: expensesData,
  });
// Retrieve created customers and products to get their IDs
const createdCustomers = await db.customer.findMany();
const createdProducts = await db.product.findMany();

// Seed Sales
const salesData = Array.from({ length: 20 }, (_, i) => ({
  customerId: createdCustomers[i % createdCustomers.length].id,
  customerName: createdCustomers[i % createdCustomers.length].firstName + " " + createdCustomers[i % createdCustomers.length].lastName,
  customerEmail: createdCustomers[i % createdCustomers.length].email,
  saleAmount: parseFloat(faker.commerce.price()),
  balanceAmount: parseFloat(faker.finance.amount()),
  paidAmount: parseFloat(faker.finance.amount()),
  saleType: faker.helpers.arrayElement(["PAID", "CREDIT"]),
  paymentMethode: faker.helpers.arrayElement(["CASH", "MOBILE_MONEY", "BANK_TRANSFER", "CREDIT_CARD", "OTHER"]),
  transactionCode: faker.finance.transactionType(),
  shopId: createShop[i % createShop.length].id,
}));

await db.sale.createMany({
  data: salesData,
});

// Retrieve created sales to get their IDs
const createdSales = await db.sale.findMany();

// Seed SaleItems
const saleItemsData = Array.from({ length: 5 }, (_, i) => ({
  productId: createdProducts[i % createdProducts.length].id,
  saleId: createdSales[i % createdSales.length].id,
  quantity: faker.number.int({ min: 1, max: 10 }),
  productPrice: parseFloat(faker.commerce.price()),
  productName: createdProducts[i % createdProducts.length].name,
  productImage: createdProducts[i % createdProducts.length].image,
}));

await db.saleItem.createMany({
  data: saleItemsData,
});


  console.log(
    `
    Seeded the following successfully:
    - Users
    - Shops
    - Suppliers
    - Brands
    - Units
    - Categories
    - Products
    - Payees
    - Expense Categories
    - Expenses
    - Customers
    `
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
