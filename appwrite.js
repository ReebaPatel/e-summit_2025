import { Client, Storage } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('e-summit-25');

export const storage = new Storage(client);
