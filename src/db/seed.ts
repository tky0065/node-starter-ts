
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
  // Hash the password "admin111"
  const hashedPassword = await bcrypt.hash("admin111", 10);

  // Seed Users with hashed password
  const usersData  = Array.from({ length: 10 }, () => ({
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
  })) ;

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

  console.log("Seeded users, shops, and customers successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
