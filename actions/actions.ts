"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
	auth();

	const { sessionClaims } = await auth();

	const docCollectionRef = adminDb.collection("documents");
	const docRef = await docCollectionRef.add({
		title: "New Doc",
	});

	await adminDb
		.collection("users")
		.doc(sessionClaims?.email!)
		.collection("rooms")
		.doc(docRef.id)
		.set({
			userId: sessionClaims?.email,
			role: "owner",
			createdAt: new Date(),
			roomId: docRef.id,
		});

	return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
	auth();


	try {
		await adminDb.collection("documents").doc(roomId).delete();
		const query = await adminDb
			.collectionGroup("rooms")
			.where("roomId", "==", roomId)
			.get();

		const batch = adminDb.batch();

		//Deletion request the room references in the user's collection for every user in the room
		query.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});

		//Execute the delete
		await batch.commit();

		//Delete the room in liveblocks
		await liveblocks.deleteRoom(roomId);

		return { success: true };
	} catch (error) {
		return { success: false };
	}
}

export async function inviteUserToDocument(roomId: string, email: string) {
	auth();


	try {
		await adminDb
			.collection("users")
			.doc(email)
			.collection("rooms")
			.doc(roomId)
			.set({
				userId: email,
				role: "editor",
				createdAt: new Date(),
				roomId,
			});
		return { success: true };
	} catch (error) {
		return { success: false };
	}
}

export async function removeUserFromDocument(roomId: string, email: string) {
	auth();


	try {
		await adminDb
			.collection("users")
			.doc(email)
			.collection("rooms")
			.doc(roomId)
			.delete();
		return { success: true };
	} catch (error) {
		return { success: false };
	}
}
