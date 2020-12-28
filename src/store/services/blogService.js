import firebase from "firebase";

export const addLikedUser = async(ID, data)=>{
    const db = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message);
  const dbLikes = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message)
    .collection("isLiked");
    dbLikes.add({
        userId: ID.user,
        type: data.type,
      });
    return db.update({
        likes: data.likes,
        disLikes: data.disLikes,
    })
}

export const isLiked = async (ID) => {
  const dbLikes = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message)
    .collection("isLiked");
  const LikesResponse = await dbLikes.get();
  const isLiked = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  );
  return Boolean(!isLiked.length);
};

export const getLikedUser = async (ID) => {
  const dbLikes = firebase
    .firestore()
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message)
    .collection("isLiked");
  const LikesResponse = await dbLikes.get();
  const likesUserID = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  )[0];
  const user = likesUserID.data();
  return { user, docID: likesUserID.id };
};

