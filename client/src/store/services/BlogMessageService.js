import firebase from "firebase";

export const getMessageDoc = (ID) => {
  const db = firebase.firestore();
  return db
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message);
};
export const getLikesMessage = (ID) => {
  const db = firebase.firestore();
  return db
    .collection("blog")
    .doc(ID.topic)
    .collection("messages")
    .doc(ID.message)
    .collection("isLiked");
};
export const addLikedUser = (ID, data) => {
  const dbMessage = getMessageDoc(ID);
  const dbLikes = getLikesMessage(ID);
  dbLikes.add({
    userId: ID.user,
    type: data.type,
  });
  return dbMessage.update({
    likes: data.likes,
    disLikes: data.disLikes,
  });
};

export const isLiked = async (ID) => {
  const dbLikes = getLikesMessage(ID);
  const LikesResponse = await dbLikes.get();
  const isLiked = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  );
  return Boolean(!isLiked.length);
};

export const getLikedUser = async (ID) => {
  const dbLikes = getLikesMessage(ID);
  const LikesResponse = await dbLikes.get();
  const likesUserID = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  )[0];
  const user = likesUserID.data();
  return { user, docID: likesUserID.id };
};

export const updateLikeMessage = async (ID, data) => {
  const dbMessage = getMessageDoc(ID);
  const dbLikes = getLikesMessage(ID);
  const userData = await getLikedUser(ID);
  dbLikes.doc(userData.docID).update({
    type: data.type,
  });
  return dbMessage.update({
    [data.changed.changedType]: data.changed.changedValue + 1,
    [data.changed.notChangedType]: data.changed.notChangedValue - 1,
  });
};

export const deleteLikedUser = async (ID, data) => {
  const userData = await getLikedUser(ID);
  const dbMessage = getMessageDoc(ID);
  const dbLikes = getLikesMessage(ID);
  dbLikes
    .doc(userData.docID)
    .delete()
    .then(() => {
      return dbMessage.update({
        [data.changed.changedType]: data.changed.changedValue - 1,
      });
    });
};
