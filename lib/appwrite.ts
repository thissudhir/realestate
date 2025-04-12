import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.ava.realestate",
  endpoint: process.env.EXPO_PUBLIC_APPWRTIE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRTIE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,

  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setPlatform(config.platform!)
  .setProject(config.projectId!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

console.log("Database ID:", config.databaseId);

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

export async function getLatestProperties() {
  try {
    const response = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderDesc("$createdAt")];
    if (filter && filter !== "All") {
      buildQuery.push(Query.equal("type", filter));
    }
    if (query) {
      buildQuery.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("price", query),
          Query.search("type", query),
        ])
      );
    }
    if (limit) {
      buildQuery.push(Query.limit(limit));
    }
    const response = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery
    );
    return response.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
