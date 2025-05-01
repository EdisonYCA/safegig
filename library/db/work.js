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

export async function updatePostedWork(jobId, address) {
  const jobRef = doc(db, "users", address);
    await updateDoc(jobRef, {
        postedWork: arrayUnion(jobId)
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
    const docRef = await addDoc(workRef, {
        client: client,
        price: price,
        timeline: timeline,
        title: title,
        description: description,
        worker: null,
        proposals: [],
        });
    
    return docRef.id;
}

export async function getWorkRequests(address) {
  const docRef = doc(db, 'users', address);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return [];
  }
  const postedWork = docSnap.data().postedWork;
  if (postedWork.length === 0) {
    return [];
  }
  const workRequests = [];
  for (const jobId of postedWork) {
    const jobRef = doc(db, 'work', jobId);
    const jobSnap = await getDoc(jobRef);
    if (jobSnap.data().proposals.length > 0) {
      const jobData = jobSnap.data();
      const proposalsWithJobInfo = jobData.proposals.map(proposal => ({
        ...proposal,
        title: jobData.title,
        originalPrice: jobData.price,
        originalTimeline: jobData.timeline
      }));
      workRequests.push(...proposalsWithJobInfo);
    }
  }

  return workRequests;
}
