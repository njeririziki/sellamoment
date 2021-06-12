const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp();

exports.verifiedPost= functions.firestore
.document('Posts/{postid}')
.onWrite(async(change,context)=>{

    const reviewedPost= change.after.data();

    if(reviewedPost.Status === 'verified'){
        console.log('functions here!! post was verified 😎😎 ')
     return await admin.firestore().collection('VerifiedPosts')
      .add({
          title: reviewedPost.Title,
          author:reviewedPost.Author,
          content: reviewedPost.Content,
           uid:reviewedPost.uid,
           date: reviewedPost.createdAt,
      })
    } else{
        console.log('functions here post not verified 🤔')
        return null;
    }
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
