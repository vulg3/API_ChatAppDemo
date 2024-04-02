
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyATQxxZTz8lW3HN5RPmMbZE242d76seSPU",
    authDomain: "chatappdemo-38d94.firebaseapp.com",
    projectId: "chatappdemo-38d94",
    storageBucket: "chatappdemo-38d94.appspot.com",
    messagingSenderId: "928635624624",
    appId: "1:928635624624:web:36acbb2463d10325022f75",
    measurementId: "G-WQNCB1QR1G"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (files: any, cate: any) => {
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${cate}/` + files.originalname);
    const uploadTask = await uploadBytesResumable(storageRef, files.buffer);
    let url = getDownloadURL(uploadTask.ref).then((downloadURL) => {
        return downloadURL;
    });
    return url;
    // Listen for state changes, errors, and completion of the upload.
};
const uploadVideo = async (videoData: any, category: string) => {
    const storageRef = ref(storage, `${category}/` + videoData.originalname);
    const uploadTask = await uploadBytesResumable(storageRef, videoData.buffer);
    const downloadURL = await getDownloadURL(uploadTask.ref);
    return downloadURL;
};

export { uploadImage, uploadVideo };