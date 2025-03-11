import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.ava.realestate",
  endpoint: process.env.EXPO_PUBLIC_APPWRTIE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRTIE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setPlatform(config.platform!)
  .setProject(config.projectId!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");
    console.log("Redirect URI:", redirectUri);

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    console.log("OAuth2 Token Response:", response);

    if (!response) throw new Error("No response from OAuth2 Token");
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    console.log("Browser Result:", browserResult);

    if (browserResult.type !== "success") throw new Error("Unable to login");

    console.log("Browser Result URL:", browserResult.url);
    const url = new URL(browserResult.url);
    console.log("Parsed URL:", url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("ailed to login");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");
    return session;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
