import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Littera API",
      version: "1.0.0",
      description:
        "API para gerenciamento de poemas, sentimentos e interações no sistema Littera.",
    },
    tags: [
      {
        name: "Auth",
        description:
          "Autenticação de usuários: login, registro e validação de acesso.",
      },
      {
        name: "User",
        description:
          "Gerenciamento de poetas: criação, edição e exclusão de contas.",
      },
      {
        name: "Poetry",
        description: "Criação, leitura, atualização e exclusão de poemas.",
      },
      {
        name: "Favorites",
        description:
          "Gerenciamento de poemas favoritos: adicionar, remover e listar.",
      },
      {
        name: "Progress",
        description:
          "Acompanhamento do progresso do usuário com base em sua atividade poética.",
      },
      {
        name: "Feelings",
        description:
          "Classificação e filtragem de poemas por sentimentos associados.",
      },
      {
        name: "Settings",
        description: "Preferências do usuário, como tema e idioma.",
      },
      {
        name: "Sharing",
        description: "Compartilhamento de poemas entre usuários.",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["src/presentation/controllers/express/**/*.ts"],
});
