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
            status: "pending"
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
        pendingWork: arrayUnion(jobId),
        pendingJob: arrayUnion(jobId)
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
    if (jobSnap.exists() && jobSnap.data().proposals.length > 0) {
      const jobData = jobSnap.data();
      const proposalsWithJobInfo = jobData.proposals
        .filter(proposal => proposal.status !== "rejected")
        .map(proposal => ({
          ...proposal,
          title: jobData.title,
          originalPrice: jobData.price,
          originalTimeline: jobData.timeline,
          id: jobId
        }));
      workRequests.push(...proposalsWithJobInfo);
    }
  }

  return workRequests;
}

export async function getJobRequests(address) {
  const docRef = doc(db, 'users', address);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return [];
  }
  const pendingJobs = docSnap.data().pendingJob;
  if (pendingJobs.length === 0) {
    return [];
  }
  const jobRequests = [];
  for (const jobId of pendingJobs) {
    const jobRef = doc(db, 'work', jobId);
    const jobSnap = await getDoc(jobRef);
    if (jobSnap.exists()) {
      const jobData = jobSnap.data();
      const proposal = jobData.proposals.find(p => p.proposerWallet === address);
      if (proposal) {
        jobRequests.push({
          id: jobId,
          title: jobData.title,
          client: jobData.client,
          originalPrice: jobData.price,
          proposedPrice: proposal.proposedPrice,
          originalTimeline: jobData.timeline,
          proposedTimeline: proposal.proposedTimeline,
          message: proposal.message,
          status: proposal.status,
          paymentDate: proposal.paymentDate ? proposal.paymentDate : null
        });
      }
    }
  }
  return jobRequests;
}

export async function updateProposalStatus(jobId, proposerWallet, status) {
  if (!jobId || !proposerWallet) {
    throw new Error("Missing required parameters: jobId and proposerWallet are required");
  }

  const jobRef = doc(db, "work", jobId);
  const jobSnap = await getDoc(jobRef);
  
  if (!jobSnap.exists()) {
    throw new Error("Job not found");
  }

  const jobData = jobSnap.data();
  const proposals = jobData.proposals || [];
  
  const updatedProposals = proposals.map(proposal => {
    if (proposal.proposerWallet === proposerWallet) {
      return {
        ...proposal,
        status,
        acceptedOn: status === "accepted" ? Math.floor(Date.now() / 1000) : null,
        paymentDate: status === "accepted" ? Math.floor(Date.now() / 1000) + (proposal.proposedTimeline * 24 * 60 * 60) : null
      };
    }
    return proposal;
  });

  await updateDoc(jobRef, {
    proposals: updatedProposals
  });
}

export async function completeJob(jobId, proposerWallet) {
  if (!jobId || !proposerWallet) {
    throw new Error("Missing required parameters: jobId and proposerWallet are required");
  }

  const jobRef = doc(db, "work", jobId);
  const jobSnap = await getDoc(jobRef);
  
  if (!jobSnap.exists()) {
    throw new Error("Job not found");
  }

  const jobData = jobSnap.data();
  const proposals = jobData.proposals || [];
  
  const updatedProposals = proposals.map(proposal => {
    if (proposal.proposerWallet === proposerWallet) {
      return {
        ...proposal,
        status: "completed",
        completedOn: Math.floor(Date.now() / 1000)
      };
    }
    return proposal;
  });

  await updateDoc(jobRef, {
    proposals: updatedProposals
  });
}

export async function fetchCompletedRequests(address) {
  const docRef = doc(db, 'users', address);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return [];
  }
  const pendingJobs = docSnap.data().pendingJob;
  if (pendingJobs.length === 0) {
    return [];
  }
  const completedRequests = [];
  for (const jobId of pendingJobs) {
    const jobRef = doc(db, 'work', jobId);
    const jobSnap = await getDoc(jobRef);
    if (jobSnap.exists()) {
      const jobData = jobSnap.data();
      const proposal = jobData.proposals.find(p => p.proposerWallet === address);
      if (proposal && proposal.status === "rejected" || proposal.status === "completed") {
        completedRequests.push({
          id: jobId,
          title: jobData.title,
          client: jobData.client,
          status: "Rejected",
          profit: "-$" + proposal.proposedPrice,
          date: new Date(proposal.timestamp?.toDate()).toLocaleDateString()
        });
      }
    }
  }
  return completedRequests;
}