import {APIGatewayEvent} from "aws-lambda";
import {getAuthFromHeader} from "./auth";

export type Hello = {
  message: string;
};

export const main = async (event: APIGatewayEvent) => {
  // Authorizationヘッダーからユーザー情報を抽出
  const auth = getAuthFromHeader(event);

  // HTTPレスポンス
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello! ${auth.name}!`,
    }),
  };
};