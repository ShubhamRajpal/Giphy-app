import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { GifState } from "../context/gifContext";
import { auth, db } from "../utils/firebase";

 const useFavorites = (userId) => {
  const {favorites, setFavorites} = GifState();

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "users", userId, "favorites"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFavorites(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [userId]);

  return favorites;
}

export default useFavorites;