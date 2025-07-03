// External library
import { Request, Response } from "express";

// Service
import { ProfileUserUseCase } from "../../../../application/use-cases/express/profile/ProfileUser.usecase";

// Type
import type {
  HttpVerb,
  Route,
} from "../../../../../../api/express/routes/express.routes";

// Function
import { isLeft } from "../../../../../../shared/types/Either.types";
import { presentCreateUserResponse } from "./ProfileUser.presenter";
import { buildResourceLink } from "../../../../../../shared/helpers/express/resourceURL.helper";
import { TokenProvider } from "../../../../../../infra/services/token/jwt/interfaces/jwt.interfaces";
import { authMiddleware } from "../../../../../../shared/middleware/auth/express/auth.middleware";

export class ProfileUserController implements Route {
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpVerb,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly tokenService: TokenProvider
  ) {}

  public static create(
    profileUserUseCase: ProfileUserUseCase,
    tokenService: TokenProvider
  ) {
    return new ProfileUserController(
      "/users/:id/profile",
      "get",
      profileUserUseCase,
      tokenService
    );
  }

  getMiddlewares() {
    return [authMiddleware(this.tokenService)];
  }

  /**
   * @swagger
   * /users/{id}/profile:
   *   get:
   *     summary: Recupera os dados públicos de um usuário
   *     tags: [User]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Os dados do usuário foram recuperados com sucesso
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
   *                 link:
   *                   type: string
   *                   example: http://localhost:3000/users/a3f8c3b2-1f2a-4d8b-9c14-ef9a6b21389b/deactivate
   *       400:
   *         description: ID do usuário não fornecido
   *       401:
   *         description: Não autorizado - token ausente ou inválido
   *       500:
   *         description: Erro interno do servidor
   */

  getHandler() {
    return async (req: Request, res: Response) => {
      const { id: userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: "Missing required fields." });
        return;
      }

      const userProfile = await this.profileUserUseCase.execute({ userId });

      if (isLeft(userProfile)) {
        res
          .status(userProfile.value.statusCode)
          .json({ error: userProfile.value.message });
        return;
      }
      const presenter = presentCreateUserResponse({
        id: userProfile.value.id,
        username: userProfile.value.username,
        email: userProfile.value.email,
        isActive: userProfile.value.isActive,
      });

      const link = buildResourceLink({
        request: req,
        path: `users/${userProfile.value.id}/deactivate`,
      });
      res.status(200).json({ ...presenter, link });
    };
  }

  getPath(): string {
    return this.path;
  }

  getVerb(): HttpVerb {
    return this.httpMethod;
  }
}
