// External library
import { Request, Response } from "express";

// Service
import { CreateUserUseCase } from "../../../../application/use-cases/create/CreateUser.usecase";

// Type
import type {
  HttpVerb,
  Route,
} from "../../../../../../api/express/routes/express.routes";

// Function
import { isLeft } from "../../../../../../shared/types/Either.types";
import { presentCreateUserResponse } from "./CreateUser.presenter";

export class CreateUserController implements Route {
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpVerb,
    private readonly createUserUseCase: CreateUserUseCase
  ) {}

  public static create(createUserUseCase: CreateUserUseCase) {
    return new CreateUserController("/users", "post", createUserUseCase);
  }

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Cria um novo usuário no sistema
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - email
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 example: guilherme_mendes
   *               email:
   *                 type: string
   *                 format: email
   *                 example: guilherme@ifsp.edu.br
   *               password:
   *                 type: string
   *                 example: MinhaSenhaForte123!
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   format: uuid
   *                   example: a3f8c3b2-1f2a-4d8b-9c14-ef9a6b21389b
   *                 username:
   *                   type: string
   *                   example: guilherme_mendes
   *                 email:
   *                   type: string
   *                   format: email
   *                   example: guilherme@ifsp.edu.br
   *                 isActive:
   *                   type: boolean
   *                   example: true
   *       400:
   *         description: Requisição malformada (faltando username, email ou senha)
   *       401:
   *         description: Não autorizado
   *       500:
   *         description: Erro interno do servidor
   */

  getHandler() {
    return async (req: Request, res: Response) => {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({ error: "Missing required fields." });
        return;
      }

      const createdUser = await this.createUserUseCase.execute({
        username,
        email,
        password,
      });

      if (isLeft(createdUser)) {
        res
          .status(createdUser.value.statusCode)
          .json({ error: createdUser.value.message });
        return;
      }
      const presenter = presentCreateUserResponse({
        id: createdUser.value.id,
        username,
        email,
        isActive: createdUser.value.isActive,
      });

      res.status(201).json(presenter);
    };
  }

  getPath(): string {
    return this.path;
  }

  getVerb(): HttpVerb {
    return this.httpMethod;
  }
}
