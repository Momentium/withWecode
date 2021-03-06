const { signup_methods } = require("../prisma");
const prisma = require("../prisma");
const { getRelatedInfoId } = require("./CompanyService");

const findCompany = (field) => {
  const [uniqueKey] = Object.keys(field);

  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.companies.findUnique({ where: { [uniqueKey]: value } });
};

const createUser = async (fields) => {
  const { email, name, password, user_types, signup_methods, terms } = fields;
  console.log(fields);
  const data = {
    email,
    name,
    password,
    user_types,
    signup_methods,
  };
  const createdUser = await prisma.users.create({ data });

  for (let len = 0; len < terms.length; len++) {
    if (terms[Object.keys(terms[len])[0]] === true) {
      const termId = await getRelatedInfoId(
        "terms",
        Object.keys(terms[len])[0]
      );
      await prisma.user_agreements.create({
        data: {
          term_id: termId,
          user_id: createdUser.id,
        },
      });
    }
  }
  return createdUser;
};

const findUser = (field) => {
  const [uniqueKey] = Object.keys(field);

  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];
  return prisma.users.findUnique({ where: { [uniqueKey]: value } });
};

const findUserType = (field) => {
  const [typeId] = Object.keys(field);
  const value = field[typeId];
  return prisma.user_types.findUnique({ where: { id: value } });
};

const findUserInfo = (field) => {
  const [uniqueKey] = Object.keys(field);
  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];
  return prisma.users.findUnique({
    include: {
      companies: {
        select: {
          name: true,
        },
      },
    },    
      where: 
      { [uniqueKey]: value } 
    });
};



const updateInfo = async (fields) => {
  const { userId, requestedFields } = fields;
  return prisma.users.update({
    where: {
      id: Number(userId),
    },
    data: {
      ...requestedFields,
    },
  });
};

const deleteImage = (field) => {
  const [uniqueKey] = Object.keys(field);
  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];

  return prisma.users.update({
    where: {
      [uniqueKey]: value,
    },
    data: {
      profile_picture: null,
    },
  });
};

const deleteMember = async (field) => {
  const [uniqueKey] = Object.keys(field);
  const isKeyId = uniqueKey === "id";
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey];
  console.log(field, value, uniqueKey)
  await prisma.questions.deleteMany({    
    where: {
      user_id: value,
    },
  })
  await prisma.startup_likes.deleteMany({    
    where: {
      user_id: value,
    },
  })
  await prisma.user_agreements.deleteMany({    
    where: {
      user_id: value,
    },
  })
  await prisma.votes.deleteMany({    
    where: {
      user_id: value,
    },
  })
  await prisma.partner_likes.deleteMany({    
    where: {
      user_id: value,
    },
  })
  await prisma.project_likes.deleteMany({    
    where: {
      user_id: value,
    },
  })

  await prisma.users.delete({
    where: {
      [uniqueKey]: value,
    },
  });

};

module.exports = {
  findCompany,
  createUser,
  findUser,
  findUserType,
  findUserInfo,
  updateInfo,
  deleteImage,
  deleteMember,
};
