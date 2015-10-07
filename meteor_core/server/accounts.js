ServiceConfiguration.configurations.upsert(
    { service: "google" },
    {
      $set: {
        clientId: "723548567658-b7s584a60b13a3hnph7mcgqoe689qrdo.apps.googleusercontent.com",
        loginStyle: "popup",
        secret: "JiuH_MvN42Je6k_3bfqcl_gW"
      }
    }
);

Accounts.validateNewUser(function (user) {
  if (['thiagobocorrea@gmail.com'].indexOf(user.services.google.email) > -1)
    return true;
  throw new Meteor.Error(403, "You are not authorized");
});