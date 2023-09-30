export const getConversationById = (user, users) => {

    return users[0]._id === user._id ? users[1]._id : users[0]._id;

  };


  export const getConversationByName = (user, users) => {

    return users[0]._id === user._id ? users[1].name : users[0].name;

  };


  export const getConversationByPicture = (user, users) => {

    return users[0]._id === user._id ? users[1].picture : users[0].picture;

  };
  

  export const checkOnlineStatus = (onlineUsers, user, users) => {

    let converId = getConversationById(user, users)

    let check = onlineUsers.find((u) => u.userId === converId)

    return check ? true : false;
  };