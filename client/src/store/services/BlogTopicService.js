import firebase from "firebase";

export const getTopicDoc = (ID) => {
  const db = firebase.firestore();
  return db.collection("blog").doc(ID.topic);
};

export const getLikesTopic = (ID) => {
  const db = firebase.firestore();
  return db.collection("blog").doc(ID.topic).collection("isLiked");
};

export const isLikedTopic = async (ID) => {
  const dbLikes = getLikesTopic(ID);
  const LikesResponse = await dbLikes.get();
  const isLiked = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  );
  return Boolean(!isLiked.length);
};

export const getLikedTopicUser = async (ID) => {
  const dbLikes = getLikesTopic(ID);
  const LikesResponse = await dbLikes.get();
  const likesUserID = LikesResponse.docs.filter(
    (item) => item.data().userId === ID.user
  )[0];
  const user = likesUserID.data();
  return { user, docID: likesUserID.id };
};

export const addLikedTopicUser = (ID, data) => {
  const dbTopic = getTopicDoc(ID);
  const dbLikes = getLikesTopic(ID);
  dbLikes.add({
    userId: ID.user,
    type: data.type,
  });
  return dbTopic.update({
    likes: data.likes,
    disLikes: data.disLikes,
  });
};

export const updateLikesTopic = async (ID, data) => {
  const dbTopic = getTopicDoc(ID);
  const dbLikes = getLikesTopic(ID);
  const userData = await getLikedTopicUser(ID);
  dbLikes.doc(userData.docID).update({
    type: data.type,
  });
  return dbTopic.update({
    [data.changed.changedType]: data.changed.changedValue + 1,
    [data.changed.notChangedType]: data.changed.notChangedValue - 1,
  });
};

export const deleteLikedTopicUser = async (ID, data) => {
  const dbTopic = getTopicDoc(ID);
  const dbLikes = getLikesTopic(ID);
  const userData = await getLikedTopicUser(ID);
  dbLikes
    .doc(userData.docID)
    .delete()
    .then(() => {
      return dbTopic.update({
        [data.changed.changedType]: data.changed.changedValue - 1,
      });
    });
};
