# file-secure

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

##	APPLICATION DESCRIPTION
My web application allows users to create “groups” and add and remove other users to these groups. Each user in a group can upload and download files. Every file uploaded is encrypted for storage on the Firebase Cloud Storage. The files are the decrypted then and are downloaded for the user. If the files were to be viewed on Firebase Storage, as seen in my demonstration video, they are unopenable due to the encryption.

##	TECHNICAL IMPLEMENTATION
My application is built using VueJS, Vuetify, Firebase Authentication, Firebase Cloud Firestore, Firebase Cloud Storage, Hybrid Crypto JS and Crypto JS.

##	FRONTEND
The frontend was built using VueJS as the framework using Vuetify as a component library as to aid in UI development. Vue was chosen as I have a lot of experience using VueJS as it is easy to implement UI designs. This allowed me to focus on the crux of the assignment i.e the encryption and decryption techniques.  
The frontend gives the user full view of all necessary information with regards to the groups and files in storage. It allows users to add and remove other users from groups. It allows user to see all files within the groups they are in. It allows users to log in and log out at ease as well as create an account.

##	BACKEND & SECURITY FEATURES
###	Account Creation
* A user can create an account by providing a valid email and valid password which must be typed twice to confirm. This authentication is verified by Firebase Authentication.

* RSA Public and Private Keys are generated for the user.
* The users private key is then encrypted using AES with the user’s password.
* The public and the encrypted private keys as well as the users email, and User ID are stored on the Cloud Firestore.

###	Group Creation
* Any user can create a group. A user must only supply a name for a group in order to create one.
* Once a user supplies a name for the group the group has RSA public and private keys generated.
* The public key along with the UserID of the user and the groups name are stored on the Cloud Firestore.
* The private key is encrypted using the user’s public key and stored on the users document on the Cloud Firestore as an encrypted key.

### User Add and Removed from Group
* A user can add any other registered user to a group.
* Once a user is chosen their ID is added to the group’s members array.
* The user will decrypt the groups private key and will encrypt it again using the new users public key and add the group’s private key to the new user’s Cloud  Firestore.
* Once a user is removed, he is removed from the group’s members array and his decrypted private key is removed from his Cloud Firestore.

##	File Upload
*	Any user in a group can upload a file to the cloud in that group. Each group has a folder on the Cloud Storage.
*	The user will decrypt their private key using AES with their password.
*	The user will then decrypt the groups private key using their private key.
*	A X.509 Compliant Certificate is created using the group private key.
*	The file is encrypted and signed using the group public key and the certificate.
*	The file is then stored on Firebase Cloud Storage.

##	File Download
*	The user decrypts their own private key using AES with their password.
*	The user then decrypts the groups private key using their private key.
*	The group private key is then used to decrypt the file being downloaded.
*	The certificate of the file is checked against the groups public key.
*	The file is then sent to the user decrypted and ready to use.

The only time the files are accessed by the server is during the encryption and decryption phases which are only capable of being triggered by authenticated users. At no other times are the files vulnerable or readable for any computer which does not have the groups private key. If someone were to hack into the server all the files would be secure as all of the important keys are locked using the user’s password. 
