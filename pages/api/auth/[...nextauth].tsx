import { compare } from 'bcrypt';
import { MongoClient } from 'mongodb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    session: {
        strategy: "jwt",
    }, 
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type:"email"},
                password: { label: "password", type:"password"}
            },
            async authorize(credentials) {
                const client = await MongoClient.connect(process.env.MONGO_URI!);
                
                const users = client.db().collection('users');

                const result = await users.findOne({
                    email: credentials!.email,
                })

                if(!result) {
                    client.close();
                    throw new Error('No such user exists');
                }

                const checkPassword = await compare(credentials!.password, result.password);

                if(!checkPassword) {
                    client.close();
                    throw new Error('Incorrect Credentials');
                }

                client.close();
                return {id: result._id.toString(), name: result.firstname + ' ' + result.lastname, email: result.email, image:null };
            }
        })
    ],
    pages: {
        signIn: '/login',
    }
})