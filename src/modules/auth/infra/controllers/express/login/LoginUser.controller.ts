// External library
import { Request, Response } from "express";

// Service
import { LoginUserUseCase } from "../../../../application/use-cases/express/login/LoginUser.usecase";

// Type
import type {
  HttpVerb,
  Route,
} from "../../../../../../api/express/routes/express.routes";

// Function
import { isLeft } from "../../../../../../shared/types/Either.types";
import { presentLoginUserResponse } from "./LoginUser.presenter";

export class LoginUserController implements Route {
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpVerb,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}

  public static create(loginUserUseCase: LoginUserUseCase) {
    return new LoginUserController("/login", "post", loginUserUseCase);
  }

  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Realiza o login do usuário no sistema
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: guilherme@ifsp.edu.br
   *               password:
   *                 type: string
   *                 example: MinhaSenhaForte123!
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   *       400:
   *         description: Requisição malformada (faltando email ou senha)
   *       401:
   *         description: Credenciais inválidas
   *       500:
   *         description: Erro interno do servidor
   */

  getHandler() {
    return async (req: Request, res: Response) => {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Missing required fields." });
        return;
      }

      const loginUser = await this.loginUserUseCase.execute({
        email,
        password,
      });

      if (isLeft(loginUser)) {
        res
          .status(loginUser.value.statusCode)
          .json({ error: loginUser.value.message });
        return;
      }
      const presenter = presentLoginUserResponse({
        token: loginUser.value.token,
      });

      res.status(201).json({ ...presenter });
    };
  }

  getPath(): string {
    return this.path;
  }

  getVerb(): HttpVerb {
    return this.httpMethod;
  }
}
