import {GraphQLClient, gql} from 'graphql-request';

 const handler = async (req,res)=> {
     if (req.method === 'POST') {
         const {name, email, comment, slug} = req.body;

         if (!comment || !name || !email || !comment.trim().length ||
             !name.trim().length || !email.includes('@')) {
             res.status(402).json({message: 'Invalid comment object.'});
             return;

         }

         const url = `https://api-ap-northeast-1.graphcms.com/v2/${process.env.id}/master`;

         const graphcms = new GraphQLClient(url, {
           headers: {
             authorization: 'Bearer ' + process.env.graphcms_token
           }
         });

         const query = gql`
             mutation CreateComment($name: String!, $email: String!,$comment: String!, $slug: String!){
                 createComment(data:{name: $name, email: $email, comment: $comment, post: {connect:{slug: $slug}}}){id}
             }
         `;

         const result = await graphcms.request(query, req.body);
         res.status(200).json({result});
     }
 }

 export default handler;