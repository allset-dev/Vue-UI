// NOTE: Copied from base repo. https://github.com/Kong/konnect-team-interview-frontend-exercise

const { faker } = require("@faker-js/faker");

module.exports = () => {
  const randomNo = parseInt(Math.random() * 100) + 100;

  const services = Array(randomNo)
    .fill(0)
    .map(() => {
      const description =
        Math.random() < 0.96
          ? faker.company.catchPhrase() +
            " " +
            faker.hacker.phrase() +
            (Math.random() < 0.2 ? " " + faker.hacker.phrase() : "")
          : "";

      return {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description,
        enabled: faker.datatype.boolean(),
        versions: (() => {
          return [
            ...Array(faker.datatype.number({ min: 0, max: 12 })).keys(),
          ].map(() => ({
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            description: faker.random.words(),
          }));
        })(),
      };
    });

  return {
    services,
    users: [
      {
        email: "subbiah2806@gmail.com",
        imgUrl: faker.image.people(),
        name: faker.name.findName(),
        id: parseInt(Math.random() * 100),
      },
    ],
  };
};
