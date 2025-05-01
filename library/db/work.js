import { getDocs, collection, doc, getDoc, setDoc, updateDoc, arrayUnion, addDoc } from "firebase/firestore";
import { app } from "./firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export async function getAllWork() {
  const querySnap = await getDocs(collection(db, 'work'));
  
  const documents = querySnap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return documents;
}

export async function registerUserFb(address) {
  const userRef = doc(db, "users", address);
      const userSnap = await getDoc(userRef);
    
      if (!userSnap.exists()) {
          await setDoc(userRef, {
            wallet: address,
            rating: 0,
            postedWork: [],
            postedJobs: [],
            pendingWork: [],
            pendingJob: []
          });
        }
}

export async function updateProposals(jobId, address, price, timeline, message) {
  const jobRef = doc(db, "work", jobId);
    await updateDoc(jobRef, {
        proposals: arrayUnion({
            proposerWallet: address,
            proposedPrice: price,
            proposedTimeline: timeline,
            message: message,
            submittedAt: new Date().toISOString()
        })
    });
}


export async function updatePendingWork(jobId, address) {
  const userRef = doc(db, "users", address);
    await updateDoc(userRef, {
        pendingWork: arrayUnion(jobId)
  });
}

export async function postWork(client, price, timeline, title, description) {
  const workRef = collection(db, "work");
    await addDoc(workRef, {
        client: client,
        price: price,
        timeline: timeline,
        title: title,
        description: description,
        worker: null,
        proposals: [],
        });
}
